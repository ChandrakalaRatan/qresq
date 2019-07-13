import React, { Component, Fragment } from 'react';
import {ButtonToolbar, Button } from 'react-bootstrap';
import {GoogleCrisisMap} from './GoogleCrisisMap';
import {SocialMediaSector} from './SocialMediaSector';
import { DetailDisasterSummary } from './DetailDisasterSummary';

import {TwitterGoogleHeatMap} from './TwitterGoogleHeatMap';
import {TwitterChoroplethHeatMap} from './TwitterChoroplethHeatMap';
import {TwitterArcGisHeatMap} from "./TwitterArcGisHeatMap";

import "./AffectedAreaMap.css";
import "./GoogleCrisisMap.css";


const options = {
    url: 'https://js.arcgis.com/4.8/'
};
const styles =  {
    AffectedMapContainer: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent'
    },
    AffectedMapDiv: {
        margin: 0,
        padding: 0,
        overflow: 'scroll',
        marginLeft:'16.5%',
        height: '100%',
        width: '67%'
    }, 
    DetailDisasterView: {
        margin: 0,
        padding: 0,
        marginLeft: 0,
        height: '100%',
        width: '20%', 
        backgroundColor: 'black'
    },
    SocialMediaView:{
        margin: 0,
        padding: 0,
        marginLeft: '50%',
        height: '100%',
        width: '20%', 
        backgroundColor: 'green'
    },
    ChoroplethHeatmapcontainer: {
      padding: 0,
      margin: 0,
      width: '100%',
      height: '100%',
      position: 'relative' 
  }
}
var heatMapData =[];
var loclatitude =0;
var loclongitude =0;
var locWeight = 0;
export class AffectedAreaMap extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'news',
            sGoogleCrisisMapFlag: false,
            sSocialMediaFlag: false,
            sSatelliteImageFlag: false,
            sDetailDisasterReportData: [],
            sDetailDisasterReportDataflag: false,
            sTwitterHeatMapFlag: false,
            sNewsHeatMapFlag: true
        }
    }
    // componentWillUnmount(){
    //     console.log("%%%%%%%%%%%i am in componentWillUnmount in AFFECTEDAREAMAP");
    //     ReactDOM.unmountComponentAtNode(document.getElementById('DetailDisasterDiv')); 
    // }
    componentDidMount() 
    {  
        console.log("%%%%%%%%%%%entering componentDidMount AFFECTEDAREAMAP");
        this.fetchDetailDisasterReport();
        this.fetchTwitterHeatMapData();
        document.getElementById("twitter").checked=true;
    }
    fetchDetailDisasterReport() 
    {  
        console.log("%%%%%%%%%%%  THIS.PROPS.LATITUDE AND THIS.PROS.LONGITUDE ",this.props.latitude,this.props.longitude,this.props.SingleDisasterDataRecord.disasterType);
        const endPoint = "http://167.86.104.221:8050/api/qresq/search";
        fetch(endPoint,{
            headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        exactMatch : true,
                        filters: [
                                    {
                                        fieldName: "disasterType",
                                        value: "TC"
                                        //value: this.props.SingleDisasterDataRecord.disasterType
                                    },
                                    {
                                        distance : "100",
                                        fieldName: "geolocation",
                                        type : "GEO_DISTANCE",
                                        value: "19.8, 85.82"
                                        //value: this.props.latitude+","+this.props.longitude,
                                    }
                        ],
                        from: 0,
                        indexName: "test_summary",
                        size: 30 
                    })
                })
                .then(response => response.json()) 
                .then(json => {
                    var array=[];
                    var index = 0;
                    Object.keys(json.results[0].summary).map(key => ( 
                        array.push({
                          index: index++,
                          date: key,
                          content: json.results[0].summary[key]
                        })
                    ));
                    //array.push(json.results[0].summary);
                    //console.log("((((((((((((((((",carouselSlidesData);
                    console.log("((((((((((((((((",array);
                    this.setState({
                        //sDetailDisasterReportData: json.results[0].summary,
                        sDetailDisasterReportData: array,
                        sDetailDisasterReportDataflag: true
                    }) 
                })
                .catch(error =>{
                console.log("ERROR" + error);     
                })                
    }

    fetchTwitterHeatMapData() 
    {  
        console.log("entering tweetsByLatLonFetch TwitterHeatMap");
        const endPoint =   "http://167.86.104.221:8050/api/dasboard/groupByLocation?index=twitter_social_1&eventId="
                            // +this.props.SingleDisasterDataRecord.qresqid";
                            +"999";
            fetch(endPoint,{
                headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "GET"
                })
                .then(response => response.json()) 
                .then(json => {
                    console.log("tweetsByLatLonFetch",json.results);
                    this.setState({
                        heatMapData:json.results
                    })
                })
                .catch(error =>{
                    console.log("ERROR" + error);     
                })
                console.log("leaving tweetsByLatLonFetch TwitterHeatMap");              
    }

    componentDidUpdate(){
      //document.getElementById("twitter").checked=true;
      var divName = document.getElementById('choroplethmap');
      //TwitterChoroplethHeatMap(divName)     
    }

    renderMap() {    
        if(this.state.status === 'loading') {
            return <div>loading</div>;
        }
    }//renderMap
    renderRadioButton()
    {
        return(
            <div id="radioBtnDiv" className="panel-radio-button">
           
              <label className="radio-label">
              <input  type="radio" 
                      id="news" 
                      className="radio-button" 
                      name="radio" 
                      value="news" 
                      // onClick={this.radioButtonClickHandle.bind(this)} 
                      onChange={this.radioButtonClickHandle.bind(this)}
              />NEWS</label><br/><br/>
              <label className="radio-label">
              <input  type="radio" 
                      id="twitter" 
                      className="radio-button" 
                      name="radio" 
                      value="twitter" 
                      onChange={this.radioButtonClickHandle.bind(this)}
              />TWITTER</label><br/><br/>
              <label className="radio-label">
              <input  type="radio" 
                        id="googlecrisismap"
                        className="radio-button" 
                        name="radio" 
                        value="googlecrisismap" 
                        onChange={this.radioButtonClickHandle.bind(this)}
              />GOOGLE CRISIS MAP</label><br/>
                
            </div>   
        )
    }
    radioButtonClickHandle(e){
        this.setState({
                        sGoogleCrisisMapFlag: false,
                        sTwitterHeatMapFlag: false,
                        sNewsHeatMapFlag: false
                  
        });
        console.log("^^^^^^^^^^^^^^^^^ e.target.value",e.target.value);
        this.setState({
          selectedOption: e.target.value
        });
        if(e.target.value === 'googlecrisismap')
        {
          this.setState({sGoogleCrisisMapFlag: true }); 
          document.getElementById("googlecrisismap").checked=true;
        }
        if(e.target.value === 'twitter')
        {
          this.setState({sTwitterHeatMapFlag: true }); 
          document.getElementById("twitter").checked=true;
        }
        if(e.target.value === 'news')
        {
          this.setState({sNewsHeatMapFlag: true }); 
          document.getElementById("news").checked=true;
        }
    }
  
    renderButton()
    {
        return(
            <div id="btnDiv" className="panel-summery-button">
                <ButtonToolbar className="summary-button-group"
                                    onClick={this.handleSubmitButtonClick.bind(this)}>
                    <Button className="social_media_button" type="submit" id="socialmedia">SOCIAL MEDIA ANALYSIS</Button> 
                    <Button className="satellite_image_button" type="submit" id="satelliteimage">SATELLITE DATA ANALYSIS</Button>   
                </ButtonToolbar>
            </div>
        )
    }
    
    handleSubmitButtonClick(e){
        this.setState({ sDetailDisasterReportDataflag: false,
                        sSocialMediaFlag: false,
                        sSatelliteImageFlag:false
                      });
        if(e.target.id === "socialmedia")
        {
            this.setState({sSocialMediaFlag: true });  
        }
        if(e.target.id === "satelliteimage")
        {
            this.setState({sSatelliteImageFlag: true });  
        }       
    }
    render() {
        console.log("%%%%%%%%%%%render AFFECTEDAREAMAP");
        console.log("%%%%%%%%%%% this.state.sSocialMediaFlag",this.state.sSocialMediaFlag);
        console.log("%%%%%%%%%%% this.state.sSatelliteImageFlag",this.state.sSatelliteImageFlag);
        console.log("%%%%%%%%%%% this.state.sGoogleCrisisMapFlag",this.state.sGoogleCrisisMapFlag);
        console.log("%%%%%%%%%%% this.state.sDetailDisasterReportDataflag",this.state.sDetailDisasterReportDataflag);
        console.log("%%%%%%%%%%% this.state.sTwitterHeatMapFlag",this.state.sTwitterHeatMapFlag);
        console.log("%%%%%%%%%%% this.state.sNewsHeatMapFlag",this.state.sNewsHeatMapFlag);
        // console.log("%%%%%%%%%%% this.state.sDetailDisasterReportData",this.state.sDetailDisasterReportData);

        return( 
            <div  id="AffectedMapContainer" style={styles.AffectedMapContainer} > 
                <div id='AffectedMapView' style={ styles.AffectedMapDiv } >
                      {/* {this.renderMap()} */}
                      {/* <TwitterGoogleHeatMap /> */}

                      {this.state.sTwitterHeatMapFlag &&
                          <TwitterArcGisHeatMap
                              latitude={this.props.latitude} 
                              longitude={this.props.longitude}
                          />
                      }
                      {this.state.sNewsHeatMapFlag &&
                          <TwitterGoogleHeatMap/>
                        // <div  id="choroplethmap" style={styles.ChoroplethHeatmapcontainer} > 
                        // </div>
                      } 
                      { this.state.sGoogleCrisisMapFlag && 
                          <GoogleCrisisMap />           
                      }
                      {this.renderRadioButton() }
                 </div>
                 <div id='DetailDisasterView' style={ styles.DetailDisasterView } >
                    <DetailDisasterSummary 
                            //slides = {carouselSlidesData}
                            slides = {this.state.sDetailDisasterReportData}
                    />
                </div>
                <div id='SocialMediaView' style={ styles.SocialMediaView } >
                    { this.state.sSocialMediaFlag &&
                        <SocialMediaSector 
                            SingleDisasterDataRecord={this.props.SingleDisasterDataRecord}
                            latitude={this.props.latitude} 
                            longitude={this.props.longitude}
                        />               
                    } 
                </div>
                
                {this.renderButton()}
               
            </div>  
        ) //return
    }//render
}//class

export default AffectedAreaMap;




   {/* { this.state.sDetailDisasterReportDataflag &&  
                    //  <DetailDisasterReport  
                    //         //SingleDisasterDataRecord={this.props.SingleDisasterDataRecord} 
                    //         mapcolor={this.props.mapcolor}
                    //         DetailDisasterReportData={this.state.sDetailDisasterReportData}
                    // /> 
                    // render(<DetailDisasterSummary slides={carouselSlidesData} />, carouselContainer); */}