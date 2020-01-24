import { Component, OnInit } from '@angular/core';

declare var init_plugins: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'campoDeportivoAdmin';

  ngOnInit() {
    init_plugins();
  }
}
