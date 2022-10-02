import { ChangeDetectorRef, Component } from "@angular/core";
import { LoginService } from "./services/login.service";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "website2020";
  user: gapi.auth2.GoogleUser;
  url = '/'
  constructor(
    private LoginService: LoginService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url
      }
    })
    this.LoginService.observable().subscribe((user) => {
      this.user = user;
      this.ref.detectChanges();
    });
  }

  signIn() {
    this.LoginService.signIn();
  }

  signOut() {
    this.LoginService.signOut();
  }
}
