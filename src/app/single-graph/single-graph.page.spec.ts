import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleGraphPage } from './single-graph.page';

describe('SingleGraphPage', () => {
  let component: SingleGraphPage;
  let fixture: ComponentFixture<SingleGraphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleGraphPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleGraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
