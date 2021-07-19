import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { NativeApiService } from '../../services/nativeapi.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  constructor(private apiNative:NativeApiService, private api:ApiService, private plt: Platform,private modalController:ModalController) { }
@Input() appointment
@Input() note
@Input()homeref
_loading=false

  ngOnInit() {
  }
  async closeModal(){
    await this.modalController.dismiss();
  }
  setNote(){
    this._loading=true
    if(this.plt.is('hybrid')){
      this.apiNative.updateAppointment(this.appointment.id, this.appointment.start_t, this.appointment.end_t, this.appointment.day, this.appointment.month, this.appointment.year, this.appointment.client_name, this.appointment.phone, this.appointment.details, this.appointment.employee, this.appointment.service_n, this.note,this.appointment.client,this.appointment.client_store).then(async data =>{

        this.homeref.clearAppointment(this.appointment.id, data.start_t, data.end_t, this.appointment.day, this.appointment.month, this.appointment.year,this.appointment.client_name,this.appointment.phone,this.appointment.details, this.appointment.employee,this.appointment.service_n.toString(), this.appointment.client,this.note,this.appointment.shop, this.appointment.store_name,this.appointment.store_phone,this.appointment.payed)
        this.homeref.drawAppointment(this.appointment.id, data.start_t, data.end_t, this.appointment.details, this.appointment.client_name, this.appointment.employee, this.appointment.service_n.toString(), this.appointment.day, 0, this.appointment.month, this.appointment.year,this.appointment.phone,this.note, this.appointment.payed)
        
        this._loading=false
         await this.closeModal()
        
       }).catch(err=>{
         console.log(err)
        
         console.log(err)
       })
    }else{
      this.api.updateAppointment(this.appointment.id, this.appointment.start_t, this.appointment.end_t, this.appointment.day, this.appointment.month, this.appointment.year, this.appointment.client_name, this.appointment.phone, this.appointment.details, this.appointment.employee, this.appointment.service_n, this.note,this.appointment.client,this.appointment.client_store).subscribe(async data =>{
      
        this.homeref.clearAppointment(this.appointment.id, data.start_t, data.end_t, this.appointment.day, this.appointment.month, this.appointment.year,this.appointment.client_name,this.appointment.phone,this.appointment.details, this.appointment.employee,this.appointment.service_n.toString(), this.appointment.client,this.note,this.appointment.shop, this.appointment.store_name,this.appointment.store_phone,this.appointment.payed)
        this.homeref.drawAppointment(this.appointment.id, data.start_t, data.end_t, this.appointment.details, this.appointment.client_name, this.appointment.employee, this.appointment.service_n.toString(), this.appointment.day, 0, this.appointment.month, this.appointment.year,this.appointment.phone,this.note, this.appointment.payed)
       
        this._loading=false
         await this.closeModal()
        
        
       
       },err=>{
         
         console.log(err)
       })
    }
  }
}
