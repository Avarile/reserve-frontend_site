import React, {Dispatch, SetStateAction, useState} from "react";
import {MenuItem, Select} from "@mui/material";
import {Submitter} from "../SampleModal";
import Container from "../common/SampleStepContainer.style";
import BootstrapInput from "../../../common/BootstrapInput";

type SampleStep1PropsType = {
    className?: string;
    formData: {value: Submitter, set: Dispatch<SetStateAction<Submitter>>};
};

const SampleStep1: React.ComponentType<SampleStep1PropsType> = (props) => {

    const [site, setSite] = useState('');

    return (
        <Container className={props.className}>
            <div className="input-area">
                <div className="line-wrapper">
                    <div className="form-item required">
                        <label>First name</label>
                        <input type="text" placeholder="First name"
                               value={props.formData.value["firstname"]}
                               onChange={(e) => {
                                   props.formData.value["firstname"] = e.target.value;
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                    <div className="form-item required">
                        <label>Surname</label>
                        <input type="text" placeholder="Surname"
                               value={props.formData.value["surname"]}
                               onChange={(e) => {
                                   props.formData.value["surname"] = e.target.value;
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                </div>
                <div className="line-wrapper">
                    <div className="form-item required">
                        <label>Email</label>
                        <input type="email" placeholder="you@company.com"
                               value={props.formData.value["email"]}
                               onChange={(e) => {
                                   props.formData.value["email"] = e.target.value;
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                    <div className="form-item required">
                        <label>Phone</label>
                        <input type="tel" placeholder="0412 345 678"
                               pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                               value={props.formData.value["phone"]}
                               onChange={(e) => {
                                   props.formData.value["phone"] = e.target.value;
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                </div>
                <div className="form-item required">
                    <label>Testing site</label>
                    <Select input={<BootstrapInput/>}
                            value={''}
                            onChange={(e) => setSite(e.target.value as string)}>
                        <MenuItem value={'Ten'}>Ten</MenuItem>
                        <MenuItem value={'Twenty'}>Twenty</MenuItem>
                        <MenuItem value={'Thirty'}>Thirty</MenuItem>
                    </Select>
                </div>
            </div>
        </Container>
    );
};

export default SampleStep1;
