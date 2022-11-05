import {UserStatus} from "./UserStatus";

export type UserResponse = {
  id: number;
  name: string;
  password: string;
  status: UserStatus;
}
