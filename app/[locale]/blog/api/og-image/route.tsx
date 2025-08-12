import { config } from "@/config";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

const generateOpenGraphImage = async ({
  title,
  brandText,
}: {
  title: string;
  brandText?: string;
}) => {
  const fonts = {
    "ibm-regular": {
      name: "IBMPlexSans",
      data: await fetch(
        new URL("fonts/IBMPlexSans-Regular.ttf", config.baseUrl)
      ).then((res) => res.arrayBuffer()),
      weight: 400 as const,
      style: "normal" as const,
    },
    "ibm-semibold": {
      name: "IBMPlexSans",
      data: await fetch(
        new URL("fonts/IBMPlexSans-SemiBold.ttf", config.baseUrl)
      ).then((res) => res.arrayBuffer()),
      weight: 600 as const,
      style: "normal" as const,
    },
  };
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          justifyContent: "space-between",
          fontWeight: "400",
          fontFamily: "IBMPlexSans",
          color: "#212121",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              marginTop: "40px",
              fontSize: "96px",
              fontWeight: "600",
              lineHeight: "6rem",
              padding: "0 0 100px 0",
              letterSpacing: "-0.025em",
              color: "#212121",
              fontFamily: "IBMPlexSans",
              lineClamp: 4,
            }}
          >
            {title}
          </div>
        </div>
        {brandText && (
          <div
            style={{
              fontSize: "32px",
              fontWeight: "900",
              color: "#212121",
              display: "flex",
              textAlign: "right",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            {brandText}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [fonts["ibm-regular"], fonts["ibm-semibold"]],
    }
  );
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  if (!title) {
    return new Response("Missing title", { status: 400 });
  }
  const brandText = searchParams.get("brand") || undefined;

  return generateOpenGraphImage({
    title,
    brandText,
  });
}
