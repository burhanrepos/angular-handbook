import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Toc } from './handbook/toc/toc';
import { Hero } from './handbook/hero/hero';
import { ModuleSection } from './handbook/module-section/module-section';
import { QandA } from './handbook/qa/qa';
import { Footer } from './handbook/footer/footer';
import { HandbookService } from './handbook/handbook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Toc, Hero, ModuleSection, QandA, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly handbook = inject(HandbookService);
  readonly modules = toSignal(this.handbook.getModules(), { initialValue: [] });
}
