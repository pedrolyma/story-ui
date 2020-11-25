import { PrimeNGConfig, MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'story-ui';

  constructor( private toastyConfig: ToastyConfig,
    ) {
    this.toastyConfig.theme = 'bootstrap';
  }

  ngOnInit(): void {}
}
