import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUiTemplateComponent } from './block-ui-template.component';

describe('BlockUiTemplateComponent', () => {
  let component: BlockUiTemplateComponent;
  let fixture: ComponentFixture<BlockUiTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockUiTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockUiTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
