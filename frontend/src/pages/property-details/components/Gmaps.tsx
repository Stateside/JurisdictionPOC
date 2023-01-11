import {ReactNode} from 'react';
import GoogleMapReact from 'google-map-react';

interface Marker {
  text: ReactNode,
  lat: number,
  lng: number,
}

interface GmapsProps {
  lat: number,
  lng: number,
}

const Marker = ({ text }: Marker) => <img style={{position: 'absolute', transform: 'translate(-50%, -50%)'}} src='/imgs/googleMapsPin.svg' />;

const key = process.env.NEXT_PUBLIC_GMAPS_API || '';

export default function Gmaps({lat, lng}: GmapsProps) {
  const defaultProps = {
    center: {
      lat,
      lng
    },
    zoom: 12
  };

  return <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={lat}
          lng={lng}
          text="📍"  
        />
      </GoogleMapReact>
    </div>
}