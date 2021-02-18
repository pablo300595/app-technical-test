import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCreateComponent } from './components/home/home-create/home-create.component';
import { HomeEditComponent } from './components/home/home-edit/home-edit.component';

const routes: Routes = [
  {path: '', component: HomeCreateComponent},
  {path: 'home', component: HomeCreateComponent},
  {path: 'edit', component: HomeEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
