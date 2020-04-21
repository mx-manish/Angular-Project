import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ResponseObject } from 'src/app/definitions';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storege.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  errMessage = '';
  showLoader = false;
  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router, private storage: StorageService) {
    this.initFormController();
  }

  initFormController() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)])
    });
  }

  userLogin() {
    this.showLoader=true;
    this.httpService.userLogin(this.loginForm.value).subscribe((response: ResponseObject) => {
      if (response.code === 200) {
        this.storage.setData('user', JSON.stringify(response.data));
        this.showLoader=false;
        this.router.navigate(['profile']);
      } else {
        this.showLoader=false;
        this.errMessage = response.message;
        this.dismissAlert();
      }
    }, (err) => {
      this.showLoader=false;
      this.errMessage = 'Something went wrong please try again !';
      this.dismissAlert();
    })
  }

  ngOnInit(): void {
  }

  /**
   * @description dismiss alert after 3 sec.
   */
  dismissAlert() {
    setTimeout(() => {
      this.errMessage = '';
    }, 2000)
  }

}
