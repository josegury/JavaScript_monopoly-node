//var url="http://127.0.0.1:1337/";
var url="http://monoply.cloudapp.net/"
var usuarioUid=$.cookie("uid");;
var socket = io(url);



//Sockets
function socketFunction(){
	socket.on('go',function(){
		console.log('socket conectado');
	})
	
	socket.on('iniciarPartida',function(){
        getEstado($.cookie("uid"));
		console.log('socket iniciarpartida');
	})
    
    socket.on('update',function(){
        getEstado($.cookie("uid"));
		console.log('socket update');
	})

    socket.on('subasta',function(data){
        var mensaje_modal = document.getElementById('mensaje_modal');
        mensaje_modal.abrir_mensaje("Subasta",data.nombre);

        console.log(data);
    })
}



function inicio(){
    
    
    var info_ficha = document.getElementById('info_ficha');
    var fab = document.getElementById('fab');
        fab.addEventListener('tap', function() { onClickFab(); });   
    var btn_cambiar_estado = document.getElementById('btn_cambiar_estado');
    btn_cambiar_estado.addEventListener('tap', function() { cambiarEstado($.cookie("uid")); });
    var btn_comprar = document.getElementById('btn_comprar');
    btn_comprar.addEventListener('tap', function() { comprarCasilla($.cookie("uid")); });
    var btn_construir = document.getElementById('btn_construir');
    btn_construir.addEventListener('tap', function() { construirCasilla($.cookie("uid")); });
    
    if($.cookie("uid")!=undefined){
        getEstado($.cookie("uid"));         
    }else{   
        info_ficha.nombre="Sin Registrar";
        info_ficha.color="red";
        //cuadro de dialogo
        /*var pedirFicha = document.getElementById('pedirFicha');
        var pedirFichaNombre = document.getElementById('pedirFichaNombre');
        pedirFicha.addEventListener('tap', function() { obtenerFicha(pedirFichaNombre.value); });  */      
    } 
}

function onClickDados(){
    
            
            tirarDados($.cookie("uid"));
	
}

function pedirRegistro(){
    var dialog = document.getElementById("mensaje_registro");
    //var dialog = document.getElementById("dialog_pedirFicha");
        dialog.abrir_mensaje();
        /*if (dialog) {
            dialog.open();
        }*/
}

function onClickFab(){
    if($.cookie("uid")!=undefined){
        onClickDados();
    }
    else{
        pedirRegistro();
    }
}



function mostrarDatosJugador(nombre,uid,color,estado,numUsuarios,turno,saldo,propiedades, posicion,tarjetas){
    
    var panel = document.getElementById('panel');
    if(estado=="Jugando"){
        panel.eliminiar_boton_estado();
     }
    if(tarjetas>0){
        panel.pintar_tarjeta();
    }else{
        panel.eliminiar_tarjeta();
    }
    var btn_usar_tarjeta = document.getElementById('btn_usar_tarjeta');
        btn_usar_tarjeta.addEventListener('tap', function() { usarTarjetaCarcel($.cookie("uid")); });  

    
    
    
    var info_ficha = document.getElementById('info_ficha');
    info_ficha.nombre=nombre;
    info_ficha.color=color;
    
    panel.posicion=posicion;
        
    panel.cantidad=saldo; 
    
    panel.estado=estado;
    panel.turno=turno;
    
    var info_propiedades = document.getElementById('propiedades');
    info_propiedades.cargarPropiedades(propiedades);
    getcasas();
    getfichas();
    
}
function mostrarMensaje(cabecera,cuerpo){
    if(cabecera != undefined || cuerpo != undefined){
        var mensaje = document.getElementById('mensaje');
        mensaje.abrir_mensaje(cabecera,cuerpo);
    }
}

//comunicación con el servidor
function obtenerFicha(nombre){
     $.getJSON(url+"nuevoJugador/"+nombre,function(data){
         mostrarDatosJugador(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo,data.propiedades, data.posicion,data.tarjetas );
         almacenarCookie(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo,data.posicion);
    })
}

function cambiarEstado(uid){
    if($.cookie("uid")!=undefined){
        $.getJSON(url+"iniciarPartida/"+uid,function(data){
            
        });
    }
}

function tirarDados(uid){
    $.getJSON(url+"tirarDados/"+uid,function(data){	
        if(data.mensaje != undefined){
            mostrarMensaje("casilla", data.mensaje);
            if(data.status=="fail"){
                borrarCookie();
            }
        }
        
	})
}

function tirarDadoTest(posicion){
    $.getJSON(url+"tirarDadoTest/"+$.cookie("uid")+"-"+posicion,function(data){ 
        if(data.mensaje != undefined){
            mostrarMensaje("casilla", data.mensaje);            
        }
        
    })
}

function comprarCasilla(uid){
    $.getJSON(url+"comprar/"+uid,function(data){		
		
	})
}
function construirCasilla(uid){
    $.getJSON(url+"construir/"+uid,function(data){		
		
	})
}

function getEstado(uid){
    $.getJSON(url+"estadoPartida/"+uid,function(data){
       mostrarDatosJugador(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo,data.propiedades, data.posicion,data.tarjetas );
        almacenarCookie(data.nombre,data.uid,data.color,data.estado,data.jugadores,data.turno,data.saldo,data.posicion);        
	})
}
function getfichas(){
    $.getJSON(url+"getFichas/",function(data){		
        var tablero = document.getElementById('tablero');
        tablero.pintarFichas(data.fichas);
        tablero.pintarFicha($.cookie("ficha"), $.cookie("posicion"));
	})
}
function getcasas(){
    $.getJSON(url+"getCasas/",function(data){		
        var tablero = document.getElementById('tablero');
        tablero.pintarCasas(data.casas);
	})
}
function usarTarjetaCarcel(uid){
     $.getJSON(url+"usarTarjetaCarcel/"+uid,function(data){
         mostrarMensaje("Carcel", data.mensaje);
    })
}

function hipotecar(posicion){
    $.getJSON(url+"hipotecar/"+$.cookie("uid")+"-"+posicion,function(data){
        console.log(data.status);
         //.......
    })
}
function quitarHipoteca(posicion){
    $.getJSON(url+"quitarHipoteca/"+$.cookie("uid")+"-"+posicion,function(data){
         //.......
    })
}

function venderCasa(posicion){
    console.log(posicion);
    $.getJSON(url+"vender/"+$.cookie("uid")+"-"+posicion,function(data){
         //.......
    })
}

function subastarCasa(posicion){
    console.log(posicion);
    $.getJSON(url+"subasta/"+$.cookie("uid")+"-"+posicion,function(data){
         //.......
    })
}

function pujarCasa(pelotis){
  //  console.log(posicion);
    $.getJSON(url+"puja/"+$.cookie("uid")+"-"+pelotis,function(data){
        
         //.......
    })
}




//coockies
function almacenarCookie(nombre,uid,ficha,estado,numUsuarios,turno,saldo,posicion){
	$.cookie('nombre',nombre);
	$.cookie('uid',uid);
	$.cookie('ficha',ficha);
	$.cookie('estado',estado);
	$.cookie('numUsuarios',numUsuarios);
	$.cookie('turno',turno);
	$.cookie('saldo',saldo);
    $.cookie('posicion',posicion);
}
function borrarCookie(){
    $.removeCookie('nombre', { path: '/' });
    $.removeCookie('uid', { path: '/' });
    $.removeCookie('ficha', { path: '/' });
    $.removeCookie('estado', { path: '/' });
    $.removeCookie('numUsuarios', { path: '/' });
    $.removeCookie('turno', { path: '/' });
    $.removeCookie('posicion', { path: '/' });
    $.removeCookie('saldo', { path: '/' });
    console.log("borrar cookies");
}
/*
function cargarCookies(){
	mostrarDatosJugador(
		$.cookie("nombre"),
		$.cookie("uid"),
		$.cookie("ficha"),
		$.cookie("estado"),
		$.cookie("numUsuarios"),
		$.cookie("turno"),
		$.cookie("saldo"),
        $.cookie("posicion")
	)
}*/

