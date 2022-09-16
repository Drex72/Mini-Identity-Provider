type ENV_SCHEMA = {
  NODE_ENV: string,
  PORT: number,
  DATABASE: {
    HOST: string,
    USER: string,
    PASSWORD: string,
    NAME: string
  }

}

export const config: ENV_SCHEMA = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT),

  DATABASE: {
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME
  }
}