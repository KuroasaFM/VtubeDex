import { Surreal } from "surrealdb";

const db = new Surreal({
})

const DATABASE = process.env.NODE_ENV == "production" ? "vtubedex" : "vtubedex-dev";

await db.connect("wss://picked-rabbit-069pg8u6bltkndmif8h5q0q0tk.aws-euw1.surreal.cloud", {
  namespace: "kfmed",
  database: DATABASE,
  auth: {
    username: process.env.DB_USER ?? "",
    password: process.env.DB_PASSWORD ?? "",
    namespace: "kfmed"
  }
});

export default db;
