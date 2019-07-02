import React from "react";
import ReactDOM from "react-dom";
import { loadModules } from 'esri-loader';
import { AffectedAreaMap } from './AffectedAreaMap';
import fetchDisasterTypeData from "../OurTechnology/FetchAllDisasterTypeData";


//var Router = require('react-router');
// var AffectedMapView = require('./AffectedAreaMap');

// var Link = Router.Link;
// var Route = Router.Route;
// var DefaultRoute = Router.DefaultRoute;
// var RouteHandler = Router.RouteHandler;
// import { BrowserRouter } from 'react-router-dom'
// import { setMaxListeners } from "cluster";
// import { setFlagsFromString } from "v8";

const options = {
    url: 'https://js.arcgis.com/4.8/'
    //url: 'https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2'
};
var myjson = {  
    "results":[  
       {  
          "unit":"M",
          "disasterType":"EQ",
          "geoPoints":{  
             "lon":108.9812,
             "lat":-8.2361
          },
          "dateUpto":"2019-06-09T09:32Z",
          "country":"IDN",
          "eventId":1182006,
          "dateOccur":"2019-06-09T09:32Z",
          "magnitude":5.2,
          "vulnerabilityValue":1.62113293717696,
          "intensity":"Green"
       },
       {  
          "unit":"M",
          "disasterType":"EQ",
          "geoPoints":{  
             "lon":96.4219,
             "lat":37.3911
          },
          "dateUpto":"2019-06-11T13:56Z",
          "country":"CHN",
          "eventId":1182243,
          "dateOccur":"2019-06-11T13:56Z",
          "magnitude":4.5,
          "vulnerabilityValue":1.34753404409685,
          "intensity":"Green"
       },
       {  
          "unit":"M",
          "disasterType":"EQ",
          "geoPoints":{  
             "lon":146.5493,
             "lat":43.5623
          },
          "dateUpto":"2019-06-10T17:18Z",
          "country":"RUS",
          "eventId":1182153,
          "dateOccur":"2019-06-10T17:18Z",
          "magnitude":4.9,
          "vulnerabilityValue":1.3145341380124,
          "intensity":"Green"
       },
       {  
          "unit":"M",
          "disasterType":"EQ",
          "geoPoints":{  
             "lon":147.7686,
             "lat":17.4021
          },
          "dateUpto":"2019-06-10T17:14Z",
          "country":"MNP",
          "eventId":1182142,
          "dateOccur":"2019-06-10T17:14Z",
          "magnitude":5.4,
          "vulnerabilityValue":1.3145341380124,
          "intensity":"Green"
       },
       {  
          "unit":"M",
          "disasterType":"EQ",
          "geoPoints":{  
             "lon":142.1274,
             "lat":38.8615
          },
          "dateUpto":"2019-06-10T13:12Z",
          "country":"JPN",
          "eventId":1182127,
          "dateOccur":"2019-06-10T13:12Z",
          "magnitude":4.5,
          "vulnerabilityValue":1.3145341380124,
          "intensity":"Green"
       },
       {  
          "unit":"M",
          "disasterType":"EQ",
          "geoPoints":{  
             "lon":168.9595,
             "lat":54.2911
          },
          "dateUpto":"2019-06-10T09:00Z",
          "country":"RUS",
          "eventId":1182088,
          "dateOccur":"2019-06-10T09:00Z",
          "magnitude":4.8,
          "vulnerabilityValue":1.3145341380124,
          "intensity":"Green"
       },
       {  
          "unit":"M",
          "disasterType":"EQ",
          "geoPoints":{  
             "lon":-72.342,
             "lat":-39.3373
          },
          "dateUpto":"2019-06-08T13:44Z",
          "country":"CHL",
          "eventId":1181944,
          "dateOccur":"2019-06-08T13:44Z",
          "magnitude":4.7,
          "vulnerabilityValue":1.3145341380124,
          "intensity":"Green"
       },
       {  
          "unit":"M",
          "disasterType":"EQ",
          "geoPoints":{  
             "lon":80.6318,
             "lat":42.2115
          },
          "dateUpto":"2019-06-07T21:47Z",
          "country":"CHN",
          "eventId":1181883,
          "dateOccur":"2019-06-07T21:47Z",
          "magnitude":4.6,
          "vulnerabilityValue":1.34753404409685,
          "intensity":"Green"
       },
       {  
          "unit":"",
          "disasterType":"VO",
          "geoPoints":{  
             "lon":55.708,
             "lat":-21.244
          },
          "dateUpto":"2019-06-11T00:00Z",
          "country":"REU",
          "eventId":233020,
          "dateOccur":"2019-06-11T00:00Z",
          "magnitude":0,
          "vulnerabilityValue":0,
          "intensity":"Green"
       },
       {  
          "unit":"M",
          "disasterType":"EQ",
          "geoPoints":{  
             "lon":58.0204,
             "lat":9.6187
          },
          "dateUpto":"2019-06-09T17:25Z",
          "country":null,
          "eventId":1182041,
          "dateOccur":"2019-06-09T17:25Z",
          "magnitude":4.6,
          "vulnerabilityValue":1.3145341380124,
          "intensity":"Green"
       },
       {  
          "unit":"M",
          "disasterType":"EQ",
          "geoPoints":{  
             "lon":-118.4909973,
             "lat":32.8111649
          },
          "dateUpto":"2019-06-05T10:47Z",
          "country":"USA",
          "eventId":1181672,
          "dateOccur":"2019-06-05T10:47Z",
          "magnitude":4.53,
          "vulnerabilityValue":1.3145341380124,
          "intensity":"Green"
       }
   ]
}
 
var gDisasterDataArray =[];
var gLatitude = 0;
var gLongitude = 0;  
var gActionFlag = false;
var self;
var gMapcolor='';

const styles =  {
    DisasterTypeMapDiv: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '120%'
    },
}

export class DisasterTypeMap extends React.Component{
    constructor(props) {
        super(props);
        self=this;
        this.state = props;
        this.state = {
            sLongitude: 0,
            sLatitude: 0,
            sMapcolor: '',
            sIntensity:'',
            requirementKey: Math.random(),
            sAllDisasterTypeData: [],
            sAllDisasterTypeDataFlag: false,
            sSingleDisasterTypeDataRecord: {}  
          };
          
    }  
  
    componentDidMount() {
        console.log("@@@@@@@@@@ entering componentDidMount DISASTERTYPE"); 
            this.fetchAllDisasterTypeData("COMPONENT DID MOUNT")   
            //this.componentDidUpdate();
    } 
    
    fetchAllDisasterTypeData(varstr) { 
        console.log("@@@@@@@@@@ entering fetchAllDisasterTypeData DISASTERTYPE"); 
        console.log("@@@@@@@@@@this.props.DisasterTypeFilter ",this.props.DisasterTypeFilter );
        const lEndPoint = "http://167.86.104.221:8050/api/qresq/search";
            try 
            {
                fetch(lEndPoint,{
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            },
                            method: "POST",
                            body: JSON.stringify({size: 2000, indexName: 'test_alert'
                            ,filters: this.props.DisasterTypeFilter  
                        })
            
                })
                .then(response => response.json()) 
                .then(json => {
                    this.setState({
                        sAllDisasterTypeData: json.results,
                        sAllDisasterTypeDataFlag: true
                    })  
                    console.log("@@@@@@@@@@ I am in fetchAllDisasterTypeData in DISASTERTYPE",
                                    JSON.stringify(json));
                    this.setState({  //sAllDisasterTypeData: myjson.results,
                                        requirementKey: Math.random() });
                      
                    if(this.state.sAllDisasterTypeDataFlag)
                    {
                        gDisasterDataArray = this.state.sAllDisasterTypeData;
                    }
                })
                .catch(error =>{
                  console.log("ERROR" + error);     
                })
          
            } 
            catch (error) {
                console.log(error);
            }

         
            
            
    }

    componentDidUpdate(){
        console.log("@@@@@@@@@@ entering componentDidUpdate DISASTERTYPE"); 
        loadModules([   'esri/Map', 
                                'esri/views/MapView',
                                "esri/WebMap",
                                "esri/Graphic",
                                "esri/geometry",
                                "dojo/on",
                                "esri/layers/FeatureLayer"], 
                                options)
        .then(([Map, 
                MapView,
                FeatureLayer]) => {
            
        var lURL = "https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2";
        
        var featureLayer = new FeatureLayer({
                            url: lURL
        });
        
        const map = new Map({ 
            //basemap:  "dark-gray"
            basemap: "dark-gray-vector"
            ,spacialReference: featureLayer.spacialReference
        });
        
        // Create the MapView
        const view = new MapView({
            container: "DisasterTypeView",
            map: map,
            zoom: 2,
            center: {
                x: 38.9637,
                y: 35.2433
            },
            spacialReference: featureLayer.spacialReference,
        });
        
        
        //Plot the markers on the map
        gDisasterDataArray.map(itemDisaster => 
        {
            var locURL='http://localhost:8080/Images/';    
            
            if(itemDisaster.intensity === 'Green'){
                if(itemDisaster.disasterType === 'EQ'){
                    locURL= locURL + "green-earthquake.png";  
                }
                else if(itemDisaster.disasterType === 'FL'){
                    locURL= locURL + "green-flood.png";
                }
                else if(itemDisaster.disasterType === 'TC'){
                    locURL= locURL + "green-storm.png";
                }
                else if(itemDisaster.disasterType === 'HU'){
                    locURL= locURL + "green-humanitarian.png";
                }      
            }
            else if(itemDisaster.intensity === 'Red'){ 
                if(itemDisaster.disasterType === 'EQ'){
                    locURL= locURL + "red-earth.png";  
                }
                else if(itemDisaster.disasterType === 'FL'){
                    locURL= locURL + "red-flood.png";
                }
                else if(itemDisaster.disasterType === 'TC'){
                    locURL= locURL + "red-storm.png";
                }
                else if(itemDisaster.disasterType === 'HU'){
                    locURL= locURL + "rhumanitarian-red.png";   
                }               
            }
            else if( itemDisaster.intensity === 'Orange' ){ 
                if(itemDisaster.disasterType === 'EQ'){
                    locURL= locURL + "orange-earth.png"; 
                }
                else if(itemDisaster.disasterType === 'FL'){
                    locURL= locURL + "orange-flood.png"; 
                }
                else if(itemDisaster.disasterType === 'TC') {
                    locURL= locURL + "orange-storm.png";   
                }
                else if(itemDisaster.disasterType === 'HU'){
                    locURL= locURL + "orange-humanitarian.png";  
                }
            } 
            
            
            view.graphics.add({
                    symbol: {
                        type: "picture-marker",  
                        url: locURL,
                        width: "24px",
                        height: "24px"
                    },
                    geometry: {
                        type: "point",
                        longitude: Number(itemDisaster.geolocation.lon),
                        latitude: Number(itemDisaster.geolocation.lat)
                    }    
            }); //view.graphics.add   
        }); // gDisasterDataArray.map 
      
        
        var popUpTemplate = {};
        var lDiasterName = '';
        //view.popup.autoOpenEnabled = false;
        

        //Onclick on the marker find the coordinates
        view.on("immediate-click", function (event) {   
            view.hitTest(event).then( function(response) {
                
                gActionFlag = true;
                gLongitude = Number(response.screenPoint.mapPoint.longitude);
                gLatitude = Number(response.screenPoint.mapPoint.latitude);
                console.log("@@@@@@@@@@screen point","gLongitude: ",gLongitude,"gLatitude: ",gLatitude );
               
                var plon = Number(gLongitude);
                var plat = Number(gLatitude);
                plon = Math.round(plon * 100) / 100
                plat = Math.round(plat * 100) / 100
                var pr = 1;
                var llat,llon;
                           
                //find the closest latitude and longitude check to find which marker is clicked
                gDisasterDataArray.map(itemDisaster => 
                {
                    llat = Number(itemDisaster.geolocation.lat);
                    llon = Number(itemDisaster.geolocation.lon)
                    var xlon = plon - llon;
                    var xlat = plat - llat;
                    if (((xlon*xlon) + (xlat*xlat))<(pr*pr)) 
                    {     
                        if(itemDisaster.disasterType === 'EQ'){
                            lDiasterName = "Earth Quake";
                            self.state.sMapcolor = "#ffc802";       
                        }else if(itemDisaster.disasterType === 'FL'){ 
                            lDiasterName = "Flood";
                            self.state.sMapcolor = "#012cff";                   
                        }else if( itemDisaster.disasterType === 'TC' ){ 
                            lDiasterName = "Cyclone and Storm";
                            self.state.sMapcolor = "#f74100";    
                        }else if(itemDisaster.disasterType ==='HU'){
                            lDiasterName = "Humanitarian";
                            self.state.sMapcolor = "#03b52f";    
                        } 
                        
                        popUpTemplate = {
                             title: lDiasterName +" in " + itemDisaster.country,
                             content: "<b>Disaster Name:</b>"+ itemDisaster.eventName+"<br>"+
                            "<b>magnitude:</b> "+ itemDisaster.magnitude +" "+ itemDisaster.unit+"<br>"+
                            "<b>Date of Occur:</b>"+ itemDisaster.dateOccur+"<br>"+
                            "<b>Geolocation:</b>"+itemDisaster.geolocation.lat + " " + itemDisaster.geolocation.lon+"</br>",
                            location: [itemDisaster.geolocation.lat, itemDisaster.geolocation.lon]
                        };                   
                        self.state.sSingleDisasterTypeDataRecord = itemDisaster;
                        self.state.sLongitude = Number(itemDisaster.geolocation.lon);
                        self.state.sLatitude = Number(itemDisaster.geolocation.lat);  
                        console.log("@@@@@@@@@@ after the finding the closest to screen points","self.state.sLongitude: ",self.state.sLongitude,"self.state.sLatitude: ",self.state.sLatitude );
                    }//if
                });  //map


                if(self.state.sSingleDisasterTypeDataRecord.intensity !== 'Green')
                {
                    
                    console.log("i am inside green intensity if",self.state.sSingleDisasterTypeDataRecord.intensity);
                    
                    var opts = {
                        duration: 2000, 
                        easing: "linear "  
                    };
                                
                    view.goTo({
                        zoom: view.zoom + 3,
                        center: [
                                    self.state.sLongitude,
                                    self.state.sLatitude 
                                ]
                    },opts);
                    window.addEventListener("mouseup",function(event)
                    {  
                        if (gActionFlag)
                            ReactDOM.render(
                                    <AffectedAreaMap  
                                        latitude={self.state.sLatitude} 
                                        longitude={self.state.sLongitude} 
                                        mapcolor ={self.state.sMapcolor}
                                        DisasterDataArray = {gDisasterDataArray}
                                        SingleDisasterDataRecord={self.state.sSingleDisasterTypeDataRecord}
                                />,document.getElementById('DisasterTypeView'));
                    });//window.addEventListener 
                    //gActionFlag = false;
                }
                else
                {
                    view.popup.visible = true;
                    view.popup.open(popUpTemplate);        
                }//else
            });//hitTest 
        }); //view.on
        gActionFlag = false;
        }); //then
    } 
  
    renderMap() 
    {   
        if(this.state.status === 'loading') {
            return <div>loading</div>;
        }
    }//renderMap

    render() 
    {
        console.log("@@@@@@@@@@render DISASTERTYPE"); 
        return(
            <div id='DisasterTypeView' style={ styles.DisasterTypeMapDiv }>
                {this.renderMap()}
            </div>    
        );  
    }//render 
}//class
    