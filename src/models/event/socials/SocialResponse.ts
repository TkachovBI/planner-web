import { SocialStatus } from './SocialStatus';

export type SocialResponse = {
  id: number;
  eventId: number;
  name: string;
  status: SocialStatus;
};
