import { IConfiguration } from './configuration.interface';
import * as configData from '../config.json';

const nodeEnvironment: string = process.env.NODE_ENV;

if (!['production', 'staging', 'dev'].includes(nodeEnvironment)) {
  throw Error(
    `NODE_ENV needs to be either production or staging or dev. Currently set to ${nodeEnvironment}`,
  );
}

export default (): IConfiguration => ({
  MONGODB_URI: configData.mongo.url,
});
