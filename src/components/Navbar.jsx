import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.svg'


function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-blue-100 flex justify-between py-5 px-10 rounded-lg  ">
            <Link to={
                isAuthenticated ? "/" : "/"
            }>
                <img src={logo} alt="Product Manager Logo" className="w-auto h-10" />
            </Link>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>Welcome {user.username}!</li>
                        <li>
                            <Link to='/add-products'
                                className="bg-indigo-200 px-3 py-2 rounded-lg"
                            >Add Product</Link>
                        </li>
                        <li>
                            <Link to='/products' className="bg-indigo-200 px-3 py-2 rounded-lg "
                            >My products</Link>

                        </li>
                        <li>
                            <Link to='/cart' className="bg-indigo-200 px-3 py-2 rounded-lg "
                            >Carrito</Link>
                        </li>
                        <li>
                            <Link to='/' className="bg-red-200 px-3 py-2 rounded-lg"
                            onClick={() => {
                                logout();
                            }}>Logout</Link>
                        </li>

                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'
                                className="bg-indigo-300 px-4 py-1 rounded-lg"
                            >Login</Link>
                        </li>
                        <li>
                            <Link to='/register'
                                className="bg-indigo-300 px-4 py-1 rounded-lg"
                            >Register</Link>
                        </li>
                    </>
                )}
            </ul>

        </nav>
    )
}

export default Navbar;