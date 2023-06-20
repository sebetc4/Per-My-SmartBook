import HourglassImage1 from '../../../../../public/images/hourglass/hourglass1.png';
import HourglassImage2 from '../../../../../public/images/hourglass/hourglass2.png';
import HourglassImage3 from '../../../../../public/images/hourglass/hourglass3.png';
import HourglassImage4 from '../../../../../public/images/hourglass/hourglass4.png';
import HourglassImage5 from '../../../../../public/images/hourglass/hourglass5.png';
import HourglassImage6 from '../../../../../public/images/hourglass/hourglass6.png';
import HourglassImage7 from '../../../../../public/images/hourglass/hourglass7.png';

export const getRandomHourglassImage = () => {
    const images = [
        HourglassImage1,
        HourglassImage2,
        HourglassImage3,
        HourglassImage4,
        HourglassImage5,
        HourglassImage6,
        HourglassImage7,
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
};
