import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LinkService {
  getLinkToApi(link: string){
    return `http://localhost:5000${link}`;
  }

  getLinkToActualCalendarPage(){
    const date = new Date();
    return `/calendar/${date.getMonth()}-${date.getFullYear()}`
  }
}
