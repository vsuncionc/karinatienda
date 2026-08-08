/**
 * Catálogo Digital de Prendas — Karina Boutique
 * Lee productos.json y genera las tarjetas dinámicamente.
 */

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

/**
 * Formatea el precio en soles peruanos.
 * @param {number} precio
 * @returns {string}
 */
function formatearPrecio(precio) {
    return `S/ ${Number(precio).toFixed(2)}`;
}

/**
 * Carga el catálogo desde productos.json.
 */
async function cargarProductos() {
    const contenedor = document.getElementById("productos-container");
    const mensajeCarga = document.getElementById("mensaje-carga");
    const mensajeError = document.getElementById("mensaje-error");
    const jsonUrl = "productos.json";

    // #region agent log
    fetch('http://127.0.0.1:7807/ingest/1ba636d4-3675-4957-8e34-cc9e356062d2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'739068'},body:JSON.stringify({sessionId:'739068',runId:'pre-fix',hypothesisId:'A',location:'app.js:cargarProductos:entry',message:'Inicio carga catalogo',data:{protocol:window.location.protocol,origin:window.location.origin,href:window.location.href,jsonUrl},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    try {
        // #region agent log
        fetch('http://127.0.0.1:7807/ingest/1ba636d4-3675-4957-8e34-cc9e356062d2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'739068'},body:JSON.stringify({sessionId:'739068',runId:'pre-fix',hypothesisId:'B',location:'app.js:cargarProductos:beforeFetch',message:'Antes de fetch productos.json',data:{jsonUrl,resolvedUrl:new URL(jsonUrl, window.location.href).href},timestamp:Date.now()})}).catch(()=>{});
        // #endregion

        const response = await fetch(jsonUrl);

        // #region agent log
        fetch('http://127.0.0.1:7807/ingest/1ba636d4-3675-4957-8e34-cc9e356062d2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'739068'},body:JSON.stringify({sessionId:'739068',runId:'pre-fix',hypothesisId:'C',location:'app.js:cargarProductos:afterFetch',message:'Respuesta fetch recibida',data:{ok:response.ok,status:response.status,statusText:response.statusText,contentType:response.headers.get('content-type')},timestamp:Date.now()})}).catch(()=>{});
        // #endregion

        if (!response.ok) {
            throw new Error(`No se pudo cargar productos.json (HTTP ${response.status})`);
        }

        const productos = await response.json();

        // #region agent log
        fetch('http://127.0.0.1:7807/ingest/1ba636d4-3675-4957-8e34-cc9e356062d2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'739068'},body:JSON.stringify({sessionId:'739068',runId:'pre-fix',hypothesisId:'D',location:'app.js:cargarProductos:jsonParsed',message:'JSON parseado',data:{isArray:Array.isArray(productos),count:Array.isArray(productos)?productos.length:null},timestamp:Date.now()})}).catch(()=>{});
        // #endregion

        if (!Array.isArray(productos)) {
            throw new Error("El formato de productos.json no es válido.");
        }

        if (mensajeCarga) {
            mensajeCarga.classList.add("d-none");
        }

        mostrarProductos(productos);
    } catch (error) {
        // #region agent log
        fetch('http://127.0.0.1:7807/ingest/1ba636d4-3675-4957-8e34-cc9e356062d2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'739068'},body:JSON.stringify({sessionId:'739068',runId:'pre-fix',hypothesisId:'A',location:'app.js:cargarProductos:catch',message:'Error al cargar catalogo',data:{name:error&&error.name,message:error&&error.message,protocol:window.location.protocol},timestamp:Date.now()})}).catch(()=>{});
        // #endregion

        console.error("Error al cargar el catálogo:", error);

        if (mensajeCarga) {
            mensajeCarga.classList.add("d-none");
        }

        if (mensajeError) {
            // file:// bloquea fetch(productos.json) por CORS; hay que servir por HTTP.
            if (window.location.protocol === "file:") {
                mensajeError.innerHTML = `
                    No se pudo cargar el catálogo.<br>
                    <small>
                        Estás abriendo la página con <code>file://</code>.
                        Usa <strong>Live Server</strong> o un servidor local
                        (<code>http://localhost</code>) para ver el catálogo.
                    </small>
                `;
            } else {
                mensajeError.textContent = "No se pudo cargar el catálogo.";
            }
            mensajeError.classList.remove("d-none");
        }

        if (contenedor) {
            contenedor.innerHTML = "";
        }
    }
}

/**
 * Genera el HTML interno de colores y tallas disponibles.
 * @param {{colores?:string[], tallas?:string[]}} producto
 * @returns {string}
 */
function renderOpcionesProducto(producto) {
    const colores = Array.isArray(producto.colores) ? producto.colores : [];
    const tallas = Array.isArray(producto.tallas) ? producto.tallas : [];

    const coloresHtml = colores.length
        ? `
            <div class="producto-opcion">
                <span class="producto-opcion-label">Colores</span>
                <div class="producto-opcion-lista">
                    ${colores.map((color) => `<span class="producto-chip">${color}</span>`).join("")}
                </div>
            </div>
        `
        : "";

    const tallasHtml = tallas.length
        ? `
            <div class="producto-opcion">
                <span class="producto-opcion-label">Tallas</span>
                <div class="producto-opcion-lista">
                    ${tallas.map((talla) => `<span class="producto-chip producto-chip-talla">${talla}</span>`).join("")}
                </div>
            </div>
        `
        : "";

    return `${coloresHtml}${tallasHtml}`;
}

/**
 * Muestra el detalle de una prenda en el modal.
 * @param {{codigo?:string, nombre:string, descripcion:string, precio:number, imagen:string, colores?:string[], tallas?:string[]}} producto
 */
function abrirModalProducto(producto) {
    const modalEl = document.getElementById("modalProducto");
    const titulo = document.getElementById("modalProductoTitulo");
    const codigo = document.getElementById("modalProductoCodigo");
    const imagen = document.getElementById("modalProductoImagen");
    const descripcion = document.getElementById("modalProductoDescripcion");
    const opciones = document.getElementById("modalProductoOpciones");
    const precio = document.getElementById("modalProductoPrecio");

    if (!modalEl || !titulo || !imagen || !descripcion || !precio) {
        console.error("No se encontraron elementos del modal de producto");
        return;
    }

    const nombre = producto.nombre || "Producto";
    const rutaImagen = producto.imagen || "img/prendas/KB-001.jpg";
    const codigoTexto = producto.codigo || "";

    titulo.textContent = nombre;
    if (codigo) {
        codigo.textContent = codigoTexto ? `Código: ${codigoTexto}` : "";
        codigo.classList.toggle("d-none", !codigoTexto);
    }
    imagen.src = rutaImagen;
    imagen.alt = nombre;
    descripcion.textContent = producto.descripcion || "";
    if (opciones) {
        const html = renderOpcionesProducto(producto);
        opciones.innerHTML = html;
        opciones.classList.toggle("d-none", !html);
    }
    precio.textContent = formatearPrecio(producto.precio ?? 0);

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
}

/**
 * Recorre los productos y crea las tarjetas HTML.
 * @param {Array} productos
 */
function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos-container");

    if (!contenedor) {
        console.error("No se encontró el contenedor #productos-container");
        return;
    }

    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-muted mb-0">No hay productos disponibles por el momento.</p>
            </div>
        `;
        return;
    }

    productos.forEach((producto) => {
        const columna = document.createElement("div");
        columna.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        const imagen = producto.imagen || "img/prendas/KB-001.jpg";
        const nombre = producto.nombre || "Producto";
        const descripcion = producto.descripcion || "";
        const codigo = producto.codigo || "";
        const precio = formatearPrecio(producto.precio ?? 0);
        const opcionesHtml = renderOpcionesProducto(producto);

        columna.innerHTML = `
            <article class="card producto-card h-100 border-0">
                <div class="producto-img-wrap">
                    <button
                        type="button"
                        class="producto-img-btn"
                        aria-label="Ver detalle de ${nombre}"
                    >
                        <img
                            src="${imagen}"
                            class="card-img-top producto-img"
                            alt="${nombre}"
                            loading="lazy"
                            onerror="this.onerror=null; this.src='https://placehold.co/600x800/f5ebe0/8a817c?text=Sin+imagen'; this.alt='Imagen no disponible';"
                        >
                    </button>
                </div>
                <div class="card-body d-flex flex-column">
                    ${codigo ? `<p class="producto-codigo mb-1">Código: ${codigo}</p>` : ""}
                    <h3 class="card-title h5">${nombre}</h3>
                    <p class="card-text flex-grow-1">${descripcion}</p>
                    ${opcionesHtml ? `<div class="producto-opciones">${opcionesHtml}</div>` : ""}
                    <p class="producto-precio mb-0">${precio}</p>
                </div>
            </article>
        `;

        const botonImagen = columna.querySelector(".producto-img-btn");
        if (botonImagen) {
            botonImagen.addEventListener("click", () => {
                abrirModalProducto(producto);
            });
        }

        contenedor.appendChild(columna);
    });
}
