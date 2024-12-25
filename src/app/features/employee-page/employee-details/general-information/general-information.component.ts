import {Component, inject, input, output} from '@angular/core';
import {Employee} from "../../../../core/models/employee.model";
import {PreviewFieldComponent} from "../../../../shared/components/preview-field/preview-field.component";
import {TranslocoDirective, TranslocoService} from "@jsverse/transloco";
import {SalaryComponent} from "../../salary/salary.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'employee-general-information',
  standalone: true,
  imports: [PreviewFieldComponent, TranslocoDirective],
  templateUrl: './general-information.component.html',
})
export class GeneralInformationComponent {
  employeeData = input.required<Partial<Employee>>();
  editClicked = output()



}
