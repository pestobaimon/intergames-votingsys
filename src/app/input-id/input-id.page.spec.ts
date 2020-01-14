import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputIdPage } from './input-id.page';

describe('InputIdPage', () => {
  let component: InputIdPage;
  let fixture: ComponentFixture<InputIdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputIdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
