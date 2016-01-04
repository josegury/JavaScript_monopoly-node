var fs=require("fs");
var express=require("express");
//var path=require("path");
var modelo=require("./server/juego.js");
//var modelo=require("./server/modelo.js");

var http=require("http");

var config=JSON.parse(fs.readFileSync("./config.json"));
var host=config.host;
var port=config.port;

//var application_root=__dirname;


var app=express();
var server=http.createServer(app);

 var dado = new modelo.Dado();
 var juego=new modelo.Partida(dado);
     juego.iniciarJuego(5);
    juego.generarFichas();


app.use("/",express.static(__dirname));

//Socket
var io = require("socket.io")(server);


app.get("/",function(request,response){
	var contenido=fs.readFileSync("./client/index.html");
	if(!juego){
        juego=new modelo.Partida(dado);
        juego.iniciarJuego(5);
    }
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});


app.get("/hayJugadores",function(req,res){
	var jsonData;
		jsonData={"usuarios":juego.usuarios};
	res.send(jsonData);
});

app.get("/nuevoJugador/:nombre",function(request,response){
	var jsonData;
	//console.log("nombre: "+request.params.nombre);
	var jugador=new modelo.Usuario(request.params.nombre, juego);
	juego.agregarUsuario(jugador);
	if (jugador.ficha){		
		jsonData=getJson(jugador.uid);		
	}
	else jsonData={"nombre":"sorry","color":"no hay fichas","posicion":"-1","uid":"sorry"};;
	response.send(jsonData)
});

app.get("/iniciarPartida/:uid",function(request,response){
	var jsonData;
	//console.log("nombre: "+request.params.nombre);
	var jugador = juego.getUser(request.params.uid);
    jugador.iniciarJuego();
	responderIniciarPartida();
	response.send(getJson(request.params.uid));
});

app.get("/estadoPartida/:uid",function(request,response){	
    //update();
	response.send(getJson(request.params.uid));
});


app.get("/tirarDados/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);
    usuario.tirarDado();    
	response.send(getJson(request.params.uid));
});

app.get("/comprar/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);
    usuario.comprar();    
	response.send(getJson(request.params.uid));
});
app.get("/venderCasa/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);
    usuario.venderCasa();    
	response.send(getJson(request.params.uid));
});
app.get("/construir/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);
    usuario.construir();    
	response.send(getJson(request.params.uid));
});
app.get("/usarTarjetaCarcel/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);
    usuario.usarTarjetaCarcel();    
	response.send(getJson(request.params.uid));
});




// generar json
function getJson(uid){
    var jugador = juego.getUser(uid); 
	
    
	var	jsonData={"nombre":jugador.nombre,
                  "uid":jugador.uid,
                  "color":jugador.ficha.color,
                  "turno":jugador.ficha.turno.nombre,
                  "posicion":jugador.ficha.posicion,
                  "saldo":jugador.ficha.saldo,
                  "estado":juego.estado.nombre,
                  "jugadores":juego.numUsuarios
                 };
    return jsonData;
}

server.listen(port,host);
console.log("Servidor iniciado en puerto: "+port);



var coleccion =[];
io.on('connection',function(client){
	/*client.on('listo',function(data){
		coleccion.push(data);
		if (coleccion.length==juego.coleccionFichas.length){
			socket.emit("go",{juego:"ok"});
		}
	})*/
	console.log('conectado');
	io.emit("go",{juego:"ok"});
})

function responderIniciarPartida(){
	io.emit("iniciarPartida",{juego:"ok"});
}
function update(){
	io.emit("update",{juego:"ok"});
}

