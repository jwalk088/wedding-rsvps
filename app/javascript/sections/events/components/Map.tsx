import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import { styles } from "../../../foundation";

const MapWrapper = styled.div`
  height: 280px;
  width: 400px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    width: 100%;
  }
`;

const PinWrapper = styled.div``;
const PinText = styled.p`
  width: max-content;
`;

interface Props {
  address: string;
  lat: number;
  lng: number;
}

const LocationPin = ({ text }) => (
  <PinWrapper>
    <Icon name="map pin" />
    <PinText className="pin-text">{text}</PinText>
  </PinWrapper>
);

function Map({ address, lat, lng }: Props) {
  return (
    <div>
      <MapWrapper>
        {/* <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          }}
          defaultCenter={{ lat, lng }}
          defaultZoom={13}
        >
          <LocationPin lat={lat} lng={lng} text={address} />
        </GoogleMapReact> */}
      </MapWrapper>
    </div>
  );
}

export default Map;
