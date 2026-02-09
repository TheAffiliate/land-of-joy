import { notFound } from "next/navigation";
import { pagesConfig } from "@/config/pages.config";

export default function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const Page = pagesConfig.Pages[params.slug];

  if (!Page) {
    notFound();
  }

  return <Page />;
}
