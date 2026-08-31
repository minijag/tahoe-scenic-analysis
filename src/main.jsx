import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Check, ChevronDown, Compass, Eye, FileCheck2, LoaderCircle, Map, Mountain, Route, Send, Trees } from 'lucide-react'
import './styles.css'

const email = 'hello@tahoescenicanalysis.com'

const steps = [
  { n: '01', icon: Map, title: 'Confirm applicability', copy: 'Locate the parcel, identify the applicable scenic resource area or scenic unit, and determine whether the project is visible from a regulated public viewing area.' },
  { n: '02', icon: Eye, title: 'Document the view', copy: 'Establish representative public viewpoints, document the lakefront elevation, and record existing conditions.' },
  { n: '03', icon: Compass, title: 'Evaluate contrast', copy: 'Evaluate visual magnitude, visible area, and contrast in form, line, color, texture, scale, and screening.' },
  { n: '04', icon: FileCheck2, title: 'Prepare the assessment', copy: 'Compile the findings into a clear scenic assessment with the required worksheets and practical design responses.' },
]

const faqs = [
  ['Does my Tahoe project require scenic review?', 'Not every project does. Scenic review may apply when development is located within or visible from an identified scenic resource area, including the Lake Tahoe shoreline, major roadway corridors, public recreation areas, and bicycle trails. A parcel-specific visibility screening is the right first step.'],
  ['What can affect the level of review?', 'Location, visibility, project type, the applicable scenic unit, its current attainment status, and the rules in TRPA Code Chapter 66 and any relevant area or corridor plan can all affect the path. Shoreland and shorezone work may have additional scenic assessment requirements.'],
  ['What is a scenic assessment or visual assessment?', 'A scenic or visual assessment documents the existing setting and evaluates how a proposal may contrast with a scenic resource. Relevant characteristics can include visible mass, scale, form, line, color, texture, siting, vegetation, topography, screening, and views from public travel routes or recreation areas.'],
  ['What are visible area and visual magnitude?', 'TRPA scenic materials use visual magnitude and visible-area measurements to evaluate how strongly proposed development appears from a scenic viewpoint. Lakefront review may also call for lake-facing elevation drawings, an elevation outline, and documentation of the visible area.'],
  ['Are you the Tahoe Regional Planning Agency?', 'No. Tahoe Scenic Analysis is an independent consulting resource and is not affiliated with, endorsed by, or a substitute for TRPA. TRPA and the applicable local jurisdiction make all permitting and compliance decisions.'],
]

function Logo() {
  return <a className="logo" href="#top" aria-label="Tahoe Scenic Analysis home"><span className="logo-mark"><Mountain size={24}/></span><span>Tahoe <b>Scenic Analysis</b></span></a>
}

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function submitForm(event) {
    event.preventDefault()
    setStatus('sending')
    setMessage('')
    const form = event.currentTarget
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message || 'Submission failed')
      form.reset()
      setStatus('success')
      setMessage('Thank you. Your project details have been sent, and we’ll be in touch soon.')
    } catch {
      setStatus('error')
      setMessage(`We couldn’t send the form. Please email ${email} directly.`)
    }
  }

  return <form className="contact-form" onSubmit={submitForm}>
    <input type="hidden" name="access_key" value="65dfe96b-ac2f-4661-950c-3d4239d6c697" />
    <input type="hidden" name="subject" value="New scenic analysis project inquiry" />
    <input type="hidden" name="from_name" value="Tahoe Scenic Analysis Website" />
    <input type="checkbox" name="botcheck" className="botcheck" tabIndex="-1" autoComplete="off" aria-hidden="true" />
    <div className="field-row">
      <label><span>Name *</span><input type="text" name="name" autoComplete="name" required /></label>
      <label><span>Email *</span><input type="email" name="email" autoComplete="email" required /></label>
    </div>
    <div className="field-row">
      <label><span>Phone</span><input type="tel" name="phone" autoComplete="tel" /></label>
      <label><span>Property address</span><input type="text" name="property_address" autoComplete="street-address" /></label>
    </div>
    <div className="field-row">
      <label><span>Project type *</span><select name="project_type" required defaultValue=""><option value="" disabled>Select one</option><option>New construction</option><option>Remodel or addition</option><option>Shoreland or shorezone project</option><option>Exterior colors or materials</option><option>Signage</option><option>Other</option></select></label>
      <label><span>Current stage</span><select name="project_stage" defaultValue=""><option value="">Not sure</option><option>Early planning</option><option>Design in progress</option><option>Preparing an application</option><option>Responding to agency comments</option></select></label>
    </div>
    <label><span>How can we help? *</span><textarea name="message" rows="4" placeholder="Tell us about your project and any scenic review questions." required /></label>
    <div className="form-bottom"><p>By submitting, you agree that we may contact you about this project.</p><button className="button" type="submit" disabled={status==='sending'}>{status==='sending'?<><LoaderCircle className="spin" size={18}/> Sending…</>:<>Send project details <Send size={17}/></>}</button></div>
    {message&&<div className={`form-message ${status}`} role="status">{status==='success'&&<Check size={18}/>}<span>{message}</span></div>}
  </form>
}

export function App() {
  return <div id="top">
    <header>
      <Logo />
      <nav aria-label="Main navigation"><a href="#process">Process</a><a href="#services">Services</a><a href="#resources">Resources</a></nav>
      <a className="button button-small" href="#contact">Discuss your project <ArrowRight size={16}/></a>
    </header>

    <main>
      <section className="hero">
        <picture className="hero-picture">
          <source media="(max-width: 600px)" srcSet="/splash-480.webp" type="image/webp" />
          <source srcSet="/splash-1080.webp" type="image/webp" />
          <img className="hero-photo" src="/splash.jpg" alt="Lake Tahoe shoreline and Sierra Nevada mountains" width="1641" height="1080" loading="eager" fetchPriority="high" />
        </picture>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow"><span /> TRPA scenic analysis support</p>
          <h1>Need help with your<br/><em>scenic analysis?</em></h1>
          <p className="hero-lead">We help Lake Tahoe property owners and project teams with TRPA scenic review, scenic assessments, visual assessments, public-view documentation, and clear submittals for agency review.</p>
          <div className="hero-actions"><a className="button" href="#contact">Get help with your project <ArrowRight size={18}/></a><a className="text-link" href="#process">See how it works <span>↓</span></a></div>
        </div>
        <aside className="hero-card">
          <p className="card-kicker">Start here</p>
          <h2>Could your project require scenic review?</h2>
          <div className="resource-types"><span><Route/>Major roadways</span><span><Trees/>Public recreation</span><span><Mountain/>Lake shoreline</span></div>
          <a href="https://gis.trpa.org/permitreview/" target="_blank" rel="noreferrer">Open TRPA’s Permit Review Map <ArrowRight size={16}/></a>
        </aside>
        <div className="photo-credit">Lake Tahoe project view</div>
      </section>

      <section className="intro section">
        <p className="section-label">The essential question</p>
        <div className="intro-grid"><h2>Good scenic review begins <em>with the right information.</em></h2><div><p className="large-copy">TRPA’s Scenic Protection Program is designed to keep development compatible with Tahoe’s natural setting and preserve important public views.</p><p>The work begins by identifying the scenic resource area, roadway or shoreline unit, public viewpoints, scenic threshold requirements, and attainment status. That early clarity helps determine whether the project needs a scenic assessment, visual assessment, or a more focused set of review materials.</p></div></div>
        <div className="stats"><div><strong>3</strong><span>primary scenic resource types</span></div><div><strong>4</strong><span>core stages in a clear analysis</span></div><div><strong>1</strong><span>coordinated, review-ready package</span></div></div>
      </section>

      <section id="process" className="process section">
        <div className="section-heading"><div><p className="section-label light">A practical roadmap</p><h2>From parcel to perspective.</h2></div><p>Every assignment is project-specific. This framework keeps the work grounded in the actual site, public view, and applicable rules.</p></div>
        <div className="steps">{steps.map(({n,icon:Icon,title,copy}) => <article className="step" key={n}><div className="step-top"><span>{n}</span><Icon/></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section id="services" className="services section">
        <div className="services-visual"><div className="viewfinder"><span/><span/><span/><span/><div><small>Representative viewpoint</small><b>Existing condition → Proposed condition</b></div></div></div>
        <div className="services-copy"><p className="section-label">How we can help</p><h2>A focused scope for a clearer review.</h2><p>Engagements can begin with a quick applicability review or cover a complete scenic analysis package, depending on the project and agency path.</p>
          <ul>{['Parcel and scenic-resource-area research','Scenic unit, threshold, and attainment review','Viewpoint photos and field documentation','Lake-facing elevation and outline documentation','Visible-area and visual-impact evaluation','Color, material, and screening review','Scenic assessment worksheet support'].map(x=><li key={x}><Check size={17}/>{x}</li>)}</ul>
        </div>
      </section>

      <section id="resources" className="resources section">
        <div className="section-heading ink"><div><p className="section-label">Official starting points</p><h2>Go to the source.</h2></div><p>Requirements vary. Use current TRPA materials and confirm the correct path for your parcel and project.</p></div>
        <div className="resource-grid">
          <a href="https://www.trpa.gov/scenic-protection-program/" target="_blank" rel="noreferrer"><small>01 / PROGRAM</small><h3>Scenic Protection Program</h3><p>TRPA overview, application forms, worksheets, inventories, maps, and evaluations.</p><ArrowRight/></a>
          <a href="https://gis.trpa.org/permitreview/" target="_blank" rel="noreferrer"><small>02 / MAP</small><h3>Permit Review Map</h3><p>Explore parcel context and whether a project may be visible from a scenic resource area.</p><ArrowRight/></a>
          <a href="https://www.trpa.gov/regional-plan/#code" target="_blank" rel="noreferrer"><small>03 / STANDARDS</small><h3>TRPA Code & Chapter 66</h3><p>Review the current scenic resource and community design standards.</p><ArrowRight/></a>
          <a href="https://www.trpa.gov/wp-content/uploads/documents/archive/DRG.pdf" target="_blank" rel="noreferrer"><small>04 / DESIGN</small><h3>Design Review Guidelines</h3><p>Guidance for fitting buildings, sites, materials, colors, and landscape into Tahoe.</p><ArrowRight/></a>
        </div>
      </section>

      <section className="faq section"><p className="section-label">Common questions</p><div className="faq-layout"><h2>Scenic review,<br/>made understandable.</h2><div>{faqs.map(([q,a],i)=><details className="faq-item" key={q} open={i===0}><summary><span>{q}</span><ChevronDown/></summary><p>{a}</p></details>)}</div></div></section>

      <section className="cta" id="contact"><div className="cta-heading"><p className="section-label light">Your project, clearly presented</p><h2>Tell us about<br/><em>your project.</em></h2><p>Share a few details and we’ll respond with a sensible next step. Prefer email? Write to <a href={`mailto:${email}`}>{email}</a></p></div><ContactForm /></section>
    </main>

    <footer><Logo/><p>Independent scenic-analysis consulting for the Lake Tahoe Basin.</p><a href={`mailto:${email}`}>{email}</a><div className="fine-print">Tahoe Scenic Analysis is an independent consultancy and is not affiliated with or endorsed by the Tahoe Regional Planning Agency (TRPA). Requirements and agency determinations are project-specific. © {new Date().getFullYear()} Tahoe Scenic Analysis.</div></footer>
  </div>
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('root')
  createRoot(root).render(<App />)
}

