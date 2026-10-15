import GuidePage, { guideMetadata } from "../GuidePage";
import { guides } from "../guideContent";

const guide = guides["real-cam-nnn-overcharge-examples"];
export const metadata = guideMetadata(guide);

export default function Page() {
  return <GuidePage guide={guide} />;
}
