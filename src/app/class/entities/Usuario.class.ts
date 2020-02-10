    export class Usuario {

        public id          :   Number;
        public usuario       :   String;
        public password    :   String;
        public codRole     :   String;

        public Usuario(usuario: String, password: String, codRole?: String, id?: Number) {

            this.usuario    = usuario;
            this.password   = password;
            this.codRole    = codRole;

            if(id)  this.id = id;
        }

        public getId()              { return this.id };
        public getUsuario()         { return this.usuario };
        public getPassword()        { return this.password };
        public getCodRole()         { return this.codRole };

        public setId(value)         { this.id = value }
        public setUsuario(value)    { this.usuario = value }
        public setPassword(value)   { this.password = value }
        public setCodRole(value)    { this.codRole = value }
        
    }