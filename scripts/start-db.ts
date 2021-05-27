import util from 'util';
import { config } from 'dotenv';
import * as path from 'path';

config({
  path: path.resolve(__dirname, '../.env.local')
})

const exec = util.promisify(require('child_process').exec);

(async () => {
  
  await exec(`cd node_modules/@pdftron/collab-db-postgresql && yarn start-local-db --password=${process.env.DB_PASSWORD}`)

})()