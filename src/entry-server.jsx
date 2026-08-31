import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { App } from './main.jsx'

export function render() {
  return renderToStaticMarkup(<App />)
}

