import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import controls from './data/controls'
import './App.css'

function useAnimatedNumber(target) {
  const [current, setCurrent] = useState(0)
  const frameRef = useRef(null)
  const fromRef  = useRef(0)

  useEffect(() => {
    const from = fromRef.current
    const to   = target
    if (from === to) return
    if (frameRef.current) cancelAnimationFrame(frameRef.current)

    const duration = 600
    const startTime = performance.now()

    const tick = (now) => {
      const t      = Math.min((now - startTime) / duration, 1)
      const eased  = 1 - Math.pow(1 - t, 3)
      setCurrent(Math.round(from + (to - from) * eased))
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target])

  return current
}

function StatCard({ label, value, variant = 'default', delay = 0 }) {
  const animated = useAnimatedNumber(value)
  return (
    <div
      className={`stat-card stat-card--${variant}`}
      style={{ animationDelay: `${delay}ms` }}
      role="status"
      aria-live="polite"
      aria-label={`${label}: ${value}`}
    >
      <span className="stat-card__value">{animated}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  )
}

function RiskBadge({ level }) {
  return (
    <span
      className={`risk-badge risk-badge--${level.toLowerCase()}`}
      aria-label={`${level} risk`}
    >
      {level} Risk
    </span>
  )
}

const STATUS_OPTIONS = [
  { value: 'compliant',     label: 'Compliant'     },
  { value: 'non-compliant', label: 'Non-Compliant' },
  { value: 'na',            label: 'N/A'           },
]

function StatusSelector({ value, onChange }) {
  return (
    <div className="status-selector" role="group" aria-label="Set compliance status">
      {STATUS_OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`status-btn status-btn--${opt.value}${value === opt.value ? ' active' : ''}`}
          onClick={() => onChange(value === opt.value ? null : opt.value)}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function ControlCard({ control, state, onStatusChange, onRemarksChange }) {
  const [detailsOpen, setDetailsOpen] = useState(false)

  const cardClass = [
    'control-card',
    state.status ? `control-card--${state.status}` : '',
  ].filter(Boolean).join(' ')

  return (
    <article className={cardClass}>
      <div className="control-card__header">
        <div className="control-card__meta">
          <code className="control-id">{control.id}</code>
          <RiskBadge level={control.riskLevel} />
        </div>

        <div className="control-card__title-row">
          <h3 className="control-name">{control.controlName}</h3>
          <button
            type="button"
            className={`details-btn${detailsOpen ? ' open' : ''}`}
            onClick={() => setDetailsOpen(v => !v)}
            aria-expanded={detailsOpen}
          >
            {detailsOpen ? 'Hide' : 'Details'}
            <svg className="details-chevron" aria-hidden="true" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {detailsOpen && (
        <div className="control-card__desc">
          <p>{control.description}</p>
        </div>
      )}

      <div className="control-card__footer">
        <StatusSelector
          value={state.status}
          onChange={(val) => onStatusChange(control.id, val)}
        />
        <div className="remarks-wrap">
          <label htmlFor={`remarks-${control.id}`} className="remarks-label">
            Remarks / Findings
          </label>
          <textarea
            id={`remarks-${control.id}`}
            className="remarks-input"
            value={state.remarks}
            onChange={e => onRemarksChange(control.id, e.target.value)}
            placeholder="Enter audit findings, observations, or remediation notes…"
            rows={2}
          />
        </div>
      </div>
    </article>
  )
}

const DOMAIN_COLORS = {
  'IT Governance':        '#1B4F8A',
  'Cybersecurity':        '#991B1B',
  'Business Continuity':  '#065F46',
  'IT Operations':        '#1E3A8A',
  'Third-Party Risk':     '#5B21B6',
  'Data Management':      '#0F766E',
}

function DomainSection({ domain, domainControls, compliance, onStatusChange, onRemarksChange, index }) {
  const [open, setOpen] = useState(true)
  const color = DOMAIN_COLORS[domain] || '#374151'

  const compliantCount = domainControls.filter(c => compliance[c.id]?.status === 'compliant').length
  const progress       = Math.round((compliantCount / domainControls.length) * 100)
  const allDone        = progress === 100

  const abbr = domain.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const headingId = `domain-hd-${domain.replace(/\s+/g, '-')}`

  return (
    <section
      className="domain-section"
      aria-labelledby={headingId}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        id={headingId}
        type="button"
        className="domain-header"
        style={{ '--domain-color': color }}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <div className="domain-header__left">
          <div className="domain-avatar" aria-hidden="true">{abbr}</div>
          <div>
            <span className="domain-name">{domain}</span>
            <span className="domain-sub">{domainControls.length} controls · {compliantCount} compliant</span>
          </div>
        </div>

        <div className="domain-header__right">
          <div className={`domain-pill${allDone ? ' domain-pill--done' : ''}`}>
            {progress}%
          </div>
          <svg
            className={`domain-chevron${open ? ' open' : ''}`}
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="domain-body">
          {domainControls.map(control => (
            <ControlCard
              key={control.id}
              control={control}
              state={compliance[control.id]}
              onStatusChange={onStatusChange}
              onRemarksChange={onRemarksChange}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default function App() {
  const [compliance, setCompliance] = useState(() =>
    Object.fromEntries(controls.map(c => [c.id, { status: null, remarks: '' }]))
  )

  const groupedControls = useMemo(() =>
    controls.reduce((acc, c) => {
      ;(acc[c.domain] ??= []).push(c)
      return acc
    }, {})
  , [])

  const stats = useMemo(() => {
    const vals        = Object.values(compliance)
    const total       = controls.length
    const compliant   = vals.filter(v => v.status === 'compliant').length
    const nonCompliant= vals.filter(v => v.status === 'non-compliant').length
    const na          = vals.filter(v => v.status === 'na').length
    const assessed    = compliant + nonCompliant
    const pct         = Math.round((compliant / total) * 100)
    const pending     = total - assessed - na
    return { total, compliant, nonCompliant, na, assessed, pct, pending }
  }, [compliance])

  const handleStatusChange  = useCallback((id, status) =>
    setCompliance(prev => ({ ...prev, [id]: { ...prev[id], status } }))
  , [])

  const handleRemarksChange = useCallback((id, remarks) =>
    setCompliance(prev => ({ ...prev, [id]: { ...prev[id], remarks } }))
  , [])

  const generateReport = useCallback(() => {
    const now     = new Date()
    const dateStr = now.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
    const timeStr = now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })
    const hr      = (ch = '=', n = 62) => ch.repeat(n)

    const nonCompliant = controls.filter(c => compliance[c.id]?.status === 'non-compliant')

    const lines = [
      hr(),
      'BSP IT RISK COMPLIANCE ASSESSMENT REPORT',
      'BSP Circular 1140 — Technology Risk Management Framework',
      hr(),
      '',
      `Generated:     ${dateStr} at ${timeStr}`,
      `Institution:   [Institution Name]`,
      '',
      hr('-'),
      'EXECUTIVE SUMMARY',
      hr('-'),
      `Total Controls:   ${String(stats.total).padStart(3)}`,
      `Compliant:        ${String(stats.compliant).padStart(3)}   (${stats.pct}%)`,
      `Non-Compliant:    ${String(stats.nonCompliant).padStart(3)}`,
      `Not Applicable:   ${String(stats.na).padStart(3)}`,
      `Not Assessed:     ${String(stats.pending).padStart(3)}`,
      '',
      `OVERALL COMPLIANCE SCORE: ${stats.pct}%`,
      '',
      hr('-'),
      `NON-COMPLIANT CONTROLS${nonCompliant.length ? ` (${nonCompliant.length})` : ''}`,
      hr('-'),
      '',
    ]

    if (nonCompliant.length === 0) {
      lines.push('  No non-compliant controls recorded.')
      lines.push('')
    } else {
      nonCompliant.forEach((control, i) => {
        const remarks = compliance[control.id]?.remarks?.trim() || '(No remarks provided)'
        lines.push(`  ${i + 1}. [${control.id}] ${control.controlName}`)
        lines.push(`     Domain:     ${control.domain}`)
        lines.push(`     Risk Level: ${control.riskLevel}`)
        lines.push(`     Remarks:    ${remarks}`)
        lines.push('')
      })
    }

    lines.push(hr())
    lines.push('END OF REPORT')
    lines.push(hr())
    lines.push('')
    lines.push('Generated by BSP Circular 1140 IT Risk Compliance Checker')
    lines.push('CONFIDENTIAL — FOR INTERNAL USE ONLY')

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url  = URL.createObjectURL(blob)
    const a    = Object.assign(document.createElement('a'), {
      href:     url,
      download: `BSP-Compliance-Report-${now.toISOString().split('T')[0]}.txt`,
    })
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [compliance, stats])

  const today = new Date().toLocaleDateString('en-PH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="header-seal" aria-hidden="true">
              <span>BSP</span>
            </div>
            <div>
              <h1 className="header-title">IT Risk Compliance Checker</h1>
              <p className="header-sub">BSP Circular 1140 · Technology Risk Management Framework</p>
            </div>
          </div>
          <div className="header-actions">
            <time
              className="header-date"
              dateTime={new Date().toISOString().split('T')[0]}
            >
              Assessment Date<br />
              <strong>{today}</strong>
            </time>
            <button
              type="button"
              className="export-btn"
              onClick={generateReport}
              aria-label="Export compliance report as text file"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v9m0 0l-3-3m3 3l3-3M4 14v2a1 1 0 001 1h10a1 1 0 001-1v-2"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export Report
            </button>
          </div>
        </div>
      </header>

      <main className="app-main" id="main-content">
        <section className="dashboard" aria-label="Compliance summary">
          <div className="stat-grid">
            <StatCard label="Total Controls"   value={stats.total}        variant="default" delay={0}   />
            <StatCard label="Compliant"         value={stats.compliant}    variant="success" delay={80}  />
            <StatCard label="Non-Compliant"     value={stats.nonCompliant} variant="danger"  delay={160} />
            <StatCard label="Not Assessed"      value={stats.pending}      variant="pending" delay={240} />
          </div>

          <div className="progress-card">
            <div className="progress-label-row">
              <span className="progress-label">Overall Compliance Progress</span>
              <span className="progress-pct">{stats.pct}%</span>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-valuenow={stats.pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Overall compliance: ${stats.pct}%`}
            >
              <div className="progress-fill" style={{ width: `${stats.pct}%` }} />
            </div>
            <div className="progress-legend">
              <span className="legend legend--compliant">
                <span className="legend__dot" aria-hidden="true" />
                Compliant ({stats.compliant})
              </span>
              <span className="legend legend--non-compliant">
                <span className="legend__dot" aria-hidden="true" />
                Non-Compliant ({stats.nonCompliant})
              </span>
              <span className="legend legend--na">
                <span className="legend__dot" aria-hidden="true" />
                N/A ({stats.na})
              </span>
              <span className="legend legend--pending">
                <span className="legend__dot" aria-hidden="true" />
                Pending ({stats.pending})
              </span>
            </div>
          </div>
        </section>

        <div className="domains-list">
          {Object.entries(groupedControls).map(([domain, domControls], i) => (
            <DomainSection
              key={domain}
              domain={domain}
              domainControls={domControls}
              compliance={compliance}
              onStatusChange={handleStatusChange}
              onRemarksChange={handleRemarksChange}
              index={i}
            />
          ))}
        </div>
      </main>

      <footer className="app-footer">
        Bangko Sentral ng Pilipinas &nbsp;·&nbsp; Circular 1140 &nbsp;·&nbsp; Technology Risk Management &nbsp;·&nbsp; Internal Use Only
      </footer>
    </div>
  )
}
