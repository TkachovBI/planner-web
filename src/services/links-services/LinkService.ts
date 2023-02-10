import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LinkService {
  getLinkToApi(link: string){
    return `http://54.173.64.17:8080${link}`;
  }

  getLinkToActualCalendarPage(){
    const date = new Date();
    return `/calendar/${date.getMonth()}-${date.getFullYear()}`
  }
}
