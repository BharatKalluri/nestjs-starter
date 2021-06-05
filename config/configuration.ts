import { IConfiguration } from './configuration.interface';
import * as configData from '../config.json';

const nodeEnvironment: string | undefined = process.env.NODE_ENV;

if (nodeEnvironment === undefined) {
  throw Error(`NODE_ENV is not defined`);
}

if (!['production', 'staging', 'dev'].includes(nodeEnvironment)) {
  throw Error(
    `NODE_ENV needs to be either production or staging or dev. Currently set to ${nodeEnvironment}`,
  );
}

export default (): IConfiguration => ({
  MONGODB_URI: configData.mongo.url,
  RATE_LIMIT_WINDOW_MS: configData.rateLimit.windowMS,
  RATE_LIMIT_COUNT: configData.rateLimit.count,
  FIREBASE_APP_PROJECT_ID: configData.firebase.projectId,
  FIREBASE_APP_PRIVATE_KEY: configData.firebase.privateKey,
  FIREBASE_APP_CLIENT_EMAIL: configData.firebase.clientEmail,
});
