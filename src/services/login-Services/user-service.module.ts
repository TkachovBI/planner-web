import {Injectable} from "@angular/core";
import {UserRepository} from "../../repositories/user/user.repository";
import {UserStatus} from "../../models/user/UserStatus";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private userRepository: UserRepository) {
  }

  loginUser(userName: string, password: string) {
    return this.userRepository.loginUser({name: userName, password: password, status: UserStatus.USER});
  }

}
