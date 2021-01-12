import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';

const BASE_URL = 'https://giacomovenier.pythonanywhere.com/api/'
// const BASE_URL = 'http://127.0.0.1:8000/api/'

@Injectable({
  providedIn: 'root'
})
export class NativeApiService {

httpheader = new HttpHeaders({'Content-type':'application/json'}) //'Access-Control-Allow-Origin':'*'
res:any
mailApi = 'https://mailthis.to/giacomo'
constructor(private http: HttpClient, private HTTP: HTTP, private storage: Storage) {}
//Should be in store but import problems
 async newheader(){
  var token = await this.getToken()
  var authheader = new HttpHeaders({"Content-type":"application/json","Authorization":"JWT "+ token})
 return authheader
}
storeToken(token){
  var data={
    "token": token,
    "last_resfresh":  +new Date()
  }
 this.storage.set('token', JSON.stringify(data))
}
async getToken(){
  var storedtoken = JSON.parse(await this.storage.get('token'));
  var now = +new Date()
  if ((now - storedtoken.last_resfresh)> (86400*1000*20)){  // 7.200.000 it's 2 hours
      this.refreshToken(storedtoken.token)
  }
  return storedtoken.token 
}
async newrefreshToken(){
  let url = BASE_URL+'auth/refresh/';
  var token = await this.getToken()
      let params = {
        'token': token
      }
      let headers = { };
      this.HTTP.setDataSerializer("json");
      this.HTTP.setHeader("prenotaApp","Accept", "application/json");
      this.HTTP.setHeader("prenotaApp","Content-Type", "application/json");
      this.HTTP.post(url, params, headers)
.then((response:HTTPResponse) => {
  var res = JSON.parse(response.data)
  this.storeToken(res.token)
  })
  .catch((error:any) => {
    console.error(`POST ${url} ${error.error}`)
  });
}

refreshToken(token){
  let url = BASE_URL+'auth/refresh/';
      let params = {
        'token': token
      }
      this.HTTP.setDataSerializer("json");
      this.HTTP.setHeader("prenotaApp","Accept", "application/json");
      this.HTTP.setHeader("prenotaApp","Content-Type", "application/json");
      var headers_t = this.HTTP.getHeaders("prenotaApp")
      this.HTTP.post(url, params,headers_t)
  .then((response:HTTPResponse) => {
    var res = JSON.parse(response.data)
    this.storeToken(res.token)
  })
  .catch((error:any) => {
    console.error(`POST ${url} ${error.error}`)
  });
}
deleteStorage(){
  this.storage.clear()
}
login(email, password){
  let url = BASE_URL+'auth/';
      let params = {
        "email": email,
        "password": password,
      }
      let headers = { };
      this.HTTP.setDataSerializer("json");
      this.HTTP.setHeader("prenotaApp","Accept", "application/json");
      this.HTTP.setHeader("prenotaApp","Content-Type", "application/json");
      this.HTTP.post(url, params, headers)
  .then((response:HTTPResponse) => {
    var res = JSON.parse(response.data)
    this.storeToken(res.token)
  })
  .catch((error:any) => {
    console.error(`POST ${url} ${error.error}`)
  });
}

async getEmployees(){
  var l  
  let token = await this.getToken()
  if (token) {
       l = this.parseJwt(token)
    }
  let url = BASE_URL+'employees/?employee='+l.user_id
  this.HTTP.setHeader('*','Content-Type', 'application/json');
  this.HTTP.setHeader('*','Authorization','JWT '+ token );
  var headers_t = this.HTTP.getHeaders("*")
  let responseData = await this.HTTP.get(url, {},headers_t).then(resp => {return JSON.parse(resp.data)}).catch(err => {return err});
  return responseData;

}
// async getEmployeesfromshop(shop){
//   let url = BASE_URL+'employees/?shop='+shop
//   // let token 
//   // token = await this.getToken()
//   this.HTTP.setHeader('*','Content-Type', 'application/json');
//   // this.HTTP.setHeader('*','Authorization','JWT '+ token );
//   var headers_t = this.HTTP.getHeaders("*")
//   let responseData = await this.HTTP.get(url, {},{'Content-Type': 'application/json'}).then(resp => {return JSON.parse(resp.data)}).catch(err => {return err});
//   return responseData;
// }
// getopenHours(): Observable<any>{
//         return this.http.get(BASE_URL+'closedhours/',{headers: this.httpheader})
// }
// setopenHours(data): Observable<any>{
//   return this.http.post(BASE_URL+'closedhours/', data, {headers: this.newheader()})
// }
async bookAppointment(start, end, day, month, year,name, phone,  details, employee, service){
  var week = this.getWeekNumber(new Date(year, month, day))
  var data = {'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone':phone, 'details': details, 'service_n': service}
  let url = BASE_URL+'bookings/'
  let token 
  token = await this.getToken()
  this.HTTP.setDataSerializer("json");
  this.HTTP.setHeader('*',"Accept", 'application/json');
  this.HTTP.setHeader('*','Content-Type', 'application/json');
  this.HTTP.setHeader('*','Authorization','JWT '+ token );
  var headers_t = this.HTTP.getHeaders("*")
  let responseData = await this.HTTP.post(url, data, headers_t).then(resp => {return JSON.parse(resp.data)}).catch(err => {return err});
  return responseData;
}

async registerdevice(player_id){
  var l  
  let token = await this.getToken()
  if (token) {
       l = this.parseJwt(token)
    }
  var data = {'player_id': player_id , 'user': l.user_id}
  let url = BASE_URL+'device/'
  this.HTTP.setDataSerializer("json");
  this.HTTP.setHeader('*',"Accept", 'application/json');
  this.HTTP.setHeader('*','Content-Type', 'application/json');
  this.HTTP.setHeader('*','Authorization','JWT '+ token );
  var headers_t = this.HTTP.getHeaders("*")
  let responseData = await this.HTTP.post(url, data, headers_t).then(resp => {return JSON.parse(resp.data)}).catch(err => {return err});
  return responseData;
}

async updateAppointment(id, start, end, day, month, year,name, phone, details, employee, service){
  var week = this.getWeekNumber(new Date(year, month, day))
  var data = {'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'details': details, 'service_n': service, 'phone':phone}
  let url = BASE_URL+'bookings/'+id+'/'
  let token 
  token = await this.getToken()
  this.HTTP.setDataSerializer("json");
  this.HTTP.setHeader('*',"Accept", 'application/json');
  this.HTTP.setHeader('*','Content-Type', 'application/json');
  this.HTTP.setHeader('*','Authorization','JWT '+ token );
  var headers_t = this.HTTP.getHeaders("*")
  let responseData = await this.HTTP.put(url, data, headers_t).then(resp => {return JSON.parse(resp.data)}).catch(err => {return err});
  return responseData;
}

 async getAppointments(week){
  var l  
  let token  = await this.getToken()
  if (token) {
       l = this.parseJwt(token)
    }
  let url = BASE_URL+'bookings/week/'+week+'/?owner='+l.user_id
  

  this.HTTP.setHeader('appointment','Content-Type', 'application/json');
  var headers_t = this.HTTP.getHeaders("appointment")
  let responseData = await this.HTTP.get(url, {},headers_t).then(resp => {return JSON.parse(resp.data)}).catch(err => {return err.error});
  return responseData;
}
async getAppointmentsExternal(week){
  const token = await this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
  }
  let url = BASE_URL+'bookings/week/'+week+'/external/?owner='+l.user_id
  this.HTTP.setHeader('appointment','Content-Type', 'application/json');
  var headers_t = this.HTTP.getHeaders("appointment")
  let responseData = await this.HTTP.get(url, {},headers_t).then(resp => {return JSON.parse(resp.data)}).catch(err => {return err.error});
  return responseData;
   
}

// updateAppointment(id, start, end, day, month, year,name, details, employee):Observable<any>{
//   var week = this.getWeekNumber(new Date(year, month, day))
//   var data = {'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'details': details}
//   return this.http.put(BASE_URL+'bookings/'+id+'/', data, {headers: this.newheader()})
// }

async deleteAppointment(id){
  let url = BASE_URL+'bookings/'+id+'/'
  let token  = await this.getToken()
  this.HTTP.setDataSerializer("json");
  this.HTTP.setHeader('*',"Accept", 'application/json');
  this.HTTP.setHeader('*','Content-Type', 'application/json');
  this.HTTP.setHeader('*','Authorization','JWT '+ token );
  var headers_t = this.HTTP.getHeaders("*")
  let responseData = await this.HTTP.delete(url, {},headers_t).then(resp => {return JSON.parse(resp.data)}).catch(err => {return err});
  return responseData;
}

async getStoreservice(){
  var l  
  let token  = await this.getToken()
  if (token) {
       l = this.parseJwt(token)
    }
  let url = BASE_URL+'services/?owner='+l.user_id
  // let token 
  // token = await this.getToken()
  this.HTTP.setHeader('serv','Content-Type', 'application/json');
  // this.HTTP.setHeader('*','Authorization','JWT '+ token );
  var headers_t = this.HTTP.getHeaders("serv")
  let responseData = await this.HTTP.get(url, {},headers_t).then(resp => {return JSON.parse(resp.data)}).catch(err => {return err});
  return responseData;
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
 
}