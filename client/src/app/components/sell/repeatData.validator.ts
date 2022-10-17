import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const repeatExtraData: ValidatorFn = (control: any): ValidationErrors |null => {
  const datoSelectOne = control.get('datoSelectOne');
  const datoSelectTwo = control.get('datoSelectTwo');
  const datoSelectThree = control.get('datoSelectThree');
  const datoSelectFour = control.get('datoSelectFour');

  return datoSelectOne?.value === datoSelectTwo?.value === datoSelectThree?.value  === datoSelectFour?.value ? { 'noRepeat': true } : null;
};
