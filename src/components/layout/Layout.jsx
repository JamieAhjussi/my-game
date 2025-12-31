export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-brown-100 font-sans text-brown-600 flex flex-col">
      <header className="p-6 bg-white shadow-sm flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
          My Game
        </h1>
        <nav className="space-x-4">
          <a href="#" className="hover:text-brand-orange transition-colors">Home</a>
          <a href="#" className="hover:text-brand-orange transition-colors">About</a>
        </nav>
      </header>
      
      <main className="grow container mx-auto p-6">
        {children}
      </main>

      <footer className="p-6 text-center text-brown-400 text-sm">
        © 2025 My Game Project
      </footer>
    </div>
  );
}
