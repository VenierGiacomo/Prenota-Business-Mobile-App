import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Http } = Plugins;

const BASE_URL = 'https://giacomovenier.pythonanywhere.com/api/'
// const BASE_URL = 'http://127.0.0.1:8000/api/'

@Injectable({
  providedIn: 'root'
})
export class NativeApiService {

simple_header= {
  "Accept": 'application/json',
  'Content-Type': 'application/json'
}
token_header
res:any
mailApi = 'https://mailthis.to/giacomo'
constructor(private plt: Platform,  private storage: Storage) {
  this.plt.ready().then(async ()=>{
    let token 
    token = await this.getToken()    
    this.token_header= {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      'Authorization':'JWT '+ token 
    }
  })
}

deleteStorage(){
  this.storage.remove('token')
}
async isvalidToken(){
  const token = await this.getToken().then(resp => {return resp}).catch(err => {return err});
        if (token) {
            var l = this.parseJwt(token) 
            var exp = 1000*l.exp
            var now = +new Date()
            if (now < exp){ 
                return true
            }
            else{
                return false
            }
        } else {
            return false
        }
    }
storeToken(token){
  var data={
    "token": token,
    "last_resfresh":  +new Date()
  }
  this.token_header= {
    "Accept": 'application/json',
    'Content-Type': 'application/json',
    'Authorization':'JWT '+ token 
  }
  this.storage.set('token', JSON.stringify(data))
}
storeUserData(user){

  this.storage.set('user', JSON.stringify(user))
}
async getUserData(){
  return new Promise(resolve => {
    this.storage.get('user').then(data => {
      var res:any  =JSON.parse(data)
     if( data==null){
       resolve(false)
      }else{
        resolve(res)}
    }).catch(err=>{
      console.log('empty',err)});    
  })  

}
async getToken(){
  return new Promise(resolve => {
    this.storage.get('token').then(data => {
      var res:any  =JSON.parse(data)
     if( data==null){
       resolve(false)
      }else{
        resolve(res.token)}
    }).catch(err=>{
      console.log('empty',err)});    
  })  

}


// refreshToken(token){
//   let url = BASE_URL+'auth/refresh/';
//       let params = {
//         'token': token
//       }
//       let headers = { };
//       this.HTTP.setDataSerializer("json");
//       this.HTTP.setHeader("prenotaApp","Accept", "application/json");
//       this.HTTP.setHeader("prenotaApp","Content-Type", "application/json");
//       this.HTTP.post(url, params,headers)
//   .then((response:HTTPResponse) => {
//     this.storeToken(response.data.token)
//   })
//   .catch((error:any) => {
//     console.error(`POST ${url} ${error.error}`)
//   });
// }

async login(params){
  let url = BASE_URL+'auth/';
  let res = await  this.postData(url,params,this.simple_header)
  this.token_header= {
    "Accept": 'application/json',
    'Content-Type': 'application/json',
    'Authorization':'JWT '+ res.token 
  }
  await this.storeToken(res.token)
  return res
}
async loginread(params){
  let url = BASE_URL+'auth/';
  let res = await  this.postData(url,params,this.simple_header)
  return res
}

async hasStore(){
  var url = BASE_URL+'store/owner/'
  return  await  this.getData(url,this.token_header)
 
}

async register(first_name, last_name, email, sex,  phone, password){
  let url = BASE_URL+'auth/register/';
      let params = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "sex": sex,
        "phone": phone,
        "password": password,
      }
      let res = await  this.postData(url,params,this.simple_header)
      this.token_header= {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'JWT '+ res.token 
      }
      await this.storeToken(res.token)
      
      await this.storeUserData(res)
      return res
}
async getemployeeHours(id){
      var url = BASE_URL+'employeehours/?employee='+id
      return  await  this.getData(url,this.simple_header)
}
async getemployeeHoursByShop(id){
  var url = BASE_URL+'employeehours/shop/?shop='+id;
  return  await  this.getData(url,this.simple_header)
}

async getEmployees(){
  var l
  let token 
  token = await this.getToken()
  l = this.parseJwt(token) 
  let url =  BASE_URL+'employees/?employee='+l.user_id
  return  await  this.getData(url,this.token_header)
}

async bookAppointment(start, end, day, month, year,name, phone,details, employee, service,client_id, adons, store_client){
  var week = this.getWeekNumber(new Date(year, month, day))
  
  var data
  if(client_id>1){
    if(store_client){
      data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone':phone, 'details': details, 'service_n': service, 'note': '','client':client_id,'adons':adons,'store_client':store_client}
     }else{
        
        data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone':phone, 'details': details, 'service_n': service, 'note': '','client':client_id, 'adons':adons}
     }

  }else{
    if(store_client){
      data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone':phone, 'details': details, 'service_n': service, 'note': '', 'adons':adons,'store_client':store_client}
     }else{
        
        data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone':phone, 'details': details, 'service_n': service, 'note': '',  'adons':adons}
     }
  }
  
  let url = BASE_URL+'bookings/'
  return await this.postData(url,data,this.token_header)

}

async updateClientStore(id,first_name, last_name, phone ,email?  ){
  let url =BASE_URL+'store/clients/'+id+'/'
  var data
  if(email && email!=''){
    data={
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "phone": phone,
      'client_name': first_name+' '+last_name
    }
  }else{
    data={
      "first_name": first_name,
      "last_name": last_name,
      "phone": phone,
      'client_name': first_name+' '+last_name,
    }
  }
  
  return await this.putData(url, data,this.token_header)
}
async booknotifications(list_ids){
  var ids=list_ids.toString()
  let url = BASE_URL+'bookings/notifications/?list_ids='+ids
  return await this.getData(url,this.token_header)
}

 async getAppointments(week){
  var l
  let token 
  token = await this.getToken()
  l = this.parseJwt(token) 
  let url = BASE_URL+'bookings/week/'+week+'/?owner='+l.user_id
  return  await  this.getData(url,this.simple_header)
}

async getAppointmentsByshop(week,id){
  let url = BASE_URL+'bookings/week/'+week+'/shop/?shop='+id;
  return  await  this.getData(url,this.simple_header)
}

async getAppointmentsByshop2(week,id){
  let url = BASE_URL+'bookings/week/'+week+'/2shop/?shop='+id;
  return  await  this.getData(url,this.simple_header)
}

async getAppointmentsByshop5(week,id){
  
  let url = BASE_URL+'bookings/week/'+week+'/5shop/?shop='+id;
  return  await  this.getData(url,this.simple_header)

}
async stripeBusTicket(service){
  let url = BASE_URL+'webhooks/ticket';
  let params = {"ticket_type": service}
  const token = await this.getToken()
  if (token) {
    return  await  this.postData(url,params,this.token_header)
  }else{
    return  await  this.postData(url,params,this.simple_header)
  }
}

async getClientAppointments(){
  var l
  let token 
  token = await this.getToken()
  l = this.parseJwt(token) 
  let url = BASE_URL+'bookings/user/?user='+l.user_id
  return  await  this.getData(url,this.token_header)
}
async getClientAppointmentsweek(week, year){
  var l
  let token 
  token = await this.getToken()
  l = this.parseJwt(token) 
  let url = BASE_URL+'bookings/user/week/'+week+'/?user='+l.user_id+'&year='+year
  return  await  this.getData(url,this.token_header)

}

async deleteAppointment(id){
  let url = BASE_URL+'bookings/'+id+'/'
  return  await  this.deleteData(url,this.token_header)
}

async getStoreservice(){
  var l
  let token 
  token = await this.getToken()
  l = this.parseJwt(token) 
  let url = BASE_URL+'services/?owner='+l.user_id
  return  await  this.getData(url,this.simple_header)
}
async registerdevice(player_id){
  var l
  let token 
  token = await this.getToken()
  l = this.parseJwt(token) 
  var data = {'player_id': player_id , 'user': l.user_id}
  let url = BASE_URL+'device/'
  return  await  this.postData(url,data,this.token_header)
}
async getStoreservicebyStore(id){
  let url = BASE_URL+'services/byshop/?shop='+id
  return  await  this.getData(url,this.simple_header)
}
async getUser(){
  const token = await this.getToken()
  var l 
  if (token) {
      l = await this.parseJwt(token) 
  }
  let url = BASE_URL+'auth/'+l.user_id
  var res = await  this.getData(url,this.token_header)
  await this.storeUserData(res) 
  return res
}

async getEmploservicebyStore(id){
  let url = BASE_URL+'employee/services/store/?store='+id
  return  await  this.getData(url,this.simple_header)
}

getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  var yearStart = +(new Date(Date.UTC(d.getUTCFullYear(),0,1)));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  // Return array of year and week number
  return  weekNo
}

parseJwt = (token) => {
  try {
  return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
  return null;
  }
};

async emailConfirmBooking(email,name,surname,day,month,year,time,service,shop){
    let url = BASE_URL+'email/bookingconfirm'
    var data ={
      "email":email,
      "name":name,
      "surname":surname,
      "day":day,
      "month": month,
      "year":year,
      "time":time,
      "service":service,
      "shop":shop
    }
    return  await  this.postData(url,data,this.token_header)
}

async getStores(){
  let url = BASE_URL+'store/list'
  return  await  this.getData(url,this.simple_header)
}

async getStores1(){
  let url = BASE_URL+'store/list1'
  return  await  this.getData(url,this.simple_header)
}
async getEmployeesfromshop(shop){
  let url = BASE_URL+'employees/store/?shop='+shop
  return  await  this.getData(url,this.simple_header)
}
async payBusiness(list_ids){
  let url = BASE_URL+'webhooks/pay/business/'
  var data = {list_ids:list_ids}
  return await  this.postData(url,data,this.token_header)
}
async payBusinesswithCredits(list_ids){
  let url = BASE_URL+'webhooks/pay/business/credits/'
  var data = {list_ids:list_ids}
  return await  this.postData(url,data,this.token_header)
}

async paymentMethods(){
  let url = BASE_URL+'webhooks/payment_methods/'
  return await  this.postData(url,{},this.token_header)
}
async updateAppointment(id, start, end, day, month, year,name, phone, details, employee, service, note,  client_id, store_client, payed?,){
  let url = BASE_URL+'bookings/'+id+'/'
  var week = this.getWeekNumber(new Date(year, month, day))
  var data
  if(payed){
    data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'details': details, 'service_n': service,'phone':phone, 'note':note, 'client_id':client_id,'store_client':store_client, 'payed':payed,}
  }else{
    data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'details': details, 'service_n': service,'phone':phone, 'note':note, 'client_id':client_id,'store_client':store_client,}
  }
  return await this.putData(url, data, this.token_header)
}

async getAppointmentsExternal(week){
  var l
  let token 
  token = await this.getToken()
  l = this.parseJwt(token) 
  let url = BASE_URL+'bookings/week/'+week+'/external/?owner='+l.user_id
  return await  this.getData(url,this.token_header)
}
async stripePortalSession(){
  let url = BASE_URL+'webhooks/portal/stripe'
  return await  this.postData(url,{},this.token_header)
}
async isStoreClient(shop){
  let url = BASE_URL+'store/clients/is/?shop='+shop
  return await  this.getData(url,this.token_header)
}

// async getStoreClients(){
//   let url = BASE_URL+'store/clients/'
//   return await  this.getData(url,this.token_header)
// }
async inviteCLient(client){
  var url =BASE_URL+'store/clients/invite/email/'
  var data={
    'id': client.id,
    "client_name": client.client_name,

  }
  this.postData(url,data,this.token_header)

}
async getStoreClients(force?){
  let url = BASE_URL+'store/clients/'
  var last_download 

  var last_clients_update= await this.storage.get('last_clients_update')
  if(last_clients_update!= null &&  last_clients_update!= undefined){
    last_download = last_clients_update
  }else{
    last_download=0
  }
  if(force||Number(new Date())-last_download>1200000 ||  last_clients_update ==null ||  last_clients_update==undefined){
    var x =  await  this.getData(url,this.token_header)
    await this.storage.set('last_clients_update',Number(new Date()))
    await this.storage.set('client_list',x)
    return  x
  }else{ 
    return await this.storage.get('client_list')
  }
}
async registerClientWithEmail(first_name, last_name, phone ,email?  ){
  var data 
  let url = BASE_URL+'store/clients/new/'
  if(email){
    data={
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "phone": phone,
      'client_name': first_name+' '+last_name
    }
  }else{
    data={
      "first_name": first_name,
      "last_name": last_name,
      "phone": phone,
      'client_name': first_name+' '+last_name,
    }
  }
  return await this.postData(url, data, this.token_header)
}
async deleteClientStore(id){
  let url = BASE_URL+'store/clients/'+id+'/'
  return  await  this.deleteData(url, this.token_header)  
}
async updateUser(first_name, last_name, email, phone){
  const token = await this.getToken()
  var l 
  if (token) {
      l = await this.parseJwt(token) 
  }
  var url = BASE_URL+'auth/'+l.user_id
  var data ={
    "first_name": first_name,
    "last_name": last_name,
    "email": email,
    // "sex": sex,
    "phone": phone,
    // "password": password,
  }
  return await this.putData(url, data, this.token_header)
}
async getServiceAdons(service_id){
  let url = BASE_URL+'serviceaddons/'+service_id
  return await  this.getData(url,this.simple_header)
}
async newCustomerSocket(channel,id){
  var data ={
    channel: channel,
    shop_id: id
  }
  return await this.postData(BASE_URL+'webhooks/new_customer_socket/',data,this.token_header)
}
async updateStoreClientQRCode(id){
  const url = BASE_URL+'store/clients/QRCode'
  return await this.postData(url,{id: id, client_name:'Only because required'},this.token_header)
}

async getData(url,headers){
  let res = await Http.request({
    method: 'GET',
    url: url,
    headers: headers
  })
  return res.data
}
async postData(url,data,headers){
  let res = await Http.request({
    method: 'POST',
    url: url,
    headers: headers,
    data: data
  })
 
  return res.data
}
async putData(url,data,headers){
  let res = await Http.request({
    method: 'PUT',
    url: url,
    headers: headers,
    data: data
  })
  return res.data
}
async deleteData(url,headers){
  let res = await Http.request({
    method: 'DELETE',
    url: url,
    headers: headers
  })
  return res.data
}

  }