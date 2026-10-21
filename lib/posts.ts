import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const rawDate = matterResult.data.date;
    const dateStr =
      rawDate instanceof Date
        ? rawDate.toISOString().split("T")[0]
        : String(rawDate || "");

    return {
      id,
      title: String(matterResult.data.title || id),
      author: String(matterResult.data.author || "Contributor"),
      date: dateStr,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const rawDate = matterResult.data.date;
  const dateStr =
    rawDate instanceof Date
      ? rawDate.toISOString().split("T")[0]
      : String(rawDate || "");

  return {
    id,
    content: matterResult.content,
    title: String(matterResult.data.title || id),
    author: String(matterResult.data.author || "Contributor"),
    date: dateStr,
  };
}
