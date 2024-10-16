import { ResolveFn } from '@angular/router';
import { Cv } from '../model/cv';
import { inject } from '@angular/core';
import { CvService } from '../services/cv.service';

export const cvsResolver: ResolveFn<Cv[]> = (route, state) => {
  // Bech nzidou el code eli ijib la liste des cvs
  const cvService = inject(CvService);
  return cvService.getCvs();
};
