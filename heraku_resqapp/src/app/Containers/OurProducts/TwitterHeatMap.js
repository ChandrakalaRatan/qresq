import React, { Component } from 'react';
import {googleHeatMapStyleConst} from "./GoogleHeatMapStyle";

const styles =  {
    heatmapcontainer: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        position: 'relative' 
    },
    headmapDiv: {
      padding: 0,
      margin: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: 'grey'
  }, 
  }
  var heatMapData =[];
  var loclatitude =0;
  var loclongitude =0;
  var locWeight = 0;
export class TwitterHeatMap extends Component 
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
                            locWeight = heatmapdata.totalTweets;
                            
                        })
                        this.renderMap();
                        console.log("heatMapData array*********",heatMapData);
                        
                            
                    })
                    .catch(error =>{
                        console.log("ERROR" + error);     
                    })
                    console.log("leaving tweetsByLatLonFetch TwitterHeatMap");              
        }
        
        render(){
            return(
                <div  id="googlecontainer" style={styles.headmapcontainer} > 
                    <div id="googleheatmap" style={ styles.headmapDiv } >
                        
                    </div>
                </div>
            );
        }//render


}//class
export default TwitterHeatMap;