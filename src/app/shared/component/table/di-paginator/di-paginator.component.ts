import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DI_Table } from 'src/app/core/interface/common/di-table';

@Component({
  selector: 'di-paginator',
  templateUrl: './di-paginator.component.html',
  styleUrls: ['./di-paginator.component.css']
})
export class DiPaginatorComponent {
  @Input() tbl: DI_Table;
  @Output('paginateEvent') paginateEvents = new EventEmitter<DI_Table>();
  _paginate(event?: PageEvent): PageEvent {
    this.tbl.index = event.pageIndex;
    this.tbl.length = event.length;
    this.tbl.size = event.pageSize;
    this.tbl.prevIndex = event.previousPageIndex;
    this.paginateEvents.emit(this.tbl)
    return event;
  }
}
