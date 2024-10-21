import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from 'src/config/routes.config';
import { authGuard } from '../auth/guards/auth.guard';
import { AddCvComponent } from './add-cv/add-cv.component';
import { CvComponent } from './cv/cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { MasterDetailComponent } from './master-detail/master-detail.component';
import { cvsResolver } from './resolvers/cvs.resolver';


export const CV_ROUTES: Routes = [
      {
        path: '',
        component: CvComponent,
      },
      { path: 'add', component: AddCvComponent, canActivate: [authGuard] },
      {
        path: 'list',
        component: MasterDetailComponent,
        resolve: {
          // Ya cvsResolver Bara jib la liste des cvs ou khabiha fel
          // propriété data besm 'cvs'
          cvs: cvsResolver,
        },
        children: [{ path: ':id', component: DetailsCvComponent }],
      },
      { path: ':id', component: DetailsCvComponent },
    ];


@NgModule({
  imports: [RouterModule.forChild(CV_ROUTES)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
