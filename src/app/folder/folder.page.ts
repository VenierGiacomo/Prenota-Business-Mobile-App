import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { NewAppointmentPage } from '../new-appointment/new-appointment.page';
import { ApiService } from '../services/api.service';
import { PopoverController } from '@ionic/angular';
import { PopovercallComponent } from '../popovercall/popovercall.component';
import { StorageService } from '../services/storage.service';
import { NativeApiService } from '../services/nativeapi.service';
import { MonthviewPage } from '../monthview/monthview.page';
import Notiflix from "notiflix";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  // public folder: string;
  day
  all_appointments_list = []
  week = []
  employee:any ={ name:''}
  no_appointments = "none"
  appointments =[]
  currentPopover:any
  employees:any = []
  year =new Date().getFullYear()
  months_days=[31, ((this.year%4==0 && this.year%100!=0)|| this.year%400==0)? 29 :28, 31 , 30, 31, 30, 31, 31, 30, 31, 30, 31]
  months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  month = new Date().getMonth()
  month_name = this.months_names[this.month]
  times =["06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  hours = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  services:any = []
  constructor(private plt:  Platform, public modalController: ModalController, private api: ApiService, private apiNative: NativeApiService, private popoverController: PopoverController, private storage: StorageService, private router: Router) {
    this.plt.ready().then(() => {
      this.getservices()
      this.getEmployees()
      setTimeout(() => {
        this.getAppoitments()
     }, 500);
    })
   }

 async ngOnInit() {
    var now = new  Date()
    this.day = now.getDate()
    var today = now.getDay() -1
    var day_number = now.getDate()
    if (today == -1){
      today= 6
    }
    for (let i=0;i<7;i++){
      var day = day_number - today  + i
      this.week.push(day)
    }
    Notiflix.Block.Circle('.noti-lod', 'Scaricando appuntamenti...');


  //   await this.getEmployees()
  //   setTimeout(() => {
  //     this.getAppoitments()
  //  }, 500);

    
 }
  async presentModal(i) {
    const modal = await this.modalController.create({
      component:NewAppointmentPage,
      swipeToClose: true,
      cssClass: 'select-modal' ,
      componentProps: { 
        time: this.hours[i],
        day: this.day,
        month: this.month,
        year: this.year,
        homeref: this
      }
    });
    return await modal.present();
  }
  async presentMonth() {
    let modal = await this.modalController.create({
      component:MonthviewPage,
      swipeToClose: true,
      componentProps: { 
        homeref: this
      }
    });
    modal.onDidDismiss().then(() => {
      var paras = document.getElementsByClassName('task');
      while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
      } ​
      Notiflix.Block.Circle('.noti-lod', 'Scaricando appuntamenti...');
        this.getAppoitments()
     
  });
    return await modal.present();
  }
  async infoApp(ev, n) {
    this.currentPopover = await this.popoverController.create({
      component: PopovercallComponent,
      event: ev,
      translucent: true,
      componentProps: {homeref:this, n: n, employees: this.employees},
    });
    this.currentPopover.onDidDismiss().then((data) => {
      if(data.data == "name"){
        var paras = document.getElementsByClassName('task');
        while(paras[0]) {
          paras[0].parentNode.removeChild(paras[0]);
        } ​
        this.todayAppointments(this.day)
      }
      });
    return this.currentPopover.present();

  }

//  dismissPopover() {
//     if (this.currentPopover) {
//       this.currentPopover.dismiss().then(() => {
//         console.log('called')
//         this.todayAppointments(this.day)
//         this.currentPopover = null; });
//     }
//   }
  nextWeek(){
    Notiflix.Block.Circle('.noti-lod', 'Scaricando appuntamenti...');
    var paras = document.getElementsByClassName('task');
    while(paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    } ​
    var next_m = 0
    for (let day in this.week){
      if (this.week[day] +7 <= this.months_days[this.month]){
        this.week[day] +=7
      }
      else{
        if (this.week[day] +7 > this.months_days[this.month] && this.week[6] +7 <= this.months_days[this.month]){
          if (this.month == 0){
            this.week[day] =this.week[day] +7  -this.months_days[11]
            
          }else{
            this.week[day] =this.week[day] +7  -this.months_days[this.month-1]
          }
        }
        else{
          this.week[day] =this.week[day] +7  -this.months_days[this.month]
          next_m = 1
       
         
        }
      }
    }
    if(next_m == 1){
      if (this.month == 11){
        this.month =0
        this.year += 1
      }
      else{
        this.month +=1
      }
      
      next_m = 0
      this.month_name = this.months_names[this.month]
    }

    //get appointments
    this.day = this.week[0]
    this.getAppoitments()
  }  
  pastWeek(){
    Notiflix.Block.Circle('.noti-lod', 'Scaricando appuntamenti...');
    var paras = document.getElementsByClassName('task');
    while(paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    } ​
      var next_m = 0
    for (let day in this.week){
      if (this.week[day] > 7){
        this.week[day] -=7
      }
      else{
        if (this.week[day] < 7  && this.week[6] > 7){
        if (this.month == 0){
          this.week[day] = this.week[day] -7 +this.months_days[11]
        }
        else{
          this.week[day] = this.week[day] -7 +this.months_days[this.month-1]
        }
        }
        else{
          if (this.week[day] < 7  && this.week[0] > 7){
  
            if (this.month == 0){
              this.week[day] = this.week[day] -7 +this.months_days[11]
              next_m = 1
            }
            else{
              this.week[day] = this.week[day] -7 +this.months_days[this.month-1]
              next_m = 1
            }
           
          }
          else{
            this.week[day]= this.week[day] -7 +this.months_days[this.month-1]
            // next_m = 1
          }
         
         
        }
      }
    }
    if(next_m == 1){
      if (this.month == 0){
        this.month = 11
        this.year -= 1
      }
      else{
        this.month -=1
      }
     
      next_m = 0
      this.month_name = this.months_names[this.month]
    }
    //get appointments
    this.day = this.week[6]
    this.getAppoitments()
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
getAppoitments(){
    this.no_appointments = "none"
    this.appointments = []
    var date =new Date(this.year, this.month, this.day)
    var week = this.getWeekNumber(date)
    if (this.plt.is('hybrid')) {
      this.apiNative.getAppointments(week).then(
        res => {
                this.all_appointments_list = res 
                this.todayAppointments(this.day)}
             
        ).catch(
          err => console.log(err,'folder no appointemet')) 
    }
    else{
      this.api.getAppointments(week).subscribe(data =>{
        this.all_appointments_list = data 
        this.todayAppointments(this.day) 
      }, err =>{
        console.log('err', err)
      })
    }
    
  }
  getservices(){
    if (this.plt.is('hybrid')) {
      this.apiNative.getStoreservice(2).then(
        res => {
              this.services = res ;
              this.storage.setServices(res)
              console.log(res, 'stroage service')
        }).catch(
          err => console.log(err,'folder no service stroage')) 
    }
    else{
      this.api.getStoreservice(2).subscribe(
        data=>{this.services = data ; 
         this.storage.setServices(data)},
        err=>{console.log(err)})
    }
  }
  getEmployees(){
    if (this.plt.is('hybrid')) {
      this.apiNative.getEmployees().then(
        res => {
              this.employee = res[0]
              this.employees = res
              }
        ).catch(
          err => console.log(err)) 
    }
    else{
      this.api.getEmployees().subscribe(
        data=>{
          this.employee = data[0]
          this.employees = data
          this.getservices()
        },err=>{
          console.log(err)
        }
      )
    }
  }
  todayAppointments(day){
    var paras = document.getElementsByClassName('task');
    while(paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    } ​
    this.day = day
    setTimeout(() => {
      for (let appo of this.all_appointments_list){
        if (appo.day == day){
         this.drawAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year, appo.phone )
        }
      }
    }, 50);
    Notiflix.Block.Remove('.noti-lod')
  }
  drawAppointment(id, start, end, details, client_name, employee, service, day ,week, month, year, phone ){
    var height = end - start

    var div_height = ((height*10)-4)+'px'
    var div = document.createElement('div');
    div.style.margin = '2px auto'
    var self = this
    div.onclick = function(ev) {
      self.infoApp(ev, phone)
  };
    var color = 10000
  for (let service_el of this.services){
    if (service_el.id == service){
      color = service_el.color
    }
  }
    div.draggable =true
    div.classList.add('task','task--primary', `c${color}`) 
    div.id= id
    div.style.height =div_height
    div.innerHTML = `
                    <div class="task-details" id=${id}>${details}</div>
                    <div class="task-names" id=${id}>${client_name}</div>
                    `
    if (this.day == day &&  this.employee.employee ==employee){
        document.getElementById(start).append(div)
    }
  } 
  deleteAppointment(id){
    var paras = document.getElementById(id);
    paras.parentNode.removeChild(paras);
    if (this.plt.is('hybrid')) {
      this.apiNative.deleteAppointment(id).then(
        res => {
          console.log(res) }
        ).catch(
          err => console.log(err)) 
    }
    else{
      this.api.deleteAppointment(id).subscribe(
        data=> {
        },err =>{
          console.log(err)
         })
    }
  }
  viewMonth(){
    this.router.navigateByUrl('/monthview')
  }
  logout(){
    if (this.plt.is('hybrid')) {
    this.apiNative.deleteStorage()
    this.router.navigateByUrl('/login')
    } else{
    this.api.deleteStorage()
    this.router.navigateByUrl('/login')
    }
  }
}
