import { Injectable } from '@angular/core';
import { EventRequest } from 'src/models/event/eventRequest';
import { EventResponse } from 'src/models/event/eventResponse';
import { EventRepository } from 'src/repositories/event/event.repository';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async getEventsInMonth(month: number, year: number) {
    let events: EventResponse[] = [];
    const eventsFromAPI = await this.eventRepository.getEvents();
    if (eventsFromAPI) {
      eventsFromAPI.forEach((event) => {
        const date = new Date(event.date);
        if (date.getMonth() === month && date.getFullYear() === year) {
          events.push(event);
        }
      });
    }

    return events;
  }
  async getEventById(id: number){
    return await this.eventRepository.getEvent(id);
  }

  async updateEvent(id: number, updatedEvent: EventRequest){
    return await this.eventRepository.updateEvent(id, updatedEvent);
  }
}