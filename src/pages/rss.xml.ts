import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: string }) {
  const writing = (
    await getCollection("writing", ({ data }) => data.draft !== true)
  )?.sort((a, b) => {
    return new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime();
  });

  const posts = writing.map((post) => ({
    title: post.data.title,
    pubDate: post.data.publishDate,
    description: post.data.description,
    link: `/writing/${post.id}`,
  }));

  return rss({
    title: "Kayode's Blog",
    description: "A blog about anything and everything I find interesting.",
    site: context.site,
    items: posts,
  });
}