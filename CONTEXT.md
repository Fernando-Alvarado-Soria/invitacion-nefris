# CONTEXT.md — Invitación de Cumpleaños (Nefris)

> **Propósito de este archivo:** Sirve como memoria del proyecto. Cada vez que se haga un cambio y se haga commit + push, este archivo debe actualizarse con lo que se modificó, por qué, y el estado actual. Así puedes retomar el trabajo desde cualquier computadora sin depender del historial del chat local de VS Code.

---

## Repositorio

- **GitHub:** [Fernando-Alvarado-Soria/invitacion-nefris](https://github.com/Fernando-Alvarado-Soria/invitacion-nefris)
- **Rama principal:** `main`
- **Desplegado en:** Vercel (plan gratuito, dominio `.vercel.app`)

---

## Stack

- HTML5, CSS3, JavaScript vanilla (sin frameworks, sin bundler)
- Desplegado como sitio estático en Vercel

---

## Estructura del proyecto

```
invitacion-nefris/
├── index.html          # Única página del sitio
├── styles.css          # Todos los estilos
├── script.js           # Toda la lógica JS
├── vercel.json         # Configuración de Vercel (headers HTTP)
├── CONTEXT.md          # Este archivo
└── img/
    ├── sello.webp          # Sello/botón del sobre (usado en producción)
    ├── sello.png           # Versión PNG de respaldo
    ├── sobre-derecho.webp  # Fondo derecho del sobre
    ├── sobre-derecho.png   # Versión PNG de respaldo
    ├── sobre-izquierdo.webp # Lado izquierdo del sobre
    └── sobre-izquierdo.png  # Versión PNG de respaldo
```

---

## Funcionalidades implementadas

### 1. Pantalla de sobre (envelope screen)
- Al entrar al sitio se muestra una pantalla de sobre a pantalla completa (`#envelope-screen`)
- El sobre tiene 3 capas de imagen: fondo derecho, lado izquierdo y sello central
- El sello tiene animación de pulso (`pulseSeal`) para indicar que es clickeable
- Al hacer clic en el sello, el sobre se "abre": las dos mitades se deslizan hacia afuera con CSS transitions
- Después de 1.5s el sobre desaparece con fade y aparece el contenido de la invitación

### 2. Contenido de la invitación (`<main id="invitation-content">`)
Secciones en orden:
- **Hero:** imagen de fondo (Unsplash), título, fecha, botón "Ver invitación"
- **Con mucho cariño:** texto introductorio
- **Detalles del evento:** fecha (18 dic), hora (6pm), lugar (Coyuca de Benítez), botón "Ver ubicación" (URL pendiente)
- **Contador regresivo:** muestra días/horas/minutos/segundos hasta el 18 de diciembre de 2026 a las 18:00
- **Código de vestimenta:** Formal / Elegante
- **Regalos:** lluvia de sobres
- **Confirmar asistencia:** botón que abre el modal RSVP

### 3. Animaciones de scroll (IntersectionObserver)
- Todas las secciones tienen clase `.fade-in`
- Al entrar en el viewport se agrega `.visible` que activa la transición de opacidad + translateY
- Se usa `observer.unobserve()` para que la animación solo ocurra una vez

### 4. Modal RSVP
- Se abre al hacer clic en "Confirmar por WhatsApp"
- Pide el nombre del invitado (input con validación)
- Se puede cerrar con: botón ×, botón Cancelar, clic en el fondo oscuro, tecla Escape
- Al confirmar:
  1. Intenta registrar el nombre en Google Sheets vía Google Apps Script (si la URL está configurada)
  2. Abre WhatsApp con mensaje pre-llenado: `¡Hola! Confirmo mi asistencia a tu cumpleaños. Soy {nombre}`
  3. El número de WhatsApp está hardcodeado en `script.js`: `527531433836`

### 5. Footer
- Texto simple: "Con cariño, gracias por formar parte de este momento especial."

---

## Variables / valores a configurar

Estos valores están en el código y pueden necesitar actualizarse:

| Archivo | Variable / elemento | Valor actual | Pendiente |
|---|---|---|---|
| `script.js` | `APPS_SCRIPT_URL` | `"APPS_SCRIPT_URL_AQUI"` | Reemplazar con la URL del Google Apps Script desplegado |
| `script.js` | `WHATSAPP_NUMBER` | `"527531433836"` | Verificar que sea el número correcto con código de país |
| `index.html` | `href` del botón "Ver ubicación" | `href="#"` | Reemplazar `#` con el link de Google Maps del lugar |
| `index.html` | Fecha en `<h1>` y secciones | `Viernes 18 de diciembre` | Si la fecha cambia, actualizar aquí y en `script.js` |
| `script.js` | `eventDate` | `December 18, 2026 18:00:00` | Si la fecha/hora cambia, actualizar aquí |
| `styles.css` | Imagen hero | URL de Unsplash hardcodeada | Considera alojar la imagen localmente en `/img/` |

---

## Manejo de cache (Vercel)

**Problema original:** Al desplegar en Vercel con el dominio gratuito `.vercel.app`, los navegadores (especialmente en móvil) cacheaban las imágenes y CSS de forma agresiva, haciendo que los cambios no se vieran sin borrar cache manualmente.

**Solución implementada (27 mayo 2026):**

### `vercel.json`
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store, no-cache, must-revalidate" },
        { "key": "Pragma",        "value": "no-cache" },
        { "key": "Expires",       "value": "0" }
      ]
    }
  ]
}
```
- El patrón `/(.*)`  es válido en la sintaxis `path-to-regexp` que usa Vercel
- Aplica a todos los archivos del sitio
- **Nota:** Los patrones tipo `/(.*\\.css)` con backslash **no son válidos** en Vercel y rompen el deploy

### Meta tags en `index.html`
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```
Fallback para webviews (preview de WhatsApp, etc.) donde los headers HTTP a veces se ignoran.

### Query string versioning (`?v=FECHA`)
Todos los `src` y `href` de assets en `index.html` tienen `?v=20260527`:
```html
<link rel="stylesheet" href="styles.css?v=20260527" />
<img src="img/sello.webp?v=20260527" ...>
```
**Cómo usarlo:** Cuando hagas cambios a imágenes o CSS, cambia la fecha en todos los `?v=` al día del deploy. El navegador lo trata como URL nuevo y descarga el archivo fresco.

---

## Flujo de trabajo recomendado para futuros cambios

1. Haz los cambios en el código
2. Si cambias imágenes, CSS o JS → actualiza el número `?v=YYYYMMDD` en `index.html` a la fecha de hoy
3. Actualiza este archivo `CONTEXT.md` con lo que cambiaste (sección Changelog)
4. `git add .` → `git commit -m "descripción"` → `git push`
5. Vercel despliega automáticamente al detectar el push en `main`

---

## Paleta de colores

Definida como variables CSS en `styles.css`:

```css
--color-primary:      #c98276   /* rosa/salmón principal */
--color-primary-dark: #a85f55   /* hover de botones */
--color-accent:       #9b5c54   /* títulos h2 */
--color-text:         #4b2e2e   /* texto general */
--color-bg:           #fff7f3   /* fondo de página */
--color-footer-bg:    #ead3cc   /* fondo del footer */
```

---

## Changelog

### [27 mayo 2026]
**Cache busting para Vercel sin dominio personalizado**
- Creado `vercel.json` con headers `Cache-Control: no-store, no-cache, must-revalidate` para todos los archivos mediante el patrón `/(.*)`
- Agregados meta tags HTTP-equiv en `<head>` de `index.html` como fallback para webviews
- Agregado query string `?v=20260527` a todos los recursos en `index.html`: `styles.css`, `script.js`, y las 3 imágenes del sobre
- **Fix de deploy:** El primer `vercel.json` usaba patrones regex con backslash (`\\.(css|js)`) que son inválidos en path-to-regexp; se simplificó a `/(.*)`

---

<!-- 
  INSTRUCCIÓN PARA GITHUB COPILOT / IA:
  Cuando se realice cualquier cambio en el proyecto y el usuario haga commit+push,
  agrega una entrada nueva al Changelog con:
  - Fecha (formato [DD mes AAAA])
  - Título breve del cambio
  - Descripción de qué se modificó, en qué archivos, y por qué
  Mantén las secciones de "Variables a configurar" y "Estado actual" actualizadas.
-->
