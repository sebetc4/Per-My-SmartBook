/**
 * Common Types
 */
declare module '@mui/material/styles' {
    interface Theme {
        main: {
            backgroundColor: React.CSSProperties['color'];
            background: React.CSSProperties['color'];
            padding: React.CSSProperties['padding'];
        };
        header: {
            icon: {
                main: React.CSSProperties['color'];
                selected: React.CSSProperties['color'];
            };
            backgroundColor: React.CSSProperties['color'];
        };
        text: {
            title: React.CSSProperties['color'];
            subtitle: React.CSSProperties['color'];
            body: React.CSSProperties['color'];
        };
        papel: {
            backgroundColor: React.CSSProperties['color'];
            boxShadow: React.CSSProperties['boxShadow'];
            beforeAfterBoxShadow: React.CSSProperties['boxShadow'];
        };
        card: {
            backgroundColor: React.CSSProperties['color'];
            boxShadow: React.CSSProperties['boxShadow'];
        };
        textarea: {
            backgroundColor: React.CSSProperties['color'];
            color: React.CSSProperties['color'];
        };
        button: {
            backgroundColor: React.CSSProperties['color'];
            boxShadow: React.CSSProperties['boxShadow'];
            boxShadowHover: React.CSSProperties['boxShadow'];
            boxShadowSelected: React.CSSProperties['boxShadow'];
        };
        chat: {
            backgroundColor: React.CSSProperties['color'];
        };
        footer: {
            borderColor: React.CSSProperties['color'];
            backgroundColor: React.CSSProperties['color'];
        };
    }

    interface ThemeOptions {
        main: {
            backgroundColor: React.CSSProperties['color'];
            background: React.CSSProperties['color'];
            padding: React.CSSProperties['padding'];
        };
        header: {
            icon: {
                main: React.CSSProperties['color'];
                selected: React.CSSProperties['color'];
            };
            backgroundColor: React.CSSProperties['color'];
        };
        text: {
            title: React.CSSProperties['color'];
            subtitle: React.CSSProperties['color'];
            body: React.CSSProperties['color'];
        };
        papel: {
            backgroundColor: React.CSSProperties['color'];
            boxShadow: React.CSSProperties['boxShadow'];
            beforeAfterBoxShadow: React.CSSProperties['boxShadow'];
        };
        card: {
            backgroundColor: React.CSSProperties['color'];
            boxShadow: React.CSSProperties['boxShadow'];
        };
        textarea: {
            backgroundColor: React.CSSProperties['color'];
            color: React.CSSProperties['color'];
        };
        button: {
            backgroundColor: React.CSSProperties['color'];
            boxShadow: React.CSSProperties['boxShadow'];
            boxShadowHover: React.CSSProperties['boxShadow'];
            boxShadowSelected: React.CSSProperties['boxShadow'];
        };
        chat: {
            backgroundColor: React.CSSProperties['color'];
        };
        footer: {
            borderColor: React.CSSProperties['color'];
            backgroundColor: React.CSSProperties['color'];
        };
    }
    interface TypographyVariants {
        logo: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        logo?: React.CSSProperties;
    }

    interface BreakpointOverrides {
        xxs: true;
        xmd: true;
    }
}

/**
 * Typography Types
 */
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        logo: true;
    }
}

export const commonTheme = {
    typography: {
        logo: {
            fontFamily: "'Dr Sugiyama', cursive",
        },
        h1: {
            fontFamily: "'Alkatra', cursive;",
            fontSize: '4rem',
            '@media (max-width:600px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontFamily: "'Alkatra', cursive;",
            fontSize: '3rem',
        },
        h3: {
            fontFamily: "'Alkatra', cursive;",
            fontSize: '2rem',
        },
        h4: {
            fontFamily: "'Alkatra', cursive;",
            fontSize: '1.5rem',
        },
        fontFamily: "'Open Sans', sans-serif",
    },
    breakpoints: {
        values: {
            xxs: 0,
            xs: 450,
            sm: 600,
            md: 900,
            xmd: 1000,
            lg: 1200,
            xl: 1536,
        },
    },
    main: {
        padding: 6,
    },
};

/**
 * Colors Palette
 */
type ColorPalette = {
    primary: {
        dark: string;
        light: string;
        main: string;
    };
    secondary: {
        dark: string;
        light: string;
        main: string;
    };
    tertiary: {
        main: string;
    };
    divider: string;
};

export const lightPalette: ColorPalette = {
    primary: {
        main: '#3B5935',
        light: '#A7B677',
        dark: '#3B4424',
    },
    secondary: {
        main: '#864F27',
        light: '#C39C6B',
        dark: '#844E27',
    },
    tertiary: {
        main: '#F0EBCE',
    },
    divider: '#C39C6B',
};

export const darkPalette: ColorPalette = {
    primary: {
        main: '#A7B677',
        light: '#A7B677',
        dark: '#3B4424',
    },
    secondary: {
        dark: '#3B5936',
        light: '#A7B677',
        main: '#C39C6B',
    },
    tertiary: {
        main: '#F0EBCE',
    },
    divider: '#ad8c63',
};

/**
/ Color theme
*/
type ColorTheme = {
    header: {
        icon: {
            main: string;
            selected: string;
        };
        backgroundColor: string;
    };
    main: {
        backgroundColor: string;
        background: string;
        padding: number;
    };
    text: {
        title: string;
        subtitle: string;
        body: string;
    };
    button: {
        backgroundColor: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowSelected: string;
    };
    papel: {
        backgroundColor: string;
        boxShadow: string;
        beforeAfterBoxShadow: string;
    };
    card: {
        backgroundColor: string;
        boxShadow: string;
    };
    textarea: {
        backgroundColor: string;
        color: string;
    };
    chat: {
        backgroundColor: string;
    };
    footer: {
        borderColor: string;
        backgroundColor: string;
    };
};

const buttonBoxShadow = '0 0 8px rgba(0,0,0,0.2), inset 0 0 300px rgba(222,198,122,0.7)';

export const lightTheme: ColorTheme = {
    main: {
        backgroundColor: '#e8ded5',
        background: 'linear-gradient(135deg, #e8ded5 0%, #fcf8f4 100%)',
        padding: 6,
    },
    header: {
        icon: {
            main: 'white',
            selected: '#e2db84',
        },
        backgroundColor: '#3B5935',
    },
    text: {
        title: 'black',
        subtitle: 'black',
        body: 'black',
    },
    button: {
        backgroundColor: '#ece3cf',
        boxShadow: buttonBoxShadow,
        boxShadowHover: `${buttonBoxShadow}, ${lightPalette.primary.light}25 0px 54px 55px, ${lightPalette.primary.light}12 0px -12px 30px, ${lightPalette.primary.light}12 0px 4px 6px, ${lightPalette.primary.light}12 0px 12px 13px, ${lightPalette.primary.light}09 0px -3px 5px;`,
        boxShadowSelected: `${buttonBoxShadow}, ${lightPalette.primary.light}25 0px 54px 55px, ${lightPalette.secondary.light}12 0px -12px 30px, ${lightPalette.secondary.light}12 0px 4px 6px, ${lightPalette.secondary.light}12 0px 12px 13px, ${lightPalette.secondary.light}09 0px -3px 5px;`,
    },
    papel: {
        backgroundColor: '#fafafa',
        boxShadow: '0 0 10px rgba(0,0,0,0.3), 0 0 300px 25px rgba(222,198,122,0.7) inset',
        beforeAfterBoxShadow: '0 0 8px rgba(0,0,0,0.2), inset 0 0 300px rgba(222,198,122,0.7)',
    },
    card: {
        backgroundColor: '#ece3cf',
        boxShadow:
            '0 0 8px rgba(0,0,0,0.2), inset 0 0 300px rgba(222,198,122,0.7), rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;',
    },
    textarea: {
        backgroundColor: 'transparent',
        color: 'inherit',
    },
    chat: {
        backgroundColor: '#eae7e3',
    },
    footer: {
        backgroundColor: '#e8ded5',
        borderColor: '#A29488',
    },
};

export const darkTheme: ColorTheme = {
    main: {
        backgroundColor: '#202125',
        background: '#202125',
        padding: 6,
    },
    header: {
        icon: {
            main: 'white',
            selected: '#e2db84',
        },
        backgroundColor: '#272727',
    },
    text: {
        title: '#ffffff',
        subtitle: '#ffffff',
        body: '#ffffff',
    },
    papel: {
        backgroundColor: '#634831',
        boxShadow: '0 0 10px rgba(0,0,0,0.3), 0 0 300px 25px #211812 inset',
        beforeAfterBoxShadow: '0 0 8px rgba(0,0,0,0.2), inset 0 0 300px #211812',
    },
    button: {
        backgroundColor: '#383838',
        boxShadow: '0 0 8px rgba(0,0,0,0.2), inset 0 0 300px #3d3d3d',
        boxShadowHover: `${buttonBoxShadow}, ${lightPalette.primary.light}25 0px 54px 55px, ${lightPalette.primary.light}12 0px -12px 30px, ${lightPalette.primary.light}12 0px 4px 6px, ${lightPalette.primary.light}12 0px 12px 13px, ${lightPalette.primary.light}09 0px -3px 5px;`,
        boxShadowSelected: `${buttonBoxShadow}, ${lightPalette.primary.light}25 0px 54px 55px, ${lightPalette.secondary.light}12 0px -12px 30px, ${lightPalette.secondary.light}12 0px 4px 6px, ${lightPalette.secondary.light}12 0px 12px 13px, ${lightPalette.secondary.light}09 0px -3px 5px;`,
    },
    card: {
        backgroundColor: '#383838',
        boxShadow: '0 0 10px rgba(0,0,0,0.3), 0 0 300px 25px #211812 inset',
    },
    textarea: {
        backgroundColor: '#1E1E1E',
        color: 'white',
    },
    chat: {
        backgroundColor: '#242526',
    },
    footer: {
        backgroundColor: '#272727',
        borderColor: '#383838',
    },
};
