import { Component, inject, OnDestroy } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css'],
})
export class MasterDetailComponent implements OnDestroy {
  cvs: Cv[] = [];
  cvService = inject(CvService);
  toastr = inject(ToastrService);
  router = inject(Router);
  acr = inject(ActivatedRoute);
  //subscription: Subscription;
  constructor() {
    this.cvs = this.acr.snapshot.data['cvs'];
    //this.subscription =
    this.cvService.selectedCv$
    .pipe(takeUntilDestroyed())
    .subscribe({
      next: (cv) => {
        this.router.navigate([cv.id], { relativeTo: this.acr });
      },
    });
    // this.cvService.getCvs().subscribe({
    //   next: (cvs) => {
    //     this.cvs = cvs;
    //   },
    //   error: () => {
    //     this.cvs = this.cvService.getFakeCvs();
    //     this.toastr.error(`
    //       Attention!! Les données sont fictives, problème avec le serveur.
    //       Veuillez contacter l'admin.`);
    //   },
    // });
  }
  ngOnDestroy(): void {
   //this.subscription.unsubscribe()
  }

  // showDetail(cv: Cv) {

  // }
}
