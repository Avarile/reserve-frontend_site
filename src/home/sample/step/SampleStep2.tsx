import React, { Dispatch, SetStateAction, useState } from "react";
import Upload from "../../../common/upload";
import Container from "../common/SampleStepContainer.style";
import { Pic } from "../SampleModal";
import { Box, Typography } from "@mui/material";

type SampleStep2PropsType = {
  className?: string;
  pic: { value: Pic; set: Dispatch<SetStateAction<Pic>> };
};

const PartnerStep1: React.ComponentType<SampleStep2PropsType> = (props) => {
  const [forceUpdate, setForceUpdate] = useState<null | string>(null);

  return (
    <Container className={props.className}>
      <div className="text-area">
        <div className="title">Upload and attach files *</div>
        <div className="content">Upload and attach photos of the location of sample. As well as a screenshot of your maps app location upon sampling.</div>
      </div>
      <div className="input-area">
        <Upload
          setForceUpdate={setForceUpdate}
          handleFileChange={(pic: Pic) => {
            props.pic.set(pic);
          }}></Upload>
      </div>
      <Box>
        {props.pic.value.lat === "N/A" ? (
          <Typography variant="h6" color="text.secondary" fontFamily={"cursive"}>
            Your photo does not contain any Geo information, please input the Lat / Lng in next step
          </Typography>
        ) : (
          <>
            <Typography variant="h6" color="text.secondary" fontFamily={"cursive"}>
              lat: {props.pic.value.lat}
            </Typography>
            <Typography variant="h6" color="text.secondary" fontFamily={"cursive"}>
              lng: {props.pic.value.lng}
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default PartnerStep1;
