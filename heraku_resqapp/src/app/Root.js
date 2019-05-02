import React, { Component } from "react";
import { render } from "react-dom";

import {Header} from "./Components/Header/Header";
import { Row, Col, Container } from 'reactstrap';


export class Root extends React.Component {
    render(){
            let renderData;
            renderData = (
                this.props.children
            );
    
        return (
            <Container>
            <Row className="justify-content-md-center">
                <Col sm="12">
                    <Header/>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                 {renderData}
                </Col>
            </Row>
            </Container>
        );
    }
}
