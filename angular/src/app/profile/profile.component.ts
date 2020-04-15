import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userProfile;
  public showProfile = false;
  public showPasswordComponent = false;
  showUploadButton = false;
  constructor(private http: HttpService,private routing:Router) { }

  ngOnInit(): void {
    const storageData = window.localStorage.getItem('user');
    this.userProfile = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
  }

  showComponent(component) {
    if (component === 'profile') {
      this.showPasswordComponent = false;
      this.showProfile = !this.showProfile;
    } else {
      this.showProfile = false;
      this.showPasswordComponent = !this.showPasswordComponent;
    }
  }

  profileUpdateHandler(updateData) {
    this.userProfile = updateData;
  }

  logoutUser(){
    window.localStorage.clear();
    this.routing.navigateByUrl('/login');
  }

  onFileChange(evt) {
    console.log("Event taret value", evt.target.files);
    if (evt.target.files.length > 0) {
      const formData = new FormData();
      formData.append('avatar', evt.target.files[0])
      this.http.uploadAvatar(formData, this.userProfile.Id).subscribe((response: any) => {
        if (response.code) {
          this.userProfile.profileURL = response.data.profileURL;
          window.localStorage.setItem("user", JSON.stringify(this.userProfile));
        }
      }, (err) => {
        console.log("Error", err);
      });
    }
  }

}
