import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  cargando = true;
  cargandoProducto = true;
  productos : Producto[] = [];
  productosFiltrados : Producto[] = [];

  constructor( private http : HttpClient ) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise( (resolve, reject) => {

      this.http.get('https://angular-html-4c741-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp : Producto[]) => {
        this.cargando = false;
        this.productos = resp;
        resolve( (value : any) => {});
      
        console.log(resp);
      });

    }  );

  }

  getProducto( id : string) {
    this.cargandoProducto = false;
    return this.http.get(`https://angular-html-4c741-default-rtdb.firebaseio.com/productos/${id}.json`);
  }


  buscarProductos( termino : string ) {


    if (this.productosFiltrados.length === 0){
        // cargar productos
      this.cargarProductos().then( () => {
        // aplicar el filtro
        this.filtrarProductos( termino );
      } )
    }else{
      // aplicar el filtro
      this.filtrarProductos( termino );
    };


    // this.productosFiltrados = this.productos.filter( producto => {
    //   return true;
    // } );
    // console.log(this.productosFiltrados)

  }

  private filtrarProductos ( termino : string ) {

    this.productosFiltrados = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ){
        this.productosFiltrados.push(prod)
      }
    } )

  }

}
