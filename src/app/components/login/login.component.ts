import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/login-Services/user-service.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkService } from '../../../services/links-services/LinkService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMsg: string = '';
  isLoading: boolean = false;
  form: FormGroup;

  changeIsLoading() {
    this.isLoading = !this.isLoading;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private links: LinkService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required, 
        Validators.minLength(8)
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required
      ]),
    });
  }

  public loginUser() {
    if (this.form.valid) {
      this.changeIsLoading();
      this.userService
        .loginUser(
          this.form.get('name')!.value,
          this.form.get('password')!.value
        )
        .subscribe(
          data => {
            this.router.navigateByUrl(
              this.links.getLinkToActualCalendarPage()
              );
          },
          error => {
            this.changeIsLoading();
            alert("User with this data wasn't found");
            this.form.reset();
          }
        );
    }
  }
}
