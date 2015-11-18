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

console.log(juego);

app.use("/",express.static(__dirname));


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
		jsonData={"nombre":jugador.nombre,"uid":jugador.uid,"color":jugador.ficha.color,"fase":juego.estado.nombre};	
		//jsonData=jugador.ficha;
	}
	else jsonData={"nombre":"sorry","color":"no hay fichas","posicion":"-1","uid":"sorry"};;
	response.send(jsonData)
});



server.listen(port,host);
console.log("Servidor iniciado en puerto: "+port);