import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import mongoose from "mongoose";
import { connect, disconnect } from "./connect.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MIGRATIONS_DIR = path.join(__dirname, "migrations");

const MigrationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  appliedAt: { type: Date, default: Date.now },
});

const Migration = mongoose.model("Migration", MigrationSchema);

const getMigrationFiles = () => {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".js"))
    .sort();
};

const getAppliedMigrations = async () => {
  const docs = await Migration.find().sort({ name: 1 });
  return docs.map((d) => d.name);
};

const migrate = async () => {
  await connect();

  const files = getMigrationFiles();
  const applied = await getAppliedMigrations();
  const pending = files.filter((f) => !applied.includes(f));

  if (pending.length === 0) {
    console.log("No hay migraciones pendientes");
    await disconnect();
    return;
  }

  for (const file of pending) {
    console.log(`Aplicando migración: ${file}`);

    const migrationPath = path.join(MIGRATIONS_DIR, file);

    const migration = await import(
      pathToFileURL(migrationPath).href
    );

    await migration.up();

    await Migration.create({ name: file });

    console.log(`Migración ${file} aplicada`);
  }

  console.log(`${pending.length} migración(es) aplicada(s)`);
  await disconnect();
};

const rollback = async () => {
  await connect();

  const applied = await getAppliedMigrations();

  if (applied.length === 0) {
    console.log("No hay migraciones para revertir");
    await disconnect();
    return;
  }

  const last = applied[applied.length - 1];

  console.log(`Revirtiendo migración: ${last}`);

  const migrationPath = path.join(MIGRATIONS_DIR, last);

  const migration = await import(
    pathToFileURL(migrationPath).href
  );

  await migration.down();

  await Migration.deleteOne({ name: last });

  console.log(`Migración ${last} revertida`);

  await disconnect();
};

const command = process.argv[2];

if (command === "rollback") {
  rollback().catch(console.error);
} else {
  migrate().catch(console.error);
}
