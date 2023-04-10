import { Constructor } from "./constructor.interface";
import { Driver } from "./driver.interface";

export interface StandingsResponse {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  StandingsTable: StandingsTable;
}

export interface StandingsTable {
  season: string;
  round: string;
  StandingsLists: StandingsLists[];
}

export interface StandingsLists {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor;
}