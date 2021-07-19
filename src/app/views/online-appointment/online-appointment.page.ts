import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { NativeApiService } from '../../services/nativeapi.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-online-appointment',
  templateUrl: './online-appointment.page.html',
  styleUrls: ['./online-appointment.page.scss'],
})
export class OnlineAppointmentPage implements OnInit {

  constructor(private storage: StorageService, private plt: Platform,private api:ApiService,private apiNative: NativeApiService) { }
 appointments
 show_appointments
 employees
 employess_name =new Object
 client_name_search
 months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
times =["06:00", "06:05", "06:10", "06:15", "06:20", "06:25", "06:30", "06:35", "06:40","06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  ngOnInit() {
  }
  ionViewDidEnter(){ 
 
    this.getAppointmentsExt()
  }
 async  getAppointmentsExt(){

    this.employees =await this.storage.getEmployees()
    for(let empl of this.employees){
      this.employess_name[empl.employee] = empl.name
    }
    console.log(this.employess_name)
    var now = new Date()
    var week = this.getWeekNumber(now) -1
    if(this.plt.is('hybrid')){
      this.apiNative.getAppointmentsExternal(week).then((res)=>{
      
        this.show_appointments =res
        this.appointments= res.map((val)=>{val.client_name =val.client_name.toLowerCase() 
        return val})
      }).catch(err=>{
        console.log(err)
      })

    }else{
      this.api.getAppointmentsExternal(week).subscribe(res=>{
      
        
        this.show_appointments =res
        this.appointments= res.map((val)=>{val.client_name =val.client_name.toLowerCase() 
          return val})
      },err=>{
        console.log(err)
      })
    }
  }
  call(appo){

    window.location.href="tel:+39"+appo.phone
  }
  async filterClients(){
    var x = this.client_name_search.toLowerCase()
    this.show_appointments = this.appointments.filter((val)=>{
      if(val.client_name.includes(x)){
        return val
      }
    })
  }
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
