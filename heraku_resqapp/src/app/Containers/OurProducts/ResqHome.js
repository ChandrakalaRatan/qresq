import React from "react";
import ReactDOM from "react-dom";
import { loadModules } from 'esri-loader';
import {ButtonToolbar, Button } from 'react-bootstrap';
import { DisasterTypeMap } from "./DisasterTypeMap";
import './ResqHome.css';
import { AffectedAreaMap } from './AffectedAreaMap';
import { node } from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const options = {
    url: 'https://js.arcgis.com/4.8/'
    //url: 'https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2'
    //url: 'https://www.arcgis.com/apps/Embed/index.html'
};

var disasterDataloc =[];
var disasterDataRecord={};
var llatitude = 0;
var llongitude = 0;  
var mapcolor = "";

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

export class ResqHome extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            dateRange: 'week',
            disasterType: 'all',
            firsttimeFlag: true,
            buttonClickFlag: false,
            disasterData: [],
            llongitude: 0,
            llatitude: 0,
            lmapcolor: ''  
          };
          
    }  
    componentDidMount() {
        console.log(" i am in componentDidMount RESQHOMe ");
        
        const endPoint = "http://185.178.86.165:8080/api/qresq/search"
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
            //console.log(JSON.stringify(json));
        })
        .catch(error =>{
          console.log("ERROR" + error);     
        })
        console.log("leaving componentDidMount RESQHOME"); 
    }

    componentDidUpdate(oldProps){

        const newProps = this.props
        if(oldProps.glatitude !== newProps.glatitude &&
            oldProps.glongitude !== newProps.glongitude 
            ) {
          this.setState({ 
              glatitude: this.state.llatitude,
              glongitude: this.state.llongitude
           })
        }
        console.log("entering componentDidUpdate RESQHOME"); 

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
            
        var url = "https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2";
        
        var featureLayer = new FeatureLayer({
                            url: url
        });
        
        const map = new Map({ 
            //basemap:  "dark-gray"
            basemap: "dark-gray-vector"
            ,spacialReference: featureLayer.spacialReference
        });
        
        // Create the MapView
        const view = new MapView({
            container: "viewDiv",
            map: map,
            zoom: 2,
            center: {
                x: 38.9637,
                y: 35.2433
            }
            ,spacialReference: featureLayer.spacialReference
        });
                        
        //Plot the markers on the map
        this.state.disasterData.map(itemDisaster => 
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
           
            if(this.state.disasterType ==='all' || 
            this.state.disasterType === itemDisaster.disasterType)
            {
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


        disasterDataloc = this.state.disasterData;
        //Onclick on the marker find the coordinates
        view.on("immediate-click", function (event) {    
            view.hitTest(event).then( function(response) {
                llongitude = Number(response.screenPoint.mapPoint.longitude);
                llatitude = Number(response.screenPoint.mapPoint.latitude);
                console.log("screen point","llongitude: ",llongitude,"llatitude: ",llatitude );
               
                var plon = Number(llongitude);
                var plat = Number(llatitude);
                plon = Math.round(plon * 100) / 100
                plat = Math.round(plat * 100) / 100
                var pr = 2;
                var llat,llon;
                           
                //find the closest latitude and longitude
                disasterDataloc.map(itemDisaster => 
                {
                    llat = Number(itemDisaster.geoPoints.lat);
                    llon = Number(itemDisaster.geoPoints.lon)
                    var xlon = plon - llon;
                    var xlat = plat - llat;
                    if (((xlon*xlon) + (xlat*xlat))<(pr*pr)) 
                    {                        
                    
                        if(itemDisaster.disasterType === 'EQ'){
                            mapcolor = "#ffc802";        
                        }else if(itemDisaster.disasterType === 'FL'){ 
                            mapcolor = "#012cff";                  
                        }else if( itemDisaster.disasterType === 'TC' ){ 
                            mapcolor = "#f74100";
                        }else if(itemDisaster.disasterType ==='HU'){
                            mapcolor = "#03b52f"; 
                        } 
                        disasterDataRecord = itemDisaster;
                        llongitude = Number(itemDisaster.geoPoints.lon);
                        llatitude = Number(itemDisaster.geoPoints.lat);
                        console.log("disaster array points","llongitude: ",llongitude,"llatitude: ",llatitude );
                        console.log("plon",plon,"plat",plat,"llon",llon,"llat",llat,"xlon",xlon, "xlat", xlat); 
                        console.log("((xlon*xlon) + (xlat*xlat)):",((xlon*xlon) + (xlat*xlat)), "<  (pr*pr)", (pr*pr));
                        console.log("FOUND!!!!!");     
                    }
                });                                
                var opts = {
                    duration: 2000, 
                    easing: "linear "  // Duration of animation will be 5 seconds
                };
                            
                view.goTo({
                    zoom: view.zoom + 3,
                    center: [llongitude,
                             llatitude]
                          },opts);
            

                window.addEventListener("mouseup",function(event){    
                    ReactDOM.render(
                        <AffectedAreaMap    glatitude={llatitude} 
                                        glongitude={llongitude} mapcolor ={mapcolor}
                                        disasterDataRecord={disasterDataRecord}/>
                                        ,document.getElementById('newDiv'));
                    
                });
            });//hitTest
            console.log("after hittest RESQHOME");
        }); //view.on
        console.log("after view.on RESQHOME"); 
        }); //then
        console.log("leaving componentDidUpdate RESQHOME"); 
    } 

    handleSubmitClick(e){
        this.render();
        //document.getElementById("newDiv").removeChild(document.getElementById("detailDiv"));
        if(e.target.id === "week" || e.target.id ==="month")
        {
              
            this.setState(
                {
                 dateRange: e.target.id,
                 buttonClickFlag: true,
                 firsttimeFlag: false
            });
        }
        if(e.target.id === "EQ" || e.target.id ==="HU" || 
           e.target.id === "FL" || e.target.id ==="TC" || e.target.id==="all")
        {
 
            this.setState({
                disasterType: e.target.id,
                buttonClickFlag: true,
                firsttimeFlag: false
            });
        }
    }

    renderBanner(){
        return(
            <div className="resq-banner">       
                <div className="resq-logo"> resq</div>
                <div className="resq-daterange"> 
                    <div className="date-range-header">DATE RANGE</div>
                    <ButtonToolbar className="date-range-button-group"
                                            onClick={this.handleSubmitClick.bind(this)}>
                        <Button className="one-month-button" type="submit" id="month">ONE MONTH</Button>
                        <Button className="one-week-button" type="submit"  id="week">ONE WEEK</Button>     
                    </ButtonToolbar>
                </div>
                <div className="resq-disastertype">
                    <div className="disaster-type-header">DISASTER TYPE</div>            
                        <ButtonToolbar className="disaster-type-button-group"
                                            onClick={this.handleSubmitClick.bind(this)}>
                            <Button className="all-button" type="submit" id="all">ALL</Button>
                            <Button className="earthquake-button" type="submit"  id="EQ">EARTHQUAKE</Button>
                            <Button className="flood-button" type="submit" id="FL" >FLOOD</Button>
                            <Button className="storm-button" type="submit" id="TC">STORM</Button>
                            <Button className="humanitarian-button" type="submit" id="HU">HUMANITARIAN</Button>        
                        </ButtonToolbar>
                </div>   
            </div>  
        )
    }

    renderMap() {   
        console.log("rendermap RESQHOME"); 
        if(this.state.status === 'loading') {
            return <div>loading</div>;
        }
    }//renderMap

    render() 
    {
        console.log("&&&&&&&&&&&&&&&&&&&&&&&"); 
        console.log("render RESQHOME"); 
        console.log("this.state.firsttimeFlag ", this.state.firsttimeFlag ); 
       
        console.log("this.state.buttonClickFlag  ", this.state.buttonClickFlag  );
       
        return(
            <div className="resq-new-window">  
                {this.renderBanner()}
                {this.state.firsttimeFlag || this.state.buttonClickFlag?
                    
                    <div className="resq-wrapper" id="newDiv"> 
                        <div style={styles.container}>
                            <div id='viewDiv' style={ styles.mapDiv } >
                                {this.renderMap()}
                            </div>      
                        </div>
                    </div> 

                : null  
                } 
            </div>      
        );  
    }//render 
}//class
    