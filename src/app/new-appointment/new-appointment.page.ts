import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PickerController, Platform } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { NativeApiService } from '../services/nativeapi.service';
import { AlertController } from '@ionic/angular';
import Notiflix from "notiflix";
import { PickDatePage } from '../pick-date/pick-date.page';
@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.page.html',
  styleUrls: ['./new-appointment.page.scss'],
})
export class NewAppointmentPage implements OnInit {
  duration= '5 min'
  year
  month
  day
  services:any =[]
  today
  time
  phone
  desc = ''
  @Input() homeref
  client_name=''
  minutes = ['00','15','30','45']
  hours = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
  service:any = {name:"Seleziona"}
  days= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  months=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  years=[2020,2021,2022,2023,2024,2025]
  hours_list = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  time_duration: string[] = ["5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore"];
  // time_duration: string[] = ["5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore"];
  constructor(public alertController: AlertController, private plt: Platform, private apiNative: NativeApiService, public modalController: ModalController,private pickerController: PickerController, private storage: StorageService, private api: ApiService) {}

  async ngOnInit() {
    this.today= `${this.day} ${this.months[this.month]} ${this.year}`
      this.services = await this.storage.getServices()
      this.services.push({
        color: 1,
        duration: 6,
        duration_book: 6,
        id: -1,
        max_n: 1,
        name: "Personalizza",
        price: 0,
        sex: 3,
        })
        this.service.id =-1
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my',
      header: 'Cellulare',
      subHeader: 'Non inserire il prefisso (+39)',
      message: 'Aggiungi il numero di telefono senza prefisso.\n\n Ad esempio 3312233645',
      buttons: ['OK']
    });

    await alert.present();
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
    // let options: PickerOptions = {
    //   buttons: [
    //     {
    //       text: "Chiudi",
    //       role: 'cancel'
    //     },
    //     {
    //       text:'Ok',
    //       handler:(value:any) => {
    //         this.today= `${value.day.text} ${value.month.text} ${value.year.text}`
    //         this.day = value.day.text
    //         this.month = this.months.indexOf(value.month.text)
    //         this.year = value.year.text

    //       }
    //     }
    //   ],
    //   columns:[{
    //     name:'day',
    //     selectedIndex: Math.max(this.day-1, 0),
    //     options:this.getOptionsArrray(this.days)
    //   },
    //   {
    //     name:'month',
    //     selectedIndex: Math.max(this.month,0),
    //     options:this.getOptionsArrray(this.months)
    //   },
    //   {
    //     name:'year',
    //     selectedIndex: this.years.indexOf(this.year),
    //     options:this.getOptionsArrray(this.years)
    //   }]
    // };

    // let picker = await this.pickerController.create(options);
    // picker.present()
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
        selectedIndex: 9,
        options:this.getOptionsArrray(this.hours)
      },
      {
        name:'minute',
        selectedIndex: 0,
        options:this.getOptionsArrray(this.minutes)
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

  async closeModal(){
    await this.modalController.dismiss();
  }
  async newAppointment(type){
    if(this.service.name == "Seleziona" && type==0){
      Notiflix.Report.Warning( 
        'Seleziona un serivizio', 
       "Per salvare l'appuntamento devi prima selezionare un servizio ",
        'Prosegui' )
        return
     }else{
      await  this.closeModal()
      var star = this.hours_list.indexOf(this.time)
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
         end = star + service[0].duration
         details = service[0].name
        }
      }else{
       if(type==2){
         this.service = -1
         star=0
         end =204
         this.client_name="Chiuso"
         details = "Chiuso"
       }else{
         if(type==1){
           this.service = -1
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
       
         this.apiNative.bookAppointment(star, end, this.day, this.month, this.year, this.client_name, this.phone, details, employee, this.service).then(
           res => {
            Notiflix.Notify.Init({ position:"left-bottom", distance:"70px", success: {background:"#00479d",textColor:"#fff",notiflixIconColor:"#fff",}, }); 
             Notiflix.Notify.Success('Appuntamento registrato')
             this.homeref.drawAppointment(res.id, star, end, details, this.client_name, employee, this.service, this.day, 0, this.month, this.year,this.phone,'')
             var week = this.getWeekNumber(new Date(this.year,this.month,this.day))
           var app = { client: 1,
             client_name: this.client_name,
             day: this.day,
             details: details,
             employee: employee,
             end: end,
             id: res.id,
             month: this.month,
             note: null,
             phone: this.phone,
             service_n:  this.service,
             shop: 0,
             start: star,
             store_name: "",
             store_phone: "",
             week: week,
             year: this.year
           }
             this.homeref.all_appointments_list.push(app)
           
           }).catch(
             err => console.log(err,'err booking')) 
       }
       else{
         this.api.bookAppointment(star, end, this.day, this.month, this.year, this.client_name, this.phone, details, employee, this.service).subscribe(
           data =>{
             Notiflix.Notify.Init({ position:"left-bottom", distance:"70px", success: {background:"#00479d",textColor:"#fff",notiflixIconColor:"#fff",}, }); 
             Notiflix.Notify.Success('Appuntamento registrato')
             this.homeref.drawAppointment(data.id, star, end, details, this.client_name, employee, this.service, this.day, 0, this.month, this.year,this.phone,'')          
             var week = this.getWeekNumber(new Date(this.year,this.month,this.day))
           var app = { client: 1,
             client_name: this.client_name,
             day: this.day,
             details: details,
             employee: employee,
             end: end,
             id: data.id,
             month: this.month,
             note: null,
             phone: this.phone,
             service_n:  this.service,
             shop: 0,
             start: star,
             store_name: "",
             store_phone: "",
             week: week,
             year: this.year}
             this.homeref.all_appointments_list.push(app)
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
