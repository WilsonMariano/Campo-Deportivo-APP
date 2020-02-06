import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';  
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { BonoService } from 'src/app/services/http/bono.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public calendar;

  constructor(private _bono: BonoService) { }

  ngOnInit() {

    this.initialize();
    this.getEvents();
  }

  initialize() {

    var calendarEl = document.getElementById('calendar');

    this.calendar = new Calendar(calendarEl, {
      locale: esLocale,
      plugins: [ resourceTimeGridPlugin ],
      defaultView: 'resourceTimeGridDay',
      datesAboveResources: true,
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      resources: [
        {
          id: 'cod_prestacion_1',
          title: 'Cancha 1 ( 5 )'
        },
        {
          id: 'cod_prestacion_4',
          title: 'Cancha 2 ( 5 )' 
        },
        {
          id: 'cod_prestacion_5',
          title: 'Cancha 3 ( 7 )' 
        },
        {
          id: 'cod_prestacion_2',
          title: 'Quincho'
        }
    ],
    // events: [
    //   {
    //     id: 1,
    //     resourceId: '1',
    //     title: 'Wilson Mariano', 
    //     start: '2020-02-06 16:00',
    //     end: '2020-02-06 19:00',
    //   }
    // ]
    });

    this.calendar.render();

  }

  public getEvents() {

    this._bono.getForCalendar().subscribe(
      data => {
        
        data.data.forEach(element => {
          
          this.calendar.addEvent({
            id: element.id,
            resourceId: element.codPrestacion,
            title: element.nombre +' '+ element.apellido,
            start: element.fechaAsignacion +' '+ element.horaAsignacion
          });
        });
      }
    )


  }

}
