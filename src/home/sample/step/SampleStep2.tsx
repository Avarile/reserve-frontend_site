import React, {Dispatch, SetStateAction} from "react";
import Upload from "../../../common/upload";
import Container from "../common/SampleStepContainer.style";

type SampleStep2PropsType = {
    className?: string;
    pic: {value: string, set: Dispatch<SetStateAction<string>>};
};

const PartnerStep1: React.ComponentType<SampleStep2PropsType> = (props) => {

    return (
        <Container className={props.className}>
            <div className='text-area'>
                <div className='title'>Upload and attach files *</div>
                <div className='content'>
                    Upload and attach photos of the location of sample.
                    As well as a screenshot of your maps app location upon sampling.
                </div>
            </div>
            <div className="input-area">
                <Upload handleFileChange={(url: string) => {
                    props.pic.set(url);
                }}></Upload>
            </div>
        </Container>
    );

};

export default PartnerStep1;
