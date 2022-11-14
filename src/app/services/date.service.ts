import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class DateService {

    constructor() {

    }

    public getCurrentDate():String {
        let d = new Date()
        let date = d.getFullYear().toString() + "-" + (d.getMonth().valueOf() + 1) + "-" + d.getDate().toString() +
        "T" + "00:00:00"; 
        return date;
    }
}