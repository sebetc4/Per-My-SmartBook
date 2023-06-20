import {useState} from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { UseFormRegisterReturn} from 'react-hook-form';

type CustomSelectInputProps = {
    label: string;
    items: {
        label: string;
        value: string;
    }[];
    register: UseFormRegisterReturn;
    errorMessage: string | null;
    required?: boolean;
    defaultValue?: string;
    width?: string;
    variant?: 'standard' | 'outlined' | 'filled';
    onChange?: (e: SelectChangeEvent) => void;
};

export const CustomSelectInput = ({ label, items, register, errorMessage, required, defaultValue, variant, width, onChange }: CustomSelectInputProps) => {

    const [value, setValue] = useState(defaultValue || '');

    const handleChange = (e: SelectChangeEvent) => {
        setValue(e.target.value);
        onChange && onChange(e);
    };

        return (
        <FormControl
            error={!!errorMessage}
            variant={variant}
            required={required}
            sx={{width: width || '100%'}}
        >
            <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
            <Select
                labelId={`select-label-${label}`}
                id={`select-${label}`}
                label={label}
                value={value}
                {...register}
                onChange={handleChange}
                color='primary'
            >
                {items.map((item) => (
                    <MenuItem
                        key={`select-${label}-item${item.label}`}
                        value={item.value}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            {!!errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};
