import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from '../pages/home-page/home-page.component';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    pathMatch: 'full'
  },
  {
    path: 'category/:categoryID',
    component: ProductDetailComponent,
    data: { bc: 'Categoría'},
    children: [
      {
        path: 'product/:productID',
        component: ProductDetailComponent,
        data: { bc: 'Producto'}
      }
    ]
  },
  { path: '**', component: HomePage }
  // {
  //   path: 'profile',
  //   component: UserProfileComponent,
  //   data: { bc: 'Perfil'}
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
