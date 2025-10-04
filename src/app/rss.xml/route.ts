import getRssXml from "@helpers/rss.mjs";

export const dynamic = "force-static";
export const revalidate = 0;

export async function GET(request: Request) {
  return new Response(getRssXml(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
};
