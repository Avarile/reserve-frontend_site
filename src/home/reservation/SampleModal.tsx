import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import { http } from "../../common/http";
import Container from "./SampleModal.style";
import SampleStep1 from "./formNode";

function reservationCreateApi(params: FormRef) {
  return http.request<{ data: any }>({
    url: "/api/reservation/create",
    method: "POST",
    data: params,
  });
}

type InputModalPropsType = {
  siteId: number;
  open: boolean;
  onClose?: () => void;
};

export type FormRef = {
  address: string;
  city: string;
  postcode: string;
  site_id: number;
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

  const [submitterForm, setSubmitterForm] = useState<FormRef>({
    address: "",
    city: "",
    postcode: "",
    site_id: 0,
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

  const submit = async () => {
    await reservationCreateApi({ ...submitterForm, site_id: props.siteId });
    props.onClose!();
  };

  return (
    <Modal open={props.open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" onClose={() => props.onClose && props.onClose()}>
      <Container>
        <div className="title">Login to your account</div>
        <div className="sub-title">Welcome back! Please enter your details.</div>
        <div className="each-frame">
          <SampleStep1
            formData={{
              value: submitterForm,
              set: setSubmitterForm,
            }}></SampleStep1>
        </div>
        <div className="buttons">
          <button className="full" onClick={() => submit()}>
            Submit
          </button>
        </div>
      </Container>
    </Modal>
  );
};

export default SampleModal;
