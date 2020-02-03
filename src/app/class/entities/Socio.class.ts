export class Socio {

    private id: Number;
    private idSocioTitular: Number;
    private nombre: String;
    private apellido: String;
    private dni: Number;
    private fechaNacimiento: Date;
    private telefono: Number;
    private codParentesco: String;
    private activo: Number;
    private hash: String;
    private codTipoSocio: String;
    private nroAfiliado: Number;

    public getId(): Number { return this.id }
    public getIdSocioTitular(): Number { return this.idSocioTitular }
    public getNombre(): String { return this.nombre }
    public getApellido(): String { return this.apellido }
    public getDni(): Number { return this.dni }
    public getFechaNacimiento(): Date { return this.fechaNacimiento }
    public getTelefono(): Number { return this.telefono }
    public getCodParentesco(): String { return this.codParentesco }
    public getActivo(): Number { return this.activo }
    public getHash(): String { return this.hash }
    public getCodTipoSocio(): String { return this.codTipoSocio }
    public getNroAfiliado(): Number { return this.nroAfiliado }

    public setId(id: Number): void { this.id = id }
    public setIdSocioTitular(idSocioTitular: Number): void { this.idSocioTitular = idSocioTitular }
    public setNombre(nombre: String): void { this.nombre = nombre }
    public setApellido(apellido: String): void { this.apellido = apellido }
    public setDni(dni: Number): void { this.dni = dni }
    public setFechaNacimiento(fecha: Date): void { this.fechaNacimiento = fecha }
    public setTelefono(telefono: Number): void { this.telefono = telefono }
    public setCodParentesco(codParentesco: String): void { this.codParentesco = codParentesco }
    public setActivo(activo: Number): void { this.activo = activo }
    public setHash(hash: String): void { this.hash = hash }
    public setCodTipoSocio(codSocio: String): void { this.codTipoSocio = codSocio }
    public setNroAfiliado(nroAfiliado: Number): void { this.nroAfiliado = nroAfiliado }
    
}