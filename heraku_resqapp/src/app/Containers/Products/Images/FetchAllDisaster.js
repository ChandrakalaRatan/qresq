import React, { Component } from 'react';
import {DisasterTypeMap} from "./DisasterTypeMap";

export class FetchAllDisaster extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
        disasterData: []
      }
    }
    
    componentDidMount() {
        this.getDisaster()
    }
    
    getDisaster = () => {
        const endPoint = "http://185.178.86.165:8080/api/qresq/search"
        //fetch(endPoint)

        fetch(endPoint,{
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({size: 2000, indexName: 'gdacs_alerts'})
    
         })
        .then(response => response.json()) 
        .then(json => {
            this.setState(
            {
                disasterData: json.results
            }
            )  
            // console.log(JSON.stringify(json));
            // console.log(JSON.stringify(json.results));
        })
        .catch(error =>{
          console.log("ERROR" + error);     
        })
        console.log("i am in fetchalldisaster file 99");
        console.log(this.props.disasterInputArray);
        
        
    }
    render(){
        return(
            <DisasterTypeMap disasterData={this.state.disasterData} 
                   disasterInputArray={this.props.disasterInputArray}/>
        )
    }
     
}

