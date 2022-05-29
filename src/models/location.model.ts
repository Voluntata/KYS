


export interface LocationModel {
  name?: string;
  type?: string; //color
  activity?: string;
  address: Address[];
  radio?: number;
  description?: string;

  // constructor(LocationModel:any){
  //  this.name = LocationModel && LocationModel.name || null;
  //  this.type = LocationModel && LocationModel.type || null;
  //  this.activity = LocationModel && LocationModel.activity || null;
  //  this.address = LocationModel && LocationModel.address || null;
  //  this.radio = LocationModel && LocationModel.radio || null;
  //  this.description = LocationModel && LocationModel.description || null;
  // }

}

interface Address {
  street_name: string;
  street_number?: string | number;
  zip_code?: string;
  town?: string;
  location: {
      x: number;
      y: number;
  }

// constructor(address?:any){
//   this.street_name = address && address.street_name || null;
//   this.street_number = address && address.street_number || null;
//   this.zip_code = address && address.zip_code || null;
//   this.town = address && address.town || null;
//   this.location = address && address.location || null;

// }

}
