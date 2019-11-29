import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), canActivate: [NoAuthGuard] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule', canActivate: [AuthGuard] },
  { path: 'contact-us', loadChildren: './contact-us/contact-us.module#ContactUsPageModule', canActivate: [AuthGuard] },
  { path: 'friends', loadChildren: './friends/friends.module#FriendsPageModule', canActivate: [AuthGuard] },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule', canActivate: [NoAuthGuard]},
  { path: 'group-items/:id', loadChildren: './group-items/group-items.module#GroupItemsPageModule', canActivate: [AuthGuard]},
  { path: 'createGroup', loadChildren: './create-group/create-group.module#CreateGroupPageModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
