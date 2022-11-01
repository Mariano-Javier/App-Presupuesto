import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PresupuestoService } from '../../services/presupuesto.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

// declare var window: any;

@Component({
  selector: 'app-ingresar-presupuesto',
  templateUrl: './ingresar-presupuesto.component.html',
  styleUrls: ['./ingresar-presupuesto.component.css']
})
export class IngresarPresupuestoComponent implements OnInit {

  cantidad:any;
  cantidadIncorrecta:boolean;
  // formModal:any;

  constructor(private _PresupuestoService:PresupuestoService, private router:Router,public dialog: MatDialog) { 
    this.cantidad='';
    this.cantidadIncorrecta=false;
  }

  ngOnInit(): void {
    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById("exampleModal")
    // );
  }

  // openModal():void{
  //   this.formModal.show();
  // }

  // closeModal():void{
  //   this.formModal.hide();
  // }

  agregar():void{
    if (this.cantidad>0) {
      this.cantidadIncorrecta=false;
      this._PresupuestoService.presupuesto = this.cantidad;
      this._PresupuestoService.restante = this.cantidad;
      this.router.navigate(['/gastos']);

    }else{
      this.openDialog('300ms', '150ms');
      this.cantidad='';
      // this.openModal();
      // this.cantidadIncorrecta=true;
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
 
}
