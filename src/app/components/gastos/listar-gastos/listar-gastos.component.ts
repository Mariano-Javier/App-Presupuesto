import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from '../../../services/presupuesto.service';

@Component({
  selector: 'app-listar-gastos',
  templateUrl: './listar-gastos.component.html',
  styleUrls: ['./listar-gastos.component.css'],
})
export class ListarGastosComponent implements OnInit, OnDestroy {
  presupuesto: number;
  restante: number;
  listaGastos: any[] = [];
  suscription: Subscription;

  constructor(private _presupuestoService: PresupuestoService) {
    this.presupuesto = 0;
    this.restante = 0;
    this.suscription = this._presupuestoService.getProducto().subscribe(data => {
        this.restante = this.restante - data.precio;
        this.listaGastos.push(data);
        
      });
  }

  ngOnInit(): void {
    this.presupuesto = this._presupuestoService.presupuesto;
    this.restante = this._presupuestoService.restante;
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  aplicarColorRestante():string{
    if (this.presupuesto/4 > this.restante) {
      return 'alert alert-danger'
    }else if(this.presupuesto/2 > this.restante){
      return 'alert alert-warning'
    }else{
      return 'alert alert-secondary'
    }
    
  }
}
