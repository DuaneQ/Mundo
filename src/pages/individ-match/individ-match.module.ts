import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndividMatchPage } from './individ-match';

@NgModule({
  declarations: [
    IndividMatchPage,
  ],
  imports: [
    IonicPageModule.forChild(IndividMatchPage),
  ],
  exports: [
    IndividMatchPage
  ]
})
export class IndividMatchPageModule {}
