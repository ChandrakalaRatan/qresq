import React from "react";
import {ButtonToolbar, Button } from 'react-bootstrap';
import './ResqHome.css';

export class ResqBanner extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            dateRange: '',
            disasterType: '',
            isDataProvided: false
          };
    }  
    handleSubmit(e){
        console.log("i am RESQHOME handlesubmit");
        if(e.target.id === "week" || e.target.id ==="month")
        {
            this.setState({
                dateRange: e.target.id,
                isDataProvided: true
            });
        }
        if(e.target.id === "EQ" || e.target.id ==="HU" || e.target.id === "FL" || e.target.id ==="TC")
        {
            this.setState(
                {disasterType: e.target.id,
                isDataProvided: true}); 
        }
    }

    render() {
        return( 
            <div className="resq-new-window">    
            <div className="resq-banner">       
                    <div className="resq-logo"> resq</div>
                    <div className="resq-daterange"> 
                        <div className="date-range-header">DATE RANGE</div>
                        <ButtonToolbar className="date-range-button-group"
                                                onClick={this.handleSubmit.bind(this)}>
                            <Button className="one-month-button" type="submit" id="month">ONE MONTH</Button>
                            <Button className="one-week-button" type="submit"  id="week">ONE WEEK</Button>     
                        </ButtonToolbar>
                    </div>
                    <div className="resq-disastertype">
                        <div className="disaster-type-header">DISASTER TYPE</div>            
                            <ButtonToolbar className="disaster-type-button-group"
                                                onClick={this.handleSubmit.bind(this)}>
                                <Button className="all-button" type="submit" id="all">ALL</Button>
                                <Button className="earthquake-button" type="submit"  id="EQ">EARTHQUAKE</Button>
                                <Button className="flood-button" type="submit" id="FL" >FLOOD</Button>
                                <Button className="storm-button" type="submit" id="TC">STORM</Button>
                                <Button className="humanitarian-button" type="submit" id="HU">HUMANITARIAN</Button>        
                            </ButtonToolbar>
                    </div>   
            </div>   
            </div>      
        )     
    }//render
    
}//class
    