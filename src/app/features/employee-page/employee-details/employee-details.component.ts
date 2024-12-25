import {Component, inject, OnInit, signal} from '@angular/core';
import {TranslocoModule, TranslocoService} from '@jsverse/transloco';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../core/services/employee/employee.service";
import {Employee} from "../../../core/models/employee.model";
import {GeneralInformationComponent} from "./general-information/general-information.component";
import {SalaryInformationComponent} from "./salary-information/salary-information.component";
import {BenefitInformationComponent} from "./benefit-information/benefit-information.component";
import {DeductionInformationComponent} from "./deduction-information/deduction-information.component";
import {DialogService} from "primeng/dynamicdialog";
import {EmployeeComponent} from "../employee/employee.component";

@Component({
  standalone: true,
  imports: [
    TranslocoModule,
    CheckboxModule,
    FormsModule,
    GeneralInformationComponent,
    SalaryInformationComponent,
    BenefitInformationComponent,
    DeductionInformationComponent
  ],
  templateUrl: './employee-details.component.html',
})
export class EmployeeDetailsComponent implements  OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private _dialogService = inject(DialogService);
  private _translocoService = inject(TranslocoService);

  employeeGeneralInformation = signal<Partial<Employee>|null>(null)

  employeeId = +this.route.snapshot.paramMap.get('employeeId')!

  ngOnInit() {
    this.fetchGeneralDetails()
  }

  onEditClick(){
    this._dialogService
      .open(EmployeeComponent, {
        header: this._translocoService.translate('generalInformation'),
        width: '70vw',
        data: {...this.employeeGeneralInformation() },
      })
      .onClose.subscribe((data) => !!data && this.fetchGeneralDetails());
  }

  navigateToEmployee(){
    this.router.navigate(['../','employee'])
  }


  fetchGeneralDetails(){
    this.employeeId&&
    this.employeeService.get(this.employeeId).subscribe({
      next: data => this.employeeGeneralInformation.set(data),
      error: data =>  this.router.navigate(['../','employee'], {replaceUrl: true}),
    })
  }

}
