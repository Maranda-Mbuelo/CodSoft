import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Observable, Subscription, map } from 'rxjs';
import { ITask } from '../interfaces/ITask.model';
import { ProjectsService } from '../services/projects.service';
import { IProject } from '../interfaces/IProject.model';

@Component({
  selector: 'app-project',
  template: `
    <div class="w-full h-screen bg-gray-500">
    
      <app-project-edit
        *ngIf="showModal"
        (closeModalEvent)="closeModal()"
      ></app-project-edit>

      <section *ngIf="switchTask" class="container max-w-[850px] h-4/5 my-12 mx-auto border-t-8 overflow-y-scroll border-gray-700 rounded-sm shadow-md bg-slate-500">
        <h1 *ngIf="projectName$ | async as project" class="m-0 p-[20px] bg-slate-400 text-2xl text-center">{{ project }}</h1>

        <div *ngIf="taskDone" class="flex flex-col p-10">

        <ng-container *ngFor="let task of taskDone">
          <div class="flex relative top-4 mt-2 py-[15px] pr-0 pl-[45px] shadow-md shadow-gray-600 border-t border-dashed border-gray-200 text-gray-300 order-4 rounded-sm hover:bg-slate-400 hover:text-white cursor-pointer" for="item2">
            <input type="checkbox" class="w-6 h-6 mx-4 border border-blue-700 rounded bg-gray-500 focus:ring-3 focus:ring-blue-300" >
            {{task.description}}
            <!-- Edit Button -->
            <button class="hidden md:block absolute right-24 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700" (click)="editTask(task.id)">Edit</button>
            <!-- Delete Button -->
            <button class="hidden md:block absolute right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700" (click)="deleteTask(task.id)">Delete</button>
            <!-- Responsive Buttons for Mobile -->
            <div class="md:hidden flex absolute right-2 space-x-2">
              <button class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700" (click)="editTask(task.id)">Edit</button>
              <button class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700" (click)="deleteTask(task.id)">Delete</button>
            </div>
          </div>
        </ng-container>




          <h2 class="relative m-0 py-4 text-xl order-1 border-l-4 border-white shadow-sm rounded px-4 text-white">
            <span class="block absolute left-[-20px] top-10 bottom-10 w-5 bg-gray-700"></span>
            <button (click)="closeModal()">Open</button>
            Done
          </h2>

        </div>  
      </section>

      <section *ngIf="!switchTask" class="container max-w-[850px] h-4/5 my-12 mx-auto border-t-8 overflow-y-scroll border-gray-700 rounded-sm shadow-md bg-slate-500">
        <h1 *ngIf="projectName$ | async as project" class="m-0 p-[20px] bg-slate-400 text-2xl text-center">{{ project }}</h1>

        <div *ngIf="taskNotDone" class="flex flex-col p-10">
        <ng-container *ngFor="let task of taskDone">
          <div class="flex relative top-4 mt-2 py-[15px] pr-0 pl-[45px] shadow-md shadow-emerald-800 border-t border-dashed border-gray-200 text-gray-300 order-4 rounded-sm hover:bg-slate-400 hover:text-white cursor-pointer" for="item2">
            {{task.description}}
            
            <!-- Edit Button -->
            <button class="hidden md:block absolute right-24 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700" (click)="editTask(task.id)">Edit</button>
            
            <!-- Delete Button -->
            <button class="hidden md:block absolute right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700" (click)="deleteTask(task.id)">Delete</button>
            
            <!-- Responsive Buttons for Mobile -->
            <div class="md:hidden flex absolute right-2 space-x-2">
              <button class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700" (click)="editTask(task.id)">Edit</button>
              <button class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700" (click)="deleteTask(task.id)">Delete</button>
            </div>
          </div>
        </ng-container>

          <h2 class="relative m-0 py-4 text-xl order-1 border-l-4 border-white shadow-sm rounded px-4 text-white">
            <span class="block absolute left-[-20px] top-10 bottom-10 w-5 bg-gray-700"></span>
            Not Done
          </h2>

        </div>  
      </section>

    </div>



    



  `,
  styles: []
})
export class ProjectComponent implements OnInit {
  projectId: string | null = null;
  projectName$: Observable<string> | null = null;
  private taskSubscription!: Subscription;
  tasks: Array<ITask> = [];
  taskDone: Array<ITask> = [];
  taskNotDone: Array<ITask> = [];
  switchTask: boolean = true;
  showModal: boolean = false;

  constructor(private route: ActivatedRoute, private taskService: TasksService, private projectService: ProjectsService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
  
      if (this.projectId) {
        this.projectName$ = this.projectName(this.projectId);
        this.retrieveAllTasksByProjectId(this.projectId);
      }
    });
  }

  retrieveAllTasksByProjectId(id: string): void {
    // Reset arrays before updating with new tasks
    this.taskDone = [];
    this.taskNotDone = [];
  
    this.taskSubscription = this.taskService.data$.subscribe((data) => {
      this.tasks = data;
      this.filterTasks();
      this.removeDuplicateTasks();
    });
  
    this.taskService.getAllTasksByProjectId(id).subscribe();
  }

  projectName(id: string): Observable<string> {
    return this.projectService.getProjectById(id).pipe(
      map((project) => project.name)
    );
  }

  filterTasks(): void {
    this.tasks.map((task) => {
      task.isCompleted ? this.taskDone.push(task) : this.taskNotDone.push(task);
    });
  }

  removeDuplicateTasks(): void {
    this.taskDone = this.removeDuplicates(this.taskDone);
    this.taskNotDone = this.removeDuplicates(this.taskNotDone);
  }

  removeDuplicates(tasks: ITask[]): ITask[] {
    const uniqueTasks: { [key: string]: boolean } = {};
    return tasks.filter(task => {
      if (!uniqueTasks[task.id]) {
        uniqueTasks[task.id] = true;
        return true;
      }
      return false;
    });
  }

  closeModal(): void{
    this.showModal = true;
  }


  editTask(taskId: string): void {
    // Implement the logic for editing the task
  }
  
  deleteTask(taskId: string): void {
    // Implement the logic for deleting the task
  }
  
}




/*

<button data-modal-target="popup-modal" data-modal-toggle="popup-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
Toggle modal
</button>

<div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                    Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
</div>

*/