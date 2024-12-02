const mysql = require('mysql2/promise');
//Funcion de conectarse a la base de datos
async function connect() {
    try {
        const HOST = 'localhost';
        const PORT = 3306;
        const USER = 'root';
        const PASSWORD = 'Yacko';
        const DATABASE = 'banca_movil';

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