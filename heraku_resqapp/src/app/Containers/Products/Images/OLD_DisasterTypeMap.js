import React, { Component } from 'react';
import { loadModules } from 'esri-loader';
// import { ArcView } from 'react-arcgis/dist/esm/components/ArcBase';
 import { AffectedAreaMap } from './AffectedAreaMap';
// import { esriPromise } from 'react-arcgis';
import {ButtonToolbar, Button } from 'react-bootstrap';
import "./AffectedAreaMap.css";

const options = {
    url: 'https://js.arcgis.com/4.8/'
    //url: 'https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2'
    //url: 'https://www.arcgis.com/apps/Embed/index.html'
};
var flag = false;
var l_latitude = '';
var l_longitude = '';    
const styles =  {
    container: {
        height: '100%',
        width: '120%'
    },
    mapDiv: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '100%'
    },
}

export class DisasterTypeMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'loading',
            glongitude: '',
            glatitude: '',
            flag: false 
        }
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.glongitude!==this.props.glongitude){
    //       let {glongitude}=this.state;
    //       let {glatitude}=this.state;
    //       glongitude.off("value"); //Turn off the connection to previous path.
    //       glatitude.off("value");

    //       glongitude=ref(nextProps.glongitude);
    //       glatitude=ref(nextProps.glatitude);
    //       this.setState({glongitude, glongitude :nextProps.glongitude });
    //       this.setState({glatitude, glatitude :nextProps.glatitude });
          
    //     }
    //   }   
    componentDidUpdate(prevProps,nextProps){
        console.log("entering componentDidUpdate DISASTERTYPEMAP");
        //var this.state.l_latitude, this.state.l_longitude;
        loadModules([   'esri/Map', 
                        'esri/views/MapView',
                        "esri/WebMap",
                        "esri/Graphic",
                        "esri/geometry",
                        "dojo/on",
                        "esri/layers/FeatureLayer"], 
                        options)
        .then(([    Map, 
                    MapView, 
                    on,
                    FeatureLayer]) => {
     
                var url = "https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2";
                var featureLayer = new FeatureLayer({
                    url: url
                });
                const map = new Map({ 
                    basemap:  "dark-gray"
                    ,spacialReference: featureLayer.spacialReference
                });
                // var webmap = new WebMap({
                //     //url:'https://www.arcgis.com/apps/Embed/index.html?',
                //     portalItem: {
                //       id: "de6c0622b7944b48a3a80c997d6835f2"
                //     }
                //   });
                 // Create the Constrains
                 const constraints = new Object({
                    minScale: 500000,  // User cannot zoom out beyond a scale of 1:500,000
                    maxScale: 0,  // User can overzoom tiles
                    snapToZoom: true,
                });
    
                // Create the MapView
                const view = new MapView({
                    container: "viewDiv",
                    map: map,
                    zoom: 3,
                    center: {
                        x: 38.9637,
                        y: 35.2433
                    }
                    ,spacialReference: featureLayer.spacialReference
                });
                
                
                //view.ui.remove("zoom");
                var mapcolor = "";
                this.props.disasterData.map(itemDisaster => 
                {
                    
                    if(itemDisaster.disasterType === 'EQ'){
                        mapcolor = "#ffc802";        
                    }
                    else if(itemDisaster.disasterType === 'FL'){ 
                        mapcolor = "#012cff";                  
                    }
                    else if( itemDisaster.disasterType === 'TC' ){ 
                        mapcolor = "#f74100";
                    } 
                    else if(itemDisaster.disasterType ==='HU'){
                        mapcolor = "#03b52f"; 
                    } 

                    if(this.props.disasterType ==='all' || this.props.disasterType === itemDisaster.disasterType)
                    {
                        this.state.glatitude = Number(itemDisaster.geoPoints.lat);
                        this.state.glongitude = Number(itemDisaster.geoPoints.lon);
                        // console.log( parseInt(itemDisaster.geoPoints.lon, 2));
                        view.graphics.add({
                            symbol: {
                                    type: "simple-marker",
                                    style: "circle",
                                    color: mapcolor,
                                    text: "\ue61d", // esri-icon-map-pin
                                    font: {
                                        size: 15,
                                        family: "CalciteWebCoreIcons"
                                    }       
                            },
                            geometry: {
                                    type: "point",
                                    longitude: Number(itemDisaster.geoPoints.lon),
                                    latitude: Number(itemDisaster.geoPoints.lat)
                            }
                        });  
                    } // if
                }); // disasterData.map 
                view.on("immediate-click", function(event) {    
                    view.hitTest(event).then(function (response) {
                        //console.log(response);
                        
                        l_longitude = Number(response.screenPoint.mapPoint.longitude);
                        l_latitude = Number(response.screenPoint.mapPoint.latitude);
                        console.log("&&&&");
                        
                        var opts = {
                            duration: 2000, 
                            easing: "linear "  // Duration of animation will be 5 seconds
                        };
                    
                        view.goTo({
                            zoom: view.zoom + 3,
                            center: [l_longitude,
                                     l_latitude]
                        },opts); 
                        // view.popup.open({
                            
                        //     title: "title",
                        //     location: event.mapPoint // Set the location of the popup to the clicked location
                        //   });
                        //   view.popup.action.push(fullDetail)
                        //   view.popup.on("trigger-action", function(event){
                        //     if(event.action.id === "zoom-out"){
                        //         console.log("print nothing");
                                
                        //       }
                        //     });
                
                        // console.log(l_longitude);
                        // // console.log( parseInt(this.state.l_longitude, 2));
                        // console.log(l_latitude);
                        // console.log(itemDisaster.geoPoints.lon);
                        // console.log(itemDisaster.geoPoints.lat);
                        
                       // flag=true;
                    });
                    console.log(" after view.hitTest on DISASTERTYPEMAP"); 
                    // if(prevProps.glongitude!==this.props.glongitude &&
                    //     prevProps.glatitude!==this.props.glatitude){
                    //     //Perform some operation here
                    //     this.setState({glongitude: l_longitude});
                    //     this.setState({glatitude: l_latitude});
                    //     console.log(this.state.glongitude);
                    //     console.log(this.state.glatitude);
                    //     console.log("********");
                    // }
                    // nextProps.glongitude = l_longitude;
                    // nextProps.glatitude = l_latitude;
                    // console.log(nextProps.glongitude); 
                    // console.log(nextProps.glatitude); 
                     
                        // this.props.disasterData.map(itemDisaster => 
                        //     {
                        //         console.log(" disasterData on DISASTERTYPEMAP"); 
                        //         if(itemDisaster.geoPoints.lat === this.state.l_latitude &&
                        //             itemDisaster.geoPoints.lon === this.state.l_longitude){
                        //                 setState({
                        //                     glongitude: this.state.l_longitude,
                        //                     glatitude: this.state.l_latitude,
                        //                     flag: true
                        //                 })
                        //             }
                        //     });
                        //     console.log(this.state.glongitude);
                    
                }); //view.on
                console.log("after view.on DISASTERTYPEMAP"); 
                
            }); //then
            console.log("leaving componentDidUpdate DISASTERTYPEMAP");         
    }//componentDidMount
    
    // componentWillUpdate() {
    //     console.log("i am in componentWillUpdate");
    //     // this.handleMapClick();
    //     // console.log("handleMapClick");
    //     this.setState({
    //         glongitude: l_longitude,
    //         glatitude: l_latitude,
    //     })
    //     console.log("FINALLY");
    //     console.log(this.state.glongitude);
    //     console.log(this.state.glatitude);
    //     return true;
        
    // }
    handleMapClick(){
        console.log("handleMapClick");
        this.setState({
            glongitude: l_longitude,
            glatitude: l_latitude,
        })
        console.log("FINALLY");
        console.log(this.state.glongitude);
        console.log(this.state.glatitude);
       
        //this.setState({glongitude: this.state.l_longitude, glatitude: this.state.l_latitude});   
    }
    renderMap() {   
        console.log("rendermap DISASTERTYPEMAP"); 
        if(this.state.status === 'loading') {
            return <div>loading</div>;
        }
    }//renderMap

    render() {
        console.log(" render in DISASTERTYPEMAP");
        if(flag===true)
        {
          <AffectedAreaMap glatitude = {this.state.glatitude} glongitude= {this.state.glongitude}/>
        }
        else
        {   
            return(
            <div style={styles.container}>
              <div id='viewDiv' style={ styles.mapDiv } >
                {this.renderMap()}
              </div>      
            </div>
          )  
        }
      
    }//render
}//class

export default DisasterTypeMap;