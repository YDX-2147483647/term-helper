# Term Helper

Show `<abbr>`'s `title` and further detail when hovering or tapped.

## Usage

```shell
> npm run build
```

```html
<p>
    Simply wrap terms with the abbreviation tag in <abbr>HTML</abbr>.
</p>
```

```javascript
import { TermHelper } from "./dist/index.mjs"


const helper = new TermHelper({
    HTML: {
        title: 'HyperText Markup Language',
        description: "<dfn>HTML</dfn> (HyperText Markup Language) is a descriptive language that specifies webpage structure. (See more on <a href='https://developer.mozilla.org/en-US/docs/Glossary/HTML'>MDN Web Docs</a>)"
    }
    // …
})
helper.on(document.body)
```

> See [`example.html`](example.html) (and [`src/example.scss`](src/example.scss)) for full example.
>
> The `example.scss` is only an example — not intended for real usage. At least, it will break if you change the call-out's CSS class.

This project is agnostic for CSS. You can change tags' names and CSS classes freely. Here are the default.

```javascript
const helper = new TermHelper(glossary, {
  callout: {
    className: 'term-callout',
    tagName: {
      outer: 'aside',
      inner: 'article',
      title: 'h4',
      description: 'div'
    }
  },
  term: {
    markedClassName: 'active',
    selector: 'abbr'
  }
})
```

> Call-out's structure:
> ```
> outer.className (aside.term-callout)
> └─ inner (article)
>    ├─ title (h4)
>    └─ description (div)
> ```

The `title`s and `description`s in the glossary are used as inner HTML. You can provide a tex preprocessor for them.

```typescript
const helper = new TermHelper(glossary, {
  callout: {
    preprocessor: {
      title: (original: string) => `🔎 ${original}`,
      description (original: string) {
        return original.split('\n').map(p => `<p>${p}</p>`).join('')
      }
    }
  }
})
```

> Using TypeScript here.

## Inspired by

[ICANN website](https://www.icann.org/). ([One of their pages](https://www.icann.org/resources/pages/new-rirs-criteria-2012-02-25-en) and their [glossary_terms.js](https://www.icann.org/glossary_terms.js))
