import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletPage } from './wallet.page';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChartModule,
    DialogModule,
    RouterModule.forChild([{ path: '', component: WalletPage }])
  ],
  declarations: [WalletPage]
})
export class WalletPageModule {}
