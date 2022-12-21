import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventResponse } from 'src/models/event/eventResponse';
import { SocialRequest } from 'src/models/event/socials/SocialRequest';
import { SocialResponse } from 'src/models/event/socials/SocialResponse';
import { LinkCache, SocialCache } from 'src/models/event/socials/SocialsCache';
import { SocialStatus } from 'src/models/event/socials/SocialStatus';
import { EventService } from 'src/services/event-services/event-service.module';
import { LinksService } from 'src/services/event-services/link-services/link-service.module';
import { SocialsService } from 'src/services/event-services/socials-services/socials-service.module';
import { getWeekDayNames, monthData } from 'src/utils/calendar/calendar.utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  monthId: number = 0;
  year: number = 2022;
  events: EventResponse[] = [];
  isLoadingWindowActive: boolean = true;
  calendarBlocksData: (Date | undefined)[][] = [[undefined]];
  dayNames: string[] = [];
  socialCache: SocialCache = {
    0: [],
  };
  linksCache: LinkCache = {
    0: [],
  };

  publishedStatus = SocialStatus.PUBLISHED;
  showShureWindow: boolean = false;
  selectedSocial: SocialResponse = {
    id: 0,
    eventId: 0,
    name: '',
    status: SocialStatus.NEED_PUBLISHING,
  };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private socialsService: SocialsService,
    private router: Router,
    private linkService: LinksService
  ) {}

  async ngOnInit() {
    const monthAndYear = this.route.snapshot.paramMap
      .get('monthString')!
      .split('-');
    this.monthId = Number.parseInt(monthAndYear[0]);
    this.year = Number.parseInt(monthAndYear[1]);
    this.calendarBlocksData = monthData(this.year, this.monthId).result;
    this.dayNames = getWeekDayNames();
    this.events = await this.eventService.getEventsInMonth(
      this.monthId,
      this.year
    );
    await this.events.forEach(async (event) => {
      const socials = await this.socialsService.getSocialsByEventId(event.id);
      const links = await this.linkService.getLinksByEventId(event.id);

      this.socialCache[event.id] = socials;
      this.linksCache[event.id] = links;
    });

    this.changeLoadingWindowStatus();
  }

  changeLoadingWindowStatus() {
    this.isLoadingWindowActive = !this.isLoadingWindowActive;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  }

  getEventsByDay(day: Date): EventResponse[] {
    return this.events.filter(
      (event) => new Date(event.date).getDate() === day.getDate()
    );
  }
  updateSocialClickHandler(social: SocialResponse) {
    if (social.status !== SocialStatus.PUBLISHED) {
      this.selectedSocial = social;
      this.showShureWindow = true;
    }
  }
  closeShowWindow() {
    this.showShureWindow = false;
  }
  updateSocial() {
    this.selectedSocial.status = SocialStatus.PUBLISHED;
    this.socialsService
      .updateSocial(this.selectedSocial)
      .then(() => window.location.reload());
  }

  navigateToSettingPage(eventId: number) {
    this.router.navigateByUrl(`/edit/${eventId}`);
  }

  navigateToEditPage(day: number) {
    this.router.navigateByUrl(`/add/${this.monthId+1}-${day}-${this.year}`);
  }
}
