import React from "react";
import {Button} from 'reactstrap';
import './OurProduct.css';

export class OurProduct extends React.Component{
    constructor(props) {
        super(props);
        // STEP 1: create a container <div>
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
      }
    
    Demo() { 
        console.log("in Demo OURPRODUCT"); 
        //  'use strict'; 
         
          // STEP 3: open a new browser window and store a reference to it
          this.externalWindow = window.open('http://localhost:8080/resqhome', '', 'width=1200,height=2000,left=10,top=10');
    
          // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
          this.externalWindow.document.body.appendChild(this.containerEl);
     
         //window = window.open('http://localhost:8080/resqhome', RESQ, 'height=250,width=250')
          return ReactDOM.createPortal(this.props.children, this.containerEl);

    }
    componentWillUnmount() {
        console.log("in componentWillUnmount OURPRODUCT"); 
        // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
        // So we tidy up by closing the window
        this.externalWindow.close();
    }

    render() { 
        console.log("in render OURPRODUCT");        
       // barChartJsonData.map(d=>{d.date=d.date.substring(5,10)}) 
       // barChartJsonData.map(d=>{d.date=d.date.parse()})          
        return(
            <div className="resq-product">   
                <div className="resq-product-top-banner">
                    <img src='./product11.jpg' alt="" />
                     <Button className="product-button" onClick = {this.Demo}>Details</Button>       
                </div> 
            </div>   
        )                  
    }//render
}//class

