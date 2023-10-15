import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { MenuItem, Select } from "@mui/material";
import { Submitter } from "../SampleModal";
import Container from "../common/SampleStepContainer.style";
import BootstrapInput from "../../../common/BootstrapInput";
import { http } from "../../../common/http";

function reservationsApi() {
  return http.request({
    url: "/api/reservation/query",
    method: "POST",
  });
}

const userInfo = sessionStorage.getItem("USER") || "{ }";

type SampleStep1PropsType = {
  sites: any[];
  className?: string;
  formData: { value: Submitter; set: Dispatch<SetStateAction<Submitter>> };
};

const SampleStep1: React.ComponentType<SampleStep1PropsType> = (props) => {
  const [site, setSite] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(JSON.parse(sessionStorage.getItem("USER") || "{ }"));
  const [siteReserved, setSiteReserved] = useState<any>(null);

  useEffect(() => {
    setCurrentUser(JSON.parse(userInfo));

    reservationsApi().then((res) => {
      console.log(res.data.content);

      let site_id: any[] = [];
      res.data.content.map((item: any) => {
        if (item?.user_id === currentUser?.id) {
          site_id.push(item?.site_id.toString());
        }
      });
      setSiteReserved(site_id);
    });
  }, [userInfo]);

  return (
    <Container className={props.className}>
      <div className="input-area">
        <div className="line-wrapper">
          <div className="form-item required">
            <label>First name</label>
            <input
              type="text"
              placeholder="First name"
              // value={props.formData.value["firstname"]}
              value={currentUser?.name}
              onChange={(e) => {
                props.formData.value["firstname"] = e.target.value;
                props.formData.set({ ...props.formData.value });
              }}
            />
          </div>
          <div className="form-item required">
            <label>Surname</label>
            <input
              type="text"
              placeholder="Surname"
              value={props.formData.value["surname"]}
              onChange={(e) => {
                props.formData.value["surname"] = e.target.value;
                props.formData.set({ ...props.formData.value });
              }}
            />
          </div>
        </div>
        <div className="line-wrapper">
          <div className="form-item required">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              // value={props.formData.value["email"]}
              value={currentUser?.email}
              onChange={(e) => {
                props.formData.value["email"] = e.target.value;
                props.formData.set({ ...props.formData.value });
              }}
            />
          </div>
          <div className="form-item required">
            <label>Phone</label>
            <input
              type="tel"
              placeholder="0412 345 678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              value={props.formData.value["phone"]}
              onChange={(e) => {
                props.formData.value["phone"] = e.target.value;
                props.formData.set({ ...props.formData.value });
              }}
            />
          </div>
        </div>
        <div className="form-item required">
          <label>Testing site</label>
          <Select
            input={<BootstrapInput />}
            value={site}
            onChange={(e) => {
              console.log(e.target.value);
              setSite(e.target.value as string);
            }}>
            {props.sites.map((site) => {
              if (siteReserved?.includes(site?.site_id)) {
                return <MenuItem value={parseInt(site?.site_id)}>{site?.site_id}</MenuItem>;
              }
            })}
          </Select>
        </div>
      </div>
    </Container>
  );
};

export default SampleStep1;
