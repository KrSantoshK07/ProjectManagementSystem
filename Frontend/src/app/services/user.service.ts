import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) { }
  apiURL = environment.apiURL;
  
  getData(): Observable<any> {
    // const url = 'https://example.com/api/data';
    const token = localStorage.getItem("userId");

    // Set the authorization header with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // return this.http.get(apiURL, { headers });
    return this.http.get(this.apiURL, { headers });
  }

  loggedIn() {
    const data = localStorage.getItem("userId");
    if (!data) { return false }
    else { return true }
  }

  validateLogin() {
    const token: any = localStorage.getItem("_token");
    const flag = token ? true : false
    return flag;
  }

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("_token");
    this.router.navigate(['/'])
    // window.location.reload()
  }

  //User routes
  register(data: any) {
    return this.http.post(`${this.apiURL}/user/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiURL}/user/login`, data);
  }

  getUser(userId: any) {
    return this.http.get(`${this.apiURL}/user/get/${userId}`)
  }

  //Project Routes
  addProject(data: any,userId:any) {
    return this.http.post(`${this.apiURL}/project/add`, {data,userId});
  }

  getProjectById(id:any) {
    return this.http.get(`${this.apiURL}/project/getProjectById/${id}`);
  }

  getProject(userId:any) {
    return this.http.get(`${this.apiURL}/project/getById/${userId}`);
  }

  getAllProject(){
    const token = localStorage.getItem("userId");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiURL}/project/get`,{headers});
  }

  reply(data:any,userId:any,projectId:any){
    return this.http.post(`${this.apiURL}/project/reply/${projectId}`,{data,userId});
  }

  getConversation(projectId:any){
    return this.http.get(`${this.apiURL}/project/getReply/${projectId}`);
  }

  filterProject(search:any){
    return this.http.get(`${this.apiURL}/project/filter?serach=${search}`);
  }

  updateProject(data:any,id:any){
    return this.http.put(`${this.apiURL}/project/updateProduct/${id}`,data);
  }

  deleteProject(id:any){
    return this.http.delete(`${this.apiURL}/project/deleteProject/${id}`);
  }

  raiseIssue(data:any,userId:any,projectId:any){
    return this.http.post(`${this.apiURL}/project/raiseIssue/${userId}/${projectId}`,data);
  }
  getIssue(projectId:any){
    return this.http.get(`${this.apiURL}/project/getIssue/${projectId}`);
  }
}
