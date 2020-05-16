import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OracionPage } from './oracion.page';

describe('OracionPage', () => {
  let component: OracionPage;
  let fixture: ComponentFixture<OracionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OracionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
