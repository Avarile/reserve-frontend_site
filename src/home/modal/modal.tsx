import React, { useRef, useState } from "react";
import { Button, Modal, Step, StepLabel, Stepper } from "@mui/material";
import Container from "./style";
import PartnerStep1 from "./step/partnerStep1";
import PartnerStep2 from "./step/partnerStep2";
import PartnerStep3 from "./step/partnerStep3";
import PartnerStep4 from './step/partnerStep4'
import HighlightText from "../../common/highlightText";
import LowlightText from "../../common/lowlightText";
import { http } from "../../common/http";

function sampleCreateApi(params: any) {
  return http.request<{data:any}>({
    url: "/api/sample/create",
    method: "POST",
    data: params,
  });
}
type InputModalPropsType = {
  open: boolean;
  onClose?: () => void;
};
export interface FormRef {
  info: Info;
  pic: string;
  submitter: Submitter;
}

export interface Info {
  date?: string;
  lat?: string;
  lng?: string;
  notes?: string;
  site_id?: string;
  volume_1?: number;
  volume_2?: number;
  water_way?: string;
}

export interface Submitter {
  email?: string;
  firstname?: string;
  phone?: string;
  surname?: string;
  test_site?: number;
}

const InputModal: React.ComponentType<InputModalPropsType> = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const formRef = useRef<FormRef>({
    submitter:{},
    info:{},
    pic:""
  });
  const preStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const nextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }else{
      sampleCreateApi(formRef.current)
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.onClose && props.onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Container>
        <HighlightText>
          <div
            style={{
              textAlign: "center",
            }}>
            Tell Us About You
          </div>
        </HighlightText>
        <LowlightText>
          <div
            style={{
              textAlign: "center",
            }}>
            Tell Us About You
          </div>
        </LowlightText>
        <div className="content">
          <Stepper className="step" activeStep={activeStep}>
            <Step>
              <StepLabel>Step 1</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 2</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 3</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 4</StepLabel>
            </Step>
          </Stepper>
          <div className="each-frame">
            {activeStep == 0 ? (
              <PartnerStep1 formRef={formRef}></PartnerStep1>
            ) : (
              ""
            )}
            {activeStep == 1 ? (
              <PartnerStep2 formRef={formRef}></PartnerStep2>
            ) : (
              ""
            )}
            {activeStep == 2 ? <PartnerStep3 formRef={formRef}></PartnerStep3> : ""}
            {activeStep == 3 ? <PartnerStep4></PartnerStep4> : ""}
          </div>
          <div className="button">
            {activeStep == 0 ? (
              ""
            ) : (
              <Button
                variant="outlined"
                sx={{ width: 200 }}
                onClick={() => preStep()}>
                Previous
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ width: 200 }}
              onClick={() => nextStep()}>
              {activeStep<3?'Continue':'Submit'}
            </Button>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

export default InputModal;
