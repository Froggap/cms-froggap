import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = ['http://localhost:5173'];

if (process.env.HOST_NAME) {
  allowedOrigins.push(process.env.HOST_NAME);
}

export const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
