import { Time } from '@angular/common';

export class Bono {

    private id: Number;
    private idSocio: Number;
    private monto: Number;
    private fechaEmision: Date;
    private fechaAsignacion: Date;
    private horaAsignacion: Time;
    private codPrestacion: String;
    private detalle: String;
    private codEstadoBono: String;

    public getId(): Number { return this.id }
    public getIdSocio(): Number { return this.idSocio }
    public getMonto(): Number { return this.monto }
    public getFechaEmision(): Date { return this.fechaEmision }
    public getFechaAsignacion(): Date { return this.fechaAsignacion }
    public getHoraAsignacion(): Time { return this.horaAsignacion }
    public getCodPrestacion(): String { return this.codPrestacion }
    public getDetalle(): String { return this.detalle }
    public getCodEstadoBono(): String { return this.codEstadoBono }

    public setId(id: Number): void  { this.id = id }
    public setIdSocio(idSocio: Number): void { this.idSocio = idSocio }
    public setMonto(monto: Number): void { this.monto = monto }
    public setFechaEmision(fechaEmision: Date): void { this.fechaEmision = fechaEmision }
    public setFechaAsignacion(fechaAsignacion: Date): void { this.fechaAsignacion = fechaAsignacion }
    public setHoraAsignacion(horaAsignacion: Time): void { this.horaAsignacion = horaAsignacion }
    public setCodPrestacion(codPrestacion: String): void { this.codPrestacion = codPrestacion }
    public setDetalle(detalle: String): void { this.detalle = detalle }
    public setCodEstadoBono(codEstadoBono: String): void { this.codEstadoBono = codEstadoBono }


    
}