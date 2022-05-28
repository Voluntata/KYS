export interface MapBoxModel {
  name: string;
  type?: string;
  activity?: string;
  address: Address[];

}

interface Address {
  street_name: string;
  street_number?: string | number;
  zip_code?: string;
  district_id?: string;
  town: string;
  location: {
      x: number;
      y: number;
  }
}
