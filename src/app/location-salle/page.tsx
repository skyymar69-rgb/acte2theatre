import {
  pageStatiqueMetadata,
  renderPageStatique,
} from "@/components/page-statique-renderer";
import { NextShowsTeaser } from "@/components/next-shows-teaser";

export const revalidate = 3600;

export const generateMetadata = () =>
  pageStatiqueMetadata({ slug: "location-salle" });

export default async function LocationSallePage() {
  return (
    <>
      {await renderPageStatique({ slug: "location-salle" })}
      <NextShowsTeaser />
    </>
  );
}
