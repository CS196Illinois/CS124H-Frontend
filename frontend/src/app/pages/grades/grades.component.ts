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
  sprint0 = [];
  sprint1 = [];
  sprint2 = [];
  sprint3 = [];
  sprint4 = [];
  sprint5 = [];
  name: string;
  user: gapi.auth2.GoogleUser;
  flag: boolean = false;
  constructor(
    private GradesService: GradesService,
    private LoginService: LoginService,
    private ref: ChangeDetectorRef,
    private NgZone: NgZone
  ) {}
  isSignedIn: boolean = false;
  isIllini: boolean = true;
  ngOnInit() {
    this.LoginService.observable().subscribe((user) => {
      this.user = user;
      this.ref.detectChanges();
      this.GradesService.getGrades().subscribe((data) => {
        this.grades = data;
        if (this.grades) {
          this.NgZone.run(() => {
            this.displayGrades(this.grades);
          });
        }
      });
    });
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
    console.log("tyest" + grades);
    var gradesArr = grades.grades;
    for (var i = 0; i < gradesArr.length; i++) {
      for (const [key, value] of Object.entries(gradesArr[i])) {
        let assignmentName = "";
        switch (key) {
          case "sprint":
            continue;
          case "sprint grade":
            assignmentName = "Total Sprint Grade";
            break;
          case "participation grades":
            assignmentName = "Project Participation";
            break;
          case "vcs grades":
            assignmentName = "Version Control and Workflow";
            break;
          case "completion individual grade":
            assignmentName = "Task Completion";
            break;
          case "comm_grades_team":
            assignmentName = "Communication";
            break;
          case "completion_grades_team":
            assignmentName = "Team Completion";
        }
        console.log({ assignmentName: assignmentName, grade: value });
        switch (i) {
          case 0:
            this.sprint0.push({ assignmentName: assignmentName, grade: value });
            break;
          case 1:
            this.sprint1.push({ assignmentName: assignmentName, grade: value });
            break;
          case 2:
            this.sprint2.push({ assignmentName: assignmentName, grade: value });
            break;
          case 3:
            this.sprint3.push({ assignmentName: assignmentName, grade: value });
            break;
          case 4:
            this.sprint4.push({ assignmentName: assignmentName, grade: value });
            break;
          case 5:
            this.sprint5.push({ assignmentName: assignmentName, grade: value });
            break;
        }
      }
    }
  }
}
