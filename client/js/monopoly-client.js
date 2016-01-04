var url="http://127.0.0.1:1337/";
var usuarioUid=$.cookie("uid");;
var socket = io(url);

var coord=[];
var colorFicha=["red","blue","green","black","yellow","grey"];
var fichas={lista:colorFicha}
var posiciones=[];

//Sockets
function socketFunction(){
	socket.on('go',function(){
		console.log('socket conectado');
	})
	
	socket.on('iniciarPartida',function(){
		estadoJuego(usuarioUid);
		console.log('socket iniciarpartida');
	})
    
    socket.on('update',function(){
		estadoJuego(usuarioUid);
		console.log('socket update');
	})
}

function inicio(){
    
    cargarTablero()
	cargarCoordenadas();
	
	posiciones["red"]=6;
	cargarFichas(1,ponerFicha);
	if($.cookie("uid")!=undefined){
		cargarCookies();
	}else{
		mostrarBotonPedirFicha();
	}
	socketFunction();
}

//Funciones para modificar el index.html
// -- Bonotones
function mostrarBotonPedirFicha(){
	$("#botones").append("<p id='zonaPedir'>Nombre: <input type='text' id='nombre' /><button id='pedirBtn'>Pedir Ficha</button></p>");
	$('#pedirBtn').on("click",function(){	
		obtenerFicha($("#nombre").val());
	})
}

function mostrarBotonIniciarPartida(){
	$("#botones").append("<button id='iniciarPartidaBtn'>iniciar Partida</button></p>");
	$('#iniciarPartidaBtn').on("click",function(){	
		iniciarPartida(usuarioUid);
	})
}

function mostrarRefrescar(){
	$("#botones").append("<button id='refrescarBtn'>refrescar estado</button></p>");
	$('#refrescarBtn').on("click",function(){	
		estadoJuego(usuarioUid);
	})
}

function mostrarTirar(){
	$("#botones").append("<button id='tirarBtn'>tirar</button></p>");
	$('#tirarBtn').on("click",function(){	
		tirarDados(usuarioUid);
	})
}

function quitarBotonPedir(){
	$("#zonaPedir").remove();
}

function quitarBotonIniciarPartida(){
	$("#iniciarPartidaBtn").remove();
}

function quitarBotonTirarDados(){
	$('#tirarBtn').remove();
}

//-- Información
function mostrarNumUsuarios(numUsuarios){
	$("#numUsuarios").remove();
	$("#resultados").append("<p id='numUsuarios'>numUsuarios: "+numUsuarios+"</p>");
}
function mostrarNombre(nombre){
	$("#nombre").remove();
	$("#resultados").append("<p id='nombre'>Nombre: "+nombre+"</p>");
}
function mostrarEstadoJuego(estado){
	$("#estadoJuego").remove();
	$("#resultados").append("<p id='estadoJuego'>Estado Juego: "+estado+"</p>");
}

function mostrarUid(uid){
	$("#uid").remove();
	$("#resultados").append("<p id='uid'>uid: "+uid+"</p>");	
}

function mostrarFicha(ficha){
	$("#ficha").remove();
	$("#resultados").append("<p id='ficha'>Ficha: "+ficha+"</p>");	
}

function mostrarTurno(turno){
	$("#turno").remove();
	$("#resultados").append("<p id='turno'>Turno: "+turno+"</p>");	
}

function mostrarsaldo(saldo){
	$("#saldo").remove();
	$("#resultados").append("<p id='saldo'>Saldo: "+saldo+"</p>");	
}

function mostrarDatosJugador(nombre,uid,ficha,estado,numUsuarios,turno,saldo){
	mostrarNombre(nombre);
	mostrarUid(uid);
    mostrarFicha(ficha);
    mostrarEstadoJuego(estado);
    mostrarNumUsuarios(numUsuarios);
    mostrarTurno(turno);
    mostrarsaldo(saldo);  
    
    if(turno=="te toca") mostrarTirar();
    else quitarBotonTirarDados();
    if(estado == "Jugando") quitarBotonIniciarPartida();
}

//Funciones para comunicar con el servidor
function obtenerFicha(nombre){
	$.getJSON(url+"nuevoJugador/"+nombre,function(data){
		//guardarCookies(data);
		quitarBotonPedir();
		mostrarDatosJugador(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo);
		almacenarCookie(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo);
        usuarioUid=data.uid;
        mostrarBotonIniciarPartida();
        mostrarRefrescar();
	})
}

function iniciarPartida(uid){
	$.getJSON(url+"iniciarPartida/"+uid,function(data){
		//guardarCookies(data);
		quitarBotonPedir();
		mostrarDatosJugador(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo);
		almacenarCookie(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo);
	})
}

function estadoJuego(uid){
    $.getJSON(url+"estadoPartida/"+uid,function(data){		
		mostrarDatosJugador(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo);      
		almacenarCookie(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo);                                              
    
	})
}

function tirarDados(uid){
    $.getJSON(url+"tirarDados/"+uid,function(data){		
		mostrarDatosJugador(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo);
		almacenarCookie(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo);
	})
}

//coockies
function almacenarCookie(nombre,uid,ficha,estado,numUsuarios,turno,saldo){
	$.cookie('nombre',nombre);
	$.cookie('uid',uid);
	$.cookie('ficha',ficha);
	$.cookie('estado',estado);
	$.cookie('numUsuarios',numUsuarios);
	$.cookie('turno',turno);
	$.cookie('saldo',saldo);
}

function cargarCookies(){
	mostrarDatosJugador(
		$.cookie("nombre"),
		$.cookie("uid"),
		$.cookie("ficha"),
		$.cookie("estado"),
		$.cookie("numUsuarios"),
		$.cookie("turno"),
		$.cookie("saldo")
	)
}

//funciones para dibujar el tablero y las fichas

function cargarTablero(){
	var canvas=document.getElementById("micanvas");
	ctx=canvas.getContext("2d");
	maxX=canvas.width;
	maxY=canvas.height;
	img=new Image();
	img.src="client/img/tablero.png";
	ctx.drawImage(img,0,0);
	img.onload=function(){
		ctx.drawImage(img,0,0);
	}
}

function cargarFichas(numJug,callback){
	var cont=0;
	//numJug=parseInt($.cookie("numJug")); 
	for(var i=0;i<numJug;i++){ //colorFicha.length
		var color=colorFicha[i];
		var imag=new Image();
		imag.src="client/img/"+color+".png";
		fichas.lista[color]=imag;
		//fichas.posicion[color]=0;
		ctx.drawImage(fichas.lista[color],maxX,maxY);
		fichas.lista[color].onload=function(){
			//ctx.drawImage(fichas.lista[color],maxX-70,maxY-70,30,30);
			if (++cont>=numJug){
				callback();
			}
		}
	}	
}

function cargarCoordenadas(){
	for(i=0;i<40;i++) coord[i]=[];
	inc=55;
	coord[0].push(maxX-inc*1.5)
	coord[0].push(maxY-inc*1.5);
    
    coord[1].push(maxX-inc*3);
    coord[1].push(maxY-inc*1.5);
    for (var i=1;i<10;i++){
        coord[i].push(maxX-inc*(3+i-1));
        coord[i].push(maxY-inc*1.5);
    }
    
    /*coord[1].push(maxX-inc*2.9);
	coord[1].push(maxY-inc*1.5);
    
    coord[2].push(maxX-inc*4);
	coord[2].push(maxY-inc*1.5);
    
    coord[3].push(maxX-inc*6.5);
	coord[3].push(maxY-inc*1.5);*/

	//coord[10].push(coord[9][0]-inc)
	//coord[10].push(coord[9][1]);
	
	coord[20].push(inc)
	coord[20].push(inc);

	coord[30].push(maxX-inc)
	coord[30].push(inc);
}

function ponerFicha(){
	var x,y;
	var color="red";
	var posicion=posiciones[color];
	console.log(color+" "+posicion);
	if (posicion>=0 && posicion<40){
		x=coord[posicion][0];
		y=coord[posicion][1];
		ctx.drawImage(fichas.lista[color],x,y,30,30);
	}
}