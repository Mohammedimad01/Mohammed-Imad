import { useRouter } from "./RouterContext";

// A real <a href> (crawlable, middle-click and new-tab friendly); a plain
// left click navigates in-app without a page reload.
export default function Link({ to, onClick, replace, children, ...rest }) {
  const { navigate } = useRouter();
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to, { replace });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
