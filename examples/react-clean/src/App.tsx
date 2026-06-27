function t(key: string): string {
  return key;
}

export default function App() {
  return (
    <>
      <h1>{t("home.title")}</h1>

      <button title={t("actions.startTitle")} aria-label={t("actions.startAriaLabel")}>
        {t("actions.startGame")}
      </button>

      <input placeholder={t("search.placeholder")} />

      <img src="/logo.png" alt={t("brand.logoAlt")} />

      <div className="hero" />
    </>
  );
}
