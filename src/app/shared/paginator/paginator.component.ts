import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Input() totalItems: number;

  @Output() pageIndexChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  get isFirstPage(): boolean {
    return this.pageIndex === 1;
  }

  get isLastPage(): boolean {
    return this.pageIndex === this.totalPages;
  }

  get totalPages(): number {
   return Math.ceil(this.totalItems / this.pageSize);
  }

  onPrevPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.pageIndexChanged.emit(this.pageIndex);
    }
  }

  onNextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.pageIndexChanged.emit(this.pageIndex);
    }
  }

}
