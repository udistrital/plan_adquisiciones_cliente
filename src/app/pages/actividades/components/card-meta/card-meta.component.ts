import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedService } from '../../../../shared/services/shared.service';
import { getMetaSeleccionada } from '../../../metas/selectors/metas.selectors';

@Component({
  selector: 'ngx-card-meta',
  templateUrl: './card-meta.component.html',
  styleUrls: ['./card-meta.component.scss']
})
export class CardMetaComponent implements OnInit {
  subscription$: any;
  Meta: any
  
  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.subscription$ = this.store.select(getMetaSeleccionada).subscribe((meta: any) => {
      if (this.sharedService.IfStore(meta)) {
        this.Meta = meta;
      }
    })
  }

}
