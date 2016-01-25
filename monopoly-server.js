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
	
	var jugador = juego.getUser(request.params.uid);
  if(jugador != null){
    if(juego.estado.nombre != "Jugando"){
      jugador.iniciarJuego();
      responderIniciarPartida();
    }
    jsonData = getJson(request.params.uid);
  }
  else{
    jsonData = getJsonNoUser();
  }
  response.send(jsonData);
});

app.get("/estadoPartida/:uid",function(request,response){	
  var jugador = juego.getUser(request.params.uid);
  var json;
  if(jugador!=null){
    json=getJson(request.params.uid);
  }else{
    json=getJsonNoUser();
  }
  response.send(json);
});


app.get("/tirarDados/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);  
  var json;
  if(usuario!=null){
    if(juego.estado.nombre == "Jugando"){
      var mensaje = usuario.tirarDado();
      json={
        mensaje: mensaje
      };   
      update();
    }else{
      json={
        mensaje: "La partida no esta en modo juego"
      };  
    }
  }
  else{
    json=getJsonNoUser();
  }
  console.log(json);
  response.send(json);
});

app.get("/tirarDadoTest/:uid-:posicion",function(request,response){
  var usuario = juego.getUser(request.params.uid);  
  var json;
  if(usuario!=null){
    if(juego.estado.nombre == "Jugando"){
      var mensaje = usuario.tirarDadoTest(parseInt(request.params.posicion));
      json={
        mensaje: mensaje
      };   
      update();
    }else{
      json={
        mensaje: "La partida no esta en modo juego"
      };  
    }
  }
  else{
    json=getJsonNoUser();
  }
  console.log(json);
  response.send(json);
});

app.get("/comprar/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);
  var json;
  if(usuario!=null){
    usuario.comprar();   
    update();
    json=getJson(request.params.uid);
  }
  else{
   json=getJsonNoUser();
 }
 response.send(json);
});

/*app.get("/venderCasa/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);
    var json;
    if(usuario!=null){
       usuario.venderCasa();    
	   json=getJson(request.params.uid);
    }
    else{
         json=getJsonNoUser();
    }
    response.send(json);
  });*/
app.get("/construir/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);    
  var json;
  if(usuario!=null){
    usuario.construir(); 
    update();
    json=getJson(request.params.uid);
  }
  else{
   json=getJsonNoUser();
 }
 response.send(json);
});
app.get("/usarTarjetaCarcel/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);   
  var json;
  if(usuario!=null){
       //usuario.usarTarjetaCarcel();    
       //json=getJson(request.params.uid);
       json={
        "mensaje": usuario.usarTarjetaCarcel()
      };  
    }
    else{
     json=getJsonNoUser();
   }
   response.send(json);
 });

app.get("/getPropiedades/:uid",function(request,response){
	var usuario = juego.getUser(request.params.uid);
  var json;
  if(usuario!=null){
    var propiedades= usuario.ficha.propiedades;
    var newPropiedades=[];
    for(i=0;i<propiedades.length;i++){
      newPropiedades[i]= {
        nombre: propiedades[i].tema.nombre, 
        color: propiedades[i].tema.color, 
        posicion: propiedades[i].tema.posicion,
        estadoCasilla: juego.tablero.obtenerCasilla(propiedades[i].tema.posicion).estadoCasilla.nombre
      };
    }
    var	jsonData={
      "propiedades":newPropiedades
    };
    json=getJson(request.params.uid);
  }
  else{
   json=getJsonNoUser();
 }
 response.send(json);
});

app.get("/getFichas",function(request,response){
	var usuarios = juego.usuarios;
  var fichas = [];
  for(i=0;i<usuarios.length;i++){
    fichas[i]={color: usuarios[i].ficha.color, posicion: usuarios[i].ficha.posicion};
  }
  var	jsonData={
    "fichas":fichas
  };
  response.send(jsonData);
});

app.get("/getCasas",function(request,response){
	var casillas = juego.tablero.casillas;
  var casas = [];
  var j=0;
  for(i=0;i<casillas.length;i++){
    if(casillas[i].tema.titulo != undefined && casillas[i].tema.titulo.terreno.numero != "0"){
      casas[j]={posicion: i, casas: casillas[i].tema.titulo.terreno.numero, color: casillas[i].tema.titulo.terreno.color};
      j++;
    }
  }
  var	jsonData={
    "casas":casas
  };
  response.send(jsonData);
});

app.get("/hipotecar/:uid-:posicion",function(request,response){
  var usuario = juego.getUser(request.params.uid);
  usuario.hipotecar(request.params.posicion);
  response.send({status:"ok"});
});
app.get("/quitarHipoteca/:uid-:posicion",function(request,response){
  var usuario = juego.getUser(request.params.uid);
  usuario.quitarHipotecaCasilla(request.params.posicion);
  response.send({status:"ok"});
});

app.get("/vender/:uid-:posicion",function(request,response){
  var usuario = juego.getUser(request.params.uid);
  usuario.venderCasa(request.params.posicion);
  update();
  response.send({status:"ok"});
});

app.get("/subasta/:uid-:posicion",function(request,response){
  var usuario = juego.getUser(request.params.uid);
  usuario.subastar(request.params.posicion);
  subasta(juego.tablero.obtenerCasilla(request.params.posicion));
  console.log("entre en la subasta")
  response.send({status:"ok"});
});

app.get("/puja/:uid-:pelotis",function(request,response){
  var usuario = juego.getUser(request.params.uid);
  usuario.pujar(request.params.pelotis);
  update();
  console.log("entre en la puja: " + request.params.pelotis )
  response.send({status:"ok"});
});

// generar json
function getJson(uid){
  var jugador = juego.getUser(uid);
  var propiedades= jugador.ficha.propiedades;
  var newPropiedades=[];
  for(i=0;i<propiedades.length;i++){
   
    newPropiedades[i]= {
      nombre: propiedades[i].tema.nombre, 
      color: propiedades[i].tema.color, 
      posicion: propiedades[i].tema.posicion,
      estadoCasilla: juego.tablero.obtenerCasilla(propiedades[i].tema.posicion).estadoCasilla.nombre
    };
  }
  
  
  var	jsonData={"nombre":jugador.nombre,
  "uid":jugador.uid,
  "color":jugador.ficha.color,
  "turno":jugador.ficha.turno.nombre,
  "posicion":jugador.ficha.posicion,
  "saldo":jugador.ficha.saldo,
  "estado":juego.estado.nombre,
  "jugadores":juego.numUsuarios,
  "propiedades":newPropiedades,
  "tarjetas": jugador.ficha.numTarjetas,
  "status": "ok"
};
   // console.log(jsonData);
   return jsonData;
 }
 function getJsonNoUser(){
  var	jsonData={
    "status": "fail",
    "mensaje": "se ha producido un error con su usuario, posiblemente no este registrado o tenga las cookies caducadas. Por favor recargue la pagina web"
  };
  return jsonData;
}

server.listen(port,host);
console.log("Servidor iniciado en puerto: "+port);



var coleccion =[];
io.on('connection',function(client){
	console.log('conectado');
	io.emit("go",{juego:"ok"});
})

function responderIniciarPartida(){
  console.log('responderIniciarPartida');
  io.emit("iniciarPartida",{juego:"ok"});
}
function update(){
  console.log('update');
  io.emit("update",{juego:"ok"});
}
function subasta(casilla){
  console.log('subasta!! ' + casilla);
  var json={
    nombre: casilla.tema.nombre
  }
  io.emit("subasta",json);
}

