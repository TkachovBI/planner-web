import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventRequest } from 'src/models/event/eventRequest';
import { SocialResponse } from 'src/models/event/socials/SocialResponse';
import { EventService } from 'src/services/event-services/event-service.module';
import { SocialsService } from 'src/services/event-services/socials-services/socials-service.module';
import { LinkService } from 'src/services/links-services/LinkService';
import { SocialStatus } from 'src/models/event/socials/SocialStatus';
import { stringify } from 'postcss';
import { SocialRequest } from 'src/models/event/socials/SocialRequest';
import { LinkResponse } from 'src/models/event/links/LinkResponse';
import { LinksService } from 'src/services/event-services/link-services/link-service.module';
import { LinkRequest } from 'src/models/event/links/LinkRequest';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  eventForm: FormGroup;
  socialForm: FormGroup;
  linkForm: FormGroup;
  linkUpdateForm: FormGroup;

  id: number = Number.parseInt(this.route.snapshot.paramMap.get('id')!);

  socials: SocialResponse[] = [];
  links: LinkResponse[] = [];

  publishedStatus = SocialStatus.PUBLISHED;
  notPublishedStatus = SocialStatus.NOT_PUBLISHED;

  selectedSocial: SocialResponse = {
    id: 0,
    eventId: 0,
    name: '',
    status: SocialStatus.NEED_PUBLISHING,
  };
  selectedLinkId: number = 0;

  isLoadingWindowActive: boolean = true;

  showAddSocialBar: boolean = false;
  showAddLinkBar: boolean = false;

  showUpdateLinkBar: boolean = false;

  showShureWindow: boolean = false;
  showSureDeleteLinkWindow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private linkService: LinkService,
    private socialsService: SocialsService,
    private linksService: LinksService
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

    this.socialForm = new FormGroup({
      name: new FormControl('discord', []),
      status: new FormControl(this.notPublishedStatus, []),
    });

    this.linkForm = new FormGroup({
      task: new FormControl('', []),
      materials: new FormControl('', []),
    });

    this.linkUpdateForm = new FormGroup({
      task: new FormControl('', []),
      materials: new FormControl('', []),
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

    this.links = await this.linksService.getLinksByEventId(this.id);

    this.isLoadingWindowActive = false;
  }

  setValueEventDate(date: Date) {
    this.eventForm.get('date')?.setValue(date.toISOString().substr(0, 10));
  }

  changeVisibilityAddSocialBar() {
    this.showAddSocialBar = !this.showAddSocialBar;
  }

  async updateEvent() {
    let date = new Date(this.eventForm.value.date);
    date.setDate(date.getDate());

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
      date.setDate(date.getDate());

      this.setValueEventDate(date);

      this.router.navigateByUrl(
        `/calendar/${new Date().getMonth()}-${new Date().getFullYear()}`
      );
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

  async deleteSocial(id: number) {
    await this.socialsService.deleteSocial(id);

    this.socials = this.socials.filter((x) => x.id !== id);
  }

  async createSocial() {
    const newSocial: SocialRequest = {
      eventId: this.id,
      name: this.socialForm.get('name')?.value,
      status: this.socialForm.get('status')?.value,
    };

    const createdSocial = await this.socialsService.createSocial(newSocial);

    if (createdSocial) {
      this.socials.push(createdSocial);
    }

    this.changeVisibilityAddSocialBar();
  }

  async deleteLink() {
    const i = await this.linksService.deleteLink(this.selectedLinkId);

    this.links = this.links.filter((x) => x.id !== this.selectedLinkId);
    this.showSureDeleteLinkWindow = false;
  }

  closeDeleteLinkShowWindow() {
    this.showSureDeleteLinkWindow = false;
  }

  showDeleteLinkSureWindow(id: number) {
    this.selectedLinkId = id;
    this.showSureDeleteLinkWindow = true;
  }

  changeVisibilityAddLinkWindow() {
    this.showAddLinkBar = !this.showAddLinkBar;
  }

  async createLink() {
    var createdLink = await this.linksService.createLink(
      this.id,
      this.linkForm.get('task')?.value,
      this.linkForm.get('materials')?.value
    );

    if (createdLink) {
      this.links.push(createdLink);
      this.changeVisibilityAddLinkWindow();
    }
  }

  changeShowUpdateLinkBar() {
    this.showUpdateLinkBar = !this.showUpdateLinkBar;
  }

  showLinkUpdateWindow(id: number) {
    this.selectedLinkId = id;

    var link = this.links.find((x) => x.id === id)!;

    this.linkUpdateForm.get('task')?.setValue(link.task);
    this.linkUpdateForm.get('materials')?.setValue(link.material);

    this.changeShowUpdateLinkBar();
  }

  async updateLink() {
    let link: LinkRequest = {
      eventId: this.id,
      task: this.linkUpdateForm.get('task')?.value,
      material: this.linkUpdateForm.get('materials')?.value,
    };

    const newLink = await this.linksService.updateLink(
      this.selectedLinkId,
      link
    );

    for (let index = 0; index < this.links.length; index++) {
      if (this.links[index].id === newLink.id) {
        this.links[index].task = newLink.task;
        this.links[index].material = newLink.material;
      }
    }

    this.selectedLinkId = 0;
    this.changeShowUpdateLinkBar();
  }

  async deleteEvent(){
    this.socials.forEach(async social => {
      await this.socialsService.deleteSocial(social.id);
    })

    this.links.forEach(async link => {
      await this.linksService.deleteLink(link.id)
    })

    await this.eventService.deleteEvent(this.id);

    this.router.navigateByUrl(this.linkService.getLinkToActualCalendarPage())
  }
}
