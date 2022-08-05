import type { Glossary, TermExplanation } from './schema'
import { TermCallout, type TermCalloutOptions } from './term-callout'
import { getElement } from './util'

export interface TermHelperOptions {
  callout?: TermCalloutOptions
  term?: {
    /** CSS class for the marked term */
    markedClassName?: string
    /** CSS selector for all terms */
    selector?: string
  }
}

export class TermHelper {
  glossary: [string, TermExplanation][]
  callout: TermCallout

  termMarkedClass: string
  termSelector: string

  markedTermEl?: HTMLElement

  constructor (glossary: Glossary, {
    callout,
    term: {
      markedClassName: termMarkedClass = 'active',
      selector: termSelector = 'abbr'
    } = {}
  }: TermHelperOptions = {}) {
    this.glossary = Object.entries(glossary)
    this.callout = new TermCallout(callout)

    this.termMarkedClass = termMarkedClass
    this.termSelector = termSelector
  }

  /**
   * Listen to terms in `element`
   * @param root the root element or its selector
   */
  on (root: HTMLElement | string) {
    root = getElement(root)

    const mark = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.matches(this.termSelector)) {
        this._mark_term(target)
      }
    }
    const unmark = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.matches(this.termSelector)) {
        this._unmark_term()
      }
    }
    const toggle = (event: Event) => {
      if (this.callout.hidden) {
        mark(event)
      } else {
        this._unmark_term()
      }
    }

    root.addEventListener('pointerover', mark)
    root.addEventListener('pointerout', unmark)
    root.addEventListener('click', toggle)
  }

  private _mark_term (termEl: HTMLElement) {
    termEl.classList.add(this.termMarkedClass)

    const name = termEl.innerText
    const term = this.glossary.find(([n, e]) => n === name)
    if (!term) {
      throw new Error(`TermHelper cannot recognize term “${name}”.`)
    }

    const [, explanation] = term
    this.callout.show(explanation)
    this.markedTermEl = termEl
  }

  private _unmark_term () {
    this.markedTermEl.classList.remove(this.termMarkedClass)
    this.callout.hide()
  }
}
