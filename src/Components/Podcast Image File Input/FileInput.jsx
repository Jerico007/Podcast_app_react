/* eslint-disable react/prop-types */
import {  useState } from "react";
import Input from "../Common components/Input/Input";
// eslint-disable-next-line react/prop-types


const FileInput = ({ id, name, callback}) => {
  //useState to check if file selected
  const [selected ,setStatus] = useState(false);

  
  
 
  // To handel File Input
  function handelFileInput(e)
{
    e.target.files.length > 0 ? setStatus(e.target.files[0]) : setStatus(false); 

    if(name === "Banner"){
      callback({type:"BANNER",payLoad:e.target.files[0]}) ;
    }
    else{
      callback({type:"SMALL",payLoad:e.target.files[0]});
    }
    
}
  return (
    <>
      <label htmlFor={id} className="Input-Label">
        {

           !selected ?   `Select a ${name} image` : `File ${selected.name} was selected`
        }
      </label>
    

            <Input
            type={"file"}
        id={id}
        accept={"images/*"}
        style={{ display: "none" }}
        onInput={handelFileInput}
      />
    </>
  );
};

export default FileInput;
