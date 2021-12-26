import { cleanEnv, str, port } from 'envalid';

const config = cleanEnv(process.env, {
  MONGODB_URI: str({ default: 'mongodb://localhost:27017/mount-books' }),
  NODE_ENV: str({ default: 'development' }),
  PORT: port({ default: 7000 }),
  JWT_SECRET: str({ default: 'Secret!' }),
});

export default config;
