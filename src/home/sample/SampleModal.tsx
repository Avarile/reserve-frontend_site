import React, { useRef, useState } from "react";
import { Modal } from "@mui/material";
import { http } from "../../common/http";
import Container from "./SampleModal.style";
import SampleStep1 from "./step/SampleStep1";
import SampleStep2 from "./step/SampleStep2";
import SampleStep3 from "./step/SampleStep3";
import SampleStep4 from "./step/SampleStep4";

function sampleCreateApi(params: FormRef) {
  return http.request<{ data: any }>({
    url: "/api/sample/create",
    method: "POST",
    data: params,
  });
}

type InputModalPropsType = {
  open: boolean;
  sites: any[];
  onClose?: () => void;
};

export type FormRef = {
  submitter: Submitter; // 阶段一
  pic: string; // 阶段二
  info: Info; // 阶段三
};

// 阶段一
export type Submitter = {
  email: string;
  firstname: string;
  surname: string;
  phone: string;
  test_site: number;
};

// 阶段三
export type Info = {
  date: string;
  lat: string;
  lng: string;
  notes: string;
  site_id: string;
  volume_1: number;
  volume_2: number;
  water_way: string;
};

const SampleModal: React.ComponentType<InputModalPropsType> = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitFinish, setSubmitFinish] = useState(false);

  const [submitterForm, setSubmitterForm] = useState<Submitter>({
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    test_site: 0,
  });

  const [pic, setPic] = useState("");

  const [infoForm, setInfoForm] = useState<Info>({
    date: "",
    lat: "",
    lng: "",
    notes: "",
    site_id: "",
    volume_1: 0,
    volume_2: 0,
    water_way: "",
  });

  const preStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const nextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const submit = () => {
    setSubmitFinish(true);
  };

  return (
    <Modal open={props.open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" onClose={() => props.onClose && props.onClose()}>
      <Container>
        {submitFinish ? (
          <>
            <div className="title">Submit your sample</div>
            <div className="sub-title">Thank you for submitting your sample information! If you need to get in touch with us regarding your submission, please don't hesitate.</div>
            <div className="buttons">
              <button
                className="outline"
                onClick={() => {
                  setSubmitFinish(false);
                  setActiveStep(0);
                }}>
                Submit another sample
              </button>
              <button className="full">Done</button>
            </div>
          </>
        ) : (
          <>
            <div className="title">Submit your sample</div>
            <div className="sub-title">Follow the steps below and mark sure all details are correct before continuing.</div>
            <div className="content">
              <div className="step">
                <div className="each each-active">
                  <div className="num">1</div>
                  <div className="text">Your details</div>
                </div>
                <div className="line line-active"></div>
                <div className={"each" + (activeStep >= 1 ? " each-active" : "")}>
                  <div className="num">2</div>
                  <div className="text">Upload images</div>
                </div>
                <div className={"line" + (activeStep >= 1 ? " line-active" : "")}></div>
                <div className={"each" + (activeStep >= 2 ? " each-active" : "")}>
                  <div className="num">3</div>
                  <div className="text">Sample data</div>
                </div>
                <div className={"line" + (activeStep >= 2 ? " line-active" : "")}></div>
                <div className={"each" + (activeStep >= 3 ? " each-active" : "")}>
                  <div className="num">4</div>
                  <div className="text">Review & submit</div>
                </div>
              </div>
              <div className="each-frame">
                {activeStep === 0 ? (
                  <SampleStep1
                    sites={props.sites}
                    formData={{
                      value: submitterForm,
                      set: setSubmitterForm,
                    }}></SampleStep1>
                ) : (
                  ""
                )}
                {activeStep === 1 ? <SampleStep2 pic={{ value: pic, set: setPic }}></SampleStep2> : ""}
                {activeStep === 2 ? (
                  <SampleStep3
                    formData={{
                      value: infoForm,
                      set: setInfoForm,
                    }}></SampleStep3>
                ) : (
                  ""
                )}
                {activeStep === 3 ? <SampleStep4 submitter={submitterForm} pic={pic} info={infoForm}></SampleStep4> : ""}
              </div>
            </div>
            <div className="buttons">
              {activeStep === 0 ? (
                ""
              ) : (
                <button className="outline" onClick={() => preStep()}>
                  Previous
                </button>
              )}
              <button className="full" onClick={() => (activeStep < 3 ? nextStep() : submit())}>
                {activeStep < 3 ? "Continue" : "Submit"}
              </button>
            </div>
          </>
        )}
      </Container>
    </Modal>
  );
};

export default SampleModal;
