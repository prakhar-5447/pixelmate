import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { DialogModule } from '@angular/cdk/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { SettingComponent } from './components/setting/setting.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProjectComponent } from './components/project/project.component';
import { AddTaskComponent } from './modal/add-task/add-task.component';
import { ViewComponent } from './components/view/view.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { AddProjectComponent } from './modal/add-project/add-project.component';
import { ActivityComponent } from './components/activity/activity.component';
import { AnalyticComponent } from './modal/analytic/analytic.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SettingComponent,
    SidebarComponent,
    ProjectComponent,
    AddTaskComponent,
    ViewComponent,
    ExploreComponent,
    ChallengeComponent,
    AchievementsComponent,
    AddProjectComponent,
    ActivityComponent,
    AnalyticComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    DragDropModule,
    MatChipsModule,
    DialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
