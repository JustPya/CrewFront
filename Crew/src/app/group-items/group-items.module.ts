import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { IonicModule } from '@ionic/angular';

import { GroupItemsPage } from './group-items.page';

const routes: Routes = [
  {
    path: '',
    component: GroupItemsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableModule,
    DialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupItemsPage]
})
export class GroupItemsPageModule {}
