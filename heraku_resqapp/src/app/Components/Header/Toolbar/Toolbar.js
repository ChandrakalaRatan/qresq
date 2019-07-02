import React from 'react';

import './Toolbar.css';


const toolbar = props => ( 
    <header className="toolbar">
      <nav className="toolbar__navigation"> 
            <div className="toolbar__logo"><a href='/'><img src={"./src/Images/qresqlogo.png"}/>QresQ</a></div>
            <div className="spacer"></div>
            <div className="toolbar__navigation-items"> 
                <ul>
                    <li><a href ={"/home"} > Home</a></li>
                    <li><a href ={"/ourtechnology"} > Our Technology</a></li>
                    <li><a href ={"/aboutus"}> About Us</a></li>
                    {/* <li><a href ={"/ourproducts"}> Our Products</a></li> */}
                    <li><a href ={"/resqhome"}> Our Products</a></li>
                    <li><a href ={"/contact"}> Contact</a></li>
                    <li><a href ={"/datapolicy"}> Data Policy</a></li>
                </ul>
             </div>
        </nav> 
    </header>
);
export default toolbar;