const { hash } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");

async function createAdmin(){
  const database = await sqliteConnection();

  const hashedPassword = await hash("123", 8);
  
  const checkExist = await database.get("SELECT * FROM users WHERE email = 'gabriel@gmail.com'");
  
  if(!checkExist){
    await database.run(
      "INSERT INTO users (name, email, password, is_admin) VALUES ('Gabriel Stertz', 'gabriel@gmail.com', ?, 'true')", [hashedPassword]);
    };
  };

module.exports = createAdmin;