# Página de prueba de Prisma

Esta página muestra datos desde tu base de datos PostgreSQL usando Prisma ORM.

## Configuración necesaria

Para que esta página funcione correctamente, asegúrate de:

1. Tener la base de datos PostgreSQL correctamente configurada
2. Verificar que las credenciales en el archivo `.env.local` sean correctas
3. La variable de entorno `DATABASE_URL_LOOPERS` debe apuntar a tu base de datos

## Cómo usar esta página

Esta página de prueba muestra tres tipos de datos:

- **Ciudades**: Muestra información básica de ciudades, incluyendo sus estados, si son capitales, etc.
- **Infraestructuras**: Muestra diversas infraestructuras con sus propiedades.
- **Eventos**: Muestra eventos con sus detalles.

## Solución de problemas

Si ves errores en lugar de datos:

1. Verifica la conexión a la base de datos
2. Comprueba que las credenciales son correctas en tu archivo `.env.local`
3. Revisa los logs del servidor para más información
