function NavBar () {
    return (
        <nav className="flex items-center justify-between py-4 px-8 bg-white border-b ">
      <a href="/" className="text-2xl font-bold">
        Jamies P<span className="text-purple-500">.</span>
      </a>
      <div className="hidden md:flex space-x-4">
        <a href="/login" className="px-9 py-2  rounded-full border">
          Log in
        </a>
        <a
          href="/signup"
          className="px-8 py-2 bg-black text-white rounded-full hover:bg-purple-600 transition-colors"
        >
          Sign up
        </a>
      </div>
      <button className="md:hidden">Menu</button>
    </nav>
    );
}

export default NavBar;