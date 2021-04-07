import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterClientPage } from './register-client.page';

describe('RegisterClientPage', () => {
  let component: RegisterClientPage;
  let fixture: ComponentFixture<RegisterClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
