// Renders an <a> when given href, otherwise a <button>.
export default function Button({ variant = "primary", size, href, external, className = "", children, ...rest }) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ""} ${className}`.trim();
  if (href) {
    const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a className={cls} href={href} {...ext} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
