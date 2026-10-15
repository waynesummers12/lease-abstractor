import GuidePage, { guideMetadata } from "../GuidePage";
import { guides } from "../guideContent";

const guide = guides["lease-cam"];
export const metadata = guideMetadata(guide);

export default function Page() {
  return <GuidePage guide={guide} />;
}
