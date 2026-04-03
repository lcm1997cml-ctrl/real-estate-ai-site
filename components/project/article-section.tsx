import Link from "next/link";
import { Project } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ArticleSection({ project }: { project: Project }) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold">最新文章與攻略</h2>
        <Link href={`/project/${project.slug}/investment-analysis`} className="text-sm text-neutral-600 hover:text-neutral-900">
          查看全部內容
        </Link>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {project.articles.slice(0, 4).map((article) => (
          <Card key={article.slug}>
            <CardHeader>
              <CardTitle className="text-lg">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-neutral-600">
              <p>{article.description}</p>
              <Link href={`/project/${project.slug}/${article.slug}`} className="mt-3 inline-block font-medium text-neutral-900">
                閱讀詳情
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
