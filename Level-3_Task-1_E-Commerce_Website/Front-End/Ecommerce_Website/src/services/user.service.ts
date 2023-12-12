import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { IAddUser, IUser, IUserEdit } from 'src/interfaces/IUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataSubject = new BehaviorSubject<IUser[]>([]);
  public data$ = this.dataSubject.asObservable();

  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiBaseUrl + '/api/User/').pipe(
      tap((data) => this.dataSubject.next(data)),
    );
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(this.apiBaseUrl + '/api/User/' + id);
  }

  addUser(user: IAddUser): Observable<IAddUser> {
    return this.http.post<IAddUser>(this.apiBaseUrl + '/api/User/', user).pipe(
      tap(() => this.refreshData()),
    );
  }

  editUser(id: string, updatedUser: IUserEdit): Observable<IUserEdit> {
    return this.http.put<IUserEdit>(this.apiBaseUrl + '/api/User/' + id, updatedUser).pipe(
      tap(() => this.refreshData()),
    );
  }

  deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(this.apiBaseUrl + '/api/User/' + id).pipe(
      tap(() => this.refreshData()),
    );
  }

  private refreshData() {
    // Fetch updated data from the server and notify subscribers
    this.getAllUsers().subscribe();
  }
}
