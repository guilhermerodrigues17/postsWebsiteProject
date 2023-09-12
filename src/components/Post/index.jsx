import './styles.css';
import { PostCards } from "../PostCards";

export const Post = ({ posts = [] }) => {
  return (
    <div className="posts-container">
      {posts.map(({ id, title, body, cover }) => {
        return (
          <PostCards
            key={id}
            title={title}
            body={body}
            cover={cover}
          />
        );
      })}
    </div>
  );
};
