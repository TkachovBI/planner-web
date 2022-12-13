import { Injectable } from '@angular/core';
import { LinkRequest } from 'src/models/event/links/LinkRequest';
import { LinkResponse } from 'src/models/event/links/LinkResponse';
import { LinksRepository } from 'src/repositories/event/link/link.repository';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private linksRepository: LinksRepository) {}

  async getLinksByEventId(linkId: number) {
    let links: LinkResponse[] = [];
    const linksFromApi = await this.linksRepository.getLinksByEventId(linkId);

    if (linksFromApi) {
      links = linksFromApi;
    }

    return links;
  }

  async updateLink(linkId: number, updatedLink: LinkRequest) {
    const link = await this.linksRepository.updateLink(linkId, updatedLink);

    return link!;
  }
}
