import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { loadModules } from 'esri-loader';
// import { Zoom } from "./Zoom";

const options = {
    //url: 'https://js.arcgis.com/4.6/'
    url: 'https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2'
};
       // &callback=initMap")

const styles =  {
    container: {
        height: '100vh',
        width: '100vw'
    },
    mapDiv: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '100%'
    },
}

export class BaseMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'loading'
        }
    }

    componentDidMount() {
        loadModules(['esri/Map', 'esri/views/MapView',  './WidgetContainer','dojo/domReady!'], options)
            .then(([Map, MapView]) => {
                const map = new Map({ basemap: "streets" });
                const view = new MapView({
                    container: "viewDiv",
                    map,
                    zoom: 3,
                    center: [78.4867, 17.3850]
                });
                view.then(() => {
                    this.setState({
                        map,
                        view,
                        status: 'loaded'
                    });
                });
                map.on('load', function() {
                    LocatorContainer.addContainer(map);
                });

                // const node = document.createElement("div");
                // view.ui.add(node, "bottom-left");
                // ReactDOM.render(<Zoom view={view} />, node);
            })  
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

export default BaseMap;