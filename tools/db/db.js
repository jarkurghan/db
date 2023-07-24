import knex from "knex";

const db = async function (url, ssl = false) {
  const db = knex({
    client: "pg",
    connection: {
      connectionString: url,
      ssl: ssl ? false : { rejectUnauthorized: false },
    }
  });
  return db;
};

export default db