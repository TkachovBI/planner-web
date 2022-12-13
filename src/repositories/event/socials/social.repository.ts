import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialRequest } from 'src/models/event/socials/SocialRequest';
import { SocialResponse } from 'src/models/event/socials/SocialResponse';
import { LinkService } from 'src/services/links-services/LinkService';

@Injectable({
  providedIn: 'root',
})
export class SocialsRepository {
  constructor(private http: HttpClient, private links: LinkService) {}

  async getSocialsByEventId(eventId: number) {
    return await this.http
      .get<SocialResponse[]>(
        this.links.getLinkToApi(`/api/admin/v1/social/byEventId/${eventId}`)
      )
      .toPromise();
  }

  async updateSocial(socialId: number, social: SocialRequest) {
    return await this.http
      .put<SocialRequest>(
        this.links.getLinkToApi(`/api/admin/v1/social/${socialId}`),
        social
      )
      .toPromise();
  }

  async deleteSocial(id: number) {
    return await this.http
      .delete(this.links.getLinkToApi(`/api/admin/v1/social/${id}`))
      .toPromise();
  }
}
