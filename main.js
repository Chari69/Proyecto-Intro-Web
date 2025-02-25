var sesion = false;

function iniciarSesion(event) {
	event.preventDefault(); // Previene que la pagina se recargue.

	var form = document.getElementById("formLogin");

	console.log(form);
	var usuario = document.getElementById("usuario").value;
	var pass = document.getElementById("password").value;

	if (usuario == "seller456" && pass == "Intro123") {
		alert("SESION INICIADA " + usuario);
	} else if (usuario == "dancabello" && pass == "J5*asdRD.s") {
		alert("SESION INICIADA " + usuario);
	} else if (usuario == "root" && pass == "dochouse") {
		alert("SESION INICIADA " + usuario);
	} else {
		var noAutorizado = document.getElementById("error");
		noAutorizado.innerHTML = "Usuario o contraseña incorrectas.";
	}
}

document.getElementById("formLogin").addEventListener("submit", iniciarSesion);
