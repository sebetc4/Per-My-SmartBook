import BookImage1 from '../../../../../public/images/books/book1.png';
import BookImage2 from '../../../../../public/images/books/book2.png';
import BookImage3 from '../../../../../public/images/books/book3.png';
import BookImage4 from '../../../../../public/images/books/book4.png';
import BookImage5 from '../../../../../public/images/books/book5.png';
import BookImage6 from '../../../../../public/images/books/book6.png';
import BookImage7 from '../../../../../public/images/books/book7.png';
import BookImage8 from '../../../../../public/images/books/book8.png';
import BookImage9 from '../../../../../public/images/books/book9.png';

export const getRandomBookImage = () => {
    const images = [
        BookImage1,
        BookImage2,
        BookImage3,
        BookImage4,
        BookImage5,
        BookImage6,
        BookImage7,
        BookImage8,
        BookImage9,
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
};
