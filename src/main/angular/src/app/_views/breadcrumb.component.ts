import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <!-- Invísivel em telas pequenas -->
    <div class="d-none d-sm-block">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb fixed-top" style="margin-top: 56px">
          <li class="breadcrumb-item"><a routerLink="/"><i class="fas fa-home"></i></a></li>
          <ng-content></ng-content>
        </ol>
      </nav>
    </div>
  `,
  styles: []
})
export class BreadcrumbComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
