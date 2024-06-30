import { Link } from 'react-router-dom';
import './header.css'

import { IoIosArrowBack } from "react-icons/io";

const Header = ({title}) => {
    return ( 
        <header className="headerContainer">
            <Link className="back" to={'/'}>
                <IoIosArrowBack size={25}/>
            </Link>

            <h1 className="title"> {title} </h1>
        </header>
     );
}
 
export default Header;