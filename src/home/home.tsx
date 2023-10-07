import React, {useEffect, useMemo, useState} from "react";
import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import facebookSVG from "../assets/facebook.svg";
import instagramSVG from "../assets/instagram.svg";
import twitterSVG from "../assets/twitter.svg";
import Container from "./home.style";
import InputModal from "./modal/modal";
import LoginModal from "./modal/loginModal";
import {ISite} from "../interfaces";
import axios, {AxiosError, AxiosResponse} from "axios";

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

const Home: React.FC = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyC2UQBWd-kkALximl2gxxBxuVTJ9rE2b7w",
  });

  const center = useMemo(() => ({lat: -25.363, lng: 131.044}), []);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:9000/api/sites/query",
      data: {}
    })
      .then((response: AxiosResponse) => {
        setSites(response.data.data.content)
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
  }, []);

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
        name: site.name
      };
    });
  }, [sites])

  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <Container>
      <div className="header-wrapper">
        <div className="header">
          <img
            className="logo"
            src="http://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/Logotype-Wildlife-Search_Odonata-1.svg"
          />
          <div className="navigation">
            <a className="text">Reserve testing site</a>
            <a className="text">FAQ</a>
            <a className="text">Contact</a>
            <a
              onClick={() => {
                setOpenLogin(true);
              }}
              className="button">
              Login / Signup
            </a>
          </div>
        </div>
      </div>
      <div className="content-area">
        <section className="banner">
          <img
            className="image"
            src="http://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/bannerImage.png"
          />
          <div className="content">
            <p className="title">Join the Great Australian Wildlife Search</p>
            <p className="paragraph">
              A revolution in wildlife mapping and conservation, delivered by
              Odonata Foundation
            </p>
            <div className="buttons">
              <a className="each left">Volunteer now</a>
              <a className="each right">Learn more</a>
            </div>
          </div>
        </section>
        <section
          className="section-container"
          style={{background: "#EBEAD5"}}>
          <div className="content">
            <div className="row-items">
              <div className="image">
                <img src="http://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/demo.png"/>
              </div>
              <div className="article">
                <p className="text-l">
                  Imagine you could identify where threatened species live by
                  collecting just a few samples of water… thanks to new
                  environmental DNA (eDNA) technology this is now a reality, and
                  we need you!
                </p>
                <p className="text-s">
                  By knowing where our precious wildlife live, like the platypus
                  and Marray River short-necked turtle, we could conserve their
                  habitat for generations to come. Please help us collect water
                  samples which contain DNA from animals that have passed
                  through the area in the past 14 days – pretty wild hey!
                </p>
                <p className="text-s">
                  Learn more about why eDNA sampling is groundbreaking.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section-container">
          <div className="content">
            <div className="title">
              <p className="high">
                Murray–Darling Basin region now inviting volunteers
              </p>
            </div>
            <div className="row-items">
              <div className="article">
                <p className="text-m">
                  We are currently inviting citizen scientists to reserve their
                  testing site. Thanks to the Murray–Darling Basin Authority
                  (MDBA) we are offering the first 420 sites for FREE.
                </p>
                <p className="text-s">
                  Just so you know, it costs $400 per sampling site from
                  beginning to data analysis and reporting, so this season of
                  testing would not be possible without the generous support of
                  the MDBA.
                </p>
                <p className="text-s">
                  Visit our ‘Citizen Scientist’ section if you’d like to know
                  more before reserving your site, otherwise scroll to the
                  reservation map.
                </p>
                <p className="text-s">
                  Note: If you’re out of region but would like to be keep in the
                  loop regarding future testing seasons, sign up here
                </p>
              </div>
              <div className="image">
                <img src="http://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/demo2.png"/>
              </div>
            </div>
          </div>
        </section>
        <section
          className="section-container"
          style={{background: "#EBEAD5"}}>
          <div className="content">
            <div className="title">
              <p className="high">Reserve your testing site</p>
              <p className="normal">
                Simply use the map to reserve your preferred testing location.
                You will receive a confirmation email with all the details,
                including when test kits will be distributed and what happens
                next.
              </p>
            </div>
            <div className="map-area">
              {!isLoaded ? (
                <div>Loading...</div>
              ) : (
                <GoogleMap
                  mapContainerClassName="map"
                  center={center}
                  zoom={10}>
                  {markers.map((marker: any, index: number) => {
                    console.log(marker)
                      return (
                        <MarkerF
                          key={index}
                          position={{lat: marker.lat, lng: marker.lng}}
                          onClick={() => {
                            console.log(
                              "marker clicked" + marker.lat + " " + marker.lng
                            );
                            setTimeout(() => {
                              setOpen(true);
                            });
                          }}
                        />
                      )
                    }
                  )}
                </GoogleMap>
              )}
              <div className="form">
                <div className="search">
                  <input
                    type="text"
                    placeholder="Search by postcode or suburb"
                  />
                </div>
                <div className="card">
                  <p className="name">Jilltown</p>
                  <p className="location">Jills Creek</p>
                  <div className="grid">
                    <div>
                      <p className="tit">Location</p>
                      <p className="con">
                        100 Nort St, Jilltown, New South Wales
                      </p>
                    </div>
                    <div>
                      <p className="tit">Site ID</p>
                      <p className="con">683</p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <p className="name">Jilltown</p>
                  <p className="location">Jills Creek</p>
                  <div className="grid">
                    <div>
                      <p className="tit">Location</p>
                      <p className="con">
                        100 Nort St, Jilltown, New South Wales
                      </p>
                    </div>
                    <div>
                      <p className="tit">Site ID</p>
                      <p className="con">683</p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <p className="name">Jilltown</p>
                  <p className="location">Jills Creek</p>
                  <div className="grid">
                    <div>
                      <p className="tit">Location</p>
                      <p className="con">
                        100 Nort St, Jilltown, New South Wales
                      </p>
                    </div>
                    <div>
                      <p className="tit">Site ID</p>
                      <p className="con">683</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p style={{marginTop: "22px"}}>
              Water sampling can take place anytime between 16 October – 27
              November 2023
            </p>
          </div>
        </section>
        <section className="section-container">
          <div className="content">
            <div className="title">
              <p className="high">Get in touch</p>
              <p className="normal" style={{color: "#6D6D1F"}}>
                Our friendly team would love to hear from you.
              </p>
            </div>
            <div className="input-area">
              <div className="name-wrapper">
                <div className="form-item">
                  <label>First name</label>
                  <input type="text" placeholder="First name"/>
                </div>
                <div className="form-item">
                  <label>Last name</label>
                  <input type="text" placeholder="Last name"/>
                </div>
              </div>
              <div className="form-item">
                <label>Email</label>
                <input type="email" placeholder="you@company.com"/>
              </div>
              <div className="form-item">
                <label>Phone number</label>
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  placeholder="0412 345 678"
                />
              </div>
              <div className="form-item">
                <label>Message</label>
                <textarea rows={4} cols={50}></textarea>
              </div>
              <div className="form-check">
                <input type="checkbox"/>
                <label>You agree to our privacy policy.</label>
              </div>
              <button className="submit">Send message</button>
            </div>
          </div>
        </section>
      </div>
      <div className="aside-area">
        <div className="content">
          <div className="left">
            <p className="text-m" style={{marginBottom: "16px"}}>
              The Great Australian Wildlife Search is a program of the Odonata
              Foundation, thanks to the generous support of the Murray–Darling
              Basin Authority. All donations of $2 or more are tax-deductible in
              Australia.
            </p>
            <p className="text-m" style={{margin: "30px 0 16px 0"}}>
              The Great Australian Wildlife Search is delivered by
            </p>
            <div className="image-row">
              <img src="https://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/footerLogo.png"/>
            </div>
            <p className="text-m" style={{margin: "30px 0 16px 0"}}>
              In partnership with
            </p>
            <div className="image-row">
              <img src="https://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/MDBA-Logo-1-1.png"/>
              <img src="https://www.demo.smileitsolutions.com/odonata/wp-content/uploads/2023/09/EnviroDNA-blue-1.png"/>
            </div>
            <p className="text-s" style={{margin: "30px 0 16px 0"}}>
              We acknowledge the Indigenous people of Australia as the
              Traditional Custodians of the lands where we live, learn and work.
              We pay our respects to their Elders past, present and emerging.
            </p>
          </div>
          <div className="right">
            <a className="each">Get started</a>
            <a className="each">Contact</a>
            <a className="each">Account</a>
            <a className="each">Submit sample</a>
            <a className="each">Privacy</a>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="content">
          <div className="site-info">
            <p className="text">
              © 2023 Odonata Foundation. All rights reserved.
            </p>
            <div className="icons">
              <a className="each">
                <img src={facebookSVG}/>
              </a>
              <a className="each">
                <img src={instagramSVG}/>
              </a>
              <a className="each">
                <img src={twitterSVG}/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <InputModal open={open} onClose={() => setOpen(false)}></InputModal>
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}></LoginModal>
    </Container>
  );
};

export default Home;
