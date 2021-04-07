import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform, NavController, ActionSheetController, ToastController } from '@ionic/angular';
import { NewAppointmentPage } from '../new-appointment/new-appointment.page';
import { ApiService } from '../services/api.service';
import { PopoverController } from '@ionic/angular';
import { PopovercallComponent } from '../popovercall/popovercall.component';
import { StorageService } from '../services/storage.service';
import { NativeApiService } from '../services/nativeapi.service';
import { MonthviewPage } from '../monthview/monthview.page';
// import Notiflix from "notiflix";
import { IonContent } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { AppComponent } from '../app.component'
import { UpdateBookingPage } from '../update-booking/update-booking.page';
import { NotePage } from '../note/note.page';




@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  // public folder: string;
  day
  interval
  numbers:any
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
  absmonth = new Date().getMonth()
  month_name = this.months_names[this.month]
  times =["06:00", "06:05", "06:10", "06:15", "06:20", "06:25", "06:30", "06:35", "06:40","06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  hours = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  services:any = []
  norm_year
  quarter_displ =true
  five_displ =false
  is_sport
  spin="none"
  @ViewChild(IonContent, { static: false }) content: IonContent;
  constructor(private ngZone: NgZone,private toastController: ToastController,private actionSheetController: ActionSheetController, private badge: Badge,private navcomp: AppComponent, private oneSignal: OneSignal, private plt:  Platform, public modalController: ModalController, private api: ApiService, private apiNative: NativeApiService, private popoverController: PopoverController, private storage: StorageService, private router: Router) {
    this.plt.ready().then(() => {
      this.getservices()
      this.getEmployees()
      setTimeout(() => {
        this.getAppoitments()
     }, 500);
     if (this.plt.is('hybrid')){
      // this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 0});
    var self = this
      var notificationOpenedCallback =  function(jsonData) {
      

       
          var not_data =jsonData.notification.payload.additionalData
          if(not_data!=undefined && not_data!=null){
            var emplo = self.employees.filter((val)=>{return val.employee==not_data.employee})
            self.employee = emplo[0]
            var paras = document.getElementsByClassName('task');
            while(paras[0]) {
              paras[0].parentNode.removeChild(paras[0]);
            } 
            self.onNotRecieved(not_data)
            
          }
        
          
         
      };
      // Set your iOS Settings
      var iosSettings = {};
      iosSettings["kOSSettingsKeyAutoPrompt"] = false;
      iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
      this.oneSignal
        .startInit("b6e8e712-c4da-4a04-9379-1a3045d3ebdb",'773947626483')
        .handleNotificationOpened(notificationOpenedCallback) //.then(this.nav.navigateRoot("notifications"))
        .iOSSettings(iosSettings)
        .inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification)
        .endInit();
      
      // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
      this.oneSignal.promptForPushNotificationsWithUserResponse().then(function(accepted) {
      });
      this.oneSignal.setSubscription(true)
      this.oneSignal.handleNotificationReceived().subscribe(() => {
        this.updatebadge()
       });
       this.plt.pause.subscribe(()=>{
        clearInterval(this.interval);
       })
       this.plt.resume.subscribe(()=>{
         this.getAppoitments()
        clearInterval(this.interval);
        this.interval =setInterval(()=>{
          this.getAppoitments()
              },300000)
       })
    }
    });
    
  }
// ionViewDidEnter(){ 
//     this.getservices()
//     this.getEmployees()
//     setTimeout(() => {
//       this.getAppoitments()
//   }, 500);
// }

 async ngOnInit() {
 
  this.norm_year=this.year
  var now = new  Date()
  var today = now.getDay() -1
  var month = now.getMonth()
  var day_number = now.getDate()
  this.day=day_number
  if (today == -1){
    today= 6
  }
  for (let i=0;i<7;i++){
    if( day_number - today  + i<= this.months_days[month]){
      var day = day_number - today  + i
      if(day<1){
      day= day +this.months_days[month-1]
      }
    }else{
      var day = day_number - today  + i - this.months_days[month]
    }
    this.week.push(day)
  }
  if(this.week[6]<this.week[0] && day_number>20){
    if(this.month==11){
      this.month=0
        this.month_name=this.months_names[0]
    }else{
      this.month=month+1
      this.month_name=this.months_names[month+1]
    }

  }
  var store_info = await this.storage.getstore()
  this.is_sport =  store_info.business_type==7
  if(store_info.custom_size){

    // this.table_line_heigth =store_info.table_line_heigth
    this.quarter_displ = store_info.quarter_displ
    this.five_displ = store_info.five_displ
    // this.table_font_size = store_info.table_font_size
  }
  // this.five_displ=false
  if(this.quarter_displ){
    if(!this.five_displ){
      
      for(let ind in this.times){
        var el
        if((+ind)%3!=0){
          el = document.getElementById(ind+'-')
          if(el!=null){
            el.style.display='none'
          }
         
        }
      }
    }
  }else{
    for(let ind in this.times){
      if(+ind%6!=0){
        el =  document.getElementById(ind+'-')
        if(el!=null){
          el.style.display='none'
        }
      }
    }
  }

  // this.spin="block"
  if (this.plt.is('hybrid')){
    this.oneSignal.getIds().then(data =>{
      this.apiNative.registerdevice(data.userId).then(data =>{
    
      })
    })
  }
    this.interval =setInterval(()=>{
      this.getAppoitments()
        },300000)

 }
 public updatebadge(){
  this.badge.set(1);
 }
  async presentModal(i,ev) {
  if(ev.target.id>210){
this.updateBooking(ev.target.id)
  }else{


    clearInterval(this.interval);
    if(this.week[6]<this.week[0] && this.day>7){
      if(this.month==0){
        const modal = await this.modalController.create({
          component:NewAppointmentPage,
          swipeToClose: true,
          cssClass: 'select-modal' ,
          componentProps: { 
            time: this.times[i],
            day: this.day,
            month: 11,
            year: this.year,
            homeref: this
          }
        });
        return await modal.present();
      }else{

 
      const modal = await this.modalController.create({
        component:NewAppointmentPage,
        swipeToClose: true,
        cssClass: 'select-modal' ,
        componentProps: { 
          time: this.times[i],
          day: this.day,
          month: this.month-1,
          year: this.year,
          homeref: this
        }
      });
      return await modal.present();
    }
    }else if(this.week[6]<this.week[0] && this.day<7){
      const modal = await this.modalController.create({
        component:NewAppointmentPage,
        swipeToClose: true,
        cssClass: 'select-modal' ,
        componentProps: { 
          time: this.times[i],
          day: this.day,
          month: this.month,
          year: this.year,
          homeref: this
        }
      });
      return await modal.present();
    }
    else{
      const modal = await this.modalController.create({
        component:NewAppointmentPage,
        swipeToClose: true,
        cssClass: 'select-modal' ,
        componentProps: { 
          time: this.times[i],
          day: this.day,
          month: this.month,
          year: this.year,
          homeref: this
        }
      });
      return await modal.present();
    }
  }
  }
  async updateBooking(id){ 
    var appo = this.all_appointments_list.filter( x => x.id == id)[0]
    const modal = await this.modalController.create({
    component:UpdateBookingPage,
    swipeToClose: true,
    cssClass: 'select-modal' ,
    componentProps: { 
     booking:appo,
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
    //  this.spin="block"
        this.getAppoitments()
     
  });
    return await modal.present();
  }
  async infoApp(ev, lt_appo) {
    var appo =lt_appo 
    if(lt_appo!=-1){
       appo = this.all_appointments_list.filter( x => x.id == lt_appo.id)[0]
    }
    var buttons:Array<any>= [{
      text: 'Chiama',
      // icon: 'share',
      handler: () => {
        window.location.href="tel:+39"+lt_appo.phone
      }
    }, {
      text: 'Modifica appuntamento',
      // icon: 'caret-forward-circle',
      handler: () => {
        setTimeout(() => {
          this.updateBooking(lt_appo.id)
        }, 100);
     
      }
    }, 
     {
      text: 'Visualizza nota',
      // icon: 'caret-forward-circle',
      handler: () => {
        setTimeout(() => {
          this.noteModal(appo)
        }, 100);
     
      }
  } ,
     {
      text: 'Elimina appuntamento',
      // icon: 'heart',
      role: 'destructive',
      handler:  () => {
        this.deleteAppointment(lt_appo.id)
        this.all_appointments_list = this.all_appointments_list.filter(x => x.id != lt_appo.id )


      }
    }, {
      text: 'Indietro',
      // icon: 'close',
      role: 'cancel',
    }]
    const actionSheet = await this.actionSheetController.create({
      header: "Gestisci appuntamento",
      
      buttons: buttons
    });
    await actionSheet.present();
    

  }
async noteModal(appo){
  const modal = await this.modalController.create({
    component:NotePage,
    swipeToClose: true,
    cssClass: 'note-modal' ,
    componentProps: { 
     homeref:this,
     appointment:appo,
     note:appo.note
    }
  });
  return await modal.present();
}
 dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => {
       
        this.todayAppointments(this.day)
        this.currentPopover = null; });
    }
  }
  
  nextWeek(){
  
    //remove last week appoitments
    
    var day_of_week = this.week.indexOf(this.day)
    if(day_of_week == 6){
      var paras = document.getElementsByClassName('task');
    while(paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    } ​
    // this.spin="block"
    //change dates
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
      this.norm_year=this.year
    }
    else{
      this.month +=1
    }
    
    next_m = 0
    this.month_name = this.months_names[this.month]
  }
    this.day = this.week[0]
    // console.log(this.day,this.month_name,this.year)
    setTimeout(() => {
    this.getAppoitments()
    // console.log(this.day,this.month_name,this.year)
  }, 100);
}else{
  this.todayAppointments(this.week[day_of_week+1])
}
  // console.log(this.day,this.month_name,this.year)
  }  
    //get appointments
    
    pastWeek(){
      var day_of_week = this.week.indexOf(this.day)
      if(day_of_week == 0){
      //remove last week appoitments
      var paras = document.getElementsByClassName('task');
      while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
      } ​
      //change dates
      setTimeout(() => {
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
              if(this.month==0){
                this.week[day] = this.week[day] -7 +this.months_days[11]
              }else{
                this.week[day] = this.week[day] -7 +this.months_days[this.month-1]
              }
              
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
                if(this.month==0){
                this.week[day]= this.week[day] -7 +this.months_days[11]
                }else{
                  this.week[day]= this.week[day] -7 +this.months_days[this.month-1]
                }
                // next_m = 1
              }
             
             
            }
          }
        }
        if(next_m == 1){
          if (this.month == 0){
            this.month = 11
            this.year = this.norm_year -1
            this.norm_year=this.year
          }
          else{
            this.month -=1
          }
         
          next_m = 0
          this.month_name = this.months_names[this.month]
        }
  this.day = this.week[6]
  //get appointments
      this.getAppoitments()
      }, 100);
      
    }else{
      this.todayAppointments(this.week[day_of_week-1])
    }
    }  
    
    onNotRecieved(data){
      this.ngZone.run(() => {
      this.month=data.month
      this.year=data.year
      this.day=data.day
         
      var now = new  Date(this.year, this.month, this.day)

       var today = now.getDay() -1
       var day_number = now.getDate()
       if (today == -1){
         today= 6
       }
       var week =[]
       for (let i=0;i<7;i++){
         var day_n = day_number - today  + i
         if (day_n > this.months_days[(this.month)%12]){
          day_n =day_n-this.months_days[(this.month)%12]
         }
         if(day_n <1){
          day_n =this.months_days[(this.month-1)]+day_n
         }
         week.push(day_n)
       }
       this.week= week
       this.month_name =  this.months_names[this.month]
       var paras = document.getElementsByClassName('task');
        while(paras[0]) {
          paras[0].parentNode.removeChild(paras[0]);
        } ​
      //  this.spin="block"
          
       setTimeout(() => {​
        var y
        if(this.quarter_displ){
          if(!this.five_displ){
            y =(data.start-2)*10
            this.content.scrollToPoint(0,y,400)
          }else{
            y =(data.start-2)*30
            this.content.scrollToPoint(0,y,400)
          }
        }else{
          y =(data.start-2)*5
            this.content.scrollToPoint(0,y,400)
        }
      
       
        this.getAppoitments()
        // this.todayAppointments(this.day)
        
      // self.spin="none"
      // self.navcomp.navigateNotifications()
    }, 800);

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
getAppoitments(){
    this.no_appointments = "none"
    this.appointments = []
    var week 
    
    if(this.week[6]<this.week[0]){
      if(this.month==0){
        week = 53
      }else{
        
        week = this.getWeekNumber(new Date(this.year, this.month-1, this.week[0]))
      }
      
    }else{
      
      week = this.getWeekNumber(new Date(this.year, this.month, this.week[0]))
    }
    if (this.plt.is('hybrid')) {
      this.apiNative.getAppointments(week).then(
        res => {
          
                this.all_appointments_list = res 
                this.todayAppointments(this.day)}
             
        ).catch(
          err => {
            // this.spin="none"
            this.presentToast('Problema nello scaricare gli appuntamenti','err')
         })
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
      this.apiNative.getStoreservice().then(
        res => {
              this.services = res ;
              this.storage.setServices(res)
        }).catch(
          err => {
            // this.spin="none"
            this.presentToast('Problema nello scaricare gli appuntamenti','err')})
    }
    else{
      this.api.getStoreservice().subscribe(
        data=>{this.services = data ; 
         this.storage.setServices(data)},
        err=>{console.log(err)})
    }
  }
  getEmployees(){
    if (this.plt.is('hybrid')) {
      this.apiNative.getEmployees().then(
        res => {
          this.storage.setEmployees(res)
              this.employee = res[0]
              this.employees = res
              }
        ).catch(
          err => {
            // this.spin="none"
            this.presentToast('Problema nello scaricare gli appuntamenti','err')})
    }
    else{
      this.api.getEmployees().subscribe(
        data=>{
          this.storage.setEmployees(data)
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
    if(day > this.week[6]){
      if(this.month==0){
        this.month_name= this.months_names[11]
        this.year=this.norm_year
      }else{
        this.month_name= this.months_names[this.month-1]
        this.year=this.norm_year
      }
   
      // this.month=this.absmonth
    }else{
      if(this.month==0){
        this.month_name= this.months_names[this.month]
        // this.month_name= this.months_names[11]
        this.year=this.norm_year
      }else{
        this.month_name= this.months_names[this.month]
        this.year=this.norm_year
      }
   
      // this.month=this.absmonth+1
    }
    setTimeout(() => {
      for (let appo of this.all_appointments_list){
        if (appo.day == day){
         this.drawAppointment(appo.id, appo.start_t, appo.end_t, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year, appo.phone, appo.note,appo.payed )
        }
      }
    }, 50);
    
  }
  drawAppointment(id, start, end, details, client_name, employee, service, day ,week, month, year, phone, note,payed ){
    var height = end - start
    if(this.quarter_displ){
      var div_height = (height*10)-4+'px'
      if(this.five_displ){
        var div_height = (height*30)-4+'px'
      }
    }else{
    
      var div_height = (height*5)-4+'px'
      
      
    }
  
    var div = document.createElement('div');
    div.style.margin = '2px auto'
    var self = this
    var has_note = false
    if(note!='' && note!=null&& note!=undefined){
      has_note = true
    }
    var pass_data={
      id: id,
      phone: phone,
      name: client_name,
      start: start,
      end: end,
      day:day,
      month: month,
      year: year,
      details:details,
      service: service,
      employee:employee

    }
    div.onclick = function(ev) {
      self.infoApp(ev, pass_data)
  };
  
 

    var color = 10000
  for (let service_el of this.services){
    if (service_el.id == service){
      color = service_el.color
    }
  }
  if (service == -1){
    color = 6
  }
    div.classList.add('task','task--primary', `c${color}`) 
    div.id= id
    div.style.zIndex='10'
    div.style.height =div_height
    if(has_note){
      if(payed){
        div.innerHTML = `
        <ion-icon  style='position:absolute; right:5px; font-size:16px; top:5px;' name="information-circle-outline"></ion-icon>
        <div class="task-details" id=${id}> ${details} </div>
        <div class="task-names" id=${id}>${client_name} <ion-icon name="checkmark-circle-outline" style='font-size:16px; margin-bottom: -3px;'></ion-icon>   </div>
        `
      }else{
        div.innerHTML = `
        <ion-icon  style='position:absolute; right:5px; font-size:16px; top:5px;' name="information-circle-outline"></ion-icon>
        <div class="task-details" id=${id}> ${details} </div>
        <div class="task-names" id=${id}>${client_name}</div>
        `
      }
     
    }else{
      if(payed){
        div.innerHTML = `
        <div class="task-details" id=${id}> ${details} </div>
        <div class="task-names" id=${id}>${client_name} <ion-icon name="checkmark-circle-outline" style='font-size:16px; margin-bottom: -3px;'></ion-icon>   </div>
        `
      }else{
        div.innerHTML = `
        <div class="task-details" id=${id}> ${details} </div>
        <div class="task-names" id=${id}>${client_name}</div>
        `
      }
    }
    
    if (this.day == day &&  this.employee.employee ==employee){
      var div_parent = document.getElementById(start)
      if(div_parent!=null && div_parent!=undefined){
        div_parent.append(div)
      }else{
        console.log(div.id)
      }
       
    }
  } 
  // allowDrop(ev) { 
  //   ev.preventDefault();
  // }
  // drag(ev) {
  //   console.log(ev, ev.dataTransfer)
  //   // ev.preventDefault();
  //   // function preventDefault(e) {
  //   //   e.preventDefault();
  //   // }
  //   var el = document.getElementById(ev.target.id)
  //   el.style.zIndex='0'
  //   ev.dataTransfer.setData("height", ev.srcElement.scrollHeight);
  //   ev.dataTransfer.setData("text", ev.target.id);
  //   console.log(el)
  //   // el.style.position='absolute'
  //   // window.addEventListener('touchmove', ev=>{
     
  //   //  el.style.left = ev.changedTouches[0].pageX+'px'
  //   //  el.style.top = ev.changedTouches[0].pageY+'px'
  //   // }, false);

   

   
  // }
  // async drop(ev) {
  //   console.log(ev)
  //   // ev.preventDefault();
   
 
   
  // }
  deleteAppointment(id){
    var paras = document.getElementById(id);
    paras.parentNode.removeChild(paras);
    if (this.plt.is('hybrid')) {
      this.apiNative.deleteAppointment(id).then(
        res => {
          this.presentToast('Appuntamento cancellato','succ')
         }
        ).catch(
          err => console.log(err)) 
    }
    else{
      this.api.deleteAppointment(id).subscribe(
        data=> {
          this.presentToast('Appuntamento cancellato','succ')
        },err =>{
          console.log(err)
         })
    }
  }
  async clearAppointment(id, start_t, end_t, day, month, year, client_name, phone,details, employee,service,client,note,shop,store_name, store_phone,payed){
    var paras = document.getElementById(id);
    paras.parentNode.removeChild(paras);
    var week = this.getWeekNumber(new Date(year,month,day))
    this.all_appointments_list = await this.all_appointments_list.filter( x => x.id != id) 
    this.all_appointments_list.push(
    {
    client: client,
    client_name: client_name,
    day: day,
    details: details,
    employee: employee,
    end_t: end_t,
    id: id,
    location: null,
    month: month,
    note: note,
    phone: phone,
    service_n: service,
    shop: shop,
    start_t: start_t,
    store_name: store_name,
    store_phone:store_phone,
    week:week,
    year: year,
    payed:payed
    }
    )
    console.log(this.all_appointments_list)
  }

  async presentClientActionSheet(){
    var buttons = []
    for(let  empl of this.employees){
      var button={
      text: empl.name,
      
      handler: () => {
       this.employee = empl
       var paras = document.getElementsByClassName('task');
       while(paras[0]) {
         paras[0].parentNode.removeChild(paras[0]);
       } ​
       this.todayAppointments(this.day)
      }
    }
    buttons.push(button)
    }
    buttons.push( {
      text: 'Annulla',
      // icon: 'close',
      role: 'cancel',
    })
    var head = this.is_sport?  'Campo' :"Collaboratore"
    var actionSheet = await this.actionSheetController.create({
      header: head,
      
      buttons: buttons
    });
    await actionSheet.present();
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

  goToday(){
  var now = new  Date()
  var today = now.getDay() -1
  var month = now.getMonth()
  var day_number = now.getDate()
  this.day=day_number
  this.week=[]
  if (today == -1){
    today= 6
  }
  for (let i=0;i<7;i++){
    if( day_number - today  + i<= this.months_days[month]){
      var day = day_number - today  + i
      if(day<1){
      day= day +this.months_days[month-1]
      }
    }else{
      var day = day_number - today  + i - this.months_days[month]
    }
    this.week.push(day)
  }
  this.getAppoitments()
  if(this.week[6]<this.week[0] && day_number>20){
    if(this.month==11){
      this.month=0
        this.month_name=this.months_names[0]
    }else{
      this.month=month+1
      this.month_name=this.months_names[month+1]
    }

  }
  this.todayAppointments(this.week[today])
  }
  async presentToast(text,type) {
    if(type=='succ'){
      const toast = await this.toastController.create({
        message: text,
        position: 'top',
        duration: 2500,
        cssClass:'toast-class',
      });
      toast.present();
    }else{
      if(type=='warn'){
      const toast = await this.toastController.create({
        message: text,
        position: 'top',
        duration: 2500,
        cssClass:'toast-warn-class',
      });
      toast.present();
    }else{
        const toast = await this.toastController.create({
          message: text,
          position: 'top',
          duration: 2500,
          cssClass:'toast-err-class',
        });
        toast.present();
    }
    }
    
  }
}
