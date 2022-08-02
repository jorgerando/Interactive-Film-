class Nodo{
// un array de nombre posibles
// la direccion de un Video
// Un array de nodos unidos
// segundo o porcentaje en el que quiero que salgan los botones
// Indices de los de el Nombre de las conecciones a los otros nodos

constructor(Nombres,Video,TiempoSalenBotones){
  this.Nombres = Nombres ;
  this.Video = Video;
  this.TiempoSalenBotones = TiempoSalenBotones ;
  this.Unidos = null ;
}

EstaUnido(){
  return this.Unidos != null ;
}

Unir(Nodos){
  if(this.Unidos == null ){
     this.Unidos = Nodos ;
  }else{
     this.Unidos = this.Unidos.concat(Nodos);
  }
}

DevolverNombre(indice){
    return this.Nombres[indice];
}



















}
