import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { monthData } from 'src/utils/calendar/calendar.utils';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { CalendarComponent } from './calendar.component';
import { UserService } from 'src/services/login-Services/user-service.module';
import { UserRepository } from 'src/repositories/user/user.repository';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UserService, UserRepository],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('monthData for September 2022', () => {
    const year = 2022;
    const month = 8;

    const input = monthData(year, month);
    const result = {
      result: [
        [
          undefined,
          undefined,
          undefined,
          new Date(year, month, 1),
          new Date(year, month, 2),
          new Date(year, month, 3),
          new Date(year, month, 4),
        ],
        [
          new Date(year, month, 5),
          new Date(year, month, 6),
          new Date(year, month, 7),
          new Date(year, month, 8),
          new Date(year, month, 9),
          new Date(year, month, 10),
          new Date(year, month, 11),
        ],
        [
          new Date(year, month, 12),
          new Date(year, month, 13),
          new Date(year, month, 14),
          new Date(year, month, 15),
          new Date(year, month, 16),
          new Date(year, month, 17),
          new Date(year, month, 18),
        ],
        [
          new Date(year, month, 19),
          new Date(year, month, 20),
          new Date(year, month, 21),
          new Date(year, month, 22),
          new Date(year, month, 23),
          new Date(year, month, 24),
          new Date(year, month, 25),
        ],
        [
          new Date(year, month, 26),
          new Date(year, month, 27),
          new Date(year, month, 28),
          new Date(year, month, 29),
          new Date(year, month, 30),
          undefined,
          undefined,
        ],
      ],
    };
    expect(input.result).toEqual(result.result);
  });

  it('monthData for February 2020', () => {
    const year = 2020;
    const month = 1;

    const input = monthData(year, month);
    const result = {
      result: [
        [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          new Date(year, month, 1),
          new Date(year, month, 2),
        ],
        [
          new Date(year, month, 3),
          new Date(year, month, 4),
          new Date(year, month, 5),
          new Date(year, month, 6),
          new Date(year, month, 7),
          new Date(year, month, 8),
          new Date(year, month, 9),
        ],
        [
          new Date(year, month, 10),
          new Date(year, month, 11),
          new Date(year, month, 12),
          new Date(year, month, 13),
          new Date(year, month, 14),
          new Date(year, month, 15),
          new Date(year, month, 16),
        ],
        [
          new Date(year, month, 17),
          new Date(year, month, 18),
          new Date(year, month, 19),
          new Date(year, month, 20),
          new Date(year, month, 21),
          new Date(year, month, 22),
          new Date(year, month, 23),
        ],
        [
          new Date(year, month, 24),
          new Date(year, month, 25),
          new Date(year, month, 26),
          new Date(year, month, 27),
          new Date(year, month, 28),
          new Date(year, month, 29),
          undefined,
        ],
      ],
    };
    expect(input.result).toEqual(result.result);
  });
});
