import React from "react";
import './Home.css';

export class Home extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          
        } 
    }   
  render() {
  
    return(
      
      <div className="home">
      
      <div className="home-left-banner">
      left banner</div>  
      <div className="home-right-banner">
      right banner</div>
  </div>
      )
    }
}
    