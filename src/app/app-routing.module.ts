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
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'translate',
    loadChildren: () => import('./translate/translate.module').then( m => m.TranslatePageModule)
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
