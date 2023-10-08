import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

const Container = styled((props: any) => {

    return (
        <Box {...props}></Box>
    );

})(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'var(--container-align-items)',
    width: '100%',

    '& > .text-area': {
        margin: '16px 0',

        '& > .title': {
            marginBottom: '8px',
            color: '#332820',
            fontSize: '20px',
            fontWeight: 'bold',
        },

        '& > .content': {
            color: '#6D6D1F',
            fontSize: '16px',
        },
    },

    '& > .detail-area': {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',

        '& > .each': {

            '& > .title': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '18px',
                cursor: 'pointer',
            },

            '& > .content': {
                margin: '16px',
                height: 'auto',
                overflow: 'hidden',

                '& > .line': {
                    display: 'flex',
                    flexDirection: 'row',

                    '& > .block': {
                        flex: '1',
                    },
                },
            },
        },
    },

    '& > .input-area': {
        width: '100%',

        '& > .line-wrapper': {
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
                width: 'calc(100% - 32px)',
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

        '.required': {

            '& > label': {

                ':after': {
                    content: '"*"',
                    paddingLeft: '8px',
                },
            },
        },

        '.form-check': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',

            '& > label': {
                color: '#332820',
                fontSize: '16px',
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
}));

export default Container;
