import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinkRequest } from 'src/models/event/links/LinkRequest';
import { LinkResponse } from 'src/models/event/links/LinkResponse';
import { LinkService } from 'src/services/links-services/LinkService';

@Injectable({
  providedIn: 'root',
})
export class LinksRepository {
  constructor(private http: HttpClient, private links: LinkService) {}

  getLinksByEventId(eventId: number) {
    return this.http
      .get<LinkResponse[]>(
        this.links.getLinkToApi(`/link/event/${eventId}`)
      )
      .toPromise();
  }

  updateLink(id: number, updatedLink: LinkRequest) {
    return this.http
      .put<LinkResponse>(
        this.links.getLinkToApi(`/link/${id}`),
        updatedLink
      )
      .toPromise();
  }

  deleteLink(id: number) {
    return this.http
      .delete(this.links.getLinkToApi(`/link/${id}`))
      .toPromise();
  }

  createLink(link: LinkRequest) {
    return this.http.post<LinkResponse>(
      this.links.getLinkToApi(`/link`),
      link
    ).toPromise();
  }
}
