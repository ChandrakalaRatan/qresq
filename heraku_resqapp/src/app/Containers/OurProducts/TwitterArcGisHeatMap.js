import React, { Component } from 'react';
import {googleHeatMapStyleConst} from "./GoogleHeatMapStyle";
import { loadModules } from 'esri-loader';


const options = {
    url: 'https://js.arcgis.com/4.8/'
    //url: 'https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2'
};
const styles =  {
    TwitterArcGisHeatMapContainer: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '120%'
    },
    TwitterArcGisHeatMapDIv: {
      padding: 0,
      margin: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: 'grey'
    }
  };

var heatMapData =[];
var loclatitude =0;
var loclongitude =0;
var locWeight = 0;
var gCount = 0;

export class TwitterArcGisHeatMap extends Component 
{
    constructor(props) {
        super(props);
        this.state ={

            sHeatMapGeoJson: {
                type: "FeatureCollection",
                features: []
            }


        }
    }
    
    componentDidMount(){
        this.tweetsByLatLonFetch();
    }

    tweetsByLatLonFetch() 
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
                        
                        json.results.map(heatmapdata =>{
                            this.state.sHeatMapGeoJson.features.push({
                                type:"Feature",
                                geometry:   {   
                                    type: "Point",
                                    coordinates:{
                                        0: heatmapdata.geoLocation.lat,
                                        1: heatmapdata.geoLocation.lon
                                    }
                                },
                                properties: {
                                    mag: heatmapdata.totalTweets,
                                    city: heatmapdata.city
                                },
                                id: gCount
                            })
                            gCount = gCount + 1   
                        })
                        console.log("*********tweetsByLatLonFetch",json.results);
                       // this.renderMap();
                        console.log("heatMapData array*********",JSON.stringify(this.state.sHeatMapGeoJson));      
                    })
                    .catch(error =>{
                        console.log("ERROR" + error);     
                    })
                    console.log("leaving tweetsByLatLonFetch TwitterHeatMap");              
    }
    
    componentDidUpdate()
    {
            console.log("@@@@@@@@@@ entering componentDidUpdate TwitterArcGisHeatMap"); 
            loadModules([   'esri/Map', 
                            'esri/views/MapView',
                            "esri/layers/CSVLayer",
                            "esri/core/watchUtils",
                            "esri/layers/GeoJSONLayer",
                            "esri/widgets/Legend"], options)
            .then(([    Map, 
                        MapView,
                        CSVLayer, 
                        GeoJSONLayer, 
                        Legend,
                        watchUtils
                    ]) => {
            const simpleRenderer = {
                type: "simple",
                symbol: {
                  type: "simple-marker",
                  color: "#c80000",
                  size: 5
                }
            };    
            const heatmapRenderer = {
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
            const template = {
                title: "Twitter Detail Analysis",
                content: " {mag}  tweets originated from {city}."
            }; 
            const geoJSONLayer = new GeoJSONLayer({
                title: "Twitter Analysis",
                url: this.state.sHeatMapGeoJson,
                popupTemplate: template,
                renderer: heatmapRenderer
            });
            const csvLayer = new CSVLayer({
                title: "Twitter Analysis",
                url: "http://localhost:8080/Images/2.5_week.csv",
                popupTemplate: template,
                renderer: heatmapRenderer
            });
           
            const map = new Map({ 
                  basemap: "dark-gray-vector",
                  //layers: [csvLayer]
                  layers: [geoJSONLayer]
            });

            // Create the MapView
            const view = new MapView({
                  container: "arcgisheatmapdiv",
                  map: map,
                  zoom: 2,
                  center: [-138, 30],
                //   {
                //       x: this.props.latitude,
                //       y: this.props.longitude
                //   }
               constraints: {
                minScale: 1155582
              },
              highlightOptions: {
                color: "#ff642e",
                haloOpacity: 1,
                fillOpacity: 0.25
              },
              popup: {
                dockEnabled: true,
                dockOptions: {
                  breakpoint: false
                }
              }
            });
            // view.when().then(function() {
            //     view.watch("scale", function(newValue) {
            //         layer.renderer = newValue <= 72224 ? simpleRenderer : heatmapRenderer;
            //     });
            // });
            // view.ui.add(new Legend({
            //     view: view,
            //     style: "card"
            // }), "top-left");

       
        }); //then      
    }   
    renderMap() 
    {   
        if(this.state.status === 'loading') {
            return <div>loading</div>;
        }
    }//renderMap        
    render(){
        return(
            <div  id="arcgisheatmapcontainer" style={styles.TwitterArcGisHeatMapContainer} > 
                <div id="arcgisheatmapdiv" style={ styles.TwitterArcGisHeatMapDIv } >
                    {this.renderMap()}     
                </div>
            </div>
        );
    }//render


}//class
export default TwitterArcGisHeatMap;