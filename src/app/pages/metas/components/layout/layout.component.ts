import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  titulo: any;
  Mostrar: boolean;
  constructor(private translate: TranslateService) {
    this.titulo = this.translate.instant('META.metas');
    this.Mostrar = true;
  }
}
