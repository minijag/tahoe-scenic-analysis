import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Check, ChevronDown, Compass, Eye, FileCheck2, LoaderCircle, Map, Mountain, Route, Send, Trees } from 'lucide-react'
import './styles.css'

const email = 'contact@tahoescenicanalysis.com'

const steps = [
  { n: '01', icon: Map, title: 'Confirm applicability', copy: 'Locate the parcel, identify mapped scenic resources, and determine whether the project is within or visible from a regulated viewing area.' },
  { n: '02', icon: Eye, title: 'Document the view', copy: 'Establish representative public viewpoints, document the lakefront elevation, and record existing conditions.' },
  { n: '03', icon: Compass, title: 'Evaluate contrast', copy: 'Compare the proposal with the landscape—form, line, color, texture, scale, screening, and visibility all matter.' },
  { n: '04', icon: FileCheck2, title: 'Prepare the analysis', copy: 'Compile the findings into a clear scenic analysis with the required worksheets and practical design responses.' },
]

const faqs = [
  ['Does every Tahoe project need a scenic analysis?', 'No. TRPA explains that scenic standards apply to projects located within or visible from identified scenic resource areas. These include the Lake Tahoe shoreline, major roadway corridors, and public recreation areas and bicycle trails. A parcel-specific screening is the right first step.'],
  ['What can affect the level of review?', 'Location, visibility, project type, the applicable scenic unit, its current attainment status, and the rules in TRPA Code Chapter 66 and any relevant area or corridor plan can all affect the path. Shoreland and shorezone work may have additional scenic assessment requirements.'],
  ['What does a visual assessment study?', 'A typical assessment documents the existing setting and considers whether the proposal changes or contrasts with scenic resources. Relevant characteristics can include scale, form, line, color, texture, siting, vegetation, topography, screening, and views from public travel routes or recreation areas.'],
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
  const [openFaq, setOpenFaq] = useState(0)
  return <div id="top">
    <header>
      <Logo />
      <nav aria-label="Main navigation"><a href="#process">Process</a><a href="#services">Services</a><a href="#resources">Resources</a></nav>
      <a className="button button-small" href="#contact">Discuss your project <ArrowRight size={16}/></a>
    </header>

    <main>
      <section className="hero">
        <div className="hero-photo" role="img" aria-label="Lake Tahoe shoreline and Sierra Nevada mountains" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow"><span /> TRPA scenic analysis support</p>
          <h1>Need help with your<br/><em>scenic analysis?</em></h1>
          <p className="hero-lead">We help Lake Tahoe property owners and project teams understand scenic requirements, document public views, evaluate visual impacts, and prepare a clear package for agency review.</p>
          <div className="hero-actions"><a className="button" href="#contact">Get help with your project <ArrowRight size={18}/></a><a className="text-link" href="#process">See how it works <span>↓</span></a></div>
        </div>
        <aside className="hero-card">
          <p className="card-kicker">Start here</p>
          <h2>Is your project visible from a scenic resource area?</h2>
          <div className="resource-types"><span><Route/>Major roadways</span><span><Trees/>Public recreation</span><span><Mountain/>Lake shoreline</span></div>
          <a href="https://gis.trpa.org/permitreview/" target="_blank" rel="noreferrer">Open TRPA’s Permit Review Map <ArrowRight size={16}/></a>
        </aside>
        <div className="photo-credit">Lake Tahoe · Photo by Peter Hulce / Unsplash</div>
      </section>

      <section className="intro section">
        <p className="section-label">The essential question</p>
        <div className="intro-grid"><h2>Good scenic analysis begins <em>with the right information.</em></h2><div><p className="large-copy">TRPA’s Scenic Protection Program is designed to keep development compatible with Tahoe’s natural setting and preserve important public views.</p><p>The work begins by identifying the relevant scenic unit, public viewpoints, governing standards, and attainment status. That early clarity helps keep the analysis focused on the information the project actually needs.</p></div></div>
        <div className="stats"><div><strong>3</strong><span>primary scenic resource types</span></div><div><strong>4</strong><span>core stages in a clear analysis</span></div><div><strong>1</strong><span>coordinated, review-ready package</span></div></div>
      </section>

      <section id="process" className="process section">
        <div className="section-heading"><div><p className="section-label light">A practical roadmap</p><h2>From parcel to perspective.</h2></div><p>Every assignment is project-specific. This framework keeps the work grounded in the actual site, public view, and applicable rules.</p></div>
        <div className="steps">{steps.map(({n,icon:Icon,title,copy}) => <article className="step" key={n}><div className="step-top"><span>{n}</span><Icon/></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section id="services" className="services section">
        <div className="services-visual"><div className="viewfinder"><span/><span/><span/><span/><div><small>Representative viewpoint</small><b>Existing condition → Proposed condition</b></div></div></div>
        <div className="services-copy"><p className="section-label">How we can help</p><h2>A focused scope for a clearer review.</h2><p>Engagements can begin with a quick applicability review or cover a complete scenic analysis package, depending on the project and agency path.</p>
          <ul>{['Parcel and scenic-unit research','Applicable standard and attainment review','Viewpoint planning and field documentation','Lakefront elevation documentation','Contrast and visual-impact evaluation','Mitigation and design-response guidance','Worksheet preparation and analysis support'].map(x=><li key={x}><Check size={17}/>{x}</li>)}</ul>
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

      <section className="faq section"><p className="section-label">Common questions</p><div className="faq-layout"><h2>Scenic review,<br/>made understandable.</h2><div>{faqs.map(([q,a],i)=><article className={`faq-item ${openFaq===i?'open':''}`} key={q}><button onClick={()=>setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i}><span>{q}</span><ChevronDown/></button>{openFaq===i&&<p>{a}</p>}</article>)}</div></div></section>

      <section className="cta" id="contact"><div className="cta-heading"><p className="section-label light">Your project, clearly presented</p><h2>Tell us about<br/><em>your project.</em></h2><p>Share a few details and we’ll respond with a sensible next step. Prefer email? Write to <a href={`mailto:${email}`}>{email}</a>.</p></div><ContactForm /></section>
    </main>

    <footer><Logo/><p>Independent scenic-analysis consulting for the Lake Tahoe Basin.</p><a href={`mailto:${email}`}>{email}</a><div className="fine-print">Tahoe Scenic Analysis is an independent consultancy and is not affiliated with or endorsed by the Tahoe Regional Planning Agency (TRPA). Requirements and agency determinations are project-specific. © {new Date().getFullYear()} Tahoe Scenic Analysis.</div></footer>
  </div>
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('root')
  createRoot(root).render(<App />)
}

