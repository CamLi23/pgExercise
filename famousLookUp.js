const pg = require("pg");
const settings = require("./settings");

const person = process.argv[2];
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people where first_name = $1::text OR last_name = $1::text", [person], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Searching ...`);
    console.log(`Found ${result.rows.length} person(s) by the name ${person}:`);

    for (let i = 0; i < result.rows.length; i++){
      let currRes = result.rows[i];
      let bd = currRes.birthdate;
      console.log(bd.getDate());
      console.log(bd.getMonth());
      console.log(`- ${currRes.id}: ${currRes.first_name} ${currRes.last_name}, born ${currRes.birthdate}`);
    };
    client.end();
  });
});