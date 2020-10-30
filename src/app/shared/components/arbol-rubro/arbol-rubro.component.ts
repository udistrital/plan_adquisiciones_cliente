import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { GetArbolRubro, LoadRubroSeleccionado } from '../../actions/shared.actions';
import { ArbolRubros, DatosNodo } from '../../interfaces/interfaces';
import { getArbolRubro, getRubroSeleccionado } from '../../selectors/shared.selectors';
import { NbGetters, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbTreeGridRowComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-arbol-rubro',
  templateUrl: './arbol-rubro.component.html',
  styleUrls: ['./arbol-rubro.component.scss']
})
export class ArbolRubroComponent implements OnInit, OnDestroy {

  selectedTreeRow: any = null;
  subscription$: any;
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  customColumn = 'Codigo';
  defaultColumns = ['Nombre'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  data: ArbolRubros<DatosNodo>[];
  dataSource: NbTreeGridDataSource<any>;
  subscription2$: any;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,
    private store: Store<any>,
  ) {
    this.store.dispatch(GetArbolRubro({ branch: '3' }));
    this.subscription$ = this.store.select(getArbolRubro);
    this.subscription2$ = this.store.select(getRubroSeleccionado);
  }

  ngOnInit() {
    const getters: NbGetters<ArbolRubros<DatosNodo>, ArbolRubros<DatosNodo>> = {
      dataGetter: (node: ArbolRubros<DatosNodo>) => node.data || null,
      childrenGetter: (node: ArbolRubros<DatosNodo>) => !!node.children && !!node.children.length ? node.children : [],
      expandedGetter: (node: ArbolRubros<DatosNodo>) => !!node.expanded,
    };
    this.subscription$.subscribe((arbol: any) => {
      if (Object.keys(arbol).length !== 0) {
        this.data = arbol[0];
        this.dataSource = this.dataSourceBuilder.create([this.data], getters);
      }
    });
    this.subscription2$.subscribe((rubro: any) => {
      if (rubro !== null) {
        this.selectedTreeRow = rubro;
      }
    });
  }

  changeSort(sortRequest: NbSortRequest): void {
    this.dataSource.sort(sortRequest);
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }

  onSelect(row: any) {
    // console.log(row, this.selectedTreeRow)
    this.store.dispatch(LoadRubroSeleccionado(row));
  }

}
