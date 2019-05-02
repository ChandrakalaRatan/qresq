import React, { Component } from 'react';
import './SimpleMap.css';

export class ResqMap extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
        disasterData: []
      }
    }
    
    componentDidMount() {
        this.getDisaster()
    }


    renderMap = () => {
       // loadScritpt("https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2&callback=initMap")
        window.initMap = this.initMap
    }
    
    getDisaster = () => {
        if(this.props.endDate)
           console.log(this.props.endDate);
           if(this.props.startDate)
           console.log(this.props.startDate);
           if(this.props.location)
           console.log(this.props.location);
           if(this.props.buttonName)
           console.log(this.props.buttonName);
        //axios.get(endPoint + new URLSearchParams(parameters))

        //const endPoint = "http://185.178.86.165:8080/api/tweet/fetchSentiment?geoPoint=Indonesia&distance=100&sentiment=1"
        const endPoint = "http://185.178.86.165:8080/api/tweet/fetchSentiment?geoPoint=Indonesia&distance=100&sentiment=1"
        fetch(endPoint)
        .then(response => response.json())
        .then(json => {
            this.setState(
            {
                disasterData: json.results
            }, 
              this.renderMap()
            )  
            //console.log(JSON.stringify(json));
            //console.log(JSON.stringify(json.results));
        })
        .catch(error =>{
          console.log("ERROR" + error);
          
        })

    }


    initMap = () =>{
        //   var map = new window.google.maps.Map(document.getElementById('viewDiv'), {
        //     center: {lat: -34.397, lng: 150.644},
        //     zoom: 2
        //   })

        // var map = new Map({
        //     basemap: "dark-gray-vector"
        // });
      
        // var view = new MapView({
        //     container: "viewDiv",
        //     map: map,
        //     center: [-118.71511,34.09042],
        //     zoom: 2
        // });
        //   //create an info window
        //   var infowindow = new window.google.maps.InfoWindow()
   
        //   //Display dynamic maker
        //   this.state.disasterData.map(itemDisaster => {

        //     //  console.log(itemDisaster.city);
             
        //       var contentString = `${itemDisaster.location}`
              

        //       //create marker
        //       var marker = new window.google.maps.Marker({
          
        //         position: {
        //           lat: itemDisaster.geolocation.lat, 
        //           lng: itemDisaster.geolocation.lon
        //         },
        //         map: map,
        //         title: itemDisaster.tweet
        //       })
        //       // console.log(itemDisaster.geolocation.lat);
        //       // console.log(Number(itemDisaster.geolocation.lon));
        //       //Click on a Marker
        //       marker.addListener('click', function() {

        //         //chandge the content
        //         infowindow.setContent(contentString)

        //         // open an info window
        //         infowindow.open(map, marker);
        //       });

        //   })

        require([ "esri/Map", "esri/views/MapView" ], function(
          Map, MapView
        ) {
          const map = new Map({
            basemap: "streets-navigation-vector"
          });
        
          const view = new MapView({
            container: "viewDiv",
            map: map,
            zoom: 12,
            center: {
              latitude: 32.7353,
              longitude: -117.1490
            }
          });
          
          const contentString = "The <a href='http://zoo.sandiegozoo.org/'>San Diego Zoo</a> " + 
            " in Balboa Park houses over 3,700 animals." +
            "<p><p><img src='https://visitoceanside.org/wp-content/uploads/2013/01/SanDiegoZoo.jpg' alt='San Diego Zoo' height='150'>"; 
          
          view.graphics.add({
            symbol: {
              type: "text",
              color: "#7A003C",
              text: "\ue61d", // esri-icon-map-pin
              font: {
                size: 30,
                family: "CalciteWebCoreIcons"
              }
            },
            geometry: {
              type: "point",
              longitude: -117.1490,
              latitude: 32.7353
            },
            popupTemplate: {
              title: "San Diego Zoo",
              content: contentString
            }
          });
        });
        
        
    }

  render() {
        return (
          <main>
            {/* <div id="map"> */}
            <div id="viewDiv">
            </div>
          </main>
      
        );
  }
}
// SimpleMap.propTypes = {
//   endDate: React.PropTypes.String,
//   startDate: React.PropTypes.String,
//   location: React.PropTypes.String,
//   buttonName: React.PropTypes.String  
// }


/* <script src="https://maps.googleapis.com/maps/api/js?**v=3;**key=AIzaSyDeKyZWgdDXOkW5QFO&callback=initMap"
    async defer></script> */

// function loadScritpt(url){
//   var index = window.document.getElementsByTagName("script")[0]
//   var script= window.document.createElement("script")
//   script.src = url
//   script.async =true
//   script.defer = true
//   script.type = "text/javascript"
//   index.parentNode.insertBefore(script, index)


// }

export default ResqMap;