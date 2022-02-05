import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArticleListPublicComponent } from './all-article-list-public.component';

describe('AllArticleListPublicComponent', () => {
  let component: AllArticleListPublicComponent;
  let fixture: ComponentFixture<AllArticleListPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllArticleListPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllArticleListPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
