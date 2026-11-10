function CommentList({ comments }) {
  return (
    <section className="mt-10">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
        Comments
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          {comments.length}
        </span>
      </h3>

      {comments.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center italic text-gray-600 dark:border-gray-600 dark:text-gray-400">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold uppercase text-white">
                {comment.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold capitalize">{comment.name}</p>
                {comment.email && (
                  <p className="break-words text-sm text-gray-500 dark:text-gray-400">{comment.email}</p>
                )}
                <p className="mt-2 whitespace-pre-line text-gray-800 dark:text-gray-200">{comment.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CommentList;
