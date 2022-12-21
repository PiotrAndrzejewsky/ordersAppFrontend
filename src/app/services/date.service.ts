import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
  })
export class DateService {

    constructor(
        private cookieService: CookieService
    ) {}

    public convertDateToLocalDateTime(d:Date):string {
        let month = "";
        let day = "";
        if ((d.getMonth().valueOf() + 1) / 10 < 1) {
            month = "0" + (d.getMonth().valueOf() + 1).toString();
        }
        else {
            month = (d.getMonth().valueOf() + 1).toString();
        }

        if (d.getDate() / 10 < 1) {
            day = "0" + d.getDate().toString()
        }
        else {
            day = d.getDate().toString()
        }

        return d.getFullYear().toString() + "-" + month + "-" + day + "T" + this.convertTime(d) + ":00";
    }

    public convertTime(d: Date):string {
        let hours = "";
        let minutes = "";
        try {
          d.getHours();
        }
        catch {
          return this.convertLocalDateTimeToDate(d);
        }
        if (d.getHours() / 10 < 1) {
            hours = "0" + d.getHours().toString();
        }
        else {
            hours = d.getHours().toString();
        }

        if (d.getMinutes() / 10 < 1) {
            minutes = "0" + d.getMinutes().toString();
        }
        else {
            minutes = d.getMinutes().toString();
        }
        return hours + ":" + minutes;
    }

    public convertLocalDateTimeToDate(d: Date): string {
      let dateString = d.toString();
      let hours = dateString.slice(11,13);
      let minutes = dateString.slice(14,16);

      return hours + ":" + minutes;
    }

    public getDate(): string {
        let date = this.cookieService.get("date");
        if (date == "") {
            return this.convertDateToLocalDateTime(new Date());
        }
        return date;
    }
}
