import { getOgImageUrl } from "@/lib/ogImage";
import { Metadata } from "next";
import { ThemeSelection } from "@/components/ThemeSelection";

const title = "Theme selector";
const description = "Select or generate a gradient theme for your blog";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [getOgImageUrl(title)],
  },
};

export default async function Page() {
  return <ThemeSelection />;
}
