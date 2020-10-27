import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-datos-generales-iniciales',
  templateUrl: './datos-generales-iniciales.component.html',
  styleUrls: ['./datos-generales-iniciales.component.scss']
})
export class DatosGeneralesInicialesComponent implements OnInit {

  @Input() Title: any;

  date: any;

  constructor() {
    this.date = Date.now();
  }

  ngOnInit() {
  }

}
