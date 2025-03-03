import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import {
  EMPLOYEE_GENERAL_INFORMATION_FIELDS,
  PAYROLL_SALARY_FIELDS,
} from '../../../core/constants/payroll.constants';
import { MonthlySalaryAdjustmentTypeEnum } from '../../../core/models/monthly-salary-adjustment-type.model';
import { MonthlySalaryAdjustmentsService } from '../../../core/services/monthly-salary-adjustments/monthly-salary-adjustments.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-payroll-fields',
  standalone: true,
  templateUrl: './payroll-fields.component.html',
  imports: [Tree, TranslocoModule, ButtonModule],
})
export class PayrollFieldsComponent implements OnInit {
  private readonly _translocoService = inject(TranslocoService);

  fieldSelectionChange =
    output<TreeNode<{ label: string; valueField: string }>[]>();

  defaultSelectedColumns = input<string[]>([]);

  fields = signal<TreeNode[]>([
    {
      label: this._translocoService.translate('generalInformation'),
      children: [...EMPLOYEE_GENERAL_INFORMATION_FIELDS].map(
        ({ name, valueField }) => ({
          label: this._translocoService.translate(name),
          data: { valueField },
        }),
      ),
    },
    {
      label: this._translocoService.translate('salary'),
      children: [...PAYROLL_SALARY_FIELDS].map(({ name, valueField }) => ({
        label: this._translocoService.translate(name),
        data: { valueField },
      })),
    },
  ]);

  private _monthlySalaryAdjustmentService = inject(
    MonthlySalaryAdjustmentsService,
  );

  constructor() {
    effect(
      () => {
        const mapped = this.fields().flatMap((field) =>
          field.children?.map((child) => {
            child.parent = field;
            return child;
          }),
        );
        const selectedColumns = mapped
          .filter((child) =>
            this.defaultSelectedColumns().includes(child?.data?.valueField!),
          )
          .map((field) => {
            field!.parent!.partialSelected = true;
            field!.parent!.expanded = true;
            return field;
          });
        this.selectedColumns.set(selectedColumns as TreeNode[]);
        this.fieldSelectionChange.emit(selectedColumns as TreeNode[]);
      },

      { allowSignalWrites: true },
    );
  }
  ngOnInit(): void {
    this._monthlySalaryAdjustmentService.getAll().subscribe(
      (data) =>
        data?.length &&
        this.fields.update((prev) => [
          ...prev,
          {
            label: this._translocoService.translate(
              MonthlySalaryAdjustmentTypeEnum.DEDUCTION,
            ),
            children: [
              ...data
                .filter(
                  ({ type }) =>
                    type === MonthlySalaryAdjustmentTypeEnum.DEDUCTION,
                )
                .map(({ name }) => ({
                  label: this._translocoService.translate(name),
                  data: { valueField: `${name.split(' ').join('_')}_gross` },
                })),
            ],
          },
          {
            label: this._translocoService.translate(
              MonthlySalaryAdjustmentTypeEnum.BENEFIT,
            ),
            children: [
              ...data
                .filter(
                  ({ type }) =>
                    type === MonthlySalaryAdjustmentTypeEnum.BENEFIT,
                )
                .map(({ name }) => ({
                  label: this._translocoService.translate(name),
                  data: { valueField: `${name.split(' ').join('_')}_gross` },
                })),
            ],
          },
        ]),
    );
  }

  selectedColumns = signal<TreeNode[]>([]);

  onFieldsChange(fields: TreeNode<any> | TreeNode<any>[] | null) {
    const filteredFields = (fields as TreeNode<any>[]).filter(
      ({ children }) => !children,
    );
    this.fieldSelectionChange.emit(filteredFields);
  }
}
