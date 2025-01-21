import { Surreal } from "surrealdb";

const db = new Surreal({
})

await db.connect("wss://picked-rabbit-069pg8u6bltkndmif8h5q0q0tk.aws-euw1.surreal.cloud", {
  namespace: "kfmed",
  database: "vtubedex",
  auth: {
    username: "db",
    password: "a",
    namespace: "kfmed"
  }
});

export default db;
