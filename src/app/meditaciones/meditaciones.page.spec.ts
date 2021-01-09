import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeditacionesPage } from './meditaciones.page';

describe('MeditacionesPage', () => {
  let component: MeditacionesPage;
  let fixture: ComponentFixture<MeditacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeditacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
