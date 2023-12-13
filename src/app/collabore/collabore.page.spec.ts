import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaborePage } from './collabore.page';

describe('CollaborePage', () => {
  let component: CollaborePage;
  let fixture: ComponentFixture<CollaborePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CollaborePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
