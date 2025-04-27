# Greenlake City - Plataforma de Gestión de Datos para Ciudad Sostenible

Greenlake City es una plataforma web integral para la gestión y visualización de datos de una ciudad sostenible. La aplicación permite a ciudadanos, investigadores y empresarios acceder a información sobre infraestructura urbana, sensores ambientales, eventos, transporte y más, con enfoque en la sostenibilidad.

## 🌿 Características Principales

- **Portal Ciudadano**: Interfaz amigable para que los ciudadanos exploren datos sobre la ciudad sostenible
- **Mapas Interactivos**: Visualización geoespacial de infraestructura, sensores y métricas ambientales
- **Estadísticas en Tiempo Real**: Paneles con información actualizada sobre calidad del aire, agua, tráfico y más
- **Gestión de Infraestructura**: Seguimiento de restaurantes, hoteles, parques y centros de transporte sostenibles
- **Sección de Eventos**: Información sobre eventos activos y próximos en la ciudad
- **Autenticación de Usuarios**: Sistema de registro y acceso para diferentes tipos de usuarios
- **Exportación de Datos**: Posibilidad de descargar datos en formatos CSV y Excel para análisis

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React, Next.js 15, TailwindCSS 4
- **Backend**: Next.js API Routes, Express
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Mapas**: Leaflet con React-Leaflet
- **Gráficos**: Chart.js con React-chartjs-2
- **Autenticación**: NextAuth.js, sistema de auth personalizado
- **Exportación de Datos**: xlsx, file-saver
- **Estilizado**: TailwindCSS

## 📊 Modelos de Datos Principales

- **Cities**: Ciudades con datos geoespaciales y métricas de sostenibilidad
- **Infrastructure**: Diferentes tipos de infraestructura urbana (restaurantes, hoteles, parques, etc.)
- **Sensors**: Red de sensores que monitorean condiciones ambientales y de tráfico
- **Events**: Eventos programados en la ciudad
- **Transport**: Rutas de transporte y vehículos eléctricos de alquiler

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Node.js (versión 18 o superior)
- PostgreSQL (versión 12 o superior)
- Base de datos PostgreSQL configurada con PostGIS para soporte geoespacial

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd greenlake-pgd
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o con pnpm
   pnpm install
   ```

3. **Configurar las variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   DATABASE_URL_LOOPERS="postgresql://usuario:contraseña@localhost:5432/greenlake"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=tu_secreto_aquí
   ```

4. **Ejecutar las migraciones de Prisma**
   ```bash
   npx prisma generate
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

6. **Acceder a la aplicación**
   Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## 🗄️ Estructura del Proyecto

```
greenlake-pgd/
├── app/               # Código de la aplicación Next.js
│   ├── api/           # API Routes y endpoints
│   ├── components/    # Componentes React reutilizables
│   ├── ciudadano/     # Sección para ciudadanos
│   ├── hydraulic-map/ # Mapa hidráulico
│   ├── map/           # Mapa general
│   ├── providers/     # Proveedores de contexto (autenticación, etc.)
│   ├── statistics/    # Página de estadísticas
│   └── ...            # Otras páginas y componentes
├── lib/               # Utilidades y funciones auxiliares
│   ├── api-client.ts  # Cliente para llamadas a la API
│   ├── prisma.ts      # Configuración de Prisma
│   └── types.ts       # Tipos de TypeScript
├── mcp_contexts/      # Contextos para MCP (Model Context Protocol)
├── prisma/            # Esquema y migraciones de Prisma
│   └── schema.prisma  # Definición del modelo de datos
└── public/            # Archivos estáticos públicos
```

## 📲 Secciones Principales de la Aplicación

### 🏠 Página de Inicio
Presenta una visión general de Greenlake City, destacando las características de sostenibilidad de la ciudad y mostrando secciones de restaurantes, hoteles, parques y opciones de transporte sostenibles.

### 🗺️ Mapas
- **Mapa General**: Visualización de la ciudad con capas para mostrar infraestructuras, sensores y más.
- **Mapa Hidráulico**: Visualización específica de datos relacionados con el agua.

### 📈 Estadísticas
Panel de control con gráficas y visualizaciones de datos sobre diferentes aspectos de la ciudad:
- Infraestructura sostenible
- Calidad del aire
- Métricas de agua
- Datos de tráfico
- Eventos

### 👤 Autenticación
Sistema de registro y acceso para diferentes tipos de usuarios:
- Ciudadanos
- Investigadores
- Empresarios

## 🌐 Endpoints de API

La aplicación proporciona varios endpoints de API para acceder a los datos:

- **`/api/cities`**: Gestión de ciudades
- **`/api/sensors`**: Datos de sensores
- **`/api/sensors/metrics`**: Métricas específicas de los sensores
- **`/api/infrastructure`**: Información sobre infraestructura
- **`/api/parks`, `/api/hotels`, `/api/restaurants`**: Tipos específicos de infraestructura
- **`/api/transport-routes`**: Rutas de transporte
- **`/api/vehicles`**: Vehículos eléctricos de alquiler
- **`/api/events`**: Eventos en la ciudad
- **`/api/map/*`**: Datos geoespaciales para mapas
- **`/api/stats`**: Estadísticas agregadas

## 👨‍💻 Desarrollo

### Scripts Disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo
- **`npm run build`**: Construye la aplicación para producción
- **`npm run start`**: Inicia la aplicación construida
- **`npm run lint`**: Ejecuta el linter
- **`npm run backend`**: Inicia el servidor backend con ts-node-dev
- **`npm run generate:mcp`**: Genera contextos MCP

## 🔮 Próximas Características

- Integración con sistemas de monitoreo en tiempo real
- Aplicación móvil complementaria
- Sistema avanzado de notificaciones para alertas ambientales
- Gamificación para fomentar comportamientos sostenibles
- Análisis predictivo para consumo de recursos

## 📄 Licencia

Este proyecto es privado y está destinado únicamente para uso interno.

---

Desarrollado con 💚 para la gestión de datos de ciudades sostenibles.
