import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

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
    
    async getstore(){
            var store = await this.storage.get('shop_data');
            return store
        }
    
}

