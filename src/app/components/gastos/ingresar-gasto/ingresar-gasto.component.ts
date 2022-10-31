import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {
  articulo:string;
  precio:any;
  formularioIncorrecto:boolean;
  textoIncorrecto:string;
  constructor(private _presupuestoService:PresupuestoService) { 
    this.articulo='';
    this.precio='';
    this.formularioIncorrecto=false;
    this.textoIncorrecto='';
  }

  ngOnInit(): void {
  }


  agregarGasto():void{
    if (this.precio>this._presupuestoService.restante) {
      this.formularioIncorrecto=true;
      this.textoIncorrecto='La cantidad ingresada es mayor al restante';
      return;
    }
    if (this.articulo=='' || this.precio <= 0) {
      this.formularioIncorrecto=true;
      this.textoIncorrecto='Nombre de artículo o precio incorrecto';
    }else{
      //Creamos el objeto a enviar
      const PRODUCTO = {
        articulo: this.articulo,
        precio:this.precio
      }
      //enviamos el objeto para q se reste a la cantidad inicial
      this._presupuestoService.agregarArticulo(PRODUCTO);
      //limpiamos el fomulario
      this.formularioIncorrecto=false;
      this.limpiarForm();
    }
  }

  limpiarForm():void{
    this.articulo='';
    this.precio='';
  }
}
