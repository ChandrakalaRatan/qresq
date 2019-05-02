import React, { Component } from "react";
import Toolbar  from './Toolbar/Toolbar';
import  Backdrop  from './Backdrop/Backdrop';


export class Header extends Component { 
    render(){
        return (
            <div style={{height: '100%'}}> 
             <Backdrop/>
             <Toolbar  />
            </div>
            
        );
    }
}
//export default Header;
