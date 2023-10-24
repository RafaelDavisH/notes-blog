import { slugifyStr } from "@utils/slugify";
import ProjectDatetime from "./ProjectDatetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"projects">["data"];
  secHeading?: boolean;
}

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"projects">["data"];
  secHeading?: boolean;
}

export default function ProjectCard({
  href,
  frontmatter,
  secHeading = true,
}: Props) {
  const { title, pubDatetime, description, tools, site, repo } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <ProjectDatetime datetime={pubDatetime} site={site} repo={repo} />
      <span>tech stack: </span>
      {tools.map(tool => (
        <span
          transition:name={tool.toLowerCase()}
          className={" group pr-2 text-sm decoration-dashed underline-offset-4"}
        >
          &nbsp;
          <span className="text-skin-accent decoration-dashed">{tool}</span>
        </span>
      ))}
      <p>{description}</p>
    </li>
  );
}
