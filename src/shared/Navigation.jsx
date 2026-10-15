import React from "react";
export function Link({ to, children, className = "", ...props }) {
  return (
    <a
      href={to}
      className={className}
      {...props}
      onClick={(e) => {
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          history.pushState({}, "", to);
          window.dispatchEvent(new PopStateEvent("popstate"));
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }}
    >
      {children}
    </a>
  );
}
