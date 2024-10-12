import type { LoaderFunction } from "@remix-run/cloudflare";
import { Feed } from "feed";
import sortOn from "sort-on";
import { fetchAwesomeYasunori } from "~/shared/fetch-awesome-yasunori";

const domain = "https://awesome.yasunori.dev";

export const loader = (async () => {
  const awesomeYasunori = await fetchAwesomeYasunori();

  if (!awesomeYasunori) {
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

  const sortedAwesomeYasunori = sortOn(awesomeYasunori, "-date");
  for (const yasunori of sortedAwesomeYasunori) {
    const link = `${domain}/entries/${yasunori.id}`;
    feed.addItem({
      link,
      date: new Date(yasunori.date),
      title: yasunori.title,
      description: `<a href="${link}">${yasunori.title}</a>`,
      content: yasunori.content,
      image: `https://image.yasunori.dev/ogp?id=${yasunori.id}`,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=2419200",
    },
  });
}) satisfies LoaderFunction;
