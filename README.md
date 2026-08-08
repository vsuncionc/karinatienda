# Karina Boutique — Catálogo Digital de Prendas de Vestir

Página web estática y profesional para promocionar prendas de vestir.  
El catálogo se genera dinámicamente leyendo un archivo `productos.json` con JavaScript puro.  
Diseñada para publicarse en **GitHub Pages** (sin backend ni base de datos).

---

## 1. ¿Qué es el proyecto?

Una vitrina digital de ropa con:

- Header y menú responsive
- Banner principal (hero)
- Catálogo generado desde JSON
- Sección de contacto (WhatsApp, Instagram, Facebook, TikTok)
- Footer

Tecnologías:

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 5 (CDN)
- Bootstrap Icons (CDN)
- JSON

---

## 2. Estructura del proyecto

```
catalogo-ropa/
│
├── index.html
├── productos.json
├── README.md
│
├── css/
│   └── estilos.css
│
├── js/
│   └── app.js
│
└── img/
    └── prendas/
        ├── banner.jpg
        ├── prenda01.jpg
        ├── prenda02.jpg
        ├── prenda03.jpg
        ├── ...
        └── prenda12.jpg
```

---

## 3. Cómo ejecutar localmente

Porque la página usa:

```js
fetch("productos.json")
```

**NO abras el archivo con doble clic** (`file://`).  
El navegador puede bloquear la lectura del JSON.

Debes servirla con un servidor local, por ejemplo **Live Server**.

---

## 4. Cómo utilizar Live Server

1. Abre la carpeta `catalogo-ropa` en **Cursor** o **VS Code**.
2. Instala la extensión **Live Server** (si aún no la tienes).
3. Abre `index.html`.
4. Clic derecho → **Open with Live Server**.
5. La página se abrirá en algo como:

```
http://localhost:5500
```

También puedes servir la carpeta con cualquier servidor estático simple.

---

## 5. Cómo agregar una nueva prenda

### PASO 1

Copia la fotografía dentro de:

```
img/prendas/
```

Ejemplo:

```
img/prendas/vestido-rojo.jpg
```

### PASO 2

Abre:

```
productos.json
```

### PASO 3

Agrega un nuevo objeto al arreglo (recuerda la coma del elemento anterior):

```json
{
    "id": 13,
    "nombre": "Vestido Rojo",
    "descripcion": "Vestido elegante de color rojo.",
    "precio": 99.90,
    "imagen": "img/prendas/vestido-rojo.jpg"
}
```

### PASO 4

Guarda `productos.json`.

### PASO 5

Actualiza la página en el navegador.

La nueva prenda aparecerá automáticamente.  
**No es necesario modificar `index.html` ni `app.js`.**

---

## 6. Cómo cambiar una fotografía

1. Reemplaza el archivo en `img/prendas/` (mismo nombre), **o**
2. Sube una foto nueva y actualiza la ruta `"imagen"` en `productos.json`.

Ejemplo:

```json
"imagen": "img/prendas/prenda01.jpg"
```

Usa siempre rutas **relativas** (sin `/` al inicio).

---

## 7. Cómo cambiar el nombre de una prenda

En `productos.json`, edita el campo:

```json
"nombre": "Nuevo nombre de la prenda"
```

---

## 8. Cómo cambiar la descripción

En `productos.json`, edita el campo:

```json
"descripcion": "Nueva descripción de la prenda."
```

---

## 9. Cómo cambiar el precio

En `productos.json`, edita el campo numérico:

```json
"precio": 89.90
```

En pantalla se mostrará como: **S/ 89.90**

---

## 10. Cómo cambiar el nombre de la tienda

Busca **Karina** y **Boutique** en `index.html` (header, hero y footer) y reemplázalos por el nombre de tu marca.  
También puedes actualizar el `<title>` en el `<head>`.

---

## 11. Cómo cambiar los enlaces de contacto

En `index.html`, sección `#contacto`, modifica los `href` de:

- `#enlace-whatsapp`
- `#enlace-instagram`
- `#enlace-facebook`
- `#enlace-tiktok`

Ejemplo WhatsApp:

```html
href="https://wa.me/51999999999"
```

---

## 12. Cómo publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo: `catalogo-ropa`).
2. Sube **todos** los archivos de esta carpeta al repositorio.
3. En GitHub, ve a **Settings**.
4. En el menú lateral, entra a **Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**.
6. En **Branch**, elige la rama `main`.
7. En la carpeta, selecciona `/ (root)`.
8. Guarda los cambios (**Save**).
9. Espera 1–2 minutos a que se publique.
10. Abre la URL que GitHub Pages te proporcione, por ejemplo:

```
https://USUARIO.github.io/catalogo-ropa/
```

La página funciona sin servidor backend.

> Importante: este proyecto usa rutas relativas (`productos.json`, `img/prendas/...`) para que funcione correctamente dentro de un subdirectorio de GitHub Pages.

---

## Notas importantes

- Las fotografías viven en `img/prendas/`.
- La información de productos vive solo en `productos.json`.
- No coloques productos dentro de `index.html` ni de `app.js`.
- Si una imagen no carga, se muestra un placeholder automático.
- Si `productos.json` falla, verás: **No se pudo cargar el catálogo.**
