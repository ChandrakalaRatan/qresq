import React, { Component } from 'react';
import "./AffectedAreaMap.css";

var l_country= '';
var l_affected= '';
var l_dateOccur= '';
var l_dead= '';
var l_magnitude= '';
var l_displaced= '';
var l_missing= '';
var l_unit= '';
var l_intensity='';
var l_latitude=0;
var l_longitude=0;
var l_disasterType='';
var l_summary='';


export class DetailReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDisasterData: []
            
        }
    }

    componentDidMount() 
    {  
        console.log("entering componentDidMount DETAILREPORT");
            
                l_latitude= this.props.disasterDataRecord.geoPoints.lat;
                l_longitude= this.props.disasterDataRecord.geoPoints.lon;
                l_country = this.props.disasterDataRecord.country;
                l_magnitude = this.props.disasterDataRecord.magnitude;
                l_unit = this.props.disasterDataRecord.unit;
                l_dead = this.props.disasterDataRecord.dead;
                l_affected = this.props.disasterDataRecord.affected;
                l_displaced = this.props.disasterDataRecord.displaced;
                l_missing = this.props.disasterDataRecord.missing;
                l_dateOccur = this.props.disasterDataRecord.dateOccur;
                l_intensity = this.props.disasterDataRecord.intensity;
                l_disasterType= this.props.disasterDataRecord.disasterType;  
                console.log(this.props.disasterDataRecord);
                console.log(l_country,l_magnitude,l_unit,l_dead,l_affected,l_displaced);
                console.log(l_missing,l_dateOccur,l_intensity,l_disasterType,l_latitude,l_longitude);
        const endPoint = "http://185.178.86.165:8080/api/qresq/search";
        fetch(endPoint,{
                headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({
                            filters: [
                            {
                                fieldName: 'country',
                                value: "Bangladesh"
                            },
                            {
                                fieldName: 'disasterType',
                                value: "LS"
                            },
                            {
                                fieldName: "geolocation",
                                //value: l_latitude+l_longitude,
                                value: "23.84,90.27",
                                type : "GEO_DISTANCE",
                                distance : 10
                            }
                            ],
                            from: 0,
                            indexName: 'test_summary_1',
                            size: 10,
                            exactMatch : true
                        })
            
                })
                .then(response => response.json()) 
                .then(json => {
                    this.setState({
                        detailDisasterData: json.results
                    })  
                })
                .catch(error =>{
                console.log("ERROR" + error);     
                })
                
                    // if ( detaildisasterdata.country === l_country &&
                    //     detaildisasterdata.disasterType === l_disasterType)
                    //     {
                //             console.log("i am inside if")
                //             l_summary =detaildisasterdata.summary;
                //             console.log(l_summary)
                //         // }
                // }); 
        console.log("leaving componentDidMount DETAILREPORT");              
    }

    render(){
        console.log("i am in render of DetailReport");
        return(
                <div >
                        <div className="panel-right-side">  
                            <div className="panel-text-display">
                            <label className="panel-label-header">DATE OF REPORT</label> <br/>
                            
                            <label className="panel-label-value" >{l_dateOccur}</label><br/>
             
                            <label className="panel-label-header">SUMMARY</label> <br/>
                            {this.state.detailDisasterData.map(detaildisasterdata =>{
                                console.log(detaildisasterdata.summary);
                                
                                <div key={detaildisasterdata.id}>
                                <div className="panel-label-value">{detaildisasterdata.summary}</div><br/>
                                </div>
                            })}
                            </div>  
                        </div>
                        {/* </Animated> */}
                        {/* <div className="panel-center-side">
                        <img src="KeraLAFloodScreen_elBlue_289304.png"/>
                        </div> */}
                       
                        {/* <Animated animationIn="slideInUp" animationOut="slideOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>    */}
                        <div className="panel-left-side">
                            <div className="panel-text-display">
                            <label className="panel-label-header">DEAD</label> <br/>
                            <label className="panel-label-value">{l_dead}</label><br/>
                            <label className="panel-label-header">DEATH FROM INFECTIOUS DIESEASE</label><br/> 
                            <label className="panel-label-value">{0}</label><br/>
                            <label className="panel-label-header">DIESEASE SPREAD</label> <br/>
                            <label className="panel-label-value">{0}</label><br/>
                            <label className="panel-label-header">PEOPLE MISSING</label> <br/>
                            <label className="panel-label-value">{l_missing}</label><br/>
                            </div>
                        </div>
                        {/* </Animated> */}
                </div>
        );
    }
}