export default function Tag({ children, active, onClick, ...rest }) {
  if (onClick) {
    return (
      <button type="button" className={`tag tag--btn${active ? " is-active" : ""}`} aria-pressed={!!active} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <span className="tag" {...rest}>
      {children}
    </span>
  );
}
