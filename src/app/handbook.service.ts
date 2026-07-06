import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

/**
 * Owns loading of the handbook content.
 *
 * Content lives in `public/handbook-content.html` and is served as a static
 * asset. To update the handbook, edit that file. If the content ever moves to
 * an API or CMS, this is the only place that has to change.
 */
@Injectable({ providedIn: 'root' })
export class HandbookService {
  private readonly http = inject(HttpClient);
  private readonly contentUrl = 'handbook-content.html';

  loadContent(): Promise<string> {
    return firstValueFrom(
      this.http.get(this.contentUrl, { responseType: 'text' }),
    );
  }
}
