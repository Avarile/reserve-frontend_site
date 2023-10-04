import {Box, styled} from "@mui/material";

const Container = styled((props: any) => {

    return (
        <Box {...props} ></Box>
    );

})(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '& > .header-wrapper': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '& > .header': {
            flex: '1',
            display: 'flex',
            flexDirection: 'row',
            padding: '9px 65px',
            maxWidth: '1440px',

            '& > .logo': {
                width: '87px',
                height: '93px',
                margin: '15px 0',
            },

            '& > .navigation': {
                flex: '1',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',

                '& > .text': {
                    padding: '14px',
                    fontSize: '16px',
                    color: '#6D6D1F',
                    textDecoration: 'none',
                    cursor: 'pointer',

                    ':hover': {
                        textDecoration: 'underline dotted',
                        textUnderlineOffset: '3px',
                    },
                },

                '& > .button': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '30px',
                    padding: '4px 26px 8px 26px',
                    height: '28px',
                    background: '#6D6D1F',
                    fontSize: '16px',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                },
            },
        },
    },

    '& > .content-area': {

        '& > .banner': {
            position: 'relative',
            width: '100%',

            '& > .image': {
                width: '100%',
            },

            '& > .content': {
                position: 'absolute',
                width: '770px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',

                '& > .title': {
                    fontSize: '54px',
                    color: '#ffffff',
                    textAlign: 'center',
                    lineHeight: '63px',
                },

                '& > .paragraph': {
                    marginTop: '20px',
                    fontSize: '28px',
                    color: '#ffffff',
                    textAlign: 'center',
                    lineHeight: '33px',
                },

                '& > .buttons': {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    marginTop: '50px',

                    '& > .each': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: '5px',
                        width: '224px',
                        height: '50px',
                        fontSize: '20px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                    },

                    '& > .left': {
                        background: '#6D6D1F',
                        color: '#332820',
                        border: '1px solid #6D6D1F',
                    },

                    '& > .right': {
                        color: '#FFFFFF',
                        border: '1px solid #FFFFFF',
                    },
                },
            },
        },

        '& > .section-container': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',

            '& > .content': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '80px 65px',
                width: 'calc(100% - 65px * 2)',
                maxWidth: 'calc(1440px - 65px * 2)',

                '& > .title': {
                    margin: '0 auto 40px auto',
                    maxWidth: '770px',
                    color: '#332820',
                    textAlign: 'center',

                    '& > .high': {
                        fontSize: '52px',
                        fontWeight: '500',
                        lineHeight: '57px',
                    },

                    '& > .normal': {
                        fontSize: '20px',
                        lineHeight: '30px',
                    },
                },

                '& > .row-items': {
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '30px',

                    '& > .image': {
                        width: 'calc((100% - 30px) * 0.6)',

                        '& > img': {
                            width: '100%',
                        },
                    },

                    '& > .article': {
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',

                        '& > .text-l': {
                            fontSize: '28px',
                            color: '#332820',
                            lineHeight: '33px',
                        },

                        '& > .text-m': {
                            fontSize: '20px',
                            color: '#2C2C2C',
                            lineHeight: '24px',
                        },

                        '& > .text-s': {
                            fontSize: '16px',
                            color: '#2C2C2C',
                            lineHeight: '24px',
                        },
                    },
                },

                '& > .map-area': {
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '25px',
                    width: '100%',
                    height: '560px',

                    '& > .map': {
                        width: 'calc((100% - 25px) * 0.75)',
                        height: '100%',
                        border: '1.5px solid #565656',
                        borderRadius: '12px',
                    },

                    '& > .form': {
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',

                        '& > .search': {
                            width: '100%',
                            height: '48px',

                            '& > input': {
                                paddingLeft: '50px',
                                width: 'calc(100% - 50px)',
                                height: '100%',
                                fontSize: '16px',
                                border: '1.5px solid #565656',
                                borderRadius: '6px',
                            },
                        },

                        '& > .card': {
                            padding: '12px 16px 16px 20px',
                            background: '#FFFFFF',
                            border: '1.5px solid #565656',
                            borderRadius: '12px',

                            '& > .name': {
                                fontSize: '20px',
                                color: '#6D6D1F',
                                lineHeight: '32px',
                            },

                            '& > .location': {
                                fontSize: '12px',
                                color: '#332820',
                                marginBottom: '10px',
                            },

                            '& > .grid': {
                                display: 'grid',
                                gridTemplateColumns: '3fr 1fr',

                                '.tit': {
                                    fontSize: '12px',
                                    color: '#332820',
                                    lineHeight: '20px',
                                },

                                '.con': {
                                    fontSize: '12px',
                                    color: '#755F43',
                                    lineHeight: '20px',
                                },
                            },
                        },
                    },
                },

                '& > .input-area': {
                    width: '100%',
                    maxWidth: '575px',

                    '& > .name-wrapper': {
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '15px',
                    },

                    '.form-item': {
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '15px',
                        width: '100%',

                        '& > label': {
                            marginBottom: '3px',
                            color: '#332820',
                            fontSize: '20px',
                        },

                        '& > input,textarea': {
                            padding: '0px 16px 5px 16px',
                            height: '48px',
                            color: '#332820',
                            fontSize: '16px',
                            border: '1px solid #CDCDCD',
                            borderRadius: '6px',
                        },

                        '& > textarea': {
                            height: '130px',
                        },
                    },

                    '.form-check': {
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '24px 0px 30px 0px',
                        width: '100%',

                        '& > label': {
                            paddingLeft: '10px',
                            marginBottom: '10px',
                            color: '#332820',
                            fontSize: '16px',
                        },

                        '& > input': {
                            width: '25px',
                            height: '25px',
                        },
                    },

                    '& > .submit': {
                        width: '100%',
                        height: '50px',
                        background: '#6D6D1F',
                        fontSize: '18px',
                        color: '#FFFFFF',
                        borderRadius: '6px',
                        border: '3px solid #6D6D1F',

                        ':hover': {
                            border: '3px solid #FFFFFF',
                        },
                    },
                },
            },
        },
    },

    '& > .aside-area': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        background: '#6D6D1F',

        '& > .content': {
            flex: '1',
            display: 'flex',
            flexDirection: 'row',
            gap: '100px',
            padding: '60px 65px 40px 65px',
            maxWidth: '1440px',

            '& > .left': {
                width: 'calc((100% - 100px) * 0.7317)',

                '& > .image-row': {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '40px',
                },

                '& > .text-m': {
                    fontSize: '16px',
                    color: '#FFFFFF',
                },

                '& > .text-s': {
                    fontSize: '12px',
                    color: '#FFFFFF',
                },
            },

            '& > .right': {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',

                '& > .each': {
                    fontSize: '16px',
                    color: '#FFFFFF',
                    lineHeight: '1.9',
                    textDecoration: 'none',
                    cursor: 'pointer',
                },
            },
        },
    },

    '& > .footer': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        background: '#6D6D1F',

        '& > .content': {
            flex: '1',
            padding: '0px 100px 30px 100px',
            maxWidth: '1440px',

            '& > .site-info': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '20px',
                width: '100%',
                borderTop: '1px solid #FFFFFF',

                '& > .text': {
                    fontSize: '20px',
                    color: '#FFFFFF',
                },

                '& > .icons': {

                    '& > .each': {
                        padding: '16px 14px',
                        textDecoration: 'none',
                        cursor: 'pointer',

                        '& > img': {
                            width: '24px',
                            height: '24px',
                        },
                    },
                },
            },
        },
    },
}));

export default Container;
