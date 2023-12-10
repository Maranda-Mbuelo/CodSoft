import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  template: `
    <div class="fixed inset-0 flex items-center justify-center z-10">
      <div class="fixed inset-0 bg-black opacity-70"></div>
      <!-- Toast notification container -->  
      <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto z-50">
        <div class="rounded-lg bg-white p-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">
              {{ projectName || 'Project Name' }}
            </h3>
            <div class="space-x-2">
              <button
                class="inline-flex rounded-md p-1.5 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                (click)="closeToaster()"
              >
                <span class="sr-only">Close</span>
              </button>
            </div>
          </div>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              {{ projectDescription || 'Project Description' }}
            </p>
          </div>
          <!-- my action buttons -->
          <div class="mt-4 flex space-x-4">
            <button
              class="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
              (click)="viewProject()"
            >
              <i class="fas fa-code mr-2"></i> View Project
            </button>
            <b
              class="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
              (click)="deleteProject()"
            >
              <i class="fas fa-globe mr-2"></i> Delete Project
            </b>
          </div>
          <!-- Cancel button -->
          <div class="mt-4">
            <button
              class="w-full py-2 px-4 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition duration-300 ease-in-out"
              (click)="closeToaster()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: [
  ]
})
export class PopUpComponent {

  @Input() showToaster: boolean = false;
  @Input() projectName: string | undefined = undefined;
  @Input() projectDescription: string | undefined = undefined;
  @Output() closeToasterEvent = new EventEmitter<void>();
  @Output() viewProjectEvent = new EventEmitter<void>();
  @Output() deleteProjectEvent = new EventEmitter<void>();


  closeToaster() {
    this.closeToasterEvent.emit();
  }

  viewProject() {
    this.viewProjectEvent.emit();
  }  

  deleteProject() {
    this.deleteProjectEvent.emit();
  }
}
