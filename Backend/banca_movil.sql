create schema banco;
create database banca_movil;
use banca_movil;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    saldo DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE TokensActivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(500) NOT NULL,
    expiracion DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE movimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo_movimiento ENUM('DEPOSITO', 'RETIRO', 'TRANSFERENCIA') NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE transferencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    remitente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    descripcion VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (remitente_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destinatario_id) REFERENCES users(id) ON DELETE CASCADE
);

select * from tokensactivos;
select * from users;
select * from transferencias;
select * from movimientos;






