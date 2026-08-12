import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Widget, { getScriptConfig } from './Widget.tsx'

const MOUNT_ID = 'axon-widget-root'

function mount() {
  let container = document.getElementById(MOUNT_ID)
  if (!container) {
    container = document.createElement('div')
    container.id = MOUNT_ID
    document.body.appendChild(container)
  }

  const config = getScriptConfig()
  createRoot(container).render(
    <StrictMode>
      <Widget {...config} />
    </StrictMode>,
  )
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
