export class Socio {

    private id: Number;
    private idSocioTitular: Number;
    private nombre: String;
    private apellido: String;
    private dni: Number;
    private fechaNacimiento: Date;
    private codParentesco: String;
    private estado: Number;
    private hash: String;
    private codTipoSocio: String;
    private nroAfiliado: Number;

    public getId(): Number { return this.id }
    public getIdSocioTitular(): Number { return this.idSocioTitular }
    public getNombre(): String { return this.nombre }
    public getApellido(): String { return this.apellido }
    public getDni(): Number { return this.dni }
    public getFechaNacimiento(): Date { return this.fechaNacimiento }
    public getCodParentesco(): String { return this.codParentesco }
    public getEstado(): Number { return this.estado }
    public getHash(): String { return this.hash }
    public getCodTipoSocio(): String { return this.codTipoSocio }
    public getNroAfiliado(): Number { return this.nroAfiliado }

    public setId(id: Number): void { this.id = id }
    public setIdSocioTitular(idSocioTitular: Number): void { this.idSocioTitular = idSocioTitular }
    public setNombre(nombre: String): void { this.nombre = nombre }
    public setApellido(apellido: String): void { this.apellido = apellido }
    public setDni(dni: Number): void { this.dni = dni }
    public setFechaNacimiento(fecha: Date): void { this.fechaNacimiento = fecha }
    public setCodParentesco(codParentesco: String): void { this.codParentesco = codParentesco }
    public setEstado(estado: Number): void { this.estado = estado }
    public setHash(hash: String): void { this.hash = hash }
    public setCodTipoSocio(codSocio: String): void { this.codTipoSocio = codSocio }
    public setNroAfiliado(nroAfiliado: Number): void { this.nroAfiliado = nroAfiliado }
    

}