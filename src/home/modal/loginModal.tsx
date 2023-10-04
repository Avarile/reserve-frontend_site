import { Button, Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import HighlightText from "../../common/highlightText";
import { http } from "../../common/http";
import LoginForm from "./loginForm";
import Container from "./style";
function loginApi(params: { email: string; password: string }) {
  return http.request({
    url: "/api/auth/login",
    method: "POST",
    data: params,
  });
}
type InputModalPropsType = {
  open: boolean;
  onClose?: () => void;
};

const InputModal: React.ComponentType<InputModalPropsType> = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const formRef = useRef({
    email: "",
    password: "",
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
              marginBottom: 20,
            }}>
            Login
          </div>
        </HighlightText>
        <div className="content">
          <div className="each-frame">
            <LoginForm formRef={formRef}></LoginForm>
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
              onClick={() => {
                if (!formRef.current.email || !formRef.current.password) return;
                loginApi(formRef.current).then((res) => {
                  props.onClose && props.onClose();
                  sessionStorage.setItem("ACCESS_TOKEN", res.data.data);
                });
              }}>
              Login
            </Button>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

export default InputModal;
