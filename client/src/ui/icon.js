import React from 'react';
import { Link } from "react-router-dom";
const Tag = (props) => {
    const template = <div>
      {props.children}
    </div>;
  
    if(props.link){
        return (
           <Link to={props.linkto}>{template}</Link>
        );
    }else{
        return template;
    }
    
  }
  export default Tag;