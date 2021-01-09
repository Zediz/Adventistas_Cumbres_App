import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeditacionPage } from './meditacion.page';

describe('MeditacionPage', () => {
  let component: MeditacionPage;
  let fixture: ComponentFixture<MeditacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeditacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
