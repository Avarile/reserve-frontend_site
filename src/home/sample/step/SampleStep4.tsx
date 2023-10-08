import {Checkbox} from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Container from "../common/SampleStepContainer.style";
import {Info, Submitter} from "../SampleModal";
import React, {useState} from "react";

type SampleStep4PropsType = {
    className?: string;
    submitter: Submitter, // 阶段一
    pic: string, // 阶段二
    info: Info, // 阶段三
};

const PartnerStep1: React.ComponentType<SampleStep4PropsType> = (props) => {

    const [isOpen, setIsOpen] = useState([true, true, true, true]);

    return (
        <Container className={props.className}>
            <div className="detail-area">
                <div className="each">
                    <div className="title" style={{cursor: 'default'}}>
                        <span>Review & submit :</span>
                    </div>
                    <div className="content"></div>
                </div>
                <div className="each">
                    <div className="title" onClick={() => {
                        isOpen[0] = !isOpen[0];
                        setIsOpen([...isOpen]);
                    }}>
                        <span>Your Details</span>
                        {isOpen[0] ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                    </div>
                    <div className="content" style={{height: isOpen[0] ? 'auto' : '0px'}}>
                        <div className="line">
                            <div className="block">First name: {props.submitter.firstname}</div>
                            <div className="block">Surname: {props.submitter.surname}</div>
                        </div>
                        <div className="line">
                            <div className="block">Email: {props.submitter.email}</div>
                            <div className="block">Phone: {props.submitter.phone}</div>
                        </div>
                    </div>
                </div>
                <div className="each">
                    <div className="title" onClick={() => {
                        isOpen[1] = !isOpen[1];
                        setIsOpen([...isOpen]);
                    }}>
                        <span>Upload images</span>
                        {isOpen[1] ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                    </div>
                    <div className="content" style={{height: isOpen[1] ? 'auto' : '0px'}}>
                        pic
                    </div>
                </div>
                <div className="each">
                    <div className="title" onClick={() => {
                        isOpen[2] = !isOpen[2];
                        setIsOpen([...isOpen]);
                    }}>
                        <span>Sample data</span>
                        {isOpen[2] ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                    </div>
                    <div className="content" style={{height: isOpen[2] ? 'auto' : '0px'}}>
                        <div className="line">
                            <div className="block">Site code: {props.info.site_id}</div>
                            <div className="block">Date of collection: {props.info.date}</div>
                            <div className="block">Waterway: {props.info.water_way}</div>
                        </div>
                        <div className="line">
                            <div className="block">Longitude: {props.info.lng}</div>
                            <div className="block">Latitude: {props.info.lat}</div>
                            <div className="block"></div>
                        </div>
                        <div className="line">
                            <div className="block">Volume 1: {props.info.volume_1}</div>
                            <div className="block">Volume 2: {props.info.volume_2}</div>
                            <div className="block"></div>
                        </div>
                        <div className="line">
                            <div className="block">Notes: {props.info.notes}</div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <div className="input-area">
                <div className="form-check">
                    <Checkbox defaultChecked sx={{color: '#6D6D1F', '&.Mui-checked': {color: '#6D6D1F'}}}/>
                    <label>You confirm all information is correct.</label>
                </div>
            </div>
        </Container>
    );

};

export default PartnerStep1;
