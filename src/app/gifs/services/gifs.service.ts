import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'LPojW8IKuD68ZpzTFtJrvNFm6NDumfZx';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceUrl = 'https://api.giphy.com/v1/gifs';

  constructor(private _httpClient: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private saveTagsHistory() {
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('tagsHistory')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('tagsHistory')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0])
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams().set('api_key', GIPHY_API_KEY).set('q', tag).set('limit', '10');

    this._httpClient.get<SearchResponse>(`${this.serviceUrl}/search`, { params }).subscribe((resp) => {
      this.gifList = resp.data;
    });
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveTagsHistory();
  }
}
