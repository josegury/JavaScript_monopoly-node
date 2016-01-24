var modulo=require("./juego.js");
//var modelo=require("./modelo.js");

describe("Test del Monopoly",function(){
	var juego;
	
	beforeEach(function(){
		//juego = new modulo.Juego()
		//juego.iniJuego();
		//tablero=juego.getTablero();
		dado = new modulo.Dado();
        juego = new modulo.Partida();
        juego.iniciarJuego(3);
        juego.generarFichas();
        usuario = new modulo.Usuario("Pepe",juego);        
        juego.agregarUsuario(usuario);
        usuario_ = new modulo.Usuario("Pepa",juego);
        juego.agregarUsuario(usuario_);
		tablero=new modulo.Tablero(41)
	    tablero.factoryTablero()
		
	});
	/*describe("El juego se ha iniciado. ",function(){
		it("El juego tiene fases",function(){
			expect(juego.fase).toEqual("Inicial");
		})
	})*/
	describe("Al iniciar el tablero",function(){
		it("Coprobación de número de casillas",function(){
			expect(tablero.casillas).toBeDefined(); //debe existir la variable
            expect(tablero.numCasillas).toBeDefined(); //debe existir la variable
			expect(tablero.numCasillas).toEqual(41);	 //debe tener valor inicial 0
		});

		it("Comprobación estaciones",function(){	
			expect(tablero.casillas[5].tema.nombre).toEqual("Estación de Goya");
			expect(tablero.casillas[15].tema.nombre).toEqual("Estación de Delicias");
			expect(tablero.casillas[25].tema.nombre).toEqual("Estación de Mediodía");
			expect(tablero.casillas[35].tema.nombre).toEqual("Estación del Norte");
		});
        
        it("Comprobación compañias",function(){	
			expect(tablero.casillas[28].tema.nombre).toEqual("Aguas");
			expect(tablero.casillas[12].tema.nombre).toEqual("Electricidad");
		});

		it("Comprobación comunidad",function(){	
			expect(tablero.casillas[2].tema.nombre).toEqual("Comunidad");
			expect(tablero.casillas[17].tema.nombre).toEqual("Comunidad");            
			expect(tablero.casillas[33].tema.nombre).toEqual("Comunidad");
		});
        
        it("Comprobación carcel",function(){	
			expect(tablero.casillas[10].tema.nombre).toEqual("Carcel");
		});
        
        it("Comprobación ir a la carcel",function(){	
			expect(tablero.casillas[30].tema.nombre).toEqual("Ir a la Carcel");
		});
        
        it("Comprobación parking",function(){	
			expect(tablero.casillas[20].tema.nombre).toEqual("Parking");
		});
        
        it("Comprobación suerte",function(){	
			expect(tablero.casillas[7].tema.nombre).toEqual("Suerte");
			expect(tablero.casillas[22].tema.nombre).toEqual("Suerte");
			expect(tablero.casillas[36].tema.nombre).toEqual("Suerte");
		});
        
        it("Comprobación impuesto",function(){	
			expect(tablero.casillas[4].tema.nombre).toEqual("Impuesto");
			expect(tablero.casillas[38].tema.nombre).toEqual("Impuesto");
		});
        
        it("Comprobación marron",function(){	
			expect(tablero.casillas[1].tema.color).toEqual("Marron");
			expect(tablero.casillas[1].tema.nombre).toEqual("Ronda de Valencia");
            
			expect(tablero.casillas[3].tema.color).toEqual("Marron");
			expect(tablero.casillas[3].tema.nombre).toEqual("Plaza Lavapies");            
		});
        
         it("Comprobación cian",function(){	
			expect(tablero.casillas[6].tema.color).toEqual("Cian");
			expect(tablero.casillas[6].tema.nombre).toEqual("Glorieta Cuatro Caminos");
            
			expect(tablero.casillas[8].tema.color).toEqual("Cian");
			expect(tablero.casillas[8].tema.nombre).toEqual("Avenida Reina Victoria");  
             
             expect(tablero.casillas[9].tema.color).toEqual("Cian");
			expect(tablero.casillas[9].tema.nombre).toEqual("Calle Bravo Murillo"); 
		});
        
        it("Comprobación rosa",function(){	
			expect(tablero.casillas[11].tema.color).toEqual("Rosa");
			expect(tablero.casillas[11].tema.nombre).toEqual("Calle Bilbao");
            
			expect(tablero.casillas[13].tema.color).toEqual("Rosa");
			expect(tablero.casillas[13].tema.nombre).toEqual("Calle Abierto Aguilera");  
             
             expect(tablero.casillas[14].tema.color).toEqual("Rosa");
			expect(tablero.casillas[14].tema.nombre).toEqual("Calle Fuencarral"); 
		});
        
        it("Comprobación naranja",function(){	
			expect(tablero.casillas[16].tema.color).toEqual("Naranja");
			expect(tablero.casillas[16].tema.nombre).toEqual("Avenida Felipe II");
            
			expect(tablero.casillas[18].tema.color).toEqual("Naranja");
			expect(tablero.casillas[18].tema.nombre).toEqual("calle Velazquez");  
             
             expect(tablero.casillas[19].tema.color).toEqual("Naranja");
			expect(tablero.casillas[19].tema.nombre).toEqual("Calle Serrano"); 
		});
        
        it("Comprobación rojo",function(){	
			expect(tablero.casillas[21].tema.color).toEqual("Rojo");
			expect(tablero.casillas[21].tema.nombre).toEqual("Avenida America");
            
			expect(tablero.casillas[23].tema.color).toEqual("Rojo");
			expect(tablero.casillas[23].tema.nombre).toEqual("Calle Maria de Molina");  
             
             expect(tablero.casillas[24].tema.color).toEqual("Rojo");
			expect(tablero.casillas[24].tema.nombre).toEqual("Calle Bermudez"); 
		});
        
        it("Comprobación amarillo",function(){	
			expect(tablero.casillas[26].tema.color).toEqual("Amarillo");
			expect(tablero.casillas[26].tema.nombre).toEqual("Avenida de los Reyes Catolicos");
            
			expect(tablero.casillas[27].tema.color).toEqual("Amarillo");
			expect(tablero.casillas[27].tema.nombre).toEqual("Calle Bailén");  
             
             expect(tablero.casillas[29].tema.color).toEqual("Amarillo");
			expect(tablero.casillas[29].tema.nombre).toEqual("Plaza de España"); 
		});
        
        it("Comprobación verde",function(){	
			expect(tablero.casillas[31].tema.color).toEqual("Verde");
			expect(tablero.casillas[31].tema.nombre).toEqual("Puerta del SOL");
            
			expect(tablero.casillas[32].tema.color).toEqual("Verde");
			expect(tablero.casillas[32].tema.nombre).toEqual("Calle Alcalá");  
             
             expect(tablero.casillas[34].tema.color).toEqual("Verde");
			expect(tablero.casillas[34].tema.nombre).toEqual("Gran Vía"); 
		});
    
    it("Comprobación azul",function(){	
			expect(tablero.casillas[37].tema.color).toEqual("Azul");
			expect(tablero.casillas[37].tema.nombre).toEqual("Paseo de la Castellana");
            
			expect(tablero.casillas[39].tema.color).toEqual("Azul");
			expect(tablero.casillas[39].tema.nombre).toEqual("Paseo del Prado");  
		});
        
        it("Comprobación Dinero",function(){	
			expect(tablero.casillas[1].tema.dinero).toEqual(60); 
			expect(tablero.casillas[2].tema.dinero).toEqual(200); //comunidad
			expect(tablero.casillas[3].tema.dinero).toEqual(60); 
			expect(tablero.casillas[4].tema.dinero).toEqual(200); //impuesto
			expect(tablero.casillas[5].tema.dinero).toEqual(200); //estacion
			expect(tablero.casillas[6].tema.dinero).toEqual(100); 
			//expect(tablero.casillas[7].tema.dinero).toEqual(); //suerte
			expect(tablero.casillas[8].tema.dinero).toEqual(100); 
			expect(tablero.casillas[9].tema.dinero).toEqual(120); 
			expect(tablero.casillas[10].tema.dinero).toEqual(); //carcel
			expect(tablero.casillas[11].tema.dinero).toEqual(140); 
			expect(tablero.casillas[12].tema.dinero).toEqual(150); //electricidad
			expect(tablero.casillas[13].tema.dinero).toEqual(140); 
			expect(tablero.casillas[14].tema.dinero).toEqual(160); 
			expect(tablero.casillas[15].tema.dinero).toEqual(200); //estacion
			expect(tablero.casillas[16].tema.dinero).toEqual(180); 
			expect(tablero.casillas[17].tema.dinero).toEqual(200); //comunidad
			expect(tablero.casillas[18].tema.dinero).toEqual(180); 
			expect(tablero.casillas[19].tema.dinero).toEqual(200); 
			//expect(tablero.casillas[20].tema.dinero).toEqual();//parquing
			expect(tablero.casillas[21].tema.dinero).toEqual(220); 
			//expect(tablero.casillas[22].tema.dinero).toEqual(); //suerte
			expect(tablero.casillas[23].tema.dinero).toEqual(220); 
			expect(tablero.casillas[24].tema.dinero).toEqual(240); 
			expect(tablero.casillas[25].tema.dinero).toEqual(200); //estacion
			expect(tablero.casillas[26].tema.dinero).toEqual(260); 
			expect(tablero.casillas[27].tema.dinero).toEqual(260); 
			expect(tablero.casillas[28].tema.dinero).toEqual(150); //aguas 
			expect(tablero.casillas[29].tema.dinero).toEqual(280); 
			//expect(tablero.casillas[30].tema.dinero).toEqual();//carcel 
			expect(tablero.casillas[31].tema.dinero).toEqual(300); 
			expect(tablero.casillas[32].tema.dinero).toEqual(300); 
			expect(tablero.casillas[33].tema.dinero).toEqual(200); //comunidad
			expect(tablero.casillas[34].tema.dinero).toEqual(320); 
			expect(tablero.casillas[35].tema.dinero).toEqual(200); //estacion
			//expect(tablero.casillas[36].tema.dinero).toEqual(); //suerte
			expect(tablero.casillas[37].tema.dinero).toEqual(380); 
			expect(tablero.casillas[38].tema.dinero).toEqual(100); //impuestos
			expect(tablero.casillas[39].tema.dinero).toEqual(400); 
		});
        

	});
	describe("Al iniciar el juego",function(){	
        it("Coprobación existe dado, juego y usuario",function(){
			expect(dado).toBeDefined(); 
            expect(usuario).toBeDefined(); 
            expect(juego).toBeDefined(); 
		}); 
        
        it("Comprobar 100 veces el resultado del dado", function(){
            var result;
            for(var i=0;i<100;i++){
                result = dado.tirar();
                expect(result).toBeGreaterThan(0)
                expect(result).toBeLessThan(7)         
            }
        });
    
        it("Comprobar posicion ficha tras tirar usuario", function(){
             juego.iniciarTurno();
            usuario.ficha.posicion=0;
            usuario.tirarDadoTest(1);
            expect(usuario.ficha.posicion).toEqual(1); 
        });
        
        it("Comprobar nuevo usuario sin ficha", function(){
            var usuario2 = new modulo.Usuario("Pepe2",juego);
            juego.agregarUsuario(usuario);
            expect(usuario.ficha).toBeDefined(); 
        });
        
        it("Comprobar que la cuando vaya a la casilla 40 sea la 0", function(){
             juego.iniciarTurno();
            usuario.ficha.posicion=39;
            usuario.tirarDadoTest(1);
            expect(usuario.ficha.posicion).toEqual(0);
        });
    
    });
	
	describe("Comprobar Construccion",function(){	      
      it("Comprar Casilla",function(){
         juego.siguienteEstado();
          usuario.ficha.posicion=1;
          usuario.comprar();        
            expect(usuario.ficha.numPropiedades).toEqual(1);
       });
    it("Comprar Casilla, que no se puede comprar", function(){
        juego.siguienteEstado();
            usuario.ficha.posicion=2;
            usuario.ficha.propiedades=0;
            usuario.comprar();
            expect(usuario.ficha.propiedades).toEqual(0); 
        });
      it("Construir casa", function(){
          juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa1).toEqual(true);
        });   
      it("Construir casa 2", function(){
          juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();          
            usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa2).toEqual(true);
        });  
      it("Construir casa 3", function(){
          juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();          
            usuario.construir();        
            usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa3).toEqual(true);
        }); 
      it("Construir casa 4", function(){
          juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();          
            usuario.construir();        
            usuario.construir();       
            usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa4).toEqual(true);
        }); 
    
      it("Construir Hotel", function(){
        juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();          
            usuario.construir();        
            usuario.construir();       
            usuario.construir();      
            usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Hotel).toEqual(true);
        });
      it("Construir Hotel 2 --> no se puede", function(){
        juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();          
            usuario.construir();        
            usuario.construir();       
            usuario.construir();      
            usuario.construir();    
            usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Hotel).toEqual(true);
        }); 
      it("Vender casa", function(){
          juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa1).toEqual(true);
          usuario.venderCasa(1);
          expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Solar).toEqual(true);
        });
      it("Vender casa 2", function(){
          juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();
          usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa2).toEqual(true);
          usuario.venderCasa(1);
          expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa1).toEqual(true);
        });
      it("Vender casa 3", function(){
          juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();
          usuario.construir();
          usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa3).toEqual(true);
          usuario.venderCasa(1);
          expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa2).toEqual(true);
        });
      it("Vender casa 4", function(){
          juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();
          usuario.construir();
          usuario.construir();
          usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa4).toEqual(true);
          usuario.venderCasa(1);
          expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa3).toEqual(true);
        });
      it("Vender Hotel", function(){
          juego.siguienteEstado();
            usuario.ficha.posicion=1;
            usuario.comprar();
            usuario.construir();
          usuario.construir();
          usuario.construir();
          usuario.construir();
          usuario.construir();
           expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Hotel).toEqual(true);
          usuario.venderCasa(1);
          expect(juego.tablero.obtenerCasilla(1).tema.titulo.terreno instanceof modulo.Casa4).toEqual(true);
        }); 
      it("vender Carcel",function(){
        juego.siguienteEstado();
            usuario.ficha.posicion=10;
            usuario.comprar();
             usuario.venderCasa(10);
           expect(usuario.ficha.numPropiedades).toEqual(0);
      });
  });
  describe("Comprar Estacion",function(){
    it("Comprar Estacion de Goya",function(){         
        juego.siguienteEstado();
          usuario.ficha.posicion=5;
          usuario.comprar();          
		  expect(juego.tablero.obtenerCasilla(usuario.ficha.posicion).tema.nombre).toEqual("Estación de Goya"); 
            expect(usuario.ficha.numPropiedades).toEqual(1);
      });
        it("Comprar Estación de Delicias",function(){
            juego.siguienteEstado();
          usuario.ficha.posicion=15;
          usuario.comprar();          
		  expect(juego.tablero.obtenerCasilla(usuario.ficha.posicion).tema.nombre).toEqual("Estación de Delicias"); 
          expect(usuario.ficha.numPropiedades).toEqual(1);
       });
        it("Comprar Estación de Mediodía",function(){
            juego.siguienteEstado();
          usuario.ficha.posicion=25;
          usuario.comprar();          expect(juego.tablero.obtenerCasilla(usuario.ficha.posicion).tema.nombre).toEqual("Estación de Mediodía"); 
            expect(usuario.ficha.numPropiedades).toEqual(1);
       });
        it("Comprar Estación del Norte",function(){
            juego.siguienteEstado();
          usuario.ficha.posicion=35;
          usuario.comprar();          expect(juego.tablero.obtenerCasilla(usuario.ficha.posicion).tema.nombre).toEqual("Estación del Norte"); 
            expect(usuario.ficha.numPropiedades).toEqual(1);
       });        
        
    });
	
	describe("Comprobar Alquiler e Impuestos",function(){
         
         it("Alquiler Estaciones",function(){
          
         var usuario2 = new modulo.Usuario("Pepa",juego);
             juego.agregarUsuario(usuario2);
             
             juego.siguienteEstado();
             usuario.ficha.posicion=5;
             usuario.comprar();
             usuario.ficha.posicion=15;
             usuario.comprar();
             usuario2.ficha.darTurno();
             usuario2.tirarDadoTest(5);
         expect(usuario.ficha.numPropiedades).toEqual(2);
         expect(usuario.ficha.saldo).toEqual(150000);
         expect(usuario2.ficha.saldo).toEqual(149600);
             
       });          
         
         it("Alquiler Calle",function(){
             
          
        
         var usuario2 = new modulo.Usuario("Pepa",juego);
             juego.agregarUsuario(usuario2);
             juego.siguienteEstado();
             
             usuario.ficha.posicion=1;
          usuario.comprar();
             expect(usuario.ficha.saldo).toEqual(149940);
             
             usuario2.ficha.darTurno();
             usuario2.tirarDadoTest(1);
             
         expect(usuario.ficha.numPropiedades).toEqual(1);
         expect(usuario.ficha.saldo).toEqual(150000);
         expect(usuario2.ficha.saldo).toEqual(149940);
             
       });
         
         it("Impuesto",function(){
             juego.iniciarTurno();
          usuario.tirarDadoTest(4);
          expect(usuario.ficha.saldo).toEqual(149800);             
       });
         
     });
	 
	 describe("Turnos",function(){
    it("Iniciar Partida sin turnos",function(){  
        expect(usuario.ficha.turno instanceof modulo.Turno).toEqual(false);        
       });
    it("Iniciar Partida con turnos",function(){  
        juego.iniciarTurno();
        expect(usuario.ficha.turno instanceof modulo.Turno).toEqual(true);        
       });
    });
	
	describe("Fases",function(){
        it("Inicial - Turnos ususarios",function(){  
            expect(usuario.ficha.turno instanceof modulo.Turno).toEqual(false);    
        }); 
    
        it("Inicial - Cambio a modo juego",function(){  
            juego.siguienteEstado(); 
            expect(juego.estado instanceof modulo.EstadoJuego ).toEqual(true);   
        }); 
    
        it("Jugar - Alta Usuarios--> no se agregan mas usuarios",function(){  
            juego.siguienteEstado(); 
            var usuario2 = new modulo.Usuario("Pepa",juego);
             juego.agregarUsuario(usuario2);
            
            expect(juego.numUsuarios).toEqual(2);   
        });     
    });
	
	describe("Fin del juego",function(){
        it("usuario supera el limite",function(){
             juego.siguienteEstado();
             usuario.ficha.saldo = 3000000;
            usuario.tirarDadoTest(1);
             expect(juego.estado instanceof modulo.EstadoFin).toEqual(true);              
         });
        
        it("solo queda un usuario",function(){
             juego.siguienteEstado();
            juego.eliminarUsuario(usuario);
             expect(juego.estado instanceof modulo.EstadoFin).toEqual(true);              
         });
    });
	describe("Tirada",function(){
        /*it("3 Dobles a la carcel",function(){  
                juego.siguienteEstado(); 
                usuario.tirarDadoTestDobles();       
                usuario.tirarDadoTestDobles();
                usuario.tirarDadoTestDobles();       

                expect(juego.tablero.obtenerCasilla(usuario.ficha.posicion).tema.nombre).toEqual("Carcel");   
            }); */ 
         it("Pasa por salida",function(){
             juego.siguienteEstado();
             usuario.ficha.posicion = 39;
             usuario.tirarDadoTest(4);
             expect(usuario.ficha.saldo).toEqual(150200);  
         });  
        it("Eliminar usuario",function(){
             juego.siguienteEstado();
             usuario.ficha.saldo = -1;
             expect(juego.usuarios.length).toEqual(2); 
             usuario.tirarDadoTest(1);
             expect(juego.usuarios.length).toEqual(1);  
         });
    });
	 describe("Tarjetas",function(){
        it("Tarjeta Multa",function(){
             usuario.iniciarJuego();
             usuario.ficha.posicion = 7;
            //TemaSuerte
            juego.tablero.obtenerCasilla(7).tema.caerCasillaTest(usuario.ficha,0);
             expect(usuario.ficha.saldo).toEqual(149850);              
         });
        it("Tarjeta Premio",function(){
             usuario.iniciarJuego();
             usuario.ficha.posicion = 7;
            //TemaSuerte
            juego.tablero.obtenerCasilla(7).tema.caerCasillaTest(usuario.ficha,1);
             expect(usuario.ficha.saldo).toEqual(150150);              
         });
        it("Tarjeta Avanzar",function(){
             usuario.iniciarJuego();
             usuario.ficha.posicion = 7;
            //TemaSuerte
            juego.tablero.obtenerCasilla(7).tema.caerCasillaTest(usuario.ficha,2);
             expect(usuario.ficha.posicion).toEqual(10);              
         });
        it("Tarjeta Retroceder",function(){
             usuario.iniciarJuego();
             usuario.ficha.posicion = 7;
            //TemaSuerte
            juego.tablero.obtenerCasilla(7).tema.caerCasillaTest(usuario.ficha,3);
             expect(usuario.ficha.posicion).toEqual(4);              
         });
        it("Tarjeta Carcel",function(){
             usuario.iniciarJuego();
             usuario.ficha.posicion = 7;
            //TemaSuerte
            juego.tablero.obtenerCasilla(7).tema.caerCasillaTest(usuario.ficha,4);
             expect(usuario.ficha.posicion).toEqual(10);              
         });
        it("Tarjeta Salir de la Carcel",function(){
             usuario.iniciarJuego();
             usuario.ficha.posicion = 7;
            //TemaSuerte
            juego.tablero.obtenerCasilla(7).tema.caerCasillaTest(usuario.ficha,5);
             expect(usuario.ficha.numTarjetas).toEqual(1);              
         });
         
    });
	describe("Salir de la Carcel",function(){
            it("3 Dobles ",function(){  
                usuario.iniciarJuego();
                usuario.tirarDadoTest(30);
                usuario_.tirarDadoTest(10);
                
                usuario.tirarDadoTestDobles();       
                usuario.tirarDadoTestDobles();
                usuario.tirarDadoTestDobles();       

                expect(usuario.ficha.posicion != 10).toEqual(true); 
                });
            
            it("Fianza ",function(){  
                usuario.iniciarJuego();
                usuario.tirarDadoTest(10);
                usuario.pagarFianzaCarcel();
                usuario_.tirarDadoTest(10);
                          
                usuario.tirarDadoTest(2);

                expect(usuario.ficha.posicion != 10).toEqual(true); 
                });
            
            it("Sin Tarjeta ",function(){  
                usuario.iniciarJuego();
                usuario.tirarDadoTest(30);
                usuario.usarTarjetaCarcel();
                usuario_.tirarDadoTest(10);
                          
                usuario.tirarDadoTest(2);

                expect(usuario.ficha.posicion != 10).toEqual(false); 
                });
            it("Con Tarjeta ",function(){  
                usuario.iniciarJuego();
                usuario.ficha.agregarTarjeta(new modulo.TarjetaLibreCarcel() );
                usuario.tirarDadoTest(10);
                usuario.usarTarjetaCarcel();
                usuario_.tirarDadoTest(10);
                          
                usuario.tirarDadoTest(2);

                expect(usuario.ficha.posicion != 10).toEqual(true); 
                });
        });
    describe("Usuario",function(){
        it("uid ",function(){  
            var usuario_test = juego.getUser(usuario.uid);
            expect(usuario_test.uid).toEqual(usuario.uid); 
        });
    });
    describe("Hipoteca",function(){
        it("hipotecar ",function(){  
            usuario.iniciarJuego();
            usuario.tirarDadoTest(9);
            usuario.comprar();
            usuario.hipotecar(9);
            expect(usuario.juego.tablero.obtenerCasilla(9).estadoCasilla instanceof modulo.EstadoHipotecaCasilla).toEqual(true);
        });
        it("hipotecar desde otra casilla",function(){  
            usuario.iniciarJuego();
            usuario.tirarDadoTest(9);
            usuario.comprar();
            usuario_.tirarDadoTest(9);            
            usuario.tirarDadoTest(5);
            usuario.hipotecar(9);
            expect(usuario.juego.tablero.obtenerCasilla(9).estadoCasilla instanceof modulo.EstadoHipotecaCasilla).toEqual(true);
        });
        it("hipotecar casilla no tuya ",function(){  
            usuario.iniciarJuego();
            usuario.tirarDadoTest(9);
            usuario.comprar();

            usuario_.tirarDadoTest(9);
            usuario_.hipotecar(9);
            expect(usuario.juego.tablero.obtenerCasilla(9).estadoCasilla instanceof modulo.EstadoNormalCasilla).toEqual(true);
        });
        it("comprobarPropiedad ",function(){  
            usuario.iniciarJuego();
            usuario.tirarDadoTest(9);
            usuario.comprar();
            expect(usuario.ficha.comprobarPropiedad(8)).toEqual(false);
            expect(usuario.ficha.comprobarPropiedad(9)).toEqual(true);
        });
    });
    describe("Subasta",function(){
        it("Subasta ",function(){  
            usuario.iniciarJuego();
            usuario.tirarDadoTest(9);
            usuario.comprar();
            usuario.subastar(9);
            //usuario.hipotecar(9);
            expect(usuario.juego.estado instanceof modulo.EstadoSubasta).toEqual(true);
        });
        it("Pujar",function(){  
            usuario.iniciarJuego();
            usuario.tirarDadoTest(9);
            usuario.comprar();
            usuario.subastar(9);
            usuario_.tirarDadoTest(9);
            usuario_.pujar(100);
            expect(usuario.juego.estado.cantidad ).toEqual(100);
            expect(usuario.juego.estado.usuario ).toEqual(usuario_);
        });
        it("Terminar Subasta",function(){  
            usuario.iniciarJuego();
            usuario.tirarDadoTest(9);
            usuario.comprar();
            expect(usuario.ficha.numPropiedades).toEqual(1);
            usuario.subastar(9);
            usuario_.tirarDadoTest(9);            
            expect(usuario_.ficha.numPropiedades).toEqual(0);
            usuario_.pujar(100);
            usuario.terminarSubasta();
            expect(usuario.ficha.numPropiedades).toEqual(0);
            expect(usuario_.ficha.numPropiedades).toEqual(1);
            expect(usuario.juego.estado instanceof modulo.EstadoJuego).toEqual(true);
        });
    });
})