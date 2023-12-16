
import "./Button.css";

// eslint-disable-next-line react/prop-types
const Button = ({text,callback}) => {
    return (
        <>
          <button  onClick={callback}>{text}</button>  
        </>
    );
}

export default Button;
