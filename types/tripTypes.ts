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

export interface TripDetailItemType {
  id: string;
  title: string;
  image: string;
  createdAt: string | Date;
}

export interface TripItemListResponseType {
  data: TripDetailItemType[];
  meta: MetaType;
}
