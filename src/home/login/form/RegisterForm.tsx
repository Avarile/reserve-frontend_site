import React from "react";
import Container from "../common/LoginFormContainer.style";

type RegisterFormPropsType = {
  formRef?: React.MutableRefObject<Record<string, any>>;
  className?: string;
};

const RegisterForm: React.ComponentType<RegisterFormPropsType> = (props) => {
  const { formRef } = props;

  return (
    <Container className={props.className}>
      <div className="input-area">
        <div className="form-item">
          <label>Email</label>
          <input
            onChange={(e) => {
              formRef!.current.email = e.target.value;
            }}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-item">
          <label>Full name</label>
          <input
            onChange={(e) => {
              formRef!.current.name = e.target.value;
            }}
            type="text"
            placeholder="Enter your name"
          />
        </div>
        <div className="form-item">
          <label>Password</label>
          <input
            onChange={(e) => {
              formRef!.current.password = e.target.value;
            }}
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="form-item">
          <label>Address</label>
          <input
            onChange={(e) => {
              formRef!.current.address = e.target.value;
            }}
            type="text"
            placeholder="Enter your address"
          />
        </div>
        <div className="line-wrapper">
          <div className="form-item">
            <label>City</label>
            <input
              onChange={(e) => {
                formRef!.current.city = e.target.value;
              }}
              type="text"
              placeholder="Enter city"
            />
          </div>
          <div className="form-item">
            <label>Postcode</label>
            <input
              type="text"
              placeholder="Enter postcode"
              onChange={(e) => {
                formRef!.current.postcode = e.target.value;
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RegisterForm;
