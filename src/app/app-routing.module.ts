import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SheepfoldComponent } from './sheepfold/sheepfold.component';


const routes: Routes = [
  { path: "", component: SheepfoldComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
