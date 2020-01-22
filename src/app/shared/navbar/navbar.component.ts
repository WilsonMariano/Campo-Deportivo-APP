import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/services.index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  public hash;

  constructor(private _auth: AuthService) { }

  ngOnInit() {}

  public logOut(): void {

    this._auth.logOut();
  }

  public keyup(event): void{

    // Enter
    if(event.keyCode == 13) {

      console.log(this.hash);
    }
    this.hash = "";
  }

}
