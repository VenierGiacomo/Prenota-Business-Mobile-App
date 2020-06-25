import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-monthview',
  templateUrl: './monthview.page.html',
  styleUrls: ['./monthview.page.scss'],
})
export class MonthviewPage implements OnInit {

  year 
  month 
  months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  month_displayed 
  months_days
  first_day 
  last_month_days 
  current_month_days 
  next_month_days 
  list_appointments=[]
  next
  next_past
  first_day_next
  month_per_month =[]
  @Input() homeref
  constructor(public modalController: ModalController,) { }

  ngOnInit() {
    var now = new Date()
    this.month = now.getMonth()
    this.year = now.getFullYear()
    this.month_displayed = this.months_names[this.month]
    this.months_days=[31, ((this.year%4==0 && this.year%100!=0)|| this.year%400==0)? 29 :28, 31 , 30, 31, 30, 31, 31, 30, 31, 30, 31]
    this.first_day = new Date(this.year, this.month, 1).getDay()
    for (let month =0; month<12;month++){
      if(this.month+month >11){
        this.first_day = new Date(this.year+1, (this.month+month)%12, 1).getDay()
      }else{
        this.first_day = new Date(this.year, (this.month+month)%12, 1).getDay()
      }
      if (this.first_day ==0){
        this.first_day= 7
      }
      this.last_month_days = Array(this.first_day-1).fill('*')
      this.current_month_days = Array(this.months_days[(this.month+month)%12]).fill(0).map((x,i)=>i+1);
      this.next_month_days = ((this.last_month_days.length+this.current_month_days.length)%7==0) ? [] : Array(7-((this.last_month_days.length+this.current_month_days.length)%7))
      var month_combo = [ this.last_month_days,this.current_month_days, this.next_month_days]
      this.month_per_month.push(month_combo)
    }
  }
  nextMonth(){
    if  (this.month==11){
          this.month=0
          this.year +=1
    }
    else{
          this.month +=1
    }
    this.month_displayed = this.months_names[this.month]
    this.first_day = new Date(this.year, this.month, 1).getDay()
    this.last_month_days = Array(this.first_day-1).fill('*')
    this.current_month_days = Array(this.months_days[this.month]).fill(0).map((x,i)=>i+1);
    this.next_month_days = ((this.last_month_days.length+this.current_month_days.length)%7==0) ? [] : Array(7-((this.last_month_days.length+this.current_month_days.length)%7))
  }
  pastMonth(){
    if  (this.month==0){
          this.month=11
          this.year -=1
    }
    else{
          this.month -=1
    }
    this.month_displayed = this.months_names[this.month]
    this.first_day = new Date(this.year, this.month, 1).getDay()
    this.last_month_days = Array(this.first_day-1).fill('*')
    this.current_month_days = Array(this.months_days[this.month]).fill(0).map((x,i)=>i+1);
    this.next_month_days = ((this.last_month_days.length+this.current_month_days.length)%7==0) ? [] : Array(7-((this.last_month_days.length+this.current_month_days.length)%7))
  }
 setWeek(day, idx ){
   if ((this.month+idx)>11){
    var now = new  Date(this.year+1, (this.month+idx)%12, day)
    this.homeref.year = this.year+1
   }
   else{
    var now = new  Date(this.year, (this.month+idx)%12, day)
    this.homeref.year = this.year
   }
   var today = now.getDay() -1
   var day_number = now.getDate()
   if (today == -1){
     today= 6
   }
   var week =[]
   for (let i=0;i<7;i++){
     var day_n = day_number - today  + i
     if (day_n > this.months_days[(this.month+idx)%12]){
      day_n =day_n-this.months_days[(this.month+idx)%12]
     }
     if(day_n <1){
      day_n =this.months_days[(this.month+idx-1)]+day_n
     }
     week.push(day_n)
   }
   this.homeref.week= week
   this.homeref.day= day
   this.homeref.month = (this.month+idx)%12
   this.homeref.month_name =  this.homeref.months_names[this.homeref.month]
   console.log(week,day, this.homeref.month)
   this.closeModal()

 }
 async closeModal(){
  await this.modalController.dismiss();
}
}
