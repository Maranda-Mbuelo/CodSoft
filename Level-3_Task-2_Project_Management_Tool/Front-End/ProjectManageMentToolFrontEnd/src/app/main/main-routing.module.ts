import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './shared/components/home.component';
import { ProjectsComponent } from './shared/components/projects.component';
import { ProjectComponent } from './shared/components/project.component';

const routes: Routes = [
  { path: '', redirectTo: 'mbueloAtCodSoft', pathMatch: 'full' },
  { path: 'mbueloAtCodSoft', component: LayoutComponent, children: [
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'project/:id', component: ProjectComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
