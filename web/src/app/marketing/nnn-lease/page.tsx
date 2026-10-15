import GuidePage, { guideMetadata } from "../GuidePage";
import { guides } from "../guideContent";

const guide = guides["nnn-lease"];
export const metadata = guideMetadata(guide);

export default function Page() {
  return <GuidePage guide={guide} />;
}
