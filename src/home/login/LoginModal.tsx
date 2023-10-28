import { Modal } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { http } from "../../common/http";
import Container from "./LoginModal.style";
import LoginForm from "./form/LoginForm";
import RegisterForm from "./form/RegisterForm";
import { useSnackbar } from "notistack";
import { useResponsive } from "../../common/use-responsive";
import { object, string } from "yup";
import { Icon } from "@iconify/react";

let registerSchema = object({
  email: string().email().required(),
  password: string().min(8).max(16).required(),
  name: string().required(),
  address: string().required(),
  postcode: string().required(),
  city: string().required(),
});

function loginApi(params: { email: string; password: string }) {
  return http.request({
    url: "/api/auth/login",
    method: "POST",
    data: params,
  });
}

function getCurrentUserApi() {
  return http.request({
    url: "/api/users/current-user",
    method: "POST",
  });
}

function registerApi(params: { email: string; password: string; name: string; address: string; postcode: string; city: string }) {
  return http.request({
    url: "/api/auth/register",
    method: "POST",
    data: params,
  });
}

type InputModalPropsType = {
  open: boolean;
  login: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
  setCurrentUser: Dispatch<SetStateAction<any>>;
  onClose: () => void;
};

const InputModal: React.ComponentType<InputModalPropsType> = (props) => {
  const [type, setType] = useState<"login" | "register">("login");
  const isMobile = useResponsive("down", "md");
  const { enqueueSnackbar } = useSnackbar();

  const loginFormRef = useRef({
    email: "",
    password: "",
  });

  const registerFormRef = useRef({
    email: "",
    password: "",
    name: "",
    address: "",
    postcode: "",
    city: "",
  });

  const login = () => {
    if (!loginFormRef.current.email || !loginFormRef.current.password) return;
    loginApi(loginFormRef.current)
      .then((res) => {
        props.onClose && props.onClose();
        sessionStorage.setItem("ACCESS_TOKEN", res.data.content);
      })
      .then(() => {
        getCurrentUserApi().then((res) => {
          sessionStorage.setItem("USER", res.data.content ? JSON.stringify(res.data.content) : "");
          props.setCurrentUser(res.data.content);
        });

        enqueueSnackbar("Login successfully!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        props.setLogin(true);
      });
  };

  const register = async () => {
    try {
      await registerSchema.validate(registerFormRef.current);
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }

    registerApi(registerFormRef.current).then((res) => {
      setType("login");
    });
  };
  const lgUp = useResponsive("up", "lg");
  return (
    <Modal
      open={props.open}
      onClose={() => props.onClose && props.onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        overflow: "scroll",
      }}>
      <Container lgUp={lgUp}>
        <Icon
          icon="carbon:close"
          width="50"
          height="24"
          onClick={() => props?.onClose()}
          style={{ position: "absolute", top: isMobile ? "10px" : "16px", right: isMobile ? "10px" : "16px", cursor: "pointer", zIndex: "150" }}
        />
        <div className="logo">
          <img src="http://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/Logotype-Wildlife-Search_Odonata-1.svg" />
        </div>
        {type === "login" ? (
          <>
            <div className="title">Login to your account</div>
            <div className="sub-title">Welcome back! Please enter your details.</div>
            <div className="content">
              <div className="each-frame">
                <LoginForm formRef={loginFormRef}></LoginForm>
              </div>
            </div>
            <div className="buttons">
              <button className="full" onClick={login}>
                Sign in
              </button>
            </div>
            <div className="tip">
              Don't have an account?&ensp;
              <span className="click" onClick={() => setType("register")}>
                Sign up
              </span>
            </div>
          </>
        ) : (
          ""
        )}
        {type === "register" ? (
          <>
            <div className="title">Create an account</div>
            <div className="sub-title">Begin volunteering with us today.</div>
            <div className="content">
              <div className="each-frame">
                <RegisterForm formRef={registerFormRef}></RegisterForm>
              </div>
            </div>
            <div className="buttons">
              <button className="full" onClick={register}>
                Get started
              </button>
            </div>
            <div className="tip">
              Already have an account?&ensp;
              <span className="click" onClick={() => setType("login")}>
                Log in
              </span>
            </div>
          </>
        ) : (
          ""
        )}
      </Container>
    </Modal>
  );
};

export default InputModal;
