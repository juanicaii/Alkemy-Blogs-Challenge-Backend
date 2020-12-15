const mysql = require('mysql2/promises');
const { Sequelize } = require('sequelize');

module.exports = db = {};

createDatabase();

async function createDatabase() {
  const connection = await mysql.createConecction({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });
  //   CREACION DE LA BD SI NO EXISTE
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``);

  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
    }
  );

  db.sequelize = sequelize;

  await sequelize.sync();
  console.log('Connection established');
}
