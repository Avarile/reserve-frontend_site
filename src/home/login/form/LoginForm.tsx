import React from "react";
import Container from "../common/LoginFormContainer.style";

type LoginFormPropsType = {
    formRef?: React.MutableRefObject<Record<string, any>>;
    className?: string;
};

const LoginForm: React.ComponentType<LoginFormPropsType> = (props) => {

    const {formRef} = props;

    return (
        <Container className={props.className}>
            <div className="input-area">
                <div className="form-item">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email"
                           onChange={(e) => {
                               formRef!.current["email"] = e.target.value;
                           }}/>
                </div>
                <div className="form-item">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password"
                           onChange={(e) => {
                               formRef!.current["password"] = e.target.value;
                           }}/>
                </div>
            </div>
        </Container>
    );

};

export default LoginForm;
