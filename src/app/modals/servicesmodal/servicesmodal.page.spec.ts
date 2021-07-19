import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicesmodalPage } from './servicesmodal.page';

describe('ServicesmodalPage', () => {
  let component: ServicesmodalPage;
  let fixture: ComponentFixture<ServicesmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
