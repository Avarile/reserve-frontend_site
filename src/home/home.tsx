import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo, useRef, useState } from "react";
import facebookSVG from "../assets/facebook.svg";
import instagramSVG from "../assets/instagram.svg";
import twitterSVG from "../assets/twitter.svg";
import { http } from "../common/http";
import { ISite } from "../interfaces";
import Container from "./home.style";
import LoginModal from "./login/LoginModal";
import SampleModal from "./sample/SampleModal";
import { useResponsive } from "../common/use-responsive";
import Iconify from "../common/iconify";
import { IconButton, TextField, Button, Typography, Stack } from "@mui/material";
import { Autocomplete } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";

// const current_user = window.sessionStorage.getItem("USER");
// const token = window.sessionStorage.getItem("ACCESS_TOKEN");
function handleStopWheel(e: any) {
  e.preventDefault();
}

const about = {
  group_name: "About",
  items: [
    {
      name: "About Odonata Foundation",

      link: "https://greataustralianwildlifesearch.framer.website/about#odonata-foundation",
    },
    {
      name: "Snapshot of the Murray-Darling",
      link: "https://greataustralianwildlifesearch.framer.website/murraydarling",
    },
    {
      name: "Program Partner",
      link: "https://greataustralianwildlifesearch.framer.website/about#odonata-foundation",
    },
    {
      name: "How eDNA Works",
      link: "https://greataustralianwildlifesearch.framer.website/about#edna",
    },
    {
      name: "FAQs",
      link: "https://greataustralianwildlifesearch.framer.website/faq",
    },
  ],
};

const join = {
  group_name: "Join",
  items: [
    {
      name: "Become a citizen Scientist",
      link: "https://greataustralianwildlifesearch.framer.website/join-the-search",
    },
    {
      name: "Sponsor the program",
      link: "https://greataustralianwildlifesearch.framer.website/sponsor-donate#sponsor",
    },
    {
      name: "Donate",
      link: "https://greataustralianwildlifesearch.framer.website/sponsor-donate#donate",
    },
    {
      name: "FAQs",
      link: "https://greataustralianwildlifesearch.framer.website/faq",
    },
  ],
};

const citizen = {
  group_name: "For Citizen Scientists",
  items: [
    {
      name: "How to Register",
      link: "https://greataustralianwildlifesearch.framer.website/for_citizen_scientists#register",
    },
    {
      name: "Login to Record Data",
      link: "https://greataustralianwildlifesearch.framer.website/for_citizen_scientists#login",
    },
    {
      name: "Testing Instructions",
      link: "https://greataustralianwildlifesearch.framer.website/for_citizen_scientists#test-instructions",
    },
    {
      name: "FAQs",
      link: "https://greataustralianwildlifesearch.framer.website/faq",
    },
  ],
};

const isMobile = window.innerWidth < 768 ? true : false;

export type ReservationFormRef = {
  site_id: number;
  postcode: string;
  address: string;
  state: string;
  suburb: string;
  name: string;
  phone: string;
};

const testMarkers = [
  {
    lat: -25.365,
    lng: 131.043,
    name: "test1_location",
    site_id: 1,
    location: "test Site 1",
  },
  {
    lat: -29.365,
    lng: 135.043,
    name: "test2_location",
    site_id: 2,
    location: "test Site 2",
  },
  {
    lat: -23.365,
    lng: 151.043,
    name: "test3_location",
    site_id: 3,
    location: "test Site 3",
  },
];

export interface Request {
  email: string;
  first_name: string;
  last_name: string;
  message: string;
  phone: string;
}

function sitesApi() {
  return http.request({
    url: "/api/sites/query",
    method: "POST",
  });
}

function reservationsApi() {
  return http.request({
    url: "/api/reservation/query",
    method: "POST",
  });
}

function postcodeApi(params: string) {
  return http.request({
    url: "/api/sites/query",
    method: "POST",
    data: {
      postcode: params,
    },
  });
}

function contactCreateApi(params: Request) {
  return http.request<{ data: any }>({
    url: "/api/contact/create",
    method: "POST",
    data: params,
  });
}

function reservationCreateApi(params: ReservationFormRef) {
  return http.request<{ data: any }>({
    url: "/api/reservation/create",
    method: "POST",
    data: params,
  });
}

const Home: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCbuU90m42i12SBKwL3BMztXVFpTIj9LA8",
  });
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [login, setLogin] = useState(false);

  const center = useMemo(() => ({ lat: -34.10919, lng: 141.921823 }), []);
  const [sites, setSites] = useState([]);

  const [searchSiteParams, setSearchSiteParams] = useState<null | string>(null);
  const [sitesSearched, setSitesSearched] = useState([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSampleOpen, setIsSampleOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<ISite | null>(null);
  const [siteId, setSiteId] = useState(0);
  const [sitesReserved, setSitesReserved] = useState<ISite[]>([]);
  const isMobile = window.innerWidth < 768 ? true : false;

  // cantact
  const contactRef = useRef<Request>({
    email: "",
    first_name: "",
    last_name: "",
    message: "",
    phone: "",
  });

  const reservationFormRef = useRef<ReservationFormRef>({
    address: "",
    state: "",
    postcode: "",
    site_id: 0,
    suburb: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    const userInfo = sessionStorage.getItem("USER");
    if (userInfo) {
      setCurrentUser(JSON.parse(userInfo));
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  useEffect(() => {
    sitesApi().then((res) => {
      setSites(res.data.content);
    });
    reservationsApi().then((res) => {
      setSitesReserved(res.data.content);
    });
  }, [login]);

  useEffect(() => {
    if (searchSiteParams && searchSiteParams?.length === 4) {
      postcodeApi(searchSiteParams).then((res) => {
        setSitesSearched(res.data.content);
        setSelectedSite(null);
      });
    } else {
      setSitesSearched([]);
    }
  }, [searchSiteParams]);

  const GoogleScrollRef = useRef<HTMLDivElement>(null);

  const handlScrollTrigger = () => {
    if (GoogleScrollRef.current) {
      GoogleScrollRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const markers = useMemo(() => {
    return sites.map((site: ISite) => {
      return {
        lat: site.lat,
        lng: site.lng,
        address: site.address,
        city: site.city,
        state: site.state,
        waterway: site.waterway,
        location: site.location,
        site_id: site.site_id,
        name: site.name,
      };
    });
  }, [sites]);

  const reservedSitesIDs = useMemo(() => {
    return sitesReserved.map((site: ISite) => {
      return site.site_id.toString();
    });
  }, [sitesReserved]);

  const lgUp = useResponsive("up", "lg");
  return (
    <Container>
      <div className="header-wrapper">
        <div
          className="header"
          style={
            !lgUp
              ? {
                  padding: "9px 16px",
                }
              : {}
          }>
          <img className={"logo"} src="http://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/Logotype-Wildlife-Search_Odonata-1.svg" />
          {lgUp ? (
            <div className="navigation">
              <MenuTemplate data={about} />
              <MenuTemplate data={join} />
              <MenuTemplate data={citizen} />
              {/* <a
                onClick={() => {
                  document.getElementById("roll1_top")!.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="text">
                Contact
              </a> */}
              <a
                className="button"
                onClick={() => {
                  !login && setIsLoginOpen(true);
                }}>
                {login && currentUser ? currentUser?.name : "Login / Signup"}
              </a>
            </div>
          ) : (
            <>
              <IconButton
                onClick={() => {
                  setIsShowMenu(true);
                  window.addEventListener("wheel", handleStopWheel, {
                    passive: false,
                  });
                }}
                style={{
                  position: "absolute",
                  right: 20,
                }}>
                <Iconify icon={"material-symbols:menu"} width={34} />
              </IconButton>
              {isShowMenu && (
                <div
                  style={{
                    position: "fixed",
                    width: "100vw",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    zIndex: 100,
                  }}>
                  <IconButton
                    onClick={() => {
                      setIsShowMenu(false);
                      window.removeEventListener("wheel", handleStopWheel);
                    }}
                    style={{
                      position: "absolute",
                      top: 60,
                      right: 20,
                      zIndex: 111,
                    }}>
                    <Iconify icon="ic:outline-close" width={34} />
                  </IconButton>
                  <div
                    style={{
                      width: "100vw",
                      position: "absolute",
                      top: 10,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      height: "calc(100vh)",
                      justifyContent: "space-evenly",
                      zIndex: 110,
                    }}>
                    <MenuTemplateZippedList />
                    <div
                      className="loginBtnInfo"
                      style={{
                        marginLeft: "10px",
                      }}>
                      <a
                        onClick={() => {
                          setIsLoginOpen(true);
                          setIsShowMenu(false);
                          window.addEventListener("wheel", handleStopWheel, {
                            passive: false,
                          });
                        }}
                        className={`each leftMd`}>
                        {login && currentUser ? currentUser?.name : "Login / Signup"}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="content-area">
        <section className="banner">
          <img
            className={lgUp ? "image" : "imageMb"}
            src="http://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/bannerImage.png"
            style={{ height: isMobile ? "500px" : "100%", width: "100%", objectFit: "cover" }}
            alt="header"
          />
          <div
            className="content"
            style={
              !lgUp
                ? {
                    width: "100vw",
                  }
                : {}
            }>
            {lgUp ? (
              <p className="title">Join the Great Australian Wildlife Search</p>
            ) : (
              <div>
                <div
                  className="titleMd"
                  style={{
                    fontFamily: " sans-serif",
                  }}>
                  Join the Great
                </div>
                <div
                  className="titleMd"
                  style={{
                    fontFamily: " sans-serif",
                  }}>
                  Australian
                </div>
                <div
                  className="titleMd"
                  style={{
                    fontFamily: " sans-serif",
                  }}>
                  Wildlife Search
                </div>
              </div>
            )}
            <p className={lgUp ? "paragraph" : "paragraphMd"}>A revolution in wildlife mapping and conservation, delivered by Odonata Foundation</p>
            {lgUp ? (
              <div className="buttons">
                <a
                  className="each left"
                  onClick={() => {
                    login ? setIsSampleOpen(true) : setIsLoginOpen(true);
                  }}>
                  Submit Sample
                </a>
                <a
                  className="each right"
                  onClick={() => {
                    handlScrollTrigger();
                  }}>
                  Reserve a Site
                </a>
              </div>
            ) : (
              <>
                <div className="buttons">
                  <a
                    style={{
                      fontFamily: " sans-serif",
                    }}
                    className={`each ${lgUp ? "left" : "leftMd"}`}
                    onClick={() => {
                      setIsSampleOpen(true);
                    }}>
                    Submit Sample
                  </a>
                </div>
                <div className="buttons">
                  <a
                    className="each right"
                    style={{
                      fontFamily: " sans-serif",
                    }}
                    onClick={() => {
                      handlScrollTrigger();
                    }}>
                    Reserve a Site
                  </a>
                </div>
              </>
            )}
          </div>
        </section>
        <section className="section-container" style={{ background: "#EBEAD5" }}>
          <div className="content">
            <div className={lgUp ? "row-items" : "row-items-md"}>
              <div className="image">
                <img src="http://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/demo.png" />
              </div>
              <div className="article">
                <p className="text-l">
                  Imagine you could identify where threatened species live by collecting just a few samples of water… thanks to new environmental DNA (eDNA) technology this is now a reality, and we
                  need you!
                </p>
                <p className="text-s">
                  By knowing where our precious wildlife live, like the platypus and Murray River Short-Necked Turtle, we could conserve their habitat for generations to come. Please help us collect
                  water samples which contain DNA from animals that have passed through the area in the past 14 days. Wild hey.
                </p>
                <p className="text-s">
                  <Hyperlink string="Learn more" link="https://greataustralianwildlifesearch.framer.website/about#edna" /> about why eDNA sampling is groundbreaking.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={lgUp ? "section-container" : "section-container-mb"}>
          <div className="content">
            <div className="title">
              <p className="high">Murray–Darling Basin region now inviting volunteers</p>
            </div>
            <div className={lgUp ? "row-items" : "row-items-md"}>
              <div className="article">
                <p className="text-m">
                  We are currently inviting citizen scientists to reserve their testing site. Thanks to the Murray–Darling Basin Authority (MDBA) we are offering the first 420 sites for FREE.
                </p>
                <p className="text-s">
                  It costs $400 per sampling site from site reservation to data analysis and reporting, so this season of testing would not be possible without the generous support of the MDBA.
                </p>
                <Stack direction={"row"} spacing={0.5} flexWrap="wrap">
                  <p className="text-s">
                    Head to our
                    <Hyperlink string=" Citizen Scientist " link="https://greataustralianwildlifesearch.framer.website/for_citizen_scientists" /> section if you’d like to know a little more before
                    reserving your site, otherwise head to the map below.
                  </p>
                </Stack>
              </div>
              <div className="image">
                <img
                  style={
                    !lgUp
                      ? {
                          objectFit: "cover",
                          borderRadius: "12px",
                          height: "456px",
                        }
                      : {}
                  }
                  src="http://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/demo2.png"
                />
              </div>
            </div>
          </div>
        </section>
        <section className={lgUp ? "section-container" : "section-container-mb"} style={{ background: "#EBEAD5" }}>
          <div className="content">
            <div className="title">
              <p className="high">Reserve your testing site</p>
              <p className="normal">
                Simply use the map to reserve your preferred testing location. You will receive a confirmation email with all the details, including when test kits will be distributed and what happens
                next.
              </p>
            </div>
            <div className={lgUp ? "map-area" : "map-area-mb"} ref={GoogleScrollRef}>
              {!isLoaded ? (
                <div>Loading...</div>
              ) : (
                <GoogleMap mapContainerClassName="map" center={center} zoom={10}>
                  {markers.map((marker: ISite, index: number) => {
                    // @ts-ignore
                    if (reservedSitesIDs.includes(marker.site_id)) {
                      return (
                        <MarkerF
                          key={index}
                          position={{ lat: marker.lat, lng: marker.lng }}
                          onClick={() => {
                            // 没登陆，弹出登陆
                            if (!login) {
                              setIsLoginOpen(true);
                            } else {
                              enqueueSnackbar("This site has been reserved", {
                                variant: "warning",
                                autoHideDuration: 5000,
                              });
                            }
                          }}
                          options={{
                            icon: {
                              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                            },
                          }}
                        />
                      );
                    }
                    return (
                      <MarkerF
                        key={index}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                          // 没登陆，弹出登陆
                          if (!login) {
                            setIsLoginOpen(true);
                          } else {
                            setSiteId(marker.site_id);
                            setSelectedSite(marker);
                            console.log(marker);
                          }
                        }}
                      />
                    );
                  })}
                </GoogleMap>
              )}
              <div className="form" style={{ marginTop: isMobile ? "20px" : 0 }}>
                {/* <Autocomplete
                  id={"postcode search"}
                  freeSolo
                  sx={{ width: "100%" }}
                  renderInput={(params) => {
                    if (params.inputProps.value !== undefined) {
                      setSearchSiteParams(params.inputProps.value.toString());
                      return <TextField {...params} label={"Site"} />;
                    }
                  }}
                  options={sitesSearched}
                  disableClearable
                /> */}
                {selectedSite === null &&
                  sitesSearched.length > 0 &&
                  sitesSearched.map((site: any, index: number) => {
                    return (
                      <div
                        key={site.id}
                        onClick={() => {
                          setSelectedSite(site);
                        }}>
                        <div
                          className="card"
                          style={{
                            padding: "12px 16px 16px 20px",
                            background: "#FFFFFF",
                            border: "1.5px solid #565656",
                            borderRadius: "12px",
                          }}>
                          <p
                            className="name"
                            style={{
                              fontSize: "20px",
                              color: "#6D6D1F",
                              lineHeight: "32px",
                            }}>
                            {site.city}
                          </p>
                          <p
                            className="location"
                            style={{
                              fontSize: "12px",
                              color: "#332820",
                              marginBottom: "10px",
                            }}>
                            {site.waterway === "" ? "No Waterway" : site.waterway}
                          </p>
                          <div
                            className="grid"
                            style={{
                              display: "grid",
                              gridTemplateColumns: "3fr 1fr",
                            }}>
                            <div>
                              <p
                                className="tit"
                                style={{
                                  fontSize: "12px",
                                  color: "#332820",
                                  lineHeight: "20px",
                                }}>
                                {"Location:"}
                              </p>
                              <p
                                className="tit"
                                style={{
                                  fontSize: "12px",
                                  color: "#332820",
                                  lineHeight: "20px",
                                }}>
                                {"Lat:" + " " + site.lat}
                              </p>
                              <p
                                className="tit"
                                style={{
                                  fontSize: "12px",
                                  color: "#332820",
                                  lineHeight: "20px",
                                }}>
                                {"Lng:" + " " + site.lng}
                              </p>
                              <p
                                className="con"
                                style={{
                                  fontSize: "12px",
                                  color: "#755F43",
                                  lineHeight: "20px",
                                }}>
                                {site.state}
                              </p>
                            </div>
                            <div>
                              <p className="tit">Site ID</p>
                              <p className="con">{site.site_id}</p>
                            </div>
                          </div>{" "}
                        </div>
                      </div>
                    );
                  })}
                {selectedSite && (
                  <>
                    <div className="card">
                      <p
                        className="name"
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                        }}>
                        {selectedSite.city}
                      </p>
                      <p
                        className="location"
                        style={{
                          fontSize: "13px",
                          marginTop: "8px",
                        }}>
                        {selectedSite.waterway === "" ? "No Waterway" : selectedSite.waterway}
                      </p>
                      <div className="grid">
                        <div>
                          <p
                            className="tit"
                            style={{
                              fontSize: "13px",
                            }}>
                            {"Location:"}
                          </p>
                          <p
                            className="tit"
                            style={{
                              fontSize: "13px",
                            }}>
                            {"Lat:" + " " + selectedSite.lat}
                          </p>
                          <p
                            className="tit"
                            style={{
                              fontSize: "13px",
                            }}>
                            {"Lng:" + " " + selectedSite.lng}
                          </p>
                          <p className="con">{selectedSite.state}</p>
                        </div>
                        <div>
                          <p className="tit">Site ID</p>
                          <p className="con">{selectedSite.site_id}</p>
                        </div>
                      </div>{" "}
                    </div>
                    {isReservationOpen === false ? (
                      <button
                        style={{
                          width: "100%",
                          height: "40px",
                          background: "#6D6D1F",
                          fontSize: "18px",
                          color: "#FFFFFF",
                          borderRadius: "6px",
                          border: "3px solid #6D6D1F",
                          boxShadow: "1px 1px 0 grey",
                        }}
                        onClick={() => {
                          if (!login) {
                            enqueueSnackbar("Please login first", {
                              variant: "warning",
                              autoHideDuration: 2000,
                            });
                          } else {
                            setIsReservationOpen(true);
                          }
                        }}>
                        Reserve
                      </button>
                    ) : (
                      <div className="input-content">
                        <h4
                          style={{
                            marginTop: 20,
                            marginBottom: 20,
                          }}>
                          Shipping Address
                        </h4>
                        <div
                          id="name-postcode"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}>
                          <div className="input-area">
                            <div className="form-item">
                              <p
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                }}>
                                Address
                              </p>
                              <input
                                type="text"
                                placeholder="Address"
                                value={currentUser?.address}
                                onChange={(e) => {
                                  reservationFormRef.current.address = e.target.value ? e.target.value : currentUser?.address;
                                }}
                              />
                            </div>
                            <div className="form-item">
                              <p
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                }}>
                                Suburb
                              </p>
                              <input
                                type="text"
                                placeholder="Suburb"
                                onChange={(e) => {
                                  reservationFormRef.current.suburb = e.target.value;
                                }}
                              />
                            </div>
                            <div className="form-item">
                              <p
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                }}>
                                State
                              </p>
                              <input
                                type="text"
                                placeholder="State"
                                onChange={(e) => {
                                  reservationFormRef.current.state = e.target.value;
                                }}
                              />
                            </div>
                            <div className="form-item">
                              <p
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                }}>
                                PostCode
                              </p>
                              <input
                                type="text"
                                placeholder="Postcode"
                                value={currentUser?.postcode}
                                onChange={(e) => {
                                  reservationFormRef.current.postcode = e.target.value;
                                }}
                              />
                            </div>
                            <div className="form-item">
                              <p
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                }}>
                                Name
                              </p>
                              <input
                                type="text"
                                placeholder="Name"
                                value={currentUser.name}
                                onChange={(e) => {
                                  reservationFormRef.current.name = e.target.value ? e.target.value : currentUser?.name;
                                }}
                              />
                            </div>
                            <div className="form-item">
                              <p
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                }}>
                                Phone
                              </p>
                              <input
                                type="text"
                                placeholder="Phone"
                                onChange={(e) => {
                                  reservationFormRef.current.phone = e.target.value;
                                }}
                              />
                            </div>

                            <button
                              style={{
                                width: "100%",
                                height: "40px",
                                background: "#6D6D1F",
                                fontSize: "18px",
                                color: "#FFFFFF",
                                borderRadius: "6px",
                                border: "3px solid #6D6D1F",
                                boxShadow: "1px 1px 0 grey",
                                marginTop: "16px",
                              }}
                              onClick={() => {
                                reservationFormRef.current.site_id = selectedSite.site_id;
                                reservationCreateApi(reservationFormRef.current).then((res) => {
                                  enqueueSnackbar("Your reservation has been sent successfully!", {
                                    variant: "success",
                                    autoHideDuration: 2000,
                                  });
                                  setIsReservationOpen(false);
                                });
                              }}>
                              Save and deliver here
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div id="reservation-form"></div>
            </div>
            <p style={{ marginTop: "22px" }}>Water sampling can take place anytime between 16 October – 27 November 2023</p>
          </div>
        </section>
        <div id="roll1_top"></div>
        <section
          className={lgUp ? "section-container" : "section-container-mb"}
          style={{
            paddingBottom: "50px",
            paddingTop: "50px",
          }}>
          <iframe
            height={isMobile ? "1000px" : "1200px"}
            width={isMobile ? "100%" : "800px"}
            src="https://us8.list-manage.com/contact-form?u=410d225b855e5437b7f902ae9&form_id=80e27f3aae6ceaa654206be3ba1a8bd0"
            frameBorder={"none"}
          />
        </section>
      </div>
      <div className={lgUp ? "aside-area" : "aside-area-mb"}>
        <div className="content">
          <div className="left">
            <p className="text-m" style={{ marginBottom: "16px" }}>
              The Great Australian Wildlife Search is a program of the Odonata Foundation, thanks to the generous support of the Murray–Darling Basin Authority. All donations of $2 or more are
              tax-deductible in Australia.
            </p>
            <p className="text-m" style={{ margin: "30px 0 16px 0" }}>
              The Great Australian Wildlife Search is being delivered with support of the Basin Condition Monitoring Program – an Australian Government commitment to develop and deliver new monitoring
              and reporting of economic, social, cultural and environmental conditions in the Basin.
            </p>
            <p className="text-m" style={{ margin: "30px 0 16px 0", fontWeight: "600" }}>
              The Great Australian Wildlife Search is delivered by
            </p>
            <div
              className="image-row"
              style={{
                width: "300px",
              }}>
              <img src="https://wildlifesearch.s3.ap-southeast-2.amazonaws.com/websites/ODONATA-foundation-line+1.png" />
            </div>
            <p className="text-m" style={{ margin: "30px 0 16px 0" }}>
              In partnership with
            </p>
            <div className="image-row">
              <img src="https://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/MDBA-Logo-1-1.png" />
              <img src="https://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/EnviroDNA-blue-1.png" />
            </div>
            <p className="text-s" style={{ margin: "30px 0 16px 0" }}>
              We acknowledge the Indigenous people of Australia as the Traditional Custodians of the lands where we live, learn and work. We pay our respects to their Elders past, present and
              emerging.
            </p>
          </div>
          {/* <div className="right">
            <MenuTemplateZippedFooter />
          </div> */}
        </div>
      </div>
      <div className="footer">
        <div className="content">
          <div className="site-info">
            <p className="text">© 2023 Odonata Foundation. All rights reserved.</p>
            <div className="icons">
              <a className="each">
                <img src={facebookSVG} />
              </a>
              <a className="each">
                <img src={instagramSVG} />
              </a>
              <a className="each">
                <img src={twitterSVG} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <ReservationModal siteId={siteId} open={isReservationOpen} onClose={() => setIsReservationOpen(false)}></ReservationModal> */}
      <LoginModal open={isLoginOpen} login={login} setLogin={setLogin} setCurrentUser={setCurrentUser} onClose={() => setIsLoginOpen(false)}></LoginModal>
      <SampleModal open={isSampleOpen} sites={markers} setIsSampleOpen={setIsSampleOpen} onClose={() => setIsSampleOpen(false)}></SampleModal>
    </Container>
  );
};
export default Home;

interface IMenuTitle {
  group_name: string;
  items: IMenuItem[];
}

interface IMenuItem {
  name: string;
  link: string;
}

export function MenuTemplate(props: { data: IMenuTitle }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        sx={{
          color: "#332820",
        }}
        endIcon={!open ? <Iconify icon="ic:outline-keyboard-arrow-down" width={24} /> : <Iconify icon="ic:outline-keyboard-arrow-up" width={24} />}
        onMouseEnter={handleClick}>
        {props.data.group_name}
      </Button>
      <Menu
        id="basic-menu"
        sx={{
          borderRadius: "12px",
          width: "500px",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          onMouseLeave: handleClose,
        }}>
        {props.data.items.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => {
              window.location.href = item.link;
            }}>
            <Typography variant="inherit" noWrap color={"#332820"}>
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

function MenuTemplateZipped(props: { data: IMenuTitle; dark?: boolean }) {
  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="h6" noWrap fontWeight={600} fontSize={16} color={props.dark ? "#332820" : "white"}>
        {" "}
        {props.data.group_name}
      </Typography>
      <Stack direction="column" spacing={1}>
        {props.data.items.map((item) => (
          <Typography
            sx={{
              cursor: "pointer",
            }}
            variant="h6"
            noWrap
            fontWeight={400}
            fontSize={14}
            color={props.dark ? "#332820" : "white"}
            onClick={() => {
              window.location.href = item.link;
            }}>
            {item.name}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}

function MenuTemplateZippedList() {
  return (
    <Stack direction="column" spacing={1} pl={"10px"}>
      <MenuTemplateZipped data={about} dark />
      <MenuTemplateZipped data={join} dark />
      <MenuTemplateZipped data={citizen} dark />
    </Stack>
  );
}

function MenuTemplateZippedFooter() {
  return (
    <Stack direction="column" spacing={1} pl={0}>
      <MenuTemplateZipped data={about} />
      <MenuTemplateZipped data={join} />
      <MenuTemplateZipped data={citizen} />
    </Stack>
  );
}

const Hyperlink = (props: { string: string; link: string }) => {
  return (
    <a
      href={props.link}
      style={{
        textDecoration: "underline",
        color: "#332820",
      }}>
      {props.string}
    </a>
  );
};
