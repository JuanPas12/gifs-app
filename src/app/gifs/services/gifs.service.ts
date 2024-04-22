import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const GIPHY_API_KEY = '1JHP3Uyn3wDZyH1NhVEvcpmET3Ae12qc';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];
  private serviceUrl = 'https://api.giphy.com/v1/gifs';

  constructor(private _httpClient: HttpClient) {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', GIPHY_API_KEY)
    .set('q', tag)
    .set('limit', '10');

    this._httpClient.get(`${this.serviceUrl}/search`, { params })
    .subscribe( resp =>{
      console.log(resp);
    })
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }
}
