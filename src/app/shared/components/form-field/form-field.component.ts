import { CommonModule, NgIf } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  DestroyRef,
  HostListener,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormsModule, NgControl } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'ui-form-field',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: './form-field.component.html',
})
export class UiFormFieldComponent implements AfterContentInit {
  @Input() label?: string;
  @Input() errorMessage?: string;

  @HostListener('focusin')
  handleFocusIn(): void {
    this.isFocused.set(true);
  }

  @HostListener('focusout')
  handleFocusOut(): void {
    this.isFocused.set(false);
    this.updateErrorMessage();
  }
  isFocused: WritableSignal<boolean> = signal(false);

  @ContentChild(NgControl, { static: true }) control?: NgControl;

  displayError: WritableSignal<string> = signal('');

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _translocoService = inject(TranslocoService);

  ngAfterContentInit(): void {
    if (!this.control) {
      console.warn(
        'UiFormFieldComponent: No form control found for the wrapped element.'
      );
      return;
    }

    this.control.statusChanges
      ?.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this.displayError.set(''));
  }

  updateErrorMessage(): void {
    if (
      this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    ) {
      if (this.errorMessage) {
        this.displayError.set(this.errorMessage);
      } else if (this.control.errors?.['required']) {
        this._translocoService
          .selectTranslate('requiredError')
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((translation) => this.displayError.set(translation));
      } else if (this.control.errors?.['pattern']) {
        this._translocoService
          .selectTranslate('patternError')
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((translation) => this.displayError.set(translation));
      }
    }
  }

  isRequired(): boolean {
    const validator =
      this.control?.validator && this.control?.validator({} as AbstractControl);
    return !!validator && validator['required'];
  }
}
