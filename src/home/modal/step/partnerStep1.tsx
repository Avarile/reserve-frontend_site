import { MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import Container from "../common/partnerStepContainer.style";
import { FormRef } from "../modal";

type PartnerStep1PropsType = {
  formRef?: React.MutableRefObject<FormRef>;
  className?: string;
};
const currencies = [
  {
    value: "Test_site_1",
    label: "Test_site_1",
  },
  {
    value: "Test_site_2",
    label: "Test_site_2",
  },
  {
    value: "Test_site_3",
    label: "Test_site_3",
  },
  {
    value: "Test_site_4",
    label: "Test_site_4",
  },
  {
    value: "Test_site_5",
    label: "Test_site_5",
  },
];
const PartnerStep1: React.ComponentType<PartnerStep1PropsType> = (props) => {
  const { formRef } = props;
  return (
    <Container className={props.className}>
      <div className="input-area">
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.submitter.firstname = value;
            }}
            size="small"
            fullWidth
            label="first Name"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.submitter.surname = value;
            }}
            size="small"
            fullWidth
            label="surname"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.submitter["email"] = value;
            }}
            size="small"
            fullWidth
            label="email"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.submitter["phone"] = value;
            }}
            size="small"
            fullWidth
            label="phone"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              debugger
              formRef!.current.submitter["test_site"] = Number(value);
            }}
            select
            size="small"
            fullWidth
            label="test_site">
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {/* <Upload></Upload> */}
      </div>
    </Container>
  );
};

export default PartnerStep1;
