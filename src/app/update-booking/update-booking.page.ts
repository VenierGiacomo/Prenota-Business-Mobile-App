import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PickerController, AlertController, Platform } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import Notiflix from "notiflix";
import { NativeApiService } from '../services/nativeapi.service';
@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.page.html',
  styleUrls: ['./update-booking.page.scss'],
})
export class UpdateBookingPage implements OnInit {
  @Input() booking
  @Input() homeref
  @Input() popref
  desc=''
  client_name=''
  phone=''
  duration=''
  today=''
  day
  month
  time
  splittedtime
  year
  minutes = ['00','15','30','45']
  hours = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
  days= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  years=[2020,2021,2022,2023,2024,2025]
  months=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  hours_list = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  time_duration: string[] = ["5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore","2 ore e 5 min", "2 ore e 10 min", "2 ore e 15 min","2 ore e 20 min", "2 ore e 25 min","2 ore e 30 min","2 ore e 35 min","2 ore e 40 min","2 ore e 45 min","2 ore e 50 min","2 ore e 55 min","3 ore","3 ore e 5 min", "3 ore e 10 min", "3 ore e 15 min","3 ore e 20 min", "3 ore e 25 min","3 ore e 30 min","3 ore e 35 min","3 ore e 40 min","3 ore e 45 min","3 ore e 50 min","3 ore e 55 min"];
  services:any =[]
  service:any = {name:""}
  
  constructor(private apiNative: NativeApiService,private plt: Platform,public alertController: AlertController,public modalController: ModalController, private pickerController: PickerController, private storage: StorageService,private api: ApiService) { }

ngOnInit() {
    setTimeout(async() => {
      this.services = await this.storage.getServices()
    if(this.booking.service==-1){
      this.service={name:"Personalizza", id:-1}
      this.desc=this.booking.details
    }else{
      for(let service of this.services){
        if (service.name==this.booking.details){
          this.service =service
        }
      }
      this.desc=this.booking.details
    }
    var dur = this.time_duration[this.booking.end-this.booking.start-1]
  
    this.duration = `${dur}`
    this.client_name= this.booking.name
    this.phone= this.booking.phone
    this.today= `${this.booking.day} ${this.months[this.booking.month]} ${this.booking.year}`
    this.day = this.booking.day
    this.month = this.booking.month
    this.year = this.booking.year
    this.time = this.hours_list[this.booking.start]
    this.splittedtime = this.time.split(':')
    }, 200);
    
   
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
  async selectService() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            this.service= value.service.value
          }
        }
      ],
      columns:[{
        name:'service',
        options:this.getServiceOptions()
      }]
    };
   
    let picker = await this.pickerController.create(options);
    picker.present()
  }
  async showDatePicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Chiudi",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            this.today= `${value.day.text} ${value.month.text} ${value.year.text}`
            this.day = value.day.text
            this.month = this.months.indexOf(value.month.text)
            this.year = value.year.text

          }
        }
      ],
      columns:[{
        name:'day',
        selectedIndex: Math.max(this.day-1, 0),
        options:this.getOptionsArrray(this.days)
      },
      {
        name:'month',
        selectedIndex: Math.max(this.month,0),
        options:this.getOptionsArrray(this.months)
      },
      {
        name:'year',
        selectedIndex: this.years.indexOf(this.year),
        options:this.getOptionsArrray(this.years)
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present()
  }
  updateAppointment(){
    this.closeModal()
    var start = this.hours_list.indexOf(this.time)
    var end
    var details
      
    if(this.service.id==-1){
       end = start + this.time_duration.indexOf(this.duration)+1
       details = this.desc
    }else{
       end = start + this.service.duration
       details = this.service.name      
    }
    if (this.plt.is('hybrid')) {
      this.apiNative.updateAppointment(this.booking.id, start, end, this.day, this.month, this.year,this.client_name,this.phone,details, this.booking.employee,this.service.id).then(
        res => {
          this.homeref.clearAppointment(this.booking.id)
          this.homeref.drawAppointment(this.booking.id, start, end, details, this.client_name, this.booking.employee, this.service.id, this.day, 0, this.month, this.year,this.phone)
          Notiflix.Notify.Init({ position:"center-bottom", success: {background:"#fff",textColor:"#0061d5",notiflixIconColor:"#0061d5",}, }); 
          Notiflix.Notify.Success('Appuntamento Modificato')}
        ).catch(
          err => console.log(err)) 
    }
    else{
      this.api.updateAppointment(this.booking.id, start, end, this.day, this.month, this.year,this.client_name,this.phone,details, this.booking.employee,this.service.id).subscribe(
        data =>{
          this.homeref.clearAppointment(this.booking.id)
          this.homeref.drawAppointment(this.booking.id, start, end, details, this.client_name, this.booking.employee, this.service.id, this.day, 0, this.month, this.year,this.phone)
          Notiflix.Notify.Init({ position:"center-bottom", success: {background:"#fff",textColor:"#0061d5",notiflixIconColor:"#0061d5",}, }); 
          Notiflix.Notify.Success('Appuntamento Modificato')
        },
        err =>{
          console.log(err)
    })      
    }
     
}

  getServiceOptions(){
    let options = [];
    this.services.forEach(x => {
      options.push({text:x.name,value:x});
    });
    options.push({text: "Personalizza", value:{id: -1, name: 'Personalizza'}})
    return options;
  }
  getOptionsArrray(array){
    let options = [];
    array.forEach(x => {
      options.push({text:x,value:x});
    });
    return options;
  }
  async showTimePicker(){
    let options: PickerOptions = {
      buttons: [
        {
          text: "Chiudi",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            this.time = `${value.hour.text}:${value.minute.text}`
          }
        }
      ],
      columns:[{
        name:'hour',
        selectedIndex: this.hours.indexOf(this.splittedtime[0]),
        options:this.getOptionsArrray(this.hours)
      },
      {
        name:'minute',
        selectedIndex: this.minutes.indexOf(this.splittedtime[1]),
        options:this.getOptionsArrray(this.minutes)
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present()
  }
  async showPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            this.duration= value.duration.value
          }
        }
      ],
      columns:[{
        name:'duration',
        options:this.getColumnOptions()
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present()
  }
  getColumnOptions(){
    let options = [];
    this.time_duration.forEach(x => {
      options.push({text:x,value:x});
    });
    return options;
  }
  async closeModal(){
    await this.popref.dismissPopover()
    await this.modalController.dismiss();
  }
}
