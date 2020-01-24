import { Component, OnInit } from '@angular/core';
import { AuthService, SocioService, FxGlobalsService } from 'src/app/services/services.index';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  public hash;
  public datosSocio = null;

  constructor(
    private _auth: AuthService,
    private _socio: SocioService,
    private _fx: FxGlobalsService) { }


  ngOnInit() {}

  public logOut(): void {

    this._auth.logOut();
  }

  public keyup(event): void {

    // Enter
    if(event.keyCode == 13) 
      this.onSubmit();

  }

  public onSubmit() {

    this._socio.register('hash', this.hash).subscribe(
      data => {

        console.log(data);
        
        if(!data.ok)
          this._fx.showAlert('Error', data.msg, "error");
        
        else {

          this.datosSocio = data.data;
          $('#modalRegister1').modal('show');
        }
      },
      err => this._fx.showAlert('Error', err.msg, "error")
    );

    this.hash = "";
  }


}
