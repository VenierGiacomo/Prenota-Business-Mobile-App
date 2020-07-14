import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
  },
  {
    path: 'calendar',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule), 
     canActivate: [AuthguardService]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule), 
     canActivate: [AuthguardService]
  },
  {
    path: 'new-appointment',
    loadChildren: () => import('./new-appointment/new-appointment.module').then( m => m.NewAppointmentPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'monthview',
    loadChildren: () => import('./monthview/monthview.module').then( m => m.MonthviewPageModule),
  },
  {
    path: 'update-booking',
    loadChildren: () => import('./update-booking/update-booking.module').then( m => m.UpdateBookingPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
