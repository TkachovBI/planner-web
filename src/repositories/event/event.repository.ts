import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventRequest } from 'src/models/event/eventRequest';
import { EventResponse } from 'src/models/event/eventResponse';
import { LinkService } from 'src/services/links-services/LinkService';

@Injectable({
  providedIn: 'root',
})
export class EventRepository {
  constructor(private http: HttpClient, private links: LinkService) {}

  public async getEvents() {
    return await this.http
      .get<EventResponse[]>(this.links.getLinkToApi('/api/admin/v1/event'))
      .toPromise();
  }

  public async getEvent(id: number) {
    return await this.http
      .get<EventResponse>(this.links.getLinkToApi(`/api/admin/v1/event/${id}`))
      .toPromise();
  }

  public async updateEvent(id: number, updatedEvent: EventRequest) {
    return await this.http
      .put<EventResponse>(
        this.links.getLinkToApi(`/api/admin/v1/event/${id}`),
        updatedEvent
      )
      .toPromise();
  }

  public async deleteEvent(id: number) {
    return await this.http
      .delete(this.links.getLinkToApi(`/api/admin/v1/event/${id}`))
      .toPromise();
  }
}
