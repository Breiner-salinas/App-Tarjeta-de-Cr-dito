export class TarjetaCredito{
    id?:string;
    titular: string;
    numeroTarjeta: string;
    fechaExpiracion:Date;
    cvv: string;
    fechaCrecion: Date;
    fechaActualizacion: Date;
    
    constructor(titular:string, numeroTarjeta: string, cvv: string){
        this.titular=titular;
        this.numeroTarjeta=numeroTarjeta;
        this.fechaExpiracion= new Date;
        this.cvv=cvv;
        this.fechaCrecion= new Date();
        this.fechaActualizacion= new Date();
    }
}