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



-- Tabla de usuarios
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    saldo DECIMAL(10,2) DEFAULT 0.00
);


CREATE TABLE transferencias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    monto DECIMAL(10,2),
    tipo ENUM('RETIRO', 'DEPOSITO'),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    codigo_qr VARCHAR(255),
    estado ENUM('PENDIENTE', 'COMPLETADO', 'CANCELADO') DEFAULT 'PENDIENTE',
    FOREIGN KEY (usuario_id) REFERENCES users(id)
);

select * from tokensactivos;
select * from users;
select * from transferencias;
select * from movimientos;

drop table transferencias;




