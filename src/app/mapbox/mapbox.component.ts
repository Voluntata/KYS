import { AfterViewInit, Component, ViewChild, ElementRef, Input, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import Mapboxgl, { LngLatBounds, NavigationControl, GeolocateControl, Map, Popup, Marker} from "mapbox-gl"
import { environment } from 'src/environments/environment';
import { LocationModel } from 'src/models/location.model';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})


export class MapboxComponent implements AfterViewInit {
  @ViewChild("mapDiv")
  mapDivElement!: ElementRef;

  @ViewChildren('mapboxgl-marker') markers!: QueryList<any>;
  safeResultsToPrintOnMap: any[] = [];
  dangerResultsToPrintOnMap: any[] = [];
  helpResultsToPrintOnMap: any[] = [];
  friendResultsToPrintOnMap: any[] = []
  //@Input() filteredResultsToPrintOnMap!: MapBoxModel[];
  filteredResultsToPrintOnMap = [
    {
      name: "IT Academy",
      type: "danger",
      activity: "bar",
      address: [
        {
          street_name: "Roc Boronat",
          street_number: "117-127",
          zip_code: "08018",
          district_id: "04",
          town: "BARCELONA",
          location: {
            x: 2.19,
            y: 41.40,
          },
        },
      ],
    },
    {
      name: "Other Name",
      type: "safe",
      activity: "bar",
      address: [
        {
          street_name: "Roc Boronat",
          street_number: "117-127",
          zip_code: "08018",
          district_id: "04",
          town: "BARCELONA",
          location: {
            x: 2.1,
            y: 41.5,
          },
        },
      ],
    },
    {
      name: "Bershka",
      type: "safe",
      activity: "Tienda",
      address: [
        {
          street_name: "Roc Boronat",
          street_number: "117-127",
          zip_code: "08018",
          district_id: "04",
          town: "BARCELONA",
          location: {
            x: 2.2,
            y: 41.56,
          },
        },
      ],
    },
    {
      name: "Amigo",
      type: "amigo",
      address: [
        {
          street_name: "Roc Boronat",
          street_number: "117-127",
          zip_code: "08018",
          district_id: "04",
          town: "BARCELONA",
          location: {
            x: 2.3,
            y: 41.6,
          },
        },
      ],
    },
    {
      name: "Amigo",
      type: "help",
      address: [
        {
          street_name: "Roc Boronat",
          street_number: "117-127",
          zip_code: "08018",
          district_id: "04",
          town: "BARCELONA",
          location: {
            x: 2.32,
            y: 41.6,
          },
        },
      ],
    }

  ]
  private map!: Map;
  private currentMarkers: Marker[] = [];
  element: any;

  private MAPBOX_INIT_LOCATION: LocationModel = {
    name: "IT Academy",
    type: "danger",
    activity: "bar",
    address: [
      {
        street_name: "Calle",
        street_number: "117",
        zip_code: "08018",
        town: "BARCELONA",
        location: {
          x: 2.194060007737955,
          y: 41.40389733660671,
        },
      },
    ],
  }

  constructor() {

  }


  ngAfterViewInit(): void {
    // Generate map with basic config
    this.generateMap();
    // Depending on if the user accepts to share their location, center the map into the user, or into the default location (IT Academy)
    this.getUsersLocation();


      this.filteredResultsToPrintOnMap.forEach((result) => {
    // Create a marker for each result and add it to the map
      if (result.type === "safe") {
        this.createANewMarker("green", result);
      }
      if (result.type === "danger") {
        this.createANewMarker("red", result);
      }
      if (result.type === "amigo") {
        this.createANewMarker("yellow", result);
      }
      if (result.type === "help") {
        this.createANewMarker("purple", result);
      }
    //  console.log(this.currentMarkers)
    });

    //  this.currentMarkers.forEach(marker => {this.element = marker.getElement();
    //  this.element.className = "mapboxgl-marker-1";
    // console.log(this.element)})

  }

  // ngOnChanges() {
  //   this.filteredResultsToPrintOnMap.forEach((result) => {
  //     // Create a marker for each result and add it to the map
  //     this.createANewMarker("green", result);
  //     console.log(result)

  //   });
  // }
 showSafe(){
  this.currentMarkers.forEach(marker => marker.remove());
  this.getUsersLocation();
  this.safeResultsToPrintOnMap =  this.filteredResultsToPrintOnMap.filter(el =>
     el.type === "safe");
     console.log(this.filteredResultsToPrintOnMap)
     this.safeResultsToPrintOnMap.forEach((result) => {
      // Create a marker for each result and add it to the map
          this.createANewMarker("green", result);
        })
 }

 showDanger(){
  this.currentMarkers.forEach(marker => marker.remove());
  this.getUsersLocation();
  this.dangerResultsToPrintOnMap =  this.filteredResultsToPrintOnMap.filter(el =>
     el.type === "danger");
     console.log(this.filteredResultsToPrintOnMap)
     this.dangerResultsToPrintOnMap.forEach((result) => {
      // Create a marker for each result and add it to the map
          this.createANewMarker("red", result);
        })
 }

 showHelp(){
  this.currentMarkers.forEach(marker => marker.remove());
  this.getUsersLocation();
  this.helpResultsToPrintOnMap =  this.filteredResultsToPrintOnMap.filter(el =>
     el.type === "help");
     console.log(this.filteredResultsToPrintOnMap)
     this.helpResultsToPrintOnMap.forEach((result) => {
      // Create a marker for each result and add it to the map
          this.createANewMarker("purple", result);
        })
 }

  ngOnDestroy() {
    this.currentMarkers.forEach(marker => marker.remove());
  }

  generateMap() {
    Mapboxgl.accessToken = environment.MAPBOX_TOKEN;
    this.map = new Map({
      container: this.mapDivElement.nativeElement,
      style: environment.MAPBOX_STYLE,
      // center: [this.MAPBOX_INIT_LOCATION.address[0].location.x, this.MAPBOX_INIT_LOCATION.address[0].location.y], // starting center so it doesn't start from Germany
      zoom: environment.MAPBOX_ZOOM
    });

    this.map.addControl(new NavigationControl());

    // Add geolocate control to the map.
    this.map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

  }

  // Function to create a single marker (with the marker's colour and the business (or user's coords) as parameters)
  createANewMarker(markerColor: string, business?: LocationModel, coord?: GeolocationCoordinates): void {

    // Create a popup with the business's basic information
    const popup = new Popup().setHTML(
      `<b>${business?.name}</b> </br> ${business?.address[0].street_name} , ${business?.address[0].street_number}`
    );

    if (coord) { // If user has accepted to share their location

      const newIndividualMarker = new Marker({ color: markerColor })
        .setLngLat([coord.longitude, coord.latitude])
        .addTo(this.map);
      this.currentMarkers.push(newIndividualMarker);
    } else { // If user hasn't accepted to share their location OR when iterating through the filteredResultsToPrintOnMap array.
      const newIndividualMarker = new Marker({ color: markerColor })
        .setLngLat([business!.address[0].location.x, business!.address[0].location.y])
        .setPopup(popup)
        .addTo(this.map);
      this.currentMarkers.push(newIndividualMarker);
    }

    // MAP LÍMITS
    // Initial point 0
    const bounds = new LngLatBounds();

    // Add all the markers to the map's bounds.
    this.currentMarkers.forEach(marker =>
      bounds.extend(marker.getLngLat()));
    //console.log(bounds)
    // Adjust the zoom to see all the existing markers
    this.map.fitBounds(bounds, {
      padding: 75
    })
  }

  getUsersLocation(): void {
    navigator.geolocation.getCurrentPosition(
      // Success callback function (if user has accepted to share their location)
      (pos) => {
        // this.map.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: 11 })
        this.createANewMarker("blue", undefined, pos.coords);
       // console.log(pos.coords)
      },
      // Error callback function (if user hasn't accepted to share their location)
      () => {
        // this.map.flyTo(
        //  { center: [environment.MAPBOX_ITAcademy_OBJECT.addresses[0].location.x, environment.MAPBOX_ITAcademy_OBJECT.addresses[0].location.y], zoom: 11 })
        this.createANewMarker("blue", this.MAPBOX_INIT_LOCATION);
      }
    );
  }
}
