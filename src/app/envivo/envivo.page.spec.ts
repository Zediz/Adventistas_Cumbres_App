import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnvivoPage } from './envivo.page';

describe('EnvivoPage', () => {
  let component: EnvivoPage;
  let fixture: ComponentFixture<EnvivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvivoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnvivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
