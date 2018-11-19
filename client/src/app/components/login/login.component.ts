import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';
import { AuthService, FacebookLoginProvider } from 'angular-6-social-login';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {



  valueUsername = '';
  valuePassword = '';

  constructor(
    private apiClient: ApiClientService,
    private socialAuthService: AuthService
  ) {}

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.apiClient.auth(userData);
        // const toFetchUrl =
        // 'https://graph.facebook.com/v3.2/me?fields=about%2Ctelevision&access_token=' + userData.token;
        // fetch(toFetchUrl).then( (res) => res.json()).then(res => console.log(res));
      }
    );
  }


  ngOnInit() {
  }

}
