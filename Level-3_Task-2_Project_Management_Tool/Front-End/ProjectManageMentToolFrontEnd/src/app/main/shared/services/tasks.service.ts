import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Environment } from 'src/environment/environment';
import { ITask, ITaskEdit } from '../interfaces/ITask.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();
  apiBaseUrl = Environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllTasksByProjectId(id: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.apiBaseUrl}Task/project/${id}`).pipe(
      tap((data) => this.dataSubject.next(data)),
    );
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${this.apiBaseUrl}Task/`, task).pipe(
      tap((addedTask) => {
        // Update dataSubject with the added task
        const currentData = this.dataSubject.value;
        const updatedData = [...currentData, addedTask];
        this.dataSubject.next(updatedData);
      })
    );
  }

  editTask(id: string, updatedTask: ITaskEdit): Observable<ITaskEdit> {
    return this.http.put<ITaskEdit>(`${this.apiBaseUrl}Task/${id}`, updatedTask).pipe(
      tap(() => {
        // Update dataSubject with the edited task
        const currentData = this.dataSubject.value;
        const updatedData = currentData.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
        this.dataSubject.next(updatedData);
      })
    );
  }

  deleteTaskById(id: string): Observable<ITask> {
    return this.http
      .delete<ITask>(`${this.apiBaseUrl}Task/${id}`)
      .pipe(
        tap(() => {
          // Remove the deleted task from the dataSubject
          const currentData = this.dataSubject.value;
          const updatedData = currentData.filter(task => task.id !== id);
          this.dataSubject.next(updatedData);
        })
      );
  }

}
