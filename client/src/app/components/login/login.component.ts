import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  valueUsername = '';
  valuePassword = '';

  constructor(
    private apiClient: ApiClientService
  ) {}

  onClick() {
    this.apiClient.auth({username: this.valueUsername, password: this.valuePassword}).subscribe();
  }

  onKeyUsername(event: any) {
    this.valueUsername = event.target.value;
  }

  onKeyPassword(event: any) {
    this.valuePassword = event.target.value;
  }

  ngOnInit() {
  }

}
