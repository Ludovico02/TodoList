export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Home Page</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/todo" className="nav-link">Todo List</Link>
            </div>
        </nav>
    )
}