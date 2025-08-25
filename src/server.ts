import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT} (${process.env.NODE_ENV || "development"})`);
});