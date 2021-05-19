import { Component, OnInit, Input  } from '@angular/core';
import { ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

import { NativeApiService } from '../services/nativeapi.service';
import { Plugins } from '@capacitor/core';

import { StorageService } from '../services/storage.service';

const { Browser } = Plugins;

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.page.html',
  styleUrls: ['./register-client.page.scss'],
})
export class RegisterClientPage implements OnInit {
  @Input() homeref
  constructor(private storage: StorageService, private plt: Platform, private nativeApi: NativeApiService,  public modalController: ModalController,private api: ApiService, private nav: NavController) { }
  
  @Input() first_name = ''
  @Input() last_name = ''
  @Input() email = ''
  @Input() phone = ''
  @Input() id 
  @Input() isRegister = ''


  
  ngOnInit() {
  }


  async closeModal(){
    await this.modalController.dismiss();
  }

  async registerCLi(){
    if(!this.email){
      this.email=''
    }
    if(this.isRegister){
      if(this.first_name != '' && this.last_name != '' && this.phone != ''){
        if(this.email!=''){
          if(this.plt.is('hybrid')){
            console.log('here')
            this.nativeApi.registerClientWithEmail(this.first_name,this.last_name,this.phone,this.email).then(async res=>{
              
              console.log('qofffi')
              await this.storage.addClient(res)
              console.log('qoi')
              var client_list = await this.storage.getClients()
              console.log('qofffdkfkfki')
         
              this.homeref.clients = client_list
              
              for(let el of client_list ){
                el.client_name = el.client_name.toLowerCase()
              }
              this.homeref.clients_to_show =  client_list
              await this.homeref.presentToast("Cliente registrato",'succ')
              await this.closeModal()
            }).catch(async(err)=>{
              await this.homeref.presentToast("C'è stato un errore durante il salvataggio! \nRiprova più tardi",'err');
              
              console.log(err)
            })
          }else{
              this.api.registerClientWithEmail(this.first_name,this.last_name,this.phone,this.email).subscribe(async res=>{
                this.closeModal()
            
                await this.storage.addClient(res)
      
                var client_list = await JSON.parse( localStorage.getItem('client_list'))
    
                var clients = client_list.list  
                this.homeref.clients = clients
                
                for(let el of clients ){
                  el.client_name = el.client_name.toLowerCase()
                }
                this.homeref.clients_to_show =  clients
                await this.homeref.presentToast("Cliente registrato",'succ')
                this.email=''
                this.first_name =''
                this.last_name =''
                this.phone=''
              },async (err)=>{
                await this.homeref.presentToast("C'è stato un errore durante il salvataggio! \nRiprova più tardi",'err');
                
                console.log(err)
              })
            }
  
        }else{
          if(this.plt.is('hybrid')){
            this.nativeApi.registerClientWithEmail(this.first_name,this.last_name,this.phone).then(async res=>{
              
          
              await this.storage.addClient(res)
    
              var client_list = await this.storage.getClients()
  
         
              this.homeref.clients = client_list
              
              for(let el of client_list ){
                el.client_name = el.client_name.toLowerCase()
              }
              this.homeref.clients_to_show =  client_list
              await this.homeref.presentToast("Cliente registrato",'succ')

              await this.closeModal()
            }).catch(async(err)=>{
              await this.homeref.presentToast("C'è stato un errore durante il salvataggio! \nRiprova più tardi",'err');
              
              console.log(err)
            })
          }else{
              this.api.registerClientWithEmail(this.first_name,this.last_name,this.phone).subscribe(async res=>{
                this.closeModal()
            
                await this.storage.addClient(res)
      
                var client_list = await JSON.parse( localStorage.getItem('client_list'))
    
                var clients = client_list.list  
                this.homeref.clients = clients
                
                for(let el of clients ){
                  el.client_name = el.client_name.toLowerCase()
                }
                this.homeref.clients_to_show =  clients
                await this.homeref.presentToast("Cliente registrato",'succ')
                this.email=''
                this.first_name =''
                this.last_name =''
                this.phone=''
              },async (err)=>{
                await this.homeref.presentToast("C'è stato un errore durante il salvataggio! \nRiprova più tardi",'err');
                
                console.log(err)
              })
            }
        }
        
      }
    }else{
      if(this.first_name != '' && this.last_name != '' && this.phone != ''){
        if(this.plt.is('hybrid')){
          console.log(this.id)
          this.nativeApi.updateClientStore(this.id, this.first_name, this.last_name, this.phone, this.email).then(async res=>{
            await this.storage.deleteClient(res.id)
            await this.storage.addClient(res)
            var client_list = await this.storage.getClients()
            this.homeref.clients = client_list
            for(let el of this.homeref.clients ){
              el.client_name = el.client_name.toLowerCase()
            }
            this.homeref.clients_to_show =  client_list
            await this.homeref.presentToast("Cliente aggiornato",'succ')
            await this.closeModal()
          }).catch(async(err)=>{
            await this.homeref.presentToast("C'è stato un errore durante il salvataggio! \nRiprova più tardi",'err');
            
            console.log(err)
          })
        }
        else{
              this.api.updateClientStore(this.id, this.first_name, this.last_name, this.phone, this.email).subscribe(async res=>{
                await this.storage.deleteClient(res.id)
                await this.storage.addClient(res)
      
                var client_list = await JSON.parse( localStorage.getItem('client_list'))
    
                var clients = client_list.list  
                this.homeref.clients = clients
                
                for(let el of this.homeref.clients ){
                  el.client_name = el.client_name.toLowerCase()
                }
                this.homeref.clients_to_show =  this.homeref.clients
                await this.homeref.presentToast("Cliente aggiornato",'succ')
                this.closeModal()
              },async (err)=>{
                await this.homeref.presentToast("C'è stato un errore durante il salvataggio! \nRiprova più tardi",'err');
                
                console.log(err)
              })
            }
        }
        
      }
    }
    
  }
 
  
  
  
  
