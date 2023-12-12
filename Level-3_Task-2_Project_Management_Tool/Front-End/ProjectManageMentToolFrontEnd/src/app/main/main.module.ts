import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './shared/components/navbar.component';
import { HomeComponent } from './shared/components/home.component';
import { ProjectsComponent } from './shared/components/projects.component';
import { ProjectComponent } from './shared/components/project.component';
import { HttpClientModule } from '@angular/common/http';
import { PopUpComponent } from './shared/components/pop-up.component';
import { ProjectEditComponent } from './shared/components/project-edit.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectComponent,
    PopUpComponent,
    ProjectEditComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
  ]
})
export class MainModule { }
