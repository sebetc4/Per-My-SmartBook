import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow, Navigation, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useMediaQuery, useTheme } from '@mui/material';
import { CommonStoryBeingGeneratedPreview } from '../../../../../../../packages/types';
import { CommonStoryCard } from '../CommonStoryCard/CommonStoryCard';

type MediaQuery = {
    upXs: boolean;
    upSm: boolean;
};

const initialMediaQuery: MediaQuery = {
    upXs: false,
    upSm: false,
};

type CommonStoriesCarouselProps = {
    commonStoriesPreviews: CommonStoryBeingGeneratedPreview[];
};

export const CommonStoriesCarousel = ({ commonStoriesPreviews }: CommonStoriesCarouselProps) => {
    // Hooks
    const theme = useTheme();
    const isUpXsScreen = useMediaQuery(theme.breakpoints.up('xs'));
    const isUpSmScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const [mediaQuery, setMediaQuery] = useState<MediaQuery>(initialMediaQuery);

    useEffect(() => {
        setMediaQuery({
            upXs: isUpXsScreen,
            upSm: isUpSmScreen,
        });
    }, [isUpXsScreen, isUpSmScreen]);

    return (
        <>
            <style>
                {`
                    :root {
                        --swiper-theme-color: ${theme.palette.primary.main};
                        --swiper-navigation-size: 24px
                    }
                    .swiper-button-prev, .swiper-button-next {
                        width: 48px !important;
                        height: 48px !important;
                        display: flex !important;
                        justify-content: center !important;
                        align-items: center !important;
                        background-color: ${theme.palette.primary.main};
                        color: ${theme.palette.primary.contrastText};
                        border-radius: 50% !important;
                    }
                    .swiper-pagination {
                        bottom: 10px !important;
                    }
                `}
            </style>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={ 'auto'}
                navigation={isUpSmScreen && commonStoriesPreviews.length > 1}
                pagination={{
                    clickable: true,
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow, Navigation, Pagination, A11y]}
                style={{
                    paddingLeft: mediaQuery.upSm ? '48px' : '0',
                    paddingRight: mediaQuery.upSm ? '48px' : '0',
                    paddingTop: '24px',
                    paddingBottom: '24px',

                }}
            >
                {commonStoriesPreviews.map((story) => (
                    <SwiperSlide
                        key={story.id}
                        style={{ maxWidth: '350px' }}
                    >
                            <CommonStoryCard
                                story={story}
                            />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
