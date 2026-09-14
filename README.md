# Propuesta digital ADDV — Tortas y Tacos Ahogados (Morelia)

Sitio estático de una sola página, pensado para reemplazar una presentación de venta.
No requiere build, ni Node, ni Docker — son solo archivos HTML/CSS/JS.

## Estructura

```
index.html              → todo el contenido y las secciones
assets/css/styles.css   → colores, tipografías y estilos (identidad ADDV)
assets/js/main.js       → animaciones, menú, acordeón de preguntas, pestañas de paquetes
assets/images/          → aquí van las fotos reales (ver PROMPTS_IMAGENES.md)
```

## Publicar en GitHub Pages (5 minutos)

1. Crea un repositorio nuevo en GitHub (puede ser público o privado con GitHub Pages habilitado en tu plan).
2. Sube todo el contenido de esta carpeta a la raíz del repositorio (no lo metas en una subcarpeta).
3. En GitHub: **Settings → Pages → Source** selecciona la rama `main` y la carpeta `/ (root)`. Guarda.
4. En 1–2 minutos tu sitio estará disponible en:
   `https://<tu-usuario-de-github>.github.io/<nombre-del-repositorio>/`
5. Comparte ese link con tu cliente (el dueño del negocio de tortas y tacos ahogados) por WhatsApp o al presentarle la propuesta en persona.

## Antes de compartirlo, personaliza esto

- **Número de WhatsApp**: abre `assets/js/main.js` y cambia la línea:
  `var WHATSAPP_NUMBER = "5214431234567";` por el número real de ADDV (52 + lada + 10 dígitos, sin espacios ni signos).
- **Fotos**: reemplaza los recuadros de "Reemplazar con foto real" siguiendo `PROMPTS_IMAGENES.md`.
- **Precios de los paquetes** (sección "Elige cómo empezar" en `index.html`): son cifras de referencia para arrancar la conversación — ajústalas a lo que realmente vas a cobrar.
- **Nombre del negocio del cliente**: si quieres personalizar el saludo de WhatsApp, cambia `NEGOCIO_NOMBRE` en `main.js`.

## Qué hace el sitio (resumen técnico, en palabras simples)

- Es un "scroll de presentación": cada sección ocupa la pantalla completa, como una diapositiva, y hay puntos a la derecha (en computadora) que muestran en qué parte vas.
- Las animaciones aparecen solo cuando el usuario llega a esa parte de la página (no se mueve todo de golpe).
- El botón flotante de WhatsApp y todos los botones "Agenda tu sesión" abren una conversación de WhatsApp con un mensaje ya escrito.
- Funciona igual de bien en celular, tablet y computadora.
