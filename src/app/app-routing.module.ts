import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [
    {provide:LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class AppRoutingModule {}
