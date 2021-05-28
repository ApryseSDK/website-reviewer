import util from 'util';
import { config } from 'dotenv';
import * as path from 'path';

config({
  path: path.resolve(__dirname, '../.env.local')
})

const exec = util.promisify(require('child_process').exec);

(async () => {

  const { stdout, stderr } =  await exec(`cd node_modules/@pdftron/collab-db-postgresql && yarn start-local-db --noMount --name=pg-reviewer --password=${process.env.DB_PASSWORD}`);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);

})()