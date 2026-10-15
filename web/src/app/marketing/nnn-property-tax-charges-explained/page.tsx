import GuidePage, { guideMetadata } from "../GuidePage";
import { guides } from "../guideContent";

const guide = guides["nnn-property-tax-charges-explained"];
export const metadata = guideMetadata(guide);

export default function Page() {
  return <GuidePage guide={guide} />;
}
