import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActionSheetController, ModalController, PickerController, Platform, ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { NativeApiService } from '../services/nativeapi.service';
import { AlertController } from '@ionic/angular';
import { PickDatePage } from '../pick-date/pick-date.page';
import { ServicesmodalPage } from '../servicesmodal/servicesmodal.page';
import { SelectclientmodalPage } from '../selectclientmodal/selectclientmodal.page';
import { Plugins } from '@capacitor/core';



const { Keyboard } = Plugins;
@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.page.html',
  styleUrls: ['./new-appointment.page.scss'],
})
export class NewAppointmentPage implements OnInit {
  duration= "1 ora"
  @Input() year :any=''
  @Input() month :any=''
  @Input() day:any=''
  services:any =[]
  @Input() today:any='Seleziona una data'
  service_txt ='Seleziona un servizio '
  client_txt='Seleziona un cliente'
  phone
  desc = ''
  @Input() homeref
  @Input() time ='09:00'
  client_name=''
  client:any={'id':false,'client':1 }
  minutes = ['00','15','30','45']
  hours = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
  service:any = {name:"Seleziona"}
  quarter_displ = true
  five_displ =false
  actual_times  =1
  keyboard_visible=false
  days= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  months=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  years=[2020,2021,2022,2023,2024,2025]
  times =["06:00", "06:05", "06:10", "06:15", "06:20", "06:25", "06:30", "06:35", "06:40","06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  hours_list = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  half_list = [ "07:00",  "07:30", "08:00", "08:30",  "09:00",  "09:30",  "10:00",  "10:30",  "11:00", "11:30",  "12:00",  "12:30", "13:00",  "13:30", "14:00",  "14:30", "15:00", "15:15", "15:30", "16:00", "16:30", "17:00",  "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00"]
  time_duration: string[] = ["5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore"];
  // time_duration: string[] = ["5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore"];
  constructor(private actionSheetController: ActionSheetController, private ngZone: NgZone,private toastController: ToastController, private alertController: AlertController, private plt: Platform, private apiNative: NativeApiService, private modalController: ModalController, private storage: StorageService, private api: ApiService) {

    
  }
  
  async ngOnInit() {
    
    var store_info = await this.storage.getstore()
    if(store_info.custom_size){

    // this.table_line_heigth =store_info.table_line_heigth
    this.quarter_displ = store_info.quarter_displ
    this.five_displ = store_info.five_displ
    // this.table_font_size = store_info.table_font_size
  }
  if(this.quarter_displ){
    if(this.five_displ){
      this.actual_times = 2
    }else{
      this.actual_times =1
    }
  }else{
    this.actual_times = 0
  }
setTimeout(async ()=>{
  this.services = await this.storage.getServices()
  this.services.push({
    color: 1,
    duration: 6,
    duration_book: 6,
    id: "-1",
    max_n: 1,
    name: "Personalizza",
    price: 0,
    sex: 3,
    })
},400)
Keyboard.addListener('keyboardWillShow',(res)=>{
  this.ngZone.run(()=>{
    this.keyboard_visible=true
  })

  })
  Keyboard.addListener('keyboardDidHide',()=>{
  this.ngZone.run(()=>{
    this.keyboard_visible=false
  })
  })

  }



async showDatePicker() {
    let modal = await this.modalController.create({
      component:PickDatePage,
      swipeToClose: true,
      componentProps:{
        today: this.day,
        month_passed: this.month,
      }
    });
    modal.onDidDismiss().then((res) => {
      if(res.data.selected){
        this.day =res.data.day
        this.month =res.data.month
        this.year= res.data.year
      }
    
      this.today=`${ this.day} ${this.months[this.month]} ${this.year}`
   
  });
    return await modal.present();
}

async choseCLient(){
  var buttons:Array<any>= [{
    text: 'Nuovo Cliente',
    // icon: 'share',
    handler: () => {
     this.client_txt='Nuovo cliente'
     this.client={'id':false,'client':1 }
    }
  }, {
    text: 'Cliente esistente',
    // icon: 'caret-forward-circle',
    handler: () => {
      setTimeout(() => {
       this.selectClinetModal()
      }, 100);
   
    }
  },  {
    text: 'Indietro',
    // icon: 'close',
    role: 'cancel',
  }]
  const actionSheet = await this.actionSheetController.create({
    header: "Seleziona Client",
    
    buttons: buttons
  });
  await actionSheet.present();
}

async closeShop(){
  var buttons:Array<any>= [{
    text: "Chiudi un' ora",
    // icon: 'share',
    handler: () => {
      this.newAppointment(1)
    }
  }, {
    text: "Chiudi tutto il giorno",
    // icon: 'caret-forward-circle',
    handler: () => {
      this.newAppointment(2)
   
    }
  },  {
    text: 'Indietro',
    // icon: 'close',
    role: 'cancel',
  }]
  const actionSheet = await this.actionSheetController.create({
    header: "Vuoi chiudere?",
    
    buttons: buttons
  });
  await actionSheet.present();
}

 async selectServiceModal(){

    let modal = await this.modalController.create({
      component:ServicesmodalPage,
      swipeToClose: true,
      componentProps:{
        homeref: this,
      }
    });
   return await modal.present();
  }
async selectClinetModal(){

    let modal = await this.modalController.create({
      component:SelectclientmodalPage,
      swipeToClose: true,
      componentProps:{
        homeref: this,
      }
    });
   return await modal.present();
  }

async closeModal(){
    if(this.plt.is('hybrid')){
    Keyboard.removeAllListeners() 
    }
    await this.modalController.dismiss();
}

async newAppointment(type){
    if(this.service.name == "Seleziona" && type==0){
      this.presentToast('Seleziona un serivizio','warn')
        return
     }else{
      await  this.closeModal()
      var star = this.times.indexOf(this.time)
      var employee =this.homeref.employee.employee
      var end
      var details
      var service 
      if(type==0){
        if(this.service==-1){
         end = star + this.time_duration.indexOf(this.duration)  +1
         details = this.desc
        }else{
         service= this.services.filter( x => x.id == this.service) 
         end = star + this.time_duration.indexOf(this.duration)  +1
         details = service[0].name
        }
      }else{
       if(type==2){
         this.service = -2
         star=0
         end =204
         this.client_name="Chiuso"
         details = "Chiuso"
       }else{
         if(type==1){
           this.service = -3
           end = star+12
           this.client_name="Chiuso"
           details = "Chiuso"
         }
       }
      }
       
      
       
       
       if(this.client_name=='' || this.client_name==undefined){
         this.client_name='~'
       }
       if (this.plt.is('hybrid')) {
        // this.api.bookAppointment( start, end, day, month, year, client_name, this.phone, details, employee, service, this.client_id, adons, this.client.id).subscribe()
         this.apiNative.bookAppointment(star, end, this.day, this.month, this.year, this.client_name, this.phone, details, employee, this.service, this.client.client,[],this.client.id).then(
           (res:any) => {
            this.presentToast('Appuntamento registrato','succ')
            var appo ={id:res.id, star_t:star, end_t:end, details:details, client_name:this.client_name, employee:employee, service_n:this.service, day:this.day, week:res.week, month:this.month, year:this.year,phone:this.phone,note:''}
             this.homeref.drawAppointment(res.id, star, end, details, this.client_name, employee, this.service, this.day, 0, this.month, this.year,this.phone,'',false)
            
             
             
             
              this.homeref.all_appointments_list.push(res)
           
           }).catch(
             err =>     this.presentToast("C'è stato un errore durante il salvataggio",'warn')) 
       }
       else{
         this.api.bookAppointment(star, end, this.day, this.month, this.year, this.client_name, this.phone, details, employee, this.service,this.client.client,[],this.client.id).subscribe(
           data =>{
            this.presentToast('Appuntamento registrato','succ')
             this.homeref.drawAppointment(data.id, star, end, details, this.client_name, employee, this.service, this.day, 0, this.month, this.year,this.phone,'',false)          
          
          
             this.homeref.all_appointments_list.push(data)
           },
           err =>{console.log(err)})
       }  
     }
         
  }


parseJwt = (token) => {
try {
  return JSON.parse(atob(token.split('.')[1]));
} catch (e) {
  return null;
}
};
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
