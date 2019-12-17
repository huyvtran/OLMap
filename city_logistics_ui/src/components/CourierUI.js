import React from 'react';
import FVHTabsUI from "./FVHTabsUI";
import AvailablePackages from "components/package_lists/AvailablePackages";
import ReservedPackageLists from "components/package_lists/ReservedPackageLists";


export default class CourierUI extends FVHTabsUI {
  tabs = {
    myPackages: {
      header: 'My packages',
      ChildComponent: ReservedPackageLists,
      icon: 'directions_bike',
      menuText: 'Packages'
    },
    availablePackage: {
      header: 'Available',
      ChildComponent: AvailablePackages,
      childProps: {onPackageReserved: () => this.setState({activeTab: 'myPackages'})},
      icon: 'dynamic_feed',
      menuText: 'Available'
    },
  };

  state = {
    activeTab: 'myPackages'
  };
}