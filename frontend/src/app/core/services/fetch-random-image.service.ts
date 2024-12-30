import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class FetchRandomImageService {

  constructor(private http: HttpClient) { }

  fetchRandomImageURL(width: number = 200, height: number = 300): Observable<string> {
    const imagePath = `https://picsum.photos/${width}/${height}`;

    return this.http.get(
      imagePath,
      { observe: 'response', responseType: 'blob' }
    ).pipe(
      map(response => response.url ?? '')
    );
  }
}

