import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput') public tagInput!: ElementRef;

  constructor() {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    console.log(newTag);
  }
}
