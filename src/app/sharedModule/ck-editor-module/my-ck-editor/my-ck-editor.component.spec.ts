import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCkEditorComponent } from './my-ck-editor.component';

describe('MyCkEditorComponent', () => {
  let component: MyCkEditorComponent;
  let fixture: ComponentFixture<MyCkEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCkEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCkEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
