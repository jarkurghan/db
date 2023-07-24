import db from "../tools/db/db.js";
let apis = {};

apis.clone = async (req, res) => {
  try {
    const redundant = [
      "files",
      "file_chunk",
      "__migrations",
      "__migrations_lock",
    ];
    const knex = await db(req.headers["db-url"]);
    let tables = await knex("information_schema.tables")
      .where("table_schema", "public")
      .select("table_name");
    const t2 = [];
    for (let i = 0; i < tables.length; i++)
      if (redundant.indexOf(tables[i].table_name) === -1)
        t2.push(tables[i].table_name);

    const result = {};
    for (let i = 0; i < t2.length; i++) {
      process.stdout.write("\r" + (i + 1) + "/" + t2.length);
      result[t2[i]] = await knex(t2[i]);
    }
    process.stdout.write("\r");

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json("An error occurred");
  }
};

apis.insert = async (req, res) => {
  try {
    const knex = await db(req.headers["db-url"]);
    const base = JSON.parse(req.file.buffer.toString());
    const tables = Object.keys(base);
    const r = [...tables];
    for (let i = 0; i < tables.length; i++) {
      console.log("table name:", tables[i]);
      let bl = true;
      if (base[tables[i]].length === 0) {
        bl = false;
        console.log("\x1b[32mDONE\x1b[0m");
        r.splice(r.indexOf(tables[i]), 1);
      }
      while (bl)
        await knex(tables[i])
          .insert(base[tables[i]])
          .then(() => {
            bl = false;
            console.log("\x1b[32mEMPTY\x1b[0m");
            r.splice(r.indexOf(tables[i]), 1);
          })
          .catch(async (e) => {
            if (/foreign/.test(e.constraint)) {
              let item = await knex(
                e.detail.slice(
                  e.detail.indexOf('"') + 1,
                  e.detail.lastIndexOf('"')
                )
              );
              if (item.length === 0) {
                let t = tables.indexOf(
                  e.detail.slice(
                    e.detail.indexOf('"') + 1,
                    e.detail.lastIndexOf('"')
                  )
                );
                tables[t] = tables[i];
                tables[i] = e.detail.slice(
                  e.detail.indexOf('"') + 1,
                  e.detail.lastIndexOf('"')
                );
                console.log("replaced:", tables[t], "->", tables[i]);
                i--;
                bl = false;
              } else
                ix[
                  e.detail.slice(
                    e.detail.indexOf("(") + 1,
                    e.detail.indexOf(")")
                  )
                ] = item[Math.floor(Math.random() * 1000) % item.length].id;
            } else {
              if (!e.detail && !e.constraint) console.log(e);
              console.log(
                "\x1b[33mIgnore\x1b[0m",
                "\x1b[31m",
                e.constraint,
                "\x1b[0m"
              );
              console.log(e.detail);
              bl = false;
            }
          })
          .catch((er) => {
            console.log(er);
          });
    }
    res.status(200).json(r);
  } catch (e) {
    console.log(e);
    res.status(500).json("An error occurred");
  }
};

export default apis;
