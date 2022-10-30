import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { LoginService } from "./login.service";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  lectures = new ReplaySubject<JSON>(1);
  constructor(private http: HttpClient) {
    this.fetch()
  }

  public fetch() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };
    // deployment endpoint: https://cs196.cs.illinois.edu/wsgi/api
    this.http
      .get<JSON>(
        "http://127.0.0.1:5000/api/get/124Lectures",
        httpOptions
      )
      .subscribe((res) => {
        this.lectures.next(res);
      });
  }

  public submit(lectures) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };
    console.log("SENDING!!")
    // deployment endpoint: https://cs196.cs.illinois.edu/wsgi/api
    console.log(lectures)
    this.http
      .post(
        "http://127.0.0.1:5000/api/post/Add124Lectures",
        lectures,
        httpOptions
      ).subscribe((res) => {
        console.log(res)
      });
  }

  public delete(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };
    // deployment endpoint: https://cs196.cs.illinois.edu/wsgi/api
    let body = { 'LectureID': id }
    this.http
      .post(
        "http://127.0.0.1:5000/api/post/Delete124Lectures",
        body,
        httpOptions
      ).subscribe((res) => {
        console.log(res)
      });
  }

  public getLectures(): Observable<JSON> {
    return this.lectures;
  }
}
