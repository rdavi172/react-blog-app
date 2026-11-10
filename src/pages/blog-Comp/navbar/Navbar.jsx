import { useContext } from 'react';
import { Link } from 'react-router';
import { posts } from '../blog/data';
import { ThemeContext } from '../../../Theme/themeContext';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  let buttonText = 'Dark Mode';
  if (theme === 'dark') {
    buttonText = 'Light Mode';
  }

  return (
    <nav className="mt-3">
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/" className="font-semibold hover:underline">Blog Posts</Link>
        <Link to="/contact" className="font-semibold hover:underline">Contact</Link>
        <button
          onClick={toggleTheme}
          className="rounded bg-white px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-100"
        >
          {buttonText}
        </button>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <span>Posts:</span>
        {posts.map((post) => (
          <Link key={post.id} to={'/posts/' + post.id} className="underline hover:text-blue-200">
            {post.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;