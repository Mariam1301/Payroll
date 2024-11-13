import {
  AfterContentInit,
  Component,
  contentChildren,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import {
  DataElement,
  UiDataElement,
} from './data-element/data-element.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { UiConfirmationDirective } from '../../directives/confirmation/confirmation.directive';
import { UiTemplateDirective } from '../../directives/template/ui-template.directive';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { TranslocoModule } from '@jsverse/transloco';
import { UiPaginatorComponent } from './paginator/paginator.component';
import { FilterComponent } from './filter/filter.component';
import { UiLoadMoreButtonComponent } from '../load-more-button/load-more-button.component';
import { UiListComponent } from '../ui-list/ui-list.component';
import { UiTableComponent } from '../ui-table/ui-table.component';

@Component({
  selector: 'ui-responsive-data-view',
  templateUrl: './responsive-data-view.component.html',
  standalone: true,
  imports: [
    UiPaginatorComponent,
    UiLoadMoreButtonComponent,
    TableModule,
    CommonModule,
    SkeletonModule,
    UiConfirmationDirective,
    ButtonModule,
    FormsModule,
    TranslocoModule,
    FilterComponent,
    UiTableComponent,
    UiListComponent,
  ],
})
export class UiResponsiveDataViewComponent implements AfterContentInit, OnInit {
  showAddButton = input(false);

  showDeleteButton = input(false);

  data = input<any[]>();

  dataSource = input<any>();

  title = input<string>();

  loaderId = input<string>();

  clickable = input(true);

  hasPagination = input(false);

  addButtonClicked = output();

  rowClicked = output<{ index: number; dataItem: any }>();

  deleteClicked = output<{ index: number; dataItem: any }>();

  contentChildren = contentChildren(UiDataElement);

  templateRefs = contentChildren(UiTemplateDirective);

  filterTemplate = signal<TemplateRef<any> | null>(null);

  noteTemplate = signal<TemplateRef<any> | null>(null);

  columnList = signal<DataElement[] | null>(null);

  isLoading = signal(true);

  private readonly _loaderService = inject(LoaderService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.dataSource()?.fetchData();
    if (this.loaderId()) {
      this._loaderService.loader$
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(
          ({ loaderId, showLoader }) =>
            loaderId === this.loaderId() && this.isLoading.set(showLoader)
        );
    }
  }

  ngAfterContentInit(): void {
    this.columnList.set(
      this.contentChildren().map((item) => ({
        name: item.name(),
        valueField: item.valueField(),
        tempalte: item.template(),
        templateRef: item.templateRef(),
      }))
    );
    for (let template of this.templateRefs()) {
      if (template.name === 'note') {
        this.noteTemplate.set(template.template);
      }
      if (template.name === 'filter') {
        this.filterTemplate.set(template.template);
      }
    }
  }

  onDeleteClick(deletedRow: { index: number; dataItem: any }) {
    this.deleteClicked.emit(deletedRow);
  }

  onFilterClick() {
    this.dataSource()?.fetchData();
  }

  onClearClick() {
    this.dataSource().clearFilter();
  }
}
