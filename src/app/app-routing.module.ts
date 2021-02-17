import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeDetailComponent } from './components/home/home-detail/home-detail.component';
import { HomeEditComponent } from './components/common-components/home-edit/home-edit.component';

const routes: Routes = [
  {path: '', component: HomeDetailComponent},
  {path: 'home', component: HomeDetailComponent},
  {path: 'edit', component: HomeEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
