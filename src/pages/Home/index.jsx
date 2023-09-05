import "./styles.css";
import { Component } from "react";

import { Post } from "../../components/Post";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postAndPhoto = await loadPosts();
    this.setState({
      posts: postAndPhoto.slice(page, postsPerPage),
      allPosts: postAndPhoto,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({
      posts,
      page: nextPage,
    });
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, allPosts, page, postsPerPage, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : posts;

    return (
      <section className="main-container">
        <div className="search-container">
          {!!searchValue && <h1>Search value: {searchValue}</h1>}
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 && <Post posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p>Not Found :( </p>}

        <div className="btn-container">
          {!searchValue && (
            <Button
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            >
              Load more posts...
            </Button>
          )}
        </div>
      </section>
    );
  }
}
