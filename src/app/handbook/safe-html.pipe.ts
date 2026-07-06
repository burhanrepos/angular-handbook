import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Marks build-time handbook HTML as trusted so `[innerHTML]` renders it verbatim.
 *
 * The content is fully authored/bundled (never user input), and default
 * sanitization would strip tags the handbook relies on (e.g. `<details>` /
 * `<summary>` for the Q&A accordions). Pure pipe → computed once per string.
 */
@Pipe({ name: 'trustHtml' })
export class TrustHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
