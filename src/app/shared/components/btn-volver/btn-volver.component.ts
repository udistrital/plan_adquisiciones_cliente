import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-btn-volver',
  templateUrl: './btn-volver.component.html',
  styleUrls: ['./btn-volver.component.scss']
})
export class BtnVolverComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
  }

  OnBack() {
    this.location.back();
  }

}
