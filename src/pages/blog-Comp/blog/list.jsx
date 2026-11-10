import { useState, useEffect } from 'react';
import BlogPost from './post';

function List() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setError('Could not load posts.');
      });
  }, []);

  if (error !== null) {
    return <p className="text-red-600">{error}</p>;
  }

  if (posts.length === 0) {
    return <p>Loading posts...</p>;
  }

  return (
    <section>
      {posts.map((post) => (
        <BlogPost
          key={post.id}
          id={post.id}
          title={post.title}
          preview={post.body.slice(0, 100) + '...'}
        />
      ))}
    </section>
  );
}

export default List; 