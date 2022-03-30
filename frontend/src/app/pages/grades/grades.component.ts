import { Component, OnInit, ChangeDetectorRef, NgZone } from "@angular/core";
import { GradesService } from "src/app/services/grades.service";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-grades",
  templateUrl: "./grades.component.html",
  styleUrls: ["./grades.component.scss"],
})
export class GradesComponent implements OnInit {
  grades: JSON;
  weekly = [];
  hwGrades = [];
  projectGrades = [];
  name: string;
  user: gapi.auth2.GoogleUser;
  flag: boolean = false;
  constructor(
    private GradesService: GradesService,
    private LoginService: LoginService,
    private ref: ChangeDetectorRef,
    private NgZone: NgZone
  ) { }
  isSignedIn: boolean = false;
  isIllini: boolean = true;
  ngOnInit() {
    this.LoginService.observable().subscribe((user) => {
      this.user = user;
      this.ref.detectChanges();
      this.GradesService.getGrades().subscribe((data) => {
        this.grades = data;
        if (this.grades) {
          // console.log(`THIS IS THE GRADES: ${this.grades['grades']['weekly']['']}`)
          this.NgZone.run(() => {
            this.clearGrades()
            this.displayGrades(this.grades);
          });
        }
      });
    });
  }

  clearGrades() {
    this.weekly = []
    this.hwGrades = []
    this.projectGrades = []
  }

  displayGrades(data: any) {
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
    var grades = JSON.parse(JSON.stringify(data));
    console.log("tyest" + grades['grades']);
    var gradesArr = grades['grades']['weekly'];
    var otherGradesDict = grades['grades']['otherGrades']
    for (var i = 0; i < gradesArr.length; i++) {
      for (const [key, value] of Object.entries(gradesArr[i])) {
        if (key === 'total') {
          this.weekly.push([`Week ${i + 1}`, value])
        }
      }
    }
    this.hwGrades.push(['Github Homework', otherGradesDict['hw_gh']])
    this.hwGrades.push(['Bash Homework', otherGradesDict['hw_bash']])
    this.hwGrades.push(['Project Interest', otherGradesDict['hw_project_interest']])
    this.hwGrades.push(['Project Idea', otherGradesDict['hw_project_idea']])
    this.projectGrades.push(['Midterm Presentation', otherGradesDict['project_mt_pres']])
  }
}
