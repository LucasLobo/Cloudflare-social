import React, { useEffect, useState } from "react";

import Post from './post';

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');


  // inputs
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        "http://127.0.0.1:8787/posts"
      );
      const postsResp = await resp.json();
      setPosts(postsResp);
      setError('');
    } catch (e) {
      setError(e.toString());
    } finally {
      setLoading(false);
    }
  };

  const createPost = async() => {
    setError('');
    if (username.length === 0 || title.length === 0 || content.length === 0) {
      setError('Please fill all fields');
      return;
    }

    const data = {
      'title': title,
      'username': username,
      'content': content,
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    try {
      setLoading(true);
      await fetch("http://127.0.0.1:8787/posts", requestOptions);
    } catch (e) {
      setError(e.toString());
    } finally {
      setUsername('');
      setTitle('');
      setContent('');
      getPosts();
    }
  }

  return (
    <div className="posts">

      <div className="create-post">

        <h2>What's on your mind?</h2>

        <label for="username">Username:</label>
        <input id="username" type="text" onChange={e => setUsername(e.target.value)}></input>

        <label for="title">Title:</label>
        <input id="title" type="text" onChange={e => setTitle(e.target.value)}></input>

        <label for="content">Content:</label>
        <textarea id="content" onChange={e => setContent(e.target.value)}></textarea>

        <button className="create-post-button white-box" onClick={createPost} type="button">Create Post</button>

      </div>

      <div className="posts-header">
        <h2>Feed</h2>
        { loading && <span>Content is loading...!</span>}
        {error.length > 0 && <p>Error: {error}</p>
      }
        
      </div>
      <div className="posts-body">
        {posts.map((post) => (
          <Post title={post.title} username={post.username} content={post.content}></Post>
        ))}
      </div>
    </div>
  );
};

export default Feed;