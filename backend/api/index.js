import { loadEnv } from '../config/env.js';
import { connectToDatabase } from '../db/dbConnection.js';
import { buildApp } from '../app.js';

const env = loadEnv();

const app = buildApp({ frontendUrl: env.FRONTEND_URL, allowedOrigins: env.ALLOWED_ORIGINS });

/**
 * Vercel invokes this module per request, so the app must not bind a port.
 * The database is connected lazily here rather than at import time: a
 * top-level await that rejects takes down the whole function with an opaque
 * FUNCTION_INVOCATION_FAILED instead of a readable 500.
 */
export default async function handler(req, res) {
  try {
    await connectToDatabase(env.MONGO_URL);
  } catch (err) {
    console.error('Database connection failed:', err);
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({ success: false, message: 'Database unavailable, please try again' })
    );
    return;
  }

  return app(req, res);
}

export { app };
