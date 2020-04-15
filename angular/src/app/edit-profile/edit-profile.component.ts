import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileData: FormGroup;
  @Input() userData: any;
  @Output() profileUpdated = new EventEmitter();
  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.initializeFormController();
  }

  initializeFormController() {
    this.profileData = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      mobile: this.fb.control('', [Validators.required, Validators.minLength(10)]),
      city: this.fb.control('', [Validators.required]),
      dob: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.profileData.controls.name.setValue(this.userData.name);
    this.profileData.controls.email.setValue(this.userData.email);
    this.profileData.controls.mobile.setValue(this.userData.mobile);
    this.profileData.controls.city.setValue(this.userData.city);
    // const dob = new DatePipe('en-US').transform(this.userData.dob, 'yyyy-MM-dd')
    this.profileData.controls.dob.setValue(this.userData.dob);
  }

  updateProfile() {
    this.profileData.value.user_id = this.userData.Id;
    this.httpService.updateprofile(this.profileData.value).subscribe((response: any) => {
      if (response.code === 200) {
        this.userData.email = this.profileData.value.email;
        this.userData.name = this.profileData.value.name;
        this.userData.mobile = this.profileData.value.mobile;
        this.userData.city = this.profileData.value.city;
        this.userData.dob = this.profileData.value.dob;
        window.localStorage.setItem("user", JSON.stringify(this.userData));
        this.profileUpdated.emit(this.userData);
      }
    }, (err) => {
      console.log('Error', err);
    });
  }

}
