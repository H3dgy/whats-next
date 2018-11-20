import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  isLoggedIn: boolean;
  title = "what's next";
  constructor(
    private userService: UserService,
  ) {}
  ngOnInit() {
    this.userService.userLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.userService.isLoggedIn().subscribe(res => this.isLoggedIn = res);
  }

  // ngOnChange() {
  //   this.userService.isLoggedIn().subscribe(res => this.isLoggedIn = res);
  //   console.log('hello', this.isLoggedIn);
  // }
}
