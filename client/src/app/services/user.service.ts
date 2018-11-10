import { Injectable } from '@angular/core';
import User from '../models/user';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor(private apiClient: ApiClientService) {
    this.apiClient.getUser().subscribe(user => {
      this.user = user;
    });
  }
}
