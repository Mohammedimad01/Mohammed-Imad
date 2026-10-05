import { useIntersection } from "../../hooks/useIntersection";

export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const [ref, inView] = useIntersection();
  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? " is-in" : ""} ${className}`.trim()}
      style={delay ? { ...style, "--d": `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
