import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonthviewPage } from './monthview.page';

describe('MonthviewPage', () => {
  let component: MonthviewPage;
  let fixture: ComponentFixture<MonthviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
