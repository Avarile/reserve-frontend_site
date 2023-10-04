import {Box, styled} from "@mui/material";

const Container = styled((props: any) => {

    return (
        <Box {...props} ></Box>
    );

})(({theme}) => ({
    position: 'absolute',
    padding: '64px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#FFFFFF',
    borderRadius: '16px',

    '& > .content': {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',

        '& > .step': {
            margin: '24px 0',
        },

        '& > .button': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            margin: '16px',
        },
    },
}));

export default Container;
