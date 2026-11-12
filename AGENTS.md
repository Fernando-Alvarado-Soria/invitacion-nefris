# Agent notes

- Es una invitación web estática de XV años, hecha en una sola página: `index.html`, `styles.css` y `script.js`; no hay framework, manifiesto de paquetes, compilación ni pruebas automatizadas. Modifica esos archivos directamente.
- El trabajo previsto incluye mejoras estéticas. Al retocar el diseño, conserva los datos del evento y el flujo existente (sobre, música, contador y confirmación RSVP), salvo que se solicite cambiar su comportamiento.
- Los recursos referenciados desde `index.html` llevan versiones `?v=YYYYMMDD` para evitar caché. Si cambias un recurso, actualiza su versión y la del preload correspondiente, si existe. `vercel.json` aplica encabezados a todas las rutas; conserva el patrón `/(.*)`, ya que Vercel no acepta aquí patrones con extensiones escapadas tipo regex.
- Los datos del evento están hardcodeados: fecha/hora del contador en `script.js` (`eventDate`) y textos visibles en `index.html`. La integración RSVP se configura con `APPS_SCRIPT_URL` y `WHATSAPP_NUMBER` en `script.js`; coordina esos valores si cambian los detalles del evento.
- `CONTEXT.md` registra historia y detalles de despliegue; consúltalo para esos temas y confirma los datos contra el código/configuración actual.
