import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('nav') nav?:ElementRef;
  @ViewChild('toogleNavButton') toogleNavButton?:ElementRef;
  constructor(  private _router: Router  ) { }

  ngOnInit(): void {

  }
  login(){
    this._router.navigate(['/login'])
  }
  ToggleNav(){
    let visibility = this.nav?.nativeElement.getAttribute('data-visible');
    let ariaExpanded = this.toogleNavButton?.nativeElement.getAttribute('aria-expanded');
    
    if(visibility == "false"){
      this.nav?.nativeElement.setAttribute('data-visible','true')
      this.toogleNavButton?.nativeElement.setAttribute('aria-expanded','true')

    }else{
      this.nav?.nativeElement.setAttribute('data-visible','false')
      this.toogleNavButton?.nativeElement.setAttribute('aria-expanded','false')

    }


  }
  navClicked(){
    window.location.reload();

  }


}
