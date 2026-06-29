import { describe, expect, it } from "vitest";
import { detect } from "./index";

function scan(sourceText: string) {
  return detect({
    sourceText,
    filePath: "src/App.tsx",
  }).findings;
}

describe("@nohardtext/detect-engine real-world scan quality", () => {
  it("detects user-facing strings in a realistic dashboard component", () => {
    const findings = scan([
      "type Project = { name: string };",
      "",
      "export function Dashboard({ projects }: { projects: Project[] }) {",
      "  return (",
      "    <main>",
      "      <PageHeader",
      "        heading=\"Projects\"",
      "        subheading=\"Manage your team projects\"",
      "      />",
      "      <Toolbar>",
      "        <input placeholder=\"Search projects...\" />",
      "        <Button label=\"Create project\" />",
      "      </Toolbar>",
      "      {projects.length === 0 ? (",
      "        <EmptyState",
      "          emptyTitle=\"No projects yet\"",
      "          emptyMessage=\"Create your first project to get started.\"",
      "        />",
      "      ) : (",
      "        <section aria-label=\"Project list\">",
      "          <h2>{`Showing ${projects.length} projects`}</h2>",
      "        </section>",
      "      )}",
      "    </main>",
      "  );",
      "}",
    ].join("\n"));

    const messages = findings.map((finding) => finding.message);

    expect(messages).toEqual(
      expect.arrayContaining([
        'Hardcoded component prop "heading" found: "Projects"',
        'Hardcoded component prop "subheading" found: "Manage your team projects"',
        'Hardcoded placeholder found: "Search projects..."',
        'Hardcoded component prop "label" found: "Create project"',
        'Hardcoded component prop "emptyTitle" found: "No projects yet"',
        'Hardcoded component prop "emptyMessage" found: "Create your first project to get started."',
        'Hardcoded aria-label found: "Project list"',
        'Hardcoded JSX text found: "Showing ${...} projects"',
      ])
    );

    expect(findings).toHaveLength(8);
  });

  it("does not flag the same dashboard when user-facing text is localized", () => {
    const findings = scan([
      "import { Trans, useTranslation } from \"react-i18next\";",
      "",
      "type Project = { name: string };",
      "",
      "export function Dashboard({ projects }: { projects: Project[] }) {",
      "  const { t } = useTranslation();",
      "",
      "  return (",
      "    <main>",
      "      <PageHeader",
      "        heading={t(\"projects.heading\")}",
      "        subheading={t(\"projects.subheading\")}",
      "      />",
      "      <Toolbar>",
      "        <input placeholder={t(\"projects.search.placeholder\")} />",
      "        <Button label={t(\"projects.actions.create\")} />",
      "      </Toolbar>",
      "      {projects.length === 0 ? (",
      "        <EmptyState",
      "          emptyTitle={t(\"projects.empty.title\")}",
      "          emptyMessage={t(\"projects.empty.message\")}",
      "        />",
      "      ) : (",
      "        <section aria-label={t(\"projects.list.ariaLabel\")}>",
      "          <h2>",
      "            <Trans",
      "              i18nKey=\"projects.list.count\"",
      "              values={{ count: projects.length }}",
      "            />",
      "          </h2>",
      "        </section>",
      "      )}",
      "    </main>",
      "  );",
      "}",
    ].join("\n"));

    expect(findings).toEqual([]);
  });

  it("keeps technical dashboard attributes low-noise while detecting nearby UI text", () => {
    const findings = scan([
      "export function DashboardCard() {",
      "  return (",
      "    <Card",
      "      id=\"billing-card\"",
      "      className=\"rounded-lg border\"",
      "      data-testid=\"billing-card\"",
      "      role=\"region\"",
      "      aria-labelledby=\"billing-title\"",
      "      trackingId=\"billing-card-v2\"",
      "      title=\"Billing overview\"",
      "    >",
      "      <h2 id=\"billing-title\">Billing</h2>",
      "      <Button label=\"Update payment method\" />",
      "    </Card>",
      "  );",
      "}",
    ].join("\n"));

    expect(findings.map((finding) => finding.message)).toEqual([
      'Hardcoded title attribute found: "Billing overview"',
      'Hardcoded JSX text found: "Billing"',
      'Hardcoded component prop "label" found: "Update payment method"',
    ]);
  });
});

