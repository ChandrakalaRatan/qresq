import React, { Component } from 'react';
import "./DetailDisasterSummary.css";

class CarouselLeftArrow extends Component {
    render() {
        return (
        <a
            href="#"
            className="carousel__arrow-left"
            onClick={this.props.onClick}
        />
        );
    }
}

class CarouselRightArrow extends Component {
    render() {
        return (  
        <a
            href="#"
            className="carousel__arrow-right"
            onClick={this.props.onClick}
        />
        );
    }
}

class CarouselIndicator extends Component {
    render() {
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
    }
}

class CarouselSlide extends Component {
    render() {
        return (
            <li
                className={
                this.props.index == this.props.activeIndex
                    ? "carousel__slide--active"
                    : "carousel__slide"
                }
            >
                <p className="carousel-slide-para">
                    <strong className="carousel-slide__date">
                        {this.props.slide.date}: 
                    </strong>
                    <strong className="carousel-slide__content">     
                            {this.props.slide.content}  
                    </strong>
                </p>
            </li>
        );
    }
}

// // Carousel wrapper component
// //class Carousel extends Component 
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
                            <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />
                        </div>
                </div>
            );
        }

    // constructor(props) {
    //     super(props);
    // }
    
    // render() 
    // {
    //     return (
    //             <div className="carousel-container">
    //                 <div className="carousel">
    //                     {this.props.slides.map(slide =>{
    //                         {slide.date}  {slide.content} 
    //                         console.log("&&&&&&&&&&&&",slide.date);
    //                         console.log("&&&&&&&&&&&&",slide.content);
    //                     <ul >
    //                         <li key = {slide.index} >
    //                         <p>{slide.date}: {slide.content} </p> 
    //                         <p className="carousel-slide-para">
    //                             <strong className="carousel-slide__date">
    //                                 {slide.date}: 
    //                             </strong>
    //                             <strong className="carousel-slide__content">     
    //                                 {slide.content}  
    //                             </strong>
    //                         </p></li>
    //                     </ul>
    //                     })}
    //                 </div>
    //             </div>
    //     );
    // }


}

