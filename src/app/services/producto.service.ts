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

  constructor( private http : HttpClient ) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    this.http.get('https://angular-html-4c741-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( (resp : Producto[]) => {
      this.cargando = false;
      this.productos = resp;
      console.log(resp);
    })
  }

  getProducto( id : string) {
    this.cargandoProducto = false;
    return this.http.get(`https://angular-html-4c741-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

}
