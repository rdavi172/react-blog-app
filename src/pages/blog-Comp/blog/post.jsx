import { Link } from 'react-router';

function Post({ id, title, preview }) {
  return (
    <article className="mb-4 rounded-lg border border-gray-200 p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        Post #{id}
      </p>
      <h2 className="mt-1 text-xl font-bold capitalize">
        <Link to={'/posts/' + id} className="hover:text-blue-600 dark:hover:text-blue-400">
          {title}
        </Link>
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{preview}</p>
      <Link
        to={'/posts/' + id}
        className="mt-3 inline-block font-semibold text-blue-600 hover:underline dark:text-blue-400"
      >
        Read more →
      </Link>
    </article>
  );
}

export default Post;
