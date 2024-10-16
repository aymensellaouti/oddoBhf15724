import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { TodoComponent } from './todo/todo/todo.component';
import { MiniWordComponent } from './directives/mini-word/mini-word.component';
import { ColorComponent } from './components/color/color.component';
import { FrontComponent } from './templates/front/front.component';
import { AdminComponent } from './templates/admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { NF404Component } from './components/nf404/nf404.component';
import { authGuard } from './auth/guards/auth.guard';
import { AddCvComponent } from './cv/add-cv/add-cv.component';
import { CvComponent } from './cv/cv/cv.component';
import { DetailsCvComponent } from './cv/details-cv/details-cv.component';
import { RhComponent } from './optimizationPattern/rh/rh.component';
import { APP_ROUTES } from 'src/config/routes.config';
import { MasterDetailComponent } from './cv/master-detail/master-detail.component';
import { cvsResolver } from './cv/resolvers/cvs.resolver';
import { canLeaveGuard } from './todo/guards/can-leave.guard';
import { SliderComponent } from './rxjs/slider/slider.component';
import { ProductsComponent } from './products/products.component';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'rh', component: RhComponent },
  { path: APP_ROUTES.slider, component: SliderComponent },
  { path: APP_ROUTES.products, component: ProductsComponent },
  {
    path: APP_ROUTES.cv,
    children: [
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
    ],
  },

  {
    path: '',
    component: FrontComponent,
    children: [
      {
        path: 'todo',
        component: TodoComponent,
        canDeactivate: [canLeaveGuard],
      },
      { path: 'word', component: MiniWordComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [{ path: 'color', component: ColorComponent }],
  },
  { path: '**', component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
