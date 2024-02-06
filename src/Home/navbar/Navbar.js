
// import { jwtDecode } from "jwt-decode"
// import { isEmpty } from "lodash"
// import AdminNavbar from "./AdminNavbar"
// import OperatorNavbar from "./OperatorNavbar"
// import CustomerNavbar from "./CustomerNavbar"
// import { useContext } from "react"
// import { OperatorContext } from "../../components/profile/operatorContext"
// import { Link } from "react-router-dom"

// const Navbar = () =>{
//     const {userState, userDispatch} = useContext(OperatorContext)

//     const navbarCondition = ()=>{
//         if(userState && userState.userDetails){
//             const role = jwtDecode(localStorage.getItem('token')).role
//         console.log(role, 'rolekkkk')
//         if(role === 'admin'){
//             return <AdminNavbar />
//         }else if (role === 'operator'){
//             return <OperatorNavbar />
//         }else if(role === 'customer'){
//             return <CustomerNavbar />
//         }
//         }
//         return null
//     }

//     return (
//         <div>
//             {/* {isEmpty(userState?.userDetails) ? (
//                 <>
//                 <Link to='/login'>login</Link>
//                 </>
                
//             ): (
//                 <> */}
//                     {navbarCondition()}
//                 {/* </>
//             )} */}
//         </div>
//     )
// }
// export default Navbar

// import { jwtDecode } from "jwt-decode";
// import { isEmpty } from "lodash";
// import AdminNavbar from "./AdminNavbar";
// import OperatorNavbar from "./OperatorNavbar";
// import CustomerNavbar from "./CustomerNavbar";
// import { useContext } from "react";
// import { OperatorContext } from "../../components/profile/operatorContext";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const { userState, userDispatch } = useContext(OperatorContext);

//   const navbarCondition = () => {
//     const token = localStorage.getItem('token');

//     if (token && typeof token === 'string') {
//       const role = jwtDecode(token).role;
//       console.log(role, 'rolekkkk');
      
//       if (role === 'admin') {
//         return <AdminNavbar />;
//       } else if (role === 'operator') {
//         return <OperatorNavbar />;
//       } else if (role === 'customer') {
//         return <CustomerNavbar />;
//       }
//     }

//     return null;
//   };

//   return (
//     <div>
//       {isEmpty(userState?.userDetails) ? (
//         <>
//           <Link to='/login' >login</Link>
//         </>
//       ) : (
//         <>
//       {navbarCondition()}
//       </>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import { jwtDecode } from "jwt-decode"
import { isEmpty } from "lodash"
import AdminNavbar from "./AdminNavbar"
import OperatorNavbar from "./OperatorNavbar"
import CustomerNavbar from "./CustomerNavbar"
import { useContext } from "react"
import { OperatorContext } from "../../components/profile/operatorContext"
import { Link } from "react-router-dom"

const Navbar = () =>{
    const { userState, userDispatch } = useContext(OperatorContext)

    const navbarCondition = () => {
        // Check if userState and userDetails are defined
        // if (userState && userState.userDetails) {
            // const role = jwtDecode(localStorage.getItem('token')).role;
            const role = userState.userDetails.role
            console.log(role, 'rolekkkk');
            if (role === 'admin') {
                return <AdminNavbar />;
            } else if (role === 'operator') {
                return <OperatorNavbar />;
            } else if (role === 'customer') {
                return <CustomerNavbar />;
            }
        // }
        // return null; // Return null if userState or userDetails are not defined
    }

    return (
        <div>
            {isEmpty(userState?.userDetails) ? (
                <>
                    <Link to='/'>Home</Link>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>
            ) : (
                <>
                    {navbarCondition()}
                </>
            )}
        </div>
    )
}

export default Navbar;
















// import { jwtDecode } from "jwt-decode"
// import { isEmpty } from "lodash"
// import AdminNavbar from "./AdminNavbar"
// import OperatorNavbar from "./OperatorNavbar"
// import CustomerNavbar from "./CustomerNavbar"
// import { useContext } from "react"
// import { OperatorContext } from "../../components/profile/operatorContext"
// import { Link } from "react-router-dom"

// const Navbar = () =>{
//     const {userState, userDispatch} = useContext(OperatorContext)

//     const navbarCondition = ()=>{
//         const role = jwtDecode(localStorage.getItem('token')).role
//         console.log(role, 'rolekkkk')
//         if(role === 'admin'){
//             return <AdminNavbar />
//         }else if (role === 'operator'){
//             return <OperatorNavbar />
//         }else if(role === 'customer'){
//             return <CustomerNavbar />
//         }
//     }

//     return (
//         <div>
//             {isEmpty(userState.userDetails) ? (
//                 <>
//                 <Link to='/'>Home</Link>
//                 <Link to='/login'>Login</Link>
//                 <Link to='/register'>Register</Link>
//                 </>
//             ): (
//                 <>
//                     {navbarCondition()}
//                 </>
//             )}
//         </div>
//     )
// }
// export default Navbar
