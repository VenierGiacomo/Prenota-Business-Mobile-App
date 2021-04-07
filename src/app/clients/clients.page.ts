import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, Platform, ToastController } from '@ionic/angular';
import { InvitaModalPage } from '../invita-modal/invita-modal.page';
import { ApiService } from '../services/api.service';
import { NativeApiService } from '../services/nativeapi.service';
import QRCode from 'qrcode';
import { RegisterClientPage } from '../register-client/register-client.page';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  constructor(private storage:StorageService,private apiNative: NativeApiService ,private modalController: ModalController,private toastController: ToastController, private plt: Platform,private api: ApiService, private actionSheetController: ActionSheetController) { }
  clients=[]
  client_name_search
  clients_to_show
  backdrop_active=false
  generated = '';
  
  ngOnInit() {
    this.getClient()
  }
  
  async showClientOptions(client) {

    // this.presentPayModal()
    const actionSheet = await this.actionSheetController.create({
      header: client.client_name,
      
      buttons: [{
        text: 'Chiama',
        // icon: 'share',
        handler: () => {
          window.location.href="tel:+39"+client.phone
        }
      }, {
        text: 'Invita su Prenota',
        // icon: 'caret-forward-circle',
        handler: () => {
          setTimeout(() => {
            this.presentInviteModal(client)
          }, 100);
       
        }
      }, 
      // {
      //   text: 'QR Code',
      //   // icon: 'heart',
      //   handler: () => {
      //     window.location.href="tel:+393404526854";
      //   }
      // },
       {
        text: 'Elimina cliente',
        // icon: 'heart',
        role: 'destructive',
        handler:  () => {
          this.closeActionSheet(client)

        }
      }, {
        text: 'Indietro',
        // icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

async closeActionSheet(client){
    
    setTimeout(async () => {
      const sureToCancel = await this.actionSheetController.create({
        header: "Vuoi cancellare "+client.client_name,
        
        buttons: [{
          text: 'Elimina cliente ',
          role: 'destructive',
          handler: () => {
            this.deleteClient(client.id)
          }
        }, {
          text: 'Indietro',
          // icon: 'close',
          role: 'cancel',
        }]
      });
      await sureToCancel.present();
    }, 100);
    

}

  async presentInviteModal(client){
    var modal = await this.modalController.create({
      component:InvitaModalPage,    
      cssClass: 'invite-modal' ,
      backdropDismiss: false,
      swipeToClose: false,
      componentProps:{
        client:client,
        homeref:this
      }
     
    });
    modal.onDidDismiss().then(res=>{
      
   
    })
      return await modal.present();
  }
  getClient(){
  
   if(this.plt.is('hybrid')){
    this.apiNative.getStoreClients().then(data=>{
      this.clients=data
     
      for(let client of this.clients){
        client.client_name =client.client_name.toLowerCase()
        client.credit = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(client.credit/100)
      }
      this.clients_to_show=this.clients
      }).catch(err=>{
    this.presentToast("C'è stato un problema nello scaricare i tuoi clienti",'err')
        console.log(err)
       
      })
   }else{
    this.api.getStoreClients().then(data=>{
      this.clients=data
      for(let client of this.clients){
        client.client_name =client.client_name.toLowerCase()
        client.credit = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(client.credit/100)
      }
      this.clients_to_show=this.clients
      }).catch(err=>{
    this.presentToast("C'è stato un problema nello scaricare i tuoi clienti",'err')
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
  async filterClients(){
    var x = this.client_name_search.toLowerCase()
    this.clients_to_show = this.clients.filter((val)=>{
      if(val.client_name.includes(x)){
        return val
      }
    })
  }
  qrcode(url_to_connect){  
    const qrcode = QRCode;
    const self = this;
    qrcode.toString(url_to_connect, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    })
    this.backdrop_active =true
    setTimeout(() => {
      var qr:any =document.getElementById('qr-card')
      var parser = new DOMParser();
      var doc = parser.parseFromString(this.generated, "image/svg+xml");
      document.getElementById('qr-card').appendChild(doc.documentElement)
      qr.style.top = 'calc(50vh - 40vw - 50px)'
  },100);
  
}

closeQR(){
  var qr:any =document.getElementById('qr-card')
    qr.style.top = '110vh'
    setTimeout(() => {
    this.backdrop_active =false
  }, 500);
}

async registerClient(){
  var modal = await this.modalController.create({
    component:RegisterClientPage,    
    cssClass: 'select-modal' ,
    backdropDismiss: false,
    swipeToClose: false,
    componentProps:{
      homeref:this
    }
   
   
  });
  modal.onDidDismiss().then(res=>{
    
 
  })
    return await modal.present();
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
async deleteClient(id){
  if(this.plt.is('hybrid')){
    this.apiNative.deleteClientStore(id).then(async data=>{
      await this.storage.deleteClient(id)
     
      setTimeout(async () => {
        var client_list = await this.storage.getClients()
  
         
        this.clients = client_list
        
        for(let el of client_list ){
          el.client_name = el.client_name.toLowerCase()
        }
        this.clients_to_show =  this.clients
        this.presentToast('Cliente cancellato','succ')
      }, 100);
    
    }).catch(err=>{
      console.log(err)
    })

   
  }else{
    this.api.deleteClientStore(id).subscribe(async data=>{
      await this.storage.deleteClient(id)

      setTimeout(async () => {
        var client_list = await JSON.parse( localStorage.getItem('client_list'))
        this.clients = client_list.list
        
        for(let el of client_list ){
          el.client_name = el.client_name.toLowerCase()
        }
        this.clients_to_show =  this.clients
        this.presentToast('Cliente cancellato','succ')
      }, 100);
    
    },err=>{
      console.log(err)
    })
  }
   
  // }else{
  //   await this.storage.deleteClient(this.delete_customer)
  //   setTimeout(() => {
  //     Notiflix.Notify.Success('Cliente cancellato');
  //   }, 800);
  // }
  
  
}
}
