import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProductsComponent } from 'src/app/components/my-products/my-products.component';
import { ProfileSettingsComponent } from 'src/app/components/profile-settings/profile-settings.component';
import { QuestionsComponent } from 'src/app/components/questions/questions.component';
import { SellComponent } from 'src/app/components/sell/sell.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [{ path: '', component: ProfileComponent, 
children: [
  {path: 'settings', component: ProfileSettingsComponent},
  {path: 'questions', component: QuestionsComponent},
  {path: 'sell', component: SellComponent},
  {path: 'my-products', component: MyProductsComponent},

]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
