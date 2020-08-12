import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Platform } from '@ionic/angular';
import { NativeApiService } from '../services/nativeapi.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  last_external:any = []
  day
  month
  spin="none"
  rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  constructor(private api: ApiService, private plt: Platform, private apiNative:NativeApiService) { 
    this.plt.ready().then(async ()=>{
      // await this.getAppointments()
    })
  }

ngOnInit() {
  var date = new Date()
    this.day =date.getDate()
    this.month =date.getMonth()
    var week = this.getWeekNumber(date)
    
    if (this.plt.is('hybrid')) {
      this.spin="block"
     this.apiNative.getAppointmentsExternal(week).then(
        data=>{
          this.last_external = data
          this.spin="none"
        }).catch(err=>{
          console.log(err)
        })
    }else{
      this.spin="block"
      this.api.getAppointmentsExternal(week).subscribe(
        data=>{
          this.last_external = data
          console.log(data)
          this.spin="none"
        },
        err=>{
          console.log(err)
        })
    }
  }
// async getAppointments(){
    
//   }
  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = +(new Date(Date.UTC(d.getUTCFullYear(),0,1)));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return  weekNo
  }
}
