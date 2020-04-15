import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ResponseObject } from 'src/app/definitions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) {
    this.initFormController();
  }

  initFormController() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)])
    });
  }

  userLogin() {
    this.httpService.userLogin(this.loginForm.value).subscribe((response: ResponseObject) => {
      if (response.code === 200) {
        window.localStorage.setItem("user", JSON.stringify(response.data));
        this.router.navigate(['profile']);
      } else {
        console.log("Error");
      }
    }, (err) => {
      console.log("Error", err);
    })
  }

  ngOnInit(): void {
  }

}
