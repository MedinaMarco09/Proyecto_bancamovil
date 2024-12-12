Proyecto Aplicaciones Moviles y Base de datos ll

Contribuidores:
Kassandra Judith Camacho Martinez
Marco Antonio Medina Garciglia
Víctor José de la torre sui qui

Proyecto Figma: https://www.figma.com/design/bgdZZ04JcYNS95rB4HLhhq/Untitled?node-id=0-1&node-type=canvas&t=RxxOYpUvmJOKK97D-0

# Aplicación de Banca Móvil

Esta es una aplicación de banca móvil que permite a los usuarios registrarse, iniciar sesión, realizar transferencias, generar y escanear códigos QR para transacciones, y ver el historial de transacciones.

## Tecnologías Utilizadas

### Backend
- **Node.js y Express**: Utilizados para construir el servidor backend y definir las rutas de la API.
- **MySQL**: Base de datos utilizada para almacenar la información de los usuarios, transferencias y tokens activos.
- **JWT (JSON Web Tokens)**: Utilizados para manejar la autenticación de usuarios.
- **bcrypt**: Utilizado para hashear las contraseñas de los usuarios antes de almacenarlas en la base de datos.
- **QRCode**: Biblioteca utilizada para generar códigos QR.

### Frontend
- **React Native**: Utilizado para construir la aplicación móvil.
- **Expo**: Facilita el desarrollo y la construcción de la aplicación móvil.
- **Axios**: Utilizado para realizar peticiones HTTP al servidor backend.
- **React Native QR Code Scanner**: Biblioteca utilizada para escanear códigos QR en la aplicación móvil.

### Navegación
- **react-navigation**: Utilizado para manejar la navegación entre pantallas en la aplicación móvil.

## Funcionalidades
- **Registro e inicio de sesión de usuarios**.
- **Realización de transferencias**.
- **Generación y escaneo de códigos QR para transacciones**.
- **Visualización del historial de transacciones**.

## Estructura del Proyecto
- **Backend**: Archivos principales incluyen `index.js` (configuración del servidor y rutas) y `db.js` (conexión a la base de datos).
- **Frontend**: Componentes principales incluyen `HomeScreen.js`, `LoginScreen.js`, `RegisterScreen.js`, `DashboardScreen.js`, `TransferScreen.js`, `TransactionHistoryScreen.js`, y `QRCodeScannerScreen.js`.
- **Configuración de Expo**: Archivo `app.json`.
