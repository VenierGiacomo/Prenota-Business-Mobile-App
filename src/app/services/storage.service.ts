import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private plt: Platform) { }

setServices(service){
  this.storage.set('service',service)
    }

async getServices(){
        var services = await this.storage.get('service');
        return services
    }
async  setStore(store){
  await this.storage.set('shop_data',store)
}
async  setreadOnly(bool){
  await this.storage.set('read_only',bool)
}
async  getreadPermission(){
  var perm = await this.storage.get('read_only');
  return perm
}

async setEmail(email){
  this.storage.set('email',email)
}
async getEmail(){
  var email = await this.storage.get('email');
  return email
}
async getstore(){
    var store = await this.storage.get('shop_data');
    return store
}
async getCLients(){
  var clients = await  this.storage.get('client_list')
  return clients
 
}

async addClient(new_client){
  if(this.plt.is('hybrid')){
    var clients = await this.storage.get('client_list');
    clients.unshift(new_client)
    await this.storage.set('client_list',clients)
  }else{
    var clients = JSON.parse(await localStorage.getItem('client_list'));
    clients.list.unshift(new_client)
    await localStorage.setItem('client_list', JSON.stringify({'list':  clients.list}))
  }
 
}
async getClients(){
  var client = await this.storage.get('client_list');
  return client
 
}

async deleteClient(id){
  if(this.plt.is('hybrid')){
    var clients = await this.storage.get('client_list');
    clients = await clients.filter((val)=>{return val.id != id})
    await this.storage.set('client_list',clients)
  }
  else{
    var clients = JSON.parse(await localStorage.getItem('client_list'));
    clients.list = await clients.list.filter((val)=>{return val.id != id})
    await localStorage.setItem('client_list', JSON.stringify({'list':  clients.list}))
  }
 
}
async setEmployees(employees){
  await this.storage.set('employees',employees)
}
async getEmployees(){
  var employees = await this.storage.get('employees');
  return employees
  
}
}



