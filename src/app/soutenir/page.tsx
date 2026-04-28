import {
  pageStatiqueMetadata,
  renderPageStatique,
} from "@/components/page-statique-renderer";
import { NextShowsTeaser } from "@/components/next-shows-teaser";

export const revalidate = 3600;

export const generateMetadata = () => pageStatiqueMetadata({ slug: "soutenir" });

export default async function SoutenirPage() {
  return (
    <>
      {await renderPageStatique({ slug: "soutenir" })}
      <NextShowsTeaser
        title="Découvrez la programmation à soutenir"
        subtitle="Chaque billet est un soutien direct aux compagnies invitées."
      />
    </>
  );
}
