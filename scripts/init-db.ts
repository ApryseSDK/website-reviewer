import util from 'util';
import 'dotenv/config';

const exec = util.promisify(require('child_process').exec);

(async () => {
  const { stdout, stderr } = await exec(`cd node_modules/@pdftron/collab-db-postgresql && yarn init-db  --password=${process.env.DB_PASSWORD} --dbName=${process.env.DB_NAME}`)
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
})()