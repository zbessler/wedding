import { Component, OnInit } from '@angular/core';
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

import { AnalyticsService } from '../../core/analytics';


@Component({
    selector: 'app-carousel',
    templateUrl: 'carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

    public carouselBanner: NgxCarousel;
    public carouselTileItems;

    constructor(private analyticsService: AnalyticsService) {}

    ngOnInit() {

        this.carouselTileItems = [
            {
                // title: 'Battery Project',
                // body: `Company X is developing a new type of battery that is 2x cheaper than 
                //         the state of the art in lithium ion battery technology. This tech, if 
                //         developed fully, can make energy storage systems affordable for most
                //         homes and businesses, helping them save money and reduce electricity waste.`,
                src: '../assets/photos/1.jpg'
            },
            { src: '../assets/photos/2.jpg' },
            { src: '../assets/photos/3.jpg' },
            { src: '../assets/photos/4.jpg' },
            { src: '../assets/photos/6.jpg' },
            { src: '../assets/photos/7.jpg' },
            { src: '../assets/photos/8.jpg' },
            { src: '../assets/photos/9.jpg' },
            { src: '../assets/photos/10.jpg' },
            { src: '../assets/photos/11.jpg' },
            { src: '../assets/photos/12.jpg' },
        ];


        this.carouselBanner = {
            grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
            slide: 1,
            speed: 400,
            interval: 6000000,
            point: {
                visible: true,
                pointStyles: `
                    .ngxcarousel {
                        width: 80%;
                        margin: auto;
                    }
                    .ngxcarouselPoint {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    .ngxcarouselPoint li {
                        display: inline-block;
                        background: #8860d0;
                        border-radius: 999px;
                        padding: 5px;
                        margin: 0 3px;
                        transition: .4s ease all;
                    }
                    .ngxcarouselPoint li.active {
                        border: 2px solid white;
                        top: 2px;
                        position: relative;
                        margin: 0 1px;
                    }
                `
            },
            load: 2,
            loop: true,
            touch: true
        };
    }

    /* This will be triggered after carousel viewed */
    afterCarouselViewedFn(data) {
        // console.log(data);
    }

    /* It will be triggered on every slide */
    onmoveFn(data: NgxCarouselStore) {
        this.analyticsService.emitEvent('Home', 'Move', 'Carousel Slide', data.currentSlide);
    }

}
