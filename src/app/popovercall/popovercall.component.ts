import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UpdateBookingPage } from '../update-booking/update-booking.page';

@Component({
  selector: 'app-popovercall',
  templateUrl: './popovercall.component.html',
  styleUrls: ['./popovercall.component.scss'],
})
export class PopovercallComponent implements OnInit {

  constructor(private popoverController: PopoverController, private api: ApiService, public modalController: ModalController) { }
  @Input() homeref
  @Input() appo
  @Input() employees

  async ngOnInit() {}

async set(employee){
  this.homeref.employee = employee
  this.dismissPopover("name")
  }
  dismissPopover(data) {
    this.popoverController.dismiss(data)
  }
  deleteAppointment(){
    this.homeref.deleteAppointment(this.appo.id)
    this.homeref.all_appointments_list = this.homeref.all_appointments_list.filter(x => x.id != this.appo.id )
    this.dismissPopover("delete") 
  }
  async updateBooking(){ 
    const modal = await this.modalController.create({
    component:UpdateBookingPage,
    swipeToClose: true,
    cssClass: 'select-modal' ,
    componentProps: { 
     booking:this.appo,
     homeref: this.homeref,
     popref:this
    }
  });
  return await modal.present();
  }
}

   
