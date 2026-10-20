export const splitList = (text) =>
  String(text || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

export const splitTags = (text) =>
  String(text || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

export const htmlToText = (html) => {
  if (!html) return ''
  const spaced = String(html).replace(/<\/h[1-6]>|<\/p>|<\/div>|<\/li>|<br\s*\/?>/gi, '$& ')
  if (typeof DOMParser === 'undefined') {
    return spaced.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  }
  const doc = new DOMParser().parseFromString(spaced, 'text/html')
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim()
}

export const hasSalary = (job) =>
  String(job?.salaryMin ?? '').trim() !== '' || String(job?.salaryMax ?? '').trim() !== ''

const compactAmount = (value) => {
  if (value >= 1000000) return `${Math.round((value / 1000000) * 10) / 10}M`
  if (value >= 1000) return `${Math.round((value / 1000) * 10) / 10}k`
  return String(value)
}

export const formatSalary = (job) => {
  const min = String(job?.salaryMin ?? '').trim() === '' ? NaN : Number(job.salaryMin)
  const max = String(job?.salaryMax ?? '').trim() === '' ? NaN : Number(job.salaryMax)
  if (!Number.isFinite(min) && !Number.isFinite(max)) return ''

  const currency = job?.salaryCurrency || 'PKR'
  const period = job?.salaryPeriod ? ` / ${String(job.salaryPeriod).toLowerCase()}` : ''

  if (Number.isFinite(min) && Number.isFinite(max)) {
    return `${currency} ${compactAmount(min)} - ${compactAmount(max)}${period}`
  }
  if (Number.isFinite(min)) return `${currency} ${compactAmount(min)}+${period}`
  return `Up to ${currency} ${compactAmount(max)}${period}`
}

export const formatDeadline = (job) => {
  if (!job?.applyDeadline) return ''
  const date = new Date(job.applyDeadline)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const isDeadlinePassed = (job) => {
  if (!job?.applyDeadline) return false
  const date = new Date(job.applyDeadline)
  if (Number.isNaN(date.getTime())) return false
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)
  return endOfDay.getTime() < Date.now()
}

export const isJobOpen = (job) => job?.isActive !== false && !isDeadlinePassed(job)

export const openingsLabel = (job) => {
  const openings = Number(job?.openings)
  if (!Number.isFinite(openings) || openings < 1) return '1 opening'
  return openings === 1 ? '1 opening' : `${openings} openings`
}
