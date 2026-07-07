import {
  JournalIndexPage,
  journalIndexMetadata,
} from "@/app/_views/journal-index-page";

export const runtime = "nodejs";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
};

export async function generateMetadata() {
  return journalIndexMetadata("nl");
}

export default async function Page({ searchParams }: PageProps) {
  return JournalIndexPage({
    locale: "nl",
    searchParams: await searchParams,
  });
}
