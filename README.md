# Kinda challenge

Este proyecto es un challenge para KindaLab el cual consiste en visualizar películas filmadas en San Francisco. Utiliza React y TypeScript para el frontend y Express para el backend el cual consume un archivo CSV con información sobre las películas para mostrar datos de forma dinámica en el frontend.

# DevOps

## 1. **Control de versiones**

- **Control de versiones**: Utilizar Git y plataformas como **GitHub** para gestionar el código.
- **Ramas y estrategias de despliegue**:
  - `main`: Rama de producción.
  - `develop`: Rama para desarrollo y pruebas.
- **Flujo de trabajo**: Cada vez que un desarrollador hace un cambio, este es revisado y mergeado a través de pull requests para asegurar la calidad del código.

## 2. **Automatización de CI/CD**

### CI
- **GitHub Actions**: Configurar workflows que ejecuten pruebas automáticas cada vez que se haga un commit en el repositorio.
- **Tests Automáticos**: Ejecutar pruebas unitarias y de integración.
- **Linter**: Verificar la calidad del código y el cumplimiento de las convenciones.

### CD
- **Vercel / Netlify / Heroku**: Usar plataformas como Vercel o Netlify para automatizar el despliegue en un entorno de producción. (Vercel es mi recomendación).
- **Despliegue en Staging**: Desplegar en un entorno de prueba para asegurar que todo funcione correctamente antes de realizar el despliegue final en producción.

## 3. **Gestión de secret keys**

- **Variables de entorno**: Usar archivos `.env` para almacenar claves sensibles (en este caso la app no utiliza).

## 4. **Contenedores**

### Docker
- **Docker**: Crear imágenes de la aplicación para garantizar que se ejecute de la misma forma en todos los entornos.
- **Docker Compose**: Usar Docker Compose para definir y gestionar multi-contenedores en el desarrollo local.


## Conclusión

El enfoque DevOps asegura que la aplicación se pueda entregar de manera confiable, con una integración continua de código y despliegues, un monitoreo activo y una estrategia de escalabilidad bien definida. Al implementar prácticas de DevOps, podemos reducir riesgos en producción, mejorar la calidad del desarrollo y aumentar la eficiencia en el desarrollo.

_Hecho con ❤️ por Nacho_
