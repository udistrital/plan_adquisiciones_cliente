import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedService } from '../../../../shared/services/shared.service';
import { getRenglonVersion } from '../../../planes/selectors/planes.selectors';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  Informacion: any;

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.store.select(getRenglonVersion).subscribe((renglon: any) => {
      if (this.sharedService.IfStore(renglon)) {
        this.Informacion = renglon;

      }
    });
  }

}
