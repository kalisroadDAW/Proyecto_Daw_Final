import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserEditComponent } from './page-user-edit.component';

describe('PageUserEditComponent', () => {
  let component: PageUserEditComponent;
  let fixture: ComponentFixture<PageUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUserEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
