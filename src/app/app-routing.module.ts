import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProjectComponent } from './components/project/project.component';
import { ViewComponent } from './components/view/view.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { ActivityComponent } from './components/activity/activity.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: HomeComponent,
          },
          {
            path: 'project',
            component: ProjectComponent,
          },
        ],
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'explore',
        children: [
          {
            path: '',
            component: ExploreComponent,
          },
          {
            path: ':id',
            component: ActivityComponent,
          },
        ],
      },
      {
        path: 'view/:id',
        component: ViewComponent,
      },
      {
        path: 'challenge',
        children: [
          {
            path: '',
            component: ChallengeComponent,
          },
          {
            path: ':id',
            component: AchievementsComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
