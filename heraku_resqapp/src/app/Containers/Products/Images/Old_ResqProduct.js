import React from "react";
import {ButtonToolbar, Button } from 'react-bootstrap';
import {Input} from 'reactstrap';
// import {BaseMap} from "./BaseMap";
// import {GoogleMap} from "./GoogleMap";
// import { WebMap } from "./WebMap";


import './ResqProduct.css';

//import { MyMap } from "./MyMap";
import { DisasterTypes } from "./DisasterTypes";
// import { ResqMap } from "./ResqMap";
export class ResqProduct extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            location: '',
            disastertype: '',
            isDataProvided: false,
            disasterTypes = []
          };
    }  
    
    handleMonthButtonClick(e) {
        this.setState({month: e.target.id});
    }
    handleEndDateChange(e) {
        this.setState({endDate: e.target.selected});  
    }
    handleLocationChange(e){
        this.setState({location: e.target.value});
    } 
    handleButtonClick(e){
        this.setState({disastertype: e.target.id});   
    }
    handleSubmit(e){
        this.setState({isDataProvided: true});
    }
  render() {
    // if(this.state.isDataProvided === true )
    // {
    //   return (
    //     <div className="resq-product-wrapper ">    
    //         <SimpleMap  buttonName={this.state.buttonName} 
    //                     location={this.state.location}
    //                     startDate={this.state.startDate}
    //                     endDate={this.state.endDate}/>
    //    </div>)
    // }
  
    return(
        <div className="resq-product-new-window">
            <div className="resq-product-banner">
            <form onSubmit={this.handleSubmit.bind(this)}>
                 <div className="resq-product-logo"> resq</div>
              
                    <div className="resq-product__daterange"> 
                        <label className="date-range-header">DATE RANGE</label>
                        <div className="date-input-group">
                        <ButtonToolbar className="disaster-button-group"
                                onClick={this.handleDateRangeButtonClick.bind(this)}>
                            <Button className="One-Month" type="submit" id="month">One Month</Button>
                            <Button className="One-Week" type="submit"  id="week">One Week</Button>     
                        </ButtonToolbar>
                            
                            {/* <Input
                                className="input" 
                                type="date"
                                name="date"
                                id="startDate"
                                placeholder="date placeholder"
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange.bind(this)}
                            /> */}
                       
                            <label className="to-date" >To</label>
                            <Button className="One-Week" type="submit" id="week">ALL</Button>
                            {/* <Input
                                className="input" 
                                type="date"
                                name="date"
                                id="endDate"
                                placeholder=" "
                                selected={this.state.endDate}
                                onChange={this.handleEndDateChange.bind(this)}
                            /> */}
                        </div>
                    </div>
                
                    <div className="resq-product__location">
                       
                        <label className="location-header">LOCATION</label>
                        
                        <div className="enter-location-group">
                            <label className="enter-location">Enter a location</label>
                            <input className="input" type="text"  
                                    name="location"
                                    onChange={this.handleLocationChange.bind(this)}
                                    value={this.state.location}
                            />
                        </div>
                    </div>  
                
                 <div className="resq-product__disastertype">
                    <label className="disaster-type-header">DISASTER TYPE</label>            
                        <ButtonToolbar className="disaster-type-button-group"
                        onClick={this.handleButtonClick.bind(this)}>
                            <Button className="all-button" type="submit" id="all">ALL</Button>
                            <Button className="earthquake-button" type="submit"  id="EQ">EARTHQUAKE</Button>
                            <Button className="flood-button" type="submit" id="FL" >FLOOD</Button>
                            <Button className="storm-button" type="submit" id="TC">STORM</Button>
                            <Button className="humanitarian-button" type="submit" id="humanitarian">HUMANITARIAN</Button>        
                        </ButtonToolbar>
                </div>     
                </form> 
            </div>
            
            <div className="resq-product-wrapper "> 
             {this.state.disasterTypes.push(this.state.disastertype,
                                            this.state.location,
                                            );   
               this.state.disasterTypes.push(this.state.buttonName);       
            {/* {this.state.isDataProvided === true?  <SimpleMap buttonName={this.state.buttonName} 
                                location={this.state.location}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}/> :null} */}
              {/* {this.state.isDataProvided === true? <SimpleMap/>:null}      */}

              <DisasterTypes buttonName={this.state.buttonName} 
                                location={this.state.location}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}/>
            </div>
      
        </div>
      )
    }
}
    