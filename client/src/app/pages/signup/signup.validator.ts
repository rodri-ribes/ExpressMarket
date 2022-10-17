import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validarQueSeanIguales: ValidatorFn = (control: any): ValidationErrors |null => {
  const password = control.get('password');
  const confirmarPassword = control.get('passwordConfirm');

  return password?.value === confirmarPassword?.value ? null : { 'noSonIguales': true };
};
