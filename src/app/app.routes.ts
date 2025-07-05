import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { QaComponent } from './components/qa/qa.component';
import { authGuard } from './guards/auth.guard';
import { ChatComponent } from './components/chat/chat.component';
import { AdminGuard } from './guards/admin.guard';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { CreatePdfComponent } from './components/create-pdf/create-pdf.component';
import { EditPdfComponent } from './components/edit-pdf/edit-pdf.component';
import { FbAuthComponent } from './components/auth/fb-auth/fb-auth.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { HomeComponent } from './components/commom-components/home/home.component';
import { NotComponent } from './components/commom-components/not-found/not-found.component';
import { MatFormsComponent } from './components/mat-forms/mat-forms.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'fb', component: FbAuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'upload', component: MatFormsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'qa', component: QaComponent, canActivate: [authGuard] },
  { path: 'create_pdf', component: CreatePdfComponent, canActivate: [authGuard] },
  { path: 'edit_pdf', component: EditPdfComponent , canActivate: [authGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: 'admin/users', component: UserManagementComponent, canActivate: [AdminGuard] },
  { path: '**', component: NotComponent},
];
