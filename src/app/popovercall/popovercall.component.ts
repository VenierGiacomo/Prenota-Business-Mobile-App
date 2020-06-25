import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-popovercall',
  templateUrl: './popovercall.component.html',
  styleUrls: ['./popovercall.component.scss'],
})
export class PopovercallComponent implements OnInit {

  constructor(private popoverController: PopoverController, private callNumber: CallNumber, private api: ApiService) { }
  @Input() homeref
  @Input() n
  @Input() employees

  async ngOnInit() {}

async set(employee){
  console.log(employee, this.employees)
  this.homeref.employee = employee
  console.log(employee)
  this.dismissPopover("name")
  }
  dismissPopover(data) {
    this.popoverController.dismiss(data)
  }
  deleteAppointment(){
    this.homeref.deleteAppointment(this.n)
    this.dismissPopover("delete") 
  }
}
