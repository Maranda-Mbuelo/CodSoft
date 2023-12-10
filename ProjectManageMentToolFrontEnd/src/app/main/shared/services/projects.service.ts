import { Injectable } from '@angular/core';
import { Environment } from 'src/environment/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEditProject, IProject } from '../interfaces/IProject.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();
  apiBaseUrl = Environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.apiBaseUrl}Project`).pipe(
      tap((data) => this.dataSubject.next(data)),
    );
  }

  getProjectById(id: string): Observable<IProject> {
    return this.http.get<IProject>(`${this.apiBaseUrl}Project/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error getting project by ID:', error);
          return throwError(error);
        })
      );
  }
  

  addProject(project: IProject): Observable<IProject> {
    return this.http.post<IProject>(`${this.apiBaseUrl}Project/`, project).pipe(
      tap((addedProject) => {
        // Update dataSubject with the added Project
        const currentData = this.dataSubject.value;
        const updatedData = [...currentData, addedProject];
        this.dataSubject.next(updatedData);
      })
    );
  }

  editProject(id: string, updatedProject: IEditProject): Observable<IEditProject> {
    return this.http.put<IEditProject>(`${this.apiBaseUrl}Project/${id}`, updatedProject).pipe(
      tap(() => {
        // Update dataSubject with the edited project
        const currentData = this.dataSubject.value;
        const updatedData = currentData.map(project => (project.id === id ? { ...project, ...updatedProject } : project));
        this.dataSubject.next(updatedData);
      })
    );
  }

  deleteProjectById(id: string): Observable<IProject> {
    return this.http
      .delete<IProject>(`${this.apiBaseUrl}Project/${id}`)
      .pipe(
        tap(() => {
          // Remove the deleted project from the dataSubject
          const currentData = this.dataSubject.value;
          const updatedData = currentData.filter(project => project.id !== id);
          this.dataSubject.next(updatedData);
        }),
        catchError(error => {
          console.error('Error deleting project:', error);
          // You can choose to re-throw the error or return a default value
          return throwError(error);
        })
      );
  }
}
