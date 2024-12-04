const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({ path: './env'});


//Funcion de conectarse a la base de datos
async function connect() {
    try {
        const HOST = process.env.DB_HOST;
        const PORT = process.env.DB_PORT;
        const USER = process.env.DB_USER;
        const PASSWORD = process.env.DB_PASSWORD;
        const DATABASE = process.env.DB_NAME;

        const conn = await mysql.createConnection({
            'host': HOST,
            'port': PORT,
            'user': USER,
            'password': PASSWORD,
            'database': DATABASE
        });
        console.log('Conexión creada');
        return conn;

    } catch(err) {
        console.log('Ocurrió un error al intentar realizar la conexión: ' + err);
        throw err;
    }
}

module.exports = connect;