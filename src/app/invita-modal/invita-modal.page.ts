import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { NativeApiService } from '../services/nativeapi.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-invita-modal',
  templateUrl: './invita-modal.page.html',
  styleUrls: ['./invita-modal.page.scss'],
})
export class InvitaModalPage implements OnInit {

  constructor(private plt: Platform, private api: ApiService,private apiNative: NativeApiService,private modalController: ModalController, private storage: StorageService) { }
@Input()client
@Input()homeref
store
url_to_connect
store_name_url
store_name_url_dash
first_name
last_name
message_body 
backdrop_active=false
generated = '';

  async ngOnInit() {
    this.store= await this.storage.getstore()
    this.store_name_url = this.store.store_name.replaceAll(' ', '%20')

    this.store_name_url_dash = this.store.store_name.replaceAll(' ', '_')
    var name = this.client.client_name.split(' ')
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    this.first_name= capitalizeFirstLetter(name[0])
    this.last_name= capitalizeFirstLetter(name[1])
    this.url_to_connect=`https://prenota.cc/register/${this.first_name}/${this.last_name}/${this.client.email}/${this.client.phone}/${this.store_name_url_dash}/${this.client.id}`
    var email=''
    if(this.client.email!=undefined){
       email = this.client.email.replace('@','%40')
    }
    var full_name = this.first_name[0].charAt(0).toUpperCase() + this.first_name.slice(1)+'%20'+this.last_name.charAt(0).toUpperCase() + this.last_name.slice(1);
    this.message_body=`Gentile%20${full_name}!%0A${this.store_name_url}%20%C3%A8%20finalmente%20prenotabile%20online!%F0%9F%98%83%0A%0APu%C3%B2%20scaricare%20l%27app%20da%20questo%20link%3A%20https%3A%2F%2Fprenota.cc%2Fapp%0A%0AQuando%20ha%20scaricato%20l%27app%2C%20clicchi%20qui%20sotto%20per%20accedere%20al%20suo%20account%3A%0Ahttps%3A%2F%2Fprenota.cc%2Fregister%2F${this.first_name}%2F${this.last_name}%2F${email}%2F%2B${this.client.phone}%2F${this.store_name_url_dash}%2F${this.client.id}%0A`

  }
  async closeModal(){

    await this.modalController.dismiss();

  }
//   processQR(client) {
//     const qrcode = QRCode;
//     qrcode.toString(this.code, { errorCorrectionLevel: 'H' },  (err, url)=> {
//       this.generated = url;
//     })
//     this.backdrop_active =true
//     setTimeout(() => {
      
//       var qr:any =document.getElementById('qr-card')
//       var parser = new DOMParser();
//       var doc = parser.parseFromString(this.generated, "image/svg+xml");
//       document.getElementById('qr-card').appendChild(doc.documentElement)
//       qr.style.top = 'calc(30vh)'
      
   
//   },100);
// }
  sendWhatsApp(){
    window.location.href=`https://api.whatsapp.com/send?phone=39${this.client.phone}&text=${this.message_body}`
  }
  sendSMS(){  
    window.location.href=`sms:+39${this.client.phone};&body=${this.message_body}`
  }
 qrcode(){
   this.closeModal().then(()=>{this.homeref.qrcode(this.url_to_connect)})
  
 }
 inviteEmail(){
  if(this.client.email!=undefined && this.client.email!=null){
    if(this.plt.is('hybrid')){
      this.apiNative.inviteCLient(this.client).then(res=>{
        this.closeModal()
        this.homeref.presentToast(`Email spedita a ${this.client.email}`,'succ')
       }).catch(err=>{
         this.homeref.presentToast(`C'è stato un problema, riprova tra poco`,'err')
       })
    
   }else{
    this.api.inviteCLient(this.client).subscribe(res=>{
      this.closeModal()
      this.homeref.presentToast(`Email spedita a ${this.client.email}`,'succ')
     },err=>{
       this.homeref.presentToast(`C'è stato un problema, riprova tra poco`,'err')
     })
   }
    }else{
    this.homeref.presentToast(`Questo cliente non ha una mail registrata`,'err')
  }
  
 }

}
