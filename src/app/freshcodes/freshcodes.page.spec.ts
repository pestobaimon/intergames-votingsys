import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FreshcodesPage } from './freshcodes.page';

describe('FreshcodesPage', () => {
  let component: FreshcodesPage;
  let fixture: ComponentFixture<FreshcodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreshcodesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FreshcodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
