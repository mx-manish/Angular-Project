import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storege.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userProfile;
  public showProfile = false;
  public showPasswordComponent = false;
  public showUploadButton = false;
  public showLoader = false;
  constructor(private http: HttpService, private routing: Router, private storage: StorageService) { }

  ngOnInit(): void {
    const storageData = this.storage.getData('user');
    this.userProfile = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
    this.userProfile.age = moment().diff(moment(this.userProfile.dob, 'YYYY-MM-DD'), 'years');
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

  logoutUser() {
    this.storage.clearStorage();
    this.routing.navigateByUrl('/login');
  }

  onFileChange(evt) {
    console.log("Event taret value", evt.target.files);
    if (evt.target.files.length > 0) {
      this.showLoader = true;
      const formData = new FormData();
      formData.append('avatar', evt.target.files[0])
      this.http.uploadAvatar(formData, this.userProfile.Id).subscribe((response: any) => {
        this.showLoader = false;
        if (response.code) {
          this.userProfile.profileURL = response.data.profileURL;
          this.storage.setData('user', JSON.stringify(this.userProfile));
        }
      }, (err) => {
        this.showLoader = false;
      });
    }
  }

}
