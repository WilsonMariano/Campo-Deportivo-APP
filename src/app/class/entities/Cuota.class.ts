export class Cuota {

    private id: Number;
    private idSocioTitular: Number;
    private fechaPago: Date;
    private fechaVencimiento: Date;
    private monto: Number;
    private descripcion: String;

    public getId(): Number { return this.id }
    public getIdSocioTitular(): Number { return this.idSocioTitular }
    public getFechaPago(): Date { return this.fechaPago }
    public getFechaVencimiento(): Date { return this.fechaVencimiento }
    public getMonto(): Number { return this.monto }
    public getDescripcion(): String { return this.descripcion }

    public setId(id:  Number)  { this.id = id }
    public setIdSocioTitular(idSocioTitular: Number)  { this.idSocioTitular = idSocioTitular }
    public setFechaPago(fechaPago: Date)  { this.fechaPago = fechaPago }
    public setFechaVencimiento(fechaVencimiento: Date)  { this.fechaVencimiento = fechaVencimiento }
    public setMonto(monto: Number)  { this.monto = monto }
    public setDescripcion(descripcion: String)  { this.descripcion = descripcion }
}