import fs from 'fs-extra'

import { r } from '../scripts/utils'

export async function getManifest() {
  const pkg = await fs.readJSON(r('./package.json'))

  const manifest = {
    manifest_version: 2,
    name: pkg.displayName || pkg.name,
    description: pkg.description,
    version: pkg.version,
    icons: {
      16: './assets/icon16.png',
      48: './assets/icon48.png',
      128: './assets/icon128.png',
    },
    content_scripts: [{
      matches: ['https://*.shikimori.one/*'],
      css: ['background/inpage.css'],
      js: ['background/content.js'],
      run_at: "document_start",
    }],
    web_accessible_resources: [
      "dist/index.html",
      "background/inpage.js"
    ],
    browser_specific_settings: {
      gecko: {
        id: `${pkg.name}@dubinin.me`,
        strict_min_version: "48.0"
      }
    },
  }

  return manifest
}
