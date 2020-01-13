import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carnet-menu',
  templateUrl: './carnet-menu.component.html',
  styles: []
})
export class CarnetMenuComponent implements OnInit {

  public forma: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.forma = this.fb.group({
      'valor': new FormControl('', Validators.required)
    });
  }

  public emitirCarnet(): void  {

    this.router.navigate(['home/emitir-carnet', this.forma.get('valor').value]);
  }



}
