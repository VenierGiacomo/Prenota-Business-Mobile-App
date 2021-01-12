import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pick-date',
  templateUrl: './pick-date.page.html',
  styleUrls: ['./pick-date.page.scss'],
})
export class PickDatePage implements OnInit {

 
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
  @Input() today
  @Input() month_passed
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
 async setWeek(day, idx ){
  var year
  var month =(this.month+idx)%12
 if ((this.month+idx)>11){
   year =this.year+1
   
  }
  else{
   year =this.year
   
  }
 await this.modalController.dismiss({selected: true,day:day, month:month,year:year });

 }
 async closeModal(){
  await this.modalController.dismiss({selected:false});
}
}
