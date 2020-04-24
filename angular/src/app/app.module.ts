import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
// import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { userLoginReducer } from 'src/app/store/user.reducer';
import { StoreModule } from '@ngrx/store';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    EditProfileComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // NgReduxModule,
    StoreModule.forRoot({ userLogin: userLoginReducer }, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(private ngRedux: NgRedux<UserStore>) {
  //   this.ngRedux.configureStore(userReducer, {});
  // }
}
