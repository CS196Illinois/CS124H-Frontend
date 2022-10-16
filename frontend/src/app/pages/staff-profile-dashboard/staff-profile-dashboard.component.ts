import { Component, OnInit, NgModule, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Observable, Subscriber } from 'rxjs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule]
})

@Component({
  selector: 'app-staff-profile-dashboard',
  templateUrl: './staff-profile-dashboard.component.html',
  styleUrls: ['./staff-profile-dashboard.component.scss']
})
export class StaffProfileDashboardComponent implements OnInit {
  @Input() skills: string;
  profile;
  isSubmit;
  split_skills;
  loadProfile() {
    let profileData = localStorage.getItem('profile-data')
    if (profileData) {
      this.profile = JSON.parse(profileData)
    }
    this.isSubmit = profileData
  }
  setProfile(name, description, skills, picture) {
    let profileData = { 'name': name, 'description': description, 'skills': skills, 'picture': picture }
    localStorage.setItem('profile-data', JSON.stringify(profileData));
    this.loadProfile()
  }
  submitProfile() {
    // TODO: do some stuff to post profile-data to backend and persist in DB
    console.log('sending staff profile data to DB!')
    this.profile = null;
    localStorage.removeItem('profile-data');
  }
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadProfile()
    // this.split_skills = this.skills.split(',');
    // for (let skill in this.split_skills) {
    //   skill.trimLeft();
    //   skill.trimRight();
    // }
  }

}
