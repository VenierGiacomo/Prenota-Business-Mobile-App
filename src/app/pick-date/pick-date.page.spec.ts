import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickDatePage } from './pick-date.page';

describe('PickDatePage', () => {
  let component: PickDatePage;
  let fixture: ComponentFixture<PickDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickDatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
