function Solar(){
    this.coste=1;//0%
    this.construir = function(tema,ficha){
        ficha.pagar(tema.dinero*this.coste);
            console.log("casa1 construida");
        return new Casa1();
    }
    
    this.vender = function(tema,ficha){
            console.log("no se puede vender el solar");
        return this;
    }
    
}

function Casa1(){
    this.coste=1.2;//20%
    this.construir = function(tema,ficha){
        ficha.cobrar(tema.dinero*this.coste);
            console.log("casa2 construida");
        return new Casa2();
    }
    
     this.vender = function(tema,ficha){
        ficha.cobrar(tema.dinero*this.coste);
            console.log("casa1 vendida");
        return new Solar();
    }
}

function Casa2(){
    this.coste=1.4;//40%
    this.construir = function(tema,ficha){
        ficha.pagar(tema.dinero*this.coste);
            console.log("casa3 construida");
        return new Casa3();
    }
    
    this.vender = function(tema,ficha){
        ficha.cobrar(tema.dinero*this.coste);
            console.log("casa2 vendida");
        return new Casa1();
    }
}
function Casa3(){
    this.coste=1.6;//60%
    this.construir = function(tema,ficha){
        ficha.pagar(tema.dinero*this.coste);
            console.log("casa4 construida");
        return new Casa4();
    }
    
    this.vender = function(tema,ficha){
        ficha.cobrar(tema.dinero*this.coste);
            console.log("casa3 vendida");
        return new Casa2();
    }
}
function Casa4(){
    this.coste=1.8;//80%
    this.construir = function(tema,ficha){
        ficha.pagar(tema.dinero*this.coste);
        console.log("Hotel construido");
        return new Hotel();
    }
    
    this.vender = function(tema,ficha){
        ficha.cobrar(tema.dinero*this.coste);
            console.log("casa4 vendida");
        return new Casa3();
    }
}

function Hotel(){
    this.coste=2;//20%
    this.construir = function(tema,ficha){
        console.log("Ya tienes un hotel, no puedes construir mas");
        return this;
    }
    this.vender = function(tema,ficha){
        ficha.cobrar(tema.dinero*this.coste);
            console.log("Hotel vendido");
        return new Casa4();
    }
}

function Casilla(tema,estado){
	this.tema=tema
    this.estado = estado;
    
    this.comprar=function(ficha){
        this.estado = this.estado.comprar(ficha,this);        
    }
    
    this.construir=function(ficha){
        if (this.tema instanceof TemaCalle){
            this.tema.construir(ficha);   
        }
        else{
            console.log("En esta casilla no se puede construir");
        }
    }
    
    this.caerCasilla=function(ficha){
        this.tema.caerCasilla(ficha);
    }
}

function Dado(){
    this.tirar = function(){
        return Math.floor((Math.random() * 6) + 1);
    };
}

function EstadoInicio(juego){
    this.juego=juego;
    this.nombre="Inicio del juego"
    
    this.agregarUsuario=function(usuario){
        
        if(this.juego.numFichasDisponibles>=0){
            this.juego.usuarios[this.juego.numUsuarios] = usuario;
            
            usuario.asignarFicha(this.juego.fichas[this.juego.numFichasDisponibles])
            usuario.asignarDado(this.juego.dado);
            
            this.juego.numUsuarios++;
            this.juego.numFichasDisponibles--;
            console.log("Usuario agregado");        
        }
        else{
            console.log("No se puede asignar mas usuarios");
        }       
    }
    
    this.siguiente=function(juego){
        this.juego.iniciarTurno();
        return new EstadoJuego(this.juego);
    };
    
    this.construir = function(ficha){             
            console.log("No puedes construir, el Juego esta en modo Inicio");        
    }
    
    this.comprar = function(ficha){
       console.log("No puedes comprar, el Juego esta en modo Inicio"); 
    }
}

function EstadoJuego(juego){
    this.juego=juego;
    this.nombre="Jugando"
    
    this.agregarUsuario=function(usuario){
        console.log("No se puede asignar mas usuarios");
    };
    
    this.siguiente=function(){
       // this.juego.finTurnos();
        return new EstadoFin(this.juego);
    };
    
    this.construir = function(ficha){ 
            this.juego.tablero.obtenerCasilla(ficha.posicion).construir(ficha);
    }    
    
    this.comprar = function(ficha){
        this.juego.tablero.obtenerCasilla(ficha.posicion).comprar(ficha);
    }
}

function EstadoFin(juego){
    this.juego=juego
    this.nombre="FIN del juego"
    this.agregarUsuario=function(usuario){
        console.log("No se puede asignar mas usuarios");
    };
    
    this.siguiente=function(){
        console.log("El juego ha terminado");
        return this;
    };
    
    this.construir = function(ficha){             
            console.log("No puedes construir, el Juego ha finalizado");        
    }
    
    this.comprar = function(ficha){
       console.log("No puedes comprar, el Juego esta ha finalizado"); 
    }    
    
}

function EstadoComprado(ficha){
    
    this.propietario = ficha;
    
    this.comprar = function(ficha,casilla){        
        console.log("La ficha ya esta comprada");
        return this;
    }
}

function EstadoLibre(){
    this.comprar = function(ficha,casilla){
        console.log("La " +  casilla.tema.nombre +" se ha comprado");
        ficha.pagar(casilla.tema.dinero);
        casilla.tema.asignarTitulo(ficha);
        return new EstadoComprado(ficha);
    }
}

function EstadoNoComprable(){ 
    this.comprar = function(ficha,casilla){
        console.log("Esta casilla no se puede comprar");
         return this;
    }
}





function Turno(){
    this.nombre="te toca"
    
    this.moverFicha = function (avance,ficha){
            
        ficha.carcel.moverFicha(avance,ficha);
    };
    
    this.moverFichaCarcel = function (avance,ficha){          
        ficha.carcel.moverFichaCarcel(avance,ficha);
    };
}

function NoTurno(){
    this.nombre="no te toca"
    
    this.moverFicha = function (avance,ficha){            
            console.log("No tienes el turno");
    };
     this.moverFichaCarcel = function (avance,ficha){
            console.log("No tienes el turno");        
    };
}

function EstadoLibreCarcel(){
    this.moverFicha = function (avance,ficha){
                var postAnt = ficha.posicion;
                ficha.posicion = (ficha.posicion + avance)%40;
                if (postAnt >= 28 && ficha.posicion >= 0){
                    ficha.cobrar(200);//casilla de salida
                }
                ficha.juego.caerCasilla(ficha);
            ficha.juego.pasarTurno();   
    };
    
    this.moverFichaCarcel = function (avance,ficha){
                ficha.posicion = 10;
                ficha.juego.pasarTurno();
    };
}

function EstadoCarcel(){
    this.moverFicha = function (avance,ficha){
        console.log("estas en la carcel");
            ficha.juego.pasarTurno();   
    };
    
    this.moverFichaCarcel = function (avance,ficha){
                ficha.salirCarcel();//salgo de la carcel 
                ficha.moverFicha(avance);
    };
}




function Tablero(numCasillas){
	this.numCasillas=numCasillas
	this.casillas =[] 
	
	this.agregarCasilla = function(posicion, casilla){
		this.casillas[posicion]=casilla
	}

	this.iniciarTableo=function(){
		for (var i = 0; i < numCasillas; i++) {
			this.agregarCasilla(i,new Normal())
		}
	}

	this.factoryTablero=function(){
		this.agregarCasilla(0,new Casilla(new TemaSalida(),new EstadoNoComprable()))
		this.agregarCasilla(1,new Casilla(new TemaCalle("Marron","Ronda de Valencia",60), new EstadoLibre()))
		this.agregarCasilla(2,new Casilla(new TemaCajaComunidad(200),new EstadoNoComprable()))
		this.agregarCasilla(3,new Casilla(new TemaCalle("Marron","Plaza Lavapies",60), new EstadoLibre()))
		this.agregarCasilla(4,new Casilla(new TemaImpuesto(200),new EstadoNoComprable()))
		this.agregarCasilla(5,new Casilla(new TemaEstacion("Estación de Goya",200), new EstadoLibre()))
		this.agregarCasilla(6,new Casilla(new TemaCalle("Cian","Glorieta Cuatro Caminos",100), new EstadoLibre()))
		this.agregarCasilla(7,new Casilla(new TemaSuerte(),new EstadoNoComprable()))
		this.agregarCasilla(8,new Casilla(new TemaCalle("Cian","Avenida Reina Victoria",100), new EstadoLibre()))
		this.agregarCasilla(9,new Casilla( new TemaCalle("Cian","Calle Bravo Murillo",120), new EstadoLibre()))
		this.agregarCasilla(10,new Casilla( new TemaCarcel(),new EstadoNoComprable()))
		this.agregarCasilla(11,new Casilla( new TemaCalle("Rosa","Calle Bilbao",140), new EstadoLibre()))
		this.agregarCasilla(12,new Casilla( new TemaCompañia("Electricidad",150),new EstadoNoComprable()))
		this.agregarCasilla(13,new Casilla( new TemaCalle("Rosa","Calle Abierto Aguilera",140), new EstadoLibre()))
		this.agregarCasilla(14,new Casilla( new TemaCalle("Rosa","Calle Fuencarral",160), new EstadoLibre()))
		this.agregarCasilla(15,new Casilla(new TemaEstacion("Estación de Delicias",200), new EstadoLibre()))
		this.agregarCasilla(16,new Casilla(new TemaCalle("Naranja","Avenida Felipe II",180), new EstadoLibre()))
		this.agregarCasilla(17,new Casilla(new TemaCajaComunidad(200),new EstadoNoComprable()))
		this.agregarCasilla(18,new Casilla(new TemaCalle("Naranja","calle Velazquez",180), new EstadoLibre()))
		this.agregarCasilla(19,new Casilla(new TemaCalle("Naranja","Calle Serrano",200), new EstadoLibre()))
		this.agregarCasilla(20,new Casilla(new TemaParking(),new EstadoNoComprable()))
		this.agregarCasilla(21,new Casilla(new TemaCalle("Rojo","Avenida America",220), new EstadoLibre()))
		this.agregarCasilla(22,new Casilla(new TemaSuerte(),new EstadoNoComprable()))
		this.agregarCasilla(23,new Casilla(new TemaCalle("Rojo","Calle Maria de Molina",220), new EstadoLibre()))
		this.agregarCasilla(24,new Casilla(new TemaCalle("Rojo","Calle Bermudez",240), new EstadoLibre()))
		this.agregarCasilla(25,new Casilla(new TemaEstacion("Estación de Mediodía",200), new EstadoLibre()))
		this.agregarCasilla(26,new Casilla(new TemaCalle("Amarillo","Avenida de los Reyes Catolicos",260), new EstadoLibre()))
		this.agregarCasilla(27,new Casilla(new TemaCalle("Amarillo","Calle Bailén",260), new EstadoLibre()))
		this.agregarCasilla(28,new Casilla(new TemaCompañia("Aguas",150),new EstadoNoComprable()))
		this.agregarCasilla(29,new Casilla(new TemaCalle("Amarillo","Plaza de España",280), new EstadoLibre()))
		this.agregarCasilla(30,new Casilla(new TemaIrCarcel(),new EstadoNoComprable()))
		this.agregarCasilla(31,new Casilla(new TemaCalle("Verde","Puerta del SOL",300), new EstadoLibre()))
		this.agregarCasilla(32,new Casilla(new TemaCalle("Verde","Calle Alcalá",300), new EstadoLibre()))
		this.agregarCasilla(33,new Casilla(new TemaCajaComunidad(),new EstadoNoComprable()))
		this.agregarCasilla(34,new Casilla(new TemaCalle("Verde","Gran Vía",320), new EstadoLibre()))
		this.agregarCasilla(35,new Casilla(new TemaEstacion("Estación del Norte",200), new EstadoLibre()))
		this.agregarCasilla(36,new Casilla(new TemaSuerte(),new EstadoNoComprable()))
		this.agregarCasilla(37,new Casilla(new TemaCalle("Azul","Paseo de la Castellana",380), new EstadoLibre()))
		this.agregarCasilla(38,new Casilla(new TemaImpuesto(100),new EstadoNoComprable()))
		this.agregarCasilla(39,new Casilla(new TemaCalle("Azul","Paseo del Prado",400), new EstadoLibre()))

	}
	
    this.obtenerCasilla=function(posicion){
		return this.casillas[posicion]
	}
	
}


function TemaCajaComunidad(dinero){
	this.nombre="Comunidad"
	this.dinero=dinero   
    this.caerCasilla=function(ficha){
        ficha.pagar(this.dinero);
    }
}

function TemaCalle(color, nombre, dinero){
	this.color=color
	this.nombre=nombre
	this.dinero=dinero
    this.estado = new EstadoLibre();
    this.titulo = null;
    
    this.asignarTitulo = function(ficha){
        this.titulo=new Titulo(ficha,this);
        ficha.agregarTitulo(this.titulo);
    }
    
    this.construir=function(ficha){
        this.titulo.construirCasa(ficha);
    }
    
    this.caerCasilla=function(ficha){
        if(this.titulo!=null){
            this.titulo.pagarCasilla(ficha)
        }
        else{
            console.log("esta casilla no es de nadie");
        }
    }
}

function TemaCarcel(){
	this.nombre="Carcel"
    this.caerCasilla=function(ficha){
        ficha.irCarcel();
        console.log("Estas en la carcel...PRINGAO!")
    }
}

function TemaCompañia(nombre,dinero){
	this.nombre=nombre
	this.dinero=dinero    
    this.caerCasilla=function(ficha){
         ficha.pagar(this.dinero);
    }
}

function TemaEstacion(nombre,dinero){
	this.nombre=nombre
	this.dinero=dinero
    this.estado = new EstadoLibre();  
    this.titulo = null;
    
    
    this.asignarTitulo = function(ficha){
        this.titulo=new Titulo(ficha,this);
        ficha.agregarTitulo(this.titulo);
    }
    
    this.caerCasilla=function(ficha){
        if(this.titulo!=null){
            this.titulo.pagarEstacion(ficha)
        }
        else{
            console.log("esta casilla no es de nadie");
        }
    }
}

function TemaImpuesto(dinero){
	this.nombre="Impuesto"
	this.dinero=dinero   
    
    this.caerCasilla=function(ficha){
         ficha.pagar(this.dinero);
    }
    
}

function TemaIrCarcel(){
	this.nombre="Ir a la Carcel"   
    this.caerCasilla=function(ficha){
        ficha.AvanzarFichaCarcel();
        console.log("te vas a la carcel...PRINGAO!")
    }
}

function TemaParking(){
	this.nombre="Parking" 
    this.caerCasilla=function(ficha){
        console.log("no pagas nada, porque te estas en el parking...")
    }
}

function TemaSalida(){
	this.nombre="Salida" 
    this.caerCasilla=function(ficha){
        console.log("no pagas nada, porque te estas en el salida...")
    }
}

function TemaSuerte(){
	this.nombre="Suerte" 
    this.tarjetas = [];
    this.tarjetas[0]=new TarjetaMulta(150);
    this.tarjetas[1]=new TarjetaPremio(150);
    this.tarjetas[2]=new TarjetaAvanzar(3);
    this.tarjetas[3]=new TarjetaRetroceder(3);
    this.tarjetas[4]=new TarjetaCarcel();
    this.tarjetas[5]=new TarjetaLibreCarcel();
    
    this.caerCasilla=function(ficha){        
        console.log("Coge una tarjeta...");
        var posTarjeta = Math.floor(Math.random() * 6);             
        this.tarjetas[posTarjeta].accion(ficha);
         console.log("La carta escogida es: " + this.tarjetas[posTarjeta].nombre);
    }
    
    this.caerCasillaTest=function(ficha,posTarjeta){        
        console.log("Coge una tarjeta...");
        var posTarjeta =posTarjeta;             
        this.tarjetas[posTarjeta].accion(ficha);
         console.log("La carta escogida es: " + this.tarjetas[posTarjeta].nombre);
    }
}

function TarjetaMulta(multa){
    this.nombre = "Multa";
    this.multa = multa;
    this.accion = function(ficha){
        ficha.pagar(this.multa);
    }    
}

function TarjetaPremio(premio){
    this.nombre = "Premio";
    this.premio = premio;
    this.accion = function(ficha){
        ficha.cobrar(this.premio);
    }    
}

function TarjetaAvanzar(numCasillas){
    this.nombre = "Avanzar";
    this.numCasillas = numCasillas;
    this.accion = function(ficha){
        ficha.AvanzarFicha(this.numCasillas);
    }    
}

function TarjetaRetroceder(numCasillas){
    this.nombre = "Retroceder";
    this.numCasillas = -1 * numCasillas;
    this.accion = function(ficha){
        ficha.AvanzarFicha(this.numCasillas);
    }    
}

function TarjetaCarcel(){
    this.nombre = "Carcel";
    this.accion = function(ficha){
        ficha.AvanzarFichaCarcel();
    }    
}

function TarjetaLibreCarcel(){
    this.nombre = "Libre de Carcel";
    this.accion = function(ficha){
        ficha.agregarTarjeta(new TarjetaLibreCarcel());
    }
    this.salirCarcel = function(ficha){
        ficha.salirCarcel();
    };
}

function Titulo(ficha,tema){
    this.ficha=ficha;
    this.tema=tema;
    this.terreno = new Solar();
    
    this.construirCasa = function(ficha){        
        if(this.ficha===ficha){
            this.terreno = this.terreno.construir(this.tema,ficha)
        }
        else{
            console.log("no puedes construir la casa");
        }
    }
    
    this.venderCasa = function(ficha){        
        if(this.ficha===ficha){
            this.terreno = this.terreno.vender(this.tema,ficha)
        }
        else{
            console.log("no puedes vender la casa");
        }
    }
    this.pagarCasilla=function(ficha){
        if(!(this.ficha ===ficha)){
            ficha.pagar(this.terreno.coste * this.tema.dinero);
            this.ficha.cobrar(this.terreno.coste * this.tema.dinero);
        }
        else{
            console.log("es tu calle tontolaba!")
        }
    }
    
    this.pagarEstacion=function(ficha){
        if(!(this.ficha===ficha)){
            ficha.pagar(this.tema.dinero*this.numeroEstaciones());
            this.ficha.cobrar(this.tema.dinero*this.numeroEstaciones());
        }
        else{
            console.log("es tu calle tontolaba!")
        }
    }
    
    this.numeroEstaciones=function(ficha){
        var estaciones = this.ficha.propiedades.filter(this.esEstacion);
        return estaciones.length;
    }
    
    this.esEstacion=function(casilla){
        return casilla.tema instanceof TemaEstacion;
    }
    
}



function Usuario(nombre,juego){
    this.nombre= nombre
    this.juego = juego;
    this.dado = null;
    this.ficha = null;
    this.dobles=1;
    this.uid=null;
    
    this.asignarFicha=function(ficha){
        this.ficha=ficha;
    };
    
    this.asignarDado=function(dado){
        this.dado=dado;
    };    
    
    this.tirarDado = function(){
        var posiciones1 = this.dado.tirar();
        var posiciones2 = this.dado.tirar();
        if(this.dobles==3){
            this.ficha.moverFichaCarcel(posiciones1+posiciones2);  
        }else{
            if(posiciones1==posiciones2){
                this.dobles++;
            }
            else{
                this.ficha.moverFicha(posiciones1+posiciones2 );
                this.dobles=1;
            }
        }
        
        if(this.ficha.esBancarrota()) {            
            juego.eliminarUsuario(this);
            console.log("Te han eliminado");
        }
    };
    
    
    this.tirarDadoTestDobles = function(){
        var posiciones1 = 1;
        var posiciones2 = 1;
        
        if(this.dobles==3){
            this.ficha.moverFichaCarcel(posiciones1+posiciones2);  
        }else{
            if(posiciones1==posiciones2){
                this.dobles++;
            }
            else{
                this.ficha.moverFicha(posiciones1+posiciones2);
                this.dobles=1;
            }
        }
    
    };
    
    
    this.tirarDadoTest = function(posicion){
        var posiciones = posicion;
        this.ficha.moverFicha(posiciones);
        if(this.ficha.esBancarrota()) {            
            juego.eliminarUsuario(this);
            console.log("Te han eliminado");
        }
    };
    
    this.comprar = function(){
         if(this.ficha.esBancarrota()) {
            console.log("Te han eliminado");
         }else{
            this.juego.comprar(this.ficha);
         }
    }
    this.venderCasa= function(titulo){
        this.ficha.venderCasa(titulo);
    }
    
    this.construir = function(){
        if(this.ficha.esBancarrota()) {
            console.log("Te han eliminado");
         }else{
            this.juego.construir(this.ficha);
         }
    }
    
    this.pagar = function(precio){
        this.ficha.pagar(precio);
    }
    
    this.iniciarJuego=function(){
        this.juego.siguienteEstado();
    }
    
    this.pagarFianzaCarcel=function(){
        this.ficha.pagar(50);
        this.ficha.salirCarcel();
    }
    
    this.usarTarjetaCarcel=function(){
        this.ficha.usarTarjeta();
    }
}
function Ficha(color, posicion,juego){
    this.color=color;
    this.saldo = 150000;
    this.posicion = posicion;
    this.propiedades = [];
    this.numPropiedades=0;
    this.turno = new NoTurno();
    this.juego=juego;
    this.tarjetas = [];
    this.numTarjetas=0;
    this.carcel=new EstadoLibreCarcel();    
    
    this.moverFicha = function (avance){
        
        this.turno.moverFicha(avance,this);
    };
    
    this.AvanzarFicha = function (avance){
            this.posicion = (this.posicion + avance)%40;
            this.juego.caerCasilla(this);
    };
    this.AvanzarFichaCarcel = function (){
            this.posicion = 10;
    };
    
    this.esBancarrota=function(){
        return (this.saldo<0) && (this.numPropiedades==0);
    }
    
    this.moverFichaCarcel = function (avance){        
        this.turno.moverFichaCarcel(avance,this);
    };
    
    this.lanzarDadoTest = function (numero){
        this.posicion= numero % 40;
    };
    
    this.agregarTitulo = function(titulo){
		this.propiedades[this.numPropiedades]=titulo;
        this.numPropiedades++;
	};
    
    this.pagar = function(precio){
        this.saldo= this.saldo-precio;
    }
    
    this.cobrar = function(precio){
        this.saldo += precio;
    }
    
    this.quitarTurno=function(){
        this.turno = new NoTurno();
    };
    this.darTurno = function(){
        this.turno = new Turno();
    };
    this.agregarTarjeta = function(tarjeta){
        this.tarjetas[this.numTarjetas]=tarjeta;
        this.numTarjetas++;
    }
    this.irCarcel=function(){
        //this.carcel = true;
        this.carcel = new EstadoCarcel();
    }
    this.salirCarcel=function(){
        //this.carcel = false;
        this.carcel =  new EstadoLibreCarcel();
    }
    this.usarTarjeta = function(){
        if(this.numTarjetas > 0){
            this.tarjetas.splice(0,1);
            this.numTarjetas--;
            this.salirCarcel();
        }else{
            console.log("No tienes Tarjetas");
        }
    };
    
    this.venderCasa = function(titulo){
        var indice = this.propiedades.indexOf(titulo);
        if(indice>=0){
            this.propiedades[indice].venderCasa(this);
        }else{
            console.log("ese titulo no es tuyo");
        }
    }    
}
function Partida(dado){
    this.usuarios = []
    this.numUsuarios = 0;
    this.fichas = [];
    this.numFichasDisponibles = 0;
    this.tablero = null;
    this.dado=dado;
    this.turno = 0;
    this.SALDO_MAX = 3000000;
    this.estado = new EstadoInicio(this);
    
    this.getUid=function(){
		val= (new Date()).valueOf().toString();
		console.log(val);
		return val;
	}
    
    
    this.getUser = function(uid){       
        for (i = 0; i < this.usuarios.length; i++) { 
            if(uid == this.usuarios[i].uid) return this.usuarios[i];
        }
    }
    
    this.siguienteEstado = function(){
        if(this.numUsuarios>1){
            this.estado = this.estado.siguiente(this);
            
        }
        else{
            console.log("necesitas mas jugadores");
        }
    }
    
    this.comprar = function(ficha){
        this.estado.comprar(ficha);
    }
    
    this.construir = function(ficha){         
        this.estado.construir(ficha);
    }
    
    this.caerCasilla = function(ficha){  
                this.tablero.obtenerCasilla(ficha.posicion).caerCasilla(ficha);
    }
    
    this.iniciarTurno=function(){
        //this.turno = Math.floor((Math.random() * this.numUsuarios));
        this.turno=0;
        this.usuarios[this.turno].ficha.darTurno();
        //console.log(this.usuarios[this.turno].nombre);
    }
    
    /*this.finTurnos=function(){
        this.usuarios[this.turno].ficha.quitarTurno();
    }*/
    
    this.pasarTurno = function(){
        this.usuarios[this.turno].ficha.quitarTurno();   
        if(this.usuarios[this.turno].ficha.saldo >= this.SALDO_MAX){
            console.log("El juego ha terminado, ha ganado el jugador: " + this.usuarios[this.turno].nombre);
            this.siguienteEstado();
        }
        
        this.turno = (this.turno+1)%this.numUsuarios;
        this.usuarios[this.turno].ficha.darTurno();
        
    }
    
    this.eliminarUsuario = function(usuario){
        var indice=this.usuarios.indexOf(usuario);
        this.usuarios[indice].ficha.turno=false;
        this.usuarios.splice(indice,1);
        if(this.usuarios.length==1){
            console.log("El juego a terminado... Ha ganado el jugador: " + this.usuarios[0].nombre);
            this.siguienteEstado();
        }
    }
    
    
    this.iniciarJuego=function(numFichasDisponibles){
        this.numFichasDisponibles = numFichasDisponibles;
        this.tablero=new Tablero(40);
        this.tablero.factoryTablero();
    }
    
    this.agregarUsuario = function (usuario){   
        usuario.uid=this.getUid();
        this.estado.agregarUsuario(usuario);
    }
    
    this.generarFichas = function(){
        this.fichas[0] = new Ficha("Rojo",0,this);
        this.fichas[1] = new Ficha("Verde",0,this);
        this.fichas[2] = new Ficha("Azul",0,this);
        this.fichas[3] = new Ficha("Amarillo",0,this);
        this.fichas[4] = new Ficha("Marron",0,this);
        this.fichas[5] = new Ficha("Naranja",0,this);
    }    
}

module.exports.Tablero=Tablero;
module.exports.Partida=Partida;
module.exports.Dado=Dado;
module.exports.Usuario=Usuario;
module.exports.Solar=Solar;
module.exports.Hotel=Hotel;
module.exports.Casa1=Casa1;
module.exports.Casa2=Casa2;
module.exports.Casa3=Casa3;
module.exports.Casa4=Casa4;
module.exports.Turno=Turno;
module.exports.EstadoJuego=EstadoJuego;
module.exports.EstadoFin=EstadoFin;
module.exports.TarjetaLibreCarcel=TarjetaLibreCarcel;