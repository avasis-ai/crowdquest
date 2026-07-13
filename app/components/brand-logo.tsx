type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className }: BrandLogoProps) {
  return (
    <span className={["cq-logo", className].filter(Boolean).join(" ")}>
      <svg className="cq-logo-mark" viewBox="0 0 48 48" role="img" aria-label="CrowdQuest">
        <path className="cq-logo-field" d="M5 5h38v38H5z" />
        <path className="cq-logo-c" d="M31.8 15.2A13 13 0 1 0 31.8 32.8" />
        <path className="cq-logo-q" d="M24 17.5a6.5 6.5 0 1 1-4.6 1.9A6.5 6.5 0 0 1 24 17.5Zm4.6 11.1 5.7 5.7" />
        <path className="cq-logo-signal" d="M38 10v8M34 14h8" />
      </svg>
      {!compact && <span className="cq-logo-type"><b>Crowd</b><strong>Quest</strong></span>}
    </span>
  );
}
