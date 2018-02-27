import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageCenterPage } from './message-center';

@NgModule({
  declarations: [
    MessageCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageCenterPage),
  ],
  exports: [
    MessageCenterPage
  ]
})
export class MessageCenterPageModule {}
