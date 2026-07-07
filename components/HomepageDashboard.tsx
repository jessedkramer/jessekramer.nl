import AboutCard from "@/components/AboutCard";
import JournalCard from "@/components/JournalCard";
import MunicipalityCard from "@/components/MunicipalityCard";
import SocialsCard from "@/components/SocialsCard";
import { getHomepageContent } from "@/lib/site";

const widgetComponents = {
  about: AboutCard,
  socials: SocialsCard,
  journal: JournalCard,
  municipality: MunicipalityCard,
} as const;

type WidgetId = keyof typeof widgetComponents;

type HomepageDashboardProps = {
  ariaLabel: string;
};

function renderWidget(id: string) {
  const Component = widgetComponents[id as WidgetId];
  if (!Component) return null;
  return <Component key={id} />;
}

export default function HomepageDashboard({ ariaLabel }: HomepageDashboardProps) {
  const homepage = getHomepageContent();
  const enabledIds = new Set(
    Object.entries(homepage.widgets)
      .filter(([, widget]) => widget.enabled)
      .map(([id]) => id),
  );

  return (
    <section className="dashboard" aria-label={ariaLabel}>
      {homepage.layout.desktop.columns.map((column) => {
        const widgets = column.widgets.filter((id) => enabledIds.has(id));
        if (widgets.length === 0) return null;

        return (
          <div
            key={column.id}
            className={column.className ?? "dashboard-col"}
          >
            {widgets.map((id) => renderWidget(id))}
          </div>
        );
      })}
    </section>
  );
}
