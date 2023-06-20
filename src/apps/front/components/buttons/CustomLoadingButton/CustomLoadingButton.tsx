import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

type LoadingButtonProps = {
  variant?: "text" | "contained" | "outlined" | undefined
    disabled: boolean
    loading: boolean
    sx?: SxProps
    onClick?: () => void
    children: string
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    autoFocus?: boolean
    type?: "button" | "reset" | "submit"
  } 

export const CustomLoadingButton = ({variant, disabled, loading, sx, onClick, children, color, autoFocus, type}: LoadingButtonProps) => {
  
  return (
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Button
          variant={variant}
          sx={sx}
          disabled={disabled}
          onClick={onClick}
          color={color}
          autoFocus={autoFocus}
          type={type}
        >
          {children}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
  );
}