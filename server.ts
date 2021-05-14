import { getHash, comparePassword, getUserFromToken } from './auth';
import next from 'next'
import CollabServer from '@pdftron/collab-server';
import CollabDatabase from '@pdftron/collab-db-postgresql';
import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { v4 } from 'uuid';
import * as path from 'path';
import scrape from 'website-scraper';
import puppeteer from 'puppeteer';

require('dotenv').config()
const db = new CollabDatabase({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dbName: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
db.connectDB();

const server = new CollabServer({
  resolvers: db.getResolvers(),
  getUserFromToken,
  corsOption: {
    origin: 'http://localhost:3000'
  }
})

// @ts-ignore
db.setServer(server);
server.start();



const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

// IIFE for access to async
(async () => {
  await app.prepare();
  const server = express();
  server.use(express.json())
  server.use(cookieParser());

  server.post('/review/add', async (req, res) => {

    const id = v4();

    const { url, width } = req.body;

    const directory = path.resolve(
      __dirname,
      `./public/documents/${id}`
    );

    const options = {
      urls: [url],
      directory,
      filenameGenerator: id,
    };

    await scrape(options);

    const finalURL = `${process.env.DOCUMENT_BASE_URL}/${id}/index.html`

    const browser = await puppeteer.launch({
      defaultViewport: {
        width: Number(width),
        height: 1000
      },
    });

    const page = await browser.newPage();
    await page.goto(finalURL);

    const body = await page.$('body')
    const bb = await body.boundingBox()
    const height = await bb.height;

    return res.status(200).send({
      url: `${process.env.DOCUMENT_BASE_URL}/${id}/index.html`,
      width,
      height,
      id
    })
  })

  server.get('/auth/session', async (req, res) => {

    const { cookie } = req.query;
    let token;

    if (cookie) {
      token = cookie;
    } else if(req.cookies) {
      token = req.cookies['wv-collab-token']
    }

    if (!token) {
      return res.status(401).send();
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return res.status(401).send();
    }

    res.send({
      token,
      user
    })
  })

  server.post('/auth/login', async (req, res) => {
    const {
      email,
      password
    } = req.body;

    

    const user = await db.getUserByEmail(email);

    console.log(user)
    if (!user) {
      res.clearCookie('wv-collab-token');
      return res.status(401).send();
    }

    const { password: hashedPassword } = user;
    const passwordMatches = await comparePassword(password, hashedPassword);
    if (!passwordMatches) {
      res.clearCookie('wv-collab-token');
      return res.status(401).send();
    }

    const token = jwt.sign({
      id: user.id,
      email
    }, process.env.COLLAB_KEY);
  
    res.cookie('wv-collab-token', token, {
      httpOnly: true,
      secure: false
    });
  
    res.status(200).send({
      user,
      token
    })
  })

  server.post('/auth/sign-up', async (req, res) => {
    const {
      email,
      password,
      username
    } = req.body;

    const user = await db.getUserByEmail(email);
    if (user) {
      return res.status(422).send({ error: 'A user with that email already exists' });
    }

    const hashedPassword = await getHash(password);

    const newUser = await db.createUser({
      userName: username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({
      id: newUser.id,
      email
    }, process.env.COLLAB_KEY);

  
    res.cookie('wv-collab-token', token, {
      httpOnly: true,
      secure: false
    });

    res.status(200).send({
      user,
      token
    })
  })

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });
  server.listen(process.env.NEXT_PORT || 3000, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on localhost:${process.env.NEXT_PORT || 3000} - env ${process.env.NODE_ENV}`);
  });
})()