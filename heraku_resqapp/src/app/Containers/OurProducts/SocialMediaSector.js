import React, { Component } from 'react';
import { loadModules } from 'esri-loader';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "./SocialMediaSector.css";
import {TwitterSocialPage} from "./TwitterSocialPage";
import drawPieChart from "./SocialMediaPieChart";

const style =  {
    // SocialMediaDiv: {
    //     margin: 0,
    //     height: '80%',
    //     width: '80%'
    // }
}
export class SocialMediaSector extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                locSentimentData: {},
                locSentimentFlag: false,
                twitterFlag: false,
                newsFlag: false,
                blogFlag: false,
                forumFlag: false,
                positiveTweets: 0,
                negativeTweets:0,
                neutralTweets: 0,
                totalTweets: 0,
                totalMentions: 100000,
                blogMentions: 200000,
                newsMentions: 90000,
                forumMentions: 60000,
                blogPercentage:0,
                forumPercentage:0,
                newsPercentage:0,
                twitterPercentage:0
            }
        }
    componentDidMount() 
    {  
            console.log("entering componentDidMount SOCIALMEDIASECTOR");
            const endPoint1 =  "http://167.86.104.221:8050/api/tweet/fetchSentiment?index=twitter_social&eventId="
                                //+this.props.SingleDisasterDataRecord.qresqid;
                                +"999";
            fetch(endPoint1,{
                headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "GET"
                    })
                    .then(response => response.json()) 
                    .then(json => {
                        this.setState({
                            locSentimentData: json.results,
                            locSentimentFlag: true,
                            totalTweets: json.results.totalTweets,
                            positiveTweets: Math.round((json.results.postiveTweets/json.results.totalTweets)*100)-10,
                            negativeTweets: Math.round((json.results.negativeTweets/json.results.totalTweets)*100),
                            neutralTweets:  Math.round( ( (json.results.totalTweets -
                                                            (json.results.negativeTweets+json.results.postiveTweets))
                                                             /json.results.totalTweets)*100)+10
                        }) 
                        console.log("json.results",json.results);
                        console.log("locSentimentData",this.state.locSentimentData);
                        console.log("positiveTweets",this.state.positiveTweets);
                        console.log("negativeTweets",this.state.negativeTweets);
                        console.log("neutralTweets",this.state.neutralTweets);  
                    })
                    .catch(error =>{
                    console.log("ERROR" + error);     
                    })
                  
                    
                console.log("leaving componentDidMount SOCIALMEDIASECTOR");              
    }
    componentDidUpdate(){
        const pieChartSelector = document.getElementById('piechart'); 
        const pieChartJsonData = {Twitter:this.state.twitterPercentage,
                                  //Blog: this.state.blogPercentage,
                                  News: this.state.newsPercentage
                                  //Forum: this.state.forumPercentage
                                };
        if(this.state.locSentimentFlag === true){
            drawPieChart(pieChartJsonData, pieChartSelector)
            this.setState({
                locSentimentFlag: false
            });
        }  
    }
    renderUpperLeftPanel(){
        return(
                <div className="social-inner-upper-left-panel">
                    <div className="total-mention">
                        <div className="total-mention-text-div">
                            <label className="total-mention-text">
                                TOTAL MENTIONS
                            </label>
                        </div>
                        <div className="total-mention-value-div">
                            <label className="total-mention-value">
                            {this.state.totalMentions}
                            </label>
                        </div>
                    </div>

                    <div className="overall-mention-label-div">
                        <label className="overall-mention-label">OVERALL MENTIONS</label>
                    </div>

                    <div className="blog-twitter-news-forum-button-div">
                        {/* <div className="blog-div">
                            <div className="blog-label-div">
                                <label className="button-header-text">BLOG</label>
                            </div>
                            <div className="blog-button-div" >
                                <div className="blog-shade-div"  style= {{ width: this.state.blogPercentage+'%'}}/>
                                <div className="percentage1-div" >
                                    <label className="button-text">{this.state.blogPercentage}% </label>
                                </div>
                                <div className="label-div">
                                    <label className="button-text">{this.state.blogMentions}</label>
                                </div>
                                
                             </div>
                             <button className="button"type="submit"id="blog" onClick={this.socialMediaButtonClick.bind(this)}/>
                        </div>
                        <div className="forum-div">
                            <div className="forum-label-div">
                                <label className="button-header-text">FORUM</label>
                            </div>
                            <div className="forum-button-div" >
                                <div className="forum-shade-div"   style= {{ width: this.state.forumPercentage+'%'}}/>
                               
                                <div className="percentage1-div">
                                    <label className="button-text">{this.state.forumPercentage}% </label>
                                </div>
                                <div className="label-div">
                                    <label className="button-text">{this.state.forumMentions}</label>
                                </div>
                            </div>
                            <button className="button1"type="submit"id="forum" onClick={this.socialMediaButtonClick.bind(this)}/>
                        </div> */}
                        <div className="twitter-div">
                            <div className="twitter-label-div">
                                <label className="button-header-text">TWITTER</label>
                            </div>
                            <div className="twitter-button-div" >
                                <div className="twitter-shade-div" style= {{ width: this.state.twitterPercentage+'%'}}/>
                                <div className="percentage1-div" >
                                    <label className="button-text">{this.state.twitterPercentage}% </label>
                                </div>
                                <div className="label-div">
                                    <label className="button-text"> {this.state.totalTweets}</label>
                                </div>
                            </div>
                            <button className="button" type="submit" id="twitter" onClick={this.socialMediaButtonClick.bind(this)}/>
                        </div>
                        <div className="news-div" >
                            <div className="news-label-div">
                                <label className="button-header-text">NEWS</label>
                            </div>
                            <div className="news-button-div">
                                <div className="news-shade-div" style= {{ width: this.state.newsPercentage+'%'}}/>
                                <div className="percentage1-div" >
                                    <label className="button-text">{this.state.newsPercentage}%</label>
                                </div>
                                <div className="label-div">
                                    <label className="button-text">{this.state.newsMentions}</label>
                                </div>
                                </div>
                            <button className="button1" type="submit" id="news" onClick={this.socialMediaButtonClick.bind(this)}/>
                        </div>
                    </div>
                </div>
        );
    }
    renderPanel(){

        this.state.blogPercentage = Math.round((this.state.blogMentions/this.state.totalMentions)*100); 
        this.state.forumPercentage = Math.round((this.state.forumMentions/this.state.totalMentions)*100);
        this.state.newsPercentage = Math.round((this.state.newsMentions/this.state.totalMentions)*100);
        this.state.twitterPercentage = Math.round((this.state.totalTweets/this.state.totalMentions)*100);
        console.log("//////////////",this.state.twitterPercentage);
        console.log("renderPanel SOCIALMEDIASECOTR");
        return(
            <div className="social-panel" >
                <div className="social-upper-panel">
                    {this.renderUpperLeftPanel()}
                    <div id="piechart" className="social-inner-upper-right-panel"/>
                </div>
                <div className="social-lower-first-panel">
                <div className="social-lower-panel">
                        <div className="overall-sentiment-label-div">
                                <label className="overall-sentiment-label">OVERALL SENTIMENT</label>
                        </div>
                        
                        <div className="sentiment-bar">
                                <div className="sentiment-bar-negative" 
                                    style= {{   width: this.state.negativeTweets+'%', 
                                                marginLeft: '0%' }} >
                                    <div    className="sentiment-bar-negative-shade-div"
                                            style= {{   
                                                //width: this.state.negativeTweets+'%', 
                                                        marginLeft: '0%' }}/>
                                </div>
                                <div className="sentiment-bar-neutral"   
                                    style= {{   width: this.state.neutralTweets+'%', 
                                                marginLeft: this.state.negativeTweets+'%' }} >
                                    <div    className="sentiment-bar-neutral-shade-div" 
                                            style= {{   
                                                //width: this.state.neutralTweets+'%', 
                                                        marginLeft: '0%' }}/>
                                 </div>                            
                                <div className="sentiment-bar-positive"  
                                    style= {{   width: this.state.positiveTweets+'%', 
                                                marginLeft: (this.state.negativeTweets + this.state.neutralTweets)+'%' }} >
                                    <div    className="sentiment-bar-positive-shade-div"
                                            style= {{   
                                                //width: this.state.positiveTweets+'%', 
                                                        marginLeft: '0%' }}/>
                                </div>
                        </div>
                        
                        <div className="sentiment-bar-percentage-text-div">
                                <div className="sentiment-bar-negative-percentage-text-div" > 
                                    <label className="negative-percentage-text">{this.state.negativeTweets} %</label></div>
                                <div className="sentiment-bar-neutral-percentage-text-div" > 
                                    <label className="neutral-percentage-text"> {this.state.neutralTweets} %</label></div>
                                <div className="sentiment-bar-positive-percentage-text-div"  >
                                    <label className="positive-percentage-text"> {this.state.positiveTweets} %</label></div>
                        </div>

                        <div className="sentiment-description-text-div">
                                <label className="sentiment-description-text">
                                sentiments of conversation -
                                {this.state.positiveTweets} % positvie, 
                                {this.state.negativeTweets} % negative and  
                                {this.state.neutralTweets} % neutral
                                </label>
                        </div> 
                </div>
                </div>
            </div>
        );
    }
    socialMediaButtonClick(e)
    {
        if(e.target.id === "twitter")
        {
            console.log("######i am inside twitter button click");
            
            this.setState({twitterFlag: true}); 
        }
        if(e.target.id === "blog")
        {
            this.setState({blogFlag: true});  
        }
        if(e.target.id === "news")
        {
            this.setState({newsFlag: true});  
        }
        if(e.target.id === "forum")
        {
            this.setState({forumFlag: true});  
        }
    }
    render(){
        console.log("&&&&&&&&&&&&&&&&&&&&&&&"); 
        console.log("render SOCIALMEDIASECTOR"); 
        return(
                
                 //<div id="SocialMediaDiv" style={style.SocialMediaDiv}>
                 <div id="SocialMediaDiv">
                    {this.renderPanel()}
                    {this.state.twitterFlag &&
                    <TwitterSocialPage totalTweets={this.state.totalTweets} SingleDisasterDataRecord={this.props.SingleDisasterDataRecord}/>}
                    {this.state.newsFlag &&
                    <NewsSocialPage/>}
                    {this.state.blogFlag &&
                    <BlogSocialPage/>}
                    {this.state.forumFlag &&
                    <ForumSocialPage/>}
                </div>
        );
    }

}//class
