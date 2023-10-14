import React, {Dispatch, SetStateAction, useState} from "react";
import {Info} from "../SampleModal";
import Container from "../common/SampleStepContainer.style";

type SampleStep3PropsType = {
    className?: string;
    formData: {value: Info, set: Dispatch<SetStateAction<Info>>};
};

const PartnerStep1: React.ComponentType<SampleStep3PropsType> = (props) => {


    return (
        <Container className={props.className}>
            <div className="input-area">
                <div className="line-wrapper" style={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <div className="form-item required">
                        <label>Site code</label>
                        <input type="text" placeholder="Site code"
                               value={props.formData.value["site_id"]}
                               onChange={(e) => {
                                   props.formData.value["site_id"] = e.target.value;
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                    <div className="form-item required">
                        <label>Date of collection</label>
                        <input type="text" placeholder="Date of collection"
                               value={props.formData.value["date"]}
                               onChange={(e) => {
                                   props.formData.value["date"] = e.target.value;
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                    <div className="form-item required">
                        <label>The Waterway</label>
                        <input type="text" placeholder="Waterway"
                               value={props.formData.value["water_way"]}
                               onChange={(e) => {
                                   props.formData.value["water_way"] = e.target.value;
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                </div>
                <div className="line-wrapper">
                    <div className="form-item required">
                        <label>Longitude</label>
                        <input type="text" placeholder="Input sample longitude"
                               value={props.formData.value["lng"]}
                               onChange={(e) => {
                                   props.formData.value["lng"] = e.target.value;
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                    <div className="form-item required">
                        <label>Latitude</label>
                        <input type="text" placeholder="Input sample latitude"
                               value={props.formData.value["lat"]}
                               onChange={(e) => {
                                   props.formData.value["lat"] = e.target.value;
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                </div>
                <div className="line-wrapper">
                    <div className="form-item required">
                        <label>Volume 1</label>
                        <input type="number" placeholder="50 mL"
                               value={props.formData.value["volume_1"]}
                               onChange={(e) => {
                                   props.formData.value["volume_1"] = Number(e.target.value);
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                    <div className="form-item required">
                        <label>Volume 2</label>
                        <input type="number" placeholder="50 mL"
                               value={props.formData.value["volume_2"]}
                               onChange={(e) => {
                                   props.formData.value["volume_2"] = Number(e.target.value);
                                   props.formData.set({...props.formData.value});
                               }}/>
                    </div>
                </div>
                <div className="form-item">
                    <label>Notes</label>
                    <input type="text" placeholder="Types notes here"
                           value={props.formData.value["notes"]}
                           onChange={(e) => {
                               props.formData.value["notes"] = e.target.value;
                               props.formData.set({...props.formData.value});
                           }}/>
                </div>
            </div>
        </Container>
    );
};

export default PartnerStep1;
