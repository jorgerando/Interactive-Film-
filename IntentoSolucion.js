class Nodo{
// un array de nombres
// un array de nodos unidos
// una direccion de un video
// un array que contenga el indice del nombre que quieres que se vea desde el nodo actual

constructor(Nombres,conecciones,video){
   this.Nombre = Nombre ;
   this.conecciones = conecciones ;
   this.video = video ;
   this.Unidos = null ;
}
Unir(unidos){
  if(this.Unidos == null){
     this.Unidos = unidos ;
  }else{
     this.Unidos.concat(unidos);
  }
}

DevolverUnidos(){
 return this.Unidos;

}

}


var video =  document.querySelector("#video1");
video.addEventListener("timeupdate",)
