// Halloween (c) 2022 Baltasar MIT License <baltasarq@gmail.com>
/*
    generado por FI.JS@txtMap, v0.1/ v0.6 20140612
    Thu Oct  6 13:39:13 2022

*/


// *** Locs ------------------------------------------------------------
// locVacantLot --------------------------------------------------------
const locVacantLot = ctrl.places.creaLoc(
    "Descampado",
    [ "descampado" ],
    "^{Hace mucho tiempo que habían prometido un centro comercial aquí... \
     pero solo está la ${gasolinera, ex gasolinera} de siempre. }\
     Más allá de las luces de las ${farolas, ex farolas} \
     tras la misma ${gasolinera, ex gasolinera}, \
     sabes que se extiende el resto de la ciudad, \
     aunque desde aquí no puedas verla. \
     <br/>Puedes volver al ${final de tu calle, este}."
);

locVacantLot.ini = function() {
    this.pic = "res/pump_station.jpg";
};

locVacantLot.preExamine = function() {
    if ( !ctrl.places.limbo.has( npcPumpStationDog ) ) {
        npcPumpStationDog.moveTo( this );
    }
};

const objStreetLamps = ctrl.creaObj(
    "farolas",
    [ "farolas" ],
    "Tenues halos de luz que apenas horadan la oscuridad más allá.",
    locVacantLot,
    Ent.Scenery
);

objStreetLamps.ini = function() {
    this.preOpen = function() {
        return "Tendrías que escalar hasta el soporte, abrirlo... ¿para qué?";
    };

    this.preStart = function() {
        return "Ya están encendidas.";
    };

    this.preWear = function() {
        return "¿Vestirme con una farola? ¿Cómo?";
    };

    this.prePush = function() {
        return "No consigues desplazarla.";
    };

    this.preAttack = function() {
        return "Las farolas no me ha hecho nada. Es ese 'otro'...";
    };
};


const objPumpStation = ctrl.creaObj(
    "gasolinera",
    [ "gasolinera" ],
    "La gasolinera resplandece en medio de la oscuridad debido \
     a las luces de neón de su alta marquesina. \
     Está aparentemente cerrada, si bien hay \
     ${una ventanilla, ex ventanilla} desde la que \
     es posible comprar combustible o comestibles varios. \
     ${Rodeándolo, norte}, se accede a la parte trasera \
     del edificio. Un ${perro, ex perro} pasea todo a lo largo \
     de las entradas de la trasera, sujeto por una cadena.",
    locVacantLot,
    Ent.Scenery
);

objPumpStation.ini = function() {
    this.preOpen = function() {
        return "Está cerrada a cal y canto, el ${vendedor, ex vendedor} \
                está detrás de ${una ventanilla, ex ventanilla}.";
    };

    this.preStart = function() {
        return "Ya tiene las luces encendidas a pleno rendimiento.";
    };

    this.prePush = function() {
        return "El sentido común te dice que no la moverías.";
    };

    this.preAttack = function() {
        return "La gasolinera no me ha hecho nada. Es ese 'otro'...";
    };
};

objPumpStation.preExamine = function() {
    const toret = this.desc;
    
    if ( this.getTimesExamined() == 0 ) {
        locVacantLot.desc += " El edificio puede ${rodearse, n} hasta la parte trasera.";
        ctrl.places.doDesc();
    }    
    
    return toret;
};

objSellerPost = ctrl.creaObj(
    "ventanilla",
    [ "puesto", "cristal", "vidrio" ],
    "Se trata de un puesto acristalado con una especie de bandeja \
     en la parte inferior. La bandeja puede desplazarse hacia dentro \
     y fuera del puesto. Un pequeño cartel por dentro \
     del vidrio pone: 'Deje el dinero o la tarjeta en esta bandeja.' \
     Hay un ${vendedor, ex vendedor} tras ella \
     con cara tan somnolienta como de pocos amigos.",
     locVacantLot,
     Ent.Scenery
);

objSellerPost.ini = function() {
    this.preOpen = function() {
        return "Está pensada para no poderse abrir, precisamente.";
    };

    this.preStart = function() {
        return "¿Uh?";
    };

    this.preWear = function() {
        return "¿Qué?";
    };

    this.prePush = function() {
        return "Para asombro del ${vendedor, ex vendedor}, intentas \
                empujar el ${cristal, ex ventanilla}, \
                sin ningún tipo de resultado, claro.";
    };

    this.preAttack = function() {
        return "La ventanilla no me ha hecho nada. Es ese 'otro'...";
    };
};

objSellerPost.preExamine = function() {
    let toret = this.desc;
    
    if ( ctrl.places.limbo.has( npcPumpStationSeller ) ) {
        npcPumpStationSeller.moveTo( this.owner );
        ctrl.places.doDesc();
    }
    
    return toret;
};

const objStone = ctrl.creaObj(
    "piedra",
    [],
    "Es más grande que tu mano, y se nota dura y compacta, \
     no como las que se deshacen en pequeños fragmentos.",
    locVacantLot,
    Ent.Portable
);

objStone.ini = function() {
    this.preOpen = function() {
        return "Es una piedra, ¡no un huevo kinder!";
    };

    this.preStart = function() {
        return "No es inflamable.";
    };

    this.preWear = function() {
        return "¿Qué?";
    };

    this.prePush = function() {
        return "No conseguirías nada.";
    };

    this.preAttack = function() {
        return "Seguramente servirá mejor para golpear algo CON ella.";
    };
};

objStone.preTake = function() {
    let toret = "";
    
    if ( this.owner == npcPumpStationDog.owner ) {
        parser.parse( "habla con perro" );
        toret = "No deja que te acerques...";
    } else {
        toret = takeAction.exe( parser.sentence );
    }
    
    return toret;
};

const objSoda = ctrl.creaObj(
    "refresco",
    [ "botella" ],
    "Una conocida bebida gasesosa cuyos componentes no se conocen \
     en detalle.",
    ctrl.places.limbo,
    Ent.Portable
);

objSoda.ini = function() {
    this.preDrop = function() {
        return "Nah. Seguro que sabe muy bien.";
    };

    this.preOpen = function() {
        return "Bebes un tanto. Sabe bien, aunque está fría, claro.";
    };

    this.preStart = function() {
        return "No es inflamable.";
    };

    this.preWear = function() {
        return "¿Qué?";
    };

    this.prePush = function() {
        return "Sacudes la botella, pero ahora la dejas reposar, \
                ya sabes por qué.";
    };

    this.preAttack = function() {
        return "La botella de refresco es en realidad inofensiva.";
    };
};

const objHam = ctrl.creaObj(
    "fiambre",
    [ "jamon" ],
    "Varias lonchas de jamón cocido en un plástico.",
    ctrl.places.limbo,
    Ent.Portable
);

objHam.ini = function() {
    this.preOpen = function() {
        return "Abres un borde del paquete de plástico. Huele bien.";
    };

    this.preStart = function() {
        return "No, no es inflamable.";
    };

    this.preWear = function() {
        return "¿Qué?";
    };

    this.prePush = function() {
        return "Sacudes el fiambre (?).";
    };

    this.preAttack = function() {
        return "El jamón es en realidad inofensivo.";
    };
};

objHam.preDrop = function() {
    ctrl.print( "Abres completamente el paquete plástico \
                 y dejas caer el contenido..." );
    ctrl.print( "¡El perro acude corriendo para comerse el jamón! \
                 Lo coge en la boca y desaparece en algún sitio \
                 que desconoces. ¡Ha desaparecido!" );

    npcPumpStationDog.moveTo( ctrl.places.limbo );
    this.moveTo( ctrl.places.limbo );
    return "Ahora el terreno está despejado.";
};


// locBehindPump -------------------------------------------------------
const locBehindPump = ctrl.places.creaLoc(
    "Trasera",
    [ "gasolinera" ],
    "^{Aún a pesar de las luces de las ${farolas, ex farolas}, \
       la sombra de la parte trasera resulta ominosa. } \
       Las ${entradas del almacén, ex persianas} de la gasolinera \
       son de tipo persiana, con una pequeña \
       ${puerta de acceso, ex puerta} a su lado. Un ${coche, ex coche} \
       aparentemente abandonado está aparcado contra una esquina. \
       Solo puedes volver al ${frente del edificio, sur}."
);

locBehindPump.ini = function() {
    this.pic = "res/behind-pump_station.jpg";
    this.setExitBi( "sur", locVacantLot );
    this.objs.push( objStreetLamps );
};

locBehindPump.preExamine = function() {
    if ( !ctrl.places.limbo.has( npcPumpStationDog ) ) {
        npcPumpStationDog.moveTo( this );
    }
};

const locGates = ctrl.creaObj(
    "persianas",
    [ "compuertas", "portones" ],
    "Están bloqueadas desde el interior, no parece posible forzarlas.",
    locBehindPump,
    Ent.Scenery
);

locGates.ini = function() {
    this.prePush =
    this.preOpen = function() {
        return "Intentas empujar las puertas hacia arriba, pero... \
                ¡No hay manera!";
    };

    this.preStart = function() {
        return "No hay forma de activarlas desde aquí fuera.";
    };

    this.preWear = function() {
        return "¿Cómo?";
    };

    this.preAttack = function() {
        return "Le das una buena patada a la puerta. No pasa nada. \
                No obtienes nada útil, pero te has quedado tranquilo.";
    };
};

const objDoor = ctrl.creaObj(
    "puerta",
    [ "acceso" ],
    "La puerta tiene una ${cerradura, ex cerradura} en su parte media.",
    locBehindPump,
    Ent.Scenery
);

objDoor.ini = function() {
    this.prePush =
    this.preOpen = function() {
        return "Intentas empujar la puerta para que ceda hacia dentro, \
                Pero es demasiado fuerte.";
    };

    this.preStart = function() {
        return "No es automática.";
    };

    this.preWear = function() {
        return "¿Eh?";
    };

    this.preAttack = function() {
        return "Le das una buena patada a la puerta. ¡Qué gustazo!";
    };
};

const objLock = ctrl.creaObj(
    "cerradura",
    [],
    "La cerradura parece fuerte...",
    locBehindPump,
    Ent.Scenery
);

objLock.ini = function() {
    this.preOpen = function() {
        return "No hay forma de forzarla.";
    };

    this.prePush = function() {
        return "Así no conseguirás nada.";
    };

    this.preStart = function() {
        return "No, hace falta la llave.";
    };

    this.preWear = function() {
        return "¿Ah...?";
    };

    this.preAttack = function() {
        return "Le das una buena patada a la cerradura. No pasa nada.";
    };
};

const objLever = ctrl.creaObj(
    "palanca",
    [],
    "De esas para cambiar las ruedas.",
    ctrl.places.limbo,
    Ent.Portable
);

objLever.ini = function() {
    this.preWear =
    this.prePush =
    this.preOpen = function() {
        return "No tiene sentido.";
    };

    this.preStart = function() {
        return "No tiene ningún mecanismo a pilas ni nada así...";
    };

    this.preAttack = function() {
        return "Buscas algo dura y lo golpeas con la palanca. No ha pasado nada.";
    };
};

const objAbandonedCar = ctrl.creaObj(
    "coche",
    [ "vehículo", "polvo", "ruedas" ],
    "Parece abandonado. Dos de las ruedas están pinchadas, \
     y las otras, muy bajas. Pero lo que realmente produce \
     esa triste sensación de dejadez es una gruesa capa de polvo.",
    locBehindPump,
    Ent.Scenery
);

objAbandonedCar.ini = function() {
    this.setOpen();

    this.prePush = function() {
        return "Tal y como tiene las ruedas, sería inútil.";
    };
    
    this.preStart = function() {
        return "No creo que vuelva a encender.";
    };

    this.preWear = function() {
        return "Eh... no.";
    };

    this.preAttack = function() {
        return "Le das una buena patada al pobre coche. Así aprenderá.";
    };
};

objAbandonedCar.preOpen = function() {
    let toret = "Mientras te acercas al coche, puedes observar \
                 que no tiene ningún pestillo bloqueado.";
                 
    if ( npcPumpStationDog.owner == this.owner ) {
        toret += " Pero entonces escuchas un gruñido, y te das cuenta \
                 de que el perro está corriendo para interponerse \
                 entre el coche y tú. Mejor no enfadarlo... ";
        toret += parser.parse( "hablar perro" );
    } else {
        if ( ctrl.places.limbo.has( objLever ) ) {
            objLever.moveTo( this.owner );
            toret = "Avanzas con cautela, pero... \
                     ¡el perro no está por aquí! <br/> \
                     Abres varias puertas del coche pero no encuentras \
                     nada de interés más que unos pocos pañuelos (ejem) \
                     que prefieres no tocar. En el maletero, sin embargo, \
                     encuentras una ${palanca, coge palanca}.";
         } else {
             toret = "Más confiado, revisas de nuevo el coche. \
                      Definitivamente, no hay nada más que recoger \
                      en él. Quitando los pañuelos, claro.";
         }
    }
    
    return toret;
};


// locAlley ------------------------------------------------------------
const locAlley = ctrl.places.creaLoc(
    "Callejón",
    [ "calleja" ],
    "^{Esta calle parece un oscuro túnel que curiosamente desemboca \
     en un comercio. }\
     Tras el pequeño paso, una tienda de disfraces muestra \
     su género en su iluminado ${escaparate, ex escaparate}. \
     Puedes ${volver, sur} a la calle principal."
);

locAlley.ini = function() {
    this.pic = "res/customes_shop.jpg";
};

const objShopWindow = ctrl.creaObj(
    "escaparate",
    [ "cristal", "luna" ],
    "Multitud de disfraces y complementos se acumulan \
     en un abarrotado muestrario, tras una enorme luna.",
    locAlley,
    Ent.Scenery
);

objShopWindow.ini = function() {
    this.broken = false;
    this.prePush =
    this.preOpen = function() {
        return "No hay cerradura ni puerta alguna.";
    };

    this.preStart = function() {
        return "Las luces del escaparate \
                no pueden endenderse desde aquí fuera.";
    };

    this.preWear = function() {
        return "¿Cómo?";
    };
};

objShopWindow.preExamine = function() {
    let toret = this.desc;

    if ( this.broken ) {
        toret += " El escaparate está roto y se puede ${pasar, n} \
                  a través de él.";
    }

    return toret;
};

objShopWindow.preAttack = function() {
    const player = ctrl.personas.getPlayer();
    let toret = "¡Ya está roto!";

    if ( !this.broken ) {
        toret = "Le pegas una patada, con ganas. ¡Pero aguanta!";

        if ( ctrl.isPresent( objStone )
          || ctrl.isPresent( objLever ) )
        {
            let tool = null;
            this.broken = true;
            
            if ( ctrl.isPresent( objStone ) ) {
                tool = objStone;
            }
            else
            if ( ctrl.isPresent( objLever ) ) {
                tool = objLever;
            }
            
            toret = "Utilizando la " + tool.id + " y todas tus fuerzas... \
                     ¡golpeas el cristal del escaparate, una vez \
                     y otra, hasta que consigues abrir una brecha \
                     en el cristal laminado! Concentrado en lo que haces, \
                     la " + tool.id + " ha salido disparada de tu mano \
                     hacia el interior. \
                     Ahora hasta se puede ${pasar, n} a la tienda.</p>\
                     <p>Te das la vuelta para \
                     comprobar que, entre tanta algarabía, \
                     nadie parece haber visto nada.";
                     
            tool.moveTo( locCostumesShop );
        }
    }

    return toret;
};


// locCostumesShop -----------------------------------------------------
const locCostumesShop = ctrl.places.creaLoc(
    "tienda",
    [ "comercio" ],
    "^{Diferentes complementos de disfraz: ropas, antifaces...etc. \
     abarrotan este comercio. La escasa luz que se cuela desde la calle \
     te permiten ver en semioscuridad. } Al fondo hay varios \
     ${disfraces, ex disfraces}, mientras diferentes expositores \
     muestran multitud de ${complementos, ex complementos}. \
     Trozos de ${escaparate, ex cristales} se esparcen por el suelo."
);

locCostumesShop.ini = function() {
    this.pic = "res/inside-shop.jpg";
    this.setExitBi( "sur", locAlley );
};

const objShards = ctrl.creaObj(
    "cristales",
    [ "cristal", "escaparate", "trozos", "trozo" ],
    "El escaparate tiene un gran agujero por el que \
     se puede ${salir, sur}.",
    locCostumesShop,
    Ent.Scenery
);

const objJasonCostume = ctrl.creaObj(
    "disfraz",
    [ "json" ],
    "Disfraz del asesino de Viernes 13.",
    ctrl.places.limbo,
    Ent.Portable
);

objJasonCostume.ini = function() {
    this.setClothing();
    this.prePush =
    this.preAttack =
    this.preStart =
    this.preOpen = function() {
        return "No tiene ningún sentido hacer eso con el disfraz.";
    };
};

const objAccessories = ctrl.creaObj(
    "accesorios",
    [ "antifaz", "antifaces", "mascara",
      "mascaras", "complementos", "complemento", "accesorio" ],
    "Antifaces y máscaras de todo tipo, además de otros numerosos \
     accesorios.",
    locCostumesShop,
    Ent.Scenery
);

const objCostumes = ctrl.creaObj(
    "disfraces",
    [ "disfraces" ],
    "Multitud de disfraces se acumulan en perchas.",
    locCostumesShop,
    Ent.Scenery
);

objCostumes.ini = function() {
    this.prePush =
    this.preStart =
    this.preAttack =
    this.preTake =
    this.preOpen = function() {
        return "Deja los disfraces tranquilos.";
    };

    this.preWear = function() {
        return "¿Cómo? ¡Son demasiados!";
    };
};

objCostumes.preExamine = function() {
    const player = ctrl.personas.getPlayer();
    let toret = "No ves ningún disfraz más que te llame la atención.";
    
    if ( ctrl.places.limbo.has( objJasonCostume) ) {
        objJasonCostume.moveTo( player );
        toret = "De entre todos ellos, escoges el disfraz que \
                 crees que es el más adecuado: el de Jason, \
                 el asesino de Viernes 13.";
    }

    return toret;
};


// locStreet -----------------------------------------------------------
const locStreet = ctrl.places.creaLoc(
    "Calle",
    [ "via" ],
    "^{La gente pasea animada por la calle, llevando sus disfraces, \
     ocultos tras sus tapaderas. \
     Todo son aparentemente risas y diversión. }\
     Discurre desde un descampado ${calle arriba, oeste}, \
     a una plaza ${calle abajo, este}. \
     Los ${adultos, ex adultos} escoltan a los ${niños, ex ninos}, \
     mientras el rebaño se mueve entre ${las casas, ex casas}.\
     <br/>Puedes ver la ${puerta, sur} \
     de tu ${apartamento, ex apartamento}."
);

locStreet.ini = function() {
    this.pic = "res/street.jpg";
    this.setExitBi( "norte", locAlley );
    this.setExitBi( "oeste", locVacantLot );
};

const objApartment = ctrl.creaObj(
    "apartamento",
    [ "casa", "hogar" ],
    "Sí, tu apartamento, \
     dentro de la única casa de una sola planta en esta calle.",
    locStreet,
    Ent.Scenery
);

objApartment.ini = function() {
    this.prePush = function() {
        return "Aún a riesgo de parecer estúpido, te apoyas en la fachada \
                y comienzas a empujar. No sucede nada, como era previsible.";
    };
    
    this.preStart = function() {
        return "Es que no está encendido o apagado...";
    };
    
    this.preOpen = function() {
        return parser.parse( "n" );
    };

    this.preWear = function() {
        return "¿Cómo?";
    };
};

const objHouses = ctrl.creaObj(
    "fachadas",
    [ "casas", "casa", "callejon" ],
    "Las fachadas escoltan ambos lados de la calle.",
    locStreet,
    Ent.Scenery
);

objHouses.preExamine = function() {
    const loc = this.owner;
    let toret = this.desc;

    if ( this.getTimesExamined() == 0 ) {
        loc.setExitBi( "norte", locAlley );
        loc.desc += " También un ${callejón, n} enfrente de tu apartamento.";
        ctrl.places.doDesc();
        toret += " Un claro entre los ${peatones, ex adultos} te permite \
                  ver el ${callejón, n} \
                  en la zona de fachadas frente a tu \
                  ${apartamento, ex apartamento}. \
                  Al pasar desapercibido por la cantidad \
                  de ${gente, ex adultos} a tu alrededor, \
                  habías olvidado su existencia.";
    }

    return toret;
};


// locApartment --------------------------------------------------------
const locApartment = ctrl.places.creaLoc(
    "Estudio",
    [ "estudio" ],
    "^{Casas que resultan frías y grises, \
     líneas modernas que parecen expulsar el alma \
     de cualquier habitación. } \
     Tu estudio no es una excepción en la actual corriente modernista: \
     un ${sofá, ex sofa}, una ${mesa, ex mesa}, una ${cocina, ex cocina}, \
     un ${armario, ex armario} y ${una cama, ex cama} es todo lo que te rodea. \
     Puedes ${salir a la calle, norte}."
);

locApartment.ini = function() {
    this.pic = "res/apartment.jpg";
    this.setExitBi( "norte", locStreet );
};

locApartment.postExamine = function() {
    if ( this.getTimesExamined() == 1 ) {
        ctrl.print( "Hablas contigo mismo, como en trance." );
        ctrl.personas.getPlayer().say( "Necesito un arma." );
    }
    
    return;
};

const objPants = ctrl.creaObj(
    "pantalones",
    [ "pantalon" ],
    "Tus otros pantalones.",
    ctrl.places.limbo,
    Ent.Portable
);

objPants.preTake = function() {
    let toret = "Coges los pantalones, hechos un gurruño.";
    
    if ( ctrl.places.limbo.has( objCard ) ) {
        objCard.moveTo( this.owner );
        ctrl.places.doDesc();
        toret = "De alguno de sus bolsillos cae ${una tarjeta, coge tarjeta}.";
    }
    
    objPants.moveTo( ctrl.personas.getPlayer() );
    return toret;  
};

const objCupboard = ctrl.creaObj(
    "armario",
    [ "armario" ],
    "^{Se trata de un armario empotrado. } Puede ${abrirse, abre armario}.",
    locApartment,
    Ent.Scenery
);

objCupboard.ini = function() {
    this.preStart = function() {
        return "A veces te dan ganas, sí.";
    };

    this.preWear = function() {
        return "Mmmm... no es buena idea.";
    };

    this.prePush = function() {
        return "Lo empujas hacia el centro de la habitación... \
                Debajo solo había polvo... Lo vuelves a poner en el \
                sitio, no sin esfuerzo.";
    };

    this.preAttack = function() {
        return "Sí que es feo, y a veces te dan ganas de... donarlo.";
    };
}

objCupboard.preOpen = function() {
    let toret = "El armario no tiene nada más de interés.";
    
    if ( ctrl.places.limbo.has( objPants ) ) {
        objPants.moveTo( this.owner );
        ctrl.places.doDesc();
        toret = "En su interior hay ${un pantalon, coge pantalon}.";
    }
    
    return toret;
};

const objCard = ctrl.creaObj(
    "tarjeta",
    [ "debito", "tarjeta", "bancaria" ],
    "Pues sí, una tarjeta del banco. Ahora ya ni traen numeración.",
    ctrl.places.limbo,
    Ent.Portable
);

objCard.ini = function() {
    this.preOpen = function() {
        return "Sería complicado.";
    };

    this.preStart = function() {
        return "¿Indignado con el sistema?";
    };

    this.preWear = function() {
        return "Mejor con la ropa que con la tarjeta.";
    };

    this.prePush = function() {
        return "¿Hacia adónde? Te sentirías un tanto ridículo, además.";
    };

    this.preAttack = function() {
        return "La tarjeta no me ha hecho nada. Es ese 'otro'...";
    };
};

objCard.preDrop = function() {
    const loc = ctrl.places.getCurrentLoc();
    const seller = npcPumpStationSeller;
    const player = ctrl.personas.getPlayer();
    let toret = "Dejado.";

    if ( loc == locVacantLot ) {
        if ( ctrl.places.limbo.has( objHam ) ) {
            seller.status += 1;
            ctrl.print( "Entregas la tarjeta al vendedor." );
            player.say( "Deme un refresco y fiambre, por favor." );
            seller.say( "De acuerdo, aquí tiene." );
            ctrl.print( "El vendedor pasa tu tarjeta y te la devuelve." );
            ctrl.print( "Coges los comestibles." );

            objHam.moveTo( player );
            objSoda.moveTo( player );
            toret = "";
        } else {
            toret = "No te parece que haya nada más interesante o apetecible.";
        }
    } else {
        toret = dropAction.exe( parser.sentence );
    }

    return toret;
};

const objBed = ctrl.creaObj(
    "cama",
    [ "cama" ],
    "Siempre hecha tras dormir. \
     En una casa así, no se puede ser desordenado.",
    locApartment,
    Ent.Scenery
);

objBed.ini = function() {
    this.preOpen = function() {
        return "Es de noche, pero no es el momento de dormir.";
    };

    this.preStart = function() {
        return "Plantarle fuego a la cama no ayudará en nada.";
    };

    this.preWear = function() {
        return "Intentas autoconvencerte para meterte en la cama, \
                pero por muchas vueltas que le des, no es el momento.";
    };

    this.prePush = function() {
        return "Ya está contra una de las paredes.";
    };

    this.preAttack = function() {
        return "Tu puño golpea el colchón, y como era de esperar, rebota.";
    };
};

const objKitchen = ctrl.creaObj(
    "cocina",
    [ "cocina" ],
    "^{Una de estas mini-cocinas con todo encastrado más un mesado encima. \
     Todos los electrodomésticos son pequeñas versiones de los normales. }\
     Se alinean una ${nevera, ex nevera}, un ${microondas, ex microondas} \
     y unos ${fogones, ex fogones}.",
    locApartment,
    Ent.Scenery
);

const objCook = ctrl.creaObj(
    "fogones",
    [ "fogones" ],
    "Siempre los limpias tras cocinar.",
    locApartment,
    Ent.Scenery
);

objCook.ini = function() {
    this.preOpen = function() {
        return "Abres la puerta del pequeño horno... no hay nada dentro.";
    };

    this.preStart = function() {
        return "No es el momento de cocinar.";
    };

    this.preWear = function() {
        return "¿Qué?";
    };

    this.prePush = function() {
        return "Ya están encastrados en la cocina.";
    };

    this.preAttack = function() {
        return "Te harías mucho daño.";
    };
};

const objTable = ctrl.creaObj(
    "mesa",
    [ "mesa" ],
    "Mesa de centro, cuyo ${tablero se levanta, abre mesa} \
     y puede hacer las veces de mesa de estudio.",
    locApartment,
    Ent.Scenery
);

objTable.ini = function() {
    this.preStart = function() {
        return "De eso nada... ¡es tu última adquisición!.";
    };

    this.preWear = function() {
        return "¿?";
    };

    this.prePush = function() {
        return "Empujada.";
    };

    this.preAttack = function() {
        return "No quieres estropearla... Ni tu mano, tampoco.";
    };
};

objTable.preOpen = function() {
    let toret = "Decides centrarte en la cuestión \
                 verdaderamente importante.";
                 
    if ( this.getTimesExamined() <= 1 ) {
        toret = "Por un momento, recuerdas con curiosidad \
                 cómo la mesa se abre al tirar del tablero. \
                 Pronto vuelves a colocarla en su posición \
                 habitual, y decides concentrarte en tu \
                 verdadero objetivo.";
    }
    
    if ( ctrl.places.limbo.has( objPen ) ) {
        objPen.moveTo( this.owner );
        objNote.moveTo( this.owner );
        ctrl.places.doDesc();
        
        toret += "</p><p>Hay una ${nota, ex nota} y un \
                  ${bolígrafo, ex boli} encima de ella.</p>";
    }
    
    return toret;
};

const objNote = ctrl.creaObj(
    "nota",
    [ "papel", "anotacion" ],
    "Una nota garbateada a mano por ti mismo: 'matar a Rodrigo.'",
    ctrl.places.limbo
);

objNote.preDrop = function() {
    return "¿E ir dejando notas acusatorias por ahi...? Mejor que no.";
};

objNote.ini = function() {
    this.preStart = function() {
        return "No parece buena idea. ¿Y si quemando la nota la casa \
                también se prende fuego?";
    };
    
    this.preOpen =
    this.prePush =
    this.preAttack = function() {
        return "No tendría ningun sentido.";
    };
};

const objPen = ctrl.creaObj(
    "boli",
    [ "boligrafo" ],
    "Pues sí, es un boli.",
    ctrl.places.limbo
);

objPen.preTake = function() {
    return "No te hace falta.";
};

objNote.ini = function() {
    this.preStart = function() {
        return "No es necesario encenderlo.";
    };
    
    this.preOpen =
    this.prePush =
    this.preAttack = function() {
        return "No tendría ningun sentido.";
    };
};

const objMicrowaveOven = ctrl.creaObj(
    "microondas",
    [ "microondas" ],
    "Minúsculo. ${La puerta, abre microondas} es ahumada.",
    locApartment,
    Ent.Scenery
);

objMicrowaveOven.ini = function() {
    this.preStart = function() {
        return "Lo pones durante unos segundos. Se apaga.";
    };

    this.preWear = function() {
        return "¿Cómo?";
    };

    this.prePush = function() {
        return "Ya está encaustrada.";
    };

    this.preAttack = function() {
        return "El microondas no me ha hecho nada. Es ese 'otro'...";
    };
};

objMicrowaveOven.preOpen = function() {
    const player = ctrl.personas.getPlayer();
    
    player.say( "¿Para qué?" );
    
    return "No hay ninguna necesidad.";
};

const objFridge = ctrl.creaObj(
    "nevera",
    [ "nevera" ],
    "Parece un mini-bar, pero se puede ${abrir, abre nevera}.",
    locApartment,
    Ent.Scenery
);

objFridge.ini = function() {
    this.preOpen = function() {
        return "Compruebas que tienes comida, como era de esperar.";
    };

    this.preStart = function() {
        return "Ya está encendida.";
    };

    this.preWear = function() {
        return "Errr... ¿cómo?";
    };

    this.prePush = function() {
        return "Está situada ya contra la pared.";
    };

    this.preAttack = function() {
        return "La nevera no me ha hecho nada. Es ese 'otro'...";
    };
};

const objSofa = ctrl.creaObj(
    "sofa",
    [ "sofa" ],
    "Un pequeño sofá de apenas dos plazas con asientos extensibles.",
    locApartment,
    Ent.Scenery
);

objSofa.ini = function() {
    this.preOpen = function() {
        return "No es un sofá-cama.";
    };

    this.preStart = function() {
        return "¿Cómo podría hacer tal cosa?";
    };

    this.preWear = function() {
        return "No puedes hacer eso.";
    };

    this.prePush = function() {
        return "Ya está contra una de las paredes.";
    };

    this.preAttack = function() {
        return "El sofá no me ha hecho nada. Es ese 'otro'...";
    };
};


// locTownSquare -------------------------------------------------------
const locTownSquare = ctrl.places.creaLoc(
    "Plaza",
    [ "plaza" ],
    "^{Se te antoja desnuda y fría. }${La gente, ex adultos} se mueve \
     cerca de sus extremos, donde se sitúan también \
     algunos ${negocios, ex negocios}. \
     Hay un ${fuente, ex fuente} en el centro, \
     semioculta en la oscuridad pese a \
     las ${farolas, ex farolas} y las ${luces colgantes, ex faroles}. \
     La calle hacia tu casa ${asciende desde aquí, oeste}."
);

locTownSquare.ini = function() {
    this.pic = "res/town_square.jpg";
    this.setExitBi( "oeste", locStreet );
    this.objs.push( objStreetLamps );
    this.personas.push( npcAdultos, npcNinos );
};

const objCafes = ctrl.creaObj(
    "cafes",
    [],
    "Hay sitios abiertos en los extremos de la plaza, \
     con animada afluencia de un variado elenco de \
     ${disfrazados personajes, ex personajes}.",
    locTownSquare,
    Ent.Scenery
);

objCafes.ini = function() {
    this.preStart =
    this.preOpen = function() {
        return "Ya están abiertos.";
    };

    this.preWear = function() {
        return "De verdad, de verdad, que no puedes hacer eso.";
    };

    this.prePush = function() {
        return "¿Y para qué?";
    };

    this.preAttack = function() {
        return "¿Vas a darle de patadas a los escaparates?";
    };
};

objCafes.preExamine = function() {
    let toret = this.desc;
    
    if ( ctrl.places.limbo.has( npcCharacters ) ) {
        npcCharacters.moveTo( this.owner );
        ctrl.places.doDesc();
    }
    
    return toret; 
};

const objFaroles = ctrl.creaObj(
    "luces",
    [ "faroles", "colgantes" ],
    "Cuelgan de cuerdas tendidas entre los árboles.",
    locTownSquare,
    Ent.Scenery
);

objFaroles.ini = function() {
    this.preOpen = function() {
        return "No funcionará.";
    };

    this.preStart = function() {
        return "Ya están encendidos.";
    };

    this.preWear = function() {
        return "Claro, uno debajo de cada axila...";
    };

    this.prePush = function() {
        return "Empujas uno de ellos. Se balancea.";
    };

    this.preAttack = function() {
        return "No tengo nada contra esto. Es ese 'otro'...";
    };
};

const objFountain = ctrl.creaObj(
    "fuente",
    [],
    "La fuente se sitúa en el centro. \
     Recuerdas que el agua no sabe demasiado bien.",
    locTownSquare,
    Ent.Scenery
);

objFountain.preDrink = function() {
    return "Pues sí, tal y como recordabas, no sabe demasiado bien.";
};

objFountain.ini = function() {
    this.preOpen = function() {
        return "El agua ya está brotando.";
    };

    this.preStart = this.preDrink;

    this.preWear = function() {
        return "No puedes hacer eso.";
    };

    this.prePush = function() {
        return "La fuente está fijada en el sitio. No, en serio.";
    };

    this.preAttack = function() {
        return "Le pegas una patada a la fuente. Duele.";
    };
};

const objBussines = ctrl.creaObj(
    "negocios",
    [ "negocios" ],
    "Excepto las ${cafeterías, ex cafes}, todos los negocios han cerrado ya.",
    locTownSquare,
    Ent.Scenery
);

objBussines.ini = function() {
    this.preStart =
    this.preOpen = function() {
        return "Sólo los ${cafes, ex cafes} están abiertos.";
    };

    this.preWear = function() {
        return "No puedes hacer eso.";
    };

    this.prePush = function() {
        return "Todos los negocios de la plaza están dentro de edificios, \
                no funcionaría.";
    };

    this.preAttack = function() {
        return "Le pegas una patada a una de las fachadas. Duele.";
    };
};


// Characters ----------------------------------------------------------
const npcCharacters = ctrl.personas.creaPersona(
    "personajes",
    [ "personaje", "disfrazado", "disfrazados" ],
    "A diferencia de los que circulan por las calles, \
     la gente aquí disfruta de refrescos o chocolate con churros \
     mientras otra hace fotos de disfraces muy elaborados. \
     <br/>...es ${él, ex Rodrigo}.",
    ctrl.places.limbo
);

npcCharacters.preTalk = function() {
    return "Sabes que sería inútil. Están todos pendientes \
            los unos de los otros, entregados a tan alegres como falsas, \
            y vacuas, conversaciones.";
};

npcCharacters.preExamine = function() {
    let toret = this.desc;
    
    if ( ctrl.places.limbo.has( npcMark ) ) {
        npcMark.moveTo( this.owner );
        ctrl.places.doDesc();
    }
    
    return toret;
};

const npcMark = ctrl.personas.creaPersona(
    "Rodrigo",
    [ "victima" ],
    "^{Es él. Ahí está. } Como le odias. ¿Cómo pudo suceder? \
     ¿Por qué te convertiste en su objetivo? \
     ¿Qué le habías hecho? ...da igual. \
     Esta noche acabará todo.",
    ctrl.places.limbo
);

npcMark.ini = function() {
    this.status = 0;
    
    this.prePush = function() {
        return  "Le das un empujón. Te mira incrédulo, pero no responde.";
    };
    
    this.preWear = function() {
        return "Por tu mente pasa la salvaje idea de despellejarlo y \
                hacerte una chaqueta con su piel.";
    };
    
    this.preStart = function() {
        return "No te faltan ganas de prenderle fuego, no.";
    };
    
    this.preOpen = function() {
        return "¿Abrirlo en canal? Creativa idea, aunque \
                no tienes herramientas para ello.";
    };
};

npcMark.preAttack = function() {
    const player = ctrl.personas.getPlayer();
    const hasLever = ctrl.isPresent( objLever );
    const hasCostume = player.has( objJasonCostume )
                    && objJasonCostume.isWorn();
    let toret = "Sabes que no podrías hacerlo así... Necesitas algo apropiado.";
                    
    if ( hasLever ) {
        toret = "Alzas la palanca por encima de tu cabeza... \
                  <br/>Golpeas con saña su rostro en primer lugar. \
                  Cuando consigue alzar un brazo, la palanca hace \
                  que este se rompa con un crujido sordo.</p> ";
        
        toret += "<p>Pronto empieza a saltar la sangre... \
                  sangre por todas partes... \
                  te figuras que tus golpes comienzan como a rebotar... \
                  aunque quizás no sea más que una ilusión...\
                  </p>";
                  
        if ( hasCostume ) {
            toret += "<p>De repente, eres consciente de la gente \
                      a tu alrededor... ¡están aplaudiendo! </p>";
            toret += "<p>Algunos se dirigen a ti, preguntando a qué \
                      compañía teatral pertenecéis, si el ayuntamiento \
                      ha tirado la casa por la ventana... \
                      No les respondes. <br/>Sólo levantas las manos, \
                      triunfal.<br/>'Viva Halloween', gritas. \
                      esto hace que la gente se deshaga todavía más \
                      en vítores y aplausos. ";
        } else {
            toret += "<p>Otras personas os separan, mientras tú sigues \
                      manoteando y golpeando y pataleando en el aire. \
                      Cuando vuelves a recuperar la realidad de lo que \
                      te rodea, la gente a tu alrededor, gritando, \
                      él, inmóvil, te das cuenta \
                      de que incluso la policía está llegando.</p>";
        }
        
        toret += "<p>Vuelves a mirarle, reducido ahora a una masa, \
                  una pulpa sanguinolenta irreconocible.</p>";
        
        if ( hasCostume ) {
            toret += "<p>Retrocedes, mientras la gente a tu alrededor hace \
                      como un pasillo para permitirte salir, y tú \
                      también aplaudes y levantas los brazos. \
                      Enfilas un callejón y te pierdes en la oscuridad.</p>";
        } else {
            toret += "<p>Los agentes de policía te rodean ahora, \
                      cerrando las esposas sobre tus manos y forzándote \
                      a caminar hacia el coche patrulla. \
                      Mientras tanto, tu luchas por mirar atrás, \
                      por mirar a lo que ha quedado de él. Y sonríes.";
        }
        
        endGame( toret, hasLever && hasCostume );
        toret = "";
    }
    
    
    return toret;
};

npcMark.preTalk = function() {
    const player = ctrl.personas.getPlayer();
    let hasCustome = player.has( objJasonCostume )
                  && objJasonCostume.isWorn();
    let toret = "";
    
    if ( this.status == 0 ) {
        ++this.status;
        if ( hasCustome ) {
            ctrl.print( "Te plantas delante de él." );
            this.say( "¡Buen disfraz, tío! ¡Das miedo que te cagas!" );
        } else {
            ctrl.print( "Te plantas delante de él, disfrutando del momento. \
                         <br/>Te mira fijamente.<br/>Su boca se abre lentamente \
                         mientras balbucea tu nombre." );
            this.say( "¿Qué haces aquí? Hay... ¡hay una orden!" );
        }
    } else {
        if ( hasCustome ) {
            ctrl.print( "Vuelves a llamar su atención..." );
            this.say( "¡Colega, no sé quien eres! ¡Venga, aire!" );
        } else {
            ctrl.print( "Te planta cara, firme." );
            this.say( "No puedes estar aquí... ¡recuerda la orden de alejamiento!" );
        }
    }
    
    return toret;
};

const npcAdultos = ctrl.personas.creaPersona(
    "adultos",
    [ "adultos" ],
    "^{La gente parece divertirse a tu alrededor. \
     Te sientes aislado, una rareza entre muchos otros. }\
     Los adultos en general acompañan a los ${niños, ex ninos}, \
     solo algunos parecen buscar diversión, en pareja o pequeñas pandillas.",
    locStreet
);

npcAdultos.ini = function() {
    this.talkedTo = false;
};

npcAdultos.preTalk = function() {
    let toret = "La gente va atenta a la fiesta, a sus amigos, \
                 a sus hijos... o a todo al mismo tiempo.";
    
    if ( !this.talkedTo ) {
        this.talkedTo = true;
        toret = "Sientes la necesidad de comunicarte... \
                 Quizás alguien entienda este drama... \
                 Quizás alguien pueda ayudarte...";
        this.say( "¿Hola...? Oiga, ¿puede...?" );
    }
    
    return toret;
}

const npcNinos = ctrl.personas.creaPersona(
    "niños",
    [ "ninos" ],
    "Los niños acompañados por ${adultos, ex adultos} \
     portan sus bolsas de caramelos.",
    locStreet
);

npcNinos.ini = function() {
    this.talkedTo = false;
};

npcNinos.preTalk = function() {
    let toret = "A los niños se les ve excitados e ilusionados, \
                 apenas son capaces de atender a lo que les dicen \
                 sus padres.";
    
    if ( !this.talkedTo ) {
        this.talkedTo = true;
        toret = "La tierna inocencia de los niños te perturba, \
                 y te hace recapacitar... aunque tras unos instantes \
                 te das cuenta de que nada ha cambiado.";
    }
    
    return toret;
};

const npcPumpStationSeller = ctrl.personas.creaPersona(
    "vendedor",
    [ "vendedor" ],
    "Se le percibe una expresión somnolienta tras la ventanilla, \
     obviamente esperando a que te decidas a decir algo.",
    ctrl.places.limbo,
    Ent.Scenery
);

npcPumpStationSeller.ini = function() {
    this.status = 0;
};

npcPumpStationSeller.preTalk = function() {
    const player = ctrl.personas.getPlayer();
    let toret = "El vendedor había pulsado el botón del micrófono, \
                 y ahora lo suelta.";
    
    if ( this.status == 0 ) {
        this.status += 1;
        this.say( "¿Qué desea? Gasolina no va a ser..." );
    }
    else
    if ( this.status == 1 ) {
        ctrl.print( "Puedes ver algo de la tienda desde aquí, \
                     aunque no puedes distinguir los productos \
                     a la venta." );
        player.say( "¿Puede decirme qué tiene a la venta y a qué precio?" );
        ctrl.print( "El vendedor resopla, visiblemente enojado por \
                     tener que hacer tal ejercicio mental a estas \
                     horas de la noche." );
        this.say( "Tengo refrescos a 1,50€, fiambre a 2,50€, \
                   bombones a 5€, paraguas a 20€, sombrillas a 25€, \
                   y vino a 30€." );
    } else {
        ctrl.print( "Con cara de hastío, el vendedor pulsa el botón del micro." );
        this.say( "A ver, ¿qué quiere ahora?" );
    }
    
    return toret;
};

const npcPumpStationDog = ctrl.personas.creaPersona(
    "perro",
    [ "can" ],
    "Hay un perro encadenado a la parte trasera de la gasolinera.",
    locVacantLot,
    Ent.Scenery
);

npcPumpStationDog.preTalk = function() {
    this.say( "Grrr..." );
    return "No parece una buena idea ni acercarse a él.";
};

npcPumpStationDog.preAttack = function() {
    endGame( "Decides que tu objetivo es demasiado importante, \
              y ese perro demasiado prescindible.</p>\
              <p>Te preparas para asestar un golpe, \
              un solo golpe que prevees ser&aacute; mortal.</p>\
              <p>Lamentablemente, al menos para ti, \
              el perro no est&aacute; de acuerdo. \
              El mero alzamiento de tu brazo provoca que el perro \
              se prepare para atacar a su vez. Sus fauces se abren \
              peligrosamente, goteando saliva, mientras sus ojos \
              se fijan en ti, y su musculatura se tensa.</p>\
              <p>Sobrevivir&aacute;s, de alguna forma, al ataque del perro, \
              pero nunca querr&aacute;s recordar lo que ocurri&oacute; \
              a continuaci&oacute;n.",
             false,
             "res/dog.jpg" );  
};


// Boot ----------------------------------------------------------------
const player = ctrl.personas.creaPersona(
    "Esteban",
    [ "jugador" ],
    "Esteban, más tenso que nervioso.",
    locApartment
);

player.updateCmdObjs = function() {
    const loc = ctrl.places.getCurrentLoc();
    const dvCmdObjs = document.getElementById( "dvCmdObjs" );
    const pObjs = document.createElement( "p" );
    const objTemplate = "<a href='#' onclick=\"\
                      ctrl.addTerm('$id')\">$id</a> "

    dvCmdObjs.style = "display: none; text-align: center";
    dvCmdObjs.innerText = "";

    loc.personas.forEach( p => {
        const player = ctrl.personas.getPlayer();

        if ( p != player ) {
            pObjs.innerHTML += objTemplate.replaceAll( "$id", p.id );
        }
    });

    this.objs.forEach( obj => {
        pObjs.innerHTML += objTemplate.replaceAll( "$id", obj.id );;
    });

    loc.objs.forEach( obj => {
        pObjs.innerHTML += objTemplate.replaceAll( "$id", obj.id );;
    });

    dvCmdObjs.appendChild( pObjs );
    ctrl.clearAnswers();
}
 
player.postAction = function() {
    this.updateCmdObjs();
};
 
endGame = function(msg, won, pic)
{
    const dvCmds = document.getElementById( "dvCmds" );
    
    dvCmds.style.display = "none";
    
    if ( arguments.length < 3 ) {
        pic = "res/helloween.jpg";
    }

    if ( arguments.length < 2 ) {
        won = false;
    }

    if ( won ) {
        msg += "<details style='text-align: right'><summary>Curiosidades</summary>";
        msg += "<p>Este relato de terror está inspirado en la película \
                'Veneciafrenia' de Álex de la Iglesia. En este film, \
                en cierta escena (cuidado, <i>spoilers</i>), cierto \
                personaje disfrazado asesina a un simple turista mientras \
                la gente le vitorea pensando que es un montaje de carnaval. \
                La escena me pareció absolutamente terrorífica, \
                no por el hecho en sí, sino por la idea de un asesinato \
                con público aplaudiendo. Si he conseguido plasmarlo aquí, \
                fantástico, esa era la intención. Gracias por jugar.</p>";
        msg += "</details>";
    }
    
    msg += "<p style='text-align: right'>";
    msg += "<a href='javascript: window.location.reload();'>\
            Jugar de nuevo</a></p>";
    
    ctrl.endGame( msg, pic );
}

ctrl.ini = function() {
    ctrl.setTitle( "Halloween" );
    ctrl.setIntro( "<p>Por fin, una extraña tranquilidad te invade \
                    tras tanta ansiedad, la calma \
                    de haberte puesto por fin un objetivo, \
                    de haber tomado una determinación inexorable. \
                    <p>Estás preparado... Tiene que ser esta noche, \
                    la noche de Halloween.</p>" );
    ctrl.setPic( "res/helloween.jpg" );
    ctrl.setAuthor( "baltasarq@caad.es" );
    ctrl.setVersion( "20221010" );
    ctrl.places.setStart( locApartment );
    ctrl.personas.changePlayer( player );
};
