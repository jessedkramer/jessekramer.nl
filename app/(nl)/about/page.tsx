import { AboutPage, aboutMetadata } from "@/app/_views/about-page";

export const runtime = "nodejs";

export async function generateMetadata() {
  return aboutMetadata("nl");
}

export default function Page() {
  return AboutPage({ locale: "nl" });
}
