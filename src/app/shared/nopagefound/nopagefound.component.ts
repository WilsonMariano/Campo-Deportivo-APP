import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public irACasa(): void {

    this.router.navigate(['campoDeportivoAdmin/home/grilla-socios']);
  }

}
