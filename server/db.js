const mysql=require("mysql2");
const connection=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "manager",
    database: "hms",
    port: 3306,
    waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
// connection.connect();
module.exports=connection;


