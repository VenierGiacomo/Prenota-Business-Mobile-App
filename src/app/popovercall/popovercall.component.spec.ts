import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopovercallComponent } from './popovercall.component';

describe('PopovercallComponent', () => {
  let component: PopovercallComponent;
  let fixture: ComponentFixture<PopovercallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopovercallComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopovercallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
