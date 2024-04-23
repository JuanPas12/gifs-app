import { Component, Input } from '@angular/core';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.css']
})
export class GifsCardComponent {

  @Input()
  public gif: any;

}
