/**
 * Create an HTML element with `tagName` and optionally append it to `container`.
 */
export function createElement (tagName: string, container: HTMLElement | null = null): HTMLElement {
  const el = document.createElement(tagName)
  if (container) {
    container.appendChild(el)
  }
  return el
}

/**
 * Get an HTML element by its selector, or itself.
 */
export function getElement (selector: HTMLElement | string): HTMLElement {
  if (typeof selector === 'string') {
    return document.querySelector(selector)
  } else {
    return selector
  }
}
