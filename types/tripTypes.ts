import { MetaType } from "./common";

export interface CreateTripRequestType {
  title: string;
  startDate: string | Date;
  endDate: string | Date;
}
export interface TripItemType {
  id: string;
  title: string;
  startDate: string | Date;
  endDate: string | Date;
}

export interface TripListResponseType {
  data: TripItemType[];
  meta: MetaType;
}
