import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaCredito } from '../../models/tarjeta';
import { TarjetaService } from '../../services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent {

  forms: FormGroup;
  loading:boolean=false;
  titulo='Agregar tarjeta';
  id: string | undefined;


  constructor(private fb: FormBuilder, private _TarjetaService:TarjetaService,
    private toastr: ToastrService) {
    this.forms = this.fb.group({
      titular: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      nroTarjeta: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/), Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(3), Validators.maxLength(3)]],
    });
  }

  ngOnInit(): void {
    this._TarjetaService.getTarjeta().subscribe(
      res => {
        this.titulo='Editar Tarjeta';
        this.id = res.id;
        this.forms.patchValue({
          titular:res.titular,
          nroTarjeta:res.numeroTarjeta,
          fechaExpiracion:res.fechaExpiracion,
          cvv:res.cvv

        })
        console.log(res);
      },
      error => {
        console.error('Error al obtener tarjeta:', error);
      }
    );
  }

  guardarTarjeta()
  {
    if(this.id == undefined){
      //crear Tarjeta
      this.crearTarjeta();
    }else{
      //editar Tarjeta
      this.editarTrajeta(this.id);
    }
  }

  editarTrajeta(id:string)
  {
    const TARJETA: any = {
      titular: this.forms.value.titular,
      numeroTarjeta: this.forms.value.nroTarjeta,
      fechaExpiracion: this.forms.value.fechaExpiracion,
      cvv: this.forms.value.cvv,
      fechaActualizacion: new Date(),
    }
    this.loading=true;
    this._TarjetaService.editarTarjeta(id, TARJETA).then(()=>{
      this.loading=false;
      this.toastr.info('El registro fue actualizado con exito','Registro actualizado');
      this.forms.reset();
      this.titulo='Agregar Tarjeta';
      this.id= undefined;
    }, error =>{
      console.log(error)
      this.loading=false;
      this.toastr.error('Error en la actualizacion','Error')
    })
  }

  crearTarjeta() {
    //console.log(this.forms);

    const TARJETA: TarjetaCredito = {
      titular: this.forms.value.titular,
      numeroTarjeta: this.forms.value.nroTarjeta,
      fechaExpiracion: this.forms.value.fechaExpiracion,
      cvv: this.forms.value.cvv,
      fechaCrecion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading=true;
    this._TarjetaService.guardarBd(TARJETA).then(() => {
      this.loading=false;
      this.toastr.success('Tarjeta registrada con éxito', 'Tarjeta registrada');
      this.forms.reset();
    }).catch(error => {
      this.loading=false;
      this.toastr.error('Ocurrió un error al guardar la tarjeta', 'Error');
      console.error(error);
    });
    
  }

 }





