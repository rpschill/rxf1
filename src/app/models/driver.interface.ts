export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface DriverResponse {
  DriverTable: DriverTable;
  limit: string;
  offset: string;
  series: string;
  total: string;
  url: string;
  xmlns: string;
}

export interface DriverTable {
  season: string;
  Drivers: Driver[];
}