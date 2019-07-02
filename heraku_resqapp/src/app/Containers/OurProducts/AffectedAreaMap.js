import React, { Component, Fragment } from 'react';
import ReactDOM from "react-dom";
import {ButtonToolbar, Button } from 'react-bootstrap';
import { loadModules } from 'esri-loader';
import {GoogleCrisisMap} from './GoogleCrisisMap';
import {SocialMediaSector} from './SocialMediaSector';
import { DetailDisasterSummary } from './DetailDisasterSummary';
import {TwitterGoogleHeatMap} from './TwitterGoogleHeatMap';
import {DisasterMagnitudeMap} from './DisasterMagnitudeMap';


// import {TwitterHeatMap} from "./TwitterHeatMap";
import "./AffectedAreaMap.css";
import "./GoogleCrisisMap.css";

// Data for carousel
const carouselSlidesData = [
  {
    content:
      "Tomorrow, you will be released. If you are bored of brawling with thieves and want to achieve something there is a rare blue flower that grows on the eastern slopes. Pick one of these flowers. If you can carry it to the top of the mountain, you may find what you were looking for in the first place.",
    author: "Bane",
    source: "facebook"
  }, {
    content:
      "You have learn to bury your guilt with anger. I will teach you to confront it and to face the truth.",
    author: "Ra's Al Ghul",
    source: "Snapchat"
  }, {
    content:
      "Introduce a little anarchy, upset the established order and everything becomes chaos. I'm an agent of chaos. Oh, and you know the thing about chaos? It's fair.",
    author: "Joker",
    source: "facebook"
  }, {
    content:
      "I can't do that as Bruce Wayne... as a man. I'm flesh and blood. I can be ignored, destroyed. But as a symbol, I can be incorruptible, I can be everlasting.",
    author: "Bruce Wayne",
    source: "facebook"
  }, {
    content:
      "But it's not who you are underneath... it's what you do that defines you.",
    author: "Rachel Dawes",
    source: "twitter"
  }, {
    content:
      "When their enemies were at the gates the Romans would suspend democracy and appoint one man to protect the city. It wasn't considered an honor, it was a public service.",
    author: "John Blake",
    source: "Google+"
  }, {
    content:
      "Master Wayne, you've been gone a long time. You look very fashionable. Apart from the mud.",
    author: "Alfred Pennyworth",
    source: "twitter"
  }
];

const options = {
    url: 'https://js.arcgis.com/4.8/'
};
const styles =  {
    AffectedMapContainer: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '120%',
        backgroundColor: 'transparent'
    },
    AffectedMapDiv: {
        margin: 0,
        padding: 0,
        height: '75%',
        width: '120%'
    }
    , 
    DetailDisasterView: {
        margin: 0,
        padding: 0,
        height: '25%',
        width: '120%', 
        backgroundColor: 'transparent'
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
            sTwitterHeatMapFlag: true,
            sNewsHeatMapFlag: false,
            sMagnitudeMapFlag: false
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
                    Object.keys(json.results[0].summary).map(key => ( 
                        array.push({
                          date: key,
                          content: json.results[0].summary[key]
                        })
                    ));
                    //array.push(json.results[0].summary);
                    console.log("((((((((((((((((",carouselSlidesData);
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

    renderMagnitudeVisualizeMap()
    {

        loadModules([   'esri/Map', 
                        'esri/views/MapView',
                        "esri/layers/CSVLayer",
                        "esri/widgets/Legend",
                        "esri/renderers/HeatmapRenderer"], 
                        options)
        .then(([    Map, 
                    MapView, 
                    CSVLayer, 
                    Legend,
                    HeatmapRenderer
                ]) => {

                const url =
                  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv";
              
                const renderer = {
                  type: "heatmap",
                  colorStops: [
                    { color: "rgba(63, 40, 102, 0)", ratio: 0 },
                    { color: "#472b77", ratio: 0.083 },
                    { color: "#4e2d87", ratio: 0.166 },
                    { color: "#563098", ratio: 0.249 },
                    { color: "#5d32a8", ratio: 0.332 },
                    { color: "#6735be", ratio: 0.415 },
                    { color: "#7139d4", ratio: 0.498 },
                    { color: "#7b3ce9", ratio: 0.581 },
                    { color: "#853fff", ratio: 0.664 },
                    { color: "#a46fbf", ratio: 0.747 },
                    { color: "#c29f80", ratio: 0.83 },
                    { color: "#e0cf40", ratio: 0.913 },
                    { color: "#ffff00", ratio: 1 }
                  ],
                  maxPixelIntensity: 25,
                  minPixelIntensity: 0
                };

            
                const layer = new CSVLayer({
                  url: "/Macintosh HD⁩/Users⁩/chandra⁩/2.5_week.csv",
                  title: "Magnitude 2.5+ earthquakes from the last week",
                  renderer: renderer
                });

                const map = new Map({
                  basemap: "dark-gray",
                  layers: [layer]
                  //layers: [heatmapFeatureLayer]
                });

                const view = new MapView({
                  container: "AffectedMapView",
                  center: [-138, 30],
                  zoom: 3,
                  map: map
                });
      });
    }
    componentDidUpdate(){
        //this.renderMagnitudeVisualizeMap()
        // console.log("%%%%%%%%%%%entering componentDidUpdate AFFECTEDAREAMAP");
        // loadModules([   'esri/Map', 
        //                 'esri/views/MapView',
        //                 "esri/WebMap",
        //                 "esri/Graphic",
        //                 "esri/geometry",
        //                 "esri/layers/CSVLayer",
        //                 "esri/widgets/Legend",
        //                 "esri/layers/FeatureLayer"], 
        //                 options)
        // .then(([    Map, 
        //             MapView, 
        //             FeatureLayer,
        //             CSVLayer,  
        //             Legend]) => {

        //     var url = "https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2";
        //     var featureLayer = new FeatureLayer({
        //         url: url
        //     });
        //     const map = new Map({ 
        //         basemap:  "dark-gray"
        //         ,spacialReference: featureLayer.spacialReference
        //     });
            
                
        //     // Create the MapView
        //     const view = new MapView({
        //         container: "AffectedMapView",
        //         map: map,
        //         zoom: 6,
        //         center: [this.props.longitude, this.props.latitude]
        //         ,spacialReference: featureLayer.spacialReference
        //     });
        //     view.graphics.add({
        //         symbol: {
        //             type: "simple-marker",
        //             style: "circle",
        //             color: this.props.mapcolor,
        //             text: "\ue61d", // esri-icon-map-pin
        //             font: {
        //                 size: 15,
        //                 family: "CalciteWebCoreIcons"
        //             }       
        //         },
        //         geometry: {
        //             type: "point",
        //             longitude: this.props.longitude,
        //             latitude: this.props.latitude
        //         }
        //     });       
        // });     
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
                 {/* <form onSubmit={this.handleFormSubmit.bind(this)}> */}
                 {/* <form> */}
                    <div className="radio-button-div">
                        <label className="radio-label">
                            <input  type="radio" 
                                    id="news" 
                                    className="radio-button" 
                                    //name="news" 
                                    name="radio" 
                                    value="news" 
                                   // onClick={this.radioButtonClickHandle.bind(this)} 
                                    onChange={this.radioButtonClickHandle.bind(this)}
                                    checked={this.state.selectedOption === 'news'}/>
                            News
                        </label>
                    </div>
                    <div className="radio-button-div">
                        <label className="radio-label">
                            <input  type="radio" 
                                    id="twitter" 
                                    className="radio-button" 
                                    //name="twitter" 
                                    name="radio" 
                                    value="twitter" 
                                   // onClick={this.radioButtonClickHandle.bind(this)}
                                    onChange={this.radioButtonClickHandle.bind(this)}
                                    checked={this.state.selectedOption === 'twitter'}
                                    checked/>
                            Twitter
                        </label>
                    </div>
                    <div className="radio-button-div">
                        <label className="radio-label">
                            <input  type="radio" 
                                    id="magnitude" 
                                    className="radio-button" 
                                    //name="magnitude" 
                                    name="radio" 
                                    value="magnitude" 
                                   // onClick={this.radioButtonClickHandle.bind(this)}
                                    onChange={this.radioButtonClickHandle.bind(this)}
                                    checked={this.state.selectedOption === 'magnitude'}/>
                            Magnitude
                        </label>
                    </div>
                    {/* <div className="radio-button-div">
                        <label className="radio-label">
                            <input  type="radio" 
                                    id="vulnerability" 
                                    className="radio-button" 
                                    //name="vulnerability" 
                                    name="radio" 
                                    value="vulnerability" 
                                    onChange={this.radioButtonClickHandle.bind(this)}
                                    checked={this.state.selectedOption === 'vulnerability'}/>
                            Vulnerability
                        </label >
                    </div> */}
                    <div className="radio-button-div">
                        <label className="radio-label">
                            <input  type="radio" 
                                    id="googlecrisismap"
                                    className="radio-button" 
                                    //name="intensity" 
                                    name="radio" 
                                    value="googlecrisismap" 
                                    //onClick={this.radioButtonClickHandle.bind(this)}
                                    onChange={this.radioButtonClickHandle.bind(this)}
                                    checked={this.state.selectedOption === 'googlecrisismap'}/>
                            Google Crisis Map 
                        </label>
                    </div>
                {/* </form> */}
            </div>
            
        )
    }
    radioButtonClickHandle(e){
        this.setState({
                        sGoogleCrisisMapFlag: false,
                        sTwitterHeatMapFlag: false,
                        sNewsHeatMapFlag: false,
                        sMagnitudeMapFlag: false
        });
        console.log("^^^^^^^^^^^^^^^^^ e.target.value",e.target.value);
        this.setState({
          selectedOption: e.target.value
        });
        if(e.target.value === 'googlecrisismap')
        {
          this.setState({sGoogleCrisisMapFlag: true }); 
        }
        if(e.target.value === 'twitter')
        {
          this.setState({sTwitterHeatMapFlag: true }); 
        }
        if(e.target.value === 'news')
        {
          this.setState({sNewsHeatMapFlag: true }); 
        }
        if(e.target.value === 'magnitude')
        {
          this.setState({sMagnitudeMapFlag: true }); 
        }
    }
  
    renderButton()
    {
        return(
            <div id="btnDiv" className="panel-summery-button">
                <ButtonToolbar className="summary-button-group"
                                    onClick={this.handleSubmitButtonClick.bind(this)}>
                    {/* <Button className="full-summary-button" type="submit" id="fullsummary">GOOGLE CRISIS MAP</Button> */}
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
        console.log("%%%%%%%%%%% this.state.sMagnitudeMapFlag",this.state.sMagnitudeMapFlag);
        console.log("%%%%%%%%%%% this.state.sNewsHeatMapFlag",this.state.sNewsHeatMapFlag);
        // console.log("%%%%%%%%%%% this.state.sDetailDisasterReportData",this.state.sDetailDisasterReportData);

        return( 
            <div  id="AffectedMapContainer" style={styles.AffectedMapContainer} > 
                <div id='AffectedMapView' style={ styles.AffectedMapDiv } >
                    {/* {this.renderMap()} */}
                {/* <TwitterGoogleHeatMap /> */}

                {this.state.sTwitterHeatMapFlag &&
                    <TwitterGoogleHeatMap/>
                }
                {this.state.sNewsHeatMapFlag &&
                    <TwitterGoogleHeatMap/>
                }
                {this.state.sMagnitudeMapFlag &&
                    // <DisasterMagnitudeMap  DisasterDataArray={this.props.DisasterDataArray}/>
                    <DisasterMagnitudeMap SingleDisasterDataRecord={this.props.SingleDisasterDataRecord}
                                          latitude={this.props.latitude} 
                                          longitude={this.props.longitude}
                                          mapcolor={this.props.mapcolor}/>
                }  
                { this.state.sGoogleCrisisMapFlag && 
                    <GoogleCrisisMap />           
                }

                 </div>
                { this.state.sSocialMediaFlag &&
                    <SocialMediaSector 
                        SingleDisasterDataRecord={this.props.SingleDisasterDataRecord}
                        latitude={this.props.latitude} 
                        longitude={this.props.longitude}
                        mapcolor={this.props.mapcolor}/>               
                } 
               <div id='DetailDisasterView' style={ styles.AffectedMapDiv } >
                {/* { this.state.sDetailDisasterReportDataflag &&  
                    //  <DetailDisasterReport  
                    //         //SingleDisasterDataRecord={this.props.SingleDisasterDataRecord} 
                    //         mapcolor={this.props.mapcolor}
                    //         DetailDisasterReportData={this.state.sDetailDisasterReportData}
                    // /> 
                    // render(<DetailDisasterSummary slides={carouselSlidesData} />, carouselContainer); */}
                    <DetailDisasterSummary 
                            mapcolor = {this.props.mapcolor}
                            //slides = {carouselSlidesData}
                            slides = {this.state.sDetailDisasterReportData}
                             />
                    
                }
                </div>
              
                {(!this.state.sSocialMediaFlag ||
                  !this.state.sSatelliteImageFlag )&&
                    this.renderRadioButton()
                }
                {this.renderButton()}
               
            </div>  
        ) //return
    }//render
}//class

export default AffectedAreaMap;