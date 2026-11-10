import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import CommentForm from '../blog-Comp/blog/commentForm';
import CommentList from '../blog-Comp/blog/CommentList';

const backLinkClass = 'font-semibold text-blue-600 hover:underline dark:text-blue-400';

function IndividualPostPage({ comments, addComment }) {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [apiComments, setApiComments] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the post, then the user who wrote it
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Post not found');
        }
        return response.json();
      })
      .then((postData) => {
        setPost(postData);
        return fetch('https://jsonplaceholder.typicode.com/users/' + postData.userId);
      })
      .then((response) => response.json())
      .then((userData) => setUser(userData))
      .catch((error) => {
        console.error('Error fetching post:', error);
        setError('Could not load this post.');
      });
  }, [postId]);

  // Fetch the comments for this post
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments')
      .then((response) => response.json())
      .then((data) => {
        const formatted = data.map((c) => ({
          id: 'api-' + c.id,
          postId: c.postId,
          name: c.name,
          email: c.email,
          text: c.body,
        }));
        setApiComments(formatted);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
        setApiComments([]);
      });
  }, [postId]);

  if (error !== null) {
    return (
      <>
        <Link to="/" className={backLinkClass}>← Back to Main Page</Link>
        <p className="mt-4 rounded-md bg-red-100 p-4 text-red-700 dark:bg-red-900/40 dark:text-red-300">
          {error}
        </p>
      </>
    );
  }

  if (post === null) {
    return <p className="animate-pulse text-gray-500 dark:text-gray-400">Loading post...</p>;
  }

  const localComments = comments.filter((c) => c.postId === post.id);

  // POST the new comment, then add it to the list once the API confirms it
  function handleAddComment(name, text) {
    return fetch('https://jsonplaceholder.typicode.com/posts/' + post.id + '/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        postId: post.id,
        name: name,
        body: text,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to post comment');
        }
        return response.json();
      })
      .then((savedComment) => {
        addComment(post.id, savedComment.name, savedComment.body);
      });
  }

  return (
    <>
      <Link to="/" className={backLinkClass}>← Back to Main Page</Link>

      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
          Post #{post.id}
        </p>
        <h2 className="mt-1 text-3xl font-bold capitalize leading-tight">{post.title}</h2>
        {user !== null && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">By {user.name}</p>
        )}
        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-gray-800 dark:text-gray-200">
          {post.body}
        </p>
      </article>

      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-700/50">
        <h3 className="mb-3 text-xl font-bold">About the Author</h3>
        {user === null ? (
          <p className="animate-pulse text-gray-500 dark:text-gray-400">Loading author...</p>
        ) : (
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-lg font-semibold">
                {user.name}{' '}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">@{user.username}</span>
              </p>
              <p>
                <a href={'mailto:' + user.email} className="break-words text-blue-600 hover:underline dark:text-blue-400">
                  {user.email}
                </a>
              </p>
              <p>
                <a
                  href={'https://' + user.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {user.website}
                </a>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Works at {user.company.name}</p>
            </div>
          </div>
        )}
      </section>

      {apiComments === null ? (
        <p className="mt-10 animate-pulse text-gray-500 dark:text-gray-400">Loading comments...</p>
      ) : (
        <CommentList comments={apiComments.concat(localComments)} />
      )}

      <CommentForm onAddComment={handleAddComment} />
    </>
  );
}

export default IndividualPostPage;
