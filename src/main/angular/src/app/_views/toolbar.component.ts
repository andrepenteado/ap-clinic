import { Component, OnInit } from '@angular/core';
import { UserLogin } from "../_entities/user-login";
import { UserService } from "../_services/user/user.service";

@Component({
  selector: 'app-toolbar',
  template: `
    <li class="nav-item dropdown" dropdown>
      <a href id="basic-link" class="nav-link active" dropdownToggle (click)="false" aria-controls="basic-link-dropdown">
        <i class="fas fa-user"></i>&nbsp;&nbsp;<b class="fas fa-caret-down"></b>
      </a>
      <ul id="basic-link-dropdown" *dropdownMenu class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="basic-link">
        <li><a class="dropdown-item" href="http://localhost:30000/ap-sso/logout"><i class="fas fa-door-open"></i> Sair</a></li>
      </ul>
    </li>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  private userLogin: UserLogin;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.usuarioLogado().subscribe(userLogin => {
      console.log(userLogin);
      this.userLogin = userLogin;
    });
    sessionStorage.setItem("userLogin", this.userLogin.username);
  }

}
