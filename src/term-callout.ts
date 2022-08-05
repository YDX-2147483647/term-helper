import type { TermExplanation, Preprocessor } from './schema'
import { createElement } from './util'

/**
 * ```
 * outer.className (aside.term-callout)
 * └─ inner (article)
 *    ├─ title (h4)
 *    └─ description (div)
 * ```
 *
 * (format: {variable} ({example as a CSS selector}))
 */
export interface TermCalloutOptions {
  /** CSS class name for `outer` */
  className?: string
  tagName?: {
    title?: string,
    description?: string,
    inner?: string,
    outer?: string
  }
  /** HTML text preprocessors */
  preprocessor?: {
    title?: Preprocessor,
    description?: Preprocessor
  }
}

export class TermCallout {
  title_el: HTMLElement
  description_el: HTMLElement
  inner_el: HTMLElement
  outer_el: HTMLElement

  title_pre?: Preprocessor
  description_pre?: Preprocessor

  /**
   * Initialize DOM elements
   */
  constructor ({
    className = 'term-callout',
    tagName: { title = 'h4', description = 'div', inner = 'article', outer = 'aside' } = {},
    preprocessor: { title: titlePre, description: descriptionPre } = {}
  }: TermCalloutOptions = {}) {
    // Create elements
    this.outer_el = createElement(outer, document.body)
    this.outer_el.classList.add(className)
    this.outer_el.hidden = true

    this.inner_el = createElement(inner, this.outer_el)
    this.title_el = createElement(title, this.inner_el)
    this.description_el = createElement(description, this.inner_el)

    // Save preprocessors
    this.title_pre = titlePre
    this.description_pre = descriptionPre
  }

  /**
   * Show last explanation or a new one
   * @param explanation
   */
  show (explanation: TermExplanation | null = null) {
    if (explanation) {
      const { title, description = '' } = explanation
      this.title_el.innerHTML = this.title_pre ? this.title_pre(title) : title
      this.description_el.innerHTML = this.description_pre ? this.description_pre(description) : description
    }

    this.outer_el.hidden = false
  }

  /**
   * Hide the callout
   *
   * Detail: The explanation is left there as it is.
   */
  hide () {
    this.outer_el.hidden = true
  }

  public get hidden () : boolean {
    return this.outer_el.hidden
  }
}
