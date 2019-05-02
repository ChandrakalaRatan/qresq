
import React, { Component } from 'react';
import "./DetailDisasterReport.css";

export const DetailDisasterReport = (props) => {
    var summary;
    if(props.detailDisasterData)
        summary= props.detailDisasterData.summary;
    else
        summary = '';
    return(//className="panel" 
            <div className="panel">
                    <div className="panel-right-side">  
                        <div className="panel-text-display">
                        <label className="panel-label-header">DATE OF REPORT</label> <br/>
                        <label className="panel-label-value" >{props.disasterDataRecord.dateOccur}</label><br/>
                        <label className="panel-label-header">SUMMARY</label> <br/>
                        <label className="panel-label-value">{summary}</label><br/>
                        </div>  
                    </div>
                    {/* </Animated> */}
                    {/* <div className="panel-center-side">
                    <img src="KeraLAFloodScreen_elBlue_289304.png"/>
                    </div> */}
                    <div className="panel-left-side">
                        <div className="panel-text-display">
                        <label className="panel-label-header">DEAD</label> <br/>
                        <label className="panel-label-value">{props.disasterDataRecord.dead}</label><br/>
                        <label className="panel-label-header">DEATH FROM INFECTIOUS DIESEASE</label><br/> 
                        <label className="panel-label-value">{0}</label><br/>
                        <label className="panel-label-header">DIESEASE SPREAD</label> <br/>
                        <label className="panel-label-value">{0}</label><br/>
                        <label className="panel-label-header">PEOPLE MISSING</label> <br/>
                        <label className="panel-label-value">{props.disasterDataRecord.missing}</label><br/>
                        </div>
                    </div>
                   
            </div>
    );
}