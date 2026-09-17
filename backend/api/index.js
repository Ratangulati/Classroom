import { loadEnv } from '../config/env.js';
import { dbConnection } from '../db/dbConnection.js';
import { buildApp } from '../app.js';

const env = loadEnv();

await dbConnection(env.MONGO_URL);

const app = buildApp({ frontendUrl: env.FRONTEND_URL });

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});

export default app;
