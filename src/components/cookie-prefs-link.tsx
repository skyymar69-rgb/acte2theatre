"use client";

export function CookiePrefsLink() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent("acte2:open-cookie-prefs"))
      }
      className="hover:text-or-300 transition-colors"
    >
      Gérer les cookies
    </button>
  );
}
