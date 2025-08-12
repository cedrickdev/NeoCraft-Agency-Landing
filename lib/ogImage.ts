import { config } from "@/config";
import urlJoin from "url-join";

export const getOgImageUrl = (title: string, brandText = config.organization) => {
  return urlJoin(
    config.baseUrl,
    `api/og-image?title=${encodeURIComponent(title)}&brand=${encodeURIComponent(
      brandText
    )}`
  );
};
