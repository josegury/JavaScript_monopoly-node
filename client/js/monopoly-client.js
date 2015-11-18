var url="http://127.0.0.1:1337/";

function inicio(){
	mostrarBotonPedirFicha();
}

//Funciones para modificar el index.html

function mostrarBotonPedirFicha(){
	$("#botones").append("<p id='zonaPedir'>Nombre: <input type='text' id='nombre' /><button id='pedirBtn'>Pedir Ficha</button></p>");
	$('#pedirBtn').on("click",function(){	
		obtenerFicha($("#nombre").val());
	})
}

function quitarBotonPedir(){
	$("#zonaPedir").remove();
}

function mostrarDatosJugador(nombre,uid,ficha){
	mostrarNombre(nombre);
	mostrarUid(uid);
    mostrarFicha(ficha);
}

function mostrarNombre(nombre){
	$("#nombre").remove();
	$("#resultados").append("<p id='nombre'>Nombre: "+nombre+"</p>");
}

function mostrarUid(uid){
	$("#uid").remove();
	$("#resultados").append("<p id='uid'>uid: "+uid+"</p>");	
}

function mostrarFicha(ficha){
	$("#ficha").remove();
	$("#resultados").append("<p id='ficha'>Ficha: "+ficha+"</p>");	
}

//Funciones para comunicar con el servidor
function obtenerFicha(nombre){
	$.getJSON(url+"nuevoJugador/"+nombre,function(data){
		//guardarCookies(data);
		quitarBotonPedir();
		mostrarDatosJugador(data.nombre,data.uid,data.color);
	})
}