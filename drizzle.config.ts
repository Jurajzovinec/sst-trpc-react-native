import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: ["./services/db/src/**/*.sql.ts"],
  out: "./services/db/migrations",
  dbCredentials: {
    host: Resource.Database.host,
    port: Resource.Database.port,
    user: Resource.Database.username,
    password: Resource.Database.password,
    database: Resource.Database.database,
  },
});