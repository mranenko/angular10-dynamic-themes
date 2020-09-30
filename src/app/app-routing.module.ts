import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Pages */
import {AdministrationPageComponent} from './pages/administration-page/administration-page.component';


const routes: Routes = [
  { path:  '', pathMatch: 'full', redirectTo:  'administration' },
  { path:  'administration', pathMatch: 'full', component:  AdministrationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
