import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './BlogFilter.scss'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'az', label: 'Title A–Z' },
  { value: 'za', label: 'Title Z–A' },
  { value: 'quickest', label: 'Quickest read' },
]

const RANGE_OPTIONS = [
  { value: 'week', label: 'Past week' },
  { value: 'month', label: 'Past month' },
  { value: 'quarter', label: 'Past 3 months' },
  { value: 'year', label: 'Past year' },
]

const RANGE_LABELS = RANGE_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label
  return acc
}, {})

/** Matches every space-separated word in the post. */
const matchesQuery = (post, words) => {
  const haystack = [
    post.title,
    post.description,
    post.displayAuthor,
    ...(post.tag_list || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return words.every((word) => haystack.includes(word))
}

const matchesRange = (post, range) => {
  if (!range) return true
  const stamp = new Date(post.updatedAt || post.published_at).getTime()
  if (Number.isNaN(stamp)) return false

  const days = { week: 7, month: 30, quarter: 90, year: 365 }[range]
  return stamp >= Date.now() - days * 24 * 60 * 60 * 1000
}

const Dropdown = ({ value, placeholder, options, onChange }) => {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  // The trigger lives inside a `backdrop-filter` panel, which forms its own
  // stacking context — a menu nested in there can never paint above the blog
  // cards. So we position it against the viewport and portal it to <body>.
  const place = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const width = Math.max(rect.width, 230)
    const spaceBelow = window.innerHeight - rect.bottom
    const openUp = spaceBelow < 260 && rect.top > spaceBelow

    const menuWidth = width
    const maxLeft = window.innerWidth - menuWidth - 12
    const left = Math.min(Math.max(12, rect.left), Math.max(12, maxLeft))

    setCoords({
      left,
      width: menuWidth,
      top: openUp ? undefined : rect.bottom + 8,
      bottom: openUp ? window.innerHeight - rect.top + 8 : undefined,
    })
  }, [])

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null)
      return
    }

    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open, place])

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      const target = event.target
      if (
        rootRef.current &&
        !rootRef.current.contains(target) &&
        !(menuRef.current && menuRef.current.contains(target))
      ) {
        setOpen(false)
      }
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Keep the panel honest when the parent clears a filter.
  useEffect(() => {
    if (!options.some((option) => option.value === value)) setOpen(false)
  }, [options, value])

  const activeLabel = options.find((option) => option.value === value)?.label

  return (
    <div className={`bf-field ${open ? 'open' : ''}`} ref={rootRef}>
      <button
        type="button"
        ref={triggerRef}
        className={`bf-trigger ${value ? 'has-value' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="bf-trigger-text">{activeLabel || placeholder}</span>
        <svg className="bf-chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && coords && createPortal(
        <div
          className="bf-menu bf-menu--portal"
          role="listbox"
          ref={menuRef}
          style={{
            left: coords.left,
            width: coords.width,
            top: coords.top,
            bottom: coords.bottom,
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={`bf-option ${option.value === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value === value ? '' : option.value)
                setOpen(false)
              }}
            >
              <span>{option.label}</span>
              {option.count != null && <em>{option.count}</em>}
              {option.value === value && (
                <svg className="bf-check" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  )
}

export default function BlogFilter({ posts, filters, onChange, onReset, loading }) {
  const [query, setQuery] = useState(filters.q || '')
  const debounceRef = useRef(null)

  // Reflect URL/parent-driven changes.
  useEffect(() => {
    setQuery(filters.q || '')
  }, [filters.q])

  // Push the typed text out to the parent, debounced so we don't filter on
  // every keystroke while the user is still mid-word.
  useEffect(() => {
    if (query === (filters.q || '')) return undefined

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onChange({ q: query })
    }, 250)
    return () => clearTimeout(debounceRef.current)
  }, [query, filters.q, onChange])

  // Counts reflect the active search, so the numbers match what the user
  // would actually get rather than the unfiltered totals.
  const rangeOptions = useMemo(() => {
    const words = String(filters.q || '').toLowerCase().split(/\s+/).filter(Boolean)
    return RANGE_OPTIONS.map((option) => ({
      ...option,
      count: posts.filter(
        (post) => matchesRange(post, option.value) && matchesQuery(post, words)
      ).length,
    }))
  }, [posts, filters.q])

  const sortOptions = SORT_OPTIONS.map((option) => ({
    ...option,
    count: filters.total,
  }))

  const isFiltered = Boolean(filters.q || filters.range || filters.sort !== 'newest')

  return (
    <section className="blog-filter" aria-label="Filter blogs">
      <div className="bf-bar">
        <div className="bf-search bf-search--main">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blogs…"
            aria-label="Search blogs"
          />
          {query && (
            <button type="button" className="bf-clear-input" onClick={() => setQuery('')} aria-label="Clear search">
              &times;
            </button>
          )}
        </div>

        <div className="bf-fields">
          <Dropdown
            value={filters.sort !== 'newest' ? filters.sort : ''}
            placeholder="Sort by"
            options={sortOptions}
            onChange={(value) => onChange({ sort: value || 'newest' })}
          />
          <Dropdown
            value={filters.range}
            placeholder="Any time"
            options={rangeOptions}
            onChange={(value) => onChange({ range: value })}
          />
        </div>
      </div>

      <div className="bf-footer">
        <p className="bf-count">
          {loading ? (
            <>Loading articles…</>
          ) : (
            <>
              <strong>{filters.total}</strong> {filters.total === 1 ? 'article' : 'articles'}
              {filters.total !== posts.length && <span className="bf-of"> of {posts.length}</span>}
            </>
          )}
        </p>
        {isFiltered && (
          <button type="button" className="bf-reset" onClick={onReset}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4l16 16M20 4L4 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Clear filters
          </button>
        )}
      </div>

      {isFiltered && (
        <div className="bf-chips">
          {filters.q && (
            <button type="button" className="bf-chip" onClick={() => onChange({ q: '' })}>
              <em>Search</em> “{filters.q}”
            </button>
          )}
          {filters.range && (
            <button type="button" className="bf-chip" onClick={() => onChange({ range: '' })}>
              <em>Published</em> {RANGE_LABELS[filters.range]}
            </button>
          )}
        </div>
      )}
    </section>
  )
}

