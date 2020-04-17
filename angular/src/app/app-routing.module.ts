import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AuthguardService as AuthGuard } from './services/authguard.service';
const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'update-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'password', component: UpdatePasswordComponent, canActivate: [AuthGuard] },
  { path: '**', component: HeaderComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }