import React, { Dispatch, SetStateAction, useState } from "react";
import Upload, { FileType, fileUploadApi, getUploadUrlApi } from "../../../common/upload";
import Container from "../common/SampleStepContainer.style";
import { Pic } from "../SampleModal";
import { GeoPic } from "../SampleModal";
import { Box, Typography } from "@mui/material";
import { http } from "../../../common/http";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type SampleStep2PropsType = {
  className?: string;
  pic: { value: Pic; set: Dispatch<SetStateAction<Pic>> };
  geoPic: { value: string; set: Dispatch<SetStateAction<string>> };
};

const PartnerStep1: React.ComponentType<SampleStep2PropsType> = (props) => {
  const [forceUpdate, setForceUpdate] = useState<null | string>(null);
  const [geoFile, setGeoFile] = useState<File | null>(null);

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
      <InputFileUpload setGeoFile={props.geoPic.set} />
      <div className="input-area"></div>
    </Container>
  );
};

export default PartnerStep1;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length: number) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function InputFileUpload({ setGeoFile }: any) {
  return (
    <>
      <Typography
        sx={{
          marginTop: "20px",
        }}>
        Click to update Google / Apple Map screenshot to show the location of the sample. (Optional)
      </Typography>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput
          type="file"
          onChange={(event: any) => {
            const file = event.target.files[0];
            if (file) {
              const fileSize = file.size;
              const fileName = file.name;
              const fileType = file.type;
              if (fileSize && fileSize > 10000000) {
                alert("File size is too big!");
              }

              getUploadUrlApi({
                user_id: 1,
                site_id: generateString(10),
                content_type: fileType,
                file_name: fileName,
                file_size: fileSize,
                id: 0,
                type: FileType.UserAvatar,
              }).then((res) => {
                fileUploadApi(res.data.content.presignedUrl, file).then(async () => {
                  setGeoFile(res.data.content.fileUrl);
                });
              });
            }
          }}
        />
      </Button>
    </>
  );
}
