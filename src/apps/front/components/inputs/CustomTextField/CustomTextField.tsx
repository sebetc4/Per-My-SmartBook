import { Box, TextField, TextFieldProps } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type CustomTextField = TextFieldProps & {
    name: string;
    register: UseFormRegisterReturn;
    errorMessage?: string;
};

export const CustomTextField = ({ name, register, errorMessage, ...props }: CustomTextField) => {
    return (
        <Box sx={{width: '100%'}}>
            <TextField
                required
                id={`${name}-input`}
                variant='outlined'
                fullWidth
                {...register}
                error={!!errorMessage}
                helperText={errorMessage}
                {...props}
            />
        </Box>
    );
};