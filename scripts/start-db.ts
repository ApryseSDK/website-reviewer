import util from 'util';
import 'dotenv/config';

const exec = util.promisify(require('child_process').exec);

(async () => {
  
  await exec(`cd node_modules/@pdftron/collab-db-postgresql && yarn start-local-db --password=${process.env.DB_PASSWORD}`)

})()