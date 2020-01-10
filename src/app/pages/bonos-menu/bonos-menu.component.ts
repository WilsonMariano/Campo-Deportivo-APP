import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonos',
  templateUrl: './bonos-menu.component.html',
  styles: []
})
export class BonosMenuComponent implements OnInit {

  public opcion: String = "nuevo";
  public forma: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {

    this.forma = new FormGroup({
      'valor': new FormControl('', Validators.required)
    });
  }

public hacerBono(): void {

  console.log(this.forma.get('valor').value);
  this.router.navigate(['home/emitir-bono/', this.forma.get('valor').value]);
}

}
