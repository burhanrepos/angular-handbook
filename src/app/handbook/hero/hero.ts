import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Page hero + the "How to read this" intro. Static content. */
@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styles: [':host { display: contents; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {}
