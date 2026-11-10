import Navbar from '../navbar/Navbar';

function Header() {
  return (
    <header className="bg-blue-600 p-4 text-white dark:bg-blue-950">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">My Blog</h1>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
