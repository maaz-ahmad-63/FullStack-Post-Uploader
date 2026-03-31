import React, { useEffect, useState } from 'react';

function ViewPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => setPosts(data.data || []));
  }, []);

  return (
    <div className="view-page">
      <h2>Uploaded Posts</h2>
      {posts.length === 0 && <p>No posts found.</p>}
      {posts.map(post => (
        <div key={post._id} className="post">
          <img src={post.imageUrl} alt="Uploaded" style={{maxWidth: 300}} />
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewPage;
