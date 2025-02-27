var sesion = false;

function iniciarSesion(event) {
	event.preventDefault(); // Previene que la pagina se recargue.

	var form = document.getElementById("formLogin");

	console.log(form);
	var usuario = document.getElementById("usuario").value;
	var pass = document.getElementById("password").value;

	if (usuario == "seller456" && pass == "Intro123") {
		alert("SESION INICIADA " + usuario);
		window.location.href = "./panel_vendedor.html";
	} else if (usuario == "dancabello" && pass == "J5*asdRD.s") {
		alert("SESION INICIADA " + usuario);
		window.location.href = "./panel_comprador.html";
	} else if (usuario == "root" && pass == "dochouse") {
		alert("SESION INICIADA " + usuario);
		window.location.href = "./panel_administrador.html";
	} else {
		var noAutorizado = document.getElementById("error");
		noAutorizado.innerHTML = "Usuario o contraseña incorrectas.";
	}
}

// Obtener el listado de producots
function agregarProducto() {
	const producto = [
		{
			id: 1,
			nombre: "Laptop",
			descripcion: "Del gobierno",
			precio: 69.69,
			img: "./res/cat.jpg",
			cantidad: 10,
		},
	];

	// Guardar el producto en localStorage
	localStorage.setItem("producto", JSON.stringify(producto));
}

function obtenerProducto(variable) {
	const productoGuardado = JSON.parse(localStorage.getItem("producto"));
	console.log(productoGuardado[variable]);
}

document.getElementById("formLogin").addEventListener("submit", iniciarSesion);
