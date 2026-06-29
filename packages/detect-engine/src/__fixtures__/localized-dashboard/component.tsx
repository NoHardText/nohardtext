export function Dashboard() {
  return (
    <>
      <h1>{t("dashboard.title")}</h1>
      <button>{t("dashboard.createProject")}</button>
      <input placeholder={t("dashboard.search")} />
    </>
  );
}
