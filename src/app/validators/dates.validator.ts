import { AbstractControl } from "@angular/forms";

export function isFuture(control: AbstractControl) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (control.value != null) {
    const date = new Date(control.value);
    if (date.getTime() < today.getTime()) {
      return { isFuture: true }
    }
  }

  return null;
}

export function endDateAfterStartDate(control: AbstractControl) {
  const start = control.get('startDate');
  const end = control.get('endDate');
  if (start?.value && end?.value) {
    const startDate = new Date(start.value);
    const endDate = new Date(end.value);

    return endDate.getTime() <= startDate.getTime() ? { endDateAfterStartDate: true } : null;
  }

  return null;
}
