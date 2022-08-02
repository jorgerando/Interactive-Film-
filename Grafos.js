//Construccion Grafo :
var n1 = new Nodo("Inicio","Videos/inicio.mp4");
var n2 = new Nodo("Mejor Seamos Siguilosos ","Videos/All Sneaky Like.mp4");
var n3 = new Nodo("Disparemos A Todo lo que se Mueva","Videos/Guns Blazing.mp4");
var n4 = new Nodo("Pillemos El coche ","Videos/Car.mp4");
var n5 = new Nodo("Pillemos el helicoptero","Videos/Helicopter.mp4");
var n6 = new Nodo("Tune Oscuro","Videos/Dark Tunnel.mp4");
var n7 = new Nodo("Mejor El Tunel Luminoso","Videos/Light Tunnel.mp4");

n1.UnirNodos([n2,n3]);
n2.UnirNodos([n6,n7]);
n3.UnirNodos([n4,n5]);

var A = new Grafos([n1,n2,n3,n4,n5,n6,n7]);
