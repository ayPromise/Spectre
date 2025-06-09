import { Article } from "@shared/types/Article";
import TestView from "./TestView";

type Props = {
  article: Article;
};

const ArticleView = ({ article }: Props) => {
  return (
    <div className="space-y-6">
      <div
        className="prose dark:prose-invert max-w-none tiptap ProseMirror"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.test?.questions?.length > 0 && <TestView test={article.test} />}
    </div>
  );
};

export default ArticleView;
