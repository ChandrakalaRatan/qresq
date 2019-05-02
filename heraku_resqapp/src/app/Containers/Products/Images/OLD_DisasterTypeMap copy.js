import React, { Component } from 'react';
import { loadModules } from 'esri-loader';
// import { FetchAllDisaster } from './FetchAllDisaster';


const options = {
    url: 'https://js.arcgis.com/4.8/'
    //url: 'https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2'
};
       

const styles =  {
    container: {
        height: '100vh',
        width: '120vw'
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
            status: 'loading'
        }
    }
    componentDidUpdate(prevProps){
        
        loadModules(['esri/Map', 'esri/views/MapView',"esri/layers/FeatureLayer"], options)
            .then(([Map, MapView,FeatureLayer]) => {
                const map = new Map({ 
                    basemap: "dark-gray" 
                });
               // map.basemap = "https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2";
                const view = new MapView({
                    container: "viewDiv",
                    map,
                    zoom: 3,
                    center: {
                        latitude: 32.7353,
                        longitude: -117.1490
                      }
                });



                var mapcolor = "";
                this.props.disasterData.map(itemDisaster => 
                {
                    const contentString = `${itemDisaster.country}`
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
                            view.graphics.add({
                                symbol: {
                                    type: "text",
                                    color: mapcolor,
                                    text: "\ue61d", // esri-icon-map-pin
                                    font: {
                                        size: 30,
                                        family: "CalciteWebCoreIcons"
                                    }
                                },
                                geometry: {
                                    type: "point",
                                    longitude: itemDisaster.geoPoints.lon,
                                    latitude: itemDisaster.geoPoints.lat
                                },
                                popupTemplate: {
                                    title: itemDisaster.disasterType,
                                    content: contentString
                                }
                            });  
                    }
                }); 
            });   
    }//componentDidMount

    renderMap() {    
        if(this.state.status === 'loading') {
            return <div>loading</div>;
        }
    }//renderMap

    render() {
        return(
          <div style={styles.container}>
            <div id='viewDiv' style={ styles.mapDiv } >
              {this.renderMap()}
            </div>
          </div>
        )
    }//render
}//class

export default DisasterTypeMap;