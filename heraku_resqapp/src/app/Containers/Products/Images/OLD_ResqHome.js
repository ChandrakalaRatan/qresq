import React from "react";
import {ButtonToolbar, Button } from 'react-bootstrap';
import { DisasterTypeMap } from "./DisasterTypeMap";
import './ResqHome.css';

export class ResqHome extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            dateRange: '',
            disasterType: '',
            isDataProvided: false
          };
          this.handleSubmit= this.handleSubmit.bind(this);
    }  
    handleSubmit(e){
        console.log("i am RESQHOME handlesubmit");
        if(e.target.id === "week" || e.target.id ==="month")
        {
            this.setState({dateRange: e.target.id,
                            isDataProvided: true
            });
        }
        if(e.target.id === "EQ" || e.target.id ==="HU" || e.target.id === "FL" || e.target.id ==="TC")
        {
            this.setState({disasterType: e.target.id,
                            isDataProvided: true}); 
        }
    }

    render() {

            console.log("i am in resqhome 1");
            if(this.state.isDataProvided === true)
            {
                console.log("i am in side isdataprovided if");
                
                return(
                <div className="resq-wrapper "> 
                    <DisasterTypeMap dateRange= {this.state.dateRange} disasterType= {this.state.disasterType} /> 
                </div>
                );
            }
            else{
                return(
                    <form > 
                    <div className="resq-new-window">
                    
                        <div className="resq-banner">
                            <div className="resq-logo"> resq</div>
                        
                            <div className="resq-daterange"> 
                                <div className="date-range-header">DATE RANGE</div>
                                    <ButtonToolbar className="date-range-button-group"
                                                onClick={this.handleDateRangeButtonClick}>
                                        <Button className="one-month-button" type="submit" id="month">ONE MONTH</Button>
                                        <Button className="one-week-button" type="submit"  id="week">ONE WEEK</Button>     
                                    </ButtonToolbar>
                            </div>
                            <div className="resq-disastertype">
                                <div className="disaster-type-header">DISASTER TYPE</div>            
                                    <ButtonToolbar className="disaster-type-button-group"
                                                onClick={this.handleDisaterTypeButtonClick}>
                                        <Button className="all-button" type="submit" id="all">ALL</Button>
                                        <Button className="earthquake-button" type="submit"  id="EQ">EARTHQUAKE</Button>
                                        <Button className="flood-button" type="submit" id="FL" >FLOOD</Button>
                                        <Button className="storm-button" type="submit" id="TC">STORM</Button>
                                        <Button className="humanitarian-button" type="submit" id="HU">HUMANITARIAN</Button>        
                                    </ButtonToolbar>
                            </div>    
                        </div>
                    
                        <div className="resq-wrapper "> 
                            <DisasterTypeMap dateRange= 'week' disasterType= 'all' />
                        </div>
                        
                    </div>
                    </form>       
                );   
            }//else
    }//render
    
}//class
    