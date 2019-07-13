import React from "react";
import ReactDOM from "react-dom";
import {ButtonToolbar, Button } from 'react-bootstrap';
import { DisasterTypeMap } from "./DisasterTypeMap";
import './ResqHome.css';



export class ResqHome extends React.Component{
    constructor(props) {
        super(props);  
        this.state = {
            sDateRange: 'week',
            sDisasterType: 'all',
            requirementKey: Math.random(),
            sDisasterTypeFilter:[],
            sButtonClickFlag: true,
            sDateRangeFilters: ''

        } 
    } 

    handleSubmitBannerClick(e){
        console.log("&&&&&&&&&& entering handleSubmitBannerClick");
        if(e.target.id === "week" || e.target.id ==="month")
        {
            this.setState(
                {
                 sDateRange: e.target.id,
                 sButtonClickFlag: true
            });
        }
        if(e.target.id === "EQ" || e.target.id ==="HU" || 
           e.target.id === "FL" || e.target.id ==="TC" )
        {
            this.setState({
                sDisasterType: e.target.id,
                sButtonClickFlag: true 
            });
            this.state.sDisasterTypeFilter.pop();
            this.state.sDisasterTypeFilter.push({
                                                fieldName: 'disasterType',
                                                type: 'string',
                                                value: e.target.id
                                                })
         }
        if(e.target.id  === "all")
        {
            this.setState({
                sDisasterType: e.target.id,
                sButtonClickFlag: true
            });
            this.state.sDisasterTypeFilter.pop(); 
        }
        this.setState({ requirementKey: Math.random() });
        //this.forceUpdate();
    }

    renderBanner(){
        return(
            <div className="resq-banner">       
                <div className="resq-logo"> 
                    <div className="resq__logo_img">   
                        <img src={"http://localhost:8080/Images/qresqlogo.png"} 
                            align="bottom" width="40" height="50"/>
                    </div> 
                    <div className="resq__logo_label-div"> 
                        <label className="resq__logo_label">resQ</label>
                    </div> 
                </div>
                <div className="resq-daterange"> 
                    <div className="date-range-header">DATE RANGE</div>
                    <ButtonToolbar className="date-range-button-group"
                                            onClick={this.handleSubmitBannerClick.bind(this)}>
                        <Button className="one-month-button" type="submit" id="month">ONE MONTH</Button>
                        <Button className="one-week-button" type="submit"  id="week">ONE WEEK</Button>     
                    </ButtonToolbar>
                </div>
                <div className="resq-disastertype">
                    <div className="disaster-type-header">DISASTER TYPE</div>            
                        <ButtonToolbar className="disaster-type-button-group"
                                            onClick={this.handleSubmitBannerClick.bind(this)}>
                            <Button className="all-button" type="submit" id="all">ALL</Button>
                            <Button className="earthquake-button" type="submit"  id="EQ">EARTHQUAKE</Button>
                            <Button className="flood-button" type="submit" id="FL" >FLOOD</Button>
                            <Button className="storm-button" type="submit" id="TC">STORM</Button>
                            <Button className="humanitarian-button" type="submit" id="HU">HUMANITARIAN</Button>        
                        </ButtonToolbar>
                </div>   
            </div>  
        )
    }

    render() 
    {
        console.log("&&&&&&&&&&render RESQHOME"); 
        return(
            <div id="ResqHomeParentDiv" className="resq-new-window">  
                {this.renderBanner()}
                <div id="ResqHomeDiv" className="resq-wrapper" > 
                  
                  <DisasterTypeMap 
                                    key={this.state.requirementKey}
                                    DisasterTypeFilter ={this.state.sDisasterTypeFilter}
                                    buttonClick = {this.state.sButtonClickFlag}
                                    />
                </div> 
            </div>      
        );  
    }//render 
}//class
    