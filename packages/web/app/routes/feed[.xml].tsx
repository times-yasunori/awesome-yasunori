import type { LoaderFunction } from "@remix-run/node";
import { Feed } from "feed";
import sortOn from "sort-on";
import { fetchAwesomeYasunori } from "~/shared/fetch-awsome-yasunori";

const domain = "https://awesome.yasunori.dev";

export const loader = (async () => {
  const awsomeYasunori = await fetchAwesomeYasunori();

  if (!awsomeYasunori) {
    throw new Response(null, { status: 404 });
  }

  const feed = new Feed({
    title: "Awesome Yasunori",
    description: "Awesome Yasunori",
    id: domain,
    link: domain,
    language: "ja",
    copyright: "vim-jp#times-yasunori all rights reserved",
    feedLinks: {
      rss: `${domain}/rss.xml`,
    },
  });

  const sortedAwsomeYasunori = sortOn(awsomeYasunori, "-date");
  for (const yasunori of sortedAwsomeYasunori) {
    feed.addItem({
      link: `${domain}#${yasunori.id}`,
      date: new Date(yasunori.date),
      title: yasunori.title,
      description: yasunori.content,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=2419200",
    },
  });
}) satisfies LoaderFunction;
