// Brand marks — third-party product identities rendered from the typed
// `integrationLogos` registry. Reference a logo by its registry *key*
// (`<Logo name="github" />`), never a path string, so a typo is a compile
// error. Concept / UI icons (checks, arrows, mail, trends, etc.) come from
// `@phosphor-icons/react` at each callsite — they don't belong here.

import type React from "react"
import {
  type IntegrationLogoKey,
  integrationLogos,
} from "@/lib/integration-logos"

// Marks whose source art is dark and needs inverting to read on the dark UI.
// Everything else ships in its own display color. Override per-callsite with
// the `invert` prop when a mark lands on an unusual surface.
const INVERTED_BY_DEFAULT: ReadonlySet<IntegrationLogoKey> = new Set([
  "apple",
  "sentry",
  "expo",
])

type LogoProps = {
  name: IntegrationLogoKey
  size?: number
  invert?: boolean
  style?: React.CSSProperties
}

export const Logo = ({ name, size = 20, invert, style = {} }: LogoProps) => (
  <img
    src={integrationLogos[name].src}
    alt=""
    aria-hidden="true"
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      filter: (invert ?? INVERTED_BY_DEFAULT.has(name)) ? "invert(1)" : "none",
      display: "inline-block",
      verticalAlign: "middle",
      ...style,
    }}
  />
)
