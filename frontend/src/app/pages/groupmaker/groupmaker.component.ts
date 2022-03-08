import { Component, OnInit, ChangeDetectorRef, NgZone} from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";

@Component({
  selector: "app-groupmaker",
  templateUrl: "./groupmaker.component.html",
  styleUrls: ["./groupmaker.component.scss"],
})
export class GroupMakerComponent implements OnInit {
  name: string
  user: gapi.auth2.GoogleUser;
  isSignedIn: boolean = false;
  isIllini: boolean = true;
  
  response = new ReplaySubject<JSON>(1);

  constructor(
    private LoginService: LoginService,
    private ref: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.LoginService.observable().subscribe((user) => {
      this.user = user;
      if (
        this.user
          .getBasicProfile()
          .getEmail()
          .match("(?:@)[^.]+(?=.)")[0]
          .substr(1) !== "illinois"
      ) {
        this.isIllini = false;
      }
      this.name = this.user.getBasicProfile().getGivenName();
      this.ref.detectChanges();
    });
  }

  public post(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.user.getAuthResponse().id_token,
      }),
    };

    this.http
      .post<JSON>(
        "https://cs196.cs.illinois.edu/wsgi/api/post/124-project-profiles",
        body,
        httpOptions
      )
      .subscribe((res) => {
        this.response.next(res);
      });
  }
}
