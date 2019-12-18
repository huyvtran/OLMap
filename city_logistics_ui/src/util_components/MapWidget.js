import React from "react";
import Map from "util_components/Map";

export default class MapWidget extends React.Component {
  state = {
    mapOpen: null
  };

  render() {
    const {mapOpen} = this.state;

    return <>
      <i className="material-icons float-right text-primary"
         onClick={() => this.setState({mapOpen: true})}>map</i>

      {mapOpen && <Map {...this.props} onClose={() => this.setState({mapOpen: false})}/>}
    </>;
  }
}