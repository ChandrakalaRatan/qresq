import React, { Component } from 'react';
import "./TwitterSocialPage.css";

import drawBarChart from "./TwitterBarChart";
import drawWordCloud from "./TwitterWordCloud";



import './cloud';

const styles =  {
    twitterSocialDiv: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '120%'
    }, 
}
  
export class TwitterSocialPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            locTwitterBarChartData: [],
            locTwitterBarChartFlag: false,
            locTwitterWorldCloudData: [],
            locTwitterWorldCloudFlag: false,
            locTweetsPerHourData:{},
            locTweetsPerDayData:{}
        }
    }
    componentDidMount() 
    {  
        console.log("entering componentDidMount TWITTERSOCIALPAGE");
        this.wordCloudFetch();
        this.barChartFetch();
        this.tweetsPerHourFetch();
        this.tweetsPerDayFetch();
        console.log("leaving componentDidMount TWITTERSOCIALPAGE");  

    }
    tweetsPerDayFetch() 
    {  
        console.log("entering totalTweetFetch TWITTERSOCIALPAGE");
        const endPoint =   "http://167.86.104.221:8050/api/dasboard/tweetTrending?index=twitter_social&eventId="
                            // +this.props.SingleDisasterDataRecord.qresqid+"&groupBy=DAY";
                            +"999"+"&groupBy=DAY";
            fetch(endPoint,{
                headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "GET"
                })
                .then(response => response.json()) 
                .then(json => {
                    console.log("tweetsPerDayFetch",json.results);
                    this.setState({
                        locTweetsPerDayData: json.results,
                    }) 
                        
                })
                .catch(error =>{
                    console.log("ERROR" + error);     
                })
                console.log("leaving totalTweetFetch TWITTERSOCIALPAGE");              
    }
    tweetsPerHourFetch() 
    {  
        console.log("entering totalTweetFetch TWITTERSOCIALPAGE");
        const endPoint =   "http://167.86.104.221:8050/api/dasboard/tweetTrending?index=twitter_social&eventId="
                            // +this.props.SingleDisasterDataRecord.qresqid+"&groupBy=HOUR";
                            +"999"+"&groupBy=HOUR";
            fetch(endPoint,{
                headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "GET"
                })
                .then(response => response.json()) 
                .then(json => {
                    console.log("tweetsPerHourFetch",json.results);
                    this.setState({
                        locTweetsPerHourData: json.results,
                    }) 
                        
                })
                .catch(error =>{
                    console.log("ERROR" + error);     
                })
                console.log("leaving totalTweetFetch TWITTERSOCIALPAGE");              
    }
    barChartFetch() 
    {  
        console.log("entering barChartFetch TWITTERSOCIALPAGE");
        const endPoint =   "http://167.86.104.221:8050/api/dasboard/tweetTrending?index=twitter_social&eventId="
                            // +this.props.SingleDisasterDataRecord.qresqid;
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
                    console.log(")))))))))))))))))))))))))))))))))))))))")
                    console.log("json.results",json.results);
                    this.setState({
                        locTwitterBarChartData: json.results,
                        locTwitterBarChartFlag: true
                    }) 
                        
                })
                .catch(error =>{
                    console.log("ERROR" + error);     
                })
                console.log("leaving barChartFetch TWITTERSOCIALPAGE");              
    }

    wordCloudFetch() 
    {  
        console.log("entering wordCloudFetch TwitterWordCloudPage");
        console.log("eventId", this.props.SingleDisasterDataRecord.qresqid);
        
        const endPoint = "http://167.86.104.221:8050/api/dasboard/wordCloud?index=test_wordcloud&eventId="
                        //+this.props.SingleDisasterDataRecord.qresqid;
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
                this.setState({
                    locTwitterWorldCloudData: json.results,
                    locTwitterWorldCloudFlag: true
                }) 
            //console.log("this.state.locTwitterWorldCloudData",this.state.locTwitterWorldCloudData);                
        })
        .catch(error =>{
                    console.log("ERROR" + error);     
        })
        console.log("leaving wordCloudFetch TwitterWordCloudPage");   
    }

    componentDidUpdate(){
        const wordcloudselector = document.getElementById('wordcloud'); 
        const barchartselector = document.getElementById('barchart'); 
        var wordCloudJsonData =[];
        var barChartJsonData =[];
        this.state.locTwitterWorldCloudData.map(data =>{
            
                if(data.totalTweets > 0 && data.totalTweets <= 1000)
                {
                    wordCloudJsonData.push({
                        text: data.word,
                        totalTweets: data.totalTweets,
                        size: 24
                    })
                    
                }
                else if(data.totalTweets > 1000 && data.totalTweets <= 5000){
                    wordCloudJsonData.push({
                        text: data.word,
                        totalTweets: data.totalTweets,
                        size: 34
                    })
                    
                }
                else if(data.totalTweets > 5000 && data.totalTweets <= 10000){
                    wordCloudJsonData.push({
                        text: data.word,
                        totalTweets: data.totalTweets,
                        size: 44
                    })
                }
        });
 
        if(this.state.locTwitterWorldCloudFlag === true){ 
            drawWordCloud(wordCloudJsonData, wordcloudselector);
            this.setState({
                locTwitterWorldCloudFlag: false
            });
        }
        
        //if(barchartselector && this.state.locTwitterBarChartData ){ 
        if(this.state.locTwitterBarChartFlag === true){
            console.log("+++++++++++++++++++",this.state.locTwitterBarChartData);
            
            drawBarChart(this.state.locTwitterBarChartData, barchartselector);
            this.setState({
                locTwitterBarChartFlag: false
            });
        }
    }

    renderTwitterPanel(){
        console.log("renderPanel TWITTERSOCIALPAGE");
        return(
            <div className="tweet-container">
                <div className="tweet-inner-upper-container">
                    <div id="wordcloud" className="tweet-inner-upper-container-subpanel1"/>

                    <div id="barchart" className="tweet-inner-upper-container-subpanel2" />

                </div>

                <div className="tweet-inner-lower-container">
                    <div className="tweet-panel">
                        <div className="tweet-panel-div1">
                            <div className="tweet-text-div">
                                <label className="tweet-total-text">TOTAL TWEETS</label>
                            </div>
                            <div className="tweet-value-div">
                                <label className="tweet-total-value">{this.props.totalTweets}</label>
                            </div>
                        </div>
                        <div className="tweet-panel-div2">
                            <div className="tweet-text-div">
                                <label className="tweet-day-text" >TWEETS/DAY</label>
                            </div>
                            <div className="tweet-value-div">
                                {/* <label className="tweet-day-value">{this.state.locTweetsPerDayData}</label>  */}
                            </div>
                        </div>
                        <div className="tweet-panel-div3">
                            <div className="tweet-text-div">
                                <label className="tweet-hour-text">TWEETS/HOUR </label>
                            </div>
                            <div className="tweet-value-div">
                                {/* <label className="tweet-hour-value">{this.state.locTweetsPerHourData}</label>  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        console.log("!!!!!!!!!!!!!!!!!!!!"); 
        console.log("render TWITTERSOCIALPAGE"); 
        return(
            <div id='twitterSocialDiv' style={ styles.twitterSocialDiv } >
                {this.renderTwitterPanel()}
            </div>
        );
    }

}//class
