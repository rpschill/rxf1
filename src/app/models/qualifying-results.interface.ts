import { Driver } from "./driver.interface";
import { Constructor } from "./constructor.interface";
import { RaceTable } from "./race.interface";

export interface QualifyingResultsResponse {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  RaceTable: RaceTable;
}

export interface QualifyingResults {
  number: string;
  position: string;
  Driver: Driver;
  Constructor: Constructor;
  Q1: string;
  Q2: string;
  Q3: string;
}