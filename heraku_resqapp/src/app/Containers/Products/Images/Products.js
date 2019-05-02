import React, {Component} from "react";
import {  Row, Col, Container } from 'reactstrap';

import './OurProduct.css';
import { ProductCards } from "./ProductCards";

export class Products extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            products: []
        }
    }

    componentDidMount(){
        var {prod1, prod2, prod3, prod4, prod5, prod6} = [];
        var  productlist =[];
        fetch('http://99.79.72.122/catalog/category/1/items/JSON')
        fetch('http://99.79.72.122/catalog/JSON')
        //fetch('https://jsonplaceholder.typicode.com/users')
    
        .then(res => res.json())
        .then(json => {
            json = json.Category;
            prod1 = json[0].items;
            prod2 = json[1].items;
            prod3 = json[2].items;
            prod4 = json[3].items;
            prod5 = json[4].items;
            prod6 = json[5].items;
            productlist = [...prod1, ...prod2, ...prod3, ...prod4, ...prod5, ...prod6];
            console.log(JSON.stringify(productlist));
                this.setState ({
                    isLoaded: true, 
                    json: json.Category,
                    products: productlist

                })
  
        })
    }
    
    render() {  
        var { isLoaded, products } = this.state;
        if(!isLoaded){
            return(<div> Loading ....</div>);
        }
        else{        
            let productCards = products.map(product => {
            return(
                <Col sm="6" className ="product-card" >
                    <ProductCards product={product} id={products.id}/>
                </Col>
            )
            })              
            return(
                <div className="product">
                    <div className="product-wrapper">
                        <div className="products-header">
                            <h3>Womens Collections</h3>
                        </div>
                        <Container className="product-row">
                        <Row >
                            {productCards}
                        </Row>
                        </Container> 
                     </div>
                </div>
            )//return
        }//else
    }//render
}//class