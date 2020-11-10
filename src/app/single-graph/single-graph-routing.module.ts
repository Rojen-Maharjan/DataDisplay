import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleGraphPage } from './single-graph.page';

const routes: Routes = [
  {
    path: '',
    component: SingleGraphPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleGraphPageRoutingModule { }
