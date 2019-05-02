import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import "./SocialMediaSector.css";

export const SocialMediaSector = (props) => {

    // function move() {
    //     var elem = document.getElementById("myBar");   
    //     var width = 1;
    //     var id = setInterval(frame, 10);
    //     function frame() {
    //       if (width >= 100) {
    //         clearInterval(id);
    //       } else {
    //         width++; 
    //         elem.style.width = width + '%'; 
    //       }
    //     }
    //   }

        console.log("#############################");
        console.log("render SOCIALMEDIASECOTR");
        return(
            <div className="panel-container">
                <div className="panel-inner-upper-container">
                
                    <div className="panel-inner-upper-left-button-panel">
                        <div className="panel-total-mention">
                            <div className="total-mention">
                            <br/><label className="total-mention-label">TOTAL MENSTIONS</label><br/>
                            <label className="total-mention-value">313,186</label>
                            </div>
                        </div>
                        <div className="panel-overall-mention-label">
                            <label className="overall-mention-label">
                            OVERALL MENTIONS
                            </label>
                        </div>
                        <div className="panel-overall-mention">
                        
                            <div className="blog-button-div">
                                <button className="blog-button" type="submit">
                                1%
                                </button>
                                {/* <label className="percentage-label" >1%</label> */}
                                <div className="label-div">
                                    <label className="total-value-label">2,236</label><br/>
                                    <label className="button-label">Blog</label>
                                </div>
                            </div>
                            <div className="forum-button-div">
                                <button className="forum-button" type="submit">
                                0%
                                </button>
                                {/* <label className="percentage-label">0%</label> */}
                                <div className="label-div">
                                    <label className="total-value-label">1,404</label><br/>
                                    <label className="button-label">Forum</label>
                                </div>
                            </div>
                            <div className="twitter-button-div">
                                <button className="twitter-button1" type="submit">
                                93%
                                </button>
                                {/* <label className="percentage-label"></label> */}
                                <div className="label-div">
                                    <label className="total-value-label">292,787</label><br/>
                                    <label className="button-label">Twitter</label>
                                </div>
                            </div>
                            <div className="news-button-div">
                                <button className="news-button" type="submit">
                                6%
                                </button>
                                {/* <label className="percentage-label">6%</label> */}
                                <div className="label-div">
                                    <label className="total-value-label">19,639</label><br/>
                                    <label className="button-label">News</label>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="panel-inner-upper-right-pie-panel">
                        <h1>pie panel</h1>
                    </div>
                </div>
                <div className="panel-inner-lower-container">
                        <div className="overall-sentiment-div">
                            <div className="overall-sentiment-label-div">
                                <label className="overall-sentiment-label">OVERALL SENTIMENT</label>
                            </div>
                            <div className="sentiment-bar">
                                <div className="negative1"/>
                                <div className="neutral"/>
                                <div className="positive"/>
                            </div>
                            <div className="percentage-div">
                                <div className="negative-percentage"> <label>37%</label></div>
                                <div className="neutral-percentage"> <label>43%</label></div>
                                <div className="positive-percentage"><label> 20%</label></div>
                            </div>
                        </div>
                        <div className="description-div">
                                <label className="description-label">
                                sentiments of conversation -20% positvie, 37% negative and 43% neutral
                                </label>
                        </div>
                    </div>
            </div>
            
        );

}//class
