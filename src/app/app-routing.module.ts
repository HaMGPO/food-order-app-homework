import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PetPageComponent } from './components/pages/pet-page/pet-page.component';
// import {TagComponent} from './components/pages/tag/tag.component'

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'search/:searchTerm', component:HomeComponent
  },
  {
    path:'tag/:tag', component:HomeComponent
  },
  {
    path:'pets/:id', component:PetPageComponent
  },
  {
    path:'home', component:HomeComponent
  },
  {
    path:'login', component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
