import React, { Component } from 'react';
import { googleHeatMapStyleConst } from './GoogleHeatMapStyle';

const styles =  {
        twitterheatmapcontainer: {
            padding: 0,
            margin: 0,
            width: '100%',
            height: '100%',
            position: 'relative' 
        },
        twitterheatmapDiv: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        background: 'grey'
        }
  }
  var heatMapData =[];
  var loclatitude =0;
  var loclongitude =0;

export class TwitterGoogleHeatMap extends Component 
{
        constructor(props) {
            super(props);
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
                        console.log("tweetsByLatLonFetch",json.results);
                        json.results.map(heatmapdata =>{
                            loclatitude = heatmapdata.geoLocation.lat;
                            loclongitude = heatmapdata.geoLocation.lon;
                            heatMapData.push({
                                location: new google.maps.LatLng(Number(loclatitude), 
                                                                 Number(loclongitude)), 
                                weight: heatmapdata.totalTweets});
                            
                        })
                        this.renderMap();
                        console.log("heatMapData array*********",heatMapData);
                        
                            
                    })
                    .catch(error =>{
                        console.log("ERROR" + error);     
                    })
                    console.log("leaving tweetsByLatLonFetch TwitterHeatMap");              
        }
       
        initMap = () =>{
            var map = new window.google.maps.Map(document.getElementById('googleheatmap'), {
                center: {lat: loclatitude, lng: loclongitude },
                zoom: 6,
                styles: googleHeatMapStyleConst
            })
            console.log('#####loclatitude',loclatitude,'loclongitude',loclongitude, JSON.stringify(googleHeatMapStyleConst));
            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatMapData,
            });
            heatmap.setMap(map);         
        }
        renderMap = () => {
            //loadScritpt("https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBlnYj0D5PuFnI_iopaie_z9GpKGKN3VAY&callback=initMap")
           // loadScritpt("https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyANrDl8OJ1MG40sPHv0tewGfENPVVbrTCM&libraries=visualization&callback=initMap");
            window.initMap = this.initMap();
        }

        render(){
            return(
                <div  id="googlecontainer" style={styles.twitterheatmapcontainer} > 
                    <div id="googleheatmap" style={ styles.twitterheatmapDiv } >
                        
                    </div>
                </div>
            );
        }//render


}//class

function loadScritpt(url){
    var index = window.document.getElementsByTagName("script")[0]
    var script= window.document.createElement("script")
    script.src = url
    script.async =true
    script.defer = true
    script.type = "text/javascript"
    index.parentNode.insertBefore(script, index)
}
export default TwitterGoogleHeatMap;