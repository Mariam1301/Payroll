import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PreviewFieldComponent } from '../../../shared/components/preview-field/preview-field.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    TranslocoModule,
    PreviewFieldComponent,
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './employee-details.component.html',
})
export class EmployeeDetailsComponent {
  included = true;
}
