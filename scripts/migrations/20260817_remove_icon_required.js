import mongoose from "mongoose";

export const up = async () => {
  const Technology = mongoose.model("Technology");

  await Technology.updateMany(
    { "technologies.icon": { $exists: false } },
    { $set: { "technologies.$[].icon": "" } }
  );

  console.log("Migración completada: iconos vacíos agregados donde faltaban");
};

export const down = async () => {
  console.log("Rollback no necesario para esta migración");
};
