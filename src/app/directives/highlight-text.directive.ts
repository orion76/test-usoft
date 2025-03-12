import { computed, Directive, inject, input, untracked } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: '[highlightText]',
  host:{
    '[innerHTML]':'output()'
  }
})
export class HighlightTextDirective {
  private START_WRAP = '<span class="highlight-text-item">';
  private END_WRAP = '</span>';

  content = input.required<string>({ alias: 'highlightContent' })
  highlight = input.required<string>({ alias: 'highlightText' })

  output = computed(() => this.transform(this.content(), this.highlight() ))
  sanitaizer = inject(DomSanitizer)

  transform(content: string, highlight: string): SafeHtml {
    if (!highlight) {

      return content;
    }

    const result = content.replaceAll(highlight, `${this.START_WRAP}${highlight}${this.END_WRAP}`);

    return this.sanitaizer.bypassSecurityTrustHtml(result);
  }
}
