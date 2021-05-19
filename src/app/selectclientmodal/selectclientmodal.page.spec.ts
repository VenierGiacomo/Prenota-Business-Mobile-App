import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectclientmodalPage } from './selectclientmodal.page';

describe('SelectclientmodalPage', () => {
  let component: SelectclientmodalPage;
  let fixture: ComponentFixture<SelectclientmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectclientmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectclientmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
