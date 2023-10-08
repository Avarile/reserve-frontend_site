import {InputBase, InputProps, styled} from "@mui/material";
import * as React from "react";

const BootstrapInput = styled((props: InputProps) => {

    return (
        <InputBase {...props}></InputBase>
    );

})(({theme}) => ({

    '& .MuiInputBase-input': {
        padding: '16px',
        width: 'calc(100% - 32px)',
        height: '48px',
        color: '#332820',
        fontSize: '16px',
        border: '1px solid #CDCDCD',
        borderRadius: '6px',

        '&:focus': {
            border: '1px solid #000000',
            borderRadius: '6px',
        },
    },
}));

export default BootstrapInput;
