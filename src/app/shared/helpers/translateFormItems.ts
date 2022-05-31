import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateFormItemsHelper {
  constructor(private translate: TranslateService) {}

  public translateItemTableConfiguration(item): any {
    if (typeof item === 'object' && item.label_i18n) {
      item.title = this.translate.instant('FORMULARIO.TITULO.' + item.label_i18n);
      item.name = this.translate.instant('FORMULARIO.NOMBRE.' + item.label_i18n);
      item.text = this.translate.instant('FORMULARIO.NOMBRE.' + item.label_i18n);
    } else if (typeof item === 'object') {
      for (const config of Object.keys(item)) {
        this.translateItemTableConfiguration(item[config]);
      }
    }

    return item;
  }
}
