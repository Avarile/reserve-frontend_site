import {Modal} from "@mui/material";
import React, {useRef, useState} from "react";
import {http} from "../../common/http";
import Container from "./LoginModal.style";
import LoginForm from "./form/LoginForm";
import RegisterForm from "./form/RegisterForm";

function loginApi(params: {email: string; password: string}) {
    return http.request({
        url: "/api/auth/login",
        method: "POST",
        data: params,
    });
}

function registerApi(params: {
    email: string,
    password: string,
    name: string,
    address: string,
    postcode: string,
    city: string
}) {
    return http.request({
        url: "/api/auth/register",
        method: "POST",
        data: params,
    });
}

type InputModalPropsType = {
    open: boolean;
    onClose?: () => void;
};

const InputModal: React.ComponentType<InputModalPropsType> = (props) => {

    const [type, setType] = useState<'login' | 'register'>('login');

    const loginFormRef = useRef({
        email: '',
        password: '',
    });

    const registerFormRef = useRef({
        email: '',
        password: '',
        name: '',
        address: '',
        postcode: '',
        city: '',
    });

    const login = () => {
        if (!loginFormRef.current.email || !loginFormRef.current.password) return;
        loginApi(loginFormRef.current).then((res) => {
            props.onClose && props.onClose();
            sessionStorage.setItem("ACCESS_TOKEN", res.data.data);
        });
    }

    const register = () => {
        if (!registerFormRef.current.email || !loginFormRef.current.password) return;
        registerApi(registerFormRef.current).then((res) => {
            props.onClose && props.onClose();
            sessionStorage.setItem("ACCESS_TOKEN", res.data.data);
        });
    }

    return (
        <Modal
            open={props.open}
            onClose={() => props.onClose && props.onClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Container>
                <div className="logo">
                    <img
                        src="http://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/Logotype-Wildlife-Search_Odonata-1.svg"/>
                </div>
                {
                    type === 'login' ?
                        <>
                            <div className='title'>
                                Login to your account
                            </div>
                            <div className='sub-title'>
                                Welcome back! Please enter your details.
                            </div>
                            <div className="content">
                                <div className="each-frame">
                                    <LoginForm formRef={loginFormRef}></LoginForm>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className='full' onClick={login}>
                                    Sign in
                                </button>
                            </div>
                            <div className="tip">
                                Don't have an account?&ensp;
                                <span className="click" onClick={() => setType('register')}>Sign up</span>
                            </div>
                        </> : ''
                }
                {
                    type === 'register' ?
                        <>
                            <div className='title'>
                                Create an account
                            </div>
                            <div className='sub-title'>
                                Begin volunteering with us today.
                            </div>
                            <div className="content">
                                <div className="each-frame">
                                    <RegisterForm formRef={registerFormRef}></RegisterForm>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className='full' onClick={register}>
                                    Get started
                                </button>
                            </div>
                            <div className="tip">
                                Already have an account?&ensp;
                                <span className="click" onClick={() => setType('login')}>Log in</span>
                            </div>
                        </> : ''
                }
            </Container>
        </Modal>
    );
};

export default InputModal;
