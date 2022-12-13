import { Injectable } from '@angular/core';
import { SocialRequest } from 'src/models/event/socials/SocialRequest';
import { SocialResponse } from 'src/models/event/socials/SocialResponse';
import { SocialStatus } from 'src/models/event/socials/SocialStatus';
import { SocialsRepository } from 'src/repositories/event/socials/social.repository';

@Injectable({
  providedIn: 'root',
})
export class SocialsService {
  constructor(private socialsRepository: SocialsRepository) {}

  async getSocialsByEventId(eventId: number) {
    let socials: SocialResponse[] = [];

    const socialsFromApi = await this.socialsRepository.getSocialsByEventId(
      eventId
    );
    if (socialsFromApi) {
      socials = socialsFromApi;
    }

    return socials;
  }

  async updateSocial(social: SocialResponse) {
    const socialRequest: SocialRequest = {
      name: social.name,
      eventId: social.eventId,
      status: social.status,
    };

    const result = await this.socialsRepository.updateSocial(
      social.id,
      socialRequest
    );

    return result;
  }

  async deleteSocial(id: number) {
    await this.socialsRepository.deleteSocial(id);
  }
}
