import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { NativeApiService } from '../../services/nativeapi.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-selectclientmodal',
  templateUrl: './selectclientmodal.page.html',
  styleUrls: ['./selectclientmodal.page.scss'],
})
export class SelectclientmodalPage implements OnInit {
  clients
  clients_to_show
  @Input() homeref
  client_name_search
  constructor(private storage:StorageService,private apiNative: NativeApiService ,private modalController: ModalController,private toastController: ToastController, private plt: Platform,private api: ApiService ) { }

  ngOnInit() {
    this.getClient()
  }
async getClient(){
  if(this.plt.is('hybrid')){
    this.clients= await this.storage.getCLients()
    for(let client of this.clients){
      client.client_name =client.client_name.toLowerCase()
    }
    this.clients_to_show=this.clients
  }else{
    this.clients = await JSON.parse(await localStorage.getItem('client_list'))
    console.log(this.clients)
    for(let client of this.clients.list){
      client.client_name =client.client_name.toLowerCase()
    }
    this.clients_to_show=this.clients.list
  }
  
}
async closeModal(){
  await this.modalController.dismiss();
}
async selectClient(client){
  var name = client.client_name.split(' ')
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  var first_name= capitalizeFirstLetter(name[0])
  var last_name= capitalizeFirstLetter(name[1])
  this.homeref.client_name=first_name+ ' '+last_name
  this.homeref.client_txt=first_name+ ' '+last_name
  this.homeref.phone =client.phone

  this.homeref.client = client
    console.log(client)
  await this.closeModal()
}
async filterClients(){
  var x = this.client_name_search.toLowerCase()
  this.clients_to_show = this.clients.filter((val)=>{
    if(val.client_name.includes(x)){
      return val
    }
  })
}
async doRefresh(ev){
  if(this.plt.is('hybrid')){
    this.apiNative.getStoreClients(true).then(data=>{
      ev.target.complete();
      this.clients=data
      
      for(let client of this.clients){
        client.client_name =client.client_name.toLowerCase()
        client.credit = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(client.credit/100)
      }
      this.clients_to_show=this.clients
      }).catch(err=>{
    this.presentToast("C'è stato un problema nello scaricare i tuoi clienti",'err')
    ev.target.complete();
        console.log(err)
       
      })
   }else{
    this.api.getStoreClients(true).then(data=>{
      ev.target.complete();
      this.clients=data
      for(let client of this.clients){
        client.client_name =client.client_name.toLowerCase()
        client.credit = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(client.credit/100)
      }
      this.clients_to_show=this.clients
      }).catch(err=>{
    this.presentToast("C'è stato un problema nello scaricare i tuoi clienti",'err')
    ev.target.complete();
        console.log(err)
       
      })
   }
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
