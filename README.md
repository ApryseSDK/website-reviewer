# PDFTron Website Reviewer

![](https://www.pdftron.com/assets/blog/Announcing-WebViewer-Collaboration.png)

This is a runnable and deployable sample project created using [WebViewer](https://www.npmjs.com/package/@pdftron/webviewer), [WebViewer HTML](https://www.npmjs.com/package/@pdftron/webviewer-html) and [WebViewer Collaboration](https://collaboration.pdftron.com/).

This project is used to showcase a real-time feedback loop on live webpages. This is useful for design+development iteration.

## How it works

Once a user is signed in, they can create a new "document" using the URL of a website. When a document is created, a snapshot of that website is taken and stored on the local file system.

That snapshot is then loaded into WebViewer using the WebViewer HTML module.

This document can then be shared with colleagues simply by sending them the URL to the document. 

Realtime collaboration is then handled by the WebViewer Collaboration system. Any new annotations are sent in real time to any other members of the document.

## Requirements

This project requires Docker to be installed. Docker is used to set up a PostgreSQL database on the local machine.

## Installation and setup

First, install dependencies by running:

```
yarn
```

Next, make a copy of `.env.local.example` and name it `.env.local`. This file will be used to set your environment variables. **By default, no changes need to be made to this file to run locally.** However, if you want to deploy to a production server, you will need to change these variables to suit your production environment.

Next, start the local database by running:

```
yarn start-db
```

This will set up a docker container with an empty PostgreSQL database.

Next, seed the database by running:

```
yarn init-db
```

This will set up all the tables and columns needed for the Collaboration system to function.

Now you are ready to run the project!

To start the project run:

```
yarn dev
```

All servers will be started, and you can access the UI at `localhost:3000`.

## Technology used

- [WebViewer](https://www.npmjs.com/package/@pdftron/webviewer) Used to render documents and annotate on them
- [WebViewer HTML](https://www.npmjs.com/package/@pdftron/webviewer-html) Used to load HTML documents inside of WebViewer
- [WebViewer Collaboration](https://collaboration.pdftron.com/) Handles all collaboration related functionality

- [NextJS](https://nextjs.org/) Next JS is our React framework used to handle routing and SSR.
- [ChakraUI](https://chakra-ui.com/) Chakra UI is used for theming and styles
- [Puppeteer](https://developers.google.com/web/tools/puppeteer) Puppeteer is used as a utility to the the height of a web page
- [Express](https://expressjs.com/) Express is used to set up a simple REST API for getting metadata about documents
- [website-scraper](https://www.npmjs.com/package/website-scraper) This package is used to create the "snapshots" of the websites.