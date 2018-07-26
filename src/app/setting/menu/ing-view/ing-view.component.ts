import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ing-view',
  templateUrl: './ing-view.component.html',
  styleUrls: ['./ing-view.component.css']
})
export class IngViewComponent implements OnInit {

  @Input() visible:boolean;
  constructor() { }

  ngOnInit() {
  }

}
