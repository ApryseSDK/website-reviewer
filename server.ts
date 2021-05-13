import { createServer } from 'http';
import { parse } from 'url';
import next from 'next'
import CollabServer from '@pdftron/collab-server';
import CollabDatabase from '@pdftron/collab-db-postgresql';
require('dotenv').config()
const db = new CollabDatabase({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dbName: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const server = new CollabServer({
  resolvers: db.getResolvers()
})

// @ts-ignore
db.setServer(server);
server.start();



const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    // const { pathname, query } = parsedUrl

    handle(req, res, parsedUrl)
  }).listen(process.env.NEXT_PORT || 3000, () => {
    console.log(`> Ready on http://localhost:${process.env.NEXT_PORT || 3000}`)
  })
})