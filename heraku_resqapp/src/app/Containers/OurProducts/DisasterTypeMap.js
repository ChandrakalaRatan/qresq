import React from "react";
import ReactDOM from "react-dom";
import { loadModules } from 'esri-loader';
import { AffectedAreaMap } from './AffectedAreaMap';
import fetchDisasterTypeData from "../OurTechnology/FetchAllDisasterTypeData";


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
            requirementKey: Math.random(),
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
                    console.log("@@@@@@@@@@ I am in fetchAllDisasterTypeData in DISASTERTYPE", JSON.stringify(json));
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
            
            var featureLayer = new FeatureLayer({ url: lURL });
            
            const map = new Map({ 
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
           // view.ui.components = ["attribution"];
           
            //Plot the markers on the map
            gDisasterDataArray.map(itemDisaster => 
            {
                var locURL='http://localhost:8080/Images/';    
                
                    if(itemDisaster.disasterType === 'EQ'){
                        lDiasterName = "Earth Quake";
                        if(itemDisaster.intensity === 'Green'){
                            locURL= locURL + "green-earthquake.png";  
                        }
                        if(itemDisaster.intensity === 'Red'){
                            locURL= locURL + "red-earthquake.png"; 
                        }
                        if( itemDisaster.intensity === 'Orange'){
                            locURL= locURL + "orange-earthquake.png"; 
                        }
                    }
                    if(itemDisaster.disasterType === 'FL'){
                        lDiasterName = "Flood";
                        if(itemDisaster.intensity === 'Green'){
                            locURL= locURL + "green-flood.png";
                        }
                        if(itemDisaster.intensity === 'Red'){
                            locURL= locURL + "red-flood.png";
                        }
                        if( itemDisaster.intensity === 'Orange'){
                            locURL= locURL + "orange-flood.png"; 
                        }
                            
                    }
                    if(itemDisaster.disasterType === 'TC'){
                        lDiasterName = "Cyclone and Storm";
                        if(itemDisaster.intensity === 'Green'){
                            locURL= locURL + "green-storm.png";
                        }
                        if(itemDisaster.intensity === 'Red'){
                            locURL= locURL + "red-storm.png";
                        }
                        if( itemDisaster.intensity === 'Orange'){
                            locURL= locURL + "orange-storm.png"; 
                        }   
                    }
                    if(itemDisaster.disasterType === 'HU'){
                        lDiasterName = "Humanitarian";
                        if(itemDisaster.intensity === 'Green'){
                            locURL= locURL + "green-humanitarian.png";
                        }
                        if(itemDisaster.intensity === 'Red'){
                            locURL= locURL + "red-humanitarian.png"; 
                        }
                        if( itemDisaster.intensity === 'Orange'){
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
            var TemplateContent ={};

            view.on("immediate-click", function (event) 
            {
                console.log("@@@@@@@@@@ first event", event);
                var opts = {
                    duration: 2000, 
                    easing: "linear "  
                };
                view.goTo({
                    zoom: view.zoom + 3,
                    center:  view.toMap({ x: event.x, y: event.y })
                },opts);
            });

            view.on("double-click", function (event) 
            { 
                console.log("@@@@@@@@@@ second event", event);
                view.hitTest(event).then( function(response) 
                {    
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
                            self.state.sSingleDisasterTypeDataRecord = itemDisaster;
                            self.state.sLongitude = Number(itemDisaster.geolocation.lon);
                            self.state.sLatitude = Number(itemDisaster.geolocation.lat);  
                            console.log("@@@@@@@@@@ after the finding the closest to screen points","self.state.sLongitude: ",self.state.sLongitude,"self.state.sLatitude: ",self.state.sLatitude );
                            var centerPoint = view.center.clone();
                            TemplateContent=    "<b>Disaster Name:</b>"+ itemDisaster.eventName+"<br>"+
                                                "<b>magnitude:</b> "+ itemDisaster.magnitude +" "+ itemDisaster.unit+"<br>"+
                                                "<b>Date of Occur:</b>"+ itemDisaster.dateOccur+"<br>"+
                                                "<b>Geolocation:</b>"+itemDisaster.geolocation.lat + " " + itemDisaster.geolocation.lon+"</br>";
                            
                            // if( itemDisaster.intensity === 'Red' || itemDisaster.intensity === 'Orange' )
                            // {
                            //     TemplateContent =   TemplateContent  +
                            //                         "<a href= 'http://localhost:8080/resqhome'"+
                            //                         "target='{ReactDOM.render( <AffectedAreaMap   latitude={self.state.sLatitude} longitude={self.state.sLongitude} DisasterDataArray = {gDisasterDataArray} SingleDisasterDataRecord={self.state.sSingleDisasterTypeDataRecord} />,document.getElementById('DisasterTypeView')); } '>"+
                            //                         "Detail Disaster Report</a>"
                            // }
                            popUpTemplate = {
                                title: lDiasterName +" in " + itemDisaster.country,
                                location: centerPoint,
                                fetchFeatures: true,
                                content: TemplateContent
                            };
                            if( itemDisaster.intensity === 'Green' )
                                view.popup.open(popUpTemplate); 
                            if( itemDisaster.intensity === 'Red' || itemDisaster.intensity === 'Orange' ){
                                // view.popup.on("trigger-action", function(event){
                                    ReactDOM.render(
                                        <AffectedAreaMap  
                                            // key={self.props.buttonClick}
                                            latitude={self.state.sLatitude} 
                                            longitude={self.state.sLongitude} 
                                            mapcolor ={self.state.sMapcolor}
                                            DisasterDataArray = {gDisasterDataArray}
                                            SingleDisasterDataRecord={self.state.sSingleDisasterTypeDataRecord}
                                        />,document.getElementById('DisasterTypeView'));
                                 
                                //});
                            }

                        }//if
                    });  //gDisasterDataArray.map
                });//hitTest 
                console.log("i am outside hittest");      
            }); //view.on
            console.log("@@@@@@@@@@ still outside view.on");
            gActionFlag = false;
        }); //then
    }    
                       
                            // var opts = {
                            //     duration: 2000, 
                            //     easing: "linear "  
                            // };
                            // view.goTo({
                            //     zoom: view.zoom + 5,
                            //     center:  view.toMap({ x: event.x, y: event.y })
                            // },opts);
                            // console.log("@@@@@@@@@@ event", event);
                            // event.stopPropagation();

                            
                    
                            // window.addEventListener("mouseup",function(event)
                            // {  

                            //     view.popup.autoCloseEnabled=false;
                            //     view.popup.visible = true;
                            //     view.popup.open(popUpTemplate); 
                            //     console.log("i am inside green intensity else",self.state.sSingleDisasterTypeDataRecord.intensity);
                            //     if( self.state.sSingleDisasterTypeDataRecord.intensity === 'Red' ||
                            //     self.state.sSingleDisasterTypeDataRecord.intensity === 'Orange')
                            //     {
                            //     if (gActionFlag)
                            //     {
                            //         ReactDOM.render(
                            //                 <AffectedAreaMap  
                            //                 // key={self.props.buttonClick}
                            //                     latitude={self.state.sLatitude} 
                            //                     longitude={self.state.sLongitude} 
                            //                     mapcolor ={self.state.sMapcolor}
                            //                     DisasterDataArray = {gDisasterDataArray}
                            //                     SingleDisasterDataRecord={self.state.sSingleDisasterTypeDataRecord}
                            //             />,document.getElementById('DisasterTypeView'));
                            //     }
                            //     }
                            // });//window.addEventListener 
 
            // view.on("immediate-click", function (event) { 
            //     var opts = {
            //         duration: 2000, 
            //         easing: "linear "  
            //     };
            //     view.goTo({
            //         zoom: view.zoom + 5,
            //         center:  view.toMap({ x: event.x, y: event.y })
            //     },opts); 
            //     console.log("@@@@@@@@@@view.on first");
                
            // });
            
            // function disableZooming(view) 
            // {
            //                 view.popup.dockEnabled = true;
            //                 // Removes the zoom action on the popup
            //                 view.popup.actions = [];
                    
            //                 // prevents zooming with the + and - keys
            //                 view.on("key-down", function(event) {
            //                   var prohibitedKeys = ["+", "-", "Shift", "_", "="];
            //                   var keyPressed = event.key;
            //                   if (prohibitedKeys.indexOf(keyPressed) !== -1) {
            //                     event.stopPropagation();
            //                   }
            //                 });
            //                 view.on("mouse-wheel", function(event) {
            //                     event.stopPropagation();
            //                 });
            //                 view.on("double-click", function(event) {
            //                     event.stopPropagation();
            //                 });
            //                 view.on("double-click", ["Control"], function(event) {
            //                     event.stopPropagation();
            //                 });
            //                 view.on("drag", function(event) {
            //                     event.stopPropagation();
            //                 });
            //                 view.on("drag", ["Shift"], function(event) {
            //                     event.stopPropagation();
            //                 });
            //                 view.on("drag", ["Shift", "Control"], function(event) {
            //                     event.stopPropagation();
            //                 });
            //                 return view;
            // }
            // var opts = {
                //     duration: 2000, 
                //     easing: "linear "  
                // };
                // view.goTo({
                //     zoom: view.zoom + 5,
                //     center:  view.toMap({ x: event.x, y: event.y })
                // },opts); 
                // view.when(disableZooming);
     // var lGreenInstensityFlag=false;
                    // if(self.state.sSingleDisasterTypeDataRecord.intensity === 'Green')
                    // {
                       // console.log("i am inside green intensity if",self.state.sSingleDisasterTypeDataRecord.intensity);
                        // view.popup.autoCloseEnabled=false;
                        // view.popup.visible = true;
                        // view.popup.open(popUpTemplate);    
                        // lGreenInstensityFlag=true;  
                    // }//else
                    // if( self.state.sSingleDisasterTypeDataRecord.intensity === 'Red' ||
                    //     self.state.sSingleDisasterTypeDataRecord.intensity === 'Orange')
                   // {
                        // window.addEventListener("mouseup",function(event)
                        // { 
       // }
                        // view.when(disableZooming);
                         
                        // function disableZooming(view) {
                        //     view.popup.dockEnabled = true;
                        //     // Removes the zoom action on the popup
                        //     view.popup.actions = [];
                    
                        //     // prevents zooming with the + and - keys
                        //     view.on("key-down", function(event) {
                        //       var prohibitedKeys = ["+", "-", "Shift", "_", "="];
                        //       var keyPressed = event.key;
                        //       if (prohibitedKeys.indexOf(keyPressed) !== -1) {
                        //         event.stopPropagation();
                        //       }
                        //     });
                        //     view.on("mouse-wheel", function(event) {
                        //         event.stopPropagation();
                        //     });
                        //     view.on("double-click", function(event) {
                        //         event.stopPropagation();
                        //     });
                        //     view.on("double-click", ["Control"], function(event) {
                        //         event.stopPropagation();
                        //     });
                        //     view.on("drag", function(event) {
                        //         event.stopPropagation();
                        //     });
                        //     view.on("drag", ["Shift"], function(event) {
                        //         event.stopPropagation();
                        //     });
                        //     view.on("drag", ["Shift", "Control"], function(event) {
                        //         event.stopPropagation();
                        //     });
                        //     return view;
                        // }
        
                 
                           
                        //view.popup.autoCloseEnabled=false;
                       // view.popup.visible = true;
                       //view.popup.location = event.mapPoint;
                    //    var zoomOutAction = {
                    //     // This text is displayed as a tooltip
                    //     title: "Zoom out",
                    //     // The ID used to reference this action in the event handler
                    //     id: "zoom-out",
                    //     // Sets the icon font used to style the action button
                    //     className: "esri-icon-zoom-out-magnifying-glass"
                    //    };
                   // console.log(event.mapPoint);
                    //view.popup.visible = true;
                    //view.popup.dockEnabled = true;
                    
                     //view.popup.actions.push(zoomOutAction);
        
                    // Fires each time an action is clicked
                    //  view.popup.viewModel.on("trigger-action", function(event){
                    //      // If the zoom-out action is clicked, than execute the following code
                    //      if(event.action.id === "zoom-out"){
                    //          // Zoom out two levels (LODs)
                    //          view.goTo({
                    //              center: view.center,
                    //              zoom: view.zoom - 2
                    //          });
                    //      }
                    //  });           
      
    
        //Onclick on the marker find the coordinates
        // view.on("double-click", function (event) { 
        //     console.log("@@@@@@@@@@ first view.on click");
        //     var opts = {
        //                 duration: 2000, 
        //                 easing: "linear "  
        //             };
        //             view.goTo({
        //                         zoom: view.zoom + 5,
        //                         center: 
        //                                 view.toMap({ x: event.x, y: event.y })
        //             },opts); 
        // });
        // view.when(self.disableZooming); 
                        
               // var lGreenInstensityFlag=false;
                // if(self.state.sSingleDisasterTypeDataRecord.intensity === 'Green')
                // {
                    // console.log("i am inside green intensity if",self.state.sSingleDisasterTypeDataRecord.intensity);
                    // view.popup.autoCloseEnabled=false;
                    // view.popup.visible = true;
                    // view.popup.open(popUpTemplate);    
                    // lGreenInstensityFlag=true;  
                // }//else
                // else
                // {
                    
                   // console.log("i am inside green intensity else",self.state.sSingleDisasterTypeDataRecord.intensity);
                    //if(!lGreenInstensityFlag){
                   
                    // window.addEventListener("mouseup",function(event)
                    // {  
                    //     if (gActionFlag)
                    //         ReactDOM.render(
                    //                 <AffectedAreaMap  
                    //                    // key={self.props.buttonClick}
                    //                     latitude={self.state.sLatitude} 
                    //                     longitude={self.state.sLongitude} 
                    //                     mapcolor ={self.state.sMapcolor}
                    //                     DisasterDataArray = {gDisasterDataArray}
                    //                     SingleDisasterDataRecord={self.state.sSingleDisasterTypeDataRecord}
                    //             />,document.getElementById('DisasterTypeView'));
                    // });//window.addEventListener 
                    //}
                    
                //}
               

  
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
    