import { useTheme } from '@mui/material';
import React from 'react';
import { lightenHexColor } from '../../../../../packages/functions';

type CheckMarkSvgProps = {
    isCkecked: boolean;
    disabled?: boolean;
};

export const CheckMarkSvg = ({ isCkecked, disabled }: CheckMarkSvgProps) => {
    const theme = useTheme();
    const styles = `
    .checkmark__circle {
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
      stroke-width: 2;
      stroke-miterlimit: 10;
      stroke: ${disabled ? lightenHexColor(theme.palette.success.main, 0.8) : theme.palette.success.main};
      fill: none;
    }
    .checkmark {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: block;
      stroke-width: 2;
      stroke: #fff;
      stroke-miterlimit: 10;
      box-shadow: inset 0px 0px 0px ${disabled ? lightenHexColor(theme.palette.success.main, 0.8) : theme.palette.success.main};
    }
    .checkmark__check {
      transform-origin: 50% 50%;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
    }
    .animate.checkmark {
      animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
    }
    .animate .checkmark__circle {
      animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    }
    .animate .checkmark__check {
      animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
    }
    @keyframes stroke {
      100% {
        stroke-dashoffset: 0;
      }
    }
    @keyframes scale {
      0%,
      100% {
        transform: none;
      }
      50% {
        transform: scale3d(1.1, 1.1, 1);
      }
    }
    @keyframes fill {
      100% {
        box-shadow: inset 0px 0px 0px 30px ${disabled ? lightenHexColor(theme.palette.success.main, 0.8) : theme.palette.success.main};
      }
    }
  `;

    return (
        <>
            <style>{styles}</style>
            <svg
                className={`checkmark ${isCkecked ? 'animate' : ''}`}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 52 52'
            >
                <circle
                    className='checkmark__circle'
                    cx='26'
                    cy='26'
                    r='25'
                    fill='none'
                />
                <path
                    className='checkmark__check'
                    fill='none'
                    d='M14.1 27.2l7.1 7.2 16.7-16.8'
                />
            </svg>
        </>
    );
};
