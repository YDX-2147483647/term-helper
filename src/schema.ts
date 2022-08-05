/**
 * Explanation of a term
 *
 * Note: The term name (abbreviation/acronym) is not included.
 */
export interface TermExplanation {
  /** An expansion for the abbreviation or acronym, used as inner HTML */
  title: string
  /** Further detail on the term, used as inner HTML */
  description?: string
}

/**
 * Name-explanation pairs of all terms
 */
export interface Glossary {
  [term: string]: TermExplanation
}

/**
 * Text preprocessor, often used for inner HTML
 *
 * If no original text is provided, `original` would be an empty string (`''`).
 *
 * @example (original) => `<p>${original}</p>`
 * @example (original) => '<img src="…">' + original
 * @example (original) => `Glossary: ${original}`
 */
export type Preprocessor = (original: string) => string
