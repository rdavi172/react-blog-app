import { useState } from 'react';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); 
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <h2 className="text-3xl font-bold">Thanks, {name}!</h2>
        <p className="mt-2">Your message was received.</p>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4 text-3xl font-bold">Contact Me</h2>

      <label htmlFor="name" className="block font-semibold">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={handleNameChange}
        required
        className="mb-4 w-full rounded border border-gray-400 p-2 dark:bg-gray-700 dark:text-white"
      />

      <label htmlFor="email" className="block font-semibold">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
        className="mb-4 w-full rounded border border-gray-400 p-2 dark:bg-gray-700 dark:text-white"
      />

      <label htmlFor="message" className="block font-semibold">Message</label>
      <textarea
        id="message"
        value={message}
        onChange={handleMessageChange}
        required
        className="mb-4 h-32 w-full rounded border border-gray-400 p-2 dark:bg-gray-700 dark:text-white"
      />

      <button type="submit" className="rounded bg-yellow-400 px-6 py-2 font-semibold text-black hover:bg-yellow-500">
        Send
      </button>
    </form>
  );
}

export default ContactPage;