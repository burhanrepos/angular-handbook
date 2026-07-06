import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HandbookService } from '../handbook.service';
import { TrustHtmlPipe } from '../safe-html.pipe';

/** The interview Q&A appendix. Body is fetched from the content API. */
@Component({
  selector: 'app-qa',
  templateUrl: './qa.html',
  imports: [TrustHtmlPipe],
  styles: [':host { display: contents; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QandA {
  private readonly handbook = inject(HandbookService);
  readonly content = toSignal(this.handbook.getQa(), { initialValue: '' });
}
