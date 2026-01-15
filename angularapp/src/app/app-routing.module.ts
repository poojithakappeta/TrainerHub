import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TrainerManagementComponent } from './components/trainer-management/trainer-management.component';
import { CoordinatorViewTrainersComponent } from './components/coordinator-view-trainers/coordinator-view-trainers.component';
import { CoordinatorViewRequirementsComponent } from './components/coordinator-view-requirements/coordinator-view-requirements.component';
import { CoordinatornavComponent } from './components/coordinatornav/coordinatornav.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerRequirementComponent } from './components/manager-requirement/manager-requirement.component';
import { ManagerViewRequirementsComponent } from './components/manager-view-requirements/manager-view-requirements.component';
import { ManagerpostfeedbackComponent } from './components/managerpostfeedback/managerpostfeedback.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { CoordinatorviewfeedbackComponent } from './components/coordinatorviewfeedback/coordinatorviewfeedback.component';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { SelectedTrainersComponent } from './components/selected-trainers/selected-trainers.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path:'dashboard',component:DashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomePageComponent, canActivate:[AuthGuard] },
  { path: 'trainers', component: TrainerManagementComponent,canActivate:[AuthGuard],data:{role:"Coordinator"}},
  { path: 'trainers/view', component: CoordinatorViewTrainersComponent, canActivate:[AuthGuard],data:{role:"Coordinator"} },
  { path: 'requirements', component: CoordinatorViewRequirementsComponent, canActivate:[AuthGuard],data:{role:"Coordinator"} },
  { path: 'coordinator-nav', component: CoordinatornavComponent,canActivate:[AuthGuard],data:{role:"Coordinator"} },
  { path: 'manager-nav', component: ManagernavComponent,canActivate:[AuthGuard],data:{role:"Manager"} },
  { path: 'managerrequirement', component: ManagerRequirementComponent,canActivate:[AuthGuard],data:{role:"Manager"} },
  { path: 'managerviewrequirements', component: ManagerViewRequirementsComponent,canActivate:[AuthGuard],data:{role:"Manager"} },
  { path: 'feedback', component: ManagerpostfeedbackComponent, canActivate:[AuthGuard],data:{role:"Manager"} },
  { path: 'managerrequirement/:id', component: ManagerRequirementComponent, canActivate:[AuthGuard],data:{role:"Manager"} },
  { path: "editTrainer/:id", component: TrainerManagementComponent, canActivate:[AuthGuard],data:{role:"Coordinator"} },
  { path: 'feedback/:id', component: ManagerpostfeedbackComponent ,canActivate:[AuthGuard],data:{role:"Manager"}  },
  { path: 'viewFeedback', component: ManagerviewfeedbackComponent, canActivate:[AuthGuard],data:{role:"Manager"} },
  { path: 'feedbacks', component: CoordinatorviewfeedbackComponent , canActivate:[AuthGuard],data:{role:"Coordinator"}},
  { path: 'trainerdetails/:trainerId/:reqId', component: TrainerDetailsComponent, canActivate:[AuthGuard],data:{role:"Manager"}  },
  { path: 'select-trainers/:id', component: SelectedTrainersComponent, canActivate:[AuthGuard],data:{role:"Manager"}  },
  { path: 'select-trainers', component: SelectedTrainersComponent, canActivate:[AuthGuard],data:{role:"Manager"}  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
