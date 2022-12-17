import { Injectable } from '@angular/core';
import { LinkRequest } from 'src/models/event/links/LinkRequest';
import { LinkResponse } from 'src/models/event/links/LinkResponse';
import { LinksRepository } from 'src/repositories/event/link/link.repository';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor(private linksRepository: LinksRepository) {}

  async getLinksByEventId(eventId: number) {
    let links: LinkResponse[] = [];
    const linksFromApi = await this.linksRepository.getLinksByEventId(eventId);

    if (linksFromApi) {
      links = linksFromApi;
    }

    return links;
  }

  async updateLink(linkId: number, updatedLink: LinkRequest) {
    const link = await this.linksRepository.updateLink(linkId, updatedLink);

    return link!;
  }

  async deleteLink(id: number) {
    return await this.linksRepository.deleteLink(id);
  }

  async createLink(eventId: number, taskLink: string, materialsLink: string) {
    var newLink: LinkRequest = {
      eventId: eventId,
      task: taskLink,
      material: materialsLink,
    };

    return await this.linksRepository.createLink(newLink);
  }
}
