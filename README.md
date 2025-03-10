# Proyecto de Imágenes Tenpo

Este proyecto es una aplicación que se conecta a la API de Unsplash para mostrar imágenes de alta calidad. Permite la visualización de fotos en una interfaz sencilla, con soporte para paginación.

## Requisitos

Antes de comenzar, asegúrate de tener los siguientes requisitos instalados:

- **Node.js** (versión 14 o superior)
- **npm** (gestor de paquetes de Node.js)

## Configuración del Proyecto

Sigue estos pasos para configurar el proyecto en tu máquina local.

### 1. Clonar el Repositorio

Primero, clona el repositorio a tu máquina local.

```bash
git clone https://github.com/refm130995/test-tenpo
```

# 2. Instalar las Dependencias

Navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:

```bash
cd test-tenpo
npm install
```

# 3. Configurar el archivo .env

Crea un archivo .env en la raíz del proyecto y agrega la siguiente configuración:

```bash
VITE_API_BASE_URL=https://api.unsplash.com
VITE_UNSPLASH_ACCESS_KEY=O5XCc6KUymnlBBlBnrZ37jdvPACTluRzSbcxmKyJSA0
```

# 4. Iniciar el Proyecto

Una vez que las dependencias estén instaladas y el archivo .env esté configurado, puedes iniciar el servidor de desarrollo ejecutando:

```bash
npm run dev
```

Esto iniciará la aplicación en el navegador en la dirección http://localhost:5173.

# 5. Acceder al Proyecto

Abre un navegador y navega a la URL proporcionada para ver la aplicación en funcionamiento. Si todo está configurado correctamente, deberías poder ver las imágenes cargadas desde la API de Unsplash.

# Estructura del Proyecto

```bash
.
├── src/
│   ├── assets/                 # Archivos estáticos
│   ├── components/             # Componentes reutilizables
│   ├── services/               # Servicios de la API
│   ├── store/                  # Gestión de estado (Zustand)
│   ├── App.tsx                 # Componente principal de la aplicación
│   └── main.tsx                # Punto de entrada de la aplicación
├── .env                        # Variables de entorno
├── package.json                # Dependencias y scripts del proyecto
├── README.md                   # Este archivo
└── tsconfig.json               # Configuración de TypeScript
```
# Funcionalidades
Paginación: La aplicación carga imágenes en lotes de 20 por página, con botones para navegar entre páginas.
Carga de imágenes: Las imágenes se cargan de la API de Unsplash y se muestran en una cuadrícula.
Manejo de errores: Si ocurre un error al cargar las imágenes, se muestra un mensaje de error.

# Tecnologías Utilizadas
 - React: Librería para construir interfaces de usuario.
 - Vite: Herramienta de desarrollo rápida y ligera para aplicaciones React.
 - TypeScript: Superset de JavaScript para un desarrollo más seguro y eficiente.
 - Axios: Cliente HTTP para realizar las solicitudes a la API de Unsplash.
 - Zustand: Librería de gestión de estado para manejar la autenticación.
 - Tailwind CSS: Framework de diseño para estilos rápidos y responsivos.

# Posibles Errores
 ### 1. Rate Limit Exceeded (Límite de tasa excedido)
Si ves el error "Rate Limit Exceeded", significa que has alcanzado el límite de solicitudes permitidas por hora en la API de Unsplash. Para solucionarlo, espera unos minutos o verifica que estás usando un Client-ID válido.
