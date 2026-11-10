import { permanentRedirect } from "next/navigation";

export default function LegacyAppEntryPage() {
  permanentRedirect("/app/step-1-upload");
}
