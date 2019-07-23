import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <li class="nav-item dropdown" dropdown>
      <a href id="basic-link" class="nav-link active" dropdownToggle (click)="false" aria-controls="basic-link-dropdown">
        <i class="fas fa-toolbox"></i> Manutenção <b class="fas fa-caret-down"></b>
      </a>
      <ul id="basic-link-dropdown" *dropdownMenu class="dropdown-menu" role="menu" aria-labelledby="basic-link">
        <li><a class="dropdown-item" routerLink="ui/clientes"><i class="fas fa-address-card"></i> Cliente</a></li>
      </ul>
    </li>
  `,
  styles: []
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
