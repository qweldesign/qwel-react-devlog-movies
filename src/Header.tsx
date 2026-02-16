function Header({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="m-0 py-4 bg-black text-white text-center">
        <h1>QWEL MOVIE SEARCH | QWEL React Devlog</h1>
      </header>
      <main className="bg-gray-800 text-white">
        {children}
      </main>
    </>
  );
}

export default Header;
