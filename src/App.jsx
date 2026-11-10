import { useState, useContext } from 'react';
import { Routes, Route } from 'react-router';
import { ThemeContext } from './Theme/themeContext';
import Header from './pages/blog-Comp/header/Header';
import Footer from './pages/blog-Comp/footer/Footer';
import BlogPostsPage from './pages/posts-Comp/PostsPage';
import IndividualPostPage from './pages/IndivPosts-Comp/IndividualPostPage';
import ContactPage from './pages/contact-comp/ContactPage';
import { startingComments } from './pages/blog-Comp/blog/data';

function App() {
  const { theme } = useContext(ThemeContext);
  const [comments, setComments] = useState(startingComments);

  function addComment(postId, name, text) {
    const newComment = {
      id: comments.length + 1,
      postId: postId,
      name: name,
      text: text,
    };
    setComments(comments.concat(newComment)); 
  }

  
  let themeClass = '';
  if (theme === 'dark') {
    themeClass = 'dark';
  }

  return (
    <div className={themeClass}>
      <div className="flex min-h-screen flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Header />

        <main className="mx-auto w-full max-w-3xl flex-grow p-4">
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <Routes>
              <Route path="/" element={<BlogPostsPage />} />
              <Route
                path="/posts/:postId"
                element={<IndividualPostPage comments={comments} addComment={addComment} />}
              />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;