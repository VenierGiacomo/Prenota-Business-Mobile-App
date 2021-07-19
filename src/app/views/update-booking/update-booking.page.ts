import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController, PickerController, AlertController, Platform, ActionSheetController } from '@ionic/angular';

import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

import { NativeApiService } from '../../services/nativeapi.service';
import { PickDatePage } from '../../modals/pick-date/pick-date.page';
import { ServicesmodalPage } from '../../modals/servicesmodal/servicesmodal.page';
import { SelectclientmodalPage } from '../../modals/selectclientmodal/selectclientmodal.page';
import { Plugins } from '@capacitor/core';
import { ChangeDetectorRef } from '@angular/core';


const { Keyboard } = Plugins;
@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.page.html',
  styleUrls: ['./update-booking.page.scss'],
})
export class UpdateBookingPage implements OnInit {
  @Input() booking
  @Input() homeref
  desc=''
  client_name=''
  phone=''
  @Input()duration
  @Input()today
  day
  month
  @Input()time
  
  year
  minutes = ['00','15','30','45']
  hours = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
  days= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  years=[2020,2021,2022,2023,2024,2025]
  months=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  times =["06:00", "06:05", "06:10", "06:15", "06:20", "06:25", "06:30", "06:35", "06:40","06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  hours_list = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  half_list = [ "07:00",  "07:30", "08:00", "08:30",  "09:00",  "09:30",  "10:00",  "10:30",  "11:00", "11:30",  "12:00",  "12:30", "13:00",  "13:30", "14:00",  "14:30", "15:00", "15:15", "15:30", "16:00", "16:30", "17:00",  "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00"]
  time_duration: string[] = ["5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore","2 ore e 5 min", "2 ore e 10 min", "2 ore e 15 min","2 ore e 20 min", "2 ore e 25 min","2 ore e 30 min","2 ore e 35 min","2 ore e 40 min","2 ore e 45 min","2 ore e 50 min","2 ore e 55 min","3 ore","3 ore e 5 min", "3 ore e 10 min", "3 ore e 15 min","3 ore e 20 min", "3 ore e 25 min","3 ore e 30 min","3 ore e 35 min","3 ore e 40 min","3 ore e 45 min","3 ore e 50 min","3 ore e 55 min"];
  services:any =[]
  service:any = {name:"Seleziona"}
  quarter_displ
  five_displ
  actual_times=1
  @Input() client:any={'id':false,'client':1 }
  @Input() service_txt:any='Seleziona servizio'
  @Input() client_txt:any='Seleziona un cliente'
  keyboard_visible=false
  constructor(private cdr: ChangeDetectorRef,private actionSheetController: ActionSheetController,private ngZone:NgZone,private apiNative: NativeApiService,private plt: Platform,private alertController: AlertController,private modalController: ModalController, private pickerController: PickerController, private storage: StorageService,private api: ApiService) {}

async ngOnInit() {
  this.ngZone.run(async  () => {
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
    this.actual_times = 1
  }
}else{
  this.actual_times = 0
}
  })
setTimeout(async () => {

  var booking = this.booking
  this.service=booking.service_n  
  this.client={'id':booking.store_client,'client':booking.client}
  this.desc=booking.details
  this.client_name= booking.client_name

  this.phone= booking.phone

  this.day = booking.day
  this.month = booking.month
  this.year = booking.year

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
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my',
      header: 'Cellulare',
      subHeader: 'Non inserire il prefisso (+39)',
      message: 'Aggiungi il numero di telefono senza prefisso.\n\n Ad esempio 3312233645',
      buttons: ['OK']
    });
  }
  detect(){

    console.log('hit')
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
  async updateAppointment(){
 
    var start = this.times.indexOf(this.time)
    var end
    var details 
    var  res= await this.services.filter( x => x.id == this.service) 
    var service =res[0]
    if(this.service==-1){
       end = start + this.time_duration.indexOf(this.duration)+1
       details = this.desc
      
    }else{
      if(this.service==-3){
        service={id:-3}
        end = start + 12
        details = this.desc
      }else{
        end = start + this.time_duration.indexOf(this.duration)+1
        details = service.name    
      }
        
    }
    if(this.client_name==''||this.client_name==undefined){
      this.client_name='~'
    }
    if (this.plt.is('hybrid')) {
      this.apiNative.updateAppointment(this.booking.id, start, end, this.day, this.month, this.year,this.client_name,this.phone,details, this.booking.employee,service.id,'',this.client.client,this.client.id).then(
         (res) => {
          this.homeref.clearAppointment(this.booking.id, res.start_t, res.end_t, this.day, this.month, this.year,this.client_name,this.phone,details, this.booking.employee,service.id.toString(), this.booking.client,this.booking.note,this.booking.shop, this.booking.store_name,this.booking.store_phone,res.payed )
          this.homeref.drawAppointment(this.booking.id, res.start_t, res.end_t, details, this.client_name, this.booking.employee,service.id.toString(), this.day, 0, this.month, this.year,this.phone,res.payed)
                 
          this.homeref.presentToast('Appuntamento Modificato','succ')
          this.closeModal()}
   

        ).catch(
          err => {
            this.homeref.presentToast('Si è verificato un errore, riprova più tardi','err')
          })
      
    }
    else{
      this.api.updateAppointment(this.booking.id, start, end, this.day, this.month, this.year,this.client_name,this.phone,details, this.booking.employee,service.id,'',this.client.client,this.client.id).subscribe(
         (data) =>{
          this.homeref.clearAppointment(this.booking.id, data.start_t, data.end_t, this.day, this.month, this.year,this.client_name,this.phone,details, this.booking.employee,service.id.toString(), this.booking.client,this.booking.note,this.booking.shop, this.booking.store_name,this.booking.store_phone,res.payed)
          this.homeref.drawAppointment(this.booking.id, data.start_t, data.end_t, details, this.client_name, this.booking.employee, service.id.toString(), this.day, 0, this.month, this.year,this.phone,res.payed)
          
          this.homeref.presentToast('Appuntamento Modificato','succ')
           this.closeModal()
        },
        err =>{
          this.homeref.presentToast('Si è verificato un errore, riprova più tardi','err')
         
    })      
    }
     
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
      header: "Seleziona un cliente",
      
      buttons: buttons
    });
    await actionSheet.present();
  }
  async confirmDelete(){
    var buttons:Array<any>= [ {
      text: 'Cancella appuntamento',
      role: 'destructive',
      // icon: 'caret-forward-circle',
      handler: () => {
        setTimeout(() => {
         this.deleteAppointment()
        }, 100);
     
      }
    },  {
      text: 'Indietro',
      // icon: 'close',
      role: 'cancel',
    }]
    const actionSheet = await this.actionSheetController.create({
      // header: "Vuoi cancellare l'appuntamento?",
      
      buttons: buttons
    });
    await actionSheet.present();
  }

  async deleteAppointment(){
    var paras = document.getElementById(this.booking.id);
    paras.parentNode.removeChild(paras);
    if (this.plt.is('hybrid')) {
      this.apiNative.deleteAppointment(this.booking.id).then(
        async (res)  => {
          await this.closeModal()
          this.homeref.presentToast('Appuntamento cancellato','succ')
         }
        ).catch(
          err => console.log(err)) 
    }
    else{
      this.api.deleteAppointment(this.booking.id).subscribe(
        async  (res)=> {
          await this.closeModal()
          this.homeref.presentToast('Appuntamento cancellato','succ')
        },err =>{
          console.log(err)
         })
    }
  }

  async closeModal(){
    // if(this.plt.is('hybrid')){
    //   Keyboard.removeAllListeners() 
    //   }
    await this.modalController.dismiss();
  
  }
}
