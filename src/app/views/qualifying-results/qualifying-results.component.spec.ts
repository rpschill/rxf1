import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifyingResultsComponent } from './qualifying-results.component';
import { ActivatedRoute } from '@angular/router';
import { QualifyingResultsService } from 'src/app/services/qualifying-results.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('QualifyingResultsComponent', () => {
  let component: QualifyingResultsComponent;
  let fixture: ComponentFixture<QualifyingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualifyingResultsComponent ],
      providers:[
        QualifyingResultsService
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        MatTableModule,
        MatProgressSpinnerModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualifyingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
