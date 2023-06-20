import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper';
import { Chapter } from '../Chapter/Chapter';
import { Swiper as ISwiper } from 'swiper/types';

import { Button, useTheme } from '@mui/material';
import ButtonImage from 'public/images/buttons/arrow.png';
import Image from 'next/image';
import { Cover, Summary } from '..';
import { useAppMediaQuery, useAppSelector } from '~/apps/front/hooks';
import { LoadingContainer } from '~/apps/front/components/loading/LoadingContainer/LoadingContainer';

export const Book = () => {
    // Store
    const { storyData } = useAppSelector((state) => state.story);

    // State
    const [swiper, setSwiper] = useState<ISwiper | null>(null);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const theme = useTheme();
    const { mediaQuery } = useAppMediaQuery();

    const handleSlideChange = (swiper: ISwiper) => {
        setActiveSlide(swiper.activeIndex);
    };

    const navigateToSlide = (slide: number) => {
        swiper?.slideTo(slide, 500);
    };

    return storyData ? (
        <Swiper
            onSwiper={setSwiper}
            onSlideChange={handleSlideChange}
            grabCursor={true}
            effect={'cards'}
            modules={[EffectCards]}
            className='mySwiper'
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '900px',
            }}
        >
            <SwiperSlide>
                <Cover />
            </SwiperSlide>
            <SwiperSlide>
                <Summary navigateToSlide={navigateToSlide} />
            </SwiperSlide>
            {storyData?.allChapters.map((chapter, i) => (
                <SwiperSlide key={`chapter-${i + 1}`}>
                    <Chapter
                        chapter={chapter}
                        chapterIndex={i}
                    />
                </SwiperSlide>
            ))}
            {activeSlide !== storyData!.allChapters.length + 1 && mediaQuery.upXmd && (
                <Button
                    onClick={() => swiper?.slideNext()}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        zIndex: 99,
                        transform: 'translate(50%, -50%)',
                        borderRadius: '50%',
                    }}
                >
                    <Image
                        src={ButtonImage}
                        alt={'flèche de droite'}
                        width={100}
                        height={100}
                    />
                </Button>
            )}
            {activeSlide !== 0 && mediaQuery.upXmd && (
                <Button
                    onClick={() => swiper?.slidePrev()}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        zIndex: 99,
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                    }}
                >
                    <Image
                        src={ButtonImage}
                        alt={'flèche de droite'}
                        width={100}
                        height={100}
                        style={{
                            transform: 'rotate(180deg)',
                        }}
                    />
                </Button>
            )}
        </Swiper>
    ) : (
        <LoadingContainer/>
    )
};
