import React, { Component } from 'react';
import {ButtonToolbar, Button } from 'react-bootstrap';
import "./AffectedAreaMap.css";

export class FullSummaryReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullSummery: false,
            socialMedia: false
        }
    }
  
    componentDidMount(prevProps){
  
    }//componentDidMount

    render() {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log("render FULLSUMMARYREPORT");
        return(
       <div>i am in full summary report page</div>
        )
    }//render
}//class

export default FullSummaryReport;