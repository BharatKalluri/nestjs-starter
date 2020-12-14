import { IConfiguration } from './configuration.interface';

export default (): IConfiguration => ({
  databaseURL: process.env.MONGO_URL,
});
