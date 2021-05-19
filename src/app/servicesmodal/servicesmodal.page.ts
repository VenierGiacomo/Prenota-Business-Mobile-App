import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-servicesmodal',
  templateUrl: './servicesmodal.page.html',
  styleUrls: ['./servicesmodal.page.scss'],
})
export class ServicesmodalPage implements OnInit {
  services=[]

  @Input() homeref
  time_duration: string[] = ["0 min", "5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore"];
  colors_list=["#f2b3b3","#fccbbc","#fcecbe","#c2e9d7","#b3e1f7","#c5cbe9","#d7dbef","#ddbde6","#d19a7a","#E80627"]
  durations: string[] = ["0 m","5 m","10 m","15 m","20 m","25 m", "30 m","35 m", "40 m", "45 m", "50 m", "55 m", "1 h","1 h e 5 m", "1 h e 10 m", "1 h e 15 m","1 h e 20 m", "1 h e 25 m","1 h e 30 m","1 h e 35 m","1 h e 40 m","1 h e 45 m","1 h e 50 m","1 h e 55 m","2 h"];
  constructor(private modalController: ModalController, private storage: StorageService) { }

  async ngOnInit() {
    this.services = await this.storage.getServices()
    this.services.push({
      color: 1,
      duration: 6,
      duration_book: 6,
      id: -1,
      max_n: 1,
      name: "Altro",
      price: 0,
      sex: 3,
      })
  }
  async closeModal(){
    await this.modalController.dismiss();
  }
  async selectService(service){
    this.homeref.service=service.id
    this.homeref.service_txt =service.name
    this.homeref.duration =this.time_duration[service.duration]
    await this.closeModal()
  }


}
