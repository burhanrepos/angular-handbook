import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ModuleMeta } from '../handbook.models';
import { HandbookService } from '../handbook.service';
import { TrustHtmlPipe } from '../safe-html.pipe';

/**
 * Renders one module: tag + heading come from the metadata input; the body is
 * rich-text HTML fetched from the content API and injected via [innerHTML].
 */
@Component({
  selector: 'app-module-section',
  templateUrl: './module-section.html',
  imports: [TrustHtmlPipe],
  styles: [':host { display: contents; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleSection {
  private readonly handbook = inject(HandbookService);
  readonly meta = input.required<ModuleMeta>();

  // Re-fetch whenever the module id changes; empty until the body arrives.
  readonly body = toSignal(
    toObservable(this.meta).pipe(switchMap((m) => this.handbook.getModuleBody(m.id))),
    { initialValue: '' },
  );
}
