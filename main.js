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
		descripcion: "Cepillo de bambú biodegradable con cerdas de carbón activado.",
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
		nombre: "Guantes de Realidad Virtual Táctiles",
		descripcion: "Guantes que te permiten sentir objetos en la realidad virtual.",
		precio: 199.99,
		img: "./res/img/3.jpg",
		cantidad: 5,
	},
	{
		nombre: "Robot Aspirador con Mapeo Inteligente",
		descripcion: "Aspirador que limpia tu casa de forma autónoma, creando mapas.",
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
		nombre: "Silla Ergonómica con Calefacción",
		descripcion: "Silla que se adapta a tu cuerpo y te mantiene caliente.",
		precio: 279.99,
		img: "./res/img/6.jpg",
		cantidad: 9,
	},
	{
		nombre: "Altavoz Inteligente con Pantalla Táctil",
		descripcion: "Altavoz que te permite controlar tu hogar y ver videos.",
		precio: 169.99,
		img: "./res/img/7.jpg",
		cantidad: 11,
	},
	{
		nombre: "Libreta Inteligente con Digitalización",
		descripcion: "Libreta que digitaliza tus notas y dibujos.",
		precio: 69.99,
		img: "./res/img/8.jpg",
		cantidad: 32,
	},
	{
		nombre: "Dispensador de Comida Inteligente para Mascotas",
		descripcion: "Dispositivo que alimenta a tu mascota automáticamente.",
		precio: 169.99,
		img: "./res/img/9.jpg",
		cantidad: 11,
	},
];

// guardar todos los productos en localstorage cuando se cargue la pagina por primera vez
if (localStorage.getItem("producto") == null) {
	localStorage.setItem("producto", JSON.stringify(producto));
}

function iniciarSesion(event) {
	event.preventDefault(); // Previene que la pagina se recargue.

	var form = document.getElementById("formLogin");

	console.log(form);
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

	var form = document.getElementById("formRegistro");

	form.innerHTML = "<h1><span class='label-green'>Te has registrado correctamente.</span></h1><br/>Se te redirigirá al inicio de sesion en 5 segundos...";
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

	if (tipoCuenta == "vendedor" || tipoCuenta == "admin") {
		for (var i = 0; i < Object.keys(productoGuardado).length; i++) {
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
						<button class="boton-discreto" onclick="">Ver detalles</button>
						<button class="boton-discreto" onclick="">Eliminar</button>
					</div>
				</div>
			`;
		}
	}

	if (tipoCuenta == "comprador") {
		for (var i = 0; i < Object.keys(productoGuardado).length; i++) {
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
						<button class="boton-discreto" onclick="comprarProducto(${i})">Comprar</button>
					</div>
				</div>
			`;
		}
	}
}

if (document.getElementById("productos-pv")) {
	mostrarProductos("vendedor");
} else if (document.getElementById("productos-pc")) {
	mostrarProductos("comprador");
} else if (document.getElementById("productos-pa")) {
	mostrarProductos("admin");
}

// Funciones de los administradores
function eliminarUsuario() {}

function eliminarProducto() {}

function panelVendedor(valor) {
	if (valor == "ver") {
		document.getElementById("inicio").style.display = "none";
		document.getElementById("subir").style.display = "none";
		document.getElementById("mostrador").style.display = "block";
	} else if (valor == "subir") {
		document.getElementById("inicio").style.display = "none";
		document.getElementById("mostrador").style.display = "none";
		document.getElementById("subir").style.display = "block";
	}
}
