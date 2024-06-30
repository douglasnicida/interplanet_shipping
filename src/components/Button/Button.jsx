import { Link } from 'react-router-dom'
import './button.css'

const Button = ({type, text, onClick, to}) => {
    return (
        <Link to={to} className='link'>
            <button className={`buttonContainer ${type}`} onClick={onClick}>
                {text}
            </button>
        </Link>
     );
}
 
export default Button;