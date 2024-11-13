import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UiFormFieldComponent } from './form-field.component';
import { By } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import { of } from 'rxjs';

@Component({
  template: `
    <form [formGroup]="testForm">
      <ui-form-field label="Test Label" errorMessage="Custom Error">
        <input name="testInput" />
      </ui-form-field>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, UiFormFieldComponent],
})
class TestHostComponent {
  testForm = new FormGroup({
    testInput: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]*$'),
    ]),
  });
}

describe('UiFormFieldComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let translocoService: jasmine.SpyObj<TranslocoService>;

  beforeEach(async () => {
    const translocoServiceMock = jasmine.createSpyObj('TranslocoService', [
      'selectTranslate',
    ]);
    translocoServiceMock.selectTranslate.and.returnValue(
      of('Translated Error')
    );

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: TranslocoService, useValue: translocoServiceMock },
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    translocoService = TestBed.inject(
      TranslocoService
    ) as jasmine.SpyObj<TranslocoService>;
    fixture.detectChanges();
  });

  it('should create an instance of UiFormFieldComponent', () => {
    const formFieldDebugElement = fixture.debugElement.query(
      By.directive(UiFormFieldComponent)
    );
    expect(formFieldDebugElement).toBeTruthy();
  });

  it('should display the label', () => {
    const labelElement = fixture.debugElement.query(
      By.css('label')
    ).nativeElement;
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should update isFocused signal when input is focused and blurred', () => {
    const formFieldInstance = fixture.debugElement.query(
      By.directive(UiFormFieldComponent)
    ).componentInstance;

    formFieldInstance.handleFocusIn();
    expect(formFieldInstance.isFocused()).toBeTrue();

    formFieldInstance.handleFocusOut();
    expect(formFieldInstance.isFocused()).toBeFalse();
  });
});
