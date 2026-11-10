import { useState } from 'react';

const inputBase =
  'w-full rounded-md border bg-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white';

function CommentForm({ onAddComment }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
    setSuccess(false);
  }

  function handleTextChange(e) {
    setText(e.target.value);
    setSuccess(false);
  }

  function validate(trimmedName, trimmedText) {
    const newErrors = {};
    if (trimmedName === '') {
      newErrors.name = 'Name is required.';
    }
    if (trimmedText === '') {
      newErrors.text = 'Comment is required.';
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedText = text.trim();

    const newErrors = validate(trimmedName, trimmedText);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    onAddComment(trimmedName, trimmedText)
      .then(() => {
        setName('');
        setText('');
        setSuccess(true);
      })
      .catch(() => {
        setSubmitError('Something went wrong posting your comment. Please try again.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-700/50"
    >
      <h2 className="mb-4 text-2xl font-bold">Leave a Comment</h2>

      <label htmlFor="comment-name" className="mb-1 block font-semibold">Name</label>
      <input
        id="comment-name"
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Your name"
        className={inputBase + (errors.name ? ' border-red-500' : ' border-gray-300 dark:border-gray-600')}
      />
      {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}

      <label htmlFor="comment-text" className="mb-1 mt-4 block font-semibold">Comment</label>
      <textarea
        id="comment-text"
        value={text}
        onChange={handleTextChange}
        placeholder="Write your comment..."
        rows={4}
        className={inputBase + (errors.text ? ' border-red-500' : ' border-gray-300 dark:border-gray-600')}
      />
      {errors.text && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.text}</p>}

      {submitError && (
        <p className="mt-4 rounded-md bg-red-100 p-3 text-red-700 dark:bg-red-900/40 dark:text-red-300">
          {submitError}
        </p>
      )}
      {success && (
        <p className="mt-4 rounded-md bg-green-100 p-3 text-green-700 dark:bg-green-900/40 dark:text-green-300">
          Comment posted!
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 rounded-md bg-yellow-400 px-6 py-2 font-semibold text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Posting...' : 'Submit'}
      </button>
    </form>
  );
}

export default CommentForm;
