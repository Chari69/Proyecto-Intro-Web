/*
	JAVASCRIPT
*/

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
		administrador: false
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
		administador: false
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
		administador: true
	}
];

const producto = [
		{
			id: 0,
			nombre: "Laptop",
			descripcion: "Del gobierno",
			precio: 69.69,
			img: "./res/cat.jpg",
			cantidad: 10,
		},
	];

function iniciarSesion(event) {
	event.preventDefault(); // Previene que la pagina se recargue.

	var form = document.getElementById("formLogin");

	console.log(form);
	var usuario = document.getElementById("usuario").value;
	var pass = document.getElementById("password").value;
	var cuentaEncontrada = false;

	for(i = 0; i < Object.keys(usuarios).length; i++) {
		if(usuario == usuarios[i].nickname && pass == usuarios[i].pass) {
			alert("SESION INICIADA: " + usuario);
			if(usuarios[i].administador == true) {
				window.location.href = "./panel_administrador.html";
			} else if (usuarios[i].cuentaVendedor == true) {
				window.location.href = "./panel_vendedor.html";
			} else if (usuarios[i].cuentaCliente == true) {
				window.location.href = "./panel_comprador.html";
			}
			cuentaEncontrada = true;
		}
	}

	if(cuentaEncontrada == false) {
		var noAutorizado = document.getElementById("error");
		noAutorizado.innerHTML = "Usuario o contraseña incorrectas.";
	}
}

document.getElementById("formLogin").addEventListener("submit", iniciarSesion);

// Obtener el listado de producots
function agregarProducto() {



	const productoGuardado = JSON.parse(localStorage.getItem("producto"));

	// Guardar el producto en localStorage
	localStorage.setItem("producto", JSON.stringify(producto));
}

function obtenerProducto(variable) {
	const productoGuardado = JSON.parse(localStorage.getItem("producto"));
	console.log(productoGuardado[variable]);
}

function mostrarProductos() {

}


// Funciones de los administradores
function eliminarUsuario() {

}

function eliminarProducto() {

}