
// Clases  Nodo Recorredor y Botonera :
class Nodo{
   //Caracteristicas de los nodos
   // Nombre del Nodo que sera al opcion  que muestra el boton para que el usuario tenga la capacaidad de eleguir que opcion quiere
   // una direccion de un video
   // Un array de nodos que seran los nodos a los que esta unido este

  constructor(Nombre,Video){
     this.Nombre = Nombre ;
     this.Video = Video ;
     this.NodosUnidos = null ;
  }

  Unido(){
    return this.NodosUnidos != null ;
  }

  NumeroUniones(){
    return this.NodosUnidos.length ;
  }

  UnirNodos(Nodos){
    if(this.NodosUnidos == null){
       this.NodosUnidos = Nodos ;
    }else{
       for(var i = 0 ; i < Nodos.length ; i++){
         this.NodosUnidos.push(Nodos[i]);
       }
    }
  }

  DevolverUnidos(){
    return this.NodosUnidos ;
  }

  DevolverNombre(indice){
    return this.Nombre[0] ;

  }

  DevolverVideo(){
    return this.Video ;
  }


}
class Recorredor{
  //Es la clase que se va a encargar de recorrer el grafo
  // Permitira eleguir en que nodo empezar a moverse

  constructor(Nodoinicial){
    this.NodoActual = Nodoinicial ;
  }

  DevolverNodoActual(){
   return this.NodoActual ;
  }

  Mover(IndiceOpcion){
    var unidos = this.NodoActual.DevolverUnidos();
    this.NodoActual = unidos[IndiceOpcion];
  }


}
class Botonera{
  // esta clase controlara los botones para elegir las opciones
  constructor(Mandos){
    //Mandos hace referencia al objeto selector querySelector que controla
    //el div donde encuentra la botones de tal manera que se pueda recetear
    // de manera sencilla
    this.Mandos = Mandos ;
  }

  CrearBoton(Nodo,id){
     var Nombre = Nodo.DevolverNombre() ;
     return "<button id="+id+">"+Nombre+"</button>";
  }

  CrearBotones(Opciones){
    // la id de cada boton no es mas que su nombre sin espacios para evitarme problemas
    var botones = "" ;
    for(var i = 0 ; i < Opciones.length ; i++){
        var id = Opciones[i].DevolverNombre().replace(/ /g, "") ;
        botones += this.CrearBoton(Opciones[i],id);
    }
    return botones ;
  }

  InsertarBotones(Opciones){
     this.Mandos.innerHTML = this.CrearBotones(Opciones) ;

  }

  EliminarBotones(){
    this.Mandos.innerHTML = "" ;
  }

  CrearSelectores(Opciones){
    // esta funsion lo que hace es un selector por cada boton que hemos hecho para porder
    // controlarlos
     var numeroSelectores = Opciones.length ;
     var selectores = new Array(numeroSelectores);

     for(var i = 0 ; i < numeroSelectores ; i++ ){
        var id = Opciones[i].DevolverNombre().replace(/ /g, "") ;
        selectores[i] = document.querySelector("#"+id);
     }

     return selectores ;
  }

  CrearFunsion(SelectorVideo,Nodo,posicion,Recorredor,bot){
    return function(){
       console.log("Movemos el Recorredor a al Nodo :"+Nodo.DevolverNombre());
       SelectorVideo.src = Nodo.DevolverVideo();
       SelectorVideo.play();
       Recorredor.Mover(posicion);
       bot.EliminarBotones();
     }

  }

  CrearFunsiones(SelectorVideo,Recorredor,bot){
     var NodosUnidos = Recorredor.DevolverNodoActual().DevolverUnidos();

      var funsiones = new Array(NodosUnidos.length) ;
      for(var i = 0 ; i < funsiones.length ; i++){
        // actualizar el video que se esta reproducioen

          funsiones[i] = this.CrearFunsion(SelectorVideo,NodosUnidos[i],i,Recorredor,bot);
      }
      return funsiones
    }

  DetectarBotonPulsado(ReferenciaBotones,funsiones){
        for(var i = 0 ; i < ReferenciaBotones.length ;i++){
           ReferenciaBotones[i].addEventListener("click",funsiones[i]);
        }
      }

}

//Construccion Grafo :
var n1 = new Nodo(["Inicio"],"Videos/inicio.mp4");
var n2 = new Nodo(["Mejor Seamos Siguilosos"],"Videos/All Sneaky Like.mp4");
var n3 = new Nodo(["Disparemos A Todo lo que se Mueva"],"Videos/Guns Blazing.mp4");
var n4 = new Nodo(["Pillemos El coche "],"Videos/Car.mp4");
var n5 = new Nodo(["Pillemos el helicoptero"],"Videos/Helicopter.mp4");
var n6 = new Nodo(["Tune Oscuro"],"Videos/Dark Tunnel.mp4");
var n7 = new Nodo(["Mejor El Tunel Luminoso"],"Videos/Light Tunnel.mp4");

n1.UnirNodos([n2,n3]);
n2.UnirNodos([n6,n7]);
n3.UnirNodos([n4,n5]);

//Variables Glovales:
var Video = document.querySelector("#video");
var Mandos = document.querySelector("#Mandos");
var Reco = new Recorredor(n1);
var Botones = new Botonera(Mandos);


//Funsiones Para Manipular el video que hacen uso de variables glovales:
function Reproducir(){
  video.play();
}
function Para(){
  video.pause();
}
function ReprocucirPara(){
  if(!video.paused && !video.ended)   {
     video.pause();
}
else{
    video.play();
 }
}
function ActualizarVideo(direccion){
  video.src = direccion ;
}
function SacarBotones(){
  // Esta fx va a estar en el evento timeupdate ; cuando queden un porcentaje de tiempo se desplagara la botonera
  var porcetaje = video.duration * 0.5 ;
  var diferencia = video.duration - video.currentTime  ;

  //Para que solo haga esta instruccion una vez compara cuando
  //son iguales y asi solo ejecutara una vez (viva las chapusas)
  if(Math.round(diferencia) == Math.round(porcetaje) ){
      //Importante en este evento de el video va a ser donde se van a actualizar los video y la botonoera

      // Esto hay que revisarlo quedaria mas elegante si todas las funsiones resivieran un recorredor
      // en vez del array de nodos (pero bueno ya vemos)
      var NodoActual = Reco.DevolverNodoActual() ;
      var NodosUnidosActual = NodoActual.DevolverUnidos();
      var botones = Botones.CrearBotones(NodosUnidosActual);
      Botones.InsertarBotones(NodosUnidosActual);
      var SelectoresBotones = Botones.CrearSelectores(NodosUnidosActual);
      var FunsionesBotones =  Botones.CrearFunsiones(video,Reco,Botones);
      Botones.DetectarBotonPulsado(SelectoresBotones,FunsionesBotones);

    }
}
function TeminadoSinEleccion(){
    var NodoActual = Reco.DevolverNodoActual() ;
    var NodosUnidosActual = NodoActual.DevolverUnidos();
    var posicion = Math.floor(Math.random()*NodosUnidosActual.length);
    console.log("No se ha eleguido una opcion Movemos el recorrdor a :"+NodosUnidosActual[posicion].DevolverNombre());
    video.src = NodosUnidosActual[posicion].DevolverVideo();
    video.play();
    Reco.Mover(posicion);
    Botones.EliminarBotones();



}


//ZONA De Pruebas :
video.addEventListener("timeupdate",SacarBotones);
video.addEventListener("ended",TeminadoSinEleccion);
video.addEventListener("click",ReprocucirPara)
