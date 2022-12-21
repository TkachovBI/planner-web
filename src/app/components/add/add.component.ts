import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/services/event-services/event-service.module';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  eventForm: FormGroup;

  dateString = this.route.snapshot.paramMap.get('date')!;
  date = new Date(this.dateString);

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {
    this.date.setHours(12);

    this.eventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      budget: new FormControl(0, [Validators.required, Validators.min(0)]),
      date: new FormControl(this.date.toISOString().substr(0, 10), [
        Validators.required,
      ]),
    });
  }

  async addEvent() {
    const title = this.eventForm.get('title')?.value;
    const date = new Date(this.eventForm.get('date')?.value);
    const budget = Number.parseInt(this.eventForm.get('budget')?.value);

    date.setMonth(date.getMonth())

    await this.eventService.createEvent(date, title, budget);

    this.router.navigateByUrl(
      `/calendar/${date.getMonth()}-${date.getFullYear()}`
    );
  }
}
