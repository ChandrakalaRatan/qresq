import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {ButtonToolbar, Button } from 'react-bootstrap';
import { loadModules } from 'esri-loader';
import {FullSummaryReport} from './FullSummaryReport';
import {SocialMediaSector} from './SocialMediaSector';
import { DetailDisasterReport } from './DetailDisasterReport';
import "./AffectedAreaMap.css";
import {Animated} from "react-animated-css";

const options = {
    url: 'https://js.arcgis.com/4.8/'
};
const styles =  {
    container: {
        padding: 0,
        margin: 0,
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
// var detailreportdiv;
// var fullSummeryFlag= false;
// var socialMediaFlag= false;
// var removeflag= false;
// var disasterDataRecord= [];
// var detailDisasterData= [];
// var detailDisasterDataflag= false;

export class AffectedAreaMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullSummeryFlag: false,
            socialMediaFlag: false,
            removeflag: false,
            disasterDataRecord: [],
            detailDisasterData: [],
            detailDisasterDataflag: false
        }
    }

    

    componentDidMount() 
    {  
        console.log("entering componentDidMount AFFECTEDAREAMAP");
        const endPoint = "http://185.178.86.165:8080/api/qresq/search";
        fetch(endPoint,{
            headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        exactMatch : true,
                        filters: [
                                    {
                                        fieldName: "country",
                                        //value: "Bangladesh"
                                        value: this.props.disasterDataRecord.country
                                    },
                                    {
                                        fieldName: "disasterType",
                                        //value: "LS"
                                        value: this.props.disasterDataRecord.disasterType
                                    },
                                    {
                                        fieldName: "geolocation",
                                        //value: "23.84,90.27",
                                        value: this.props.glatitude+","+this.props.glongitude,
                                        type : "GEO_DISTANCE",
                                        distance : 10
                                    }
                        ],
                        from: 0,
                        indexName: "test_summary_1",
                        size: 10 
                    })
                })
                .then(response => response.json()) 
                .then(json => {
                    this.setState({
                        detailDisasterData: json.results,
                        detailDisasterDataflag: true,
                        disasterDataRecord: this.props.disasterDataRecord
                    }) 
                    // disasterDataRecord =  json.results;
                    // detailDisasterDataflag = true;
                    // disasterDataRecord= this.props.disasterDataRecord
                })
                // .catch(error =>{
                // console.log("ERROR" + error);     
                // })
            console.log("leaving componentDidMount AFFECTEDAREAMAP");              
    }


    componentDidUpdate(){
        console.log("entering componentDidUpdate AFFECTEDAREAMAP");
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
console.log("this.props.glongitude",this.props.glongitude, "this.props.glatitude", this.props.glatitude,"this.props.mapcolor", this.props.mapcolor);
                
            // Create the MapView
            const view = new MapView({
                container: "viewDiv",
                map: map,
                zoom: 6,
                center: [this.props.glongitude, this.props.glatitude]
                ,spacialReference: featureLayer.spacialReference
            });
            view.graphics.add({
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: this.props.mapcolor,
                    text: "\ue61d", // esri-icon-map-pin
                    font: {
                        size: 15,
                        family: "CalciteWebCoreIcons"
                    }       
                },
                geometry: {
                    type: "point",
                    longitude: this.props.glongitude,
                    latitude: this.props.glatitude
                }
            });       
        }); 
        console.log("leaving componentDidUpdate AFFECTEDAREAMAP");
    }

    renderMap() {    
        console.log("inside renderMap in AFFECTEDAREAMAP ");
        if(this.state.status === 'loading') {
            return <div>loading</div>;
        }
    }//renderMap
   
 
    renderButton()
    {
        console.log("inside renderButton in AFFECTEDAREAMAP ");
        return(
            <div className="panel-summery-button">
                <ButtonToolbar className="summary-button-group"
                                    onClick={this.handleSubmitButtonClick.bind(this)}>
                    <Button className="see-full-summary-button" type="submit" id="fullsummary">SEE FULL SUMMARY</Button>
                    <Button className="see-social-media-sector-button" type="submit"  id="socialmedia">SEE SOCIAL MEDIA SECTOR</Button>    
                </ButtonToolbar>
            </div>
        )
    }
    handleSubmitButtonClick(e){

        this.setState({detailDisasterDataflag: false});
        if(e.target.id === "fullsummary")
        {
            this.setState({fullSummeryFlag: true
            });
        }
        if(e.target.id === "socialmedia")
        {
            this.setState({
                socialMediaFlag: true
            });
        }
        
           // document.getElementById("viewDiv").removeChild(document.getElementById("detailDiv"));
           console.log("this.state.fullSummeryFlag",this.state.fullSummeryFlag);
           console.log("this.state.socialMediaFlag",this.state.socialMediaFlag);
           console.log("i in secoial media button");      
        this.render();  
    }
    render() {
        console.log("**********************");
        console.log("render AFFECTEDAREAMAP");
        return(
        // <div className="resq-wrapper" id="newDiv"> 
            <div id="mapDiv" style={styles.container}> 
                <div id='viewDiv' style={ styles.mapDiv } >
                    {this.renderMap()}
                    {this.renderButton()} 
                </div> 
                {/* </div> */}
                
                    { this.state.detailDisasterDataflag
                     //   || detailDisasterDataflag && !removeflag 
                      ?
                        <div id="detailDiv"> 
                            <DetailDisasterReport  
                            disasterDataRecord={this.state.disasterDataRecord} 
                            detailDisasterData={this.state.detailDisasterData[0]}/> 
                        </div>
                            : null
                    } 
                    {  this.state.socialMediaFlag 
                       // || socialMediaFlag
                        ? 
                        <div id="socialDiv"> 
                            <SocialMediaSector 
                            glatitude={this.props.glatitude} 
                            glongitude={this.props.glongitude}/>
                        </div>
                            :null                        
                    }
                    {   this.state.fullSummeryFlag 
                        //|| fullSummeryFlag
                        ? 
                        <div id="summaryDiv"> 
                            <FullSummaryReport 
                            glatitude={this.props.glatitude} 
                            glongitude={this.props.longitude}/>
                        </div>
                            :null
                            //,document.getElementById('mapDiv'))
                            // ReactDOM.render(  
                    } 
                {/* </div>  */}
            
        </div> 
        ) 
    }//render
}//class

export default AffectedAreaMap;