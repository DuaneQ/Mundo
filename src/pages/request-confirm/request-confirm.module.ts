import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestConfirmPage } from './request-confirm';

@NgModule({
  declarations: [
    RequestConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestConfirmPage),
  ],
  exports: [
    RequestConfirmPage
  ]
})
export class RequestConfirmPageModule {}
