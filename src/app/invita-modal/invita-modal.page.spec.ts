import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitaModalPage } from './invita-modal.page';

describe('InvitaModalPage', () => {
  let component: InvitaModalPage;
  let fixture: ComponentFixture<InvitaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitaModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
