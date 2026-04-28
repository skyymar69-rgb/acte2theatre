import {
  pageStatiqueMetadata,
  renderPageStatique,
} from "@/components/page-statique-renderer";

export const revalidate = 3600;

export const generateMetadata = () =>
  pageStatiqueMetadata({ slug: "location-salle" });

export default function LocationSallePage() {
  return renderPageStatique({ slug: "location-salle" });
}
