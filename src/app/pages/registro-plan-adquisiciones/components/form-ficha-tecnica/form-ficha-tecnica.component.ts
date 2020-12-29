import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngx-form-ficha-tecnica',
  templateUrl: './form-ficha-tecnica.component.html',
  styleUrls: ['./form-ficha-tecnica.component.scss']
})
export class FormFichaTecnicaComponent implements OnInit {

  FichaTecnicaForm: FormGroup;
  titulo: any;
  boton: any;

  constructor(
    // private store: Store<any>,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<FormFichaTecnicaComponent>,
    // private route: Router,
  ) {

    this.titulo = 'Editar Meta';
    this.boton = 'Crear';
    this.FichaTecnicaForm = this.fb.group({
      Meta: [null, [Validators.required]],
      Proceso: [null, [Validators.required]],
      Magnitud: [null, [Validators.required]],
      UnidadMedida: [null, [Validators.required]],
      Descripcion: [null, [Validators.required]],
    })
  }

  ngOnInit() {
  }
  OnClose() {
    this.matDialogRef.close();
  }
  OnSubmit() {
  }
}
