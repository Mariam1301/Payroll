import {
  Component,
  computed,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { MonthlySalaryAdjustmentsService } from '../../../core/services/monthly-salary-adjustments/monthly-salary-adjustments.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PayrollConfigurationField } from '../../../core/models/payroll-generation.model';
import { TranslocoModule } from '@jsverse/transloco';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { MonthlySalaryAdjustmentType } from '../../../core/models/monthly-salary-adjustment-type.model';

@Component({
  templateUrl: './calculation-configuration.component.html',
  selector: 'payroll-calculation-configuration',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TranslocoModule,
    CheckboxModule,
    FormsModule,
  ],
})
export class CalculationConfigurationComponent implements OnInit {
  selectedCalculationFields = model.required<number[]>();

  proportionalFields = model.required<number[]>();

  configurableFields = computed(() =>
    this.mapConfigurableFields(
      this.adjustmentTypes(),
      this.selectedCalculationFields(),
      this.proportionalFields(),
    ),
  );

  adjustmentTypes = signal<MonthlySalaryAdjustmentType[] | null>(null);

  private readonly _monthlySalaryAdjustmentService = inject(
    MonthlySalaryAdjustmentsService,
  );

  ngOnInit(): void {
    this._monthlySalaryAdjustmentService
      .getAll()
      .subscribe((data) => this.adjustmentTypes.set(data));
  }

  onIncludedChange(selected: boolean, field: PayrollConfigurationField) {
    if (selected) {
      this.selectedCalculationFields.update(
        (prev) => !!prev && [...prev, field.id],
      );
    } else {
      this.selectedCalculationFields.update(
        (prev) => !!prev && prev.filter((fieldId) => fieldId !== field.id),
      );

      this.onProportionalChange(false, field);
    }
  }

  onProportionalChange(selected: boolean, field: PayrollConfigurationField) {
    if (selected) {
      this.proportionalFields.update((prev) => !!prev && [...prev, field.id]);
    } else {
      this.proportionalFields.update(
        (prev) => !!prev && prev.filter((fieldId) => fieldId !== field.id),
      );
    }
  }

  trackRowId(index: number, row: PayrollConfigurationField) {
    return row.id;
  }

  private mapConfigurableFields(
    adjustmentTypes: MonthlySalaryAdjustmentType[] | null,
    selectedCalculationFields: number[],
    proportionalFields: number[],
  ) {
    const selectedCalculationFieldsMap = new Map();
    const proportionalFieldsMap = new Map();

    proportionalFields.forEach((proportionalFieldId: number) =>
      proportionalFieldsMap.set(proportionalFieldId, true),
    );

    selectedCalculationFields.forEach((selectedFieldId: number) =>
      selectedCalculationFieldsMap.set(selectedFieldId, true),
    );

    return adjustmentTypes?.map((field) => ({
      ...field,
      includeInCalculation: !!selectedCalculationFieldsMap.get(field.id),
      isProportional: !!proportionalFieldsMap.get(field.id),
    }));
  }
}
