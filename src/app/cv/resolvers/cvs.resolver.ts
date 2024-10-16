import { ResolveFn } from '@angular/router';

export const cvsResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
