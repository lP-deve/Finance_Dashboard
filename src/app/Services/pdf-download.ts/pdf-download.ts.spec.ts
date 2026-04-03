import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDownloadTs } from './pdf-download.ts';

describe('PdfDownloadTs', () => {
  let component: PdfDownloadTs;
  let fixture: ComponentFixture<PdfDownloadTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfDownloadTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfDownloadTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
