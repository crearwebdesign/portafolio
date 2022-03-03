import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( private route : ActivatedRoute,
               public productoService : ProductoService  ) { }

  ngOnInit() {
    this.route.params.subscribe( param => {
      console.log(param['termino']);
      this.productoService.buscarProductos(param['termino']);
    } )


  }

}
