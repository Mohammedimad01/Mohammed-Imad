export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = document.documentElement.dataset.motion === "reduced";
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  // Move focus for keyboard + screen-reader users without a second jump.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
};

export const navigateTo = (url) => window.location.assign(url);

export const openExternal = (url) => window.open(url, "_blank", "noopener,noreferrer");

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for insecure origins / older browsers.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    let ok;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}
