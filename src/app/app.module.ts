import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { UserService } from '../services/login-Services/user-service.module';
import { UserRepository } from '../repositories/user/user.repository';
import { EditComponent } from './components/edit/edit.component';
import { EventRepository } from 'src/repositories/event/event.repository';
import { LinksRepository } from 'src/repositories/event/link/link.repository';
import { SocialsRepository } from 'src/repositories/event/socials/social.repository';
import { EventService } from 'src/services/event-services/event-service.module';
import { SocialsService } from 'src/services/event-services/socials-services/socials-service.module';
import { LinkService } from 'src/services/links-services/LinkService';

@NgModule({
  declarations: [AppComponent, LoginComponent, EditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    UserRepository,
    EventService,
    EventRepository,
    SocialsService,
    SocialsRepository,
    LinkService,
    LinksRepository,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
