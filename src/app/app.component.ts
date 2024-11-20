import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UiFormFieldComponent } from './shared/components/form-field/form-field.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UiResponsiveDataViewComponent } from './shared/components/responsive-data-view/responsive-data-view.component';
import { UiDataElement } from './shared/components/responsive-data-view/data-element/data-element.component';
import { CommonModule } from '@angular/common';
import { UiTemplateDirective } from './shared/directives/template/ui-template.directive';
import { Observable } from 'rxjs';
import { CounterState } from './store/counter/counter.state';
import { Store } from '@ngrx/store';
import { selectCount } from './store/counter/counter.selector';
import { increment } from './store/counter/counter.actions';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoginService } from './core/services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UiFormFieldComponent,
    FormsModule,
    InputTextModule,
    UiResponsiveDataViewComponent,
    UiDataElement,
    CommonModule,
    UiTemplateDirective,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  count$: Observable<number>;

  private _loginService = inject(LoginService);

  constructor(private store: Store<{ counter: CounterState }>) {
    this.count$ = this.store.select(selectCount);
  }

  ngOnInit(): void {
    this._loginService.getUser();
  }

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {}
}
