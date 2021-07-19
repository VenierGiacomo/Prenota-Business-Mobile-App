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
    loadChildren: () => import('./views/folder/folder.module').then( m => m.FolderPageModule), 
     canActivate: [AuthguardService]
  },
  // {
  //   path: 'notifications',
  //   loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule), 
  //    canActivate: [AuthguardService]
  // },
  {
    path: 'new-appointment',
    loadChildren: () => import('./views/new-appointment/new-appointment.module').then( m => m.NewAppointmentPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'monthview',
    loadChildren: () => import('./views/monthview/monthview.module').then( m => m.MonthviewPageModule),
  },
  {
    path: 'update-booking',
    loadChildren: () => import('./views/update-booking/update-booking.module').then( m => m.UpdateBookingPageModule)
  },
  // {
  //   path: 'notifications',
  //   loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  // },
  // {
  //   path: 'scan',
  //   loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule)
  // },
  {
    path: 'pick-date',
    loadChildren: () => import('./modals/pick-date/pick-date.module').then( m => m.PickDatePageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./views/clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'invita-modal',
    loadChildren: () => import('./modals/invita-modal/invita-modal.module').then( m => m.InvitaModalPageModule)
  },
  {
    path: 'register-client',
    loadChildren: () => import('./modals/register-client/register-client.module').then( m => m.RegisterClientPageModule)
  },
  {
    path: 'online-appointment',
    loadChildren: () => import('./views/online-appointment/online-appointment.module').then( m => m.OnlineAppointmentPageModule)
  },
  {
    path: 'note',
    loadChildren: () => import('./modals/note/note.module').then( m => m.NotePageModule)
  },

  {
    path: 'servicesmodal',
    loadChildren: () => import('./modals/servicesmodal/servicesmodal.module').then( m => m.ServicesmodalPageModule)
  },
  {
    path: 'selectclientmodal',
    loadChildren: () => import('./modals/selectclientmodal/selectclientmodal.module').then( m => m.SelectclientmodalPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./views/folder/folder.module').then( m => m.FolderPageModule), 
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
