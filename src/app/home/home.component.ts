import { Component, OnInit } from '@angular/core';
import { ChartsService } from './../services/charts.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private chartService: ChartsService) {
    this.chartService.getJson();
  }

  ngOnInit() {
  }

}
