import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

export class UserCache{
  constructor(
              public id: number,
              public name: string,
              public img: string,
              public wallet: number,
              ){}
  }
const BASE_URL = 'https://giacomovenier.pythonanywhere.com/api/'
// const BASE_URL = 'http://127.0.0.1:8000/api/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

httpheader = new HttpHeaders({'Content-type':'application/json'}) //'Access-Control-Allow-Origin':'*'

mailApi = 'https://mailthis.to/giacomo'
constructor(private http: HttpClient, private HTTP: HTTP) {}
//Should be in store but import problems

newheader(){
  var authheader = new HttpHeaders({'Content-type':'application/json','Authorization':'JWT '+ this.getToken() })
 return authheader
}
storeToken(token){
  var data={
    "token": token,
    "last_resfresh":  +new Date()
  }
  localStorage.setItem('token', JSON.stringify(data))
}
getToken(){
  var storedtoken = JSON.parse(localStorage.getItem('token'));
  var now = +new Date()
  if ((now - storedtoken.last_resfresh)> 7200000){  // 7.200.000 it's 2 hours
      this.refreshToken(storedtoken.token).subscribe(
        data=>{
          this.storeToken(data.token)
        },
        err => {
          console.log(err.error,'err')
        }
      )
  }
  return storedtoken.token 
}
deleteStorage(){
  localStorage.clear()
}
refreshToken(token):Observable<any>{
  var data ={
    'token': token
  }
  return this.http.post(BASE_URL+'auth/refresh/', data,{headers: this.httpheader })
}

login(email, password):Observable<any>{
  var data ={
    "email": email,
    "password": password,
  }
  return this.http.post(BASE_URL+'auth/', data,{headers: this.httpheader })
}

getEmployees(): Observable<any>{
  const token = this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
     return this.http.get(BASE_URL+'employees/?employee='+l.user_id,{headers: this.newheader()})
  }
  throw throwError("error");  

}
getEmployeesfromshop(shop): Observable<any>{
  return this.http.get(BASE_URL+'employees/store/?shop='+shop,{headers: this.httpheader })
}
getopenHours(): Observable<any>{
        return this.http.get(BASE_URL+'closedhours/',{headers: this.httpheader})
}
setopenHours(data): Observable<any>{
  return this.http.post(BASE_URL+'closedhours/', data, {headers: this.newheader()})
}

bookAppointment(start, end, day, month, year,name, phone, details, employee, service):Observable<any>{
  var week = this.getWeekNumber(new Date(year, month, day))
  var data = {'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone':phone, 'details': details, 'service_n': service}
    return this.http.post(BASE_URL+'bookings/', data,{headers: this.newheader()})
}
// working booking
// bookAppointment(start, end, day, month, year,name, phone, details, employee, service):Observable<any>{
//   var week = this.getWeekNumber(new Date(year, month, day))
//   var data = {'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone':phone, 'details': details, 'service_n': service}
//     return this.http.post(BASE_URL+'bookings/', data,{headers: this.newheader()})
// }
getAppointments(week):Observable<any>{
  return this.http.get(BASE_URL+'bookings/week/'+week+'/?owner=2', {headers: this.httpheader})
}


updateAppointment(id, start, end, day, month, year,name, details, employee):Observable<any>{
  var week = this.getWeekNumber(new Date(year, month, day))
  var data = {'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'details': details}
  return this.http.put(BASE_URL+'bookings/'+id+'/', data, {headers: this.newheader()})
}

deleteAppointment(id):Observable<any>{
  return this.http.delete(BASE_URL+'bookings/'+id+'/',  {headers: this.newheader()})
}
getStoreservice(id){
  return this.http.get(BASE_URL+'services/',{headers: this.httpheader, params: {owner: id }})
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