import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ordersAppFrontend';

  public searchModel:SearchModelView = {
    search: ""
  };
  private refreshUrl = environment.baseUrl + "user/refresh";
  private loginUrl = environment.baseFrontendUrl + "login";

  constructor(
    private http:HttpClient,
    private cookieService:CookieService
  ) {}
}

export interface SearchModelView {
  search:string
}


