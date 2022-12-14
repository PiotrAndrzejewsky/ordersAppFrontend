import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class DateService {

    constructor() {

    }

    public convertDateToLocalDateTime(d:Date):string {
        let month = ""
        let day = ""
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
        let hours = ""
        let minutes = ""
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
        return hours + ":" + minutes
    }
}