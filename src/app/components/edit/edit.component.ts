import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventRequest } from 'src/models/event/eventRequest';
import { SocialResponse } from 'src/models/event/socials/SocialResponse';
import { EventService } from 'src/services/event-services/event-service.module';
import { SocialsService } from 'src/services/event-services/socials-services/socials-service.module';
import { LinkService } from 'src/services/links-services/LinkService';
import { SocialStatus } from 'src/models/event/socials/SocialStatus';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  eventForm: FormGroup;
  id: number = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
  socials: SocialResponse[] = [];
  publishedStatus = SocialStatus.PUBLISHED;
  notPublishedStatus = SocialStatus.NOT_PUBLISHED;
  selectedSocial: SocialResponse = {
    id: 0,
    eventId: 0,
    name: '',
    status: SocialStatus.NEED_PUBLISHING,
  };

  showShureWindow: boolean = false;
  isLoadingWindowActive: boolean = true;
  showAddSocialBar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private linkService: LinkService,
    private socialsService: SocialsService
  ) {
    this.eventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      budget: new FormControl(0, [Validators.required, Validators.min(0)]),
      date: new FormControl(new Date().toISOString().substr(0, 10), [
        Validators.required,
      ]),
    });
  }

  async ngOnInit() {
    try {
      let event = await this.eventService.getEventById(this.id);
      if (event) {
        this.eventForm.get('title')?.setValue(event.title);
        this.eventForm.get('budget')?.setValue(event.budget);

        let date = new Date(event.date);
        date.setDate(date.getDate() + 1);

        this.setValueEventDate(date);
      } else {
        this.router.navigateByUrl(`/add`);
      }
    } catch (ex) {
      this.router.navigateByUrl(`/add`);
    }

    let socialsFromApi = await this.socialsService.getSocialsByEventId(this.id);
    if (socialsFromApi) {
      this.socials = socialsFromApi;
    }

    this.isLoadingWindowActive = false;
  }

  setValueEventDate(date: Date) {
    this.eventForm.get('date')?.setValue(date.toISOString().substr(0, 10));
  }

  async updateEvent() {
    let date = new Date(this.eventForm.value.date);
    date.setDate(date.getDate() - 1);

    const updatedEvent: EventRequest = {
      title: this.eventForm.value.title,
      budget: this.eventForm.value.budget,
      date: date,
    };

    const event = await this.eventService.updateEvent(this.id, updatedEvent);
    if (event) {
      this.eventForm.get('title')?.setValue(event.title);
      this.eventForm.get('budget')?.setValue(event.budget);

      let date = new Date(event.date);
      date.setDate(date.getDate() + 1);

      this.setValueEventDate(date);
    }
  }

  backToCalendar() {
    this.router.navigateByUrl(this.linkService.getLinkToActualCalendarPage());
  }

  updateSocialClickHandler(social: SocialResponse) {
    this.selectedSocial = social;

    social.status === SocialStatus.PUBLISHED
      ? (this.selectedSocial.status = SocialStatus.NOT_PUBLISHED)
      : (this.selectedSocial.status = SocialStatus.PUBLISHED);

    this.showShureWindow = true;
  }

  updateSocial() {
    this.socialsService
      .updateSocial(this.selectedSocial)
      .then(() => window.location.reload());
  }

  closeShowWindow() {
    this.showShureWindow = false;
  }

  deleteSocial(id: number) {
    this.socialsService.deleteSocial(id).then(() => window.location.reload());
  }
}
