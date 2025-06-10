import { Article } from "@shared/types/Article";
import "@/components/tiptap/tiptap-templates/simple/simple-editor.scss";
import "@/components/tiptap/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap/tiptap-node/paragraph-node/paragraph-node.scss";

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
    </div>
  );
};

export default ArticleView;
