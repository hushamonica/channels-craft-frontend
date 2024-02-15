import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { OperatorContext } from "../../components/profile/operatorContext"
import { isEmpty } from "lodash";

export default function CustomerNavbar() {
    const { userDispatch } = useContext(OperatorContext)

    const navigate = useNavigate()

    const handleLogout = ()=>{
        localStorage.clear('') 
        userDispatch({
            type: "SIGN_IN_TOGGLE",
            payload: false
        })
        // window.location.reload()
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link className="navbar-brand" to="/">Channel Craft</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <li>
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                {isEmpty(localStorage.getItem('token')) && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                )}
                
                <li className="nav-item">
                    <Link className="nav-link" to="/packcha">Packages & Channels</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart">Cart</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/customerProfile">
                    <i className="bi bi-person-circle fs-5"></i>
                    </Link>
                </li>
                {!isEmpty(localStorage.getItem('token')) && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                </li>
                )}
                
                </div>
            </ul>
            
            </div>
            </nav>
        </div>
    )
}