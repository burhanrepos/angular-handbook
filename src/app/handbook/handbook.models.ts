/** Metadata for one study module (or the appendix). Its body HTML is fetched at runtime. */
export interface ModuleMeta {
  /** Anchor id, e.g. `m1` — also the content filename (`content/m1.html`). */
  id: string;
  /** Zero-padded label shown as "Module NN". */
  number: string;
  /** Arc label, e.g. "Foundations" / "Building blocks" / "Advanced". */
  kind: string;
  /** Heading text. */
  title: string;
}

/** A single sidebar link. */
export interface NavLink {
  href: string;
  label: string;
  /** Optional leading number badge. */
  num?: string;
}

/** A titled group of sidebar links. */
export interface NavGroup {
  heading: string;
  links: NavLink[];
}
