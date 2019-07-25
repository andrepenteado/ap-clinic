import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  template: `
    <button class="float-button">
      <i class="fas {{ icon }} fa-lg"></i>
    </button>
  `,
  styles: [`
    .float-button {
      position: fixed;
      width: 60px;
      height: 60px;
      bottom: 20px;
      right: 20px;
      background-color: #007bff;
      color: #FFF;
      border-radius: 50px;
      text-align: center;
      line-height: 60px;
      box-shadow: 2px 2px 3px #999;
      z-index: 1000;
      animation: bot-to-top 2s ease-out;
    }
    
    .float-button + ul {
      visibility: hidden;
    }
    
    .float-button:hover + ul {
      visibility: visible;
      animation: scale-in 0.5s;
    }
    
    .float-button span {
      animation: rotate-in 0.5s;
    }
    
    .float-button:hover > span {
      animation: rotate-out 0.5s;
    }
    
    .float-menu {
      position: fixed;
      right: 20px;
      padding-bottom: 20px;
      bottom: 50px;
      z-index: 100;
    }
    
    .float-menu:hover {
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    .float-menu li {
      list-style: none;
      margin-bottom: 10px;
    }
    
    .float-menu li a {
      background-color: #007bff;
      color: #FFF;
      border-radius: 50px;
      text-align: center;
      line-height: 60px;
      box-shadow: 2px 2px 3px #999;
      width: 60px;
      height: 60px;
      display: block;
    }
    
    @keyframes bot-to-top {
      0% {
        bottom: -40px
      }
      50% {
        bottom: 40px
      }
    }
    
    @keyframes scale-in {
      from {
        transform: scale(0);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    @keyframes rotate-in {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    @keyframes rotate-out {
      from {
        transform: rotate(360deg);
      }
      to {
        transform: rotate(0deg);
      }
    }
  `]
})
export class FloatingButtonComponent implements OnInit {

  @Input()
  private icon: string;

  constructor() { }

  ngOnInit() {
  }

}
