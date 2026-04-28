import {
  pageStatiqueMetadata,
  renderPageStatique,
} from "@/components/page-statique-renderer";

export const revalidate = 3600;

export const generateMetadata = () => pageStatiqueMetadata({ slug: "contact" });

export default function ContactPage() {
  return renderPageStatique({ slug: "contact" });
}
