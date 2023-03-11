import { UserRequest } from '../../models/user/userRequest';
import { UserResponse } from '../../models/user/userResponse';
import { HttpClient } from '@angular/common/http';
import { LinkService } from '../../services/links-services/LinkService';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(private http: HttpClient, private links: LinkService) {}

  public loginUser(user: UserRequest) {
    return this.http.put<UserResponse>(
      this.links.getLinkToApi('/user/login'),
      user
    );
  }
}
