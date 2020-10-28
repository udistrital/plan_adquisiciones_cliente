import { Component, OnInit } from '@angular/core';
import { DATA_TREE_NODE, FSEntry, TreeNode } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-arbol-rubro',
  templateUrl: './arbol-rubro.component.html',
  styleUrls: ['./arbol-rubro.component.scss']
})
export class ArbolRubroComponent implements OnInit {

  selectedTreeRow: any;

  constructor() { }

  ngOnInit() {
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
