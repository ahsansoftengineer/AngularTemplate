import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { MatSortHeader } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';

@Component({
  selector: 'di-base-control',
  template: '',
})
//Dropdown
export class BaseColumnComponent<T> implements OnDestroy, OnInit {

  // @ContentChild(TemplateRef) template: TemplateRef<any>;
  // @ContentChild('colContent') colContentTmpl: TemplateRef<any>;

  /** Column name that should be used to reference this column. */
  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
      this._name = name;
      this.columnDef.name = name;
  }
  _name: string;

  /**
   * Text label that should be used for the column header. If this property is not
   * set, the header text will default to the column name.
   */
  @Input() label: string;

  /**
   * Accessor function to retrieve the data should be provided to the cell. If this
   * property is not set, the data cells will assume that the column name is the same
   * as the data property the cells should display.
   */
  @Input() dataAccessor: ((data: T, name: string) => string);

  /** Alignment of the cell values. */
  @Input() align: 'before' | 'after' = 'before';

  /** Whether the column is sortable */
  @Input()
  get sortable(): boolean { return this._sortable; }
  set sortable(sortable: boolean) {
      this._sortable = coerceBooleanProperty(sortable);
  }
  _sortable: boolean;

  @ViewChild(MatColumnDef) columnDef: MatColumnDef;

  @ViewChild(MatSortHeader) sortHeader: MatSortHeader;

  constructor(
      @Optional() public table: MatTable<any>
  ) {}

  ngOnInit() {
      // if no label is set, use name as label
      if (!this.label) {
          this.label = this.capitilize(this.name);
      }
      if (this.table) {
          this.table.addColumnDef(this.columnDef);
      }
  }

  ngOnDestroy() {
      if (this.table) {
          this.table.removeColumnDef(this.columnDef);
      }
  }

  getData(data: T): any {
      return this.dataAccessor ? this.dataAccessor(data, this.name) : (data as any)[this.name];
  }

  capitilize(word: string) {
      word = word.replace(/_/g, ' ');
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

}
