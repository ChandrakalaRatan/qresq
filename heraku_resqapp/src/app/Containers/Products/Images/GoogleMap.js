import React, { Component } from 'react';
import './GoogleMap.css';


export class GoogleMap extends Component {
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
        loadScritpt("https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyANrDl8OJ1MG40sPHv0tewGfENPVVbrTCM&callback=initMap")
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
          var map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 3
          })

          //create an info window
          var infowindow = new window.google.maps.InfoWindow()
   
          //Display dynamic maker
          this.state.disasterData.map(itemDisaster => {

            //  console.log(itemDisaster.city);
             
              var contentString = `${itemDisaster.location}`
              

              //create marker
              var marker = new window.google.maps.Marker({
          
                position: {
                  lat: itemDisaster.geolocation.lat, 
                  lng: itemDisaster.geolocation.lon
                },
                map: map,
                title: itemDisaster.tweet
              })
              // console.log(itemDisaster.geolocation.lat);
              // console.log(Number(itemDisaster.geolocation.lon));
              //Click on a Marker
              marker.addListener('click', function() {

                //chandge the content
                infowindow.setContent(contentString)

                // open an info window
                infowindow.open(map, marker);
              });

          })
    }

  render() {
        return (
          <main>
            <div id="map">
            
            </div>
          </main>
      
        );
  }
}


/* <script src="https://maps.googleapis.com/maps/api/js?**v=3;**key=AIzaSyDeKyZWgdDXOkW5QFO&callback=initMap"
    async defer></script> */

function loadScritpt(url){
  var index = window.document.getElementsByTagName("script")[0]
  var script= window.document.createElement("script")
  script.src = url
  script.async =true
  script.defer = true
  script.type = "text/javascript"
  index.parentNode.insertBefore(script, index)


}

export default GoogleMap;