import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, Row, Col,
    CardTitle, CardSubtitle, Button} from 'reactstrap';

export class ProductCards extends React.Component{

    constructor(props){
        super(props);
    }
    render() { 
        if(this.props.product.image_url) {
            console.log(this.props.product.image_url);
        }  
        else {
            console.log(this.props.product.image_filename);
        } 
        
        return (
                <div >
                <Card key={this.props.id} >
                    <CardImg style={{ width: "20rem" }}top width = "20%" 
                    src={ this.props.product.image_url === ''
                    ?'../public/images/'+this.props.product.image_filename 
                    :this.props.product.image_url }  
                    alt=" " />
                    <CardBody >  
                        <CardTitle className="product-text1">{this.props.product.name}</CardTitle>
                        <CardSubtitle className="product-text2"> {this.props.product.description}</CardSubtitle>
                        <CardText className="product-text3"> Price per Quantity: {this.props.product.price} </CardText>
                        <Button className="product-button">Details</Button>
                    </CardBody>
                </Card>
                </div> 
    
         )// return
    }
}