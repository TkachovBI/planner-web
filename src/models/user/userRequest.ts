import {UserStatus} from "./UserStatus";

export type UserRequest = {
  name: string;
  password: string;
  status: UserStatus;
}
