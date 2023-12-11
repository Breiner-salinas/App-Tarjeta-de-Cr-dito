import { Component } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';
import { TarjetaCredito } from '../../models/tarjeta';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrl: './listar-tarjeta.component.css'
})
export class ListarTarjetaComponent {

    constructor(private _tarjetaServices: TarjetaService, private toast:ToastrService){
      this.listarTarjetas();
      
    }
    listaTarjetas:TarjetaCredito[]=[];

    ngOnInit():void{
      this.listarTarjetas();
    } 
    listarTarjetas(){
      this._tarjetaServices.listarTarjetas().subscribe(res=>{
        console.log(res);
        this.listaTarjetas=[];
        res.forEach((element:any) => {
          this.listaTarjetas.push({
            id:element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        console.log(this.listaTarjetas);
          
      });
    }
    eliminarTarjeta(id:any)
    {
      this._tarjetaServices.eliminarTarjeta(id).then(()=>{
        this.toast.error('Tarjeta eliminada de la BD','Registro eliminado');
      },error=>{
        console.log(error)
        this.toast.error('ops, ocurrio un error','Error');

      });
    }
    editarTarjeta(tarjeta:TarjetaCredito)
    {
      this._tarjetaServices.addTarjetaEditar(tarjeta);
    }
}
