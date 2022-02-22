import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto : ProductoDescripcion;
  id : string;


  constructor( private route : ActivatedRoute,
               public productoService : ProductoService ) { }

  ngOnInit() {

    this.route.params
    .subscribe( parametros => {
      console.log(parametros['id']);
      this.productoService.getProducto(parametros['id'])
      .subscribe( (elproducto : ProductoDescripcion) => {
        this.id = parametros['id'];
        this.producto = elproducto;
        console.log(elproducto);
        
      }) 

    } )

  }

}
