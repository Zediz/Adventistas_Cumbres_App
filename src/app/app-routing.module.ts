import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'oracion',
    loadChildren: () => import('./oracion/oracion.module').then( m => m.OracionPageModule)
  },
  {
    path: 'programa',
    loadChildren: () => import('./programa/programa.module').then( m => m.ProgramaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
