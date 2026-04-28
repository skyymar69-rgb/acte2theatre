import {
  pageStatiqueMetadata,
  renderPageStatique,
} from "@/components/page-statique-renderer";

export const revalidate = 3600;

export const generateMetadata = () => pageStatiqueMetadata({ slug: "soutenir" });

export default function SoutenirPage() {
  return renderPageStatique({ slug: "soutenir" });
}
