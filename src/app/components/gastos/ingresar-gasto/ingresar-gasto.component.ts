import { Component, OnInit, Inject } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

export interface DialogData {
  tipoError: 'errorInsuficiente' | 'errorNombre';
}

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
  keyWord:string;

  constructor(private _presupuestoService:PresupuestoService,public dialog: MatDialog) { 
    this.articulo='';
    this.precio='';
    this.formularioIncorrecto=false;
    this.textoIncorrecto='';
    this.keyWord='';
  }

  ngOnInit(): void {
  }


  agregarGasto():void{
    if (this.precio>this._presupuestoService.restante) {
      // this.formularioIncorrecto=true;
      // this.textoIncorrecto='La cantidad ingresada es mayor al restante';
      // this.keyWord = 'errorInsuficiente';
      // this.openDialog('300ms', '150ms');
      this.openDialog('errorInsuficiente');
      return;
    }
    if (this.articulo=='' || this.precio <= 0) {
      // this.formularioIncorrecto=true;
      // this.textoIncorrecto='Nombre de artículo o precio incorrecto';
      // this.keyWord = 'errorNombre';
      this.openDialog('errorNombre');
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

  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(ErrorDialogComponent, {
  //     width: '350px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

  openDialog(error:string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        tipoError: error,
      },
    });
  }
}
