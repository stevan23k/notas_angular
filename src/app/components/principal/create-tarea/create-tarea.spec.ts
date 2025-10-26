import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTarea } from './create-tarea';

describe('CreateTarea', () => {
  let component: CreateTarea;
  let fixture: ComponentFixture<CreateTarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTarea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
