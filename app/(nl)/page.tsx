import { HomePage } from "@/app/_views/home-page";

export const runtime = "nodejs";

export default function Page() {
  return HomePage({ locale: "nl" });
}
