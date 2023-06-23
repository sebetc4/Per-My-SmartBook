import { Typography, TypographyProps } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

type CreationDateProps = {
    locale: string;
    date: string;
    sx?: TypographyProps;
};

const format: { [key in CreationDateProps['locale']]: string } = {
    fr: 'D MMMM YYYY',
    en: 'MMMM D, YYYY',
};

export const CreationDate = ({ locale, date, sx }: CreationDateProps) => {
    const {t: dateT} = useTranslation('date');
    dayjs.locale(locale);
    return <Typography {...sx}>{`${dateT('CreationDate.text')}${dayjs(date).format(format[locale])}`}</Typography>;
};
