import React from 'react';
import Modal from "util_components/Modal";
import * as L from 'leaflet';
import settings from 'settings';

import styles from 'leaflet/dist/leaflet.css';

import GlyphIcon from "util_components/GlyphIcon";
import Geolocator from "util_components/Geolocator";

export default class Map extends React.Component {
  state = {
    currentPosition: null,
  };

  constructor(props) {
    super(props);
    this.initMapState()
  }

  initMapState() {
    this.initialZoom = 13;
    this.leafletMap = null;
    this.markers = {};
    this.path = null;
    this.userMovedMap = false;
  }

  render() {
    const {origin, destination, onClose, currentPositionIndex, currentPosition} = this.props;

    return <Modal title={`${origin.street_address} to ${destination.street_address}`} onClose={onClose}>
      <div id="leafletMap" style={{height: '70vh'}}> </div>
      {(currentPositionIndex > -1) && !currentPosition &&
        <Geolocator onLocation={([lat, lon]) => this.setState({currentPosition: {lat, lon}})}/>
      }
    </Modal>;
  }

  componentDidMount() {
    this.refreshMap();
  }

  componentWillUnmount() {
    if (this.leafletMap) this.leafletMap.remove();
    this.initMapState()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.refreshMap();
  }

  refreshMap() {
    const {origin, destination} = this.props;
    const currentPosition = this.getCurrentPosition();

    if (!this.leafletMap) {
      this.leafletMap = L.map('leafletMap');
      this.leafletMap.fitBounds(this.bounds());
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                     '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: settings.MapBox.accessToken
      }).addTo(this.leafletMap);
      this.path = L.polyline([]);
      this.path.addTo(this.leafletMap);

      this.leafletMap.on('zoomstart', () => this.userMovedMap = true);
      this.leafletMap.on('movestart', () => this.userMovedMap = true);
    }
    else if (!this.userMovedMap) this.leafletMap.fitBounds(this.bounds());

    this.path.setLatLngs(this.coords().map(({lat, lon}) => [lat, lon]));

    Object.entries({origin, destination, currentPosition}).forEach(([name, coord]) => {
      if (!coord) return;
      if (this.markers[name]) this.markers[name].setLatLng([coord.lat, coord.lon]);
      else
        this.markers[name] = L.marker(
          [coord.lat, coord.lon],
          {icon: new GlyphIcon({glyph: settings.markerIcons[name], glyphSize: 20})}
        ).addTo(this.leafletMap);
    });
  }

  getCurrentPosition() {
    return this.props.currentPosition || this.state.currentPosition;
  }

  coords() {
    const {origin, destination} = this.props;
    const currentPositionIndex = this.props.currentPositionIndex || 0;
    const currentPosition = this.getCurrentPosition();
    const coords = [origin, destination];

    if (currentPosition && (currentPositionIndex >= 0)) {
      coords.splice(currentPositionIndex, 0, currentPosition);
    }
    return coords;
  }

  bounds() {
    const coords = this.coords();
    const lats = coords.map((c) => c.lat);
    const lons = coords.map((c) => c.lon);
    return [[Math.min(...lats), Math.min(...lons)], [Math.max(...lats), Math.max(...lons)]];
  }
}
