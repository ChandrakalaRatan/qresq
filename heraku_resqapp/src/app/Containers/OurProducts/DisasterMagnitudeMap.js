import React, { Component } from 'react';
import { loadModules } from 'esri-loader';
import { googleHeatMapStyleConst } from './GoogleHeatMapStyle';

const styles =  {
        magnitudeContainer: {
            padding: 0,
            margin: 0,
            width: '100%',
            height: '100%',
            position: 'relative' 
        },
        magnitudeMapDiv: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        background: 'grey'
        }
  }
  const options = {
    url: 'https://js.arcgis.com/4.8/'
  };
  var heatMapData =[];
  var loclatitude =0;
  var loclongitude =0;
  var results = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "letter": "f"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-0.467823, 51.8881],
            [-0.461189, 51.883591],
            [-0.45952, 51.882457],
            [-0.4584, 51.881558],
            [-0.455638, 51.87973],
            [-0.453644, 51.879704],
            [-0.447352, 51.879806],
            [-0.442062, 51.879798],
            [-0.439082, 51.879388],
            [-0.435922, 51.878419],
            [-0.433059, 51.877516],
            [-0.430189, 51.876799],
            [-0.427409, 51.876391],
            [-0.424125, 51.8761],
            [-0.420636, 51.875991],
            [-0.419732, 51.876164],
            [-0.41987, 51.877772],
            [-0.41932, 51.879371],
            [-0.418517, 51.879484],
            [-0.417789, 51.880339],
            [-0.415227, 51.88222],
            [-0.419205, 51.882644],
            [-0.426901, 51.885218],
            [-0.428296, 51.886369],
            [-0.429248, 51.885188],
            [-0.431001, 51.885025],
            [-0.431131, 51.884162],
            [-0.431451, 51.883549],
            [-0.434041, 51.883707],
            [-0.435319, 51.88428],
            [-0.438299, 51.88469],
            [-0.440777, 51.885217],
            [-0.443263, 51.885497],
            [-0.445256, 51.885585],
            [-0.446127, 51.8864],
            [-0.44839, 51.887356],
            [-0.449782, 51.887498],
            [-0.455175, 51.887446],
            [-0.458568, 51.88749],
            [-0.462862, 51.887423],
            [-0.465357, 51.887455],
            [-0.467487, 51.888167],
            [-0.467823, 51.8881]
          ]
        ]
      }
    }]
  }
export class DisasterMagnitudeMap extends Component 
{
        constructor(props) {
            super(props);
            this.state = {
            }
        }

        // componentDidMount(){
        //     this.props.DisasterDataArray.map({

        //     })     
        // }
       
        // initMap = () =>{
        //     console.log("lat, lon, magnitude",
        //     this.props.latitude,
        //     this.props.longitude,
        //     this.props.SingleDisasterDataRecord.magnitude);
        //     console.log("single data record",this.props.SingleDisasterDataRecord);
            
        //     var map = new window.google.maps.Map(document.getElementById('magnitudemapDiv'), {
        //         //center: {lat: 38.9637, lon: 35.2433 },
        //         center: {lat: this.props.latitude, lon: this.props.longitude},
        //         zoom: 2,
        //         styles: googleHeatMapStyleConst
        //     })
        //     // console.log('#####loclatitude',loclatitude,'loclongitude',loclongitude, JSON.stringify(googleHeatMapStyleConst));
        //     // var heatmap = new google.maps.visualization.HeatmapLayer({
        //     //     data: heatMapData,
        //     // });
        //     // heatmap.setMap(map);     
        //    // map.data.addGeoJson(data);  
        //     map.data.setStyle(function(feature) {
        //        // var magnitude = feature.getProperty('magnitude');
        //        var magnitude = this.props.SingleDisasterDataRecord.magnitude;
        //         return {
        //           icon: getCircle(magnitude)
        //         };
        //       });
            
        //     function getCircle(magnitude) {
        //         return {
        //         path: google.maps.SymbolPath.CIRCLE,
        //         fillColor: 'red',
        //         fillOpacity: .2,
        //         scale: Math.pow(2, magnitude) / 2,
        //         strokeColor: 'white',
        //         strokeWeight: .5
        //         };
        //     }
        //     function eqfeed_callback(results) {
        //         map.data.addGeoJson(results);
        //       }        
        // }
        
        // // eqfeed_callback(results) {
        // //     map.data.addGeoJson(results);
        // // }
        // renderMap = () => {
        //     //loadScritpt("https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBlnYj0D5PuFnI_iopaie_z9GpKGKN3VAY&callback=initMap")
        //    // loadScritpt("https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyANrDl8OJ1MG40sPHv0tewGfENPVVbrTCM&libraries=visualization&callback=initMap");
        //     window.initMap = this.initMap();
        // }

        // render(){
        //     console.log("#########i am in render DisasterMagnitudeMap");
        //     return(
        //         <div  id="Magcontainer" style={styles.twitterheatmapcontainer} > 
        //             <div id="googleMagmap" style={ styles.twitterheatmapDiv } >
        //             {this.renderMap()} 
        //             </div>
        //         </div>
        //     );
        // }//render

        componentDidUpdate(){
            
            console.log("%%%%%%%%%%%entering componentDidUpdate DisasterMagnitudeMap");
            loadModules([   'esri/Map', 
                            'esri/views/MapView',
                            "esri/WebMap",
                            "esri/Graphic",
                            "esri/geometry",
                            "esri/layers/FeatureLayer"], 
                            options)
            .then(([    Map, 
                        MapView, 
                        FeatureLayer]) => {
    
                var url = "https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2";
                var featureLayer = new FeatureLayer({
                    url: url
                });
                const map = new Map({ 
                    basemap:  "dark-gray"
                    ,spacialReference: featureLayer.spacialReference
                });
                
                    
                // Create the MapView
                const view = new MapView({
                    container: "magnitudeMapDiv",
                    map: map,
                    zoom: 6,
                    center: [this.props.longitude, this.props.latitude]
                    ,spacialReference: featureLayer.spacialReference
                });
                view.graphics.add({
                    symbol: {
                        type: "simple-marker",
                        style: "circle",
                        color: this.props.mapcolor,
                        size: 80,
                        text: "\ue61d", // esri-icon-map-pin
                        font: {
                            size: 15,
                            family: "CalciteWebCoreIcons"
                        }       
                    },
                    geometry: {
                        type: "point",
                        longitude: this.props.longitude,
                        latitude: this.props.latitude
                    }
                });       
            });     
        }

       
    
        renderMap() {    
            if(this.state.status === 'loading') {
                return <div>loading</div>;
            }
        }//renderMap

        render(){
                console.log("#########i am in render DisasterMagnitudeMap");
                return(
                    <div  id="magnitudeContainer" style={styles.magnitudeContainer} > 
                        <div id="magnitudeMapDiv" style={ styles.magnitudeMapDiv } >
                        {this.renderMap()} 
                        </div>
                    </div>
                );
        }//render
}//class

// function loadScritpt(url){
//     var index = window.document.getElementsByTagName("script")[0]
//     var script= window.document.createElement("script")
//     script.src = url
//     script.async =true
//     script.defer = true
//     script.type = "text/javascript"
//     index.parentNode.insertBefore(script, index)
// }
export default DisasterMagnitudeMap;