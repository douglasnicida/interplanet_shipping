import './footer.css'

import Button from "../Button/Button";
import { Link } from 'react-router-dom';

const Footer = ({saveChangesClick}) => {
    return ( 
        <footer>
            <Link to={'/'}><Button text={'Cancel'} type={'secondary'}/></Link>
            <Button text={'Save changes'} type={'primary'} onClick={saveChangesClick}/>
        </footer>
     );
}
 
export default Footer;