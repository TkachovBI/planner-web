import { SocialStatus } from './SocialStatus';

export type SocialRequest = {
  eventId: number;
  name: string;
  status: SocialStatus;
};
