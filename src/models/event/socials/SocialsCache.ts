import { LinkResponse } from "../links/LinkResponse";
import { SocialResponse } from "./SocialResponse";

export type SocialCache = Record<number, SocialResponse[]>;

export type LinkCache = Record<number, LinkResponse[]>;