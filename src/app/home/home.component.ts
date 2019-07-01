import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    if (this.dataService.isSignedIn()) {
      this.router.navigateByUrl('/menu');
    }
  }

  signIn() {
    this.dataService.signIn();
  }

}
