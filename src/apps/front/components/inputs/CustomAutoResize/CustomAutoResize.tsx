import { TextareaAutosize, TextareaAutosizeProps, styled } from '@mui/material';
import { ChangeEvent } from 'react';

const TextareaAutosizeStylized = styled(TextareaAutosize)<TextareaAutosizeProps>(({ theme }) => ({
    width: '100%',
    resize: 'none',
    height: '150px',
    fontSize: '1rem',
    padding: '10px',
    borderRadius: '10px',
    border: '2px solid #ccc',
    transition: 'border-color 0.3s ease-in-out',
    backgroundColor: theme.textarea.backgroundColor,
    color: theme.textarea.color,
    '&:focus, &:active': {
        border: `2px solid ${theme.palette.primary.main}}`,
        outline: 'none',
    }
}));

type CustomAutoResizeProps = {
    placeholder: string;
    minRows: number;
    maxRows: number;
    disabled?: boolean;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    value: string
};

export const CustomAutoResize = ({
    placeholder,
    minRows,
    maxRows,
    disabled,
    onChange,
    value,
}: CustomAutoResizeProps) => {
    return (
        <TextareaAutosizeStylized
            placeholder={placeholder}
            minRows={minRows}
            maxRows={maxRows}
            disabled={disabled}
            onChange={onChange}
            value={value}
        />
    );
};
