import { Component, inject, signal, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HandbookService } from './handbook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly handbook = inject(HandbookService);
  private readonly sanitizer = inject(DomSanitizer);

  // Signal so the view re-renders once the async content resolves.
  // (This app is zoneless, so a plain property assignment would not.)
  readonly handbookHtml = signal<SafeHtml>('');

  async ngOnInit(): Promise<void> {
    const html = await this.handbook.loadContent();
    this.handbookHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
  }
}
