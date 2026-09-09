const injected = new Set<string>()

/**
 * Ensure the Flaticon UIcons stylesheet for the given families is present in
 * the document. The CSS is injected lazily (picker opened / icon rendered) so
 * the ~150 kB-per-family stylesheet is not loaded on the initial page paint.
 * The webfont itself is only fetched by the browser once a glyph is used.
 */
export function ensureFlaticonCss(families: { id: string, css: string }[]): void {
  if (typeof document === 'undefined') {
    return
  }

  for (const family of families) {
    if (injected.has(family.id)) {
      continue
    }

    const id = `flaticon-css-${family.id}`
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = family.css
      document.head.appendChild(link)
    }

    injected.add(family.id)
  }
}
