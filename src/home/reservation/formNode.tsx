import React, { Dispatch, SetStateAction, useState } from "react";
import Container from "./common/SampleStepContainer.style";
import { FormRef } from "./SampleModal";

type SampleStep1PropsType = {
  className?: string;
  formData: { value: FormRef; set: Dispatch<SetStateAction<FormRef>> };
};

const SampleStep1: React.ComponentType<SampleStep1PropsType> = (props) => {
  const [site, setSite] = useState("");

  return (
    <Container className={props.className}>
      <div className="input-area">
        <div className="line-wrapper">
          <div className="form-item required">
            <label>Post Code</label>
            <input
              type="text"
              placeholder="Post Code"
              value={props.formData.value["postcode"]}
              onChange={(e) => {
                props.formData.value["postcode"] = e.target.value;
                props.formData.set({ ...props.formData.value });
              }}
            />
          </div>
        </div>
        <div className="form-item required">
          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            value={props.formData.value["address"]}
            onChange={(e) => {
              props.formData.value["address"] = e.target.value;
              props.formData.set({ ...props.formData.value });
            }}
          />
        </div>
        <div className="line-wrapper">
          <div className="form-item required">
            <label>City</label>
            <input
              type="email"
              placeholder="City"
              value={props.formData.value["city"]}
              onChange={(e) => {
                props.formData.value["city"] = e.target.value;
                props.formData.set({ ...props.formData.value });
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SampleStep1;
