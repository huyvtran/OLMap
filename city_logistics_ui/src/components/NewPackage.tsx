import React from 'react';

// @ts-ignore
import Form from "react-jsonschema-form";
import places, { ReconfigurableOptions, Suggestion } from "places.js";
import loadData from "../loadData";
import Spinner from "util_components/Spinner";

import settings from "settings.json";
import Error from "util_components/Error";
import moment from "moment";
import Component from "util_components/Component";

type func = () => any;

export default class NewPackage extends Component<{onCreated: func}> {
  addressFields = ['pickup_at', 'deliver_to'];
  stringField = {type: "string", maxLength: 128, minLength: 1};
  autocompleteFields: {[index: string]: any} = {};
  selectedAddresses: {[index: string]: any} = {};

  timeFieldDefaults = {
    earliest_pickup_time: 0,
    latest_pickup_time: 4,
    earliest_delivery_time: 0,
    latest_delivery_time: 6,
  };

  state = {
    schema: null,
    error: false
  };

  static bindMethods = ['onSubmit'];

  componentDidMount() {
    loadData('/rest/outgoing_packages/jsonschema/')
    .then((response) => response.json())
    .then((schema) => this.setSchema(schema))
  }

  componentDidUpdate() {
    const {auth, configuration} = settings.algoliaPlaces;
    this.addressFields.forEach((field) => {
      const inputEl = document.getElementById(`root_${field}`);
      if (inputEl) {
        this.autocompleteFields[field] = places({
          ...auth,
          container: inputEl as HTMLInputElement
        }).configure(configuration as ReconfigurableOptions);
        this.autocompleteFields[field].on('change', (e: any) => this.onAddressChange(field, e.suggestion));
      }
    });
  }

  render() {
    const {schema, error} = this.state;
    if (schema) {
      return <>
        <Error status={error} message="Creation failed. Try again maybe?"/>
        <Form schema={schema} onSubmit={this.onSubmit}/>
      </>
    } else return <Spinner/>
  }

  setSchema(schema: any) {
    this.addressFields.forEach((field) =>
      schema.properties[field] = {...this.stringField, title: schema.properties[field].title});
    Object.entries(this.timeFieldDefaults).forEach(([field, hours]) =>
      schema.properties[field].default = moment().startOf('hour').add(hours + 1, 'hours').format()
    )
    this.setState({schema});
  }

  onAddressChange(fieldName: string, address: Suggestion) {
    this.selectedAddresses[fieldName] = {
      street_address: address.name,
      postal_code: address.postcode,
      city: address.city,
      country: address.country,
      lat: address.latlng.lat,
      lon: address.latlng.lng
    };
  }

  // @ts-ignore
  onSubmit({formData}) {
    loadData('/rest/outgoing_packages/', {method: 'POST', data: {...formData, ...this.selectedAddresses}})
    .then((response) => {
      if (response.status == 201) this.props.onCreated();
      else this.setState({error: true});
    })
  }
}