import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgramaPage } from './programa.page';

describe('ProgramaPage', () => {
  let component: ProgramaPage;
  let fixture: ComponentFixture<ProgramaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
