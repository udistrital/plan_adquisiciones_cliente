import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetArbolRubro } from '../../actions/shared.actions';
import { DATA_TREE_NODE, FSEntry, TreeNode } from '../../interfaces/interfaces';
import { getArbolRubro } from '../../selectors/shared.selectors';

@Component({
  selector: 'ngx-arbol-rubro',
  templateUrl: './arbol-rubro.component.html',
  styleUrls: ['./arbol-rubro.component.scss']
})
export class ArbolRubroComponent implements OnInit, OnDestroy {

  selectedTreeRow: any;
  subscription$: any;

  constructor(
    private store: Store<any>,
  ) {
    this.store.dispatch(GetArbolRubro({branch: '3'}));
  }
  

  ngOnInit() {
    this.subscription$ = this.store.select(getArbolRubro).subscribe((data: any) => {
      console.log(data)
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onSelect(row: any) {
    // console.log(row, this.selectedTreeRow)
    this.selectedTreeRow = row;
  }

  customColumn = 'name';
  defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  data: TreeNode<FSEntry>[] = DATA_TREE_NODE;

}
