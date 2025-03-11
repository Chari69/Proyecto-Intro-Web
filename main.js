// Hardcodear usuarios
var usuarios = [
	{
		id: 1,
		nickname: "seller456",
		pass: "Intro123",
		nombre: "Juan Alvarez",
		direccion: "Avenida Libertador",
		datosBancarios: "BDV-0426-5555555-CI-33369777",
		cuentaVendedor: true,
		cuentaCliente: false,
		administrador: false,
	},
	{
		id: 2,
		nickname: "dancabello",
		pass: "J5*asdRD.s",
		nombre: "Dan Cabello",
		direccion: "Avenida Libertador",
		datosBancarios: "BDV-0426-5555555-CI-33369777",
		cuentaVendedor: false,
		cuentaCliente: true,
		administador: false,
	},
	{
		id: 3,
		nickname: "root",
		pass: "dochouse",
		nombre: "Administrador",
		direccion: "BinaryShop",
		datosBancarios: "BDV-0426-5555555-CI-33369777",
		cuentaVendedor: false,
		cuentaCliente: false,
		administador: true,
	},
];

// Hardcodear productos iniciales
const producto = [
	{
		nombre: "Laptop (en buen estado)",
		descripcion: "Laptop usada GAMER, en buen estado, con 16GB de RAM y 1TB de almacenamiento.",
		precio: 400.69,
		img: "./res/img/0.jpg",
		cantidad: 3,
	},
	{
		nombre: "Eco-Cepillo Dental",
		descripcion: "Cepillo de bambu biodegradable con cerdas de carbon activado.",
		precio: 5.99,
		img: "./res/img/1.jpg",
		cantidad: 100,
	},
	{
		nombre: "Botella de Agua Auto-Limpiable",
		descripcion: "Botella con luz UV integrada para purificar el agua.",
		precio: 29.99,
		img: "./res/img/2.jpg",
		cantidad: 50,
	},
	{
		nombre: "Guantes de Realidad Virtual Tactiles",
		descripcion: "Guantes que te permiten sentir objetos en la realidad virtual.",
		precio: 199.99,
		img: "./res/img/3.jpg",
		cantidad: 5,
	},
	{
		nombre: "Robot Aspirador con Mapeo Inteligente",
		descripcion: "Aspirador que limpia tu casa de forma autonoma, creando mapas.",
		precio: 249.99,
		img: "./res/img/4.jpg",
		cantidad: 8,
	},
	{
		nombre: "Impresora 3D de Bolsillo",
		descripcion: "Impresora que cabe en tu bolsillo y te permite imprimir objetos pequeños.",
		precio: 349.99,
		img: "./res/img/5.jpg",
		cantidad: 2,
	},
	{
		nombre: "Silla Ergonomica con Calefaccion",
		descripcion: "Silla que se adapta a tu cuerpo y te mantiene caliente.",
		precio: 279.99,
		img: "./res/img/6.jpg",
		cantidad: 9,
	},
	{
		nombre: "Altavoz Inteligente con Pantalla Tactil",
		descripcion: "Altavoz que te permite controlar tu hogar y ver videos.",
		precio: 169.99,
		img: "./res/img/7.jpg",
		cantidad: 11,
	},
	{
		nombre: "Libreta Inteligente con Digitalizacion",
		descripcion: "Libreta que digitaliza tus notas y dibujos.",
		precio: 69.99,
		img: "./res/img/8.jpg",
		cantidad: 32,
	},
	{
		nombre: "Dispensador de Comida Inteligente para Mascotas",
		descripcion: "Dispositivo que alimenta a tu mascota automaticamente.",
		precio: 169.99,
		img: "./res/img/9.jpg",
		cantidad: 11,
	},
];

// guardar todos los productos en localstorage cuando se cargue la pagina por primera vez
if (localStorage.getItem("producto") == null) {
	localStorage.setItem("producto", JSON.stringify(producto));
	localStorage.setItem("usuarios", JSON.stringify(usuarios));
	localStorage.setItem("carrito", JSON.stringify([]));
}

// Inicio de sesion
function iniciarSesion(event) {
	event.preventDefault(); // Previene que la pagina se recargue.

	var usuarios = JSON.parse(localStorage.getItem("usuarios"));

	var usuario = document.getElementById("usuario").value;
	var pass = document.getElementById("password").value;
	var cuentaEncontrada = false;

	for (var i = 0; i < Object.keys(usuarios).length; i++) {
		if (usuario == usuarios[i].nickname && pass == usuarios[i].pass) {
			alert("SESION INICIADA: " + usuario);
			if (usuarios[i].administador == true) {
				window.location.href = "./panel_administrador.html";
			} else if (usuarios[i].cuentaVendedor == true) {
				window.location.href = "./panel_vendedor.html";
			} else if (usuarios[i].cuentaCliente == true) {
				window.location.href = "./panel_comprador.html";
			}
			cuentaEncontrada = true;
		}
	}

	if (cuentaEncontrada == false) {
		var noAutorizado = document.getElementById("error");
		noAutorizado.innerHTML = "Usuario o contraseña incorrectas.";
	}
}

if (document.getElementById("formLogin")) {
	document.getElementById("formLogin").addEventListener("submit", iniciarSesion);
}

// Registro Simulado
function registrarUsuario(event) {
	event.preventDefault(); // Previene que la pagina se recargue.

	// Simular el registro de usuarios, se hace esto por que puede que el admin haya borrado uno, entonces,
	// cada que se use el formulario, reinicia los usuarios registrados en la web (los 3 usuarios)
	var form = document.getElementById("formRegistro");
	if (localStorage.getItem("usuarios") !== null) {
		localStorage.removeItem("usuarios");
	}
	localStorage.setItem("usuarios", JSON.stringify(usuarios));

	form.innerHTML = "<h1><span class='label-green'>Te has registrado correctamente.</span></h1><br/>Se te redirigira al inicio de sesion en 5 segundos...";
	setTimeout(() => {
		window.location.href = "./login.html";
	}, 5000);
}

if (document.getElementById("formRegistro")) {
	document.getElementById("formRegistro").addEventListener("submit", registrarUsuario);
}

// Obtener el listado de productos
function agregarProducto() {
	const productoGuardado = JSON.parse(localStorage.getItem("producto"));
	// Guardar el producto en localStorage
	localStorage.setItem("producto", JSON.stringify(producto));
}

function obtenerProducto(variable) {
	const productoGuardado = JSON.parse(localStorage.getItem("producto"));
	console.log(productoGuardado[variable]);
}

function mostrarProductos(tipoCuenta) {
	var productosHTML = document.getElementById("productos");
	const productoGuardado = JSON.parse(localStorage.getItem("producto"));

	if (productoGuardado.length == 0) {
		productosHTML.innerHTML = "<h1 style='color:red;'>No se han encontrado productos.</h1>";
	}

	if (tipoCuenta == "vendedor") {
		for (var i = 0; i < productoGuardado.length; i++) {
			productosHTML.innerHTML += `
				<div id="articulo"">
					<div style="flex: 1;">
						<img src="${productoGuardado[i].img}" alt="Imagen del producto" width="100" height="100" />
					</div>
					<div style="flex: 4;">
						<h3>${productoGuardado[i].nombre}</h3>
						<p id="desc">${productoGuardado[i].descripcion}</p>
						<p><span class='label-green'>Precio:</span> ${productoGuardado[i].precio} USD</p>
						<p><span class='label-green'>Cantidad disponible:</span> ${productoGuardado[i].cantidad} ${comprobarStock(i, "titulo")}</p>
					</div>
					<div style="flex: 0;">
						<button class="boton-discreto" disabled>Ver detalles</button>
					</div>
				</div>
			`;
		}
	}

	if (tipoCuenta == "admin") {
		for (var i = 0; i < productoGuardado.length; i++) {
			productosHTML.innerHTML += `
				<div id="articulo"">
					<div style="flex: 1;">
						<img src="${productoGuardado[i].img}" alt="Imagen del producto" width="100" height="100" />
					</div>
					<div style="flex: 4;">
						<h3>${productoGuardado[i].nombre}</h3>
						<p id="desc">${productoGuardado[i].descripcion}</p>
						<p><span class='label-green'>Precio:</span> ${productoGuardado[i].precio} USD</p>
						<p><span class='label-green'>Cantidad disponible:</span> ${productoGuardado[i].cantidad}</p>
					</div>
					<div style="flex: 0;">
						<button class="boton-discreto" style="background:#a32a30;" onclick="eliminarProducto(${i})">Eliminar Producto</button>
					</div>
				</div>
			`;
		}
	}

	if (tipoCuenta == "comprador") {
		for (var i = 0; i < productoGuardado.length; i++) {
			productosHTML.innerHTML += `
				<div id="articulo">
					<div style="flex: 1;">
						<img src="${productoGuardado[i].img}" alt="Imagen del producto" width="100" height="100" />
					</div>
					<div style="flex: 4;">
						<h3>${productoGuardado[i].nombre}</h3>
						<p id="desc">${productoGuardado[i].descripcion}</p>
						<p><span class='label-green'>Precio:</span> ${productoGuardado[i].precio} USD</p>
						<p><span class='label-green'>Cantidad disponible:</span> ${productoGuardado[i].cantidad} ${comprobarStock(i, "titulo")}</p>
					</div>
					<div style="flex: 0;">
						<button class="boton-discreto" onclick="agregarAlCarrito(${i})" ${comprobarStock(i, "boton")}>Agregar al carrito</button>
						<button class="boton-discreto" onclick="comprarProducto(${i},'directa')" ${comprobarStock(i, "boton")}>Comprar</button>
					</div>
				</div>
			`;
		}
	}
}

function comprobarStock(producto, contexto) {
	const productoGuardado = JSON.parse(localStorage.getItem("producto"));
	if (contexto == "boton") {
		return productoGuardado[producto].cantidad == 0 ? "disabled" : "";
	}
	if (contexto == "titulo") {
		return productoGuardado[producto].cantidad == 0 ? "<span style='color:red;'>(Producto Agotado)</span>" : "";
	}
	if (contexto == "valor") {
		return productoGuardado[producto].cantidad;
	}
}

function agregarAlCarrito(producto) {
	var productoGuardado = JSON.parse(localStorage.getItem("producto"));
	var carrito = JSON.parse(localStorage.getItem("carrito"));
	alert(`Has agregado ${productoGuardado[producto].nombre} al carrito.`);

	// Actualizar la cantidad de productos disponibles
	productoGuardado[producto].cantidad -= 1;
	localStorage.setItem("producto", JSON.stringify(productoGuardado));

	var productoExistente = carrito.find((item) => item.nombre === productoGuardado[producto].nombre);

	if (productoExistente) {
		productoExistente.cantidad += 1;
		localStorage.setItem("carrito", JSON.stringify(carrito));
	} else {
		productoGuardado[producto].cantidad = 1;
		carrito.push(productoGuardado[producto]);
		localStorage.setItem("carrito", JSON.stringify(carrito));
	}

	location.reload();
}

// Obtener el tamaño del carrito
function tamCarrito() {
	var carrito = JSON.parse(localStorage.getItem("carrito"));
	var cantidadItems = 0;
	if (carrito.length !== 0) {
		for (var i = 0; i < carrito.length; i++) {
			cantidadItems += carrito[i].cantidad;
		}
	}
	document.getElementById("carrito").innerHTML = `Carrito de Compra <label class="label-green">(${cantidadItems})</label>`;
}

function verCarrito() {
	var carrito = JSON.parse(localStorage.getItem("carrito"));
	var carritoHTML = document.getElementById("carritoLista");
	var carritoStats = document.getElementById("carritoStats");
	var total = 0;
	var totalProductos = 0;

	if (carrito.length == 0) {
		carritoHTML.innerHTML = "<h1 style='color:red;'>No se han encontrado productos en el carrito.</h1>";
		return;
	}

	for (var i = 0; i < carrito.length; i++) {
		total += carrito[i].precio * carrito[i].cantidad;
		totalProductos += carrito[i].cantidad;
		carritoHTML.innerHTML += `
			<div id="articulo">
				<div style="flex: 1;">
					<img src="${carrito[i].img}" alt="Imagen del producto" width="100" height="100" />
				</div>
				<div style="flex: 4;">
					<h3>${carrito[i].nombre}</h3>
					<p>
					<span class='label-green'>Cantidad:</span> ${carrito[i].cantidad}<span class='sep'></span>
					<span class='label-green'>Precio:</span> ${carrito[i].precio * carrito[i].cantidad} USD (${carrito[i].precio} x ${carrito[i].cantidad})</p>
				</div>
				<div style="flex: 0;">
					<button class="boton-discreto" onclick="eliminarDelCarrito(${i})">Eliminar del carrito</button>
				</div>
			</div>
		`;
	}

	carritoStats.innerHTML = `
		<div class='texto'>
			<h2>Resumen de la compra</h2>
			Total de productos:</span> ${totalProductos}<br/>
			Total: ${total} USD<br/><br/>
			<button class="boton" onclick="comprarProducto(0,'carrito')">Comprar ahora</button>
			<br/><br/>
		</div><hr/>
		`;
}

function comprarProducto(producto, modo) {
	var carrito = JSON.parse(localStorage.getItem("carrito"));
	var productoGuardado = JSON.parse(localStorage.getItem("producto"));

	var precio = 0;
	var productoCompraUnica = -1;

	// reemplazar el contenido de la pagina
	document.getElementById("opcion2").style.display = "none";
	document.getElementById("opcion1").style.display = "none";

	var compraHTML = document.getElementById("inicio");
	compraHTML.style.display = "block";

	compraHTML.innerHTML = `
		<h4>Estas seguro de querer comprar el(los) siguiente(s) elemento(s)?</h4>
		<ol>
		`;

	if (modo == "carrito") {
		for (var i = 0; i < carrito.length; i++) {
			precio += carrito[i].precio * carrito[i].cantidad;
			compraHTML.innerHTML += `
				<li>${carrito[i].nombre} - ${carrito[i].cantidad} unidades</li>
			`;
		}
	}
	if (modo == "directa") {
		precio += productoGuardado[producto].precio;
		compraHTML.innerHTML += `
			<li>${productoGuardado[producto].nombre} - 1 unidad</li>
		`;
		productoCompraUnica = producto;
	}

	compraHTML.innerHTML += `</ol><br/>
		<p>Total a pagar: ${precio} USD</p>
		<select id="cuentaBancaria">
			<option value="1">BDV-0426-5555555-CI-33369777</option>
		</select>
		<button class="boton" onclick="finalizarCompra(${productoCompraUnica})">Comprar</button>
		`;
}

function finalizarCompra(producto) {
	if (producto !== -1) {
		var productoGuardado = JSON.parse(localStorage.getItem("producto"));
		productoGuardado[producto].cantidad -= 1;
		localStorage.setItem("producto", JSON.stringify(productoGuardado));
	}

	var compraHTML = document.getElementById("inicio");
	compraHTML.innerHTML = "<h1 style='color:#37761e;'>Compra realizada con exito.</h1><p>Redirigiendo al listado en 5 segundos...</p>";
	setTimeout(() => {
		localStorage.setItem("carrito", JSON.stringify([])); // Poner vacio el carrito
		window.location.href = "./panel_comprador.html";
	}, 5000);
}

function eliminarDelCarrito(producto) {
	var carrito = JSON.parse(localStorage.getItem("carrito"));
	var productoGuardado = JSON.parse(localStorage.getItem("producto"));
	var productoOriginal = productoGuardado.find((item) => item.nombre === carrito[producto].nombre);
	alert(`Una unidad del producto: "${carrito[producto].nombre}" ha sido eliminado del carrito correctamente.`);

	productoOriginal.cantidad += 1;
	localStorage.setItem("producto", JSON.stringify(productoGuardado));

	if (carrito[producto].cantidad > 1) {
		carrito[producto].cantidad -= 1;
	} else {
		carrito.splice(producto, 1);
	}

	localStorage.setItem("carrito", JSON.stringify(carrito));
	location.reload();
}

function agregarProducto(event) {
	event.preventDefault();
	var error = document.getElementById("error");

	var nombreP = document.getElementById("nombreArt").value;
	var descP = document.getElementById("descArt").value;
	var cantP = document.getElementById("cantArt").value;
	var precioP = document.getElementById("precioArt").value;
	var imagenP = document.getElementById("imagenProducto").files[0];

	// Que el usuario no pueda subir una imagen de mas de 200kb
	if (imagenP.size > 200000) {
		error.innerHTML = "La imagen es muy pesada, sube una imagen de menos de 200kb.";
		return;
	}

	var reader = new FileReader();
	reader.onloadend = function () {
		var base64img = reader.result;
		base64img = "data:image/png;base64," + base64img.split(",")[1];

		var prodAPublicar = {
			nombre: nombreP,
			descripcion: descP,
			precio: precioP,
			img: base64img,
			cantidad: cantP,
		};

		var productoGuardado = JSON.parse(localStorage.getItem("producto"));
		productoGuardado.push(prodAPublicar);
		localStorage.setItem("producto", JSON.stringify(productoGuardado));

		alert("Producto agregado correctamente.");
		location.reload();
	};
	reader.readAsDataURL(imagenP);
}

if (document.getElementById("formPublicarProducto")) {
	document.getElementById("formPublicarProducto").addEventListener("submit", agregarProducto);
}

function controladorPanel(valor) {
	if (valor == 1) {
		document.getElementById("inicio").style.display = "none";
		document.getElementById("opcion2").style.display = "none";
		document.getElementById("opcion1").style.display = "block";
	} else if (valor == 2) {
		document.getElementById("inicio").style.display = "none";
		document.getElementById("opcion1").style.display = "none";
		document.getElementById("opcion2").style.display = "block";
	}
}

function mostrarUsuarios() {
	var usuarios = JSON.parse(localStorage.getItem("usuarios"));
	var listaUsuarios = document.getElementById("usuarios");
	listaUsuarios.innerHTML = `
		<table>
			<thead>
				<tr>
					<th>Nickname</th>
					<th>Nombre</th>
					<th>Administrar</th>
				</tr>
			</thead>
			<tbody id="usuarios-cuerpo"></tbody>
		</table>
	`;
	var cuerpoTabla = document.getElementById("usuarios-cuerpo");
	for (var i = 0; i < usuarios.length; i++) {
		var fila = cuerpoTabla.insertRow();
		fila.insertCell(0).innerText = `@${usuarios[i].nickname}`;
		fila.insertCell(1).innerText = usuarios[i].nombre;
		fila.insertCell(2).innerHTML = `<button class="boton-discreto" style="background:#a32a30;" onclick="eliminarUsuario(${i})">Eliminar Usuario</button>`;
	}
}
// Funciones de los administradores
function eliminarUsuario(usuario) {
	var usuarios = JSON.parse(localStorage.getItem("usuarios"));
	if (usuarios[usuario].nickname == "root") {
		alert("No puedes eliminar al usuario @root, por que tiene permisos de administrador.");
		return;
	}
	alert("Usuario eliminado correctamente.");
	usuarios.splice(usuario, 1);
	localStorage.setItem("usuarios", JSON.stringify(usuarios));
	localStorage.setItem("usrElimRec", true);
	location.reload();
}

function eliminarProducto(producto) {
	const productoGuardado = JSON.parse(localStorage.getItem("producto"));
	alert(`El producto "${productoGuardado[producto].nombre}" ha sido eliminado correctamente del sitio web.`);
	// Eliminar el producto seleccionado
	// .splice() lo que hace es eliminar o agregar elementos de un array en alguna posicion del mismo.
	productoGuardado.splice(producto, 1);
	localStorage.setItem("producto", JSON.stringify(productoGuardado));
	localStorage.setItem("prodElimRec", true);
	location.reload();
}

if (document.getElementById("productos-pv")) {
	mostrarProductos("vendedor");
} else if (document.getElementById("productos-pc")) {
	mostrarProductos("comprador");
	verCarrito();
	tamCarrito();
	controladorPanel(1);
} else if (document.getElementById("productos-pa")) {
	mostrarProductos("admin");
	mostrarUsuarios();

	if (localStorage.getItem("prodElimRec") == "true") {
		localStorage.removeItem("prodElimRec");
		controladorPanel(1);
	}
	if (localStorage.getItem("usrElimRec") == "true") {
		localStorage.removeItem("usrElimRec");
		controladorPanel(2);
	}
}

function resetearDatos() {
	document.getElementById("resetMsg").style.display = "none";
	window.localStorage.clear();
	document.getElementById("reseteo").innerHTML = "<h1>Se han reseteado los datos de la aplicacion.</h1><p>Redirigiendo a la pagina de inicio en 5 segundos...</p>";
	setTimeout(() => {
		window.location.href = "./index.html";
	}, 5000);
}
