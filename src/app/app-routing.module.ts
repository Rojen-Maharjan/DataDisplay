import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  // {
  //   path: "home",
  //   loadChildren: () =>
  //     import("./home/home.module").then((m) => m.HomePageModule),
  // },
  // {
  //   path: "test",
  //   loadChildren: () =>
  //     import("./test/test.module").then((m) => m.TestPageModule),
  // },
  // {
  //   path: "setting",
  //   loadChildren: () =>
  //     import("./setting/setting.module").then((m) => m.SettingPageModule),
  // },
  // {
  //   path: 'help',
  //   loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  // },
  {
    path: 'single-graph',
    loadChildren: () => import('./single-graph/single-graph.module').then(m => m.SingleGraphPageModule)
  },
  {
    path: 'plot',
    loadChildren: () => import('./plot/plot.module').then(m => m.PlotPageModule)
  },
  {
    path: "",
    redirectTo: "single-graph",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
