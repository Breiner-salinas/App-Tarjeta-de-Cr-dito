import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TarjetaCredito } from '../models/tarjeta';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private tarjeta$ = new Subject<any>();

  constructor(private firestore:AngularFirestore) {
   }
   guardarBd(tarjeta:TarjetaCredito):Promise <any>
   {
    return this.firestore.collection('tarjetas').add(tarjeta);
   }

   listarTarjetas():Observable<any>
   {
    return this.firestore.collection('tarjetas', ref => ref.orderBy('fechaCrecion','desc')).snapshotChanges();
   }
   eliminarTarjeta(id:string):Promise<any>
   {
    return this.firestore.collection('tarjetas').doc(id).delete();
   }
  
  //actualizar tarjeta................................................................................
   addTarjetaEditar(tarjeta:TarjetaCredito)
   {
    this.tarjeta$.next(tarjeta);
   }

   getTarjeta():Observable<TarjetaCredito>
   {
     return this.tarjeta$.asObservable();
   }

   editarTarjeta(id:string, tarjeta:any):Promise<any>
   {
    return this.firestore.collection('tarjetas').doc(id).update(tarjeta);
   }
  //.....................................................................................................
}
