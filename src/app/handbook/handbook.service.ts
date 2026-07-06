import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { ModuleMeta, NavGroup } from './handbook.models';

/**
 * Base path for handbook content. Defaults to `content` (i.e. `public/content/`,
 * served as static files — no backend). Override to point at a CDN or a real API,
 * e.g. `{ provide: CONTENT_BASE_URL, useValue: 'https://cdn.example.com/handbook' }`.
 */
export const CONTENT_BASE_URL = new InjectionToken<string>('CONTENT_BASE_URL', {
  providedIn: 'root',
  factory: () => 'content',
});

/** Shape of `content/handbook.json`. */
interface Manifest {
  nav: NavGroup[];
  modules: ModuleMeta[];
}

/**
 * Reads handbook content at runtime from static files:
 *   content/handbook.json  — nav + module metadata
 *   content/<id>.html      — a module's rich-text body
 *   content/qa.html        — the Q&A appendix
 *
 * To update the handbook: edit those files and refresh — no rebuild, no server.
 */
@Injectable({ providedIn: 'root' })
export class HandbookService {
  private readonly http = inject(HttpClient);
  private readonly base = inject(CONTENT_BASE_URL);

  // Fetched once and shared between getNav()/getModules().
  private readonly manifest$ = this.http
    .get<Manifest>(`${this.base}/handbook.json`)
    .pipe(shareReplay(1));

  /** Sidebar navigation groups. */
  getNav(): Observable<NavGroup[]> {
    return this.manifest$.pipe(map((m) => m.nav));
  }

  /** Ordered module metadata (no bodies). */
  getModules(): Observable<ModuleMeta[]> {
    return this.manifest$.pipe(map((m) => m.modules));
  }

  /** Rich-text (HTML) body for a single module. */
  getModuleBody(id: string): Observable<string> {
    return this.http.get(`${this.base}/${id}.html`, { responseType: 'text' });
  }

  /** Rich-text (HTML) body for the interview Q&A appendix. */
  getQa(): Observable<string> {
    return this.http.get(`${this.base}/qa.html`, { responseType: 'text' });
  }
}
