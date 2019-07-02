import React, { Component } from 'react';
import "./DetailDisasterSummary.css";


class CarouselLeftArrow extends Component {
    render() {
// const CarouselLeftArrow = () => {
        return (
        <a
            href="#"
            className="carousel__arrow-left"
            onClick={this.props.onClick}
        >
            {/* <span className="fa-fa-2x-fa-angle-left" /> */}
        </a>
        );
//}
    }
}

class CarouselRightArrow extends Component {
    render() {
//const CarouselRightArrow = () => {
        return (
        <a
            href="#"
            className="carousel__arrow-right"
            onClick={this.props.onClick}
        >
            {/* <span className="fa-fa-2x-fa-angle-right" /> */}
        </a>
        );
//}
    }
}

class CarouselIndicator extends Component {
    render() {
//const CarouselIndicator = () => {
            return (
            <li>
                <a
                className={
                    this.props.index == this.props.activeIndex
                    ? "carousel__indicator--active"
                    : "carousel__indicator"
                }
                onClick={this.props.onClick}
                />
            </li>
            );
//}
    }
}

class CarouselSlide extends Component {
    render() {
        // console.log("*******",this.props.slide.content);
        // console.log("*******",this.props.slide.date);
//const CarouselSlide = () => {
        return (
        <li
            className={
            this.props.index == this.props.activeIndex
                ? "carousel__slide--active"
                : "carousel__slide"
            }
        >
             <p>
                <strong className="carousel-slide__author">
                    {this.props.slide.date}
                    
                 </strong>
            </p>
            <p className="carousel-slide__content">
                    {this.props.slide.content}
                  
            </p>

           
        </li>
        );
//}
    }
}

// Carousel wrapper component
//class Carousel extends Component 
export class DetailDisasterSummary extends Component 
{
        constructor(props) {
            super(props);

            this.goToSlide = this.goToSlide.bind(this);
            this.goToPrevSlide = this.goToPrevSlide.bind(this);
            this.goToNextSlide = this.goToNextSlide.bind(this);

            this.state = {
            activeIndex: 0
            };
        }

        goToSlide(index) {
            this.setState({
            activeIndex: index
            });
        }

        goToPrevSlide(e) {
            e.preventDefault();

            let index = this.state.activeIndex;
            let { slides } = this.props;
            let slidesLength = slides.length;

            if (index < 1) {
            index = slidesLength;
            }

            --index;

            this.setState({
            activeIndex: index
            });
        }

        goToNextSlide(e) {
            e.preventDefault();

            let index = this.state.activeIndex;
            let { slides } = this.props;
            let slidesLength = slides.length - 1;

            if (index === slidesLength) {
            index = -1;
            }

            ++index;

            this.setState({
            activeIndex: index
            });
        }

        render() 
        {
            return (
                <div className="carousel-container">
                        <div className="carousel">
                            <CarouselLeftArrow onClick={e => this.goToPrevSlide(e)} />

                            <ul className="carousel__slides">
                            {this.props.slides.map((slide, index) =>
                                <CarouselSlide
                                key={index}
                                index={index}
                                activeIndex={this.state.activeIndex}
                                slide={slide}
                                />
                            )}
                            </ul>
                
                            <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />

                            <ul className="carousel__indicators">
                            {this.props.slides.map((slide, index) =>
                                <CarouselIndicator
                                key={index}
                                index={index}
                                activeIndex={this.state.activeIndex}
                                isActive={this.state.activeIndex==index} 
                                onClick={e => this.goToSlide(index)}
                                />
                            )}
                            </ul>
                        </div>
                </div>
            );
        }
}

