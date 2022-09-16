declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      DATABASE_NAME: string;
      DATABASE_HOST: string;
      DATABASE_PASSWORD: string;
      DATABASE_USER: string;
    }
  }
}

export {}
