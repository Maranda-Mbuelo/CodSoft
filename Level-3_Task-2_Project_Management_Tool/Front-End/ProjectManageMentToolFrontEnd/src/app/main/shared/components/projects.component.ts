// projects.component.ts

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../services/projects.service';
import { IProject } from '../interfaces/IProject.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  template: `
    <div *ngIf="loading; else content" role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
      <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
          <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
          </svg>
      </div>
      <div class="w-full">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      </div>
      <span class="p-2">Loading...</span>
    </div>

    <ng-template #content>
    <div class="flex justify-center items-center flex-col w-full h-screen overflow-hidden">
      <div *ngIf="projects" class="bg-gray-100 w-[90%] h-[90%] p-2 pb-6 flex justify-center items-center flex-wrap gap-4 overflow-y-scroll">


      <app-pop-up
        *ngIf="showToaster"
        (closeToasterEvent)="closeToaster()"
        (viewProjectEvent)="viewProject(selectedProject)"
        (deleteProjectEvent)="deleteProject(selectedProject)"
        [projectName]="selectedProject?.name"
        [projectDescription]="selectedProject?.description"
      ></app-pop-up>



        <div *ngFor="let project of projects" class="flex justify-start items-center flex-wrap p-4 gap-2 rounded-sm w-full sm:w-[40%] min-h-[23%] bg-gray-300 relative">
          <!-- Image on the left side -->
          <img class="mb-3 w-24 h-24 rounded-full shadow-lg" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image">

          <!-- Heading and Description in the middle -->
          <div class="flex-grow">
            <h2 class="text-xl font-bold mb-2" [innerHTML]="project.name"></h2>
            <p class="text-gray-600" [innerHTML]="project.description"></p>
          </div>

          <!-- Icon on the top right -->
          <svg (click)="openToaster(project)" width="32px" height="22px" viewBox="0 0 1024.00 1024.00" fill="#ffffff" class="icon absolute top-4 right-4" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" transform="matrix(1, 0, 0, 1, 0, 0)rotate(90)" stroke-width="31.744">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M820.8 512c0 44.8 36 80.8 80.8 80.8s80.8-36 80.8-80.8-36-80.8-80.8-80.8-80.8 36-80.8 80.8zM431.2 512c0 44.8 36 80.8 80.8 80.8S592.8 556.8 592.8 512 556.8 431.2 512 431.2 431.2 467.2 431.2 512zM40.8 512c0 44.8 36 80.8 80.8 80.8S203.2 556.8 203.2 512s-36-80.8-80.8-80.8S41.6 467.2 40.8 512z" fill=""></path>
            </g>
          </svg>
        </div>

      </div>
    </div>


    </ng-template>
  `,
  styles: [
    
  ]
})
export class ProjectsComponent implements OnInit {
  loading = false; // Set to true when projects are loading
  showMenu: boolean = false;
  private projectSubscription!: Subscription;
  selectedProject: IProject | null = null;
  showToaster = false;
  projects: Array<IProject> = [];

  constructor(private projectService: ProjectsService, private router: Router){}

  ngOnInit(): void {
    this.retrieveAllProjects();
  }

  retrieveAllProjects(): void{
    this.projectSubscription = this.projectService.data$.subscribe((data) => {
      this.projects = data;
      console.log(data);
    });
    this.projectService.getAllProjects().subscribe();
  }

  openToaster(project: IProject) {
    this.selectedProject = project;
    this.showToaster = true;
  }
  

  closeToaster() {
    this.showToaster = false;
  }

  viewProject(project: IProject | null) {
    if (project && project.id) {
      this.router.navigate(['/mbueloAtCodSoft/project/', project.id]);
    }
  }
  

  deleteProject(project: IProject | null) {
    // if (project && project.liveSite) {
    //   window.open(project.liveSite, '_blank');
    // }
  }
}
