import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HandbookService } from '../handbook.service';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.html',
  // display:contents so the <nav> itself becomes the grid column of .layout.
  styles: [':host { display: contents; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toc {
  private readonly handbook = inject(HandbookService);
  readonly groups = toSignal(this.handbook.getNav(), { initialValue: [] });
}
