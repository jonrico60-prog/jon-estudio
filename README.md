# Jon - Portal de Estudio

Portal personal de ejercicios y material de estudio para Jon (nacido en 2016, altas capacidades).

## Estructura

- `index.html` — pagina raiz, redirige al portal
- `app/portal.html` — portal principal con navegacion por asignaturas
- `app/tracker.js` — sistema de seguimiento de ejercicios y notas
- `Euskera/` — material de Euskera
- `Ingles/` — material de Ingles general
- `ingles-spelling-bee/` — practica de deletreo en ingles (Spelling Bee)
- `Lengua/` — material de Lengua
- `Matematicas/` — material de Matematicas
- `Gizarte/` — material de Gizarte (Sociales en euskera)
- `Jon/` — material adicional

## Asignaturas con mayor exigencia

Ingles y Matematicas se trabajan a nivel mas alto que el resto.

## Despliegue

El sitio se despliega en Cloudflare Pages como sitio estatico. Cualquier push a la rama `main` redespliega automaticamente.

### Actualizar desde Git Bash

```bash
cd "C:/Users/Eduri/OneDrive/11_JonGpt"
git add .
git commit -m "Descripcion del cambio"
git push
```
