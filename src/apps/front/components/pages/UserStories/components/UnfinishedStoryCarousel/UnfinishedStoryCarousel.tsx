import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow, Navigation, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useTheme } from '@mui/material';

import { UnfinishedStoryCard } from '..';
import { UnfinishedUserStoryPreview } from '../../../../../../../packages/types';
import { useAppMediaQuery } from '../../../../../hooks';

type UnfinishedStoryCarouselProps = {
    allUnfinishedStoriesPreviews: UnfinishedUserStoryPreview[];
};

export const UnfinishedStoryCarousel = ({ allUnfinishedStoriesPreviews }: UnfinishedStoryCarouselProps) => {
    // Hooks
    const theme = useTheme();
    const { mediaQuery } = useAppMediaQuery();


    // Constants
    const moreThanOneStory = allUnfinishedStoriesPreviews.length > 1;

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
                        bottom: 0 !important;
                    }
                `}
            </style>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={ 'auto'}
                navigation={moreThanOneStory && mediaQuery.upSm}
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
                    paddingBottom: '48px',
                    paddingTop: '48px',
                }}
            >
                {allUnfinishedStoriesPreviews.map((story) => (
                    <SwiperSlide
                        key={story.id}
                        style={{ maxWidth: '350px' }}
                    >
                        {({ isActive }) => (
                            <UnfinishedStoryCard
                                story={story}
                                isActive={isActive}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
