# CMS Froggap - Backend

Este es el backend de la aplicación CMS Froggap, estructurado siguiendo los principios de la **Arquitectura Hexagonal Soft** (Ports and Adapters) adaptada para un entorno pragmático de JavaScript.

## 🚀 Arquitectura: Hexagonal Soft

El proyecto se ha refactorizado para separar claramente la lógica de negocio de los detalles técnicos y la infraestructura. Esto facilita el testing, el mantenimiento y la escalabilidad.

### Capas del Proyecto

#### 1. Core (Capa de Dominio) - `src/core`
Es el corazón de la aplicación. Contiene la lógica pura de negocio.
- **Use Cases**: Funciones que orquestan el flujo de datos y aplican las reglas de negocio. No dependen de ninguna librería externa de infraestructura (como Express o Mongoose).
- **Dependency Injection**: Los casos de uso reciben sus dependencias (repositorios, servicios de hash) por parámetros, lo que permite intercambiarlos fácilmente (útil para testing).

#### 2. Infrastructure (Capa de Adaptadores) - `src/infrastructure`
Contiene las implementaciones técnicas y adaptadores para el mundo exterior.
- **Database (Mongoose)**: Esquemas de MongoDB y la implementación de Repositorios que ocultan los detalles de Mongoose al Core.
- **HTTP**: Todo lo relacionado con Express (Rutas, Controladores, Middlewares, Validadores).
- **External Services**: Adaptadores para servicios de terceros como Cloudinary, JWT (Token Service) y Hashing (Bcrypt).

#### 3. Config - `src/config`
Configuraciones globales de la aplicación como la conexión a la base de datos y políticas de CORS.

---

## 📂 Estructura de Directorios

```text
src/
├── core/                    # Lógica de Negocio Pura
│   └── auth/
│       └── use-cases/       # Casos de uso de autenticación
├── infrastructure/          # Detalles Técnicos
│   ├── database/
│   │   └── mongoose/        # MongoDB / Mongoose
│   ├── external/            # JWT, Cloudinary, Hashing
│   └── http/                # Express (Routes, Controllers, etc.)
├── config/                  # Configuraciones (DB, CORS)
├── app.js                   # Setup de la App Express
└── index.js                 # Punto de entrada y servidor
```

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución.
- **Express**: Framework web.
- **Mongoose**: ODM para MongoDB.
- **JWT**: Autenticación basada en tokens.
- **BcryptJS**: Hashing de contraseñas.
- **Cloudinary**: Gestión de archivos multimedia.
- **Express Validator**: Validación de datos de entrada.

---

## ⚙️ Configuración y Ejecución

### Requisitos Previos
- Node.js instalado.
- Instancia de MongoDB (local o Atlas).

### Variables de Entorno
Crea un archivo `.env` en la raíz con las siguientes variables:
```env
PORT=3000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_super_seguro
CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
NODE_ENV=development
```

### Instalación
```bash
npm install
```

### Ejecución
```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

---

## 🔐 Autenticación

El sistema utiliza un esquema de **Access Token (JWT)** y **Refresh Token (Almacenado en DB)**.
1. Al hacer login, el usuario recibe un Access Token y se establece una Cookie `httpOnly` con el Refresh Token.
2. El Access Token expira en 15 minutos.
3. Se puede obtener un nuevo Access Token usando el endpoint de `/refresh` que valida el Refresh Token de la cookie.
4. Al hacer logout, el Refresh Token se invalida en la base de datos.

---

## 📝 Licencia
ISC
