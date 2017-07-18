const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
    connection: {
      user     : settings.user,
      password : settings.password,
      database : settings.database,
      host     : settings.hostname,
      port     : settings.port,
      ssl      : settings.ssl
    }
});


const person = process.argv[2];

knex.select('*').from('famous_people')
    .where('first_name', person)
    .orWhere('last_name', person)
    .asCallback(function(err, rows) {
      if (err) {
      return console.error("error running query", err);
      };

      console.log(`Searching ...`);
      console.log(`Found ${rows.length} person(s) by the name ${person}:`);

      for (let i = 0; i < rows.length; i++){
        let currRes = rows[i];
        console.log(`- ${currRes.id}: ${currRes.first_name} ${currRes.last_name}, born ${1900 + currRes.birthdate.getYear()}-${currRes.birthdate.getMonth() + 1}-${currRes.birthdate.getDate()}`);
      };

});

