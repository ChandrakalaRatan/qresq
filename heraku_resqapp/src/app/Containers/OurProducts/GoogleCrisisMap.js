import React, { Component } from 'react';
import GoogleMapReact, { AnyReactComponent} from 'google-map-react';
import {ButtonToolbar, Button } from 'react-bootstrap';
import "./GoogleCrisisMap.css";
import { googleHeatMapStyleConst } from './GoogleHeatMapStyle';

const styles =  {
    container4: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        position: 'relative' 
    },
    mapDiv4: {
      padding: 0,
      margin: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: 'grey'
  }, 
  }

export class GoogleCrisisMap extends Component {
  constructor(props) {
    super(props);
  }
    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };

renderMap(){
  return(
    <iframe width="400" height="400" src="http://google.org/crisismap/weather_and_events?hl=en-GB&llbox=58.12%2C7.17%2C-39.68%2C-146.02&t=TERRAIN&layers=30%2C1%2C31%2C32%2C20%2C12%2Clayer9%2C2%2C10%2C6%2C13%2Clayer0%2Clayer1%2C14%2C3%3A100%2C8%2C7%2C9%2C5%2C4%2C1340721268837%2C1343411315379%2Clayer7%2Clayer8%2Clayer10%2C24&embedded=true" style="border: 1px solid #ccc"></iframe>
  );
}
  render() {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log("render GoofleCrisisMap");
        return (
          <div  id="googlecontainer" style={styles.container4} > 
              
              <div id="googlemap" style={ styles.mapDiv4 } >
              <iframe style={{width:"100%", height:"100%", style:"border: 1px solid #ccc"}} 
              src="http://google.org/crisismap/weather_and_events?hl=en-GB
              &llbox=`$this.props.glatitude` %2C7.17%2C-39.68%2C`$this.props.glongitude`
              &t=TERRAIN
              &layers=30%2C1%2C31%2C32%2C20%2C12%2C
              layer9%2C2%2C10%2C6%2C13%2C
              layer0%2C
              layer1%2C14%2C3%3A100%2C8%2C7%2C9%2C5%2C4%2C1340721268837%2C1343411315379%2C
              layer7%2C
              layer8%2C
              layer10%2C24
              &embedded=true" ></iframe>
              </div>
          </div>
        ); 
  }//render
}//class
 export default GoogleCrisisMap;