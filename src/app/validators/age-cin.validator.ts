import { AbstractControl } from "@angular/forms";

export const ageCinValidator = (control: AbstractControl) => {
  const cin = +control.get('cin')?.value.substring(0,2);
  const age = +control.get('age')?.value;
  if (age >= 60 && cin <= 19 || age <60 && cin > 19) return null;
  return {ageCin: "L'age ne correspond pas au cin saisie !!"};
}
