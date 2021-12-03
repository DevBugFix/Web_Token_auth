import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateArticleComponent } from './add-update-article.component';

describe('AddUpdateArticleComponent', () => {
  let component: AddUpdateArticleComponent;
  let fixture: ComponentFixture<AddUpdateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
