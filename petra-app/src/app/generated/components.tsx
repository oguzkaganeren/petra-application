import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  timestamptz: any,
  timetz: any,
  date: any,
  inet: any,
};

export type Address = {
   __typename?: 'Address',
  City: City,
  District: District,
  Locations: Array<Location>,
  Locations_aggregate: Location_Aggregate,
  address: Scalars['String'],
  addressID: Scalars['Int'],
  cityID: Scalars['Int'],
  districtID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
};


export type AddressLocationsArgs = {
  distinct_on?: Maybe<Array<Location_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Location_Order_By>>,
  where?: Maybe<Location_Bool_Exp>
};


export type AddressLocations_AggregateArgs = {
  distinct_on?: Maybe<Array<Location_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Location_Order_By>>,
  where?: Maybe<Location_Bool_Exp>
};

export type Address_Aggregate = {
   __typename?: 'Address_aggregate',
  aggregate?: Maybe<Address_Aggregate_Fields>,
  nodes: Array<Address>,
};

export type Address_Aggregate_Fields = {
   __typename?: 'Address_aggregate_fields',
  avg?: Maybe<Address_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Address_Max_Fields>,
  min?: Maybe<Address_Min_Fields>,
  stddev?: Maybe<Address_Stddev_Fields>,
  stddev_pop?: Maybe<Address_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Address_Stddev_Samp_Fields>,
  sum?: Maybe<Address_Sum_Fields>,
  var_pop?: Maybe<Address_Var_Pop_Fields>,
  var_samp?: Maybe<Address_Var_Samp_Fields>,
  variance?: Maybe<Address_Variance_Fields>,
};


export type Address_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Address_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Address_Aggregate_Order_By = {
  avg?: Maybe<Address_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Address_Max_Order_By>,
  min?: Maybe<Address_Min_Order_By>,
  stddev?: Maybe<Address_Stddev_Order_By>,
  stddev_pop?: Maybe<Address_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Address_Stddev_Samp_Order_By>,
  sum?: Maybe<Address_Sum_Order_By>,
  var_pop?: Maybe<Address_Var_Pop_Order_By>,
  var_samp?: Maybe<Address_Var_Samp_Order_By>,
  variance?: Maybe<Address_Variance_Order_By>,
};

export type Address_Arr_Rel_Insert_Input = {
  data: Array<Address_Insert_Input>,
  on_conflict?: Maybe<Address_On_Conflict>,
};

export type Address_Avg_Fields = {
   __typename?: 'Address_avg_fields',
  addressID?: Maybe<Scalars['Float']>,
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type Address_Avg_Order_By = {
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type Address_Bool_Exp = {
  City?: Maybe<City_Bool_Exp>,
  District?: Maybe<District_Bool_Exp>,
  Locations?: Maybe<Location_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Address_Bool_Exp>>>,
  _not?: Maybe<Address_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Address_Bool_Exp>>>,
  address?: Maybe<String_Comparison_Exp>,
  addressID?: Maybe<Int_Comparison_Exp>,
  cityID?: Maybe<Int_Comparison_Exp>,
  districtID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
};

export enum Address_Constraint {
  AddressPkey = 'Address_pkey'
}

export type Address_Inc_Input = {
  addressID?: Maybe<Scalars['Int']>,
  cityID?: Maybe<Scalars['Int']>,
  districtID?: Maybe<Scalars['Int']>,
};

export type Address_Insert_Input = {
  City?: Maybe<City_Obj_Rel_Insert_Input>,
  District?: Maybe<District_Obj_Rel_Insert_Input>,
  Locations?: Maybe<Location_Arr_Rel_Insert_Input>,
  address?: Maybe<Scalars['String']>,
  addressID?: Maybe<Scalars['Int']>,
  cityID?: Maybe<Scalars['Int']>,
  districtID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type Address_Max_Fields = {
   __typename?: 'Address_max_fields',
  address?: Maybe<Scalars['String']>,
  addressID?: Maybe<Scalars['Int']>,
  cityID?: Maybe<Scalars['Int']>,
  districtID?: Maybe<Scalars['Int']>,
};

export type Address_Max_Order_By = {
  address?: Maybe<Order_By>,
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type Address_Min_Fields = {
   __typename?: 'Address_min_fields',
  address?: Maybe<Scalars['String']>,
  addressID?: Maybe<Scalars['Int']>,
  cityID?: Maybe<Scalars['Int']>,
  districtID?: Maybe<Scalars['Int']>,
};

export type Address_Min_Order_By = {
  address?: Maybe<Order_By>,
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type Address_Mutation_Response = {
   __typename?: 'Address_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Address>,
};

export type Address_Obj_Rel_Insert_Input = {
  data: Address_Insert_Input,
  on_conflict?: Maybe<Address_On_Conflict>,
};

export type Address_On_Conflict = {
  constraint: Address_Constraint,
  update_columns: Array<Address_Update_Column>,
  where?: Maybe<Address_Bool_Exp>,
};

export type Address_Order_By = {
  City?: Maybe<City_Order_By>,
  District?: Maybe<District_Order_By>,
  Locations_aggregate?: Maybe<Location_Aggregate_Order_By>,
  address?: Maybe<Order_By>,
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
};

export enum Address_Select_Column {
  Address = 'address',
  AddressId = 'addressID',
  CityId = 'cityID',
  DistrictId = 'districtID',
  IsDeleted = 'isDeleted'
}

export type Address_Set_Input = {
  address?: Maybe<Scalars['String']>,
  addressID?: Maybe<Scalars['Int']>,
  cityID?: Maybe<Scalars['Int']>,
  districtID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type Address_Stddev_Fields = {
   __typename?: 'Address_stddev_fields',
  addressID?: Maybe<Scalars['Float']>,
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type Address_Stddev_Order_By = {
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type Address_Stddev_Pop_Fields = {
   __typename?: 'Address_stddev_pop_fields',
  addressID?: Maybe<Scalars['Float']>,
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type Address_Stddev_Pop_Order_By = {
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type Address_Stddev_Samp_Fields = {
   __typename?: 'Address_stddev_samp_fields',
  addressID?: Maybe<Scalars['Float']>,
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type Address_Stddev_Samp_Order_By = {
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type Address_Sum_Fields = {
   __typename?: 'Address_sum_fields',
  addressID?: Maybe<Scalars['Int']>,
  cityID?: Maybe<Scalars['Int']>,
  districtID?: Maybe<Scalars['Int']>,
};

export type Address_Sum_Order_By = {
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export enum Address_Update_Column {
  Address = 'address',
  AddressId = 'addressID',
  CityId = 'cityID',
  DistrictId = 'districtID',
  IsDeleted = 'isDeleted'
}

export type Address_Var_Pop_Fields = {
   __typename?: 'Address_var_pop_fields',
  addressID?: Maybe<Scalars['Float']>,
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type Address_Var_Pop_Order_By = {
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type Address_Var_Samp_Fields = {
   __typename?: 'Address_var_samp_fields',
  addressID?: Maybe<Scalars['Float']>,
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type Address_Var_Samp_Order_By = {
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type Address_Variance_Fields = {
   __typename?: 'Address_variance_fields',
  addressID?: Maybe<Scalars['Float']>,
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type Address_Variance_Order_By = {
  addressID?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type ArchSite = {
   __typename?: 'ArchSite',
  ArchSiteComments: Array<ArchSiteComment>,
  ArchSiteComments_aggregate: ArchSiteComment_Aggregate,
  ArchSitePrices: Array<ArchSitePrice>,
  ArchSitePrices_aggregate: ArchSitePrice_Aggregate,
  ArchSiteTypeArchSites: Array<ArchSiteTypeArchSite>,
  ArchSiteTypeArchSites_aggregate: ArchSiteTypeArchSite_Aggregate,
  ArchSiteWorkingSchedules: Array<ArchSiteWorkingSchedule>,
  ArchSiteWorkingSchedules_aggregate: ArchSiteWorkingSchedule_Aggregate,
  Company: Company,
  Location: Location,
  TravelGuideArchSites: Array<TravelGuideArchSite>,
  TravelGuideArchSites_aggregate: TravelGuideArchSite_Aggregate,
  age?: Maybe<Scalars['Int']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID: Scalars['Int'],
  companyID: Scalars['Int'],
  description?: Maybe<Scalars['String']>,
  destruction?: Maybe<Scalars['String']>,
  diameter?: Maybe<Scalars['Float']>,
  isDeleted: Scalars['Boolean'],
  locationID: Scalars['Int'],
  name: Scalars['String'],
  period?: Maybe<Scalars['String']>,
};


export type ArchSiteArchSiteCommentsArgs = {
  distinct_on?: Maybe<Array<ArchSiteComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteComment_Order_By>>,
  where?: Maybe<ArchSiteComment_Bool_Exp>
};


export type ArchSiteArchSiteComments_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteComment_Order_By>>,
  where?: Maybe<ArchSiteComment_Bool_Exp>
};


export type ArchSiteArchSitePricesArgs = {
  distinct_on?: Maybe<Array<ArchSitePrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSitePrice_Order_By>>,
  where?: Maybe<ArchSitePrice_Bool_Exp>
};


export type ArchSiteArchSitePrices_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSitePrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSitePrice_Order_By>>,
  where?: Maybe<ArchSitePrice_Bool_Exp>
};


export type ArchSiteArchSiteTypeArchSitesArgs = {
  distinct_on?: Maybe<Array<ArchSiteTypeArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteTypeArchSite_Order_By>>,
  where?: Maybe<ArchSiteTypeArchSite_Bool_Exp>
};


export type ArchSiteArchSiteTypeArchSites_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteTypeArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteTypeArchSite_Order_By>>,
  where?: Maybe<ArchSiteTypeArchSite_Bool_Exp>
};


export type ArchSiteArchSiteWorkingSchedulesArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingSchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingSchedule_Bool_Exp>
};


export type ArchSiteArchSiteWorkingSchedules_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingSchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingSchedule_Bool_Exp>
};


export type ArchSiteTravelGuideArchSitesArgs = {
  distinct_on?: Maybe<Array<TravelGuideArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideArchSite_Order_By>>,
  where?: Maybe<TravelGuideArchSite_Bool_Exp>
};


export type ArchSiteTravelGuideArchSites_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideArchSite_Order_By>>,
  where?: Maybe<TravelGuideArchSite_Bool_Exp>
};

export type ArchSite_Aggregate = {
   __typename?: 'ArchSite_aggregate',
  aggregate?: Maybe<ArchSite_Aggregate_Fields>,
  nodes: Array<ArchSite>,
};

export type ArchSite_Aggregate_Fields = {
   __typename?: 'ArchSite_aggregate_fields',
  avg?: Maybe<ArchSite_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArchSite_Max_Fields>,
  min?: Maybe<ArchSite_Min_Fields>,
  stddev?: Maybe<ArchSite_Stddev_Fields>,
  stddev_pop?: Maybe<ArchSite_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArchSite_Stddev_Samp_Fields>,
  sum?: Maybe<ArchSite_Sum_Fields>,
  var_pop?: Maybe<ArchSite_Var_Pop_Fields>,
  var_samp?: Maybe<ArchSite_Var_Samp_Fields>,
  variance?: Maybe<ArchSite_Variance_Fields>,
};


export type ArchSite_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArchSite_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArchSite_Aggregate_Order_By = {
  avg?: Maybe<ArchSite_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArchSite_Max_Order_By>,
  min?: Maybe<ArchSite_Min_Order_By>,
  stddev?: Maybe<ArchSite_Stddev_Order_By>,
  stddev_pop?: Maybe<ArchSite_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArchSite_Stddev_Samp_Order_By>,
  sum?: Maybe<ArchSite_Sum_Order_By>,
  var_pop?: Maybe<ArchSite_Var_Pop_Order_By>,
  var_samp?: Maybe<ArchSite_Var_Samp_Order_By>,
  variance?: Maybe<ArchSite_Variance_Order_By>,
};

export type ArchSite_Arr_Rel_Insert_Input = {
  data: Array<ArchSite_Insert_Input>,
  on_conflict?: Maybe<ArchSite_On_Conflict>,
};

export type ArchSite_Avg_Fields = {
   __typename?: 'ArchSite_avg_fields',
  age?: Maybe<Scalars['Float']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  companyID?: Maybe<Scalars['Float']>,
  diameter?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type ArchSite_Avg_Order_By = {
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type ArchSite_Bool_Exp = {
  ArchSiteComments?: Maybe<ArchSiteComment_Bool_Exp>,
  ArchSitePrices?: Maybe<ArchSitePrice_Bool_Exp>,
  ArchSiteTypeArchSites?: Maybe<ArchSiteTypeArchSite_Bool_Exp>,
  ArchSiteWorkingSchedules?: Maybe<ArchSiteWorkingSchedule_Bool_Exp>,
  Company?: Maybe<Company_Bool_Exp>,
  Location?: Maybe<Location_Bool_Exp>,
  TravelGuideArchSites?: Maybe<TravelGuideArchSite_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArchSite_Bool_Exp>>>,
  _not?: Maybe<ArchSite_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArchSite_Bool_Exp>>>,
  age?: Maybe<Int_Comparison_Exp>,
  altitude?: Maybe<Float_Comparison_Exp>,
  archSiteID?: Maybe<Int_Comparison_Exp>,
  companyID?: Maybe<Int_Comparison_Exp>,
  description?: Maybe<String_Comparison_Exp>,
  destruction?: Maybe<String_Comparison_Exp>,
  diameter?: Maybe<Float_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  locationID?: Maybe<Int_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
  period?: Maybe<String_Comparison_Exp>,
};

export enum ArchSite_Constraint {
  ArchSitePkey = 'ArchSite_pkey'
}

export type ArchSite_Inc_Input = {
  age?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  companyID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
};

export type ArchSite_Insert_Input = {
  ArchSiteComments?: Maybe<ArchSiteComment_Arr_Rel_Insert_Input>,
  ArchSitePrices?: Maybe<ArchSitePrice_Arr_Rel_Insert_Input>,
  ArchSiteTypeArchSites?: Maybe<ArchSiteTypeArchSite_Arr_Rel_Insert_Input>,
  ArchSiteWorkingSchedules?: Maybe<ArchSiteWorkingSchedule_Arr_Rel_Insert_Input>,
  Company?: Maybe<Company_Obj_Rel_Insert_Input>,
  Location?: Maybe<Location_Obj_Rel_Insert_Input>,
  TravelGuideArchSites?: Maybe<TravelGuideArchSite_Arr_Rel_Insert_Input>,
  age?: Maybe<Scalars['Int']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Int']>,
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  destruction?: Maybe<Scalars['String']>,
  diameter?: Maybe<Scalars['Float']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  period?: Maybe<Scalars['String']>,
};

export type ArchSite_Max_Fields = {
   __typename?: 'ArchSite_max_fields',
  age?: Maybe<Scalars['Int']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Int']>,
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  destruction?: Maybe<Scalars['String']>,
  diameter?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  period?: Maybe<Scalars['String']>,
};

export type ArchSite_Max_Order_By = {
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  destruction?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  period?: Maybe<Order_By>,
};

export type ArchSite_Min_Fields = {
   __typename?: 'ArchSite_min_fields',
  age?: Maybe<Scalars['Int']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Int']>,
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  destruction?: Maybe<Scalars['String']>,
  diameter?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  period?: Maybe<Scalars['String']>,
};

export type ArchSite_Min_Order_By = {
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  destruction?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  period?: Maybe<Order_By>,
};

export type ArchSite_Mutation_Response = {
   __typename?: 'ArchSite_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArchSite>,
};

export type ArchSite_Obj_Rel_Insert_Input = {
  data: ArchSite_Insert_Input,
  on_conflict?: Maybe<ArchSite_On_Conflict>,
};

export type ArchSite_On_Conflict = {
  constraint: ArchSite_Constraint,
  update_columns: Array<ArchSite_Update_Column>,
  where?: Maybe<ArchSite_Bool_Exp>,
};

export type ArchSite_Order_By = {
  ArchSiteComments_aggregate?: Maybe<ArchSiteComment_Aggregate_Order_By>,
  ArchSitePrices_aggregate?: Maybe<ArchSitePrice_Aggregate_Order_By>,
  ArchSiteTypeArchSites_aggregate?: Maybe<ArchSiteTypeArchSite_Aggregate_Order_By>,
  ArchSiteWorkingSchedules_aggregate?: Maybe<ArchSiteWorkingSchedule_Aggregate_Order_By>,
  Company?: Maybe<Company_Order_By>,
  Location?: Maybe<Location_Order_By>,
  TravelGuideArchSites_aggregate?: Maybe<TravelGuideArchSite_Aggregate_Order_By>,
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  destruction?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  period?: Maybe<Order_By>,
};

export enum ArchSite_Select_Column {
  Age = 'age',
  Altitude = 'altitude',
  ArchSiteId = 'archSiteID',
  CompanyId = 'companyID',
  Description = 'description',
  Destruction = 'destruction',
  Diameter = 'diameter',
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  Name = 'name',
  Period = 'period'
}

export type ArchSite_Set_Input = {
  age?: Maybe<Scalars['Int']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Int']>,
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  destruction?: Maybe<Scalars['String']>,
  diameter?: Maybe<Scalars['Float']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  period?: Maybe<Scalars['String']>,
};

export type ArchSite_Stddev_Fields = {
   __typename?: 'ArchSite_stddev_fields',
  age?: Maybe<Scalars['Float']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  companyID?: Maybe<Scalars['Float']>,
  diameter?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type ArchSite_Stddev_Order_By = {
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type ArchSite_Stddev_Pop_Fields = {
   __typename?: 'ArchSite_stddev_pop_fields',
  age?: Maybe<Scalars['Float']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  companyID?: Maybe<Scalars['Float']>,
  diameter?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type ArchSite_Stddev_Pop_Order_By = {
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type ArchSite_Stddev_Samp_Fields = {
   __typename?: 'ArchSite_stddev_samp_fields',
  age?: Maybe<Scalars['Float']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  companyID?: Maybe<Scalars['Float']>,
  diameter?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type ArchSite_Stddev_Samp_Order_By = {
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type ArchSite_Sum_Fields = {
   __typename?: 'ArchSite_sum_fields',
  age?: Maybe<Scalars['Int']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Int']>,
  companyID?: Maybe<Scalars['Int']>,
  diameter?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Int']>,
};

export type ArchSite_Sum_Order_By = {
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export enum ArchSite_Update_Column {
  Age = 'age',
  Altitude = 'altitude',
  ArchSiteId = 'archSiteID',
  CompanyId = 'companyID',
  Description = 'description',
  Destruction = 'destruction',
  Diameter = 'diameter',
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  Name = 'name',
  Period = 'period'
}

export type ArchSite_Var_Pop_Fields = {
   __typename?: 'ArchSite_var_pop_fields',
  age?: Maybe<Scalars['Float']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  companyID?: Maybe<Scalars['Float']>,
  diameter?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type ArchSite_Var_Pop_Order_By = {
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type ArchSite_Var_Samp_Fields = {
   __typename?: 'ArchSite_var_samp_fields',
  age?: Maybe<Scalars['Float']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  companyID?: Maybe<Scalars['Float']>,
  diameter?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type ArchSite_Var_Samp_Order_By = {
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type ArchSite_Variance_Fields = {
   __typename?: 'ArchSite_variance_fields',
  age?: Maybe<Scalars['Float']>,
  altitude?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  companyID?: Maybe<Scalars['Float']>,
  diameter?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type ArchSite_Variance_Order_By = {
  age?: Maybe<Order_By>,
  altitude?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  diameter?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type ArchSiteComment = {
   __typename?: 'ArchSiteComment',
  ArchSite: ArchSite,
  User: User,
  archSiteCommentID: Scalars['Int'],
  archSiteID: Scalars['Int'],
  content: Scalars['String'],
  date: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  star: Scalars['Float'],
  userID: Scalars['Int'],
};

export type ArchSiteComment_Aggregate = {
   __typename?: 'ArchSiteComment_aggregate',
  aggregate?: Maybe<ArchSiteComment_Aggregate_Fields>,
  nodes: Array<ArchSiteComment>,
};

export type ArchSiteComment_Aggregate_Fields = {
   __typename?: 'ArchSiteComment_aggregate_fields',
  avg?: Maybe<ArchSiteComment_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArchSiteComment_Max_Fields>,
  min?: Maybe<ArchSiteComment_Min_Fields>,
  stddev?: Maybe<ArchSiteComment_Stddev_Fields>,
  stddev_pop?: Maybe<ArchSiteComment_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArchSiteComment_Stddev_Samp_Fields>,
  sum?: Maybe<ArchSiteComment_Sum_Fields>,
  var_pop?: Maybe<ArchSiteComment_Var_Pop_Fields>,
  var_samp?: Maybe<ArchSiteComment_Var_Samp_Fields>,
  variance?: Maybe<ArchSiteComment_Variance_Fields>,
};


export type ArchSiteComment_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArchSiteComment_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArchSiteComment_Aggregate_Order_By = {
  avg?: Maybe<ArchSiteComment_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArchSiteComment_Max_Order_By>,
  min?: Maybe<ArchSiteComment_Min_Order_By>,
  stddev?: Maybe<ArchSiteComment_Stddev_Order_By>,
  stddev_pop?: Maybe<ArchSiteComment_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArchSiteComment_Stddev_Samp_Order_By>,
  sum?: Maybe<ArchSiteComment_Sum_Order_By>,
  var_pop?: Maybe<ArchSiteComment_Var_Pop_Order_By>,
  var_samp?: Maybe<ArchSiteComment_Var_Samp_Order_By>,
  variance?: Maybe<ArchSiteComment_Variance_Order_By>,
};

export type ArchSiteComment_Arr_Rel_Insert_Input = {
  data: Array<ArchSiteComment_Insert_Input>,
  on_conflict?: Maybe<ArchSiteComment_On_Conflict>,
};

export type ArchSiteComment_Avg_Fields = {
   __typename?: 'ArchSiteComment_avg_fields',
  archSiteCommentID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArchSiteComment_Avg_Order_By = {
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArchSiteComment_Bool_Exp = {
  ArchSite?: Maybe<ArchSite_Bool_Exp>,
  User?: Maybe<User_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArchSiteComment_Bool_Exp>>>,
  _not?: Maybe<ArchSiteComment_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArchSiteComment_Bool_Exp>>>,
  archSiteCommentID?: Maybe<Int_Comparison_Exp>,
  archSiteID?: Maybe<Int_Comparison_Exp>,
  content?: Maybe<String_Comparison_Exp>,
  date?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  star?: Maybe<Float_Comparison_Exp>,
  userID?: Maybe<Int_Comparison_Exp>,
};

export enum ArchSiteComment_Constraint {
  ArchSiteCommentPkey = 'ArchSiteComment_pkey'
}

export type ArchSiteComment_Inc_Input = {
  archSiteCommentID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArchSiteComment_Insert_Input = {
  ArchSite?: Maybe<ArchSite_Obj_Rel_Insert_Input>,
  User?: Maybe<User_Obj_Rel_Insert_Input>,
  archSiteCommentID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArchSiteComment_Max_Fields = {
   __typename?: 'ArchSiteComment_max_fields',
  archSiteCommentID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArchSiteComment_Max_Order_By = {
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArchSiteComment_Min_Fields = {
   __typename?: 'ArchSiteComment_min_fields',
  archSiteCommentID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArchSiteComment_Min_Order_By = {
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArchSiteComment_Mutation_Response = {
   __typename?: 'ArchSiteComment_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArchSiteComment>,
};

export type ArchSiteComment_Obj_Rel_Insert_Input = {
  data: ArchSiteComment_Insert_Input,
  on_conflict?: Maybe<ArchSiteComment_On_Conflict>,
};

export type ArchSiteComment_On_Conflict = {
  constraint: ArchSiteComment_Constraint,
  update_columns: Array<ArchSiteComment_Update_Column>,
  where?: Maybe<ArchSiteComment_Bool_Exp>,
};

export type ArchSiteComment_Order_By = {
  ArchSite?: Maybe<ArchSite_Order_By>,
  User?: Maybe<User_Order_By>,
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum ArchSiteComment_Select_Column {
  ArchSiteCommentId = 'archSiteCommentID',
  ArchSiteId = 'archSiteID',
  Content = 'content',
  Date = 'date',
  IsDeleted = 'isDeleted',
  Star = 'star',
  UserId = 'userID'
}

export type ArchSiteComment_Set_Input = {
  archSiteCommentID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArchSiteComment_Stddev_Fields = {
   __typename?: 'ArchSiteComment_stddev_fields',
  archSiteCommentID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArchSiteComment_Stddev_Order_By = {
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArchSiteComment_Stddev_Pop_Fields = {
   __typename?: 'ArchSiteComment_stddev_pop_fields',
  archSiteCommentID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArchSiteComment_Stddev_Pop_Order_By = {
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArchSiteComment_Stddev_Samp_Fields = {
   __typename?: 'ArchSiteComment_stddev_samp_fields',
  archSiteCommentID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArchSiteComment_Stddev_Samp_Order_By = {
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArchSiteComment_Sum_Fields = {
   __typename?: 'ArchSiteComment_sum_fields',
  archSiteCommentID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArchSiteComment_Sum_Order_By = {
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum ArchSiteComment_Update_Column {
  ArchSiteCommentId = 'archSiteCommentID',
  ArchSiteId = 'archSiteID',
  Content = 'content',
  Date = 'date',
  IsDeleted = 'isDeleted',
  Star = 'star',
  UserId = 'userID'
}

export type ArchSiteComment_Var_Pop_Fields = {
   __typename?: 'ArchSiteComment_var_pop_fields',
  archSiteCommentID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArchSiteComment_Var_Pop_Order_By = {
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArchSiteComment_Var_Samp_Fields = {
   __typename?: 'ArchSiteComment_var_samp_fields',
  archSiteCommentID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArchSiteComment_Var_Samp_Order_By = {
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArchSiteComment_Variance_Fields = {
   __typename?: 'ArchSiteComment_variance_fields',
  archSiteCommentID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArchSiteComment_Variance_Order_By = {
  archSiteCommentID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArchSiteEntranceType = {
   __typename?: 'ArchSiteEntranceType',
  ArchSitePrices: Array<ArchSitePrice>,
  ArchSitePrices_aggregate: ArchSitePrice_Aggregate,
  archSiteEntranceTypeID: Scalars['Int'],
  content: Scalars['String'],
  isDeleted: Scalars['Boolean'],
};


export type ArchSiteEntranceTypeArchSitePricesArgs = {
  distinct_on?: Maybe<Array<ArchSitePrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSitePrice_Order_By>>,
  where?: Maybe<ArchSitePrice_Bool_Exp>
};


export type ArchSiteEntranceTypeArchSitePrices_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSitePrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSitePrice_Order_By>>,
  where?: Maybe<ArchSitePrice_Bool_Exp>
};

export type ArchSiteEntranceType_Aggregate = {
   __typename?: 'ArchSiteEntranceType_aggregate',
  aggregate?: Maybe<ArchSiteEntranceType_Aggregate_Fields>,
  nodes: Array<ArchSiteEntranceType>,
};

export type ArchSiteEntranceType_Aggregate_Fields = {
   __typename?: 'ArchSiteEntranceType_aggregate_fields',
  avg?: Maybe<ArchSiteEntranceType_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArchSiteEntranceType_Max_Fields>,
  min?: Maybe<ArchSiteEntranceType_Min_Fields>,
  stddev?: Maybe<ArchSiteEntranceType_Stddev_Fields>,
  stddev_pop?: Maybe<ArchSiteEntranceType_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArchSiteEntranceType_Stddev_Samp_Fields>,
  sum?: Maybe<ArchSiteEntranceType_Sum_Fields>,
  var_pop?: Maybe<ArchSiteEntranceType_Var_Pop_Fields>,
  var_samp?: Maybe<ArchSiteEntranceType_Var_Samp_Fields>,
  variance?: Maybe<ArchSiteEntranceType_Variance_Fields>,
};


export type ArchSiteEntranceType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArchSiteEntranceType_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArchSiteEntranceType_Aggregate_Order_By = {
  avg?: Maybe<ArchSiteEntranceType_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArchSiteEntranceType_Max_Order_By>,
  min?: Maybe<ArchSiteEntranceType_Min_Order_By>,
  stddev?: Maybe<ArchSiteEntranceType_Stddev_Order_By>,
  stddev_pop?: Maybe<ArchSiteEntranceType_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArchSiteEntranceType_Stddev_Samp_Order_By>,
  sum?: Maybe<ArchSiteEntranceType_Sum_Order_By>,
  var_pop?: Maybe<ArchSiteEntranceType_Var_Pop_Order_By>,
  var_samp?: Maybe<ArchSiteEntranceType_Var_Samp_Order_By>,
  variance?: Maybe<ArchSiteEntranceType_Variance_Order_By>,
};

export type ArchSiteEntranceType_Arr_Rel_Insert_Input = {
  data: Array<ArchSiteEntranceType_Insert_Input>,
  on_conflict?: Maybe<ArchSiteEntranceType_On_Conflict>,
};

export type ArchSiteEntranceType_Avg_Fields = {
   __typename?: 'ArchSiteEntranceType_avg_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteEntranceType_Avg_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
};

export type ArchSiteEntranceType_Bool_Exp = {
  ArchSitePrices?: Maybe<ArchSitePrice_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArchSiteEntranceType_Bool_Exp>>>,
  _not?: Maybe<ArchSiteEntranceType_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArchSiteEntranceType_Bool_Exp>>>,
  archSiteEntranceTypeID?: Maybe<Int_Comparison_Exp>,
  content?: Maybe<String_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
};

export enum ArchSiteEntranceType_Constraint {
  ArchSiteEntranceTypePkey = 'ArchSiteEntranceType_pkey'
}

export type ArchSiteEntranceType_Inc_Input = {
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
};

export type ArchSiteEntranceType_Insert_Input = {
  ArchSitePrices?: Maybe<ArchSitePrice_Arr_Rel_Insert_Input>,
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type ArchSiteEntranceType_Max_Fields = {
   __typename?: 'ArchSiteEntranceType_max_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
};

export type ArchSiteEntranceType_Max_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  content?: Maybe<Order_By>,
};

export type ArchSiteEntranceType_Min_Fields = {
   __typename?: 'ArchSiteEntranceType_min_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
};

export type ArchSiteEntranceType_Min_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  content?: Maybe<Order_By>,
};

export type ArchSiteEntranceType_Mutation_Response = {
   __typename?: 'ArchSiteEntranceType_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArchSiteEntranceType>,
};

export type ArchSiteEntranceType_Obj_Rel_Insert_Input = {
  data: ArchSiteEntranceType_Insert_Input,
  on_conflict?: Maybe<ArchSiteEntranceType_On_Conflict>,
};

export type ArchSiteEntranceType_On_Conflict = {
  constraint: ArchSiteEntranceType_Constraint,
  update_columns: Array<ArchSiteEntranceType_Update_Column>,
  where?: Maybe<ArchSiteEntranceType_Bool_Exp>,
};

export type ArchSiteEntranceType_Order_By = {
  ArchSitePrices_aggregate?: Maybe<ArchSitePrice_Aggregate_Order_By>,
  archSiteEntranceTypeID?: Maybe<Order_By>,
  content?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
};

export enum ArchSiteEntranceType_Select_Column {
  ArchSiteEntranceTypeId = 'archSiteEntranceTypeID',
  Content = 'content',
  IsDeleted = 'isDeleted'
}

export type ArchSiteEntranceType_Set_Input = {
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type ArchSiteEntranceType_Stddev_Fields = {
   __typename?: 'ArchSiteEntranceType_stddev_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteEntranceType_Stddev_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
};

export type ArchSiteEntranceType_Stddev_Pop_Fields = {
   __typename?: 'ArchSiteEntranceType_stddev_pop_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteEntranceType_Stddev_Pop_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
};

export type ArchSiteEntranceType_Stddev_Samp_Fields = {
   __typename?: 'ArchSiteEntranceType_stddev_samp_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteEntranceType_Stddev_Samp_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
};

export type ArchSiteEntranceType_Sum_Fields = {
   __typename?: 'ArchSiteEntranceType_sum_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
};

export type ArchSiteEntranceType_Sum_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
};

export enum ArchSiteEntranceType_Update_Column {
  ArchSiteEntranceTypeId = 'archSiteEntranceTypeID',
  Content = 'content',
  IsDeleted = 'isDeleted'
}

export type ArchSiteEntranceType_Var_Pop_Fields = {
   __typename?: 'ArchSiteEntranceType_var_pop_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteEntranceType_Var_Pop_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
};

export type ArchSiteEntranceType_Var_Samp_Fields = {
   __typename?: 'ArchSiteEntranceType_var_samp_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteEntranceType_Var_Samp_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
};

export type ArchSiteEntranceType_Variance_Fields = {
   __typename?: 'ArchSiteEntranceType_variance_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteEntranceType_Variance_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
};

export type ArchSitePrice = {
   __typename?: 'ArchSitePrice',
  ArchSite: ArchSite,
  ArchSiteEntranceType: ArchSiteEntranceType,
  archSiteEntranceTypeID: Scalars['Int'],
  archSiteID: Scalars['Int'],
  archSitePriceID: Scalars['Int'],
  finishDate: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  price: Scalars['Float'],
  startDate: Scalars['timestamptz'],
};

export type ArchSitePrice_Aggregate = {
   __typename?: 'ArchSitePrice_aggregate',
  aggregate?: Maybe<ArchSitePrice_Aggregate_Fields>,
  nodes: Array<ArchSitePrice>,
};

export type ArchSitePrice_Aggregate_Fields = {
   __typename?: 'ArchSitePrice_aggregate_fields',
  avg?: Maybe<ArchSitePrice_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArchSitePrice_Max_Fields>,
  min?: Maybe<ArchSitePrice_Min_Fields>,
  stddev?: Maybe<ArchSitePrice_Stddev_Fields>,
  stddev_pop?: Maybe<ArchSitePrice_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArchSitePrice_Stddev_Samp_Fields>,
  sum?: Maybe<ArchSitePrice_Sum_Fields>,
  var_pop?: Maybe<ArchSitePrice_Var_Pop_Fields>,
  var_samp?: Maybe<ArchSitePrice_Var_Samp_Fields>,
  variance?: Maybe<ArchSitePrice_Variance_Fields>,
};


export type ArchSitePrice_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArchSitePrice_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArchSitePrice_Aggregate_Order_By = {
  avg?: Maybe<ArchSitePrice_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArchSitePrice_Max_Order_By>,
  min?: Maybe<ArchSitePrice_Min_Order_By>,
  stddev?: Maybe<ArchSitePrice_Stddev_Order_By>,
  stddev_pop?: Maybe<ArchSitePrice_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArchSitePrice_Stddev_Samp_Order_By>,
  sum?: Maybe<ArchSitePrice_Sum_Order_By>,
  var_pop?: Maybe<ArchSitePrice_Var_Pop_Order_By>,
  var_samp?: Maybe<ArchSitePrice_Var_Samp_Order_By>,
  variance?: Maybe<ArchSitePrice_Variance_Order_By>,
};

export type ArchSitePrice_Arr_Rel_Insert_Input = {
  data: Array<ArchSitePrice_Insert_Input>,
  on_conflict?: Maybe<ArchSitePrice_On_Conflict>,
};

export type ArchSitePrice_Avg_Fields = {
   __typename?: 'ArchSitePrice_avg_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  archSitePriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type ArchSitePrice_Avg_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type ArchSitePrice_Bool_Exp = {
  ArchSite?: Maybe<ArchSite_Bool_Exp>,
  ArchSiteEntranceType?: Maybe<ArchSiteEntranceType_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArchSitePrice_Bool_Exp>>>,
  _not?: Maybe<ArchSitePrice_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArchSitePrice_Bool_Exp>>>,
  archSiteEntranceTypeID?: Maybe<Int_Comparison_Exp>,
  archSiteID?: Maybe<Int_Comparison_Exp>,
  archSitePriceID?: Maybe<Int_Comparison_Exp>,
  finishDate?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  price?: Maybe<Float_Comparison_Exp>,
  startDate?: Maybe<Timestamptz_Comparison_Exp>,
};

export enum ArchSitePrice_Constraint {
  ArchSitePricePkey = 'ArchSitePrice_pkey'
}

export type ArchSitePrice_Inc_Input = {
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  archSitePriceID?: Maybe<Scalars['Int']>,
};

export type ArchSitePrice_Insert_Input = {
  ArchSite?: Maybe<ArchSite_Obj_Rel_Insert_Input>,
  ArchSiteEntranceType?: Maybe<ArchSiteEntranceType_Obj_Rel_Insert_Input>,
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  archSitePriceID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  price?: Maybe<Scalars['Float']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type ArchSitePrice_Max_Fields = {
   __typename?: 'ArchSitePrice_max_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  archSitePriceID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  price?: Maybe<Scalars['Float']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type ArchSitePrice_Max_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  finishDate?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type ArchSitePrice_Min_Fields = {
   __typename?: 'ArchSitePrice_min_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  archSitePriceID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  price?: Maybe<Scalars['Float']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type ArchSitePrice_Min_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  finishDate?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type ArchSitePrice_Mutation_Response = {
   __typename?: 'ArchSitePrice_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArchSitePrice>,
};

export type ArchSitePrice_Obj_Rel_Insert_Input = {
  data: ArchSitePrice_Insert_Input,
  on_conflict?: Maybe<ArchSitePrice_On_Conflict>,
};

export type ArchSitePrice_On_Conflict = {
  constraint: ArchSitePrice_Constraint,
  update_columns: Array<ArchSitePrice_Update_Column>,
  where?: Maybe<ArchSitePrice_Bool_Exp>,
};

export type ArchSitePrice_Order_By = {
  ArchSite?: Maybe<ArchSite_Order_By>,
  ArchSiteEntranceType?: Maybe<ArchSiteEntranceType_Order_By>,
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  finishDate?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export enum ArchSitePrice_Select_Column {
  ArchSiteEntranceTypeId = 'archSiteEntranceTypeID',
  ArchSiteId = 'archSiteID',
  ArchSitePriceId = 'archSitePriceID',
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  Price = 'price',
  StartDate = 'startDate'
}

export type ArchSitePrice_Set_Input = {
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  archSitePriceID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  price?: Maybe<Scalars['Float']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type ArchSitePrice_Stddev_Fields = {
   __typename?: 'ArchSitePrice_stddev_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  archSitePriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type ArchSitePrice_Stddev_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type ArchSitePrice_Stddev_Pop_Fields = {
   __typename?: 'ArchSitePrice_stddev_pop_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  archSitePriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type ArchSitePrice_Stddev_Pop_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type ArchSitePrice_Stddev_Samp_Fields = {
   __typename?: 'ArchSitePrice_stddev_samp_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  archSitePriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type ArchSitePrice_Stddev_Samp_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type ArchSitePrice_Sum_Fields = {
   __typename?: 'ArchSitePrice_sum_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  archSiteID?: Maybe<Scalars['Int']>,
  archSitePriceID?: Maybe<Scalars['Int']>,
  price?: Maybe<Scalars['Float']>,
};

export type ArchSitePrice_Sum_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export enum ArchSitePrice_Update_Column {
  ArchSiteEntranceTypeId = 'archSiteEntranceTypeID',
  ArchSiteId = 'archSiteID',
  ArchSitePriceId = 'archSitePriceID',
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  Price = 'price',
  StartDate = 'startDate'
}

export type ArchSitePrice_Var_Pop_Fields = {
   __typename?: 'ArchSitePrice_var_pop_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  archSitePriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type ArchSitePrice_Var_Pop_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type ArchSitePrice_Var_Samp_Fields = {
   __typename?: 'ArchSitePrice_var_samp_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  archSitePriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type ArchSitePrice_Var_Samp_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type ArchSitePrice_Variance_Fields = {
   __typename?: 'ArchSitePrice_variance_fields',
  archSiteEntranceTypeID?: Maybe<Scalars['Float']>,
  archSiteID?: Maybe<Scalars['Float']>,
  archSitePriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type ArchSitePrice_Variance_Order_By = {
  archSiteEntranceTypeID?: Maybe<Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSitePriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type ArchSiteType = {
   __typename?: 'ArchSiteType',
  ArchSiteTypeArchSites: Array<ArchSiteTypeArchSite>,
  ArchSiteTypeArchSites_aggregate: ArchSiteTypeArchSite_Aggregate,
  archSiteTypeID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  name: Scalars['String'],
};


export type ArchSiteTypeArchSiteTypeArchSitesArgs = {
  distinct_on?: Maybe<Array<ArchSiteTypeArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteTypeArchSite_Order_By>>,
  where?: Maybe<ArchSiteTypeArchSite_Bool_Exp>
};


export type ArchSiteTypeArchSiteTypeArchSites_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteTypeArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteTypeArchSite_Order_By>>,
  where?: Maybe<ArchSiteTypeArchSite_Bool_Exp>
};

export type ArchSiteType_Aggregate = {
   __typename?: 'ArchSiteType_aggregate',
  aggregate?: Maybe<ArchSiteType_Aggregate_Fields>,
  nodes: Array<ArchSiteType>,
};

export type ArchSiteType_Aggregate_Fields = {
   __typename?: 'ArchSiteType_aggregate_fields',
  avg?: Maybe<ArchSiteType_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArchSiteType_Max_Fields>,
  min?: Maybe<ArchSiteType_Min_Fields>,
  stddev?: Maybe<ArchSiteType_Stddev_Fields>,
  stddev_pop?: Maybe<ArchSiteType_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArchSiteType_Stddev_Samp_Fields>,
  sum?: Maybe<ArchSiteType_Sum_Fields>,
  var_pop?: Maybe<ArchSiteType_Var_Pop_Fields>,
  var_samp?: Maybe<ArchSiteType_Var_Samp_Fields>,
  variance?: Maybe<ArchSiteType_Variance_Fields>,
};


export type ArchSiteType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArchSiteType_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArchSiteType_Aggregate_Order_By = {
  avg?: Maybe<ArchSiteType_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArchSiteType_Max_Order_By>,
  min?: Maybe<ArchSiteType_Min_Order_By>,
  stddev?: Maybe<ArchSiteType_Stddev_Order_By>,
  stddev_pop?: Maybe<ArchSiteType_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArchSiteType_Stddev_Samp_Order_By>,
  sum?: Maybe<ArchSiteType_Sum_Order_By>,
  var_pop?: Maybe<ArchSiteType_Var_Pop_Order_By>,
  var_samp?: Maybe<ArchSiteType_Var_Samp_Order_By>,
  variance?: Maybe<ArchSiteType_Variance_Order_By>,
};

export type ArchSiteType_Arr_Rel_Insert_Input = {
  data: Array<ArchSiteType_Insert_Input>,
  on_conflict?: Maybe<ArchSiteType_On_Conflict>,
};

export type ArchSiteType_Avg_Fields = {
   __typename?: 'ArchSiteType_avg_fields',
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteType_Avg_Order_By = {
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteType_Bool_Exp = {
  ArchSiteTypeArchSites?: Maybe<ArchSiteTypeArchSite_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArchSiteType_Bool_Exp>>>,
  _not?: Maybe<ArchSiteType_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArchSiteType_Bool_Exp>>>,
  archSiteTypeID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
};

export enum ArchSiteType_Constraint {
  ArchSiteTypePkey = 'ArchSiteType_pkey'
}

export type ArchSiteType_Inc_Input = {
  archSiteTypeID?: Maybe<Scalars['Int']>,
};

export type ArchSiteType_Insert_Input = {
  ArchSiteTypeArchSites?: Maybe<ArchSiteTypeArchSite_Arr_Rel_Insert_Input>,
  archSiteTypeID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
};

export type ArchSiteType_Max_Fields = {
   __typename?: 'ArchSiteType_max_fields',
  archSiteTypeID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type ArchSiteType_Max_Order_By = {
  archSiteTypeID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

export type ArchSiteType_Min_Fields = {
   __typename?: 'ArchSiteType_min_fields',
  archSiteTypeID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type ArchSiteType_Min_Order_By = {
  archSiteTypeID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

export type ArchSiteType_Mutation_Response = {
   __typename?: 'ArchSiteType_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArchSiteType>,
};

export type ArchSiteType_Obj_Rel_Insert_Input = {
  data: ArchSiteType_Insert_Input,
  on_conflict?: Maybe<ArchSiteType_On_Conflict>,
};

export type ArchSiteType_On_Conflict = {
  constraint: ArchSiteType_Constraint,
  update_columns: Array<ArchSiteType_Update_Column>,
  where?: Maybe<ArchSiteType_Bool_Exp>,
};

export type ArchSiteType_Order_By = {
  ArchSiteTypeArchSites_aggregate?: Maybe<ArchSiteTypeArchSite_Aggregate_Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

export enum ArchSiteType_Select_Column {
  ArchSiteTypeId = 'archSiteTypeID',
  IsDeleted = 'isDeleted',
  Name = 'name'
}

export type ArchSiteType_Set_Input = {
  archSiteTypeID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
};

export type ArchSiteType_Stddev_Fields = {
   __typename?: 'ArchSiteType_stddev_fields',
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteType_Stddev_Order_By = {
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteType_Stddev_Pop_Fields = {
   __typename?: 'ArchSiteType_stddev_pop_fields',
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteType_Stddev_Pop_Order_By = {
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteType_Stddev_Samp_Fields = {
   __typename?: 'ArchSiteType_stddev_samp_fields',
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteType_Stddev_Samp_Order_By = {
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteType_Sum_Fields = {
   __typename?: 'ArchSiteType_sum_fields',
  archSiteTypeID?: Maybe<Scalars['Int']>,
};

export type ArchSiteType_Sum_Order_By = {
  archSiteTypeID?: Maybe<Order_By>,
};

export enum ArchSiteType_Update_Column {
  ArchSiteTypeId = 'archSiteTypeID',
  IsDeleted = 'isDeleted',
  Name = 'name'
}

export type ArchSiteType_Var_Pop_Fields = {
   __typename?: 'ArchSiteType_var_pop_fields',
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteType_Var_Pop_Order_By = {
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteType_Var_Samp_Fields = {
   __typename?: 'ArchSiteType_var_samp_fields',
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteType_Var_Samp_Order_By = {
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteType_Variance_Fields = {
   __typename?: 'ArchSiteType_variance_fields',
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteType_Variance_Order_By = {
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteTypeArchSite = {
   __typename?: 'ArchSiteTypeArchSite',
  ArchSite: ArchSite,
  ArchSiteType: ArchSiteType,
  archSiteID: Scalars['Int'],
  archSiteTypeArchSiteID: Scalars['Int'],
  archSiteTypeID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
};

export type ArchSiteTypeArchSite_Aggregate = {
   __typename?: 'ArchSiteTypeArchSite_aggregate',
  aggregate?: Maybe<ArchSiteTypeArchSite_Aggregate_Fields>,
  nodes: Array<ArchSiteTypeArchSite>,
};

export type ArchSiteTypeArchSite_Aggregate_Fields = {
   __typename?: 'ArchSiteTypeArchSite_aggregate_fields',
  avg?: Maybe<ArchSiteTypeArchSite_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArchSiteTypeArchSite_Max_Fields>,
  min?: Maybe<ArchSiteTypeArchSite_Min_Fields>,
  stddev?: Maybe<ArchSiteTypeArchSite_Stddev_Fields>,
  stddev_pop?: Maybe<ArchSiteTypeArchSite_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArchSiteTypeArchSite_Stddev_Samp_Fields>,
  sum?: Maybe<ArchSiteTypeArchSite_Sum_Fields>,
  var_pop?: Maybe<ArchSiteTypeArchSite_Var_Pop_Fields>,
  var_samp?: Maybe<ArchSiteTypeArchSite_Var_Samp_Fields>,
  variance?: Maybe<ArchSiteTypeArchSite_Variance_Fields>,
};


export type ArchSiteTypeArchSite_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArchSiteTypeArchSite_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArchSiteTypeArchSite_Aggregate_Order_By = {
  avg?: Maybe<ArchSiteTypeArchSite_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArchSiteTypeArchSite_Max_Order_By>,
  min?: Maybe<ArchSiteTypeArchSite_Min_Order_By>,
  stddev?: Maybe<ArchSiteTypeArchSite_Stddev_Order_By>,
  stddev_pop?: Maybe<ArchSiteTypeArchSite_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArchSiteTypeArchSite_Stddev_Samp_Order_By>,
  sum?: Maybe<ArchSiteTypeArchSite_Sum_Order_By>,
  var_pop?: Maybe<ArchSiteTypeArchSite_Var_Pop_Order_By>,
  var_samp?: Maybe<ArchSiteTypeArchSite_Var_Samp_Order_By>,
  variance?: Maybe<ArchSiteTypeArchSite_Variance_Order_By>,
};

export type ArchSiteTypeArchSite_Arr_Rel_Insert_Input = {
  data: Array<ArchSiteTypeArchSite_Insert_Input>,
  on_conflict?: Maybe<ArchSiteTypeArchSite_On_Conflict>,
};

export type ArchSiteTypeArchSite_Avg_Fields = {
   __typename?: 'ArchSiteTypeArchSite_avg_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteTypeArchSite_Avg_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteTypeArchSite_Bool_Exp = {
  ArchSite?: Maybe<ArchSite_Bool_Exp>,
  ArchSiteType?: Maybe<ArchSiteType_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArchSiteTypeArchSite_Bool_Exp>>>,
  _not?: Maybe<ArchSiteTypeArchSite_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArchSiteTypeArchSite_Bool_Exp>>>,
  archSiteID?: Maybe<Int_Comparison_Exp>,
  archSiteTypeArchSiteID?: Maybe<Int_Comparison_Exp>,
  archSiteTypeID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
};

export enum ArchSiteTypeArchSite_Constraint {
  ArchSiteTypeArchSitePkey = 'ArchSiteTypeArchSite_pkey'
}

export type ArchSiteTypeArchSite_Inc_Input = {
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeID?: Maybe<Scalars['Int']>,
};

export type ArchSiteTypeArchSite_Insert_Input = {
  ArchSite?: Maybe<ArchSite_Obj_Rel_Insert_Input>,
  ArchSiteType?: Maybe<ArchSiteType_Obj_Rel_Insert_Input>,
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type ArchSiteTypeArchSite_Max_Fields = {
   __typename?: 'ArchSiteTypeArchSite_max_fields',
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeID?: Maybe<Scalars['Int']>,
};

export type ArchSiteTypeArchSite_Max_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteTypeArchSite_Min_Fields = {
   __typename?: 'ArchSiteTypeArchSite_min_fields',
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeID?: Maybe<Scalars['Int']>,
};

export type ArchSiteTypeArchSite_Min_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteTypeArchSite_Mutation_Response = {
   __typename?: 'ArchSiteTypeArchSite_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArchSiteTypeArchSite>,
};

export type ArchSiteTypeArchSite_Obj_Rel_Insert_Input = {
  data: ArchSiteTypeArchSite_Insert_Input,
  on_conflict?: Maybe<ArchSiteTypeArchSite_On_Conflict>,
};

export type ArchSiteTypeArchSite_On_Conflict = {
  constraint: ArchSiteTypeArchSite_Constraint,
  update_columns: Array<ArchSiteTypeArchSite_Update_Column>,
  where?: Maybe<ArchSiteTypeArchSite_Bool_Exp>,
};

export type ArchSiteTypeArchSite_Order_By = {
  ArchSite?: Maybe<ArchSite_Order_By>,
  ArchSiteType?: Maybe<ArchSiteType_Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
};

export enum ArchSiteTypeArchSite_Select_Column {
  ArchSiteId = 'archSiteID',
  ArchSiteTypeArchSiteId = 'archSiteTypeArchSiteID',
  ArchSiteTypeId = 'archSiteTypeID',
  IsDeleted = 'isDeleted'
}

export type ArchSiteTypeArchSite_Set_Input = {
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type ArchSiteTypeArchSite_Stddev_Fields = {
   __typename?: 'ArchSiteTypeArchSite_stddev_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteTypeArchSite_Stddev_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteTypeArchSite_Stddev_Pop_Fields = {
   __typename?: 'ArchSiteTypeArchSite_stddev_pop_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteTypeArchSite_Stddev_Pop_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteTypeArchSite_Stddev_Samp_Fields = {
   __typename?: 'ArchSiteTypeArchSite_stddev_samp_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteTypeArchSite_Stddev_Samp_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteTypeArchSite_Sum_Fields = {
   __typename?: 'ArchSiteTypeArchSite_sum_fields',
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Int']>,
  archSiteTypeID?: Maybe<Scalars['Int']>,
};

export type ArchSiteTypeArchSite_Sum_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
};

export enum ArchSiteTypeArchSite_Update_Column {
  ArchSiteId = 'archSiteID',
  ArchSiteTypeArchSiteId = 'archSiteTypeArchSiteID',
  ArchSiteTypeId = 'archSiteTypeID',
  IsDeleted = 'isDeleted'
}

export type ArchSiteTypeArchSite_Var_Pop_Fields = {
   __typename?: 'ArchSiteTypeArchSite_var_pop_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteTypeArchSite_Var_Pop_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteTypeArchSite_Var_Samp_Fields = {
   __typename?: 'ArchSiteTypeArchSite_var_samp_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteTypeArchSite_Var_Samp_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteTypeArchSite_Variance_Fields = {
   __typename?: 'ArchSiteTypeArchSite_variance_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeArchSiteID?: Maybe<Scalars['Float']>,
  archSiteTypeID?: Maybe<Scalars['Float']>,
};

export type ArchSiteTypeArchSite_Variance_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteTypeArchSiteID?: Maybe<Order_By>,
  archSiteTypeID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDay = {
   __typename?: 'ArchSiteWorkingDay',
  ArchSiteWorkingDaySchedules: Array<ArchSiteWorkingDaySchedule>,
  ArchSiteWorkingDaySchedules_aggregate: ArchSiteWorkingDaySchedule_Aggregate,
  Day: Day,
  archSiteWorkingDayID: Scalars['Int'],
  closeHour: Scalars['timetz'],
  dayID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  openHour: Scalars['timetz'],
};


export type ArchSiteWorkingDayArchSiteWorkingDaySchedulesArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDaySchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>
};


export type ArchSiteWorkingDayArchSiteWorkingDaySchedules_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDaySchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>
};

export type ArchSiteWorkingDay_Aggregate = {
   __typename?: 'ArchSiteWorkingDay_aggregate',
  aggregate?: Maybe<ArchSiteWorkingDay_Aggregate_Fields>,
  nodes: Array<ArchSiteWorkingDay>,
};

export type ArchSiteWorkingDay_Aggregate_Fields = {
   __typename?: 'ArchSiteWorkingDay_aggregate_fields',
  avg?: Maybe<ArchSiteWorkingDay_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArchSiteWorkingDay_Max_Fields>,
  min?: Maybe<ArchSiteWorkingDay_Min_Fields>,
  stddev?: Maybe<ArchSiteWorkingDay_Stddev_Fields>,
  stddev_pop?: Maybe<ArchSiteWorkingDay_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArchSiteWorkingDay_Stddev_Samp_Fields>,
  sum?: Maybe<ArchSiteWorkingDay_Sum_Fields>,
  var_pop?: Maybe<ArchSiteWorkingDay_Var_Pop_Fields>,
  var_samp?: Maybe<ArchSiteWorkingDay_Var_Samp_Fields>,
  variance?: Maybe<ArchSiteWorkingDay_Variance_Fields>,
};


export type ArchSiteWorkingDay_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArchSiteWorkingDay_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArchSiteWorkingDay_Aggregate_Order_By = {
  avg?: Maybe<ArchSiteWorkingDay_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArchSiteWorkingDay_Max_Order_By>,
  min?: Maybe<ArchSiteWorkingDay_Min_Order_By>,
  stddev?: Maybe<ArchSiteWorkingDay_Stddev_Order_By>,
  stddev_pop?: Maybe<ArchSiteWorkingDay_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArchSiteWorkingDay_Stddev_Samp_Order_By>,
  sum?: Maybe<ArchSiteWorkingDay_Sum_Order_By>,
  var_pop?: Maybe<ArchSiteWorkingDay_Var_Pop_Order_By>,
  var_samp?: Maybe<ArchSiteWorkingDay_Var_Samp_Order_By>,
  variance?: Maybe<ArchSiteWorkingDay_Variance_Order_By>,
};

export type ArchSiteWorkingDay_Arr_Rel_Insert_Input = {
  data: Array<ArchSiteWorkingDay_Insert_Input>,
  on_conflict?: Maybe<ArchSiteWorkingDay_On_Conflict>,
};

export type ArchSiteWorkingDay_Avg_Fields = {
   __typename?: 'ArchSiteWorkingDay_avg_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  dayID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDay_Avg_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDay_Bool_Exp = {
  ArchSiteWorkingDaySchedules?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>,
  Day?: Maybe<Day_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArchSiteWorkingDay_Bool_Exp>>>,
  _not?: Maybe<ArchSiteWorkingDay_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArchSiteWorkingDay_Bool_Exp>>>,
  archSiteWorkingDayID?: Maybe<Int_Comparison_Exp>,
  closeHour?: Maybe<Timetz_Comparison_Exp>,
  dayID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  openHour?: Maybe<Timetz_Comparison_Exp>,
};

export enum ArchSiteWorkingDay_Constraint {
  ArchSiteWorkingDayPkey = 'ArchSiteWorkingDay_pkey'
}

export type ArchSiteWorkingDay_Inc_Input = {
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  dayID?: Maybe<Scalars['Int']>,
};

export type ArchSiteWorkingDay_Insert_Input = {
  ArchSiteWorkingDaySchedules?: Maybe<ArchSiteWorkingDaySchedule_Arr_Rel_Insert_Input>,
  Day?: Maybe<Day_Obj_Rel_Insert_Input>,
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  openHour?: Maybe<Scalars['timetz']>,
};

export type ArchSiteWorkingDay_Max_Fields = {
   __typename?: 'ArchSiteWorkingDay_max_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  openHour?: Maybe<Scalars['timetz']>,
};

export type ArchSiteWorkingDay_Max_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  closeHour?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
  openHour?: Maybe<Order_By>,
};

export type ArchSiteWorkingDay_Min_Fields = {
   __typename?: 'ArchSiteWorkingDay_min_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  openHour?: Maybe<Scalars['timetz']>,
};

export type ArchSiteWorkingDay_Min_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  closeHour?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
  openHour?: Maybe<Order_By>,
};

export type ArchSiteWorkingDay_Mutation_Response = {
   __typename?: 'ArchSiteWorkingDay_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArchSiteWorkingDay>,
};

export type ArchSiteWorkingDay_Obj_Rel_Insert_Input = {
  data: ArchSiteWorkingDay_Insert_Input,
  on_conflict?: Maybe<ArchSiteWorkingDay_On_Conflict>,
};

export type ArchSiteWorkingDay_On_Conflict = {
  constraint: ArchSiteWorkingDay_Constraint,
  update_columns: Array<ArchSiteWorkingDay_Update_Column>,
  where?: Maybe<ArchSiteWorkingDay_Bool_Exp>,
};

export type ArchSiteWorkingDay_Order_By = {
  ArchSiteWorkingDaySchedules_aggregate?: Maybe<ArchSiteWorkingDaySchedule_Aggregate_Order_By>,
  Day?: Maybe<Day_Order_By>,
  archSiteWorkingDayID?: Maybe<Order_By>,
  closeHour?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  openHour?: Maybe<Order_By>,
};

export enum ArchSiteWorkingDay_Select_Column {
  ArchSiteWorkingDayId = 'archSiteWorkingDayID',
  CloseHour = 'closeHour',
  DayId = 'dayID',
  IsDeleted = 'isDeleted',
  OpenHour = 'openHour'
}

export type ArchSiteWorkingDay_Set_Input = {
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  openHour?: Maybe<Scalars['timetz']>,
};

export type ArchSiteWorkingDay_Stddev_Fields = {
   __typename?: 'ArchSiteWorkingDay_stddev_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  dayID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDay_Stddev_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDay_Stddev_Pop_Fields = {
   __typename?: 'ArchSiteWorkingDay_stddev_pop_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  dayID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDay_Stddev_Pop_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDay_Stddev_Samp_Fields = {
   __typename?: 'ArchSiteWorkingDay_stddev_samp_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  dayID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDay_Stddev_Samp_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDay_Sum_Fields = {
   __typename?: 'ArchSiteWorkingDay_sum_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  dayID?: Maybe<Scalars['Int']>,
};

export type ArchSiteWorkingDay_Sum_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
};

export enum ArchSiteWorkingDay_Update_Column {
  ArchSiteWorkingDayId = 'archSiteWorkingDayID',
  CloseHour = 'closeHour',
  DayId = 'dayID',
  IsDeleted = 'isDeleted',
  OpenHour = 'openHour'
}

export type ArchSiteWorkingDay_Var_Pop_Fields = {
   __typename?: 'ArchSiteWorkingDay_var_pop_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  dayID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDay_Var_Pop_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDay_Var_Samp_Fields = {
   __typename?: 'ArchSiteWorkingDay_var_samp_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  dayID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDay_Var_Samp_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDay_Variance_Fields = {
   __typename?: 'ArchSiteWorkingDay_variance_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  dayID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDay_Variance_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDaySchedule = {
   __typename?: 'ArchSiteWorkingDaySchedule',
  ArchSiteWorkingDay: ArchSiteWorkingDay,
  ArchSiteWorkingSchedule: ArchSiteWorkingSchedule,
  archSiteWorkingDayID: Scalars['Int'],
  archSiteWorkingDayScheduleID: Scalars['Int'],
  archSiteWorkingScheduleID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
};

export type ArchSiteWorkingDaySchedule_Aggregate = {
   __typename?: 'ArchSiteWorkingDaySchedule_aggregate',
  aggregate?: Maybe<ArchSiteWorkingDaySchedule_Aggregate_Fields>,
  nodes: Array<ArchSiteWorkingDaySchedule>,
};

export type ArchSiteWorkingDaySchedule_Aggregate_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_aggregate_fields',
  avg?: Maybe<ArchSiteWorkingDaySchedule_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArchSiteWorkingDaySchedule_Max_Fields>,
  min?: Maybe<ArchSiteWorkingDaySchedule_Min_Fields>,
  stddev?: Maybe<ArchSiteWorkingDaySchedule_Stddev_Fields>,
  stddev_pop?: Maybe<ArchSiteWorkingDaySchedule_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArchSiteWorkingDaySchedule_Stddev_Samp_Fields>,
  sum?: Maybe<ArchSiteWorkingDaySchedule_Sum_Fields>,
  var_pop?: Maybe<ArchSiteWorkingDaySchedule_Var_Pop_Fields>,
  var_samp?: Maybe<ArchSiteWorkingDaySchedule_Var_Samp_Fields>,
  variance?: Maybe<ArchSiteWorkingDaySchedule_Variance_Fields>,
};


export type ArchSiteWorkingDaySchedule_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArchSiteWorkingDaySchedule_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArchSiteWorkingDaySchedule_Aggregate_Order_By = {
  avg?: Maybe<ArchSiteWorkingDaySchedule_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArchSiteWorkingDaySchedule_Max_Order_By>,
  min?: Maybe<ArchSiteWorkingDaySchedule_Min_Order_By>,
  stddev?: Maybe<ArchSiteWorkingDaySchedule_Stddev_Order_By>,
  stddev_pop?: Maybe<ArchSiteWorkingDaySchedule_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArchSiteWorkingDaySchedule_Stddev_Samp_Order_By>,
  sum?: Maybe<ArchSiteWorkingDaySchedule_Sum_Order_By>,
  var_pop?: Maybe<ArchSiteWorkingDaySchedule_Var_Pop_Order_By>,
  var_samp?: Maybe<ArchSiteWorkingDaySchedule_Var_Samp_Order_By>,
  variance?: Maybe<ArchSiteWorkingDaySchedule_Variance_Order_By>,
};

export type ArchSiteWorkingDaySchedule_Arr_Rel_Insert_Input = {
  data: Array<ArchSiteWorkingDaySchedule_Insert_Input>,
  on_conflict?: Maybe<ArchSiteWorkingDaySchedule_On_Conflict>,
};

export type ArchSiteWorkingDaySchedule_Avg_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_avg_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDaySchedule_Avg_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDaySchedule_Bool_Exp = {
  ArchSiteWorkingDay?: Maybe<ArchSiteWorkingDay_Bool_Exp>,
  ArchSiteWorkingSchedule?: Maybe<ArchSiteWorkingSchedule_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>>>,
  _not?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>>>,
  archSiteWorkingDayID?: Maybe<Int_Comparison_Exp>,
  archSiteWorkingDayScheduleID?: Maybe<Int_Comparison_Exp>,
  archSiteWorkingScheduleID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
};

export enum ArchSiteWorkingDaySchedule_Constraint {
  ArchSiteWorkingDaySchedulePkey = 'ArchSiteWorkingDaySchedule_pkey'
}

export type ArchSiteWorkingDaySchedule_Inc_Input = {
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type ArchSiteWorkingDaySchedule_Insert_Input = {
  ArchSiteWorkingDay?: Maybe<ArchSiteWorkingDay_Obj_Rel_Insert_Input>,
  ArchSiteWorkingSchedule?: Maybe<ArchSiteWorkingSchedule_Obj_Rel_Insert_Input>,
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type ArchSiteWorkingDaySchedule_Max_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_max_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type ArchSiteWorkingDaySchedule_Max_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDaySchedule_Min_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_min_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type ArchSiteWorkingDaySchedule_Min_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDaySchedule_Mutation_Response = {
   __typename?: 'ArchSiteWorkingDaySchedule_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArchSiteWorkingDaySchedule>,
};

export type ArchSiteWorkingDaySchedule_Obj_Rel_Insert_Input = {
  data: ArchSiteWorkingDaySchedule_Insert_Input,
  on_conflict?: Maybe<ArchSiteWorkingDaySchedule_On_Conflict>,
};

export type ArchSiteWorkingDaySchedule_On_Conflict = {
  constraint: ArchSiteWorkingDaySchedule_Constraint,
  update_columns: Array<ArchSiteWorkingDaySchedule_Update_Column>,
  where?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>,
};

export type ArchSiteWorkingDaySchedule_Order_By = {
  ArchSiteWorkingDay?: Maybe<ArchSiteWorkingDay_Order_By>,
  ArchSiteWorkingSchedule?: Maybe<ArchSiteWorkingSchedule_Order_By>,
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
};

export enum ArchSiteWorkingDaySchedule_Select_Column {
  ArchSiteWorkingDayId = 'archSiteWorkingDayID',
  ArchSiteWorkingDayScheduleId = 'archSiteWorkingDayScheduleID',
  ArchSiteWorkingScheduleId = 'archSiteWorkingScheduleID',
  IsDeleted = 'isDeleted'
}

export type ArchSiteWorkingDaySchedule_Set_Input = {
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type ArchSiteWorkingDaySchedule_Stddev_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_stddev_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDaySchedule_Stddev_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDaySchedule_Stddev_Pop_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_stddev_pop_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDaySchedule_Stddev_Pop_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDaySchedule_Stddev_Samp_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_stddev_samp_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDaySchedule_Stddev_Samp_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDaySchedule_Sum_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_sum_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Int']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type ArchSiteWorkingDaySchedule_Sum_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export enum ArchSiteWorkingDaySchedule_Update_Column {
  ArchSiteWorkingDayId = 'archSiteWorkingDayID',
  ArchSiteWorkingDayScheduleId = 'archSiteWorkingDayScheduleID',
  ArchSiteWorkingScheduleId = 'archSiteWorkingScheduleID',
  IsDeleted = 'isDeleted'
}

export type ArchSiteWorkingDaySchedule_Var_Pop_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_var_pop_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDaySchedule_Var_Pop_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDaySchedule_Var_Samp_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_var_samp_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDaySchedule_Var_Samp_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingDaySchedule_Variance_Fields = {
   __typename?: 'ArchSiteWorkingDaySchedule_variance_fields',
  archSiteWorkingDayID?: Maybe<Scalars['Float']>,
  archSiteWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingDaySchedule_Variance_Order_By = {
  archSiteWorkingDayID?: Maybe<Order_By>,
  archSiteWorkingDayScheduleID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingSchedule = {
   __typename?: 'ArchSiteWorkingSchedule',
  ArchSite: ArchSite,
  ArchSiteWorkingDaySchedules: Array<ArchSiteWorkingDaySchedule>,
  ArchSiteWorkingDaySchedules_aggregate: ArchSiteWorkingDaySchedule_Aggregate,
  archSiteID: Scalars['Int'],
  archSiteWorkingScheduleID: Scalars['Int'],
  finishDate: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  startDate: Scalars['timestamptz'],
};


export type ArchSiteWorkingScheduleArchSiteWorkingDaySchedulesArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDaySchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>
};


export type ArchSiteWorkingScheduleArchSiteWorkingDaySchedules_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDaySchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>
};

export type ArchSiteWorkingSchedule_Aggregate = {
   __typename?: 'ArchSiteWorkingSchedule_aggregate',
  aggregate?: Maybe<ArchSiteWorkingSchedule_Aggregate_Fields>,
  nodes: Array<ArchSiteWorkingSchedule>,
};

export type ArchSiteWorkingSchedule_Aggregate_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_aggregate_fields',
  avg?: Maybe<ArchSiteWorkingSchedule_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArchSiteWorkingSchedule_Max_Fields>,
  min?: Maybe<ArchSiteWorkingSchedule_Min_Fields>,
  stddev?: Maybe<ArchSiteWorkingSchedule_Stddev_Fields>,
  stddev_pop?: Maybe<ArchSiteWorkingSchedule_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArchSiteWorkingSchedule_Stddev_Samp_Fields>,
  sum?: Maybe<ArchSiteWorkingSchedule_Sum_Fields>,
  var_pop?: Maybe<ArchSiteWorkingSchedule_Var_Pop_Fields>,
  var_samp?: Maybe<ArchSiteWorkingSchedule_Var_Samp_Fields>,
  variance?: Maybe<ArchSiteWorkingSchedule_Variance_Fields>,
};


export type ArchSiteWorkingSchedule_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArchSiteWorkingSchedule_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArchSiteWorkingSchedule_Aggregate_Order_By = {
  avg?: Maybe<ArchSiteWorkingSchedule_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArchSiteWorkingSchedule_Max_Order_By>,
  min?: Maybe<ArchSiteWorkingSchedule_Min_Order_By>,
  stddev?: Maybe<ArchSiteWorkingSchedule_Stddev_Order_By>,
  stddev_pop?: Maybe<ArchSiteWorkingSchedule_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArchSiteWorkingSchedule_Stddev_Samp_Order_By>,
  sum?: Maybe<ArchSiteWorkingSchedule_Sum_Order_By>,
  var_pop?: Maybe<ArchSiteWorkingSchedule_Var_Pop_Order_By>,
  var_samp?: Maybe<ArchSiteWorkingSchedule_Var_Samp_Order_By>,
  variance?: Maybe<ArchSiteWorkingSchedule_Variance_Order_By>,
};

export type ArchSiteWorkingSchedule_Arr_Rel_Insert_Input = {
  data: Array<ArchSiteWorkingSchedule_Insert_Input>,
  on_conflict?: Maybe<ArchSiteWorkingSchedule_On_Conflict>,
};

export type ArchSiteWorkingSchedule_Avg_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_avg_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingSchedule_Avg_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingSchedule_Bool_Exp = {
  ArchSite?: Maybe<ArchSite_Bool_Exp>,
  ArchSiteWorkingDaySchedules?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArchSiteWorkingSchedule_Bool_Exp>>>,
  _not?: Maybe<ArchSiteWorkingSchedule_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArchSiteWorkingSchedule_Bool_Exp>>>,
  archSiteID?: Maybe<Int_Comparison_Exp>,
  archSiteWorkingScheduleID?: Maybe<Int_Comparison_Exp>,
  finishDate?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  startDate?: Maybe<Timestamptz_Comparison_Exp>,
};

export enum ArchSiteWorkingSchedule_Constraint {
  ArchSiteWorkingSchedulePkey = 'ArchSiteWorkingSchedule_pkey'
}

export type ArchSiteWorkingSchedule_Inc_Input = {
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type ArchSiteWorkingSchedule_Insert_Input = {
  ArchSite?: Maybe<ArchSite_Obj_Rel_Insert_Input>,
  ArchSiteWorkingDaySchedules?: Maybe<ArchSiteWorkingDaySchedule_Arr_Rel_Insert_Input>,
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type ArchSiteWorkingSchedule_Max_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_max_fields',
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type ArchSiteWorkingSchedule_Max_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
  finishDate?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type ArchSiteWorkingSchedule_Min_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_min_fields',
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type ArchSiteWorkingSchedule_Min_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
  finishDate?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type ArchSiteWorkingSchedule_Mutation_Response = {
   __typename?: 'ArchSiteWorkingSchedule_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArchSiteWorkingSchedule>,
};

export type ArchSiteWorkingSchedule_Obj_Rel_Insert_Input = {
  data: ArchSiteWorkingSchedule_Insert_Input,
  on_conflict?: Maybe<ArchSiteWorkingSchedule_On_Conflict>,
};

export type ArchSiteWorkingSchedule_On_Conflict = {
  constraint: ArchSiteWorkingSchedule_Constraint,
  update_columns: Array<ArchSiteWorkingSchedule_Update_Column>,
  where?: Maybe<ArchSiteWorkingSchedule_Bool_Exp>,
};

export type ArchSiteWorkingSchedule_Order_By = {
  ArchSite?: Maybe<ArchSite_Order_By>,
  ArchSiteWorkingDaySchedules_aggregate?: Maybe<ArchSiteWorkingDaySchedule_Aggregate_Order_By>,
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
  finishDate?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export enum ArchSiteWorkingSchedule_Select_Column {
  ArchSiteId = 'archSiteID',
  ArchSiteWorkingScheduleId = 'archSiteWorkingScheduleID',
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  StartDate = 'startDate'
}

export type ArchSiteWorkingSchedule_Set_Input = {
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type ArchSiteWorkingSchedule_Stddev_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_stddev_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingSchedule_Stddev_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingSchedule_Stddev_Pop_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_stddev_pop_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingSchedule_Stddev_Pop_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingSchedule_Stddev_Samp_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_stddev_samp_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingSchedule_Stddev_Samp_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingSchedule_Sum_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_sum_fields',
  archSiteID?: Maybe<Scalars['Int']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type ArchSiteWorkingSchedule_Sum_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export enum ArchSiteWorkingSchedule_Update_Column {
  ArchSiteId = 'archSiteID',
  ArchSiteWorkingScheduleId = 'archSiteWorkingScheduleID',
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  StartDate = 'startDate'
}

export type ArchSiteWorkingSchedule_Var_Pop_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_var_pop_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingSchedule_Var_Pop_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingSchedule_Var_Samp_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_var_samp_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingSchedule_Var_Samp_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type ArchSiteWorkingSchedule_Variance_Fields = {
   __typename?: 'ArchSiteWorkingSchedule_variance_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  archSiteWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type ArchSiteWorkingSchedule_Variance_Order_By = {
  archSiteID?: Maybe<Order_By>,
  archSiteWorkingScheduleID?: Maybe<Order_By>,
};

export type Article = {
   __typename?: 'Article',
  ArticleTags: Array<ArticleTag>,
  ArticleTags_aggregate: ArticleTag_Aggregate,
  ArticleUsers: Array<ArticleUser>,
  ArticleUsers_aggregate: ArticleUser_Aggregate,
  articleID: Scalars['Int'],
  content: Scalars['String'],
  editDate: Scalars['timestamptz'],
  imageUrl?: Maybe<Scalars['String']>,
  isDeleted: Scalars['Boolean'],
  publishDate: Scalars['timestamptz'],
  title: Scalars['String'],
};


export type ArticleArticleTagsArgs = {
  distinct_on?: Maybe<Array<ArticleTag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleTag_Order_By>>,
  where?: Maybe<ArticleTag_Bool_Exp>
};


export type ArticleArticleTags_AggregateArgs = {
  distinct_on?: Maybe<Array<ArticleTag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleTag_Order_By>>,
  where?: Maybe<ArticleTag_Bool_Exp>
};


export type ArticleArticleUsersArgs = {
  distinct_on?: Maybe<Array<ArticleUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleUser_Order_By>>,
  where?: Maybe<ArticleUser_Bool_Exp>
};


export type ArticleArticleUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<ArticleUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleUser_Order_By>>,
  where?: Maybe<ArticleUser_Bool_Exp>
};

export type Article_Aggregate = {
   __typename?: 'Article_aggregate',
  aggregate?: Maybe<Article_Aggregate_Fields>,
  nodes: Array<Article>,
};

export type Article_Aggregate_Fields = {
   __typename?: 'Article_aggregate_fields',
  avg?: Maybe<Article_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Article_Max_Fields>,
  min?: Maybe<Article_Min_Fields>,
  stddev?: Maybe<Article_Stddev_Fields>,
  stddev_pop?: Maybe<Article_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Article_Stddev_Samp_Fields>,
  sum?: Maybe<Article_Sum_Fields>,
  var_pop?: Maybe<Article_Var_Pop_Fields>,
  var_samp?: Maybe<Article_Var_Samp_Fields>,
  variance?: Maybe<Article_Variance_Fields>,
};


export type Article_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Article_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Article_Aggregate_Order_By = {
  avg?: Maybe<Article_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Article_Max_Order_By>,
  min?: Maybe<Article_Min_Order_By>,
  stddev?: Maybe<Article_Stddev_Order_By>,
  stddev_pop?: Maybe<Article_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Article_Stddev_Samp_Order_By>,
  sum?: Maybe<Article_Sum_Order_By>,
  var_pop?: Maybe<Article_Var_Pop_Order_By>,
  var_samp?: Maybe<Article_Var_Samp_Order_By>,
  variance?: Maybe<Article_Variance_Order_By>,
};

export type Article_Arr_Rel_Insert_Input = {
  data: Array<Article_Insert_Input>,
  on_conflict?: Maybe<Article_On_Conflict>,
};

export type Article_Avg_Fields = {
   __typename?: 'Article_avg_fields',
  articleID?: Maybe<Scalars['Float']>,
};

export type Article_Avg_Order_By = {
  articleID?: Maybe<Order_By>,
};

export type Article_Bool_Exp = {
  ArticleTags?: Maybe<ArticleTag_Bool_Exp>,
  ArticleUsers?: Maybe<ArticleUser_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Article_Bool_Exp>>>,
  _not?: Maybe<Article_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Article_Bool_Exp>>>,
  articleID?: Maybe<Int_Comparison_Exp>,
  content?: Maybe<String_Comparison_Exp>,
  editDate?: Maybe<Timestamptz_Comparison_Exp>,
  imageUrl?: Maybe<String_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  publishDate?: Maybe<Timestamptz_Comparison_Exp>,
  title?: Maybe<String_Comparison_Exp>,
};

export enum Article_Constraint {
  ArticlePkey = 'Article_pkey'
}

export type Article_Inc_Input = {
  articleID?: Maybe<Scalars['Int']>,
};

export type Article_Insert_Input = {
  ArticleTags?: Maybe<ArticleTag_Arr_Rel_Insert_Input>,
  ArticleUsers?: Maybe<ArticleUser_Arr_Rel_Insert_Input>,
  articleID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
  editDate?: Maybe<Scalars['timestamptz']>,
  imageUrl?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  publishDate?: Maybe<Scalars['timestamptz']>,
  title?: Maybe<Scalars['String']>,
};

export type Article_Max_Fields = {
   __typename?: 'Article_max_fields',
  articleID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
  editDate?: Maybe<Scalars['timestamptz']>,
  imageUrl?: Maybe<Scalars['String']>,
  publishDate?: Maybe<Scalars['timestamptz']>,
  title?: Maybe<Scalars['String']>,
};

export type Article_Max_Order_By = {
  articleID?: Maybe<Order_By>,
  content?: Maybe<Order_By>,
  editDate?: Maybe<Order_By>,
  imageUrl?: Maybe<Order_By>,
  publishDate?: Maybe<Order_By>,
  title?: Maybe<Order_By>,
};

export type Article_Min_Fields = {
   __typename?: 'Article_min_fields',
  articleID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
  editDate?: Maybe<Scalars['timestamptz']>,
  imageUrl?: Maybe<Scalars['String']>,
  publishDate?: Maybe<Scalars['timestamptz']>,
  title?: Maybe<Scalars['String']>,
};

export type Article_Min_Order_By = {
  articleID?: Maybe<Order_By>,
  content?: Maybe<Order_By>,
  editDate?: Maybe<Order_By>,
  imageUrl?: Maybe<Order_By>,
  publishDate?: Maybe<Order_By>,
  title?: Maybe<Order_By>,
};

export type Article_Mutation_Response = {
   __typename?: 'Article_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Article>,
};

export type Article_Obj_Rel_Insert_Input = {
  data: Article_Insert_Input,
  on_conflict?: Maybe<Article_On_Conflict>,
};

export type Article_On_Conflict = {
  constraint: Article_Constraint,
  update_columns: Array<Article_Update_Column>,
  where?: Maybe<Article_Bool_Exp>,
};

export type Article_Order_By = {
  ArticleTags_aggregate?: Maybe<ArticleTag_Aggregate_Order_By>,
  ArticleUsers_aggregate?: Maybe<ArticleUser_Aggregate_Order_By>,
  articleID?: Maybe<Order_By>,
  content?: Maybe<Order_By>,
  editDate?: Maybe<Order_By>,
  imageUrl?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  publishDate?: Maybe<Order_By>,
  title?: Maybe<Order_By>,
};

export enum Article_Select_Column {
  ArticleId = 'articleID',
  Content = 'content',
  EditDate = 'editDate',
  ImageUrl = 'imageUrl',
  IsDeleted = 'isDeleted',
  PublishDate = 'publishDate',
  Title = 'title'
}

export type Article_Set_Input = {
  articleID?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['String']>,
  editDate?: Maybe<Scalars['timestamptz']>,
  imageUrl?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  publishDate?: Maybe<Scalars['timestamptz']>,
  title?: Maybe<Scalars['String']>,
};

export type Article_Stddev_Fields = {
   __typename?: 'Article_stddev_fields',
  articleID?: Maybe<Scalars['Float']>,
};

export type Article_Stddev_Order_By = {
  articleID?: Maybe<Order_By>,
};

export type Article_Stddev_Pop_Fields = {
   __typename?: 'Article_stddev_pop_fields',
  articleID?: Maybe<Scalars['Float']>,
};

export type Article_Stddev_Pop_Order_By = {
  articleID?: Maybe<Order_By>,
};

export type Article_Stddev_Samp_Fields = {
   __typename?: 'Article_stddev_samp_fields',
  articleID?: Maybe<Scalars['Float']>,
};

export type Article_Stddev_Samp_Order_By = {
  articleID?: Maybe<Order_By>,
};

export type Article_Sum_Fields = {
   __typename?: 'Article_sum_fields',
  articleID?: Maybe<Scalars['Int']>,
};

export type Article_Sum_Order_By = {
  articleID?: Maybe<Order_By>,
};

export enum Article_Update_Column {
  ArticleId = 'articleID',
  Content = 'content',
  EditDate = 'editDate',
  ImageUrl = 'imageUrl',
  IsDeleted = 'isDeleted',
  PublishDate = 'publishDate',
  Title = 'title'
}

export type Article_Var_Pop_Fields = {
   __typename?: 'Article_var_pop_fields',
  articleID?: Maybe<Scalars['Float']>,
};

export type Article_Var_Pop_Order_By = {
  articleID?: Maybe<Order_By>,
};

export type Article_Var_Samp_Fields = {
   __typename?: 'Article_var_samp_fields',
  articleID?: Maybe<Scalars['Float']>,
};

export type Article_Var_Samp_Order_By = {
  articleID?: Maybe<Order_By>,
};

export type Article_Variance_Fields = {
   __typename?: 'Article_variance_fields',
  articleID?: Maybe<Scalars['Float']>,
};

export type Article_Variance_Order_By = {
  articleID?: Maybe<Order_By>,
};

export type ArticleTag = {
   __typename?: 'ArticleTag',
  Article: Article,
  Tag: Tag,
  articleID: Scalars['Int'],
  articleTagID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  tagID: Scalars['Int'],
};

export type ArticleTag_Aggregate = {
   __typename?: 'ArticleTag_aggregate',
  aggregate?: Maybe<ArticleTag_Aggregate_Fields>,
  nodes: Array<ArticleTag>,
};

export type ArticleTag_Aggregate_Fields = {
   __typename?: 'ArticleTag_aggregate_fields',
  avg?: Maybe<ArticleTag_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArticleTag_Max_Fields>,
  min?: Maybe<ArticleTag_Min_Fields>,
  stddev?: Maybe<ArticleTag_Stddev_Fields>,
  stddev_pop?: Maybe<ArticleTag_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArticleTag_Stddev_Samp_Fields>,
  sum?: Maybe<ArticleTag_Sum_Fields>,
  var_pop?: Maybe<ArticleTag_Var_Pop_Fields>,
  var_samp?: Maybe<ArticleTag_Var_Samp_Fields>,
  variance?: Maybe<ArticleTag_Variance_Fields>,
};


export type ArticleTag_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArticleTag_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArticleTag_Aggregate_Order_By = {
  avg?: Maybe<ArticleTag_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArticleTag_Max_Order_By>,
  min?: Maybe<ArticleTag_Min_Order_By>,
  stddev?: Maybe<ArticleTag_Stddev_Order_By>,
  stddev_pop?: Maybe<ArticleTag_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArticleTag_Stddev_Samp_Order_By>,
  sum?: Maybe<ArticleTag_Sum_Order_By>,
  var_pop?: Maybe<ArticleTag_Var_Pop_Order_By>,
  var_samp?: Maybe<ArticleTag_Var_Samp_Order_By>,
  variance?: Maybe<ArticleTag_Variance_Order_By>,
};

export type ArticleTag_Arr_Rel_Insert_Input = {
  data: Array<ArticleTag_Insert_Input>,
  on_conflict?: Maybe<ArticleTag_On_Conflict>,
};

export type ArticleTag_Avg_Fields = {
   __typename?: 'ArticleTag_avg_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleTagID?: Maybe<Scalars['Float']>,
  tagID?: Maybe<Scalars['Float']>,
};

export type ArticleTag_Avg_Order_By = {
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type ArticleTag_Bool_Exp = {
  Article?: Maybe<Article_Bool_Exp>,
  Tag?: Maybe<Tag_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArticleTag_Bool_Exp>>>,
  _not?: Maybe<ArticleTag_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArticleTag_Bool_Exp>>>,
  articleID?: Maybe<Int_Comparison_Exp>,
  articleTagID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  tagID?: Maybe<Int_Comparison_Exp>,
};

export enum ArticleTag_Constraint {
  ArticleTagPkey = 'ArticleTag_pkey'
}

export type ArticleTag_Inc_Input = {
  articleID?: Maybe<Scalars['Int']>,
  articleTagID?: Maybe<Scalars['Int']>,
  tagID?: Maybe<Scalars['Int']>,
};

export type ArticleTag_Insert_Input = {
  Article?: Maybe<Article_Obj_Rel_Insert_Input>,
  Tag?: Maybe<Tag_Obj_Rel_Insert_Input>,
  articleID?: Maybe<Scalars['Int']>,
  articleTagID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  tagID?: Maybe<Scalars['Int']>,
};

export type ArticleTag_Max_Fields = {
   __typename?: 'ArticleTag_max_fields',
  articleID?: Maybe<Scalars['Int']>,
  articleTagID?: Maybe<Scalars['Int']>,
  tagID?: Maybe<Scalars['Int']>,
};

export type ArticleTag_Max_Order_By = {
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type ArticleTag_Min_Fields = {
   __typename?: 'ArticleTag_min_fields',
  articleID?: Maybe<Scalars['Int']>,
  articleTagID?: Maybe<Scalars['Int']>,
  tagID?: Maybe<Scalars['Int']>,
};

export type ArticleTag_Min_Order_By = {
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type ArticleTag_Mutation_Response = {
   __typename?: 'ArticleTag_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArticleTag>,
};

export type ArticleTag_Obj_Rel_Insert_Input = {
  data: ArticleTag_Insert_Input,
  on_conflict?: Maybe<ArticleTag_On_Conflict>,
};

export type ArticleTag_On_Conflict = {
  constraint: ArticleTag_Constraint,
  update_columns: Array<ArticleTag_Update_Column>,
  where?: Maybe<ArticleTag_Bool_Exp>,
};

export type ArticleTag_Order_By = {
  Article?: Maybe<Article_Order_By>,
  Tag?: Maybe<Tag_Order_By>,
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export enum ArticleTag_Select_Column {
  ArticleId = 'articleID',
  ArticleTagId = 'articleTagID',
  IsDeleted = 'isDeleted',
  TagId = 'tagID'
}

export type ArticleTag_Set_Input = {
  articleID?: Maybe<Scalars['Int']>,
  articleTagID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  tagID?: Maybe<Scalars['Int']>,
};

export type ArticleTag_Stddev_Fields = {
   __typename?: 'ArticleTag_stddev_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleTagID?: Maybe<Scalars['Float']>,
  tagID?: Maybe<Scalars['Float']>,
};

export type ArticleTag_Stddev_Order_By = {
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type ArticleTag_Stddev_Pop_Fields = {
   __typename?: 'ArticleTag_stddev_pop_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleTagID?: Maybe<Scalars['Float']>,
  tagID?: Maybe<Scalars['Float']>,
};

export type ArticleTag_Stddev_Pop_Order_By = {
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type ArticleTag_Stddev_Samp_Fields = {
   __typename?: 'ArticleTag_stddev_samp_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleTagID?: Maybe<Scalars['Float']>,
  tagID?: Maybe<Scalars['Float']>,
};

export type ArticleTag_Stddev_Samp_Order_By = {
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type ArticleTag_Sum_Fields = {
   __typename?: 'ArticleTag_sum_fields',
  articleID?: Maybe<Scalars['Int']>,
  articleTagID?: Maybe<Scalars['Int']>,
  tagID?: Maybe<Scalars['Int']>,
};

export type ArticleTag_Sum_Order_By = {
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export enum ArticleTag_Update_Column {
  ArticleId = 'articleID',
  ArticleTagId = 'articleTagID',
  IsDeleted = 'isDeleted',
  TagId = 'tagID'
}

export type ArticleTag_Var_Pop_Fields = {
   __typename?: 'ArticleTag_var_pop_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleTagID?: Maybe<Scalars['Float']>,
  tagID?: Maybe<Scalars['Float']>,
};

export type ArticleTag_Var_Pop_Order_By = {
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type ArticleTag_Var_Samp_Fields = {
   __typename?: 'ArticleTag_var_samp_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleTagID?: Maybe<Scalars['Float']>,
  tagID?: Maybe<Scalars['Float']>,
};

export type ArticleTag_Var_Samp_Order_By = {
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type ArticleTag_Variance_Fields = {
   __typename?: 'ArticleTag_variance_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleTagID?: Maybe<Scalars['Float']>,
  tagID?: Maybe<Scalars['Float']>,
};

export type ArticleTag_Variance_Order_By = {
  articleID?: Maybe<Order_By>,
  articleTagID?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type ArticleUser = {
   __typename?: 'ArticleUser',
  Article: Article,
  User: User,
  articleID: Scalars['Int'],
  articleUserID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  userID: Scalars['Int'],
};

export type ArticleUser_Aggregate = {
   __typename?: 'ArticleUser_aggregate',
  aggregate?: Maybe<ArticleUser_Aggregate_Fields>,
  nodes: Array<ArticleUser>,
};

export type ArticleUser_Aggregate_Fields = {
   __typename?: 'ArticleUser_aggregate_fields',
  avg?: Maybe<ArticleUser_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<ArticleUser_Max_Fields>,
  min?: Maybe<ArticleUser_Min_Fields>,
  stddev?: Maybe<ArticleUser_Stddev_Fields>,
  stddev_pop?: Maybe<ArticleUser_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<ArticleUser_Stddev_Samp_Fields>,
  sum?: Maybe<ArticleUser_Sum_Fields>,
  var_pop?: Maybe<ArticleUser_Var_Pop_Fields>,
  var_samp?: Maybe<ArticleUser_Var_Samp_Fields>,
  variance?: Maybe<ArticleUser_Variance_Fields>,
};


export type ArticleUser_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ArticleUser_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type ArticleUser_Aggregate_Order_By = {
  avg?: Maybe<ArticleUser_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<ArticleUser_Max_Order_By>,
  min?: Maybe<ArticleUser_Min_Order_By>,
  stddev?: Maybe<ArticleUser_Stddev_Order_By>,
  stddev_pop?: Maybe<ArticleUser_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<ArticleUser_Stddev_Samp_Order_By>,
  sum?: Maybe<ArticleUser_Sum_Order_By>,
  var_pop?: Maybe<ArticleUser_Var_Pop_Order_By>,
  var_samp?: Maybe<ArticleUser_Var_Samp_Order_By>,
  variance?: Maybe<ArticleUser_Variance_Order_By>,
};

export type ArticleUser_Arr_Rel_Insert_Input = {
  data: Array<ArticleUser_Insert_Input>,
  on_conflict?: Maybe<ArticleUser_On_Conflict>,
};

export type ArticleUser_Avg_Fields = {
   __typename?: 'ArticleUser_avg_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArticleUser_Avg_Order_By = {
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArticleUser_Bool_Exp = {
  Article?: Maybe<Article_Bool_Exp>,
  User?: Maybe<User_Bool_Exp>,
  _and?: Maybe<Array<Maybe<ArticleUser_Bool_Exp>>>,
  _not?: Maybe<ArticleUser_Bool_Exp>,
  _or?: Maybe<Array<Maybe<ArticleUser_Bool_Exp>>>,
  articleID?: Maybe<Int_Comparison_Exp>,
  articleUserID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  userID?: Maybe<Int_Comparison_Exp>,
};

export enum ArticleUser_Constraint {
  ArticleUserPkey = 'ArticleUser_pkey'
}

export type ArticleUser_Inc_Input = {
  articleID?: Maybe<Scalars['Int']>,
  articleUserID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArticleUser_Insert_Input = {
  Article?: Maybe<Article_Obj_Rel_Insert_Input>,
  User?: Maybe<User_Obj_Rel_Insert_Input>,
  articleID?: Maybe<Scalars['Int']>,
  articleUserID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArticleUser_Max_Fields = {
   __typename?: 'ArticleUser_max_fields',
  articleID?: Maybe<Scalars['Int']>,
  articleUserID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArticleUser_Max_Order_By = {
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArticleUser_Min_Fields = {
   __typename?: 'ArticleUser_min_fields',
  articleID?: Maybe<Scalars['Int']>,
  articleUserID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArticleUser_Min_Order_By = {
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArticleUser_Mutation_Response = {
   __typename?: 'ArticleUser_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<ArticleUser>,
};

export type ArticleUser_Obj_Rel_Insert_Input = {
  data: ArticleUser_Insert_Input,
  on_conflict?: Maybe<ArticleUser_On_Conflict>,
};

export type ArticleUser_On_Conflict = {
  constraint: ArticleUser_Constraint,
  update_columns: Array<ArticleUser_Update_Column>,
  where?: Maybe<ArticleUser_Bool_Exp>,
};

export type ArticleUser_Order_By = {
  Article?: Maybe<Article_Order_By>,
  User?: Maybe<User_Order_By>,
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum ArticleUser_Select_Column {
  ArticleId = 'articleID',
  ArticleUserId = 'articleUserID',
  IsDeleted = 'isDeleted',
  UserId = 'userID'
}

export type ArticleUser_Set_Input = {
  articleID?: Maybe<Scalars['Int']>,
  articleUserID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArticleUser_Stddev_Fields = {
   __typename?: 'ArticleUser_stddev_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArticleUser_Stddev_Order_By = {
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArticleUser_Stddev_Pop_Fields = {
   __typename?: 'ArticleUser_stddev_pop_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArticleUser_Stddev_Pop_Order_By = {
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArticleUser_Stddev_Samp_Fields = {
   __typename?: 'ArticleUser_stddev_samp_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArticleUser_Stddev_Samp_Order_By = {
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArticleUser_Sum_Fields = {
   __typename?: 'ArticleUser_sum_fields',
  articleID?: Maybe<Scalars['Int']>,
  articleUserID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type ArticleUser_Sum_Order_By = {
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum ArticleUser_Update_Column {
  ArticleId = 'articleID',
  ArticleUserId = 'articleUserID',
  IsDeleted = 'isDeleted',
  UserId = 'userID'
}

export type ArticleUser_Var_Pop_Fields = {
   __typename?: 'ArticleUser_var_pop_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArticleUser_Var_Pop_Order_By = {
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArticleUser_Var_Samp_Fields = {
   __typename?: 'ArticleUser_var_samp_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArticleUser_Var_Samp_Order_By = {
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type ArticleUser_Variance_Fields = {
   __typename?: 'ArticleUser_variance_fields',
  articleID?: Maybe<Scalars['Float']>,
  articleUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type ArticleUser_Variance_Order_By = {
  articleID?: Maybe<Order_By>,
  articleUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>,
  _gt?: Maybe<Scalars['Boolean']>,
  _gte?: Maybe<Scalars['Boolean']>,
  _in?: Maybe<Array<Scalars['Boolean']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['Boolean']>,
  _lte?: Maybe<Scalars['Boolean']>,
  _neq?: Maybe<Scalars['Boolean']>,
  _nin?: Maybe<Array<Scalars['Boolean']>>,
};

export type City = {
   __typename?: 'City',
  Addresses: Array<Address>,
  Addresses_aggregate: Address_Aggregate,
  Country: Country,
  Districts: Array<District>,
  Districts_aggregate: District_Aggregate,
  city: Scalars['String'],
  cityID: Scalars['Int'],
  countryID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
};


export type CityAddressesArgs = {
  distinct_on?: Maybe<Array<Address_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Address_Order_By>>,
  where?: Maybe<Address_Bool_Exp>
};


export type CityAddresses_AggregateArgs = {
  distinct_on?: Maybe<Array<Address_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Address_Order_By>>,
  where?: Maybe<Address_Bool_Exp>
};


export type CityDistrictsArgs = {
  distinct_on?: Maybe<Array<District_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<District_Order_By>>,
  where?: Maybe<District_Bool_Exp>
};


export type CityDistricts_AggregateArgs = {
  distinct_on?: Maybe<Array<District_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<District_Order_By>>,
  where?: Maybe<District_Bool_Exp>
};

export type City_Aggregate = {
   __typename?: 'City_aggregate',
  aggregate?: Maybe<City_Aggregate_Fields>,
  nodes: Array<City>,
};

export type City_Aggregate_Fields = {
   __typename?: 'City_aggregate_fields',
  avg?: Maybe<City_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<City_Max_Fields>,
  min?: Maybe<City_Min_Fields>,
  stddev?: Maybe<City_Stddev_Fields>,
  stddev_pop?: Maybe<City_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<City_Stddev_Samp_Fields>,
  sum?: Maybe<City_Sum_Fields>,
  var_pop?: Maybe<City_Var_Pop_Fields>,
  var_samp?: Maybe<City_Var_Samp_Fields>,
  variance?: Maybe<City_Variance_Fields>,
};


export type City_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<City_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type City_Aggregate_Order_By = {
  avg?: Maybe<City_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<City_Max_Order_By>,
  min?: Maybe<City_Min_Order_By>,
  stddev?: Maybe<City_Stddev_Order_By>,
  stddev_pop?: Maybe<City_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<City_Stddev_Samp_Order_By>,
  sum?: Maybe<City_Sum_Order_By>,
  var_pop?: Maybe<City_Var_Pop_Order_By>,
  var_samp?: Maybe<City_Var_Samp_Order_By>,
  variance?: Maybe<City_Variance_Order_By>,
};

export type City_Arr_Rel_Insert_Input = {
  data: Array<City_Insert_Input>,
  on_conflict?: Maybe<City_On_Conflict>,
};

export type City_Avg_Fields = {
   __typename?: 'City_avg_fields',
  cityID?: Maybe<Scalars['Float']>,
  countryID?: Maybe<Scalars['Float']>,
};

export type City_Avg_Order_By = {
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type City_Bool_Exp = {
  Addresses?: Maybe<Address_Bool_Exp>,
  Country?: Maybe<Country_Bool_Exp>,
  Districts?: Maybe<District_Bool_Exp>,
  _and?: Maybe<Array<Maybe<City_Bool_Exp>>>,
  _not?: Maybe<City_Bool_Exp>,
  _or?: Maybe<Array<Maybe<City_Bool_Exp>>>,
  city?: Maybe<String_Comparison_Exp>,
  cityID?: Maybe<Int_Comparison_Exp>,
  countryID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
};

export enum City_Constraint {
  CityPkey = 'City_pkey'
}

export type City_Inc_Input = {
  cityID?: Maybe<Scalars['Int']>,
  countryID?: Maybe<Scalars['Int']>,
};

export type City_Insert_Input = {
  Addresses?: Maybe<Address_Arr_Rel_Insert_Input>,
  Country?: Maybe<Country_Obj_Rel_Insert_Input>,
  Districts?: Maybe<District_Arr_Rel_Insert_Input>,
  city?: Maybe<Scalars['String']>,
  cityID?: Maybe<Scalars['Int']>,
  countryID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type City_Max_Fields = {
   __typename?: 'City_max_fields',
  city?: Maybe<Scalars['String']>,
  cityID?: Maybe<Scalars['Int']>,
  countryID?: Maybe<Scalars['Int']>,
};

export type City_Max_Order_By = {
  city?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type City_Min_Fields = {
   __typename?: 'City_min_fields',
  city?: Maybe<Scalars['String']>,
  cityID?: Maybe<Scalars['Int']>,
  countryID?: Maybe<Scalars['Int']>,
};

export type City_Min_Order_By = {
  city?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type City_Mutation_Response = {
   __typename?: 'City_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<City>,
};

export type City_Obj_Rel_Insert_Input = {
  data: City_Insert_Input,
  on_conflict?: Maybe<City_On_Conflict>,
};

export type City_On_Conflict = {
  constraint: City_Constraint,
  update_columns: Array<City_Update_Column>,
  where?: Maybe<City_Bool_Exp>,
};

export type City_Order_By = {
  Addresses_aggregate?: Maybe<Address_Aggregate_Order_By>,
  Country?: Maybe<Country_Order_By>,
  Districts_aggregate?: Maybe<District_Aggregate_Order_By>,
  city?: Maybe<Order_By>,
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
};

export enum City_Select_Column {
  City = 'city',
  CityId = 'cityID',
  CountryId = 'countryID',
  IsDeleted = 'isDeleted'
}

export type City_Set_Input = {
  city?: Maybe<Scalars['String']>,
  cityID?: Maybe<Scalars['Int']>,
  countryID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type City_Stddev_Fields = {
   __typename?: 'City_stddev_fields',
  cityID?: Maybe<Scalars['Float']>,
  countryID?: Maybe<Scalars['Float']>,
};

export type City_Stddev_Order_By = {
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type City_Stddev_Pop_Fields = {
   __typename?: 'City_stddev_pop_fields',
  cityID?: Maybe<Scalars['Float']>,
  countryID?: Maybe<Scalars['Float']>,
};

export type City_Stddev_Pop_Order_By = {
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type City_Stddev_Samp_Fields = {
   __typename?: 'City_stddev_samp_fields',
  cityID?: Maybe<Scalars['Float']>,
  countryID?: Maybe<Scalars['Float']>,
};

export type City_Stddev_Samp_Order_By = {
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type City_Sum_Fields = {
   __typename?: 'City_sum_fields',
  cityID?: Maybe<Scalars['Int']>,
  countryID?: Maybe<Scalars['Int']>,
};

export type City_Sum_Order_By = {
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export enum City_Update_Column {
  City = 'city',
  CityId = 'cityID',
  CountryId = 'countryID',
  IsDeleted = 'isDeleted'
}

export type City_Var_Pop_Fields = {
   __typename?: 'City_var_pop_fields',
  cityID?: Maybe<Scalars['Float']>,
  countryID?: Maybe<Scalars['Float']>,
};

export type City_Var_Pop_Order_By = {
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type City_Var_Samp_Fields = {
   __typename?: 'City_var_samp_fields',
  cityID?: Maybe<Scalars['Float']>,
  countryID?: Maybe<Scalars['Float']>,
};

export type City_Var_Samp_Order_By = {
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type City_Variance_Fields = {
   __typename?: 'City_variance_fields',
  cityID?: Maybe<Scalars['Float']>,
  countryID?: Maybe<Scalars['Float']>,
};

export type City_Variance_Order_By = {
  cityID?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type Company = {
   __typename?: 'Company',
  ArchSites: Array<ArchSite>,
  ArchSites_aggregate: ArchSite_Aggregate,
  CompanyPhones: Array<CompanyPhone>,
  CompanyPhones_aggregate: CompanyPhone_Aggregate,
  CompanyUsers: Array<CompanyUser>,
  CompanyUsers_aggregate: CompanyUser_Aggregate,
  Hotels: Array<Hotel>,
  Hotels_aggregate: Hotel_Aggregate,
  Location: Location,
  Museums: Array<Museum>,
  Museums_aggregate: Museum_Aggregate,
  Restaurants: Array<Restaurant>,
  Restaurants_aggregate: Restaurant_Aggregate,
  companyID: Scalars['Int'],
  description?: Maybe<Scalars['String']>,
  faxNumber?: Maybe<Scalars['String']>,
  isDeleted: Scalars['Boolean'],
  locationID: Scalars['Int'],
  logoUrl?: Maybe<Scalars['String']>,
  mail: Scalars['String'],
  name: Scalars['String'],
  registerDate: Scalars['timestamptz'],
  taxNumber: Scalars['String'],
};


export type CompanyArchSitesArgs = {
  distinct_on?: Maybe<Array<ArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSite_Order_By>>,
  where?: Maybe<ArchSite_Bool_Exp>
};


export type CompanyArchSites_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSite_Order_By>>,
  where?: Maybe<ArchSite_Bool_Exp>
};


export type CompanyCompanyPhonesArgs = {
  distinct_on?: Maybe<Array<CompanyPhone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyPhone_Order_By>>,
  where?: Maybe<CompanyPhone_Bool_Exp>
};


export type CompanyCompanyPhones_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyPhone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyPhone_Order_By>>,
  where?: Maybe<CompanyPhone_Bool_Exp>
};


export type CompanyCompanyUsersArgs = {
  distinct_on?: Maybe<Array<CompanyUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyUser_Order_By>>,
  where?: Maybe<CompanyUser_Bool_Exp>
};


export type CompanyCompanyUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyUser_Order_By>>,
  where?: Maybe<CompanyUser_Bool_Exp>
};


export type CompanyHotelsArgs = {
  distinct_on?: Maybe<Array<Hotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Hotel_Order_By>>,
  where?: Maybe<Hotel_Bool_Exp>
};


export type CompanyHotels_AggregateArgs = {
  distinct_on?: Maybe<Array<Hotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Hotel_Order_By>>,
  where?: Maybe<Hotel_Bool_Exp>
};


export type CompanyMuseumsArgs = {
  distinct_on?: Maybe<Array<Museum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Museum_Order_By>>,
  where?: Maybe<Museum_Bool_Exp>
};


export type CompanyMuseums_AggregateArgs = {
  distinct_on?: Maybe<Array<Museum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Museum_Order_By>>,
  where?: Maybe<Museum_Bool_Exp>
};


export type CompanyRestaurantsArgs = {
  distinct_on?: Maybe<Array<Restaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Restaurant_Order_By>>,
  where?: Maybe<Restaurant_Bool_Exp>
};


export type CompanyRestaurants_AggregateArgs = {
  distinct_on?: Maybe<Array<Restaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Restaurant_Order_By>>,
  where?: Maybe<Restaurant_Bool_Exp>
};

export type Company_Aggregate = {
   __typename?: 'Company_aggregate',
  aggregate?: Maybe<Company_Aggregate_Fields>,
  nodes: Array<Company>,
};

export type Company_Aggregate_Fields = {
   __typename?: 'Company_aggregate_fields',
  avg?: Maybe<Company_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Company_Max_Fields>,
  min?: Maybe<Company_Min_Fields>,
  stddev?: Maybe<Company_Stddev_Fields>,
  stddev_pop?: Maybe<Company_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Company_Stddev_Samp_Fields>,
  sum?: Maybe<Company_Sum_Fields>,
  var_pop?: Maybe<Company_Var_Pop_Fields>,
  var_samp?: Maybe<Company_Var_Samp_Fields>,
  variance?: Maybe<Company_Variance_Fields>,
};


export type Company_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Company_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Company_Aggregate_Order_By = {
  avg?: Maybe<Company_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Company_Max_Order_By>,
  min?: Maybe<Company_Min_Order_By>,
  stddev?: Maybe<Company_Stddev_Order_By>,
  stddev_pop?: Maybe<Company_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Company_Stddev_Samp_Order_By>,
  sum?: Maybe<Company_Sum_Order_By>,
  var_pop?: Maybe<Company_Var_Pop_Order_By>,
  var_samp?: Maybe<Company_Var_Samp_Order_By>,
  variance?: Maybe<Company_Variance_Order_By>,
};

export type Company_Arr_Rel_Insert_Input = {
  data: Array<Company_Insert_Input>,
  on_conflict?: Maybe<Company_On_Conflict>,
};

export type Company_Avg_Fields = {
   __typename?: 'Company_avg_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type Company_Avg_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type Company_Bool_Exp = {
  ArchSites?: Maybe<ArchSite_Bool_Exp>,
  CompanyPhones?: Maybe<CompanyPhone_Bool_Exp>,
  CompanyUsers?: Maybe<CompanyUser_Bool_Exp>,
  Hotels?: Maybe<Hotel_Bool_Exp>,
  Location?: Maybe<Location_Bool_Exp>,
  Museums?: Maybe<Museum_Bool_Exp>,
  Restaurants?: Maybe<Restaurant_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Company_Bool_Exp>>>,
  _not?: Maybe<Company_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Company_Bool_Exp>>>,
  companyID?: Maybe<Int_Comparison_Exp>,
  description?: Maybe<String_Comparison_Exp>,
  faxNumber?: Maybe<String_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  locationID?: Maybe<Int_Comparison_Exp>,
  logoUrl?: Maybe<String_Comparison_Exp>,
  mail?: Maybe<String_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
  registerDate?: Maybe<Timestamptz_Comparison_Exp>,
  taxNumber?: Maybe<String_Comparison_Exp>,
};

export enum Company_Constraint {
  CompanyMailKey = 'Company_mail_key',
  CompanyPkey = 'Company_pkey'
}

export type Company_Inc_Input = {
  companyID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
};

export type Company_Insert_Input = {
  ArchSites?: Maybe<ArchSite_Arr_Rel_Insert_Input>,
  CompanyPhones?: Maybe<CompanyPhone_Arr_Rel_Insert_Input>,
  CompanyUsers?: Maybe<CompanyUser_Arr_Rel_Insert_Input>,
  Hotels?: Maybe<Hotel_Arr_Rel_Insert_Input>,
  Location?: Maybe<Location_Obj_Rel_Insert_Input>,
  Museums?: Maybe<Museum_Arr_Rel_Insert_Input>,
  Restaurants?: Maybe<Restaurant_Arr_Rel_Insert_Input>,
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  faxNumber?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  logoUrl?: Maybe<Scalars['String']>,
  mail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  registerDate?: Maybe<Scalars['timestamptz']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Company_Max_Fields = {
   __typename?: 'Company_max_fields',
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  faxNumber?: Maybe<Scalars['String']>,
  locationID?: Maybe<Scalars['Int']>,
  logoUrl?: Maybe<Scalars['String']>,
  mail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  registerDate?: Maybe<Scalars['timestamptz']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Company_Max_Order_By = {
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  faxNumber?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  logoUrl?: Maybe<Order_By>,
  mail?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  registerDate?: Maybe<Order_By>,
  taxNumber?: Maybe<Order_By>,
};

export type Company_Min_Fields = {
   __typename?: 'Company_min_fields',
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  faxNumber?: Maybe<Scalars['String']>,
  locationID?: Maybe<Scalars['Int']>,
  logoUrl?: Maybe<Scalars['String']>,
  mail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  registerDate?: Maybe<Scalars['timestamptz']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Company_Min_Order_By = {
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  faxNumber?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  logoUrl?: Maybe<Order_By>,
  mail?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  registerDate?: Maybe<Order_By>,
  taxNumber?: Maybe<Order_By>,
};

export type Company_Mutation_Response = {
   __typename?: 'Company_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Company>,
};

export type Company_Obj_Rel_Insert_Input = {
  data: Company_Insert_Input,
  on_conflict?: Maybe<Company_On_Conflict>,
};

export type Company_On_Conflict = {
  constraint: Company_Constraint,
  update_columns: Array<Company_Update_Column>,
  where?: Maybe<Company_Bool_Exp>,
};

export type Company_Order_By = {
  ArchSites_aggregate?: Maybe<ArchSite_Aggregate_Order_By>,
  CompanyPhones_aggregate?: Maybe<CompanyPhone_Aggregate_Order_By>,
  CompanyUsers_aggregate?: Maybe<CompanyUser_Aggregate_Order_By>,
  Hotels_aggregate?: Maybe<Hotel_Aggregate_Order_By>,
  Location?: Maybe<Location_Order_By>,
  Museums_aggregate?: Maybe<Museum_Aggregate_Order_By>,
  Restaurants_aggregate?: Maybe<Restaurant_Aggregate_Order_By>,
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  faxNumber?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  logoUrl?: Maybe<Order_By>,
  mail?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  registerDate?: Maybe<Order_By>,
  taxNumber?: Maybe<Order_By>,
};

export enum Company_Select_Column {
  CompanyId = 'companyID',
  Description = 'description',
  FaxNumber = 'faxNumber',
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  LogoUrl = 'logoUrl',
  Mail = 'mail',
  Name = 'name',
  RegisterDate = 'registerDate',
  TaxNumber = 'taxNumber'
}

export type Company_Set_Input = {
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  faxNumber?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  logoUrl?: Maybe<Scalars['String']>,
  mail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  registerDate?: Maybe<Scalars['timestamptz']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Company_Stddev_Fields = {
   __typename?: 'Company_stddev_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type Company_Stddev_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type Company_Stddev_Pop_Fields = {
   __typename?: 'Company_stddev_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type Company_Stddev_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type Company_Stddev_Samp_Fields = {
   __typename?: 'Company_stddev_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type Company_Stddev_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type Company_Sum_Fields = {
   __typename?: 'Company_sum_fields',
  companyID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
};

export type Company_Sum_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export enum Company_Update_Column {
  CompanyId = 'companyID',
  Description = 'description',
  FaxNumber = 'faxNumber',
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  LogoUrl = 'logoUrl',
  Mail = 'mail',
  Name = 'name',
  RegisterDate = 'registerDate',
  TaxNumber = 'taxNumber'
}

export type Company_Var_Pop_Fields = {
   __typename?: 'Company_var_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type Company_Var_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type Company_Var_Samp_Fields = {
   __typename?: 'Company_var_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type Company_Var_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type Company_Variance_Fields = {
   __typename?: 'Company_variance_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
};

export type Company_Variance_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
};

export type CompanyContact = {
   __typename?: 'CompanyContact',
  CompanyUser: CompanyUser,
  authority: Scalars['String'],
  compantUserID: Scalars['Int'],
  companyContactID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
};

export type CompanyContact_Aggregate = {
   __typename?: 'CompanyContact_aggregate',
  aggregate?: Maybe<CompanyContact_Aggregate_Fields>,
  nodes: Array<CompanyContact>,
};

export type CompanyContact_Aggregate_Fields = {
   __typename?: 'CompanyContact_aggregate_fields',
  avg?: Maybe<CompanyContact_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<CompanyContact_Max_Fields>,
  min?: Maybe<CompanyContact_Min_Fields>,
  stddev?: Maybe<CompanyContact_Stddev_Fields>,
  stddev_pop?: Maybe<CompanyContact_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<CompanyContact_Stddev_Samp_Fields>,
  sum?: Maybe<CompanyContact_Sum_Fields>,
  var_pop?: Maybe<CompanyContact_Var_Pop_Fields>,
  var_samp?: Maybe<CompanyContact_Var_Samp_Fields>,
  variance?: Maybe<CompanyContact_Variance_Fields>,
};


export type CompanyContact_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<CompanyContact_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type CompanyContact_Aggregate_Order_By = {
  avg?: Maybe<CompanyContact_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<CompanyContact_Max_Order_By>,
  min?: Maybe<CompanyContact_Min_Order_By>,
  stddev?: Maybe<CompanyContact_Stddev_Order_By>,
  stddev_pop?: Maybe<CompanyContact_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<CompanyContact_Stddev_Samp_Order_By>,
  sum?: Maybe<CompanyContact_Sum_Order_By>,
  var_pop?: Maybe<CompanyContact_Var_Pop_Order_By>,
  var_samp?: Maybe<CompanyContact_Var_Samp_Order_By>,
  variance?: Maybe<CompanyContact_Variance_Order_By>,
};

export type CompanyContact_Arr_Rel_Insert_Input = {
  data: Array<CompanyContact_Insert_Input>,
  on_conflict?: Maybe<CompanyContact_On_Conflict>,
};

export type CompanyContact_Avg_Fields = {
   __typename?: 'CompanyContact_avg_fields',
  compantUserID?: Maybe<Scalars['Float']>,
  companyContactID?: Maybe<Scalars['Float']>,
};

export type CompanyContact_Avg_Order_By = {
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
};

export type CompanyContact_Bool_Exp = {
  CompanyUser?: Maybe<CompanyUser_Bool_Exp>,
  _and?: Maybe<Array<Maybe<CompanyContact_Bool_Exp>>>,
  _not?: Maybe<CompanyContact_Bool_Exp>,
  _or?: Maybe<Array<Maybe<CompanyContact_Bool_Exp>>>,
  authority?: Maybe<String_Comparison_Exp>,
  compantUserID?: Maybe<Int_Comparison_Exp>,
  companyContactID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
};

export enum CompanyContact_Constraint {
  CompanyContactPkey = 'CompanyContact_pkey'
}

export type CompanyContact_Inc_Input = {
  compantUserID?: Maybe<Scalars['Int']>,
  companyContactID?: Maybe<Scalars['Int']>,
};

export type CompanyContact_Insert_Input = {
  CompanyUser?: Maybe<CompanyUser_Obj_Rel_Insert_Input>,
  authority?: Maybe<Scalars['String']>,
  compantUserID?: Maybe<Scalars['Int']>,
  companyContactID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type CompanyContact_Max_Fields = {
   __typename?: 'CompanyContact_max_fields',
  authority?: Maybe<Scalars['String']>,
  compantUserID?: Maybe<Scalars['Int']>,
  companyContactID?: Maybe<Scalars['Int']>,
};

export type CompanyContact_Max_Order_By = {
  authority?: Maybe<Order_By>,
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
};

export type CompanyContact_Min_Fields = {
   __typename?: 'CompanyContact_min_fields',
  authority?: Maybe<Scalars['String']>,
  compantUserID?: Maybe<Scalars['Int']>,
  companyContactID?: Maybe<Scalars['Int']>,
};

export type CompanyContact_Min_Order_By = {
  authority?: Maybe<Order_By>,
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
};

export type CompanyContact_Mutation_Response = {
   __typename?: 'CompanyContact_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<CompanyContact>,
};

export type CompanyContact_Obj_Rel_Insert_Input = {
  data: CompanyContact_Insert_Input,
  on_conflict?: Maybe<CompanyContact_On_Conflict>,
};

export type CompanyContact_On_Conflict = {
  constraint: CompanyContact_Constraint,
  update_columns: Array<CompanyContact_Update_Column>,
  where?: Maybe<CompanyContact_Bool_Exp>,
};

export type CompanyContact_Order_By = {
  CompanyUser?: Maybe<CompanyUser_Order_By>,
  authority?: Maybe<Order_By>,
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
};

export enum CompanyContact_Select_Column {
  Authority = 'authority',
  CompantUserId = 'compantUserID',
  CompanyContactId = 'companyContactID',
  IsDeleted = 'isDeleted'
}

export type CompanyContact_Set_Input = {
  authority?: Maybe<Scalars['String']>,
  compantUserID?: Maybe<Scalars['Int']>,
  companyContactID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type CompanyContact_Stddev_Fields = {
   __typename?: 'CompanyContact_stddev_fields',
  compantUserID?: Maybe<Scalars['Float']>,
  companyContactID?: Maybe<Scalars['Float']>,
};

export type CompanyContact_Stddev_Order_By = {
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
};

export type CompanyContact_Stddev_Pop_Fields = {
   __typename?: 'CompanyContact_stddev_pop_fields',
  compantUserID?: Maybe<Scalars['Float']>,
  companyContactID?: Maybe<Scalars['Float']>,
};

export type CompanyContact_Stddev_Pop_Order_By = {
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
};

export type CompanyContact_Stddev_Samp_Fields = {
   __typename?: 'CompanyContact_stddev_samp_fields',
  compantUserID?: Maybe<Scalars['Float']>,
  companyContactID?: Maybe<Scalars['Float']>,
};

export type CompanyContact_Stddev_Samp_Order_By = {
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
};

export type CompanyContact_Sum_Fields = {
   __typename?: 'CompanyContact_sum_fields',
  compantUserID?: Maybe<Scalars['Int']>,
  companyContactID?: Maybe<Scalars['Int']>,
};

export type CompanyContact_Sum_Order_By = {
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
};

export enum CompanyContact_Update_Column {
  Authority = 'authority',
  CompantUserId = 'compantUserID',
  CompanyContactId = 'companyContactID',
  IsDeleted = 'isDeleted'
}

export type CompanyContact_Var_Pop_Fields = {
   __typename?: 'CompanyContact_var_pop_fields',
  compantUserID?: Maybe<Scalars['Float']>,
  companyContactID?: Maybe<Scalars['Float']>,
};

export type CompanyContact_Var_Pop_Order_By = {
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
};

export type CompanyContact_Var_Samp_Fields = {
   __typename?: 'CompanyContact_var_samp_fields',
  compantUserID?: Maybe<Scalars['Float']>,
  companyContactID?: Maybe<Scalars['Float']>,
};

export type CompanyContact_Var_Samp_Order_By = {
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
};

export type CompanyContact_Variance_Fields = {
   __typename?: 'CompanyContact_variance_fields',
  compantUserID?: Maybe<Scalars['Float']>,
  companyContactID?: Maybe<Scalars['Float']>,
};

export type CompanyContact_Variance_Order_By = {
  compantUserID?: Maybe<Order_By>,
  companyContactID?: Maybe<Order_By>,
};

export type CompanyPhone = {
   __typename?: 'CompanyPhone',
  Company: Company,
  Phone: Phone,
  companyID: Scalars['Int'],
  companyPhoneID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  phoneID: Scalars['Int'],
};

export type CompanyPhone_Aggregate = {
   __typename?: 'CompanyPhone_aggregate',
  aggregate?: Maybe<CompanyPhone_Aggregate_Fields>,
  nodes: Array<CompanyPhone>,
};

export type CompanyPhone_Aggregate_Fields = {
   __typename?: 'CompanyPhone_aggregate_fields',
  avg?: Maybe<CompanyPhone_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<CompanyPhone_Max_Fields>,
  min?: Maybe<CompanyPhone_Min_Fields>,
  stddev?: Maybe<CompanyPhone_Stddev_Fields>,
  stddev_pop?: Maybe<CompanyPhone_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<CompanyPhone_Stddev_Samp_Fields>,
  sum?: Maybe<CompanyPhone_Sum_Fields>,
  var_pop?: Maybe<CompanyPhone_Var_Pop_Fields>,
  var_samp?: Maybe<CompanyPhone_Var_Samp_Fields>,
  variance?: Maybe<CompanyPhone_Variance_Fields>,
};


export type CompanyPhone_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<CompanyPhone_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type CompanyPhone_Aggregate_Order_By = {
  avg?: Maybe<CompanyPhone_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<CompanyPhone_Max_Order_By>,
  min?: Maybe<CompanyPhone_Min_Order_By>,
  stddev?: Maybe<CompanyPhone_Stddev_Order_By>,
  stddev_pop?: Maybe<CompanyPhone_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<CompanyPhone_Stddev_Samp_Order_By>,
  sum?: Maybe<CompanyPhone_Sum_Order_By>,
  var_pop?: Maybe<CompanyPhone_Var_Pop_Order_By>,
  var_samp?: Maybe<CompanyPhone_Var_Samp_Order_By>,
  variance?: Maybe<CompanyPhone_Variance_Order_By>,
};

export type CompanyPhone_Arr_Rel_Insert_Input = {
  data: Array<CompanyPhone_Insert_Input>,
  on_conflict?: Maybe<CompanyPhone_On_Conflict>,
};

export type CompanyPhone_Avg_Fields = {
   __typename?: 'CompanyPhone_avg_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyPhoneID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
};

export type CompanyPhone_Avg_Order_By = {
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type CompanyPhone_Bool_Exp = {
  Company?: Maybe<Company_Bool_Exp>,
  Phone?: Maybe<Phone_Bool_Exp>,
  _and?: Maybe<Array<Maybe<CompanyPhone_Bool_Exp>>>,
  _not?: Maybe<CompanyPhone_Bool_Exp>,
  _or?: Maybe<Array<Maybe<CompanyPhone_Bool_Exp>>>,
  companyID?: Maybe<Int_Comparison_Exp>,
  companyPhoneID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  phoneID?: Maybe<Int_Comparison_Exp>,
};

export enum CompanyPhone_Constraint {
  CompanyPhonePkey = 'CompanyPhone_pkey'
}

export type CompanyPhone_Inc_Input = {
  companyID?: Maybe<Scalars['Int']>,
  companyPhoneID?: Maybe<Scalars['Int']>,
  phoneID?: Maybe<Scalars['Int']>,
};

export type CompanyPhone_Insert_Input = {
  Company?: Maybe<Company_Obj_Rel_Insert_Input>,
  Phone?: Maybe<Phone_Obj_Rel_Insert_Input>,
  companyID?: Maybe<Scalars['Int']>,
  companyPhoneID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  phoneID?: Maybe<Scalars['Int']>,
};

export type CompanyPhone_Max_Fields = {
   __typename?: 'CompanyPhone_max_fields',
  companyID?: Maybe<Scalars['Int']>,
  companyPhoneID?: Maybe<Scalars['Int']>,
  phoneID?: Maybe<Scalars['Int']>,
};

export type CompanyPhone_Max_Order_By = {
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type CompanyPhone_Min_Fields = {
   __typename?: 'CompanyPhone_min_fields',
  companyID?: Maybe<Scalars['Int']>,
  companyPhoneID?: Maybe<Scalars['Int']>,
  phoneID?: Maybe<Scalars['Int']>,
};

export type CompanyPhone_Min_Order_By = {
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type CompanyPhone_Mutation_Response = {
   __typename?: 'CompanyPhone_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<CompanyPhone>,
};

export type CompanyPhone_Obj_Rel_Insert_Input = {
  data: CompanyPhone_Insert_Input,
  on_conflict?: Maybe<CompanyPhone_On_Conflict>,
};

export type CompanyPhone_On_Conflict = {
  constraint: CompanyPhone_Constraint,
  update_columns: Array<CompanyPhone_Update_Column>,
  where?: Maybe<CompanyPhone_Bool_Exp>,
};

export type CompanyPhone_Order_By = {
  Company?: Maybe<Company_Order_By>,
  Phone?: Maybe<Phone_Order_By>,
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export enum CompanyPhone_Select_Column {
  CompanyId = 'companyID',
  CompanyPhoneId = 'companyPhoneID',
  IsDeleted = 'isDeleted',
  PhoneId = 'phoneID'
}

export type CompanyPhone_Set_Input = {
  companyID?: Maybe<Scalars['Int']>,
  companyPhoneID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  phoneID?: Maybe<Scalars['Int']>,
};

export type CompanyPhone_Stddev_Fields = {
   __typename?: 'CompanyPhone_stddev_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyPhoneID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
};

export type CompanyPhone_Stddev_Order_By = {
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type CompanyPhone_Stddev_Pop_Fields = {
   __typename?: 'CompanyPhone_stddev_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyPhoneID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
};

export type CompanyPhone_Stddev_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type CompanyPhone_Stddev_Samp_Fields = {
   __typename?: 'CompanyPhone_stddev_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyPhoneID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
};

export type CompanyPhone_Stddev_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type CompanyPhone_Sum_Fields = {
   __typename?: 'CompanyPhone_sum_fields',
  companyID?: Maybe<Scalars['Int']>,
  companyPhoneID?: Maybe<Scalars['Int']>,
  phoneID?: Maybe<Scalars['Int']>,
};

export type CompanyPhone_Sum_Order_By = {
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export enum CompanyPhone_Update_Column {
  CompanyId = 'companyID',
  CompanyPhoneId = 'companyPhoneID',
  IsDeleted = 'isDeleted',
  PhoneId = 'phoneID'
}

export type CompanyPhone_Var_Pop_Fields = {
   __typename?: 'CompanyPhone_var_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyPhoneID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
};

export type CompanyPhone_Var_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type CompanyPhone_Var_Samp_Fields = {
   __typename?: 'CompanyPhone_var_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyPhoneID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
};

export type CompanyPhone_Var_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type CompanyPhone_Variance_Fields = {
   __typename?: 'CompanyPhone_variance_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyPhoneID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
};

export type CompanyPhone_Variance_Order_By = {
  companyID?: Maybe<Order_By>,
  companyPhoneID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type CompanyUser = {
   __typename?: 'CompanyUser',
  Company: Company,
  CompanyContacts: Array<CompanyContact>,
  CompanyContacts_aggregate: CompanyContact_Aggregate,
  User: User,
  companyID: Scalars['Int'],
  companyUserID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  userID: Scalars['Int'],
};


export type CompanyUserCompanyContactsArgs = {
  distinct_on?: Maybe<Array<CompanyContact_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyContact_Order_By>>,
  where?: Maybe<CompanyContact_Bool_Exp>
};


export type CompanyUserCompanyContacts_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyContact_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyContact_Order_By>>,
  where?: Maybe<CompanyContact_Bool_Exp>
};

export type CompanyUser_Aggregate = {
   __typename?: 'CompanyUser_aggregate',
  aggregate?: Maybe<CompanyUser_Aggregate_Fields>,
  nodes: Array<CompanyUser>,
};

export type CompanyUser_Aggregate_Fields = {
   __typename?: 'CompanyUser_aggregate_fields',
  avg?: Maybe<CompanyUser_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<CompanyUser_Max_Fields>,
  min?: Maybe<CompanyUser_Min_Fields>,
  stddev?: Maybe<CompanyUser_Stddev_Fields>,
  stddev_pop?: Maybe<CompanyUser_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<CompanyUser_Stddev_Samp_Fields>,
  sum?: Maybe<CompanyUser_Sum_Fields>,
  var_pop?: Maybe<CompanyUser_Var_Pop_Fields>,
  var_samp?: Maybe<CompanyUser_Var_Samp_Fields>,
  variance?: Maybe<CompanyUser_Variance_Fields>,
};


export type CompanyUser_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<CompanyUser_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type CompanyUser_Aggregate_Order_By = {
  avg?: Maybe<CompanyUser_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<CompanyUser_Max_Order_By>,
  min?: Maybe<CompanyUser_Min_Order_By>,
  stddev?: Maybe<CompanyUser_Stddev_Order_By>,
  stddev_pop?: Maybe<CompanyUser_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<CompanyUser_Stddev_Samp_Order_By>,
  sum?: Maybe<CompanyUser_Sum_Order_By>,
  var_pop?: Maybe<CompanyUser_Var_Pop_Order_By>,
  var_samp?: Maybe<CompanyUser_Var_Samp_Order_By>,
  variance?: Maybe<CompanyUser_Variance_Order_By>,
};

export type CompanyUser_Arr_Rel_Insert_Input = {
  data: Array<CompanyUser_Insert_Input>,
  on_conflict?: Maybe<CompanyUser_On_Conflict>,
};

export type CompanyUser_Avg_Fields = {
   __typename?: 'CompanyUser_avg_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type CompanyUser_Avg_Order_By = {
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type CompanyUser_Bool_Exp = {
  Company?: Maybe<Company_Bool_Exp>,
  CompanyContacts?: Maybe<CompanyContact_Bool_Exp>,
  User?: Maybe<User_Bool_Exp>,
  _and?: Maybe<Array<Maybe<CompanyUser_Bool_Exp>>>,
  _not?: Maybe<CompanyUser_Bool_Exp>,
  _or?: Maybe<Array<Maybe<CompanyUser_Bool_Exp>>>,
  companyID?: Maybe<Int_Comparison_Exp>,
  companyUserID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  userID?: Maybe<Int_Comparison_Exp>,
};

export enum CompanyUser_Constraint {
  CompanyUserPkey = 'CompanyUser_pkey'
}

export type CompanyUser_Inc_Input = {
  companyID?: Maybe<Scalars['Int']>,
  companyUserID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type CompanyUser_Insert_Input = {
  Company?: Maybe<Company_Obj_Rel_Insert_Input>,
  CompanyContacts?: Maybe<CompanyContact_Arr_Rel_Insert_Input>,
  User?: Maybe<User_Obj_Rel_Insert_Input>,
  companyID?: Maybe<Scalars['Int']>,
  companyUserID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  userID?: Maybe<Scalars['Int']>,
};

export type CompanyUser_Max_Fields = {
   __typename?: 'CompanyUser_max_fields',
  companyID?: Maybe<Scalars['Int']>,
  companyUserID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type CompanyUser_Max_Order_By = {
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type CompanyUser_Min_Fields = {
   __typename?: 'CompanyUser_min_fields',
  companyID?: Maybe<Scalars['Int']>,
  companyUserID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type CompanyUser_Min_Order_By = {
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type CompanyUser_Mutation_Response = {
   __typename?: 'CompanyUser_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<CompanyUser>,
};

export type CompanyUser_Obj_Rel_Insert_Input = {
  data: CompanyUser_Insert_Input,
  on_conflict?: Maybe<CompanyUser_On_Conflict>,
};

export type CompanyUser_On_Conflict = {
  constraint: CompanyUser_Constraint,
  update_columns: Array<CompanyUser_Update_Column>,
  where?: Maybe<CompanyUser_Bool_Exp>,
};

export type CompanyUser_Order_By = {
  Company?: Maybe<Company_Order_By>,
  CompanyContacts_aggregate?: Maybe<CompanyContact_Aggregate_Order_By>,
  User?: Maybe<User_Order_By>,
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum CompanyUser_Select_Column {
  CompanyId = 'companyID',
  CompanyUserId = 'companyUserID',
  IsDeleted = 'isDeleted',
  UserId = 'userID'
}

export type CompanyUser_Set_Input = {
  companyID?: Maybe<Scalars['Int']>,
  companyUserID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  userID?: Maybe<Scalars['Int']>,
};

export type CompanyUser_Stddev_Fields = {
   __typename?: 'CompanyUser_stddev_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type CompanyUser_Stddev_Order_By = {
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type CompanyUser_Stddev_Pop_Fields = {
   __typename?: 'CompanyUser_stddev_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type CompanyUser_Stddev_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type CompanyUser_Stddev_Samp_Fields = {
   __typename?: 'CompanyUser_stddev_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type CompanyUser_Stddev_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type CompanyUser_Sum_Fields = {
   __typename?: 'CompanyUser_sum_fields',
  companyID?: Maybe<Scalars['Int']>,
  companyUserID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type CompanyUser_Sum_Order_By = {
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum CompanyUser_Update_Column {
  CompanyId = 'companyID',
  CompanyUserId = 'companyUserID',
  IsDeleted = 'isDeleted',
  UserId = 'userID'
}

export type CompanyUser_Var_Pop_Fields = {
   __typename?: 'CompanyUser_var_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type CompanyUser_Var_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type CompanyUser_Var_Samp_Fields = {
   __typename?: 'CompanyUser_var_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type CompanyUser_Var_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type CompanyUser_Variance_Fields = {
   __typename?: 'CompanyUser_variance_fields',
  companyID?: Maybe<Scalars['Float']>,
  companyUserID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type CompanyUser_Variance_Order_By = {
  companyID?: Maybe<Order_By>,
  companyUserID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type Country = {
   __typename?: 'Country',
  Cities: Array<City>,
  Cities_aggregate: City_Aggregate,
  country: Scalars['String'],
  countryID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
};


export type CountryCitiesArgs = {
  distinct_on?: Maybe<Array<City_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<City_Order_By>>,
  where?: Maybe<City_Bool_Exp>
};


export type CountryCities_AggregateArgs = {
  distinct_on?: Maybe<Array<City_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<City_Order_By>>,
  where?: Maybe<City_Bool_Exp>
};

export type Country_Aggregate = {
   __typename?: 'Country_aggregate',
  aggregate?: Maybe<Country_Aggregate_Fields>,
  nodes: Array<Country>,
};

export type Country_Aggregate_Fields = {
   __typename?: 'Country_aggregate_fields',
  avg?: Maybe<Country_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Country_Max_Fields>,
  min?: Maybe<Country_Min_Fields>,
  stddev?: Maybe<Country_Stddev_Fields>,
  stddev_pop?: Maybe<Country_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Country_Stddev_Samp_Fields>,
  sum?: Maybe<Country_Sum_Fields>,
  var_pop?: Maybe<Country_Var_Pop_Fields>,
  var_samp?: Maybe<Country_Var_Samp_Fields>,
  variance?: Maybe<Country_Variance_Fields>,
};


export type Country_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Country_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Country_Aggregate_Order_By = {
  avg?: Maybe<Country_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Country_Max_Order_By>,
  min?: Maybe<Country_Min_Order_By>,
  stddev?: Maybe<Country_Stddev_Order_By>,
  stddev_pop?: Maybe<Country_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Country_Stddev_Samp_Order_By>,
  sum?: Maybe<Country_Sum_Order_By>,
  var_pop?: Maybe<Country_Var_Pop_Order_By>,
  var_samp?: Maybe<Country_Var_Samp_Order_By>,
  variance?: Maybe<Country_Variance_Order_By>,
};

export type Country_Arr_Rel_Insert_Input = {
  data: Array<Country_Insert_Input>,
  on_conflict?: Maybe<Country_On_Conflict>,
};

export type Country_Avg_Fields = {
   __typename?: 'Country_avg_fields',
  countryID?: Maybe<Scalars['Float']>,
};

export type Country_Avg_Order_By = {
  countryID?: Maybe<Order_By>,
};

export type Country_Bool_Exp = {
  Cities?: Maybe<City_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Country_Bool_Exp>>>,
  _not?: Maybe<Country_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Country_Bool_Exp>>>,
  country?: Maybe<String_Comparison_Exp>,
  countryID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
};

export enum Country_Constraint {
  CountryPkey = 'Country_pkey'
}

export type Country_Inc_Input = {
  countryID?: Maybe<Scalars['Int']>,
};

export type Country_Insert_Input = {
  Cities?: Maybe<City_Arr_Rel_Insert_Input>,
  country?: Maybe<Scalars['String']>,
  countryID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type Country_Max_Fields = {
   __typename?: 'Country_max_fields',
  country?: Maybe<Scalars['String']>,
  countryID?: Maybe<Scalars['Int']>,
};

export type Country_Max_Order_By = {
  country?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type Country_Min_Fields = {
   __typename?: 'Country_min_fields',
  country?: Maybe<Scalars['String']>,
  countryID?: Maybe<Scalars['Int']>,
};

export type Country_Min_Order_By = {
  country?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
};

export type Country_Mutation_Response = {
   __typename?: 'Country_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Country>,
};

export type Country_Obj_Rel_Insert_Input = {
  data: Country_Insert_Input,
  on_conflict?: Maybe<Country_On_Conflict>,
};

export type Country_On_Conflict = {
  constraint: Country_Constraint,
  update_columns: Array<Country_Update_Column>,
  where?: Maybe<Country_Bool_Exp>,
};

export type Country_Order_By = {
  Cities_aggregate?: Maybe<City_Aggregate_Order_By>,
  country?: Maybe<Order_By>,
  countryID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
};

export enum Country_Select_Column {
  Country = 'country',
  CountryId = 'countryID',
  IsDeleted = 'isDeleted'
}

export type Country_Set_Input = {
  country?: Maybe<Scalars['String']>,
  countryID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type Country_Stddev_Fields = {
   __typename?: 'Country_stddev_fields',
  countryID?: Maybe<Scalars['Float']>,
};

export type Country_Stddev_Order_By = {
  countryID?: Maybe<Order_By>,
};

export type Country_Stddev_Pop_Fields = {
   __typename?: 'Country_stddev_pop_fields',
  countryID?: Maybe<Scalars['Float']>,
};

export type Country_Stddev_Pop_Order_By = {
  countryID?: Maybe<Order_By>,
};

export type Country_Stddev_Samp_Fields = {
   __typename?: 'Country_stddev_samp_fields',
  countryID?: Maybe<Scalars['Float']>,
};

export type Country_Stddev_Samp_Order_By = {
  countryID?: Maybe<Order_By>,
};

export type Country_Sum_Fields = {
   __typename?: 'Country_sum_fields',
  countryID?: Maybe<Scalars['Int']>,
};

export type Country_Sum_Order_By = {
  countryID?: Maybe<Order_By>,
};

export enum Country_Update_Column {
  Country = 'country',
  CountryId = 'countryID',
  IsDeleted = 'isDeleted'
}

export type Country_Var_Pop_Fields = {
   __typename?: 'Country_var_pop_fields',
  countryID?: Maybe<Scalars['Float']>,
};

export type Country_Var_Pop_Order_By = {
  countryID?: Maybe<Order_By>,
};

export type Country_Var_Samp_Fields = {
   __typename?: 'Country_var_samp_fields',
  countryID?: Maybe<Scalars['Float']>,
};

export type Country_Var_Samp_Order_By = {
  countryID?: Maybe<Order_By>,
};

export type Country_Variance_Fields = {
   __typename?: 'Country_variance_fields',
  countryID?: Maybe<Scalars['Float']>,
};

export type Country_Variance_Order_By = {
  countryID?: Maybe<Order_By>,
};


export type Date_Comparison_Exp = {
  _eq?: Maybe<Scalars['date']>,
  _gt?: Maybe<Scalars['date']>,
  _gte?: Maybe<Scalars['date']>,
  _in?: Maybe<Array<Scalars['date']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['date']>,
  _lte?: Maybe<Scalars['date']>,
  _neq?: Maybe<Scalars['date']>,
  _nin?: Maybe<Array<Scalars['date']>>,
};

export type Day = {
   __typename?: 'Day',
  ArchSiteWorkingDays: Array<ArchSiteWorkingDay>,
  ArchSiteWorkingDays_aggregate: ArchSiteWorkingDay_Aggregate,
  MuseumWorkingDays: Array<MuseumWorkingDay>,
  MuseumWorkingDays_aggregate: MuseumWorkingDay_Aggregate,
  RestaurantWorkingDays: Array<RestaurantWorkingDay>,
  RestaurantWorkingDays_aggregate: RestaurantWorkingDay_Aggregate,
  dayID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  name: Scalars['String'],
};


export type DayArchSiteWorkingDaysArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDay_Order_By>>,
  where?: Maybe<ArchSiteWorkingDay_Bool_Exp>
};


export type DayArchSiteWorkingDays_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDay_Order_By>>,
  where?: Maybe<ArchSiteWorkingDay_Bool_Exp>
};


export type DayMuseumWorkingDaysArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDay_Order_By>>,
  where?: Maybe<MuseumWorkingDay_Bool_Exp>
};


export type DayMuseumWorkingDays_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDay_Order_By>>,
  where?: Maybe<MuseumWorkingDay_Bool_Exp>
};


export type DayRestaurantWorkingDaysArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDay_Order_By>>,
  where?: Maybe<RestaurantWorkingDay_Bool_Exp>
};


export type DayRestaurantWorkingDays_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDay_Order_By>>,
  where?: Maybe<RestaurantWorkingDay_Bool_Exp>
};

export type Day_Aggregate = {
   __typename?: 'Day_aggregate',
  aggregate?: Maybe<Day_Aggregate_Fields>,
  nodes: Array<Day>,
};

export type Day_Aggregate_Fields = {
   __typename?: 'Day_aggregate_fields',
  avg?: Maybe<Day_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Day_Max_Fields>,
  min?: Maybe<Day_Min_Fields>,
  stddev?: Maybe<Day_Stddev_Fields>,
  stddev_pop?: Maybe<Day_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Day_Stddev_Samp_Fields>,
  sum?: Maybe<Day_Sum_Fields>,
  var_pop?: Maybe<Day_Var_Pop_Fields>,
  var_samp?: Maybe<Day_Var_Samp_Fields>,
  variance?: Maybe<Day_Variance_Fields>,
};


export type Day_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Day_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Day_Aggregate_Order_By = {
  avg?: Maybe<Day_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Day_Max_Order_By>,
  min?: Maybe<Day_Min_Order_By>,
  stddev?: Maybe<Day_Stddev_Order_By>,
  stddev_pop?: Maybe<Day_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Day_Stddev_Samp_Order_By>,
  sum?: Maybe<Day_Sum_Order_By>,
  var_pop?: Maybe<Day_Var_Pop_Order_By>,
  var_samp?: Maybe<Day_Var_Samp_Order_By>,
  variance?: Maybe<Day_Variance_Order_By>,
};

export type Day_Arr_Rel_Insert_Input = {
  data: Array<Day_Insert_Input>,
  on_conflict?: Maybe<Day_On_Conflict>,
};

export type Day_Avg_Fields = {
   __typename?: 'Day_avg_fields',
  dayID?: Maybe<Scalars['Float']>,
};

export type Day_Avg_Order_By = {
  dayID?: Maybe<Order_By>,
};

export type Day_Bool_Exp = {
  ArchSiteWorkingDays?: Maybe<ArchSiteWorkingDay_Bool_Exp>,
  MuseumWorkingDays?: Maybe<MuseumWorkingDay_Bool_Exp>,
  RestaurantWorkingDays?: Maybe<RestaurantWorkingDay_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Day_Bool_Exp>>>,
  _not?: Maybe<Day_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Day_Bool_Exp>>>,
  dayID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
};

export enum Day_Constraint {
  DayPkey = 'Day_pkey'
}

export type Day_Inc_Input = {
  dayID?: Maybe<Scalars['Int']>,
};

export type Day_Insert_Input = {
  ArchSiteWorkingDays?: Maybe<ArchSiteWorkingDay_Arr_Rel_Insert_Input>,
  MuseumWorkingDays?: Maybe<MuseumWorkingDay_Arr_Rel_Insert_Input>,
  RestaurantWorkingDays?: Maybe<RestaurantWorkingDay_Arr_Rel_Insert_Input>,
  dayID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
};

export type Day_Max_Fields = {
   __typename?: 'Day_max_fields',
  dayID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type Day_Max_Order_By = {
  dayID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

export type Day_Min_Fields = {
   __typename?: 'Day_min_fields',
  dayID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type Day_Min_Order_By = {
  dayID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

export type Day_Mutation_Response = {
   __typename?: 'Day_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Day>,
};

export type Day_Obj_Rel_Insert_Input = {
  data: Day_Insert_Input,
  on_conflict?: Maybe<Day_On_Conflict>,
};

export type Day_On_Conflict = {
  constraint: Day_Constraint,
  update_columns: Array<Day_Update_Column>,
  where?: Maybe<Day_Bool_Exp>,
};

export type Day_Order_By = {
  ArchSiteWorkingDays_aggregate?: Maybe<ArchSiteWorkingDay_Aggregate_Order_By>,
  MuseumWorkingDays_aggregate?: Maybe<MuseumWorkingDay_Aggregate_Order_By>,
  RestaurantWorkingDays_aggregate?: Maybe<RestaurantWorkingDay_Aggregate_Order_By>,
  dayID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

export enum Day_Select_Column {
  DayId = 'dayID',
  IsDeleted = 'isDeleted',
  Name = 'name'
}

export type Day_Set_Input = {
  dayID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
};

export type Day_Stddev_Fields = {
   __typename?: 'Day_stddev_fields',
  dayID?: Maybe<Scalars['Float']>,
};

export type Day_Stddev_Order_By = {
  dayID?: Maybe<Order_By>,
};

export type Day_Stddev_Pop_Fields = {
   __typename?: 'Day_stddev_pop_fields',
  dayID?: Maybe<Scalars['Float']>,
};

export type Day_Stddev_Pop_Order_By = {
  dayID?: Maybe<Order_By>,
};

export type Day_Stddev_Samp_Fields = {
   __typename?: 'Day_stddev_samp_fields',
  dayID?: Maybe<Scalars['Float']>,
};

export type Day_Stddev_Samp_Order_By = {
  dayID?: Maybe<Order_By>,
};

export type Day_Sum_Fields = {
   __typename?: 'Day_sum_fields',
  dayID?: Maybe<Scalars['Int']>,
};

export type Day_Sum_Order_By = {
  dayID?: Maybe<Order_By>,
};

export enum Day_Update_Column {
  DayId = 'dayID',
  IsDeleted = 'isDeleted',
  Name = 'name'
}

export type Day_Var_Pop_Fields = {
   __typename?: 'Day_var_pop_fields',
  dayID?: Maybe<Scalars['Float']>,
};

export type Day_Var_Pop_Order_By = {
  dayID?: Maybe<Order_By>,
};

export type Day_Var_Samp_Fields = {
   __typename?: 'Day_var_samp_fields',
  dayID?: Maybe<Scalars['Float']>,
};

export type Day_Var_Samp_Order_By = {
  dayID?: Maybe<Order_By>,
};

export type Day_Variance_Fields = {
   __typename?: 'Day_variance_fields',
  dayID?: Maybe<Scalars['Float']>,
};

export type Day_Variance_Order_By = {
  dayID?: Maybe<Order_By>,
};

export type District = {
   __typename?: 'District',
  Addresses: Array<Address>,
  Addresses_aggregate: Address_Aggregate,
  City: City,
  cityID: Scalars['Int'],
  district: Scalars['String'],
  districtID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
};


export type DistrictAddressesArgs = {
  distinct_on?: Maybe<Array<Address_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Address_Order_By>>,
  where?: Maybe<Address_Bool_Exp>
};


export type DistrictAddresses_AggregateArgs = {
  distinct_on?: Maybe<Array<Address_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Address_Order_By>>,
  where?: Maybe<Address_Bool_Exp>
};

export type District_Aggregate = {
   __typename?: 'District_aggregate',
  aggregate?: Maybe<District_Aggregate_Fields>,
  nodes: Array<District>,
};

export type District_Aggregate_Fields = {
   __typename?: 'District_aggregate_fields',
  avg?: Maybe<District_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<District_Max_Fields>,
  min?: Maybe<District_Min_Fields>,
  stddev?: Maybe<District_Stddev_Fields>,
  stddev_pop?: Maybe<District_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<District_Stddev_Samp_Fields>,
  sum?: Maybe<District_Sum_Fields>,
  var_pop?: Maybe<District_Var_Pop_Fields>,
  var_samp?: Maybe<District_Var_Samp_Fields>,
  variance?: Maybe<District_Variance_Fields>,
};


export type District_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<District_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type District_Aggregate_Order_By = {
  avg?: Maybe<District_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<District_Max_Order_By>,
  min?: Maybe<District_Min_Order_By>,
  stddev?: Maybe<District_Stddev_Order_By>,
  stddev_pop?: Maybe<District_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<District_Stddev_Samp_Order_By>,
  sum?: Maybe<District_Sum_Order_By>,
  var_pop?: Maybe<District_Var_Pop_Order_By>,
  var_samp?: Maybe<District_Var_Samp_Order_By>,
  variance?: Maybe<District_Variance_Order_By>,
};

export type District_Arr_Rel_Insert_Input = {
  data: Array<District_Insert_Input>,
  on_conflict?: Maybe<District_On_Conflict>,
};

export type District_Avg_Fields = {
   __typename?: 'District_avg_fields',
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type District_Avg_Order_By = {
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type District_Bool_Exp = {
  Addresses?: Maybe<Address_Bool_Exp>,
  City?: Maybe<City_Bool_Exp>,
  _and?: Maybe<Array<Maybe<District_Bool_Exp>>>,
  _not?: Maybe<District_Bool_Exp>,
  _or?: Maybe<Array<Maybe<District_Bool_Exp>>>,
  cityID?: Maybe<Int_Comparison_Exp>,
  district?: Maybe<String_Comparison_Exp>,
  districtID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
};

export enum District_Constraint {
  DistrictPkey = 'District_pkey'
}

export type District_Inc_Input = {
  cityID?: Maybe<Scalars['Int']>,
  districtID?: Maybe<Scalars['Int']>,
};

export type District_Insert_Input = {
  Addresses?: Maybe<Address_Arr_Rel_Insert_Input>,
  City?: Maybe<City_Obj_Rel_Insert_Input>,
  cityID?: Maybe<Scalars['Int']>,
  district?: Maybe<Scalars['String']>,
  districtID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type District_Max_Fields = {
   __typename?: 'District_max_fields',
  cityID?: Maybe<Scalars['Int']>,
  district?: Maybe<Scalars['String']>,
  districtID?: Maybe<Scalars['Int']>,
};

export type District_Max_Order_By = {
  cityID?: Maybe<Order_By>,
  district?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type District_Min_Fields = {
   __typename?: 'District_min_fields',
  cityID?: Maybe<Scalars['Int']>,
  district?: Maybe<Scalars['String']>,
  districtID?: Maybe<Scalars['Int']>,
};

export type District_Min_Order_By = {
  cityID?: Maybe<Order_By>,
  district?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type District_Mutation_Response = {
   __typename?: 'District_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<District>,
};

export type District_Obj_Rel_Insert_Input = {
  data: District_Insert_Input,
  on_conflict?: Maybe<District_On_Conflict>,
};

export type District_On_Conflict = {
  constraint: District_Constraint,
  update_columns: Array<District_Update_Column>,
  where?: Maybe<District_Bool_Exp>,
};

export type District_Order_By = {
  Addresses_aggregate?: Maybe<Address_Aggregate_Order_By>,
  City?: Maybe<City_Order_By>,
  cityID?: Maybe<Order_By>,
  district?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
};

export enum District_Select_Column {
  CityId = 'cityID',
  District = 'district',
  DistrictId = 'districtID',
  IsDeleted = 'isDeleted'
}

export type District_Set_Input = {
  cityID?: Maybe<Scalars['Int']>,
  district?: Maybe<Scalars['String']>,
  districtID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type District_Stddev_Fields = {
   __typename?: 'District_stddev_fields',
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type District_Stddev_Order_By = {
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type District_Stddev_Pop_Fields = {
   __typename?: 'District_stddev_pop_fields',
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type District_Stddev_Pop_Order_By = {
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type District_Stddev_Samp_Fields = {
   __typename?: 'District_stddev_samp_fields',
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type District_Stddev_Samp_Order_By = {
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type District_Sum_Fields = {
   __typename?: 'District_sum_fields',
  cityID?: Maybe<Scalars['Int']>,
  districtID?: Maybe<Scalars['Int']>,
};

export type District_Sum_Order_By = {
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export enum District_Update_Column {
  CityId = 'cityID',
  District = 'district',
  DistrictId = 'districtID',
  IsDeleted = 'isDeleted'
}

export type District_Var_Pop_Fields = {
   __typename?: 'District_var_pop_fields',
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type District_Var_Pop_Order_By = {
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type District_Var_Samp_Fields = {
   __typename?: 'District_var_samp_fields',
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type District_Var_Samp_Order_By = {
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type District_Variance_Fields = {
   __typename?: 'District_variance_fields',
  cityID?: Maybe<Scalars['Float']>,
  districtID?: Maybe<Scalars['Float']>,
};

export type District_Variance_Order_By = {
  cityID?: Maybe<Order_By>,
  districtID?: Maybe<Order_By>,
};

export type Float_Comparison_Exp = {
  _eq?: Maybe<Scalars['Float']>,
  _gt?: Maybe<Scalars['Float']>,
  _gte?: Maybe<Scalars['Float']>,
  _in?: Maybe<Array<Scalars['Float']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['Float']>,
  _lte?: Maybe<Scalars['Float']>,
  _neq?: Maybe<Scalars['Float']>,
  _nin?: Maybe<Array<Scalars['Float']>>,
};

export type Hotel = {
   __typename?: 'Hotel',
  Company: Company,
  HotelComments: Array<HotelComment>,
  HotelComments_aggregate: HotelComment_Aggregate,
  HotelRooms: Array<HotelRoom>,
  HotelRooms_aggregate: HotelRoom_Aggregate,
  HotelServices: Array<HotelService>,
  HotelServices_aggregate: HotelService_Aggregate,
  Location: Location,
  TravelGuideHotels: Array<TravelGuideHotel>,
  TravelGuideHotels_aggregate: TravelGuideHotel_Aggregate,
  companyID: Scalars['Int'],
  description?: Maybe<Scalars['String']>,
  hotelID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  locationID: Scalars['Int'],
  name: Scalars['String'],
  star?: Maybe<Scalars['Float']>,
  taxNumber: Scalars['String'],
};


export type HotelHotelCommentsArgs = {
  distinct_on?: Maybe<Array<HotelComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelComment_Order_By>>,
  where?: Maybe<HotelComment_Bool_Exp>
};


export type HotelHotelComments_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelComment_Order_By>>,
  where?: Maybe<HotelComment_Bool_Exp>
};


export type HotelHotelRoomsArgs = {
  distinct_on?: Maybe<Array<HotelRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelRoom_Order_By>>,
  where?: Maybe<HotelRoom_Bool_Exp>
};


export type HotelHotelRooms_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelRoom_Order_By>>,
  where?: Maybe<HotelRoom_Bool_Exp>
};


export type HotelHotelServicesArgs = {
  distinct_on?: Maybe<Array<HotelService_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelService_Order_By>>,
  where?: Maybe<HotelService_Bool_Exp>
};


export type HotelHotelServices_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelService_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelService_Order_By>>,
  where?: Maybe<HotelService_Bool_Exp>
};


export type HotelTravelGuideHotelsArgs = {
  distinct_on?: Maybe<Array<TravelGuideHotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideHotel_Order_By>>,
  where?: Maybe<TravelGuideHotel_Bool_Exp>
};


export type HotelTravelGuideHotels_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideHotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideHotel_Order_By>>,
  where?: Maybe<TravelGuideHotel_Bool_Exp>
};

export type Hotel_Aggregate = {
   __typename?: 'Hotel_aggregate',
  aggregate?: Maybe<Hotel_Aggregate_Fields>,
  nodes: Array<Hotel>,
};

export type Hotel_Aggregate_Fields = {
   __typename?: 'Hotel_aggregate_fields',
  avg?: Maybe<Hotel_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Hotel_Max_Fields>,
  min?: Maybe<Hotel_Min_Fields>,
  stddev?: Maybe<Hotel_Stddev_Fields>,
  stddev_pop?: Maybe<Hotel_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Hotel_Stddev_Samp_Fields>,
  sum?: Maybe<Hotel_Sum_Fields>,
  var_pop?: Maybe<Hotel_Var_Pop_Fields>,
  var_samp?: Maybe<Hotel_Var_Samp_Fields>,
  variance?: Maybe<Hotel_Variance_Fields>,
};


export type Hotel_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Hotel_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Hotel_Aggregate_Order_By = {
  avg?: Maybe<Hotel_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Hotel_Max_Order_By>,
  min?: Maybe<Hotel_Min_Order_By>,
  stddev?: Maybe<Hotel_Stddev_Order_By>,
  stddev_pop?: Maybe<Hotel_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Hotel_Stddev_Samp_Order_By>,
  sum?: Maybe<Hotel_Sum_Order_By>,
  var_pop?: Maybe<Hotel_Var_Pop_Order_By>,
  var_samp?: Maybe<Hotel_Var_Samp_Order_By>,
  variance?: Maybe<Hotel_Variance_Order_By>,
};

export type Hotel_Arr_Rel_Insert_Input = {
  data: Array<Hotel_Insert_Input>,
  on_conflict?: Maybe<Hotel_On_Conflict>,
};

export type Hotel_Avg_Fields = {
   __typename?: 'Hotel_avg_fields',
  companyID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Hotel_Avg_Order_By = {
  companyID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Hotel_Bool_Exp = {
  Company?: Maybe<Company_Bool_Exp>,
  HotelComments?: Maybe<HotelComment_Bool_Exp>,
  HotelRooms?: Maybe<HotelRoom_Bool_Exp>,
  HotelServices?: Maybe<HotelService_Bool_Exp>,
  Location?: Maybe<Location_Bool_Exp>,
  TravelGuideHotels?: Maybe<TravelGuideHotel_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Hotel_Bool_Exp>>>,
  _not?: Maybe<Hotel_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Hotel_Bool_Exp>>>,
  companyID?: Maybe<Int_Comparison_Exp>,
  description?: Maybe<String_Comparison_Exp>,
  hotelID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  locationID?: Maybe<Int_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
  star?: Maybe<Float_Comparison_Exp>,
  taxNumber?: Maybe<String_Comparison_Exp>,
};

export enum Hotel_Constraint {
  HotelPkey = 'Hotel_pkey'
}

export type Hotel_Inc_Input = {
  companyID?: Maybe<Scalars['Int']>,
  hotelID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
};

export type Hotel_Insert_Input = {
  Company?: Maybe<Company_Obj_Rel_Insert_Input>,
  HotelComments?: Maybe<HotelComment_Arr_Rel_Insert_Input>,
  HotelRooms?: Maybe<HotelRoom_Arr_Rel_Insert_Input>,
  HotelServices?: Maybe<HotelService_Arr_Rel_Insert_Input>,
  Location?: Maybe<Location_Obj_Rel_Insert_Input>,
  TravelGuideHotels?: Maybe<TravelGuideHotel_Arr_Rel_Insert_Input>,
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  hotelID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  star?: Maybe<Scalars['Float']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Hotel_Max_Fields = {
   __typename?: 'Hotel_max_fields',
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  hotelID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  star?: Maybe<Scalars['Float']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Hotel_Max_Order_By = {
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  taxNumber?: Maybe<Order_By>,
};

export type Hotel_Min_Fields = {
   __typename?: 'Hotel_min_fields',
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  hotelID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  star?: Maybe<Scalars['Float']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Hotel_Min_Order_By = {
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  taxNumber?: Maybe<Order_By>,
};

export type Hotel_Mutation_Response = {
   __typename?: 'Hotel_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Hotel>,
};

export type Hotel_Obj_Rel_Insert_Input = {
  data: Hotel_Insert_Input,
  on_conflict?: Maybe<Hotel_On_Conflict>,
};

export type Hotel_On_Conflict = {
  constraint: Hotel_Constraint,
  update_columns: Array<Hotel_Update_Column>,
  where?: Maybe<Hotel_Bool_Exp>,
};

export type Hotel_Order_By = {
  Company?: Maybe<Company_Order_By>,
  HotelComments_aggregate?: Maybe<HotelComment_Aggregate_Order_By>,
  HotelRooms_aggregate?: Maybe<HotelRoom_Aggregate_Order_By>,
  HotelServices_aggregate?: Maybe<HotelService_Aggregate_Order_By>,
  Location?: Maybe<Location_Order_By>,
  TravelGuideHotels_aggregate?: Maybe<TravelGuideHotel_Aggregate_Order_By>,
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  taxNumber?: Maybe<Order_By>,
};

export enum Hotel_Select_Column {
  CompanyId = 'companyID',
  Description = 'description',
  HotelId = 'hotelID',
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  Name = 'name',
  Star = 'star',
  TaxNumber = 'taxNumber'
}

export type Hotel_Set_Input = {
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  hotelID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  star?: Maybe<Scalars['Float']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Hotel_Stddev_Fields = {
   __typename?: 'Hotel_stddev_fields',
  companyID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Hotel_Stddev_Order_By = {
  companyID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Hotel_Stddev_Pop_Fields = {
   __typename?: 'Hotel_stddev_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Hotel_Stddev_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Hotel_Stddev_Samp_Fields = {
   __typename?: 'Hotel_stddev_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Hotel_Stddev_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Hotel_Sum_Fields = {
   __typename?: 'Hotel_sum_fields',
  companyID?: Maybe<Scalars['Int']>,
  hotelID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
};

export type Hotel_Sum_Order_By = {
  companyID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export enum Hotel_Update_Column {
  CompanyId = 'companyID',
  Description = 'description',
  HotelId = 'hotelID',
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  Name = 'name',
  Star = 'star',
  TaxNumber = 'taxNumber'
}

export type Hotel_Var_Pop_Fields = {
   __typename?: 'Hotel_var_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Hotel_Var_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Hotel_Var_Samp_Fields = {
   __typename?: 'Hotel_var_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Hotel_Var_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Hotel_Variance_Fields = {
   __typename?: 'Hotel_variance_fields',
  companyID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Hotel_Variance_Order_By = {
  companyID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type HotelComment = {
   __typename?: 'HotelComment',
  Hotel: Hotel,
  User: User,
  content: Scalars['String'],
  date: Scalars['timestamptz'],
  hotelCommentID: Scalars['Int'],
  hotelID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  star: Scalars['Float'],
  userID: Scalars['Int'],
};

export type HotelComment_Aggregate = {
   __typename?: 'HotelComment_aggregate',
  aggregate?: Maybe<HotelComment_Aggregate_Fields>,
  nodes: Array<HotelComment>,
};

export type HotelComment_Aggregate_Fields = {
   __typename?: 'HotelComment_aggregate_fields',
  avg?: Maybe<HotelComment_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<HotelComment_Max_Fields>,
  min?: Maybe<HotelComment_Min_Fields>,
  stddev?: Maybe<HotelComment_Stddev_Fields>,
  stddev_pop?: Maybe<HotelComment_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<HotelComment_Stddev_Samp_Fields>,
  sum?: Maybe<HotelComment_Sum_Fields>,
  var_pop?: Maybe<HotelComment_Var_Pop_Fields>,
  var_samp?: Maybe<HotelComment_Var_Samp_Fields>,
  variance?: Maybe<HotelComment_Variance_Fields>,
};


export type HotelComment_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<HotelComment_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type HotelComment_Aggregate_Order_By = {
  avg?: Maybe<HotelComment_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<HotelComment_Max_Order_By>,
  min?: Maybe<HotelComment_Min_Order_By>,
  stddev?: Maybe<HotelComment_Stddev_Order_By>,
  stddev_pop?: Maybe<HotelComment_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<HotelComment_Stddev_Samp_Order_By>,
  sum?: Maybe<HotelComment_Sum_Order_By>,
  var_pop?: Maybe<HotelComment_Var_Pop_Order_By>,
  var_samp?: Maybe<HotelComment_Var_Samp_Order_By>,
  variance?: Maybe<HotelComment_Variance_Order_By>,
};

export type HotelComment_Arr_Rel_Insert_Input = {
  data: Array<HotelComment_Insert_Input>,
  on_conflict?: Maybe<HotelComment_On_Conflict>,
};

export type HotelComment_Avg_Fields = {
   __typename?: 'HotelComment_avg_fields',
  hotelCommentID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type HotelComment_Avg_Order_By = {
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type HotelComment_Bool_Exp = {
  Hotel?: Maybe<Hotel_Bool_Exp>,
  User?: Maybe<User_Bool_Exp>,
  _and?: Maybe<Array<Maybe<HotelComment_Bool_Exp>>>,
  _not?: Maybe<HotelComment_Bool_Exp>,
  _or?: Maybe<Array<Maybe<HotelComment_Bool_Exp>>>,
  content?: Maybe<String_Comparison_Exp>,
  date?: Maybe<Timestamptz_Comparison_Exp>,
  hotelCommentID?: Maybe<Int_Comparison_Exp>,
  hotelID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  star?: Maybe<Float_Comparison_Exp>,
  userID?: Maybe<Int_Comparison_Exp>,
};

export enum HotelComment_Constraint {
  HotelCommentPkey = 'HotelComment_pkey'
}

export type HotelComment_Inc_Input = {
  hotelCommentID?: Maybe<Scalars['Int']>,
  hotelID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type HotelComment_Insert_Input = {
  Hotel?: Maybe<Hotel_Obj_Rel_Insert_Input>,
  User?: Maybe<User_Obj_Rel_Insert_Input>,
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  hotelCommentID?: Maybe<Scalars['Int']>,
  hotelID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type HotelComment_Max_Fields = {
   __typename?: 'HotelComment_max_fields',
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  hotelCommentID?: Maybe<Scalars['Int']>,
  hotelID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type HotelComment_Max_Order_By = {
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type HotelComment_Min_Fields = {
   __typename?: 'HotelComment_min_fields',
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  hotelCommentID?: Maybe<Scalars['Int']>,
  hotelID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type HotelComment_Min_Order_By = {
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type HotelComment_Mutation_Response = {
   __typename?: 'HotelComment_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<HotelComment>,
};

export type HotelComment_Obj_Rel_Insert_Input = {
  data: HotelComment_Insert_Input,
  on_conflict?: Maybe<HotelComment_On_Conflict>,
};

export type HotelComment_On_Conflict = {
  constraint: HotelComment_Constraint,
  update_columns: Array<HotelComment_Update_Column>,
  where?: Maybe<HotelComment_Bool_Exp>,
};

export type HotelComment_Order_By = {
  Hotel?: Maybe<Hotel_Order_By>,
  User?: Maybe<User_Order_By>,
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum HotelComment_Select_Column {
  Content = 'content',
  Date = 'date',
  HotelCommentId = 'hotelCommentID',
  HotelId = 'hotelID',
  IsDeleted = 'isDeleted',
  Star = 'star',
  UserId = 'userID'
}

export type HotelComment_Set_Input = {
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  hotelCommentID?: Maybe<Scalars['Int']>,
  hotelID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type HotelComment_Stddev_Fields = {
   __typename?: 'HotelComment_stddev_fields',
  hotelCommentID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type HotelComment_Stddev_Order_By = {
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type HotelComment_Stddev_Pop_Fields = {
   __typename?: 'HotelComment_stddev_pop_fields',
  hotelCommentID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type HotelComment_Stddev_Pop_Order_By = {
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type HotelComment_Stddev_Samp_Fields = {
   __typename?: 'HotelComment_stddev_samp_fields',
  hotelCommentID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type HotelComment_Stddev_Samp_Order_By = {
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type HotelComment_Sum_Fields = {
   __typename?: 'HotelComment_sum_fields',
  hotelCommentID?: Maybe<Scalars['Int']>,
  hotelID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type HotelComment_Sum_Order_By = {
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum HotelComment_Update_Column {
  Content = 'content',
  Date = 'date',
  HotelCommentId = 'hotelCommentID',
  HotelId = 'hotelID',
  IsDeleted = 'isDeleted',
  Star = 'star',
  UserId = 'userID'
}

export type HotelComment_Var_Pop_Fields = {
   __typename?: 'HotelComment_var_pop_fields',
  hotelCommentID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type HotelComment_Var_Pop_Order_By = {
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type HotelComment_Var_Samp_Fields = {
   __typename?: 'HotelComment_var_samp_fields',
  hotelCommentID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type HotelComment_Var_Samp_Order_By = {
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type HotelComment_Variance_Fields = {
   __typename?: 'HotelComment_variance_fields',
  hotelCommentID?: Maybe<Scalars['Float']>,
  hotelID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type HotelComment_Variance_Order_By = {
  hotelCommentID?: Maybe<Order_By>,
  hotelID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type HotelRoom = {
   __typename?: 'HotelRoom',
  Hotel: Hotel,
  Room: Room,
  hotelID: Scalars['Int'],
  hotelRoomID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  roomID: Scalars['Int'],
};

export type HotelRoom_Aggregate = {
   __typename?: 'HotelRoom_aggregate',
  aggregate?: Maybe<HotelRoom_Aggregate_Fields>,
  nodes: Array<HotelRoom>,
};

export type HotelRoom_Aggregate_Fields = {
   __typename?: 'HotelRoom_aggregate_fields',
  avg?: Maybe<HotelRoom_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<HotelRoom_Max_Fields>,
  min?: Maybe<HotelRoom_Min_Fields>,
  stddev?: Maybe<HotelRoom_Stddev_Fields>,
  stddev_pop?: Maybe<HotelRoom_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<HotelRoom_Stddev_Samp_Fields>,
  sum?: Maybe<HotelRoom_Sum_Fields>,
  var_pop?: Maybe<HotelRoom_Var_Pop_Fields>,
  var_samp?: Maybe<HotelRoom_Var_Samp_Fields>,
  variance?: Maybe<HotelRoom_Variance_Fields>,
};


export type HotelRoom_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<HotelRoom_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type HotelRoom_Aggregate_Order_By = {
  avg?: Maybe<HotelRoom_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<HotelRoom_Max_Order_By>,
  min?: Maybe<HotelRoom_Min_Order_By>,
  stddev?: Maybe<HotelRoom_Stddev_Order_By>,
  stddev_pop?: Maybe<HotelRoom_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<HotelRoom_Stddev_Samp_Order_By>,
  sum?: Maybe<HotelRoom_Sum_Order_By>,
  var_pop?: Maybe<HotelRoom_Var_Pop_Order_By>,
  var_samp?: Maybe<HotelRoom_Var_Samp_Order_By>,
  variance?: Maybe<HotelRoom_Variance_Order_By>,
};

export type HotelRoom_Arr_Rel_Insert_Input = {
  data: Array<HotelRoom_Insert_Input>,
  on_conflict?: Maybe<HotelRoom_On_Conflict>,
};

export type HotelRoom_Avg_Fields = {
   __typename?: 'HotelRoom_avg_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelRoomID?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
};

export type HotelRoom_Avg_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export type HotelRoom_Bool_Exp = {
  Hotel?: Maybe<Hotel_Bool_Exp>,
  Room?: Maybe<Room_Bool_Exp>,
  _and?: Maybe<Array<Maybe<HotelRoom_Bool_Exp>>>,
  _not?: Maybe<HotelRoom_Bool_Exp>,
  _or?: Maybe<Array<Maybe<HotelRoom_Bool_Exp>>>,
  hotelID?: Maybe<Int_Comparison_Exp>,
  hotelRoomID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  roomID?: Maybe<Int_Comparison_Exp>,
};

export enum HotelRoom_Constraint {
  HotelRoomPkey = 'HotelRoom_pkey'
}

export type HotelRoom_Inc_Input = {
  hotelID?: Maybe<Scalars['Int']>,
  hotelRoomID?: Maybe<Scalars['Int']>,
  roomID?: Maybe<Scalars['Int']>,
};

export type HotelRoom_Insert_Input = {
  Hotel?: Maybe<Hotel_Obj_Rel_Insert_Input>,
  Room?: Maybe<Room_Obj_Rel_Insert_Input>,
  hotelID?: Maybe<Scalars['Int']>,
  hotelRoomID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  roomID?: Maybe<Scalars['Int']>,
};

export type HotelRoom_Max_Fields = {
   __typename?: 'HotelRoom_max_fields',
  hotelID?: Maybe<Scalars['Int']>,
  hotelRoomID?: Maybe<Scalars['Int']>,
  roomID?: Maybe<Scalars['Int']>,
};

export type HotelRoom_Max_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export type HotelRoom_Min_Fields = {
   __typename?: 'HotelRoom_min_fields',
  hotelID?: Maybe<Scalars['Int']>,
  hotelRoomID?: Maybe<Scalars['Int']>,
  roomID?: Maybe<Scalars['Int']>,
};

export type HotelRoom_Min_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export type HotelRoom_Mutation_Response = {
   __typename?: 'HotelRoom_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<HotelRoom>,
};

export type HotelRoom_Obj_Rel_Insert_Input = {
  data: HotelRoom_Insert_Input,
  on_conflict?: Maybe<HotelRoom_On_Conflict>,
};

export type HotelRoom_On_Conflict = {
  constraint: HotelRoom_Constraint,
  update_columns: Array<HotelRoom_Update_Column>,
  where?: Maybe<HotelRoom_Bool_Exp>,
};

export type HotelRoom_Order_By = {
  Hotel?: Maybe<Hotel_Order_By>,
  Room?: Maybe<Room_Order_By>,
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export enum HotelRoom_Select_Column {
  HotelId = 'hotelID',
  HotelRoomId = 'hotelRoomID',
  IsDeleted = 'isDeleted',
  RoomId = 'roomID'
}

export type HotelRoom_Set_Input = {
  hotelID?: Maybe<Scalars['Int']>,
  hotelRoomID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  roomID?: Maybe<Scalars['Int']>,
};

export type HotelRoom_Stddev_Fields = {
   __typename?: 'HotelRoom_stddev_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelRoomID?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
};

export type HotelRoom_Stddev_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export type HotelRoom_Stddev_Pop_Fields = {
   __typename?: 'HotelRoom_stddev_pop_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelRoomID?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
};

export type HotelRoom_Stddev_Pop_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export type HotelRoom_Stddev_Samp_Fields = {
   __typename?: 'HotelRoom_stddev_samp_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelRoomID?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
};

export type HotelRoom_Stddev_Samp_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export type HotelRoom_Sum_Fields = {
   __typename?: 'HotelRoom_sum_fields',
  hotelID?: Maybe<Scalars['Int']>,
  hotelRoomID?: Maybe<Scalars['Int']>,
  roomID?: Maybe<Scalars['Int']>,
};

export type HotelRoom_Sum_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export enum HotelRoom_Update_Column {
  HotelId = 'hotelID',
  HotelRoomId = 'hotelRoomID',
  IsDeleted = 'isDeleted',
  RoomId = 'roomID'
}

export type HotelRoom_Var_Pop_Fields = {
   __typename?: 'HotelRoom_var_pop_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelRoomID?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
};

export type HotelRoom_Var_Pop_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export type HotelRoom_Var_Samp_Fields = {
   __typename?: 'HotelRoom_var_samp_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelRoomID?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
};

export type HotelRoom_Var_Samp_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export type HotelRoom_Variance_Fields = {
   __typename?: 'HotelRoom_variance_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelRoomID?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
};

export type HotelRoom_Variance_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelRoomID?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
};

export type HotelService = {
   __typename?: 'HotelService',
  Hotel: Hotel,
  HotelServiceProperty: HotelServiceProperty,
  hotelID: Scalars['Int'],
  hotelServiceHotelID: Scalars['Int'],
  hotelServicePropertyID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
};

export type HotelService_Aggregate = {
   __typename?: 'HotelService_aggregate',
  aggregate?: Maybe<HotelService_Aggregate_Fields>,
  nodes: Array<HotelService>,
};

export type HotelService_Aggregate_Fields = {
   __typename?: 'HotelService_aggregate_fields',
  avg?: Maybe<HotelService_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<HotelService_Max_Fields>,
  min?: Maybe<HotelService_Min_Fields>,
  stddev?: Maybe<HotelService_Stddev_Fields>,
  stddev_pop?: Maybe<HotelService_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<HotelService_Stddev_Samp_Fields>,
  sum?: Maybe<HotelService_Sum_Fields>,
  var_pop?: Maybe<HotelService_Var_Pop_Fields>,
  var_samp?: Maybe<HotelService_Var_Samp_Fields>,
  variance?: Maybe<HotelService_Variance_Fields>,
};


export type HotelService_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<HotelService_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type HotelService_Aggregate_Order_By = {
  avg?: Maybe<HotelService_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<HotelService_Max_Order_By>,
  min?: Maybe<HotelService_Min_Order_By>,
  stddev?: Maybe<HotelService_Stddev_Order_By>,
  stddev_pop?: Maybe<HotelService_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<HotelService_Stddev_Samp_Order_By>,
  sum?: Maybe<HotelService_Sum_Order_By>,
  var_pop?: Maybe<HotelService_Var_Pop_Order_By>,
  var_samp?: Maybe<HotelService_Var_Samp_Order_By>,
  variance?: Maybe<HotelService_Variance_Order_By>,
};

export type HotelService_Arr_Rel_Insert_Input = {
  data: Array<HotelService_Insert_Input>,
  on_conflict?: Maybe<HotelService_On_Conflict>,
};

export type HotelService_Avg_Fields = {
   __typename?: 'HotelService_avg_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelServiceHotelID?: Maybe<Scalars['Float']>,
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelService_Avg_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelService_Bool_Exp = {
  Hotel?: Maybe<Hotel_Bool_Exp>,
  HotelServiceProperty?: Maybe<HotelServiceProperty_Bool_Exp>,
  _and?: Maybe<Array<Maybe<HotelService_Bool_Exp>>>,
  _not?: Maybe<HotelService_Bool_Exp>,
  _or?: Maybe<Array<Maybe<HotelService_Bool_Exp>>>,
  hotelID?: Maybe<Int_Comparison_Exp>,
  hotelServiceHotelID?: Maybe<Int_Comparison_Exp>,
  hotelServicePropertyID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
};

export enum HotelService_Constraint {
  HotelServicePkey = 'HotelService_pkey'
}

export type HotelService_Inc_Input = {
  hotelID?: Maybe<Scalars['Int']>,
  hotelServiceHotelID?: Maybe<Scalars['Int']>,
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
};

export type HotelService_Insert_Input = {
  Hotel?: Maybe<Hotel_Obj_Rel_Insert_Input>,
  HotelServiceProperty?: Maybe<HotelServiceProperty_Obj_Rel_Insert_Input>,
  hotelID?: Maybe<Scalars['Int']>,
  hotelServiceHotelID?: Maybe<Scalars['Int']>,
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type HotelService_Max_Fields = {
   __typename?: 'HotelService_max_fields',
  hotelID?: Maybe<Scalars['Int']>,
  hotelServiceHotelID?: Maybe<Scalars['Int']>,
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
};

export type HotelService_Max_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelService_Min_Fields = {
   __typename?: 'HotelService_min_fields',
  hotelID?: Maybe<Scalars['Int']>,
  hotelServiceHotelID?: Maybe<Scalars['Int']>,
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
};

export type HotelService_Min_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelService_Mutation_Response = {
   __typename?: 'HotelService_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<HotelService>,
};

export type HotelService_Obj_Rel_Insert_Input = {
  data: HotelService_Insert_Input,
  on_conflict?: Maybe<HotelService_On_Conflict>,
};

export type HotelService_On_Conflict = {
  constraint: HotelService_Constraint,
  update_columns: Array<HotelService_Update_Column>,
  where?: Maybe<HotelService_Bool_Exp>,
};

export type HotelService_Order_By = {
  Hotel?: Maybe<Hotel_Order_By>,
  HotelServiceProperty?: Maybe<HotelServiceProperty_Order_By>,
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
};

export enum HotelService_Select_Column {
  HotelId = 'hotelID',
  HotelServiceHotelId = 'hotelServiceHotelID',
  HotelServicePropertyId = 'hotelServicePropertyID',
  IsDeleted = 'isDeleted'
}

export type HotelService_Set_Input = {
  hotelID?: Maybe<Scalars['Int']>,
  hotelServiceHotelID?: Maybe<Scalars['Int']>,
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type HotelService_Stddev_Fields = {
   __typename?: 'HotelService_stddev_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelServiceHotelID?: Maybe<Scalars['Float']>,
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelService_Stddev_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelService_Stddev_Pop_Fields = {
   __typename?: 'HotelService_stddev_pop_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelServiceHotelID?: Maybe<Scalars['Float']>,
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelService_Stddev_Pop_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelService_Stddev_Samp_Fields = {
   __typename?: 'HotelService_stddev_samp_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelServiceHotelID?: Maybe<Scalars['Float']>,
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelService_Stddev_Samp_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelService_Sum_Fields = {
   __typename?: 'HotelService_sum_fields',
  hotelID?: Maybe<Scalars['Int']>,
  hotelServiceHotelID?: Maybe<Scalars['Int']>,
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
};

export type HotelService_Sum_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export enum HotelService_Update_Column {
  HotelId = 'hotelID',
  HotelServiceHotelId = 'hotelServiceHotelID',
  HotelServicePropertyId = 'hotelServicePropertyID',
  IsDeleted = 'isDeleted'
}

export type HotelService_Var_Pop_Fields = {
   __typename?: 'HotelService_var_pop_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelServiceHotelID?: Maybe<Scalars['Float']>,
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelService_Var_Pop_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelService_Var_Samp_Fields = {
   __typename?: 'HotelService_var_samp_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelServiceHotelID?: Maybe<Scalars['Float']>,
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelService_Var_Samp_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelService_Variance_Fields = {
   __typename?: 'HotelService_variance_fields',
  hotelID?: Maybe<Scalars['Float']>,
  hotelServiceHotelID?: Maybe<Scalars['Float']>,
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelService_Variance_Order_By = {
  hotelID?: Maybe<Order_By>,
  hotelServiceHotelID?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelServiceProperty = {
   __typename?: 'HotelServiceProperty',
  HotelServices: Array<HotelService>,
  HotelServices_aggregate: HotelService_Aggregate,
  content: Scalars['String'],
  hotelServicePropertyID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
};


export type HotelServicePropertyHotelServicesArgs = {
  distinct_on?: Maybe<Array<HotelService_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelService_Order_By>>,
  where?: Maybe<HotelService_Bool_Exp>
};


export type HotelServicePropertyHotelServices_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelService_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelService_Order_By>>,
  where?: Maybe<HotelService_Bool_Exp>
};

export type HotelServiceProperty_Aggregate = {
   __typename?: 'HotelServiceProperty_aggregate',
  aggregate?: Maybe<HotelServiceProperty_Aggregate_Fields>,
  nodes: Array<HotelServiceProperty>,
};

export type HotelServiceProperty_Aggregate_Fields = {
   __typename?: 'HotelServiceProperty_aggregate_fields',
  avg?: Maybe<HotelServiceProperty_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<HotelServiceProperty_Max_Fields>,
  min?: Maybe<HotelServiceProperty_Min_Fields>,
  stddev?: Maybe<HotelServiceProperty_Stddev_Fields>,
  stddev_pop?: Maybe<HotelServiceProperty_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<HotelServiceProperty_Stddev_Samp_Fields>,
  sum?: Maybe<HotelServiceProperty_Sum_Fields>,
  var_pop?: Maybe<HotelServiceProperty_Var_Pop_Fields>,
  var_samp?: Maybe<HotelServiceProperty_Var_Samp_Fields>,
  variance?: Maybe<HotelServiceProperty_Variance_Fields>,
};


export type HotelServiceProperty_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<HotelServiceProperty_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type HotelServiceProperty_Aggregate_Order_By = {
  avg?: Maybe<HotelServiceProperty_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<HotelServiceProperty_Max_Order_By>,
  min?: Maybe<HotelServiceProperty_Min_Order_By>,
  stddev?: Maybe<HotelServiceProperty_Stddev_Order_By>,
  stddev_pop?: Maybe<HotelServiceProperty_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<HotelServiceProperty_Stddev_Samp_Order_By>,
  sum?: Maybe<HotelServiceProperty_Sum_Order_By>,
  var_pop?: Maybe<HotelServiceProperty_Var_Pop_Order_By>,
  var_samp?: Maybe<HotelServiceProperty_Var_Samp_Order_By>,
  variance?: Maybe<HotelServiceProperty_Variance_Order_By>,
};

export type HotelServiceProperty_Arr_Rel_Insert_Input = {
  data: Array<HotelServiceProperty_Insert_Input>,
  on_conflict?: Maybe<HotelServiceProperty_On_Conflict>,
};

export type HotelServiceProperty_Avg_Fields = {
   __typename?: 'HotelServiceProperty_avg_fields',
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelServiceProperty_Avg_Order_By = {
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelServiceProperty_Bool_Exp = {
  HotelServices?: Maybe<HotelService_Bool_Exp>,
  _and?: Maybe<Array<Maybe<HotelServiceProperty_Bool_Exp>>>,
  _not?: Maybe<HotelServiceProperty_Bool_Exp>,
  _or?: Maybe<Array<Maybe<HotelServiceProperty_Bool_Exp>>>,
  content?: Maybe<String_Comparison_Exp>,
  hotelServicePropertyID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
};

export enum HotelServiceProperty_Constraint {
  HotelServicePropertyPkey = 'HotelServiceProperty_pkey'
}

export type HotelServiceProperty_Inc_Input = {
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
};

export type HotelServiceProperty_Insert_Input = {
  HotelServices?: Maybe<HotelService_Arr_Rel_Insert_Input>,
  content?: Maybe<Scalars['String']>,
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type HotelServiceProperty_Max_Fields = {
   __typename?: 'HotelServiceProperty_max_fields',
  content?: Maybe<Scalars['String']>,
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
};

export type HotelServiceProperty_Max_Order_By = {
  content?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelServiceProperty_Min_Fields = {
   __typename?: 'HotelServiceProperty_min_fields',
  content?: Maybe<Scalars['String']>,
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
};

export type HotelServiceProperty_Min_Order_By = {
  content?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelServiceProperty_Mutation_Response = {
   __typename?: 'HotelServiceProperty_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<HotelServiceProperty>,
};

export type HotelServiceProperty_Obj_Rel_Insert_Input = {
  data: HotelServiceProperty_Insert_Input,
  on_conflict?: Maybe<HotelServiceProperty_On_Conflict>,
};

export type HotelServiceProperty_On_Conflict = {
  constraint: HotelServiceProperty_Constraint,
  update_columns: Array<HotelServiceProperty_Update_Column>,
  where?: Maybe<HotelServiceProperty_Bool_Exp>,
};

export type HotelServiceProperty_Order_By = {
  HotelServices_aggregate?: Maybe<HotelService_Aggregate_Order_By>,
  content?: Maybe<Order_By>,
  hotelServicePropertyID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
};

export enum HotelServiceProperty_Select_Column {
  Content = 'content',
  HotelServicePropertyId = 'hotelServicePropertyID',
  IsDeleted = 'isDeleted'
}

export type HotelServiceProperty_Set_Input = {
  content?: Maybe<Scalars['String']>,
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
};

export type HotelServiceProperty_Stddev_Fields = {
   __typename?: 'HotelServiceProperty_stddev_fields',
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelServiceProperty_Stddev_Order_By = {
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelServiceProperty_Stddev_Pop_Fields = {
   __typename?: 'HotelServiceProperty_stddev_pop_fields',
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelServiceProperty_Stddev_Pop_Order_By = {
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelServiceProperty_Stddev_Samp_Fields = {
   __typename?: 'HotelServiceProperty_stddev_samp_fields',
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelServiceProperty_Stddev_Samp_Order_By = {
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelServiceProperty_Sum_Fields = {
   __typename?: 'HotelServiceProperty_sum_fields',
  hotelServicePropertyID?: Maybe<Scalars['Int']>,
};

export type HotelServiceProperty_Sum_Order_By = {
  hotelServicePropertyID?: Maybe<Order_By>,
};

export enum HotelServiceProperty_Update_Column {
  Content = 'content',
  HotelServicePropertyId = 'hotelServicePropertyID',
  IsDeleted = 'isDeleted'
}

export type HotelServiceProperty_Var_Pop_Fields = {
   __typename?: 'HotelServiceProperty_var_pop_fields',
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelServiceProperty_Var_Pop_Order_By = {
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelServiceProperty_Var_Samp_Fields = {
   __typename?: 'HotelServiceProperty_var_samp_fields',
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelServiceProperty_Var_Samp_Order_By = {
  hotelServicePropertyID?: Maybe<Order_By>,
};

export type HotelServiceProperty_Variance_Fields = {
   __typename?: 'HotelServiceProperty_variance_fields',
  hotelServicePropertyID?: Maybe<Scalars['Float']>,
};

export type HotelServiceProperty_Variance_Order_By = {
  hotelServicePropertyID?: Maybe<Order_By>,
};


export type Inet_Comparison_Exp = {
  _eq?: Maybe<Scalars['inet']>,
  _gt?: Maybe<Scalars['inet']>,
  _gte?: Maybe<Scalars['inet']>,
  _in?: Maybe<Array<Scalars['inet']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['inet']>,
  _lte?: Maybe<Scalars['inet']>,
  _neq?: Maybe<Scalars['inet']>,
  _nin?: Maybe<Array<Scalars['inet']>>,
};

export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>,
  _gt?: Maybe<Scalars['Int']>,
  _gte?: Maybe<Scalars['Int']>,
  _in?: Maybe<Array<Scalars['Int']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['Int']>,
  _lte?: Maybe<Scalars['Int']>,
  _neq?: Maybe<Scalars['Int']>,
  _nin?: Maybe<Array<Scalars['Int']>>,
};

export type Location = {
   __typename?: 'Location',
  Address?: Maybe<Address>,
  ArchSites: Array<ArchSite>,
  ArchSites_aggregate: ArchSite_Aggregate,
  Companies: Array<Company>,
  Companies_aggregate: Company_Aggregate,
  Hotels: Array<Hotel>,
  Hotels_aggregate: Hotel_Aggregate,
  Museums: Array<Museum>,
  Museums_aggregate: Museum_Aggregate,
  Restaurants: Array<Restaurant>,
  Restaurants_aggregate: Restaurant_Aggregate,
  TravelGuideLocations: Array<TravelGuideLocation>,
  TravelGuideLocations_aggregate: TravelGuideLocation_Aggregate,
  addressID?: Maybe<Scalars['Int']>,
  isDeleted: Scalars['Boolean'],
  latitude: Scalars['Float'],
  locationID: Scalars['Int'],
  longtitude: Scalars['Float'],
};


export type LocationArchSitesArgs = {
  distinct_on?: Maybe<Array<ArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSite_Order_By>>,
  where?: Maybe<ArchSite_Bool_Exp>
};


export type LocationArchSites_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSite_Order_By>>,
  where?: Maybe<ArchSite_Bool_Exp>
};


export type LocationCompaniesArgs = {
  distinct_on?: Maybe<Array<Company_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Company_Order_By>>,
  where?: Maybe<Company_Bool_Exp>
};


export type LocationCompanies_AggregateArgs = {
  distinct_on?: Maybe<Array<Company_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Company_Order_By>>,
  where?: Maybe<Company_Bool_Exp>
};


export type LocationHotelsArgs = {
  distinct_on?: Maybe<Array<Hotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Hotel_Order_By>>,
  where?: Maybe<Hotel_Bool_Exp>
};


export type LocationHotels_AggregateArgs = {
  distinct_on?: Maybe<Array<Hotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Hotel_Order_By>>,
  where?: Maybe<Hotel_Bool_Exp>
};


export type LocationMuseumsArgs = {
  distinct_on?: Maybe<Array<Museum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Museum_Order_By>>,
  where?: Maybe<Museum_Bool_Exp>
};


export type LocationMuseums_AggregateArgs = {
  distinct_on?: Maybe<Array<Museum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Museum_Order_By>>,
  where?: Maybe<Museum_Bool_Exp>
};


export type LocationRestaurantsArgs = {
  distinct_on?: Maybe<Array<Restaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Restaurant_Order_By>>,
  where?: Maybe<Restaurant_Bool_Exp>
};


export type LocationRestaurants_AggregateArgs = {
  distinct_on?: Maybe<Array<Restaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Restaurant_Order_By>>,
  where?: Maybe<Restaurant_Bool_Exp>
};


export type LocationTravelGuideLocationsArgs = {
  distinct_on?: Maybe<Array<TravelGuideLocation_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideLocation_Order_By>>,
  where?: Maybe<TravelGuideLocation_Bool_Exp>
};


export type LocationTravelGuideLocations_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideLocation_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideLocation_Order_By>>,
  where?: Maybe<TravelGuideLocation_Bool_Exp>
};

export type Location_Aggregate = {
   __typename?: 'Location_aggregate',
  aggregate?: Maybe<Location_Aggregate_Fields>,
  nodes: Array<Location>,
};

export type Location_Aggregate_Fields = {
   __typename?: 'Location_aggregate_fields',
  avg?: Maybe<Location_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Location_Max_Fields>,
  min?: Maybe<Location_Min_Fields>,
  stddev?: Maybe<Location_Stddev_Fields>,
  stddev_pop?: Maybe<Location_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Location_Stddev_Samp_Fields>,
  sum?: Maybe<Location_Sum_Fields>,
  var_pop?: Maybe<Location_Var_Pop_Fields>,
  var_samp?: Maybe<Location_Var_Samp_Fields>,
  variance?: Maybe<Location_Variance_Fields>,
};


export type Location_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Location_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Location_Aggregate_Order_By = {
  avg?: Maybe<Location_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Location_Max_Order_By>,
  min?: Maybe<Location_Min_Order_By>,
  stddev?: Maybe<Location_Stddev_Order_By>,
  stddev_pop?: Maybe<Location_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Location_Stddev_Samp_Order_By>,
  sum?: Maybe<Location_Sum_Order_By>,
  var_pop?: Maybe<Location_Var_Pop_Order_By>,
  var_samp?: Maybe<Location_Var_Samp_Order_By>,
  variance?: Maybe<Location_Variance_Order_By>,
};

export type Location_Arr_Rel_Insert_Input = {
  data: Array<Location_Insert_Input>,
  on_conflict?: Maybe<Location_On_Conflict>,
};

export type Location_Avg_Fields = {
   __typename?: 'Location_avg_fields',
  addressID?: Maybe<Scalars['Float']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Avg_Order_By = {
  addressID?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export type Location_Bool_Exp = {
  Address?: Maybe<Address_Bool_Exp>,
  ArchSites?: Maybe<ArchSite_Bool_Exp>,
  Companies?: Maybe<Company_Bool_Exp>,
  Hotels?: Maybe<Hotel_Bool_Exp>,
  Museums?: Maybe<Museum_Bool_Exp>,
  Restaurants?: Maybe<Restaurant_Bool_Exp>,
  TravelGuideLocations?: Maybe<TravelGuideLocation_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Location_Bool_Exp>>>,
  _not?: Maybe<Location_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Location_Bool_Exp>>>,
  addressID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  latitude?: Maybe<Float_Comparison_Exp>,
  locationID?: Maybe<Int_Comparison_Exp>,
  longtitude?: Maybe<Float_Comparison_Exp>,
};

export enum Location_Constraint {
  LocationPkey = 'Location_pkey'
}

export type Location_Inc_Input = {
  addressID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
};

export type Location_Insert_Input = {
  Address?: Maybe<Address_Obj_Rel_Insert_Input>,
  ArchSites?: Maybe<ArchSite_Arr_Rel_Insert_Input>,
  Companies?: Maybe<Company_Arr_Rel_Insert_Input>,
  Hotels?: Maybe<Hotel_Arr_Rel_Insert_Input>,
  Museums?: Maybe<Museum_Arr_Rel_Insert_Input>,
  Restaurants?: Maybe<Restaurant_Arr_Rel_Insert_Input>,
  TravelGuideLocations?: Maybe<TravelGuideLocation_Arr_Rel_Insert_Input>,
  addressID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Int']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Max_Fields = {
   __typename?: 'Location_max_fields',
  addressID?: Maybe<Scalars['Int']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Int']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Max_Order_By = {
  addressID?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export type Location_Min_Fields = {
   __typename?: 'Location_min_fields',
  addressID?: Maybe<Scalars['Int']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Int']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Min_Order_By = {
  addressID?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export type Location_Mutation_Response = {
   __typename?: 'Location_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Location>,
};

export type Location_Obj_Rel_Insert_Input = {
  data: Location_Insert_Input,
  on_conflict?: Maybe<Location_On_Conflict>,
};

export type Location_On_Conflict = {
  constraint: Location_Constraint,
  update_columns: Array<Location_Update_Column>,
  where?: Maybe<Location_Bool_Exp>,
};

export type Location_Order_By = {
  Address?: Maybe<Address_Order_By>,
  ArchSites_aggregate?: Maybe<ArchSite_Aggregate_Order_By>,
  Companies_aggregate?: Maybe<Company_Aggregate_Order_By>,
  Hotels_aggregate?: Maybe<Hotel_Aggregate_Order_By>,
  Museums_aggregate?: Maybe<Museum_Aggregate_Order_By>,
  Restaurants_aggregate?: Maybe<Restaurant_Aggregate_Order_By>,
  TravelGuideLocations_aggregate?: Maybe<TravelGuideLocation_Aggregate_Order_By>,
  addressID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export enum Location_Select_Column {
  AddressId = 'addressID',
  IsDeleted = 'isDeleted',
  Latitude = 'latitude',
  LocationId = 'locationID',
  Longtitude = 'longtitude'
}

export type Location_Set_Input = {
  addressID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Int']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Stddev_Fields = {
   __typename?: 'Location_stddev_fields',
  addressID?: Maybe<Scalars['Float']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Stddev_Order_By = {
  addressID?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export type Location_Stddev_Pop_Fields = {
   __typename?: 'Location_stddev_pop_fields',
  addressID?: Maybe<Scalars['Float']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Stddev_Pop_Order_By = {
  addressID?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export type Location_Stddev_Samp_Fields = {
   __typename?: 'Location_stddev_samp_fields',
  addressID?: Maybe<Scalars['Float']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Stddev_Samp_Order_By = {
  addressID?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export type Location_Sum_Fields = {
   __typename?: 'Location_sum_fields',
  addressID?: Maybe<Scalars['Int']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Int']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Sum_Order_By = {
  addressID?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export enum Location_Update_Column {
  AddressId = 'addressID',
  IsDeleted = 'isDeleted',
  Latitude = 'latitude',
  LocationId = 'locationID',
  Longtitude = 'longtitude'
}

export type Location_Var_Pop_Fields = {
   __typename?: 'Location_var_pop_fields',
  addressID?: Maybe<Scalars['Float']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Var_Pop_Order_By = {
  addressID?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export type Location_Var_Samp_Fields = {
   __typename?: 'Location_var_samp_fields',
  addressID?: Maybe<Scalars['Float']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Var_Samp_Order_By = {
  addressID?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export type Location_Variance_Fields = {
   __typename?: 'Location_variance_fields',
  addressID?: Maybe<Scalars['Float']>,
  latitude?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  longtitude?: Maybe<Scalars['Float']>,
};

export type Location_Variance_Order_By = {
  addressID?: Maybe<Order_By>,
  latitude?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  longtitude?: Maybe<Order_By>,
};

export type LoginType = {
   __typename?: 'LoginType',
  Users: Array<User>,
  Users_aggregate: User_Aggregate,
  isDeleted: Scalars['Boolean'],
  loginTypeID: Scalars['Int'],
  type: Scalars['String'],
};


export type LoginTypeUsersArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};


export type LoginTypeUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};

export type LoginType_Aggregate = {
   __typename?: 'LoginType_aggregate',
  aggregate?: Maybe<LoginType_Aggregate_Fields>,
  nodes: Array<LoginType>,
};

export type LoginType_Aggregate_Fields = {
   __typename?: 'LoginType_aggregate_fields',
  avg?: Maybe<LoginType_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<LoginType_Max_Fields>,
  min?: Maybe<LoginType_Min_Fields>,
  stddev?: Maybe<LoginType_Stddev_Fields>,
  stddev_pop?: Maybe<LoginType_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<LoginType_Stddev_Samp_Fields>,
  sum?: Maybe<LoginType_Sum_Fields>,
  var_pop?: Maybe<LoginType_Var_Pop_Fields>,
  var_samp?: Maybe<LoginType_Var_Samp_Fields>,
  variance?: Maybe<LoginType_Variance_Fields>,
};


export type LoginType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<LoginType_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type LoginType_Aggregate_Order_By = {
  avg?: Maybe<LoginType_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<LoginType_Max_Order_By>,
  min?: Maybe<LoginType_Min_Order_By>,
  stddev?: Maybe<LoginType_Stddev_Order_By>,
  stddev_pop?: Maybe<LoginType_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<LoginType_Stddev_Samp_Order_By>,
  sum?: Maybe<LoginType_Sum_Order_By>,
  var_pop?: Maybe<LoginType_Var_Pop_Order_By>,
  var_samp?: Maybe<LoginType_Var_Samp_Order_By>,
  variance?: Maybe<LoginType_Variance_Order_By>,
};

export type LoginType_Arr_Rel_Insert_Input = {
  data: Array<LoginType_Insert_Input>,
  on_conflict?: Maybe<LoginType_On_Conflict>,
};

export type LoginType_Avg_Fields = {
   __typename?: 'LoginType_avg_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
};

export type LoginType_Avg_Order_By = {
  loginTypeID?: Maybe<Order_By>,
};

export type LoginType_Bool_Exp = {
  Users?: Maybe<User_Bool_Exp>,
  _and?: Maybe<Array<Maybe<LoginType_Bool_Exp>>>,
  _not?: Maybe<LoginType_Bool_Exp>,
  _or?: Maybe<Array<Maybe<LoginType_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  loginTypeID?: Maybe<Int_Comparison_Exp>,
  type?: Maybe<String_Comparison_Exp>,
};

export enum LoginType_Constraint {
  LoginTypePkey = 'LoginType_pkey'
}

export type LoginType_Inc_Input = {
  loginTypeID?: Maybe<Scalars['Int']>,
};

export type LoginType_Insert_Input = {
  Users?: Maybe<User_Arr_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  loginTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type LoginType_Max_Fields = {
   __typename?: 'LoginType_max_fields',
  loginTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type LoginType_Max_Order_By = {
  loginTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export type LoginType_Min_Fields = {
   __typename?: 'LoginType_min_fields',
  loginTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type LoginType_Min_Order_By = {
  loginTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export type LoginType_Mutation_Response = {
   __typename?: 'LoginType_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<LoginType>,
};

export type LoginType_Obj_Rel_Insert_Input = {
  data: LoginType_Insert_Input,
  on_conflict?: Maybe<LoginType_On_Conflict>,
};

export type LoginType_On_Conflict = {
  constraint: LoginType_Constraint,
  update_columns: Array<LoginType_Update_Column>,
  where?: Maybe<LoginType_Bool_Exp>,
};

export type LoginType_Order_By = {
  Users_aggregate?: Maybe<User_Aggregate_Order_By>,
  isDeleted?: Maybe<Order_By>,
  loginTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export enum LoginType_Select_Column {
  IsDeleted = 'isDeleted',
  LoginTypeId = 'loginTypeID',
  Type = 'type'
}

export type LoginType_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  loginTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type LoginType_Stddev_Fields = {
   __typename?: 'LoginType_stddev_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
};

export type LoginType_Stddev_Order_By = {
  loginTypeID?: Maybe<Order_By>,
};

export type LoginType_Stddev_Pop_Fields = {
   __typename?: 'LoginType_stddev_pop_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
};

export type LoginType_Stddev_Pop_Order_By = {
  loginTypeID?: Maybe<Order_By>,
};

export type LoginType_Stddev_Samp_Fields = {
   __typename?: 'LoginType_stddev_samp_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
};

export type LoginType_Stddev_Samp_Order_By = {
  loginTypeID?: Maybe<Order_By>,
};

export type LoginType_Sum_Fields = {
   __typename?: 'LoginType_sum_fields',
  loginTypeID?: Maybe<Scalars['Int']>,
};

export type LoginType_Sum_Order_By = {
  loginTypeID?: Maybe<Order_By>,
};

export enum LoginType_Update_Column {
  IsDeleted = 'isDeleted',
  LoginTypeId = 'loginTypeID',
  Type = 'type'
}

export type LoginType_Var_Pop_Fields = {
   __typename?: 'LoginType_var_pop_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
};

export type LoginType_Var_Pop_Order_By = {
  loginTypeID?: Maybe<Order_By>,
};

export type LoginType_Var_Samp_Fields = {
   __typename?: 'LoginType_var_samp_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
};

export type LoginType_Var_Samp_Order_By = {
  loginTypeID?: Maybe<Order_By>,
};

export type LoginType_Variance_Fields = {
   __typename?: 'LoginType_variance_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
};

export type LoginType_Variance_Order_By = {
  loginTypeID?: Maybe<Order_By>,
};

export type Museum = {
   __typename?: 'Museum',
  Company: Company,
  Location: Location,
  MuseumComments: Array<MuseumComment>,
  MuseumComments_aggregate: MuseumComment_Aggregate,
  MuseumPrices: Array<MuseumPrice>,
  MuseumPrices_aggregate: MuseumPrice_Aggregate,
  MuseumTypeMuseums: Array<MuseumTypeMuseum>,
  MuseumTypeMuseums_aggregate: MuseumTypeMuseum_Aggregate,
  MuseumWorkingSchedules: Array<MuseumWorkingSchedule>,
  MuseumWorkingSchedules_aggregate: MuseumWorkingSchedule_Aggregate,
  TravelGuideMuseums: Array<TravelGuideMuseum>,
  TravelGuideMuseums_aggregate: TravelGuideMuseum_Aggregate,
  companyID: Scalars['Int'],
  description: Scalars['String'],
  isDeleted: Scalars['Boolean'],
  locationID: Scalars['Int'],
  museumID: Scalars['Int'],
  name: Scalars['String'],
};


export type MuseumMuseumCommentsArgs = {
  distinct_on?: Maybe<Array<MuseumComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumComment_Order_By>>,
  where?: Maybe<MuseumComment_Bool_Exp>
};


export type MuseumMuseumComments_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumComment_Order_By>>,
  where?: Maybe<MuseumComment_Bool_Exp>
};


export type MuseumMuseumPricesArgs = {
  distinct_on?: Maybe<Array<MuseumPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumPrice_Order_By>>,
  where?: Maybe<MuseumPrice_Bool_Exp>
};


export type MuseumMuseumPrices_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumPrice_Order_By>>,
  where?: Maybe<MuseumPrice_Bool_Exp>
};


export type MuseumMuseumTypeMuseumsArgs = {
  distinct_on?: Maybe<Array<MuseumTypeMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumTypeMuseum_Order_By>>,
  where?: Maybe<MuseumTypeMuseum_Bool_Exp>
};


export type MuseumMuseumTypeMuseums_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumTypeMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumTypeMuseum_Order_By>>,
  where?: Maybe<MuseumTypeMuseum_Bool_Exp>
};


export type MuseumMuseumWorkingSchedulesArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingSchedule_Order_By>>,
  where?: Maybe<MuseumWorkingSchedule_Bool_Exp>
};


export type MuseumMuseumWorkingSchedules_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingSchedule_Order_By>>,
  where?: Maybe<MuseumWorkingSchedule_Bool_Exp>
};


export type MuseumTravelGuideMuseumsArgs = {
  distinct_on?: Maybe<Array<TravelGuideMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideMuseum_Order_By>>,
  where?: Maybe<TravelGuideMuseum_Bool_Exp>
};


export type MuseumTravelGuideMuseums_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideMuseum_Order_By>>,
  where?: Maybe<TravelGuideMuseum_Bool_Exp>
};

export type Museum_Aggregate = {
   __typename?: 'Museum_aggregate',
  aggregate?: Maybe<Museum_Aggregate_Fields>,
  nodes: Array<Museum>,
};

export type Museum_Aggregate_Fields = {
   __typename?: 'Museum_aggregate_fields',
  avg?: Maybe<Museum_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Museum_Max_Fields>,
  min?: Maybe<Museum_Min_Fields>,
  stddev?: Maybe<Museum_Stddev_Fields>,
  stddev_pop?: Maybe<Museum_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Museum_Stddev_Samp_Fields>,
  sum?: Maybe<Museum_Sum_Fields>,
  var_pop?: Maybe<Museum_Var_Pop_Fields>,
  var_samp?: Maybe<Museum_Var_Samp_Fields>,
  variance?: Maybe<Museum_Variance_Fields>,
};


export type Museum_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Museum_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Museum_Aggregate_Order_By = {
  avg?: Maybe<Museum_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Museum_Max_Order_By>,
  min?: Maybe<Museum_Min_Order_By>,
  stddev?: Maybe<Museum_Stddev_Order_By>,
  stddev_pop?: Maybe<Museum_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Museum_Stddev_Samp_Order_By>,
  sum?: Maybe<Museum_Sum_Order_By>,
  var_pop?: Maybe<Museum_Var_Pop_Order_By>,
  var_samp?: Maybe<Museum_Var_Samp_Order_By>,
  variance?: Maybe<Museum_Variance_Order_By>,
};

export type Museum_Arr_Rel_Insert_Input = {
  data: Array<Museum_Insert_Input>,
  on_conflict?: Maybe<Museum_On_Conflict>,
};

export type Museum_Avg_Fields = {
   __typename?: 'Museum_avg_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
};

export type Museum_Avg_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
};

export type Museum_Bool_Exp = {
  Company?: Maybe<Company_Bool_Exp>,
  Location?: Maybe<Location_Bool_Exp>,
  MuseumComments?: Maybe<MuseumComment_Bool_Exp>,
  MuseumPrices?: Maybe<MuseumPrice_Bool_Exp>,
  MuseumTypeMuseums?: Maybe<MuseumTypeMuseum_Bool_Exp>,
  MuseumWorkingSchedules?: Maybe<MuseumWorkingSchedule_Bool_Exp>,
  TravelGuideMuseums?: Maybe<TravelGuideMuseum_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Museum_Bool_Exp>>>,
  _not?: Maybe<Museum_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Museum_Bool_Exp>>>,
  companyID?: Maybe<Int_Comparison_Exp>,
  description?: Maybe<String_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  locationID?: Maybe<Int_Comparison_Exp>,
  museumID?: Maybe<Int_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
};

export enum Museum_Constraint {
  MuseumPkey = 'Museum_pkey'
}

export type Museum_Inc_Input = {
  companyID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
};

export type Museum_Insert_Input = {
  Company?: Maybe<Company_Obj_Rel_Insert_Input>,
  Location?: Maybe<Location_Obj_Rel_Insert_Input>,
  MuseumComments?: Maybe<MuseumComment_Arr_Rel_Insert_Input>,
  MuseumPrices?: Maybe<MuseumPrice_Arr_Rel_Insert_Input>,
  MuseumTypeMuseums?: Maybe<MuseumTypeMuseum_Arr_Rel_Insert_Input>,
  MuseumWorkingSchedules?: Maybe<MuseumWorkingSchedule_Arr_Rel_Insert_Input>,
  TravelGuideMuseums?: Maybe<TravelGuideMuseum_Arr_Rel_Insert_Input>,
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type Museum_Max_Fields = {
   __typename?: 'Museum_max_fields',
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  locationID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type Museum_Max_Order_By = {
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

export type Museum_Min_Fields = {
   __typename?: 'Museum_min_fields',
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  locationID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type Museum_Min_Order_By = {
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

export type Museum_Mutation_Response = {
   __typename?: 'Museum_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Museum>,
};

export type Museum_Obj_Rel_Insert_Input = {
  data: Museum_Insert_Input,
  on_conflict?: Maybe<Museum_On_Conflict>,
};

export type Museum_On_Conflict = {
  constraint: Museum_Constraint,
  update_columns: Array<Museum_Update_Column>,
  where?: Maybe<Museum_Bool_Exp>,
};

export type Museum_Order_By = {
  Company?: Maybe<Company_Order_By>,
  Location?: Maybe<Location_Order_By>,
  MuseumComments_aggregate?: Maybe<MuseumComment_Aggregate_Order_By>,
  MuseumPrices_aggregate?: Maybe<MuseumPrice_Aggregate_Order_By>,
  MuseumTypeMuseums_aggregate?: Maybe<MuseumTypeMuseum_Aggregate_Order_By>,
  MuseumWorkingSchedules_aggregate?: Maybe<MuseumWorkingSchedule_Aggregate_Order_By>,
  TravelGuideMuseums_aggregate?: Maybe<TravelGuideMuseum_Aggregate_Order_By>,
  companyID?: Maybe<Order_By>,
  description?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

export enum Museum_Select_Column {
  CompanyId = 'companyID',
  Description = 'description',
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  MuseumId = 'museumID',
  Name = 'name'
}

export type Museum_Set_Input = {
  companyID?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type Museum_Stddev_Fields = {
   __typename?: 'Museum_stddev_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
};

export type Museum_Stddev_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
};

export type Museum_Stddev_Pop_Fields = {
   __typename?: 'Museum_stddev_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
};

export type Museum_Stddev_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
};

export type Museum_Stddev_Samp_Fields = {
   __typename?: 'Museum_stddev_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
};

export type Museum_Stddev_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
};

export type Museum_Sum_Fields = {
   __typename?: 'Museum_sum_fields',
  companyID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
};

export type Museum_Sum_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
};

export enum Museum_Update_Column {
  CompanyId = 'companyID',
  Description = 'description',
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  MuseumId = 'museumID',
  Name = 'name'
}

export type Museum_Var_Pop_Fields = {
   __typename?: 'Museum_var_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
};

export type Museum_Var_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
};

export type Museum_Var_Samp_Fields = {
   __typename?: 'Museum_var_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
};

export type Museum_Var_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
};

export type Museum_Variance_Fields = {
   __typename?: 'Museum_variance_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
};

export type Museum_Variance_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
};

export type MuseumComment = {
   __typename?: 'MuseumComment',
  Museum: Museum,
  User: User,
  content: Scalars['String'],
  date: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  museumCommentID: Scalars['Int'],
  museumID: Scalars['Int'],
  star: Scalars['Float'],
  userID: Scalars['Int'],
};

export type MuseumComment_Aggregate = {
   __typename?: 'MuseumComment_aggregate',
  aggregate?: Maybe<MuseumComment_Aggregate_Fields>,
  nodes: Array<MuseumComment>,
};

export type MuseumComment_Aggregate_Fields = {
   __typename?: 'MuseumComment_aggregate_fields',
  avg?: Maybe<MuseumComment_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<MuseumComment_Max_Fields>,
  min?: Maybe<MuseumComment_Min_Fields>,
  stddev?: Maybe<MuseumComment_Stddev_Fields>,
  stddev_pop?: Maybe<MuseumComment_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<MuseumComment_Stddev_Samp_Fields>,
  sum?: Maybe<MuseumComment_Sum_Fields>,
  var_pop?: Maybe<MuseumComment_Var_Pop_Fields>,
  var_samp?: Maybe<MuseumComment_Var_Samp_Fields>,
  variance?: Maybe<MuseumComment_Variance_Fields>,
};


export type MuseumComment_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<MuseumComment_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type MuseumComment_Aggregate_Order_By = {
  avg?: Maybe<MuseumComment_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<MuseumComment_Max_Order_By>,
  min?: Maybe<MuseumComment_Min_Order_By>,
  stddev?: Maybe<MuseumComment_Stddev_Order_By>,
  stddev_pop?: Maybe<MuseumComment_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<MuseumComment_Stddev_Samp_Order_By>,
  sum?: Maybe<MuseumComment_Sum_Order_By>,
  var_pop?: Maybe<MuseumComment_Var_Pop_Order_By>,
  var_samp?: Maybe<MuseumComment_Var_Samp_Order_By>,
  variance?: Maybe<MuseumComment_Variance_Order_By>,
};

export type MuseumComment_Arr_Rel_Insert_Input = {
  data: Array<MuseumComment_Insert_Input>,
  on_conflict?: Maybe<MuseumComment_On_Conflict>,
};

export type MuseumComment_Avg_Fields = {
   __typename?: 'MuseumComment_avg_fields',
  museumCommentID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type MuseumComment_Avg_Order_By = {
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type MuseumComment_Bool_Exp = {
  Museum?: Maybe<Museum_Bool_Exp>,
  User?: Maybe<User_Bool_Exp>,
  _and?: Maybe<Array<Maybe<MuseumComment_Bool_Exp>>>,
  _not?: Maybe<MuseumComment_Bool_Exp>,
  _or?: Maybe<Array<Maybe<MuseumComment_Bool_Exp>>>,
  content?: Maybe<String_Comparison_Exp>,
  date?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  museumCommentID?: Maybe<Int_Comparison_Exp>,
  museumID?: Maybe<Int_Comparison_Exp>,
  star?: Maybe<Float_Comparison_Exp>,
  userID?: Maybe<Int_Comparison_Exp>,
};

export enum MuseumComment_Constraint {
  MuseumCommentPkey = 'MuseumComment_pkey'
}

export type MuseumComment_Inc_Input = {
  museumCommentID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type MuseumComment_Insert_Input = {
  Museum?: Maybe<Museum_Obj_Rel_Insert_Input>,
  User?: Maybe<User_Obj_Rel_Insert_Input>,
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumCommentID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type MuseumComment_Max_Fields = {
   __typename?: 'MuseumComment_max_fields',
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  museumCommentID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type MuseumComment_Max_Order_By = {
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type MuseumComment_Min_Fields = {
   __typename?: 'MuseumComment_min_fields',
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  museumCommentID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type MuseumComment_Min_Order_By = {
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type MuseumComment_Mutation_Response = {
   __typename?: 'MuseumComment_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<MuseumComment>,
};

export type MuseumComment_Obj_Rel_Insert_Input = {
  data: MuseumComment_Insert_Input,
  on_conflict?: Maybe<MuseumComment_On_Conflict>,
};

export type MuseumComment_On_Conflict = {
  constraint: MuseumComment_Constraint,
  update_columns: Array<MuseumComment_Update_Column>,
  where?: Maybe<MuseumComment_Bool_Exp>,
};

export type MuseumComment_Order_By = {
  Museum?: Maybe<Museum_Order_By>,
  User?: Maybe<User_Order_By>,
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum MuseumComment_Select_Column {
  Content = 'content',
  Date = 'date',
  IsDeleted = 'isDeleted',
  MuseumCommentId = 'museumCommentID',
  MuseumId = 'museumID',
  Star = 'star',
  UserId = 'userID'
}

export type MuseumComment_Set_Input = {
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumCommentID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type MuseumComment_Stddev_Fields = {
   __typename?: 'MuseumComment_stddev_fields',
  museumCommentID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type MuseumComment_Stddev_Order_By = {
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type MuseumComment_Stddev_Pop_Fields = {
   __typename?: 'MuseumComment_stddev_pop_fields',
  museumCommentID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type MuseumComment_Stddev_Pop_Order_By = {
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type MuseumComment_Stddev_Samp_Fields = {
   __typename?: 'MuseumComment_stddev_samp_fields',
  museumCommentID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type MuseumComment_Stddev_Samp_Order_By = {
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type MuseumComment_Sum_Fields = {
   __typename?: 'MuseumComment_sum_fields',
  museumCommentID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type MuseumComment_Sum_Order_By = {
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum MuseumComment_Update_Column {
  Content = 'content',
  Date = 'date',
  IsDeleted = 'isDeleted',
  MuseumCommentId = 'museumCommentID',
  MuseumId = 'museumID',
  Star = 'star',
  UserId = 'userID'
}

export type MuseumComment_Var_Pop_Fields = {
   __typename?: 'MuseumComment_var_pop_fields',
  museumCommentID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type MuseumComment_Var_Pop_Order_By = {
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type MuseumComment_Var_Samp_Fields = {
   __typename?: 'MuseumComment_var_samp_fields',
  museumCommentID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type MuseumComment_Var_Samp_Order_By = {
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type MuseumComment_Variance_Fields = {
   __typename?: 'MuseumComment_variance_fields',
  museumCommentID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type MuseumComment_Variance_Order_By = {
  museumCommentID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type MuseumEntranceType = {
   __typename?: 'MuseumEntranceType',
  MuseumPrices: Array<MuseumPrice>,
  MuseumPrices_aggregate: MuseumPrice_Aggregate,
  content: Scalars['String'],
  isDeleted: Scalars['Boolean'],
  museumEntranceTypeID: Scalars['Int'],
};


export type MuseumEntranceTypeMuseumPricesArgs = {
  distinct_on?: Maybe<Array<MuseumPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumPrice_Order_By>>,
  where?: Maybe<MuseumPrice_Bool_Exp>
};


export type MuseumEntranceTypeMuseumPrices_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumPrice_Order_By>>,
  where?: Maybe<MuseumPrice_Bool_Exp>
};

export type MuseumEntranceType_Aggregate = {
   __typename?: 'MuseumEntranceType_aggregate',
  aggregate?: Maybe<MuseumEntranceType_Aggregate_Fields>,
  nodes: Array<MuseumEntranceType>,
};

export type MuseumEntranceType_Aggregate_Fields = {
   __typename?: 'MuseumEntranceType_aggregate_fields',
  avg?: Maybe<MuseumEntranceType_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<MuseumEntranceType_Max_Fields>,
  min?: Maybe<MuseumEntranceType_Min_Fields>,
  stddev?: Maybe<MuseumEntranceType_Stddev_Fields>,
  stddev_pop?: Maybe<MuseumEntranceType_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<MuseumEntranceType_Stddev_Samp_Fields>,
  sum?: Maybe<MuseumEntranceType_Sum_Fields>,
  var_pop?: Maybe<MuseumEntranceType_Var_Pop_Fields>,
  var_samp?: Maybe<MuseumEntranceType_Var_Samp_Fields>,
  variance?: Maybe<MuseumEntranceType_Variance_Fields>,
};


export type MuseumEntranceType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<MuseumEntranceType_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type MuseumEntranceType_Aggregate_Order_By = {
  avg?: Maybe<MuseumEntranceType_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<MuseumEntranceType_Max_Order_By>,
  min?: Maybe<MuseumEntranceType_Min_Order_By>,
  stddev?: Maybe<MuseumEntranceType_Stddev_Order_By>,
  stddev_pop?: Maybe<MuseumEntranceType_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<MuseumEntranceType_Stddev_Samp_Order_By>,
  sum?: Maybe<MuseumEntranceType_Sum_Order_By>,
  var_pop?: Maybe<MuseumEntranceType_Var_Pop_Order_By>,
  var_samp?: Maybe<MuseumEntranceType_Var_Samp_Order_By>,
  variance?: Maybe<MuseumEntranceType_Variance_Order_By>,
};

export type MuseumEntranceType_Arr_Rel_Insert_Input = {
  data: Array<MuseumEntranceType_Insert_Input>,
  on_conflict?: Maybe<MuseumEntranceType_On_Conflict>,
};

export type MuseumEntranceType_Avg_Fields = {
   __typename?: 'MuseumEntranceType_avg_fields',
  museumEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumEntranceType_Avg_Order_By = {
  museumEntranceTypeID?: Maybe<Order_By>,
};

export type MuseumEntranceType_Bool_Exp = {
  MuseumPrices?: Maybe<MuseumPrice_Bool_Exp>,
  _and?: Maybe<Array<Maybe<MuseumEntranceType_Bool_Exp>>>,
  _not?: Maybe<MuseumEntranceType_Bool_Exp>,
  _or?: Maybe<Array<Maybe<MuseumEntranceType_Bool_Exp>>>,
  content?: Maybe<String_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  museumEntranceTypeID?: Maybe<Int_Comparison_Exp>,
};

export enum MuseumEntranceType_Constraint {
  MuseumEntranceTypePkey = 'MuseumEntranceType_pkey'
}

export type MuseumEntranceType_Inc_Input = {
  museumEntranceTypeID?: Maybe<Scalars['Int']>,
};

export type MuseumEntranceType_Insert_Input = {
  MuseumPrices?: Maybe<MuseumPrice_Arr_Rel_Insert_Input>,
  content?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumEntranceTypeID?: Maybe<Scalars['Int']>,
};

export type MuseumEntranceType_Max_Fields = {
   __typename?: 'MuseumEntranceType_max_fields',
  content?: Maybe<Scalars['String']>,
  museumEntranceTypeID?: Maybe<Scalars['Int']>,
};

export type MuseumEntranceType_Max_Order_By = {
  content?: Maybe<Order_By>,
  museumEntranceTypeID?: Maybe<Order_By>,
};

export type MuseumEntranceType_Min_Fields = {
   __typename?: 'MuseumEntranceType_min_fields',
  content?: Maybe<Scalars['String']>,
  museumEntranceTypeID?: Maybe<Scalars['Int']>,
};

export type MuseumEntranceType_Min_Order_By = {
  content?: Maybe<Order_By>,
  museumEntranceTypeID?: Maybe<Order_By>,
};

export type MuseumEntranceType_Mutation_Response = {
   __typename?: 'MuseumEntranceType_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<MuseumEntranceType>,
};

export type MuseumEntranceType_Obj_Rel_Insert_Input = {
  data: MuseumEntranceType_Insert_Input,
  on_conflict?: Maybe<MuseumEntranceType_On_Conflict>,
};

export type MuseumEntranceType_On_Conflict = {
  constraint: MuseumEntranceType_Constraint,
  update_columns: Array<MuseumEntranceType_Update_Column>,
  where?: Maybe<MuseumEntranceType_Bool_Exp>,
};

export type MuseumEntranceType_Order_By = {
  MuseumPrices_aggregate?: Maybe<MuseumPrice_Aggregate_Order_By>,
  content?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  museumEntranceTypeID?: Maybe<Order_By>,
};

export enum MuseumEntranceType_Select_Column {
  Content = 'content',
  IsDeleted = 'isDeleted',
  MuseumEntranceTypeId = 'museumEntranceTypeID'
}

export type MuseumEntranceType_Set_Input = {
  content?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumEntranceTypeID?: Maybe<Scalars['Int']>,
};

export type MuseumEntranceType_Stddev_Fields = {
   __typename?: 'MuseumEntranceType_stddev_fields',
  museumEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumEntranceType_Stddev_Order_By = {
  museumEntranceTypeID?: Maybe<Order_By>,
};

export type MuseumEntranceType_Stddev_Pop_Fields = {
   __typename?: 'MuseumEntranceType_stddev_pop_fields',
  museumEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumEntranceType_Stddev_Pop_Order_By = {
  museumEntranceTypeID?: Maybe<Order_By>,
};

export type MuseumEntranceType_Stddev_Samp_Fields = {
   __typename?: 'MuseumEntranceType_stddev_samp_fields',
  museumEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumEntranceType_Stddev_Samp_Order_By = {
  museumEntranceTypeID?: Maybe<Order_By>,
};

export type MuseumEntranceType_Sum_Fields = {
   __typename?: 'MuseumEntranceType_sum_fields',
  museumEntranceTypeID?: Maybe<Scalars['Int']>,
};

export type MuseumEntranceType_Sum_Order_By = {
  museumEntranceTypeID?: Maybe<Order_By>,
};

export enum MuseumEntranceType_Update_Column {
  Content = 'content',
  IsDeleted = 'isDeleted',
  MuseumEntranceTypeId = 'museumEntranceTypeID'
}

export type MuseumEntranceType_Var_Pop_Fields = {
   __typename?: 'MuseumEntranceType_var_pop_fields',
  museumEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumEntranceType_Var_Pop_Order_By = {
  museumEntranceTypeID?: Maybe<Order_By>,
};

export type MuseumEntranceType_Var_Samp_Fields = {
   __typename?: 'MuseumEntranceType_var_samp_fields',
  museumEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumEntranceType_Var_Samp_Order_By = {
  museumEntranceTypeID?: Maybe<Order_By>,
};

export type MuseumEntranceType_Variance_Fields = {
   __typename?: 'MuseumEntranceType_variance_fields',
  museumEntranceTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumEntranceType_Variance_Order_By = {
  museumEntranceTypeID?: Maybe<Order_By>,
};

export type MuseumPrice = {
   __typename?: 'MuseumPrice',
  Museum: Museum,
  MuseumEntranceType: MuseumEntranceType,
  entranceTypeID: Scalars['Int'],
  finishDate: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  museumID: Scalars['Int'],
  museumPriceID: Scalars['Int'],
  price: Scalars['Float'],
  startDate: Scalars['timestamptz'],
};

export type MuseumPrice_Aggregate = {
   __typename?: 'MuseumPrice_aggregate',
  aggregate?: Maybe<MuseumPrice_Aggregate_Fields>,
  nodes: Array<MuseumPrice>,
};

export type MuseumPrice_Aggregate_Fields = {
   __typename?: 'MuseumPrice_aggregate_fields',
  avg?: Maybe<MuseumPrice_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<MuseumPrice_Max_Fields>,
  min?: Maybe<MuseumPrice_Min_Fields>,
  stddev?: Maybe<MuseumPrice_Stddev_Fields>,
  stddev_pop?: Maybe<MuseumPrice_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<MuseumPrice_Stddev_Samp_Fields>,
  sum?: Maybe<MuseumPrice_Sum_Fields>,
  var_pop?: Maybe<MuseumPrice_Var_Pop_Fields>,
  var_samp?: Maybe<MuseumPrice_Var_Samp_Fields>,
  variance?: Maybe<MuseumPrice_Variance_Fields>,
};


export type MuseumPrice_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<MuseumPrice_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type MuseumPrice_Aggregate_Order_By = {
  avg?: Maybe<MuseumPrice_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<MuseumPrice_Max_Order_By>,
  min?: Maybe<MuseumPrice_Min_Order_By>,
  stddev?: Maybe<MuseumPrice_Stddev_Order_By>,
  stddev_pop?: Maybe<MuseumPrice_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<MuseumPrice_Stddev_Samp_Order_By>,
  sum?: Maybe<MuseumPrice_Sum_Order_By>,
  var_pop?: Maybe<MuseumPrice_Var_Pop_Order_By>,
  var_samp?: Maybe<MuseumPrice_Var_Samp_Order_By>,
  variance?: Maybe<MuseumPrice_Variance_Order_By>,
};

export type MuseumPrice_Arr_Rel_Insert_Input = {
  data: Array<MuseumPrice_Insert_Input>,
  on_conflict?: Maybe<MuseumPrice_On_Conflict>,
};

export type MuseumPrice_Avg_Fields = {
   __typename?: 'MuseumPrice_avg_fields',
  entranceTypeID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  museumPriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type MuseumPrice_Avg_Order_By = {
  entranceTypeID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type MuseumPrice_Bool_Exp = {
  Museum?: Maybe<Museum_Bool_Exp>,
  MuseumEntranceType?: Maybe<MuseumEntranceType_Bool_Exp>,
  _and?: Maybe<Array<Maybe<MuseumPrice_Bool_Exp>>>,
  _not?: Maybe<MuseumPrice_Bool_Exp>,
  _or?: Maybe<Array<Maybe<MuseumPrice_Bool_Exp>>>,
  entranceTypeID?: Maybe<Int_Comparison_Exp>,
  finishDate?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  museumID?: Maybe<Int_Comparison_Exp>,
  museumPriceID?: Maybe<Int_Comparison_Exp>,
  price?: Maybe<Float_Comparison_Exp>,
  startDate?: Maybe<Timestamptz_Comparison_Exp>,
};

export enum MuseumPrice_Constraint {
  MuseumPricePkey = 'MuseumPrice_pkey'
}

export type MuseumPrice_Inc_Input = {
  entranceTypeID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  museumPriceID?: Maybe<Scalars['Int']>,
};

export type MuseumPrice_Insert_Input = {
  Museum?: Maybe<Museum_Obj_Rel_Insert_Input>,
  MuseumEntranceType?: Maybe<MuseumEntranceType_Obj_Rel_Insert_Input>,
  entranceTypeID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumID?: Maybe<Scalars['Int']>,
  museumPriceID?: Maybe<Scalars['Int']>,
  price?: Maybe<Scalars['Float']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type MuseumPrice_Max_Fields = {
   __typename?: 'MuseumPrice_max_fields',
  entranceTypeID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  museumID?: Maybe<Scalars['Int']>,
  museumPriceID?: Maybe<Scalars['Int']>,
  price?: Maybe<Scalars['Float']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type MuseumPrice_Max_Order_By = {
  entranceTypeID?: Maybe<Order_By>,
  finishDate?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type MuseumPrice_Min_Fields = {
   __typename?: 'MuseumPrice_min_fields',
  entranceTypeID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  museumID?: Maybe<Scalars['Int']>,
  museumPriceID?: Maybe<Scalars['Int']>,
  price?: Maybe<Scalars['Float']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type MuseumPrice_Min_Order_By = {
  entranceTypeID?: Maybe<Order_By>,
  finishDate?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type MuseumPrice_Mutation_Response = {
   __typename?: 'MuseumPrice_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<MuseumPrice>,
};

export type MuseumPrice_Obj_Rel_Insert_Input = {
  data: MuseumPrice_Insert_Input,
  on_conflict?: Maybe<MuseumPrice_On_Conflict>,
};

export type MuseumPrice_On_Conflict = {
  constraint: MuseumPrice_Constraint,
  update_columns: Array<MuseumPrice_Update_Column>,
  where?: Maybe<MuseumPrice_Bool_Exp>,
};

export type MuseumPrice_Order_By = {
  Museum?: Maybe<Museum_Order_By>,
  MuseumEntranceType?: Maybe<MuseumEntranceType_Order_By>,
  entranceTypeID?: Maybe<Order_By>,
  finishDate?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export enum MuseumPrice_Select_Column {
  EntranceTypeId = 'entranceTypeID',
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  MuseumId = 'museumID',
  MuseumPriceId = 'museumPriceID',
  Price = 'price',
  StartDate = 'startDate'
}

export type MuseumPrice_Set_Input = {
  entranceTypeID?: Maybe<Scalars['Int']>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumID?: Maybe<Scalars['Int']>,
  museumPriceID?: Maybe<Scalars['Int']>,
  price?: Maybe<Scalars['Float']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type MuseumPrice_Stddev_Fields = {
   __typename?: 'MuseumPrice_stddev_fields',
  entranceTypeID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  museumPriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type MuseumPrice_Stddev_Order_By = {
  entranceTypeID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type MuseumPrice_Stddev_Pop_Fields = {
   __typename?: 'MuseumPrice_stddev_pop_fields',
  entranceTypeID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  museumPriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type MuseumPrice_Stddev_Pop_Order_By = {
  entranceTypeID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type MuseumPrice_Stddev_Samp_Fields = {
   __typename?: 'MuseumPrice_stddev_samp_fields',
  entranceTypeID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  museumPriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type MuseumPrice_Stddev_Samp_Order_By = {
  entranceTypeID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type MuseumPrice_Sum_Fields = {
   __typename?: 'MuseumPrice_sum_fields',
  entranceTypeID?: Maybe<Scalars['Int']>,
  museumID?: Maybe<Scalars['Int']>,
  museumPriceID?: Maybe<Scalars['Int']>,
  price?: Maybe<Scalars['Float']>,
};

export type MuseumPrice_Sum_Order_By = {
  entranceTypeID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export enum MuseumPrice_Update_Column {
  EntranceTypeId = 'entranceTypeID',
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  MuseumId = 'museumID',
  MuseumPriceId = 'museumPriceID',
  Price = 'price',
  StartDate = 'startDate'
}

export type MuseumPrice_Var_Pop_Fields = {
   __typename?: 'MuseumPrice_var_pop_fields',
  entranceTypeID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  museumPriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type MuseumPrice_Var_Pop_Order_By = {
  entranceTypeID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type MuseumPrice_Var_Samp_Fields = {
   __typename?: 'MuseumPrice_var_samp_fields',
  entranceTypeID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  museumPriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type MuseumPrice_Var_Samp_Order_By = {
  entranceTypeID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type MuseumPrice_Variance_Fields = {
   __typename?: 'MuseumPrice_variance_fields',
  entranceTypeID?: Maybe<Scalars['Float']>,
  museumID?: Maybe<Scalars['Float']>,
  museumPriceID?: Maybe<Scalars['Float']>,
  price?: Maybe<Scalars['Float']>,
};

export type MuseumPrice_Variance_Order_By = {
  entranceTypeID?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumPriceID?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
};

export type MuseumType = {
   __typename?: 'MuseumType',
  MuseumTypeMuseums: Array<MuseumTypeMuseum>,
  MuseumTypeMuseums_aggregate: MuseumTypeMuseum_Aggregate,
  isDeleted: Scalars['Boolean'],
  museumTypeID: Scalars['Int'],
  type: Scalars['String'],
};


export type MuseumTypeMuseumTypeMuseumsArgs = {
  distinct_on?: Maybe<Array<MuseumTypeMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumTypeMuseum_Order_By>>,
  where?: Maybe<MuseumTypeMuseum_Bool_Exp>
};


export type MuseumTypeMuseumTypeMuseums_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumTypeMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumTypeMuseum_Order_By>>,
  where?: Maybe<MuseumTypeMuseum_Bool_Exp>
};

export type MuseumType_Aggregate = {
   __typename?: 'MuseumType_aggregate',
  aggregate?: Maybe<MuseumType_Aggregate_Fields>,
  nodes: Array<MuseumType>,
};

export type MuseumType_Aggregate_Fields = {
   __typename?: 'MuseumType_aggregate_fields',
  avg?: Maybe<MuseumType_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<MuseumType_Max_Fields>,
  min?: Maybe<MuseumType_Min_Fields>,
  stddev?: Maybe<MuseumType_Stddev_Fields>,
  stddev_pop?: Maybe<MuseumType_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<MuseumType_Stddev_Samp_Fields>,
  sum?: Maybe<MuseumType_Sum_Fields>,
  var_pop?: Maybe<MuseumType_Var_Pop_Fields>,
  var_samp?: Maybe<MuseumType_Var_Samp_Fields>,
  variance?: Maybe<MuseumType_Variance_Fields>,
};


export type MuseumType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<MuseumType_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type MuseumType_Aggregate_Order_By = {
  avg?: Maybe<MuseumType_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<MuseumType_Max_Order_By>,
  min?: Maybe<MuseumType_Min_Order_By>,
  stddev?: Maybe<MuseumType_Stddev_Order_By>,
  stddev_pop?: Maybe<MuseumType_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<MuseumType_Stddev_Samp_Order_By>,
  sum?: Maybe<MuseumType_Sum_Order_By>,
  var_pop?: Maybe<MuseumType_Var_Pop_Order_By>,
  var_samp?: Maybe<MuseumType_Var_Samp_Order_By>,
  variance?: Maybe<MuseumType_Variance_Order_By>,
};

export type MuseumType_Arr_Rel_Insert_Input = {
  data: Array<MuseumType_Insert_Input>,
  on_conflict?: Maybe<MuseumType_On_Conflict>,
};

export type MuseumType_Avg_Fields = {
   __typename?: 'MuseumType_avg_fields',
  museumTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumType_Avg_Order_By = {
  museumTypeID?: Maybe<Order_By>,
};

export type MuseumType_Bool_Exp = {
  MuseumTypeMuseums?: Maybe<MuseumTypeMuseum_Bool_Exp>,
  _and?: Maybe<Array<Maybe<MuseumType_Bool_Exp>>>,
  _not?: Maybe<MuseumType_Bool_Exp>,
  _or?: Maybe<Array<Maybe<MuseumType_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  museumTypeID?: Maybe<Int_Comparison_Exp>,
  type?: Maybe<String_Comparison_Exp>,
};

export enum MuseumType_Constraint {
  MuseumTypePkey = 'MuseumType_pkey',
  MuseumTypeTypeKey = 'MuseumType_type_key'
}

export type MuseumType_Inc_Input = {
  museumTypeID?: Maybe<Scalars['Int']>,
};

export type MuseumType_Insert_Input = {
  MuseumTypeMuseums?: Maybe<MuseumTypeMuseum_Arr_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type MuseumType_Max_Fields = {
   __typename?: 'MuseumType_max_fields',
  museumTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type MuseumType_Max_Order_By = {
  museumTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export type MuseumType_Min_Fields = {
   __typename?: 'MuseumType_min_fields',
  museumTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type MuseumType_Min_Order_By = {
  museumTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export type MuseumType_Mutation_Response = {
   __typename?: 'MuseumType_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<MuseumType>,
};

export type MuseumType_Obj_Rel_Insert_Input = {
  data: MuseumType_Insert_Input,
  on_conflict?: Maybe<MuseumType_On_Conflict>,
};

export type MuseumType_On_Conflict = {
  constraint: MuseumType_Constraint,
  update_columns: Array<MuseumType_Update_Column>,
  where?: Maybe<MuseumType_Bool_Exp>,
};

export type MuseumType_Order_By = {
  MuseumTypeMuseums_aggregate?: Maybe<MuseumTypeMuseum_Aggregate_Order_By>,
  isDeleted?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export enum MuseumType_Select_Column {
  IsDeleted = 'isDeleted',
  MuseumTypeId = 'museumTypeID',
  Type = 'type'
}

export type MuseumType_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type MuseumType_Stddev_Fields = {
   __typename?: 'MuseumType_stddev_fields',
  museumTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumType_Stddev_Order_By = {
  museumTypeID?: Maybe<Order_By>,
};

export type MuseumType_Stddev_Pop_Fields = {
   __typename?: 'MuseumType_stddev_pop_fields',
  museumTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumType_Stddev_Pop_Order_By = {
  museumTypeID?: Maybe<Order_By>,
};

export type MuseumType_Stddev_Samp_Fields = {
   __typename?: 'MuseumType_stddev_samp_fields',
  museumTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumType_Stddev_Samp_Order_By = {
  museumTypeID?: Maybe<Order_By>,
};

export type MuseumType_Sum_Fields = {
   __typename?: 'MuseumType_sum_fields',
  museumTypeID?: Maybe<Scalars['Int']>,
};

export type MuseumType_Sum_Order_By = {
  museumTypeID?: Maybe<Order_By>,
};

export enum MuseumType_Update_Column {
  IsDeleted = 'isDeleted',
  MuseumTypeId = 'museumTypeID',
  Type = 'type'
}

export type MuseumType_Var_Pop_Fields = {
   __typename?: 'MuseumType_var_pop_fields',
  museumTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumType_Var_Pop_Order_By = {
  museumTypeID?: Maybe<Order_By>,
};

export type MuseumType_Var_Samp_Fields = {
   __typename?: 'MuseumType_var_samp_fields',
  museumTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumType_Var_Samp_Order_By = {
  museumTypeID?: Maybe<Order_By>,
};

export type MuseumType_Variance_Fields = {
   __typename?: 'MuseumType_variance_fields',
  museumTypeID?: Maybe<Scalars['Float']>,
};

export type MuseumType_Variance_Order_By = {
  museumTypeID?: Maybe<Order_By>,
};

export type MuseumTypeMuseum = {
   __typename?: 'MuseumTypeMuseum',
  Museum: Museum,
  MuseumType: MuseumType,
  isDeleted: Scalars['Boolean'],
  museumID: Scalars['Int'],
  museumTypeID: Scalars['Int'],
  museumTypeMuseumID: Scalars['Int'],
};

export type MuseumTypeMuseum_Aggregate = {
   __typename?: 'MuseumTypeMuseum_aggregate',
  aggregate?: Maybe<MuseumTypeMuseum_Aggregate_Fields>,
  nodes: Array<MuseumTypeMuseum>,
};

export type MuseumTypeMuseum_Aggregate_Fields = {
   __typename?: 'MuseumTypeMuseum_aggregate_fields',
  avg?: Maybe<MuseumTypeMuseum_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<MuseumTypeMuseum_Max_Fields>,
  min?: Maybe<MuseumTypeMuseum_Min_Fields>,
  stddev?: Maybe<MuseumTypeMuseum_Stddev_Fields>,
  stddev_pop?: Maybe<MuseumTypeMuseum_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<MuseumTypeMuseum_Stddev_Samp_Fields>,
  sum?: Maybe<MuseumTypeMuseum_Sum_Fields>,
  var_pop?: Maybe<MuseumTypeMuseum_Var_Pop_Fields>,
  var_samp?: Maybe<MuseumTypeMuseum_Var_Samp_Fields>,
  variance?: Maybe<MuseumTypeMuseum_Variance_Fields>,
};


export type MuseumTypeMuseum_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<MuseumTypeMuseum_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type MuseumTypeMuseum_Aggregate_Order_By = {
  avg?: Maybe<MuseumTypeMuseum_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<MuseumTypeMuseum_Max_Order_By>,
  min?: Maybe<MuseumTypeMuseum_Min_Order_By>,
  stddev?: Maybe<MuseumTypeMuseum_Stddev_Order_By>,
  stddev_pop?: Maybe<MuseumTypeMuseum_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<MuseumTypeMuseum_Stddev_Samp_Order_By>,
  sum?: Maybe<MuseumTypeMuseum_Sum_Order_By>,
  var_pop?: Maybe<MuseumTypeMuseum_Var_Pop_Order_By>,
  var_samp?: Maybe<MuseumTypeMuseum_Var_Samp_Order_By>,
  variance?: Maybe<MuseumTypeMuseum_Variance_Order_By>,
};

export type MuseumTypeMuseum_Arr_Rel_Insert_Input = {
  data: Array<MuseumTypeMuseum_Insert_Input>,
  on_conflict?: Maybe<MuseumTypeMuseum_On_Conflict>,
};

export type MuseumTypeMuseum_Avg_Fields = {
   __typename?: 'MuseumTypeMuseum_avg_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumTypeID?: Maybe<Scalars['Float']>,
  museumTypeMuseumID?: Maybe<Scalars['Float']>,
};

export type MuseumTypeMuseum_Avg_Order_By = {
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export type MuseumTypeMuseum_Bool_Exp = {
  Museum?: Maybe<Museum_Bool_Exp>,
  MuseumType?: Maybe<MuseumType_Bool_Exp>,
  _and?: Maybe<Array<Maybe<MuseumTypeMuseum_Bool_Exp>>>,
  _not?: Maybe<MuseumTypeMuseum_Bool_Exp>,
  _or?: Maybe<Array<Maybe<MuseumTypeMuseum_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  museumID?: Maybe<Int_Comparison_Exp>,
  museumTypeID?: Maybe<Int_Comparison_Exp>,
  museumTypeMuseumID?: Maybe<Int_Comparison_Exp>,
};

export enum MuseumTypeMuseum_Constraint {
  MuseumTypeMuseumPkey = 'MuseumTypeMuseum_pkey'
}

export type MuseumTypeMuseum_Inc_Input = {
  museumID?: Maybe<Scalars['Int']>,
  museumTypeID?: Maybe<Scalars['Int']>,
  museumTypeMuseumID?: Maybe<Scalars['Int']>,
};

export type MuseumTypeMuseum_Insert_Input = {
  Museum?: Maybe<Museum_Obj_Rel_Insert_Input>,
  MuseumType?: Maybe<MuseumType_Obj_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumID?: Maybe<Scalars['Int']>,
  museumTypeID?: Maybe<Scalars['Int']>,
  museumTypeMuseumID?: Maybe<Scalars['Int']>,
};

export type MuseumTypeMuseum_Max_Fields = {
   __typename?: 'MuseumTypeMuseum_max_fields',
  museumID?: Maybe<Scalars['Int']>,
  museumTypeID?: Maybe<Scalars['Int']>,
  museumTypeMuseumID?: Maybe<Scalars['Int']>,
};

export type MuseumTypeMuseum_Max_Order_By = {
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export type MuseumTypeMuseum_Min_Fields = {
   __typename?: 'MuseumTypeMuseum_min_fields',
  museumID?: Maybe<Scalars['Int']>,
  museumTypeID?: Maybe<Scalars['Int']>,
  museumTypeMuseumID?: Maybe<Scalars['Int']>,
};

export type MuseumTypeMuseum_Min_Order_By = {
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export type MuseumTypeMuseum_Mutation_Response = {
   __typename?: 'MuseumTypeMuseum_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<MuseumTypeMuseum>,
};

export type MuseumTypeMuseum_Obj_Rel_Insert_Input = {
  data: MuseumTypeMuseum_Insert_Input,
  on_conflict?: Maybe<MuseumTypeMuseum_On_Conflict>,
};

export type MuseumTypeMuseum_On_Conflict = {
  constraint: MuseumTypeMuseum_Constraint,
  update_columns: Array<MuseumTypeMuseum_Update_Column>,
  where?: Maybe<MuseumTypeMuseum_Bool_Exp>,
};

export type MuseumTypeMuseum_Order_By = {
  Museum?: Maybe<Museum_Order_By>,
  MuseumType?: Maybe<MuseumType_Order_By>,
  isDeleted?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export enum MuseumTypeMuseum_Select_Column {
  IsDeleted = 'isDeleted',
  MuseumId = 'museumID',
  MuseumTypeId = 'museumTypeID',
  MuseumTypeMuseumId = 'museumTypeMuseumID'
}

export type MuseumTypeMuseum_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumID?: Maybe<Scalars['Int']>,
  museumTypeID?: Maybe<Scalars['Int']>,
  museumTypeMuseumID?: Maybe<Scalars['Int']>,
};

export type MuseumTypeMuseum_Stddev_Fields = {
   __typename?: 'MuseumTypeMuseum_stddev_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumTypeID?: Maybe<Scalars['Float']>,
  museumTypeMuseumID?: Maybe<Scalars['Float']>,
};

export type MuseumTypeMuseum_Stddev_Order_By = {
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export type MuseumTypeMuseum_Stddev_Pop_Fields = {
   __typename?: 'MuseumTypeMuseum_stddev_pop_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumTypeID?: Maybe<Scalars['Float']>,
  museumTypeMuseumID?: Maybe<Scalars['Float']>,
};

export type MuseumTypeMuseum_Stddev_Pop_Order_By = {
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export type MuseumTypeMuseum_Stddev_Samp_Fields = {
   __typename?: 'MuseumTypeMuseum_stddev_samp_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumTypeID?: Maybe<Scalars['Float']>,
  museumTypeMuseumID?: Maybe<Scalars['Float']>,
};

export type MuseumTypeMuseum_Stddev_Samp_Order_By = {
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export type MuseumTypeMuseum_Sum_Fields = {
   __typename?: 'MuseumTypeMuseum_sum_fields',
  museumID?: Maybe<Scalars['Int']>,
  museumTypeID?: Maybe<Scalars['Int']>,
  museumTypeMuseumID?: Maybe<Scalars['Int']>,
};

export type MuseumTypeMuseum_Sum_Order_By = {
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export enum MuseumTypeMuseum_Update_Column {
  IsDeleted = 'isDeleted',
  MuseumId = 'museumID',
  MuseumTypeId = 'museumTypeID',
  MuseumTypeMuseumId = 'museumTypeMuseumID'
}

export type MuseumTypeMuseum_Var_Pop_Fields = {
   __typename?: 'MuseumTypeMuseum_var_pop_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumTypeID?: Maybe<Scalars['Float']>,
  museumTypeMuseumID?: Maybe<Scalars['Float']>,
};

export type MuseumTypeMuseum_Var_Pop_Order_By = {
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export type MuseumTypeMuseum_Var_Samp_Fields = {
   __typename?: 'MuseumTypeMuseum_var_samp_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumTypeID?: Maybe<Scalars['Float']>,
  museumTypeMuseumID?: Maybe<Scalars['Float']>,
};

export type MuseumTypeMuseum_Var_Samp_Order_By = {
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export type MuseumTypeMuseum_Variance_Fields = {
   __typename?: 'MuseumTypeMuseum_variance_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumTypeID?: Maybe<Scalars['Float']>,
  museumTypeMuseumID?: Maybe<Scalars['Float']>,
};

export type MuseumTypeMuseum_Variance_Order_By = {
  museumID?: Maybe<Order_By>,
  museumTypeID?: Maybe<Order_By>,
  museumTypeMuseumID?: Maybe<Order_By>,
};

export type MuseumWorkingDay = {
   __typename?: 'MuseumWorkingDay',
  Day: Day,
  MuseumWorkingDaySchedules: Array<MuseumWorkingDaySchedule>,
  MuseumWorkingDaySchedules_aggregate: MuseumWorkingDaySchedule_Aggregate,
  closeHour: Scalars['timetz'],
  dayID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  museumWorkingDayID: Scalars['Int'],
  openHour: Scalars['timetz'],
};


export type MuseumWorkingDayMuseumWorkingDaySchedulesArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDaySchedule_Order_By>>,
  where?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>
};


export type MuseumWorkingDayMuseumWorkingDaySchedules_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDaySchedule_Order_By>>,
  where?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>
};

export type MuseumWorkingDay_Aggregate = {
   __typename?: 'MuseumWorkingDay_aggregate',
  aggregate?: Maybe<MuseumWorkingDay_Aggregate_Fields>,
  nodes: Array<MuseumWorkingDay>,
};

export type MuseumWorkingDay_Aggregate_Fields = {
   __typename?: 'MuseumWorkingDay_aggregate_fields',
  avg?: Maybe<MuseumWorkingDay_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<MuseumWorkingDay_Max_Fields>,
  min?: Maybe<MuseumWorkingDay_Min_Fields>,
  stddev?: Maybe<MuseumWorkingDay_Stddev_Fields>,
  stddev_pop?: Maybe<MuseumWorkingDay_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<MuseumWorkingDay_Stddev_Samp_Fields>,
  sum?: Maybe<MuseumWorkingDay_Sum_Fields>,
  var_pop?: Maybe<MuseumWorkingDay_Var_Pop_Fields>,
  var_samp?: Maybe<MuseumWorkingDay_Var_Samp_Fields>,
  variance?: Maybe<MuseumWorkingDay_Variance_Fields>,
};


export type MuseumWorkingDay_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<MuseumWorkingDay_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type MuseumWorkingDay_Aggregate_Order_By = {
  avg?: Maybe<MuseumWorkingDay_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<MuseumWorkingDay_Max_Order_By>,
  min?: Maybe<MuseumWorkingDay_Min_Order_By>,
  stddev?: Maybe<MuseumWorkingDay_Stddev_Order_By>,
  stddev_pop?: Maybe<MuseumWorkingDay_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<MuseumWorkingDay_Stddev_Samp_Order_By>,
  sum?: Maybe<MuseumWorkingDay_Sum_Order_By>,
  var_pop?: Maybe<MuseumWorkingDay_Var_Pop_Order_By>,
  var_samp?: Maybe<MuseumWorkingDay_Var_Samp_Order_By>,
  variance?: Maybe<MuseumWorkingDay_Variance_Order_By>,
};

export type MuseumWorkingDay_Arr_Rel_Insert_Input = {
  data: Array<MuseumWorkingDay_Insert_Input>,
  on_conflict?: Maybe<MuseumWorkingDay_On_Conflict>,
};

export type MuseumWorkingDay_Avg_Fields = {
   __typename?: 'MuseumWorkingDay_avg_fields',
  dayID?: Maybe<Scalars['Float']>,
  museumWorkingDayID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDay_Avg_Order_By = {
  dayID?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
};

export type MuseumWorkingDay_Bool_Exp = {
  Day?: Maybe<Day_Bool_Exp>,
  MuseumWorkingDaySchedules?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>,
  _and?: Maybe<Array<Maybe<MuseumWorkingDay_Bool_Exp>>>,
  _not?: Maybe<MuseumWorkingDay_Bool_Exp>,
  _or?: Maybe<Array<Maybe<MuseumWorkingDay_Bool_Exp>>>,
  closeHour?: Maybe<Timetz_Comparison_Exp>,
  dayID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  museumWorkingDayID?: Maybe<Int_Comparison_Exp>,
  openHour?: Maybe<Timetz_Comparison_Exp>,
};

export enum MuseumWorkingDay_Constraint {
  MuseumWorkingDayPkey = 'MuseumWorkingDay_pkey'
}

export type MuseumWorkingDay_Inc_Input = {
  dayID?: Maybe<Scalars['Int']>,
  museumWorkingDayID?: Maybe<Scalars['Int']>,
};

export type MuseumWorkingDay_Insert_Input = {
  Day?: Maybe<Day_Obj_Rel_Insert_Input>,
  MuseumWorkingDaySchedules?: Maybe<MuseumWorkingDaySchedule_Arr_Rel_Insert_Input>,
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumWorkingDayID?: Maybe<Scalars['Int']>,
  openHour?: Maybe<Scalars['timetz']>,
};

export type MuseumWorkingDay_Max_Fields = {
   __typename?: 'MuseumWorkingDay_max_fields',
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  museumWorkingDayID?: Maybe<Scalars['Int']>,
  openHour?: Maybe<Scalars['timetz']>,
};

export type MuseumWorkingDay_Max_Order_By = {
  closeHour?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
  openHour?: Maybe<Order_By>,
};

export type MuseumWorkingDay_Min_Fields = {
   __typename?: 'MuseumWorkingDay_min_fields',
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  museumWorkingDayID?: Maybe<Scalars['Int']>,
  openHour?: Maybe<Scalars['timetz']>,
};

export type MuseumWorkingDay_Min_Order_By = {
  closeHour?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
  openHour?: Maybe<Order_By>,
};

export type MuseumWorkingDay_Mutation_Response = {
   __typename?: 'MuseumWorkingDay_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<MuseumWorkingDay>,
};

export type MuseumWorkingDay_Obj_Rel_Insert_Input = {
  data: MuseumWorkingDay_Insert_Input,
  on_conflict?: Maybe<MuseumWorkingDay_On_Conflict>,
};

export type MuseumWorkingDay_On_Conflict = {
  constraint: MuseumWorkingDay_Constraint,
  update_columns: Array<MuseumWorkingDay_Update_Column>,
  where?: Maybe<MuseumWorkingDay_Bool_Exp>,
};

export type MuseumWorkingDay_Order_By = {
  Day?: Maybe<Day_Order_By>,
  MuseumWorkingDaySchedules_aggregate?: Maybe<MuseumWorkingDaySchedule_Aggregate_Order_By>,
  closeHour?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
  openHour?: Maybe<Order_By>,
};

export enum MuseumWorkingDay_Select_Column {
  CloseHour = 'closeHour',
  DayId = 'dayID',
  IsDeleted = 'isDeleted',
  MuseumWorkingDayId = 'museumWorkingDayID',
  OpenHour = 'openHour'
}

export type MuseumWorkingDay_Set_Input = {
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumWorkingDayID?: Maybe<Scalars['Int']>,
  openHour?: Maybe<Scalars['timetz']>,
};

export type MuseumWorkingDay_Stddev_Fields = {
   __typename?: 'MuseumWorkingDay_stddev_fields',
  dayID?: Maybe<Scalars['Float']>,
  museumWorkingDayID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDay_Stddev_Order_By = {
  dayID?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
};

export type MuseumWorkingDay_Stddev_Pop_Fields = {
   __typename?: 'MuseumWorkingDay_stddev_pop_fields',
  dayID?: Maybe<Scalars['Float']>,
  museumWorkingDayID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDay_Stddev_Pop_Order_By = {
  dayID?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
};

export type MuseumWorkingDay_Stddev_Samp_Fields = {
   __typename?: 'MuseumWorkingDay_stddev_samp_fields',
  dayID?: Maybe<Scalars['Float']>,
  museumWorkingDayID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDay_Stddev_Samp_Order_By = {
  dayID?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
};

export type MuseumWorkingDay_Sum_Fields = {
   __typename?: 'MuseumWorkingDay_sum_fields',
  dayID?: Maybe<Scalars['Int']>,
  museumWorkingDayID?: Maybe<Scalars['Int']>,
};

export type MuseumWorkingDay_Sum_Order_By = {
  dayID?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
};

export enum MuseumWorkingDay_Update_Column {
  CloseHour = 'closeHour',
  DayId = 'dayID',
  IsDeleted = 'isDeleted',
  MuseumWorkingDayId = 'museumWorkingDayID',
  OpenHour = 'openHour'
}

export type MuseumWorkingDay_Var_Pop_Fields = {
   __typename?: 'MuseumWorkingDay_var_pop_fields',
  dayID?: Maybe<Scalars['Float']>,
  museumWorkingDayID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDay_Var_Pop_Order_By = {
  dayID?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
};

export type MuseumWorkingDay_Var_Samp_Fields = {
   __typename?: 'MuseumWorkingDay_var_samp_fields',
  dayID?: Maybe<Scalars['Float']>,
  museumWorkingDayID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDay_Var_Samp_Order_By = {
  dayID?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
};

export type MuseumWorkingDay_Variance_Fields = {
   __typename?: 'MuseumWorkingDay_variance_fields',
  dayID?: Maybe<Scalars['Float']>,
  museumWorkingDayID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDay_Variance_Order_By = {
  dayID?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
};

export type MuseumWorkingDaySchedule = {
   __typename?: 'MuseumWorkingDaySchedule',
  MuseumWorkingDay: MuseumWorkingDay,
  MuseumWorkingSchedule: MuseumWorkingSchedule,
  isDeleted: Scalars['Boolean'],
  museumWorkingDayID: Scalars['Int'],
  museumWorkingDayScheduleID: Scalars['Int'],
  museumWorkingScheduleID: Scalars['Int'],
};

export type MuseumWorkingDaySchedule_Aggregate = {
   __typename?: 'MuseumWorkingDaySchedule_aggregate',
  aggregate?: Maybe<MuseumWorkingDaySchedule_Aggregate_Fields>,
  nodes: Array<MuseumWorkingDaySchedule>,
};

export type MuseumWorkingDaySchedule_Aggregate_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_aggregate_fields',
  avg?: Maybe<MuseumWorkingDaySchedule_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<MuseumWorkingDaySchedule_Max_Fields>,
  min?: Maybe<MuseumWorkingDaySchedule_Min_Fields>,
  stddev?: Maybe<MuseumWorkingDaySchedule_Stddev_Fields>,
  stddev_pop?: Maybe<MuseumWorkingDaySchedule_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<MuseumWorkingDaySchedule_Stddev_Samp_Fields>,
  sum?: Maybe<MuseumWorkingDaySchedule_Sum_Fields>,
  var_pop?: Maybe<MuseumWorkingDaySchedule_Var_Pop_Fields>,
  var_samp?: Maybe<MuseumWorkingDaySchedule_Var_Samp_Fields>,
  variance?: Maybe<MuseumWorkingDaySchedule_Variance_Fields>,
};


export type MuseumWorkingDaySchedule_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<MuseumWorkingDaySchedule_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type MuseumWorkingDaySchedule_Aggregate_Order_By = {
  avg?: Maybe<MuseumWorkingDaySchedule_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<MuseumWorkingDaySchedule_Max_Order_By>,
  min?: Maybe<MuseumWorkingDaySchedule_Min_Order_By>,
  stddev?: Maybe<MuseumWorkingDaySchedule_Stddev_Order_By>,
  stddev_pop?: Maybe<MuseumWorkingDaySchedule_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<MuseumWorkingDaySchedule_Stddev_Samp_Order_By>,
  sum?: Maybe<MuseumWorkingDaySchedule_Sum_Order_By>,
  var_pop?: Maybe<MuseumWorkingDaySchedule_Var_Pop_Order_By>,
  var_samp?: Maybe<MuseumWorkingDaySchedule_Var_Samp_Order_By>,
  variance?: Maybe<MuseumWorkingDaySchedule_Variance_Order_By>,
};

export type MuseumWorkingDaySchedule_Arr_Rel_Insert_Input = {
  data: Array<MuseumWorkingDaySchedule_Insert_Input>,
  on_conflict?: Maybe<MuseumWorkingDaySchedule_On_Conflict>,
};

export type MuseumWorkingDaySchedule_Avg_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_avg_fields',
  museumWorkingDayID?: Maybe<Scalars['Float']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDaySchedule_Avg_Order_By = {
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingDaySchedule_Bool_Exp = {
  MuseumWorkingDay?: Maybe<MuseumWorkingDay_Bool_Exp>,
  MuseumWorkingSchedule?: Maybe<MuseumWorkingSchedule_Bool_Exp>,
  _and?: Maybe<Array<Maybe<MuseumWorkingDaySchedule_Bool_Exp>>>,
  _not?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>,
  _or?: Maybe<Array<Maybe<MuseumWorkingDaySchedule_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  museumWorkingDayID?: Maybe<Int_Comparison_Exp>,
  museumWorkingDayScheduleID?: Maybe<Int_Comparison_Exp>,
  museumWorkingScheduleID?: Maybe<Int_Comparison_Exp>,
};

export enum MuseumWorkingDaySchedule_Constraint {
  MuseumWorkingDaySchedulePkey = 'MuseumWorkingDaySchedule_pkey'
}

export type MuseumWorkingDaySchedule_Inc_Input = {
  museumWorkingDayID?: Maybe<Scalars['Int']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type MuseumWorkingDaySchedule_Insert_Input = {
  MuseumWorkingDay?: Maybe<MuseumWorkingDay_Obj_Rel_Insert_Input>,
  MuseumWorkingSchedule?: Maybe<MuseumWorkingSchedule_Obj_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumWorkingDayID?: Maybe<Scalars['Int']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type MuseumWorkingDaySchedule_Max_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_max_fields',
  museumWorkingDayID?: Maybe<Scalars['Int']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type MuseumWorkingDaySchedule_Max_Order_By = {
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingDaySchedule_Min_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_min_fields',
  museumWorkingDayID?: Maybe<Scalars['Int']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type MuseumWorkingDaySchedule_Min_Order_By = {
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingDaySchedule_Mutation_Response = {
   __typename?: 'MuseumWorkingDaySchedule_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<MuseumWorkingDaySchedule>,
};

export type MuseumWorkingDaySchedule_Obj_Rel_Insert_Input = {
  data: MuseumWorkingDaySchedule_Insert_Input,
  on_conflict?: Maybe<MuseumWorkingDaySchedule_On_Conflict>,
};

export type MuseumWorkingDaySchedule_On_Conflict = {
  constraint: MuseumWorkingDaySchedule_Constraint,
  update_columns: Array<MuseumWorkingDaySchedule_Update_Column>,
  where?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>,
};

export type MuseumWorkingDaySchedule_Order_By = {
  MuseumWorkingDay?: Maybe<MuseumWorkingDay_Order_By>,
  MuseumWorkingSchedule?: Maybe<MuseumWorkingSchedule_Order_By>,
  isDeleted?: Maybe<Order_By>,
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export enum MuseumWorkingDaySchedule_Select_Column {
  IsDeleted = 'isDeleted',
  MuseumWorkingDayId = 'museumWorkingDayID',
  MuseumWorkingDayScheduleId = 'museumWorkingDayScheduleID',
  MuseumWorkingScheduleId = 'museumWorkingScheduleID'
}

export type MuseumWorkingDaySchedule_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumWorkingDayID?: Maybe<Scalars['Int']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type MuseumWorkingDaySchedule_Stddev_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_stddev_fields',
  museumWorkingDayID?: Maybe<Scalars['Float']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDaySchedule_Stddev_Order_By = {
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingDaySchedule_Stddev_Pop_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_stddev_pop_fields',
  museumWorkingDayID?: Maybe<Scalars['Float']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDaySchedule_Stddev_Pop_Order_By = {
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingDaySchedule_Stddev_Samp_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_stddev_samp_fields',
  museumWorkingDayID?: Maybe<Scalars['Float']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDaySchedule_Stddev_Samp_Order_By = {
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingDaySchedule_Sum_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_sum_fields',
  museumWorkingDayID?: Maybe<Scalars['Int']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type MuseumWorkingDaySchedule_Sum_Order_By = {
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export enum MuseumWorkingDaySchedule_Update_Column {
  IsDeleted = 'isDeleted',
  MuseumWorkingDayId = 'museumWorkingDayID',
  MuseumWorkingDayScheduleId = 'museumWorkingDayScheduleID',
  MuseumWorkingScheduleId = 'museumWorkingScheduleID'
}

export type MuseumWorkingDaySchedule_Var_Pop_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_var_pop_fields',
  museumWorkingDayID?: Maybe<Scalars['Float']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDaySchedule_Var_Pop_Order_By = {
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingDaySchedule_Var_Samp_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_var_samp_fields',
  museumWorkingDayID?: Maybe<Scalars['Float']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDaySchedule_Var_Samp_Order_By = {
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingDaySchedule_Variance_Fields = {
   __typename?: 'MuseumWorkingDaySchedule_variance_fields',
  museumWorkingDayID?: Maybe<Scalars['Float']>,
  museumWorkingDayScheduleID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingDaySchedule_Variance_Order_By = {
  museumWorkingDayID?: Maybe<Order_By>,
  museumWorkingDayScheduleID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingSchedule = {
   __typename?: 'MuseumWorkingSchedule',
  Museum: Museum,
  MuseumWorkingDaySchedules: Array<MuseumWorkingDaySchedule>,
  MuseumWorkingDaySchedules_aggregate: MuseumWorkingDaySchedule_Aggregate,
  finishDate: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  museumID: Scalars['Int'],
  museumWorkingScheduleID: Scalars['Int'],
  startDate: Scalars['timestamptz'],
};


export type MuseumWorkingScheduleMuseumWorkingDaySchedulesArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDaySchedule_Order_By>>,
  where?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>
};


export type MuseumWorkingScheduleMuseumWorkingDaySchedules_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDaySchedule_Order_By>>,
  where?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>
};

export type MuseumWorkingSchedule_Aggregate = {
   __typename?: 'MuseumWorkingSchedule_aggregate',
  aggregate?: Maybe<MuseumWorkingSchedule_Aggregate_Fields>,
  nodes: Array<MuseumWorkingSchedule>,
};

export type MuseumWorkingSchedule_Aggregate_Fields = {
   __typename?: 'MuseumWorkingSchedule_aggregate_fields',
  avg?: Maybe<MuseumWorkingSchedule_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<MuseumWorkingSchedule_Max_Fields>,
  min?: Maybe<MuseumWorkingSchedule_Min_Fields>,
  stddev?: Maybe<MuseumWorkingSchedule_Stddev_Fields>,
  stddev_pop?: Maybe<MuseumWorkingSchedule_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<MuseumWorkingSchedule_Stddev_Samp_Fields>,
  sum?: Maybe<MuseumWorkingSchedule_Sum_Fields>,
  var_pop?: Maybe<MuseumWorkingSchedule_Var_Pop_Fields>,
  var_samp?: Maybe<MuseumWorkingSchedule_Var_Samp_Fields>,
  variance?: Maybe<MuseumWorkingSchedule_Variance_Fields>,
};


export type MuseumWorkingSchedule_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<MuseumWorkingSchedule_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type MuseumWorkingSchedule_Aggregate_Order_By = {
  avg?: Maybe<MuseumWorkingSchedule_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<MuseumWorkingSchedule_Max_Order_By>,
  min?: Maybe<MuseumWorkingSchedule_Min_Order_By>,
  stddev?: Maybe<MuseumWorkingSchedule_Stddev_Order_By>,
  stddev_pop?: Maybe<MuseumWorkingSchedule_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<MuseumWorkingSchedule_Stddev_Samp_Order_By>,
  sum?: Maybe<MuseumWorkingSchedule_Sum_Order_By>,
  var_pop?: Maybe<MuseumWorkingSchedule_Var_Pop_Order_By>,
  var_samp?: Maybe<MuseumWorkingSchedule_Var_Samp_Order_By>,
  variance?: Maybe<MuseumWorkingSchedule_Variance_Order_By>,
};

export type MuseumWorkingSchedule_Arr_Rel_Insert_Input = {
  data: Array<MuseumWorkingSchedule_Insert_Input>,
  on_conflict?: Maybe<MuseumWorkingSchedule_On_Conflict>,
};

export type MuseumWorkingSchedule_Avg_Fields = {
   __typename?: 'MuseumWorkingSchedule_avg_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingSchedule_Avg_Order_By = {
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingSchedule_Bool_Exp = {
  Museum?: Maybe<Museum_Bool_Exp>,
  MuseumWorkingDaySchedules?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>,
  _and?: Maybe<Array<Maybe<MuseumWorkingSchedule_Bool_Exp>>>,
  _not?: Maybe<MuseumWorkingSchedule_Bool_Exp>,
  _or?: Maybe<Array<Maybe<MuseumWorkingSchedule_Bool_Exp>>>,
  finishDate?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  museumID?: Maybe<Int_Comparison_Exp>,
  museumWorkingScheduleID?: Maybe<Int_Comparison_Exp>,
  startDate?: Maybe<Timestamptz_Comparison_Exp>,
};

export enum MuseumWorkingSchedule_Constraint {
  MuseumWorkingSchedulePkey = 'MuseumWorkingSchedule_pkey'
}

export type MuseumWorkingSchedule_Inc_Input = {
  museumID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type MuseumWorkingSchedule_Insert_Input = {
  Museum?: Maybe<Museum_Obj_Rel_Insert_Input>,
  MuseumWorkingDaySchedules?: Maybe<MuseumWorkingDaySchedule_Arr_Rel_Insert_Input>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type MuseumWorkingSchedule_Max_Fields = {
   __typename?: 'MuseumWorkingSchedule_max_fields',
  finishDate?: Maybe<Scalars['timestamptz']>,
  museumID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type MuseumWorkingSchedule_Max_Order_By = {
  finishDate?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type MuseumWorkingSchedule_Min_Fields = {
   __typename?: 'MuseumWorkingSchedule_min_fields',
  finishDate?: Maybe<Scalars['timestamptz']>,
  museumID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type MuseumWorkingSchedule_Min_Order_By = {
  finishDate?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type MuseumWorkingSchedule_Mutation_Response = {
   __typename?: 'MuseumWorkingSchedule_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<MuseumWorkingSchedule>,
};

export type MuseumWorkingSchedule_Obj_Rel_Insert_Input = {
  data: MuseumWorkingSchedule_Insert_Input,
  on_conflict?: Maybe<MuseumWorkingSchedule_On_Conflict>,
};

export type MuseumWorkingSchedule_On_Conflict = {
  constraint: MuseumWorkingSchedule_Constraint,
  update_columns: Array<MuseumWorkingSchedule_Update_Column>,
  where?: Maybe<MuseumWorkingSchedule_Bool_Exp>,
};

export type MuseumWorkingSchedule_Order_By = {
  Museum?: Maybe<Museum_Order_By>,
  MuseumWorkingDaySchedules_aggregate?: Maybe<MuseumWorkingDaySchedule_Aggregate_Order_By>,
  finishDate?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export enum MuseumWorkingSchedule_Select_Column {
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  MuseumId = 'museumID',
  MuseumWorkingScheduleId = 'museumWorkingScheduleID',
  StartDate = 'startDate'
}

export type MuseumWorkingSchedule_Set_Input = {
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type MuseumWorkingSchedule_Stddev_Fields = {
   __typename?: 'MuseumWorkingSchedule_stddev_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingSchedule_Stddev_Order_By = {
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingSchedule_Stddev_Pop_Fields = {
   __typename?: 'MuseumWorkingSchedule_stddev_pop_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingSchedule_Stddev_Pop_Order_By = {
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingSchedule_Stddev_Samp_Fields = {
   __typename?: 'MuseumWorkingSchedule_stddev_samp_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingSchedule_Stddev_Samp_Order_By = {
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingSchedule_Sum_Fields = {
   __typename?: 'MuseumWorkingSchedule_sum_fields',
  museumID?: Maybe<Scalars['Int']>,
  museumWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type MuseumWorkingSchedule_Sum_Order_By = {
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export enum MuseumWorkingSchedule_Update_Column {
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  MuseumId = 'museumID',
  MuseumWorkingScheduleId = 'museumWorkingScheduleID',
  StartDate = 'startDate'
}

export type MuseumWorkingSchedule_Var_Pop_Fields = {
   __typename?: 'MuseumWorkingSchedule_var_pop_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingSchedule_Var_Pop_Order_By = {
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingSchedule_Var_Samp_Fields = {
   __typename?: 'MuseumWorkingSchedule_var_samp_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingSchedule_Var_Samp_Order_By = {
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type MuseumWorkingSchedule_Variance_Fields = {
   __typename?: 'MuseumWorkingSchedule_variance_fields',
  museumID?: Maybe<Scalars['Float']>,
  museumWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type MuseumWorkingSchedule_Variance_Order_By = {
  museumID?: Maybe<Order_By>,
  museumWorkingScheduleID?: Maybe<Order_By>,
};

export type Mutation_Root = {
   __typename?: 'mutation_root',
  delete_Address?: Maybe<Address_Mutation_Response>,
  delete_ArchSite?: Maybe<ArchSite_Mutation_Response>,
  delete_ArchSiteComment?: Maybe<ArchSiteComment_Mutation_Response>,
  delete_ArchSiteEntranceType?: Maybe<ArchSiteEntranceType_Mutation_Response>,
  delete_ArchSitePrice?: Maybe<ArchSitePrice_Mutation_Response>,
  delete_ArchSiteType?: Maybe<ArchSiteType_Mutation_Response>,
  delete_ArchSiteTypeArchSite?: Maybe<ArchSiteTypeArchSite_Mutation_Response>,
  delete_ArchSiteWorkingDay?: Maybe<ArchSiteWorkingDay_Mutation_Response>,
  delete_ArchSiteWorkingDaySchedule?: Maybe<ArchSiteWorkingDaySchedule_Mutation_Response>,
  delete_ArchSiteWorkingSchedule?: Maybe<ArchSiteWorkingSchedule_Mutation_Response>,
  delete_Article?: Maybe<Article_Mutation_Response>,
  delete_ArticleTag?: Maybe<ArticleTag_Mutation_Response>,
  delete_ArticleUser?: Maybe<ArticleUser_Mutation_Response>,
  delete_City?: Maybe<City_Mutation_Response>,
  delete_Company?: Maybe<Company_Mutation_Response>,
  delete_CompanyContact?: Maybe<CompanyContact_Mutation_Response>,
  delete_CompanyPhone?: Maybe<CompanyPhone_Mutation_Response>,
  delete_CompanyUser?: Maybe<CompanyUser_Mutation_Response>,
  delete_Country?: Maybe<Country_Mutation_Response>,
  delete_Day?: Maybe<Day_Mutation_Response>,
  delete_District?: Maybe<District_Mutation_Response>,
  delete_Hotel?: Maybe<Hotel_Mutation_Response>,
  delete_HotelComment?: Maybe<HotelComment_Mutation_Response>,
  delete_HotelRoom?: Maybe<HotelRoom_Mutation_Response>,
  delete_HotelService?: Maybe<HotelService_Mutation_Response>,
  delete_HotelServiceProperty?: Maybe<HotelServiceProperty_Mutation_Response>,
  delete_Location?: Maybe<Location_Mutation_Response>,
  delete_LoginType?: Maybe<LoginType_Mutation_Response>,
  delete_Museum?: Maybe<Museum_Mutation_Response>,
  delete_MuseumComment?: Maybe<MuseumComment_Mutation_Response>,
  delete_MuseumEntranceType?: Maybe<MuseumEntranceType_Mutation_Response>,
  delete_MuseumPrice?: Maybe<MuseumPrice_Mutation_Response>,
  delete_MuseumType?: Maybe<MuseumType_Mutation_Response>,
  delete_MuseumTypeMuseum?: Maybe<MuseumTypeMuseum_Mutation_Response>,
  delete_MuseumWorkingDay?: Maybe<MuseumWorkingDay_Mutation_Response>,
  delete_MuseumWorkingDaySchedule?: Maybe<MuseumWorkingDaySchedule_Mutation_Response>,
  delete_MuseumWorkingSchedule?: Maybe<MuseumWorkingSchedule_Mutation_Response>,
  delete_Phone?: Maybe<Phone_Mutation_Response>,
  delete_Restaurant?: Maybe<Restaurant_Mutation_Response>,
  delete_RestaurantAndCuisineType?: Maybe<RestaurantAndCuisineType_Mutation_Response>,
  delete_RestaurantComment?: Maybe<RestaurantComment_Mutation_Response>,
  delete_RestaurantCuisineType?: Maybe<RestaurantCuisineType_Mutation_Response>,
  delete_RestaurantFood?: Maybe<RestaurantFood_Mutation_Response>,
  delete_RestaurantFoodType?: Maybe<RestaurantFoodType_Mutation_Response>,
  delete_RestaurantMenu?: Maybe<RestaurantMenu_Mutation_Response>,
  delete_RestaurantMenuFood?: Maybe<RestaurantMenuFood_Mutation_Response>,
  delete_RestaurantType?: Maybe<RestaurantType_Mutation_Response>,
  delete_RestaurantWorkingDay?: Maybe<RestaurantWorkingDay_Mutation_Response>,
  delete_RestaurantWorkingDaySchedule?: Maybe<RestaurantWorkingDaySchedule_Mutation_Response>,
  delete_RestaurantWorkingSchedule?: Maybe<RestaurantWorkingSchedule_Mutation_Response>,
  delete_Room?: Maybe<Room_Mutation_Response>,
  delete_RoomPicture?: Maybe<RoomPicture_Mutation_Response>,
  delete_RoomPrice?: Maybe<RoomPrice_Mutation_Response>,
  delete_RoomProperty?: Maybe<RoomProperty_Mutation_Response>,
  delete_RoomPropertyRoom?: Maybe<RoomPropertyRoom_Mutation_Response>,
  delete_Tag?: Maybe<Tag_Mutation_Response>,
  delete_TravelGuide?: Maybe<TravelGuide_Mutation_Response>,
  delete_TravelGuideArchSite?: Maybe<TravelGuideArchSite_Mutation_Response>,
  delete_TravelGuideHotel?: Maybe<TravelGuideHotel_Mutation_Response>,
  delete_TravelGuideLocation?: Maybe<TravelGuideLocation_Mutation_Response>,
  delete_TravelGuideMuseum?: Maybe<TravelGuideMuseum_Mutation_Response>,
  delete_TravelGuideRestaurant?: Maybe<TravelGuideRestaurant_Mutation_Response>,
  delete_User?: Maybe<User_Mutation_Response>,
  delete_UserType?: Maybe<UserType_Mutation_Response>,
  insert_Address?: Maybe<Address_Mutation_Response>,
  insert_ArchSite?: Maybe<ArchSite_Mutation_Response>,
  insert_ArchSiteComment?: Maybe<ArchSiteComment_Mutation_Response>,
  insert_ArchSiteEntranceType?: Maybe<ArchSiteEntranceType_Mutation_Response>,
  insert_ArchSitePrice?: Maybe<ArchSitePrice_Mutation_Response>,
  insert_ArchSiteType?: Maybe<ArchSiteType_Mutation_Response>,
  insert_ArchSiteTypeArchSite?: Maybe<ArchSiteTypeArchSite_Mutation_Response>,
  insert_ArchSiteWorkingDay?: Maybe<ArchSiteWorkingDay_Mutation_Response>,
  insert_ArchSiteWorkingDaySchedule?: Maybe<ArchSiteWorkingDaySchedule_Mutation_Response>,
  insert_ArchSiteWorkingSchedule?: Maybe<ArchSiteWorkingSchedule_Mutation_Response>,
  insert_Article?: Maybe<Article_Mutation_Response>,
  insert_ArticleTag?: Maybe<ArticleTag_Mutation_Response>,
  insert_ArticleUser?: Maybe<ArticleUser_Mutation_Response>,
  insert_City?: Maybe<City_Mutation_Response>,
  insert_Company?: Maybe<Company_Mutation_Response>,
  insert_CompanyContact?: Maybe<CompanyContact_Mutation_Response>,
  insert_CompanyPhone?: Maybe<CompanyPhone_Mutation_Response>,
  insert_CompanyUser?: Maybe<CompanyUser_Mutation_Response>,
  insert_Country?: Maybe<Country_Mutation_Response>,
  insert_Day?: Maybe<Day_Mutation_Response>,
  insert_District?: Maybe<District_Mutation_Response>,
  insert_Hotel?: Maybe<Hotel_Mutation_Response>,
  insert_HotelComment?: Maybe<HotelComment_Mutation_Response>,
  insert_HotelRoom?: Maybe<HotelRoom_Mutation_Response>,
  insert_HotelService?: Maybe<HotelService_Mutation_Response>,
  insert_HotelServiceProperty?: Maybe<HotelServiceProperty_Mutation_Response>,
  insert_Location?: Maybe<Location_Mutation_Response>,
  insert_LoginType?: Maybe<LoginType_Mutation_Response>,
  insert_Museum?: Maybe<Museum_Mutation_Response>,
  insert_MuseumComment?: Maybe<MuseumComment_Mutation_Response>,
  insert_MuseumEntranceType?: Maybe<MuseumEntranceType_Mutation_Response>,
  insert_MuseumPrice?: Maybe<MuseumPrice_Mutation_Response>,
  insert_MuseumType?: Maybe<MuseumType_Mutation_Response>,
  insert_MuseumTypeMuseum?: Maybe<MuseumTypeMuseum_Mutation_Response>,
  insert_MuseumWorkingDay?: Maybe<MuseumWorkingDay_Mutation_Response>,
  insert_MuseumWorkingDaySchedule?: Maybe<MuseumWorkingDaySchedule_Mutation_Response>,
  insert_MuseumWorkingSchedule?: Maybe<MuseumWorkingSchedule_Mutation_Response>,
  insert_Phone?: Maybe<Phone_Mutation_Response>,
  insert_Restaurant?: Maybe<Restaurant_Mutation_Response>,
  insert_RestaurantAndCuisineType?: Maybe<RestaurantAndCuisineType_Mutation_Response>,
  insert_RestaurantComment?: Maybe<RestaurantComment_Mutation_Response>,
  insert_RestaurantCuisineType?: Maybe<RestaurantCuisineType_Mutation_Response>,
  insert_RestaurantFood?: Maybe<RestaurantFood_Mutation_Response>,
  insert_RestaurantFoodType?: Maybe<RestaurantFoodType_Mutation_Response>,
  insert_RestaurantMenu?: Maybe<RestaurantMenu_Mutation_Response>,
  insert_RestaurantMenuFood?: Maybe<RestaurantMenuFood_Mutation_Response>,
  insert_RestaurantType?: Maybe<RestaurantType_Mutation_Response>,
  insert_RestaurantWorkingDay?: Maybe<RestaurantWorkingDay_Mutation_Response>,
  insert_RestaurantWorkingDaySchedule?: Maybe<RestaurantWorkingDaySchedule_Mutation_Response>,
  insert_RestaurantWorkingSchedule?: Maybe<RestaurantWorkingSchedule_Mutation_Response>,
  insert_Room?: Maybe<Room_Mutation_Response>,
  insert_RoomPicture?: Maybe<RoomPicture_Mutation_Response>,
  insert_RoomPrice?: Maybe<RoomPrice_Mutation_Response>,
  insert_RoomProperty?: Maybe<RoomProperty_Mutation_Response>,
  insert_RoomPropertyRoom?: Maybe<RoomPropertyRoom_Mutation_Response>,
  insert_Tag?: Maybe<Tag_Mutation_Response>,
  insert_TravelGuide?: Maybe<TravelGuide_Mutation_Response>,
  insert_TravelGuideArchSite?: Maybe<TravelGuideArchSite_Mutation_Response>,
  insert_TravelGuideHotel?: Maybe<TravelGuideHotel_Mutation_Response>,
  insert_TravelGuideLocation?: Maybe<TravelGuideLocation_Mutation_Response>,
  insert_TravelGuideMuseum?: Maybe<TravelGuideMuseum_Mutation_Response>,
  insert_TravelGuideRestaurant?: Maybe<TravelGuideRestaurant_Mutation_Response>,
  insert_User?: Maybe<User_Mutation_Response>,
  insert_UserType?: Maybe<UserType_Mutation_Response>,
  update_Address?: Maybe<Address_Mutation_Response>,
  update_ArchSite?: Maybe<ArchSite_Mutation_Response>,
  update_ArchSiteComment?: Maybe<ArchSiteComment_Mutation_Response>,
  update_ArchSiteEntranceType?: Maybe<ArchSiteEntranceType_Mutation_Response>,
  update_ArchSitePrice?: Maybe<ArchSitePrice_Mutation_Response>,
  update_ArchSiteType?: Maybe<ArchSiteType_Mutation_Response>,
  update_ArchSiteTypeArchSite?: Maybe<ArchSiteTypeArchSite_Mutation_Response>,
  update_ArchSiteWorkingDay?: Maybe<ArchSiteWorkingDay_Mutation_Response>,
  update_ArchSiteWorkingDaySchedule?: Maybe<ArchSiteWorkingDaySchedule_Mutation_Response>,
  update_ArchSiteWorkingSchedule?: Maybe<ArchSiteWorkingSchedule_Mutation_Response>,
  update_Article?: Maybe<Article_Mutation_Response>,
  update_ArticleTag?: Maybe<ArticleTag_Mutation_Response>,
  update_ArticleUser?: Maybe<ArticleUser_Mutation_Response>,
  update_City?: Maybe<City_Mutation_Response>,
  update_Company?: Maybe<Company_Mutation_Response>,
  update_CompanyContact?: Maybe<CompanyContact_Mutation_Response>,
  update_CompanyPhone?: Maybe<CompanyPhone_Mutation_Response>,
  update_CompanyUser?: Maybe<CompanyUser_Mutation_Response>,
  update_Country?: Maybe<Country_Mutation_Response>,
  update_Day?: Maybe<Day_Mutation_Response>,
  update_District?: Maybe<District_Mutation_Response>,
  update_Hotel?: Maybe<Hotel_Mutation_Response>,
  update_HotelComment?: Maybe<HotelComment_Mutation_Response>,
  update_HotelRoom?: Maybe<HotelRoom_Mutation_Response>,
  update_HotelService?: Maybe<HotelService_Mutation_Response>,
  update_HotelServiceProperty?: Maybe<HotelServiceProperty_Mutation_Response>,
  update_Location?: Maybe<Location_Mutation_Response>,
  update_LoginType?: Maybe<LoginType_Mutation_Response>,
  update_Museum?: Maybe<Museum_Mutation_Response>,
  update_MuseumComment?: Maybe<MuseumComment_Mutation_Response>,
  update_MuseumEntranceType?: Maybe<MuseumEntranceType_Mutation_Response>,
  update_MuseumPrice?: Maybe<MuseumPrice_Mutation_Response>,
  update_MuseumType?: Maybe<MuseumType_Mutation_Response>,
  update_MuseumTypeMuseum?: Maybe<MuseumTypeMuseum_Mutation_Response>,
  update_MuseumWorkingDay?: Maybe<MuseumWorkingDay_Mutation_Response>,
  update_MuseumWorkingDaySchedule?: Maybe<MuseumWorkingDaySchedule_Mutation_Response>,
  update_MuseumWorkingSchedule?: Maybe<MuseumWorkingSchedule_Mutation_Response>,
  update_Phone?: Maybe<Phone_Mutation_Response>,
  update_Restaurant?: Maybe<Restaurant_Mutation_Response>,
  update_RestaurantAndCuisineType?: Maybe<RestaurantAndCuisineType_Mutation_Response>,
  update_RestaurantComment?: Maybe<RestaurantComment_Mutation_Response>,
  update_RestaurantCuisineType?: Maybe<RestaurantCuisineType_Mutation_Response>,
  update_RestaurantFood?: Maybe<RestaurantFood_Mutation_Response>,
  update_RestaurantFoodType?: Maybe<RestaurantFoodType_Mutation_Response>,
  update_RestaurantMenu?: Maybe<RestaurantMenu_Mutation_Response>,
  update_RestaurantMenuFood?: Maybe<RestaurantMenuFood_Mutation_Response>,
  update_RestaurantType?: Maybe<RestaurantType_Mutation_Response>,
  update_RestaurantWorkingDay?: Maybe<RestaurantWorkingDay_Mutation_Response>,
  update_RestaurantWorkingDaySchedule?: Maybe<RestaurantWorkingDaySchedule_Mutation_Response>,
  update_RestaurantWorkingSchedule?: Maybe<RestaurantWorkingSchedule_Mutation_Response>,
  update_Room?: Maybe<Room_Mutation_Response>,
  update_RoomPicture?: Maybe<RoomPicture_Mutation_Response>,
  update_RoomPrice?: Maybe<RoomPrice_Mutation_Response>,
  update_RoomProperty?: Maybe<RoomProperty_Mutation_Response>,
  update_RoomPropertyRoom?: Maybe<RoomPropertyRoom_Mutation_Response>,
  update_Tag?: Maybe<Tag_Mutation_Response>,
  update_TravelGuide?: Maybe<TravelGuide_Mutation_Response>,
  update_TravelGuideArchSite?: Maybe<TravelGuideArchSite_Mutation_Response>,
  update_TravelGuideHotel?: Maybe<TravelGuideHotel_Mutation_Response>,
  update_TravelGuideLocation?: Maybe<TravelGuideLocation_Mutation_Response>,
  update_TravelGuideMuseum?: Maybe<TravelGuideMuseum_Mutation_Response>,
  update_TravelGuideRestaurant?: Maybe<TravelGuideRestaurant_Mutation_Response>,
  update_User?: Maybe<User_Mutation_Response>,
  update_UserType?: Maybe<UserType_Mutation_Response>,
};


export type Mutation_RootDelete_AddressArgs = {
  where: Address_Bool_Exp
};


export type Mutation_RootDelete_ArchSiteArgs = {
  where: ArchSite_Bool_Exp
};


export type Mutation_RootDelete_ArchSiteCommentArgs = {
  where: ArchSiteComment_Bool_Exp
};


export type Mutation_RootDelete_ArchSiteEntranceTypeArgs = {
  where: ArchSiteEntranceType_Bool_Exp
};


export type Mutation_RootDelete_ArchSitePriceArgs = {
  where: ArchSitePrice_Bool_Exp
};


export type Mutation_RootDelete_ArchSiteTypeArgs = {
  where: ArchSiteType_Bool_Exp
};


export type Mutation_RootDelete_ArchSiteTypeArchSiteArgs = {
  where: ArchSiteTypeArchSite_Bool_Exp
};


export type Mutation_RootDelete_ArchSiteWorkingDayArgs = {
  where: ArchSiteWorkingDay_Bool_Exp
};


export type Mutation_RootDelete_ArchSiteWorkingDayScheduleArgs = {
  where: ArchSiteWorkingDaySchedule_Bool_Exp
};


export type Mutation_RootDelete_ArchSiteWorkingScheduleArgs = {
  where: ArchSiteWorkingSchedule_Bool_Exp
};


export type Mutation_RootDelete_ArticleArgs = {
  where: Article_Bool_Exp
};


export type Mutation_RootDelete_ArticleTagArgs = {
  where: ArticleTag_Bool_Exp
};


export type Mutation_RootDelete_ArticleUserArgs = {
  where: ArticleUser_Bool_Exp
};


export type Mutation_RootDelete_CityArgs = {
  where: City_Bool_Exp
};


export type Mutation_RootDelete_CompanyArgs = {
  where: Company_Bool_Exp
};


export type Mutation_RootDelete_CompanyContactArgs = {
  where: CompanyContact_Bool_Exp
};


export type Mutation_RootDelete_CompanyPhoneArgs = {
  where: CompanyPhone_Bool_Exp
};


export type Mutation_RootDelete_CompanyUserArgs = {
  where: CompanyUser_Bool_Exp
};


export type Mutation_RootDelete_CountryArgs = {
  where: Country_Bool_Exp
};


export type Mutation_RootDelete_DayArgs = {
  where: Day_Bool_Exp
};


export type Mutation_RootDelete_DistrictArgs = {
  where: District_Bool_Exp
};


export type Mutation_RootDelete_HotelArgs = {
  where: Hotel_Bool_Exp
};


export type Mutation_RootDelete_HotelCommentArgs = {
  where: HotelComment_Bool_Exp
};


export type Mutation_RootDelete_HotelRoomArgs = {
  where: HotelRoom_Bool_Exp
};


export type Mutation_RootDelete_HotelServiceArgs = {
  where: HotelService_Bool_Exp
};


export type Mutation_RootDelete_HotelServicePropertyArgs = {
  where: HotelServiceProperty_Bool_Exp
};


export type Mutation_RootDelete_LocationArgs = {
  where: Location_Bool_Exp
};


export type Mutation_RootDelete_LoginTypeArgs = {
  where: LoginType_Bool_Exp
};


export type Mutation_RootDelete_MuseumArgs = {
  where: Museum_Bool_Exp
};


export type Mutation_RootDelete_MuseumCommentArgs = {
  where: MuseumComment_Bool_Exp
};


export type Mutation_RootDelete_MuseumEntranceTypeArgs = {
  where: MuseumEntranceType_Bool_Exp
};


export type Mutation_RootDelete_MuseumPriceArgs = {
  where: MuseumPrice_Bool_Exp
};


export type Mutation_RootDelete_MuseumTypeArgs = {
  where: MuseumType_Bool_Exp
};


export type Mutation_RootDelete_MuseumTypeMuseumArgs = {
  where: MuseumTypeMuseum_Bool_Exp
};


export type Mutation_RootDelete_MuseumWorkingDayArgs = {
  where: MuseumWorkingDay_Bool_Exp
};


export type Mutation_RootDelete_MuseumWorkingDayScheduleArgs = {
  where: MuseumWorkingDaySchedule_Bool_Exp
};


export type Mutation_RootDelete_MuseumWorkingScheduleArgs = {
  where: MuseumWorkingSchedule_Bool_Exp
};


export type Mutation_RootDelete_PhoneArgs = {
  where: Phone_Bool_Exp
};


export type Mutation_RootDelete_RestaurantArgs = {
  where: Restaurant_Bool_Exp
};


export type Mutation_RootDelete_RestaurantAndCuisineTypeArgs = {
  where: RestaurantAndCuisineType_Bool_Exp
};


export type Mutation_RootDelete_RestaurantCommentArgs = {
  where: RestaurantComment_Bool_Exp
};


export type Mutation_RootDelete_RestaurantCuisineTypeArgs = {
  where: RestaurantCuisineType_Bool_Exp
};


export type Mutation_RootDelete_RestaurantFoodArgs = {
  where: RestaurantFood_Bool_Exp
};


export type Mutation_RootDelete_RestaurantFoodTypeArgs = {
  where: RestaurantFoodType_Bool_Exp
};


export type Mutation_RootDelete_RestaurantMenuArgs = {
  where: RestaurantMenu_Bool_Exp
};


export type Mutation_RootDelete_RestaurantMenuFoodArgs = {
  where: RestaurantMenuFood_Bool_Exp
};


export type Mutation_RootDelete_RestaurantTypeArgs = {
  where: RestaurantType_Bool_Exp
};


export type Mutation_RootDelete_RestaurantWorkingDayArgs = {
  where: RestaurantWorkingDay_Bool_Exp
};


export type Mutation_RootDelete_RestaurantWorkingDayScheduleArgs = {
  where: RestaurantWorkingDaySchedule_Bool_Exp
};


export type Mutation_RootDelete_RestaurantWorkingScheduleArgs = {
  where: RestaurantWorkingSchedule_Bool_Exp
};


export type Mutation_RootDelete_RoomArgs = {
  where: Room_Bool_Exp
};


export type Mutation_RootDelete_RoomPictureArgs = {
  where: RoomPicture_Bool_Exp
};


export type Mutation_RootDelete_RoomPriceArgs = {
  where: RoomPrice_Bool_Exp
};


export type Mutation_RootDelete_RoomPropertyArgs = {
  where: RoomProperty_Bool_Exp
};


export type Mutation_RootDelete_RoomPropertyRoomArgs = {
  where: RoomPropertyRoom_Bool_Exp
};


export type Mutation_RootDelete_TagArgs = {
  where: Tag_Bool_Exp
};


export type Mutation_RootDelete_TravelGuideArgs = {
  where: TravelGuide_Bool_Exp
};


export type Mutation_RootDelete_TravelGuideArchSiteArgs = {
  where: TravelGuideArchSite_Bool_Exp
};


export type Mutation_RootDelete_TravelGuideHotelArgs = {
  where: TravelGuideHotel_Bool_Exp
};


export type Mutation_RootDelete_TravelGuideLocationArgs = {
  where: TravelGuideLocation_Bool_Exp
};


export type Mutation_RootDelete_TravelGuideMuseumArgs = {
  where: TravelGuideMuseum_Bool_Exp
};


export type Mutation_RootDelete_TravelGuideRestaurantArgs = {
  where: TravelGuideRestaurant_Bool_Exp
};


export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp
};


export type Mutation_RootDelete_UserTypeArgs = {
  where: UserType_Bool_Exp
};


export type Mutation_RootInsert_AddressArgs = {
  objects: Array<Address_Insert_Input>,
  on_conflict?: Maybe<Address_On_Conflict>
};


export type Mutation_RootInsert_ArchSiteArgs = {
  objects: Array<ArchSite_Insert_Input>,
  on_conflict?: Maybe<ArchSite_On_Conflict>
};


export type Mutation_RootInsert_ArchSiteCommentArgs = {
  objects: Array<ArchSiteComment_Insert_Input>,
  on_conflict?: Maybe<ArchSiteComment_On_Conflict>
};


export type Mutation_RootInsert_ArchSiteEntranceTypeArgs = {
  objects: Array<ArchSiteEntranceType_Insert_Input>,
  on_conflict?: Maybe<ArchSiteEntranceType_On_Conflict>
};


export type Mutation_RootInsert_ArchSitePriceArgs = {
  objects: Array<ArchSitePrice_Insert_Input>,
  on_conflict?: Maybe<ArchSitePrice_On_Conflict>
};


export type Mutation_RootInsert_ArchSiteTypeArgs = {
  objects: Array<ArchSiteType_Insert_Input>,
  on_conflict?: Maybe<ArchSiteType_On_Conflict>
};


export type Mutation_RootInsert_ArchSiteTypeArchSiteArgs = {
  objects: Array<ArchSiteTypeArchSite_Insert_Input>,
  on_conflict?: Maybe<ArchSiteTypeArchSite_On_Conflict>
};


export type Mutation_RootInsert_ArchSiteWorkingDayArgs = {
  objects: Array<ArchSiteWorkingDay_Insert_Input>,
  on_conflict?: Maybe<ArchSiteWorkingDay_On_Conflict>
};


export type Mutation_RootInsert_ArchSiteWorkingDayScheduleArgs = {
  objects: Array<ArchSiteWorkingDaySchedule_Insert_Input>,
  on_conflict?: Maybe<ArchSiteWorkingDaySchedule_On_Conflict>
};


export type Mutation_RootInsert_ArchSiteWorkingScheduleArgs = {
  objects: Array<ArchSiteWorkingSchedule_Insert_Input>,
  on_conflict?: Maybe<ArchSiteWorkingSchedule_On_Conflict>
};


export type Mutation_RootInsert_ArticleArgs = {
  objects: Array<Article_Insert_Input>,
  on_conflict?: Maybe<Article_On_Conflict>
};


export type Mutation_RootInsert_ArticleTagArgs = {
  objects: Array<ArticleTag_Insert_Input>,
  on_conflict?: Maybe<ArticleTag_On_Conflict>
};


export type Mutation_RootInsert_ArticleUserArgs = {
  objects: Array<ArticleUser_Insert_Input>,
  on_conflict?: Maybe<ArticleUser_On_Conflict>
};


export type Mutation_RootInsert_CityArgs = {
  objects: Array<City_Insert_Input>,
  on_conflict?: Maybe<City_On_Conflict>
};


export type Mutation_RootInsert_CompanyArgs = {
  objects: Array<Company_Insert_Input>,
  on_conflict?: Maybe<Company_On_Conflict>
};


export type Mutation_RootInsert_CompanyContactArgs = {
  objects: Array<CompanyContact_Insert_Input>,
  on_conflict?: Maybe<CompanyContact_On_Conflict>
};


export type Mutation_RootInsert_CompanyPhoneArgs = {
  objects: Array<CompanyPhone_Insert_Input>,
  on_conflict?: Maybe<CompanyPhone_On_Conflict>
};


export type Mutation_RootInsert_CompanyUserArgs = {
  objects: Array<CompanyUser_Insert_Input>,
  on_conflict?: Maybe<CompanyUser_On_Conflict>
};


export type Mutation_RootInsert_CountryArgs = {
  objects: Array<Country_Insert_Input>,
  on_conflict?: Maybe<Country_On_Conflict>
};


export type Mutation_RootInsert_DayArgs = {
  objects: Array<Day_Insert_Input>,
  on_conflict?: Maybe<Day_On_Conflict>
};


export type Mutation_RootInsert_DistrictArgs = {
  objects: Array<District_Insert_Input>,
  on_conflict?: Maybe<District_On_Conflict>
};


export type Mutation_RootInsert_HotelArgs = {
  objects: Array<Hotel_Insert_Input>,
  on_conflict?: Maybe<Hotel_On_Conflict>
};


export type Mutation_RootInsert_HotelCommentArgs = {
  objects: Array<HotelComment_Insert_Input>,
  on_conflict?: Maybe<HotelComment_On_Conflict>
};


export type Mutation_RootInsert_HotelRoomArgs = {
  objects: Array<HotelRoom_Insert_Input>,
  on_conflict?: Maybe<HotelRoom_On_Conflict>
};


export type Mutation_RootInsert_HotelServiceArgs = {
  objects: Array<HotelService_Insert_Input>,
  on_conflict?: Maybe<HotelService_On_Conflict>
};


export type Mutation_RootInsert_HotelServicePropertyArgs = {
  objects: Array<HotelServiceProperty_Insert_Input>,
  on_conflict?: Maybe<HotelServiceProperty_On_Conflict>
};


export type Mutation_RootInsert_LocationArgs = {
  objects: Array<Location_Insert_Input>,
  on_conflict?: Maybe<Location_On_Conflict>
};


export type Mutation_RootInsert_LoginTypeArgs = {
  objects: Array<LoginType_Insert_Input>,
  on_conflict?: Maybe<LoginType_On_Conflict>
};


export type Mutation_RootInsert_MuseumArgs = {
  objects: Array<Museum_Insert_Input>,
  on_conflict?: Maybe<Museum_On_Conflict>
};


export type Mutation_RootInsert_MuseumCommentArgs = {
  objects: Array<MuseumComment_Insert_Input>,
  on_conflict?: Maybe<MuseumComment_On_Conflict>
};


export type Mutation_RootInsert_MuseumEntranceTypeArgs = {
  objects: Array<MuseumEntranceType_Insert_Input>,
  on_conflict?: Maybe<MuseumEntranceType_On_Conflict>
};


export type Mutation_RootInsert_MuseumPriceArgs = {
  objects: Array<MuseumPrice_Insert_Input>,
  on_conflict?: Maybe<MuseumPrice_On_Conflict>
};


export type Mutation_RootInsert_MuseumTypeArgs = {
  objects: Array<MuseumType_Insert_Input>,
  on_conflict?: Maybe<MuseumType_On_Conflict>
};


export type Mutation_RootInsert_MuseumTypeMuseumArgs = {
  objects: Array<MuseumTypeMuseum_Insert_Input>,
  on_conflict?: Maybe<MuseumTypeMuseum_On_Conflict>
};


export type Mutation_RootInsert_MuseumWorkingDayArgs = {
  objects: Array<MuseumWorkingDay_Insert_Input>,
  on_conflict?: Maybe<MuseumWorkingDay_On_Conflict>
};


export type Mutation_RootInsert_MuseumWorkingDayScheduleArgs = {
  objects: Array<MuseumWorkingDaySchedule_Insert_Input>,
  on_conflict?: Maybe<MuseumWorkingDaySchedule_On_Conflict>
};


export type Mutation_RootInsert_MuseumWorkingScheduleArgs = {
  objects: Array<MuseumWorkingSchedule_Insert_Input>,
  on_conflict?: Maybe<MuseumWorkingSchedule_On_Conflict>
};


export type Mutation_RootInsert_PhoneArgs = {
  objects: Array<Phone_Insert_Input>,
  on_conflict?: Maybe<Phone_On_Conflict>
};


export type Mutation_RootInsert_RestaurantArgs = {
  objects: Array<Restaurant_Insert_Input>,
  on_conflict?: Maybe<Restaurant_On_Conflict>
};


export type Mutation_RootInsert_RestaurantAndCuisineTypeArgs = {
  objects: Array<RestaurantAndCuisineType_Insert_Input>,
  on_conflict?: Maybe<RestaurantAndCuisineType_On_Conflict>
};


export type Mutation_RootInsert_RestaurantCommentArgs = {
  objects: Array<RestaurantComment_Insert_Input>,
  on_conflict?: Maybe<RestaurantComment_On_Conflict>
};


export type Mutation_RootInsert_RestaurantCuisineTypeArgs = {
  objects: Array<RestaurantCuisineType_Insert_Input>,
  on_conflict?: Maybe<RestaurantCuisineType_On_Conflict>
};


export type Mutation_RootInsert_RestaurantFoodArgs = {
  objects: Array<RestaurantFood_Insert_Input>,
  on_conflict?: Maybe<RestaurantFood_On_Conflict>
};


export type Mutation_RootInsert_RestaurantFoodTypeArgs = {
  objects: Array<RestaurantFoodType_Insert_Input>,
  on_conflict?: Maybe<RestaurantFoodType_On_Conflict>
};


export type Mutation_RootInsert_RestaurantMenuArgs = {
  objects: Array<RestaurantMenu_Insert_Input>,
  on_conflict?: Maybe<RestaurantMenu_On_Conflict>
};


export type Mutation_RootInsert_RestaurantMenuFoodArgs = {
  objects: Array<RestaurantMenuFood_Insert_Input>,
  on_conflict?: Maybe<RestaurantMenuFood_On_Conflict>
};


export type Mutation_RootInsert_RestaurantTypeArgs = {
  objects: Array<RestaurantType_Insert_Input>,
  on_conflict?: Maybe<RestaurantType_On_Conflict>
};


export type Mutation_RootInsert_RestaurantWorkingDayArgs = {
  objects: Array<RestaurantWorkingDay_Insert_Input>,
  on_conflict?: Maybe<RestaurantWorkingDay_On_Conflict>
};


export type Mutation_RootInsert_RestaurantWorkingDayScheduleArgs = {
  objects: Array<RestaurantWorkingDaySchedule_Insert_Input>,
  on_conflict?: Maybe<RestaurantWorkingDaySchedule_On_Conflict>
};


export type Mutation_RootInsert_RestaurantWorkingScheduleArgs = {
  objects: Array<RestaurantWorkingSchedule_Insert_Input>,
  on_conflict?: Maybe<RestaurantWorkingSchedule_On_Conflict>
};


export type Mutation_RootInsert_RoomArgs = {
  objects: Array<Room_Insert_Input>,
  on_conflict?: Maybe<Room_On_Conflict>
};


export type Mutation_RootInsert_RoomPictureArgs = {
  objects: Array<RoomPicture_Insert_Input>,
  on_conflict?: Maybe<RoomPicture_On_Conflict>
};


export type Mutation_RootInsert_RoomPriceArgs = {
  objects: Array<RoomPrice_Insert_Input>,
  on_conflict?: Maybe<RoomPrice_On_Conflict>
};


export type Mutation_RootInsert_RoomPropertyArgs = {
  objects: Array<RoomProperty_Insert_Input>,
  on_conflict?: Maybe<RoomProperty_On_Conflict>
};


export type Mutation_RootInsert_RoomPropertyRoomArgs = {
  objects: Array<RoomPropertyRoom_Insert_Input>,
  on_conflict?: Maybe<RoomPropertyRoom_On_Conflict>
};


export type Mutation_RootInsert_TagArgs = {
  objects: Array<Tag_Insert_Input>,
  on_conflict?: Maybe<Tag_On_Conflict>
};


export type Mutation_RootInsert_TravelGuideArgs = {
  objects: Array<TravelGuide_Insert_Input>,
  on_conflict?: Maybe<TravelGuide_On_Conflict>
};


export type Mutation_RootInsert_TravelGuideArchSiteArgs = {
  objects: Array<TravelGuideArchSite_Insert_Input>,
  on_conflict?: Maybe<TravelGuideArchSite_On_Conflict>
};


export type Mutation_RootInsert_TravelGuideHotelArgs = {
  objects: Array<TravelGuideHotel_Insert_Input>,
  on_conflict?: Maybe<TravelGuideHotel_On_Conflict>
};


export type Mutation_RootInsert_TravelGuideLocationArgs = {
  objects: Array<TravelGuideLocation_Insert_Input>,
  on_conflict?: Maybe<TravelGuideLocation_On_Conflict>
};


export type Mutation_RootInsert_TravelGuideMuseumArgs = {
  objects: Array<TravelGuideMuseum_Insert_Input>,
  on_conflict?: Maybe<TravelGuideMuseum_On_Conflict>
};


export type Mutation_RootInsert_TravelGuideRestaurantArgs = {
  objects: Array<TravelGuideRestaurant_Insert_Input>,
  on_conflict?: Maybe<TravelGuideRestaurant_On_Conflict>
};


export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>,
  on_conflict?: Maybe<User_On_Conflict>
};


export type Mutation_RootInsert_UserTypeArgs = {
  objects: Array<UserType_Insert_Input>,
  on_conflict?: Maybe<UserType_On_Conflict>
};


export type Mutation_RootUpdate_AddressArgs = {
  _inc?: Maybe<Address_Inc_Input>,
  _set?: Maybe<Address_Set_Input>,
  where: Address_Bool_Exp
};


export type Mutation_RootUpdate_ArchSiteArgs = {
  _inc?: Maybe<ArchSite_Inc_Input>,
  _set?: Maybe<ArchSite_Set_Input>,
  where: ArchSite_Bool_Exp
};


export type Mutation_RootUpdate_ArchSiteCommentArgs = {
  _inc?: Maybe<ArchSiteComment_Inc_Input>,
  _set?: Maybe<ArchSiteComment_Set_Input>,
  where: ArchSiteComment_Bool_Exp
};


export type Mutation_RootUpdate_ArchSiteEntranceTypeArgs = {
  _inc?: Maybe<ArchSiteEntranceType_Inc_Input>,
  _set?: Maybe<ArchSiteEntranceType_Set_Input>,
  where: ArchSiteEntranceType_Bool_Exp
};


export type Mutation_RootUpdate_ArchSitePriceArgs = {
  _inc?: Maybe<ArchSitePrice_Inc_Input>,
  _set?: Maybe<ArchSitePrice_Set_Input>,
  where: ArchSitePrice_Bool_Exp
};


export type Mutation_RootUpdate_ArchSiteTypeArgs = {
  _inc?: Maybe<ArchSiteType_Inc_Input>,
  _set?: Maybe<ArchSiteType_Set_Input>,
  where: ArchSiteType_Bool_Exp
};


export type Mutation_RootUpdate_ArchSiteTypeArchSiteArgs = {
  _inc?: Maybe<ArchSiteTypeArchSite_Inc_Input>,
  _set?: Maybe<ArchSiteTypeArchSite_Set_Input>,
  where: ArchSiteTypeArchSite_Bool_Exp
};


export type Mutation_RootUpdate_ArchSiteWorkingDayArgs = {
  _inc?: Maybe<ArchSiteWorkingDay_Inc_Input>,
  _set?: Maybe<ArchSiteWorkingDay_Set_Input>,
  where: ArchSiteWorkingDay_Bool_Exp
};


export type Mutation_RootUpdate_ArchSiteWorkingDayScheduleArgs = {
  _inc?: Maybe<ArchSiteWorkingDaySchedule_Inc_Input>,
  _set?: Maybe<ArchSiteWorkingDaySchedule_Set_Input>,
  where: ArchSiteWorkingDaySchedule_Bool_Exp
};


export type Mutation_RootUpdate_ArchSiteWorkingScheduleArgs = {
  _inc?: Maybe<ArchSiteWorkingSchedule_Inc_Input>,
  _set?: Maybe<ArchSiteWorkingSchedule_Set_Input>,
  where: ArchSiteWorkingSchedule_Bool_Exp
};


export type Mutation_RootUpdate_ArticleArgs = {
  _inc?: Maybe<Article_Inc_Input>,
  _set?: Maybe<Article_Set_Input>,
  where: Article_Bool_Exp
};


export type Mutation_RootUpdate_ArticleTagArgs = {
  _inc?: Maybe<ArticleTag_Inc_Input>,
  _set?: Maybe<ArticleTag_Set_Input>,
  where: ArticleTag_Bool_Exp
};


export type Mutation_RootUpdate_ArticleUserArgs = {
  _inc?: Maybe<ArticleUser_Inc_Input>,
  _set?: Maybe<ArticleUser_Set_Input>,
  where: ArticleUser_Bool_Exp
};


export type Mutation_RootUpdate_CityArgs = {
  _inc?: Maybe<City_Inc_Input>,
  _set?: Maybe<City_Set_Input>,
  where: City_Bool_Exp
};


export type Mutation_RootUpdate_CompanyArgs = {
  _inc?: Maybe<Company_Inc_Input>,
  _set?: Maybe<Company_Set_Input>,
  where: Company_Bool_Exp
};


export type Mutation_RootUpdate_CompanyContactArgs = {
  _inc?: Maybe<CompanyContact_Inc_Input>,
  _set?: Maybe<CompanyContact_Set_Input>,
  where: CompanyContact_Bool_Exp
};


export type Mutation_RootUpdate_CompanyPhoneArgs = {
  _inc?: Maybe<CompanyPhone_Inc_Input>,
  _set?: Maybe<CompanyPhone_Set_Input>,
  where: CompanyPhone_Bool_Exp
};


export type Mutation_RootUpdate_CompanyUserArgs = {
  _inc?: Maybe<CompanyUser_Inc_Input>,
  _set?: Maybe<CompanyUser_Set_Input>,
  where: CompanyUser_Bool_Exp
};


export type Mutation_RootUpdate_CountryArgs = {
  _inc?: Maybe<Country_Inc_Input>,
  _set?: Maybe<Country_Set_Input>,
  where: Country_Bool_Exp
};


export type Mutation_RootUpdate_DayArgs = {
  _inc?: Maybe<Day_Inc_Input>,
  _set?: Maybe<Day_Set_Input>,
  where: Day_Bool_Exp
};


export type Mutation_RootUpdate_DistrictArgs = {
  _inc?: Maybe<District_Inc_Input>,
  _set?: Maybe<District_Set_Input>,
  where: District_Bool_Exp
};


export type Mutation_RootUpdate_HotelArgs = {
  _inc?: Maybe<Hotel_Inc_Input>,
  _set?: Maybe<Hotel_Set_Input>,
  where: Hotel_Bool_Exp
};


export type Mutation_RootUpdate_HotelCommentArgs = {
  _inc?: Maybe<HotelComment_Inc_Input>,
  _set?: Maybe<HotelComment_Set_Input>,
  where: HotelComment_Bool_Exp
};


export type Mutation_RootUpdate_HotelRoomArgs = {
  _inc?: Maybe<HotelRoom_Inc_Input>,
  _set?: Maybe<HotelRoom_Set_Input>,
  where: HotelRoom_Bool_Exp
};


export type Mutation_RootUpdate_HotelServiceArgs = {
  _inc?: Maybe<HotelService_Inc_Input>,
  _set?: Maybe<HotelService_Set_Input>,
  where: HotelService_Bool_Exp
};


export type Mutation_RootUpdate_HotelServicePropertyArgs = {
  _inc?: Maybe<HotelServiceProperty_Inc_Input>,
  _set?: Maybe<HotelServiceProperty_Set_Input>,
  where: HotelServiceProperty_Bool_Exp
};


export type Mutation_RootUpdate_LocationArgs = {
  _inc?: Maybe<Location_Inc_Input>,
  _set?: Maybe<Location_Set_Input>,
  where: Location_Bool_Exp
};


export type Mutation_RootUpdate_LoginTypeArgs = {
  _inc?: Maybe<LoginType_Inc_Input>,
  _set?: Maybe<LoginType_Set_Input>,
  where: LoginType_Bool_Exp
};


export type Mutation_RootUpdate_MuseumArgs = {
  _inc?: Maybe<Museum_Inc_Input>,
  _set?: Maybe<Museum_Set_Input>,
  where: Museum_Bool_Exp
};


export type Mutation_RootUpdate_MuseumCommentArgs = {
  _inc?: Maybe<MuseumComment_Inc_Input>,
  _set?: Maybe<MuseumComment_Set_Input>,
  where: MuseumComment_Bool_Exp
};


export type Mutation_RootUpdate_MuseumEntranceTypeArgs = {
  _inc?: Maybe<MuseumEntranceType_Inc_Input>,
  _set?: Maybe<MuseumEntranceType_Set_Input>,
  where: MuseumEntranceType_Bool_Exp
};


export type Mutation_RootUpdate_MuseumPriceArgs = {
  _inc?: Maybe<MuseumPrice_Inc_Input>,
  _set?: Maybe<MuseumPrice_Set_Input>,
  where: MuseumPrice_Bool_Exp
};


export type Mutation_RootUpdate_MuseumTypeArgs = {
  _inc?: Maybe<MuseumType_Inc_Input>,
  _set?: Maybe<MuseumType_Set_Input>,
  where: MuseumType_Bool_Exp
};


export type Mutation_RootUpdate_MuseumTypeMuseumArgs = {
  _inc?: Maybe<MuseumTypeMuseum_Inc_Input>,
  _set?: Maybe<MuseumTypeMuseum_Set_Input>,
  where: MuseumTypeMuseum_Bool_Exp
};


export type Mutation_RootUpdate_MuseumWorkingDayArgs = {
  _inc?: Maybe<MuseumWorkingDay_Inc_Input>,
  _set?: Maybe<MuseumWorkingDay_Set_Input>,
  where: MuseumWorkingDay_Bool_Exp
};


export type Mutation_RootUpdate_MuseumWorkingDayScheduleArgs = {
  _inc?: Maybe<MuseumWorkingDaySchedule_Inc_Input>,
  _set?: Maybe<MuseumWorkingDaySchedule_Set_Input>,
  where: MuseumWorkingDaySchedule_Bool_Exp
};


export type Mutation_RootUpdate_MuseumWorkingScheduleArgs = {
  _inc?: Maybe<MuseumWorkingSchedule_Inc_Input>,
  _set?: Maybe<MuseumWorkingSchedule_Set_Input>,
  where: MuseumWorkingSchedule_Bool_Exp
};


export type Mutation_RootUpdate_PhoneArgs = {
  _inc?: Maybe<Phone_Inc_Input>,
  _set?: Maybe<Phone_Set_Input>,
  where: Phone_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantArgs = {
  _inc?: Maybe<Restaurant_Inc_Input>,
  _set?: Maybe<Restaurant_Set_Input>,
  where: Restaurant_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantAndCuisineTypeArgs = {
  _inc?: Maybe<RestaurantAndCuisineType_Inc_Input>,
  _set?: Maybe<RestaurantAndCuisineType_Set_Input>,
  where: RestaurantAndCuisineType_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantCommentArgs = {
  _inc?: Maybe<RestaurantComment_Inc_Input>,
  _set?: Maybe<RestaurantComment_Set_Input>,
  where: RestaurantComment_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantCuisineTypeArgs = {
  _inc?: Maybe<RestaurantCuisineType_Inc_Input>,
  _set?: Maybe<RestaurantCuisineType_Set_Input>,
  where: RestaurantCuisineType_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantFoodArgs = {
  _inc?: Maybe<RestaurantFood_Inc_Input>,
  _set?: Maybe<RestaurantFood_Set_Input>,
  where: RestaurantFood_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantFoodTypeArgs = {
  _inc?: Maybe<RestaurantFoodType_Inc_Input>,
  _set?: Maybe<RestaurantFoodType_Set_Input>,
  where: RestaurantFoodType_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantMenuArgs = {
  _inc?: Maybe<RestaurantMenu_Inc_Input>,
  _set?: Maybe<RestaurantMenu_Set_Input>,
  where: RestaurantMenu_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantMenuFoodArgs = {
  _inc?: Maybe<RestaurantMenuFood_Inc_Input>,
  _set?: Maybe<RestaurantMenuFood_Set_Input>,
  where: RestaurantMenuFood_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantTypeArgs = {
  _inc?: Maybe<RestaurantType_Inc_Input>,
  _set?: Maybe<RestaurantType_Set_Input>,
  where: RestaurantType_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantWorkingDayArgs = {
  _inc?: Maybe<RestaurantWorkingDay_Inc_Input>,
  _set?: Maybe<RestaurantWorkingDay_Set_Input>,
  where: RestaurantWorkingDay_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantWorkingDayScheduleArgs = {
  _inc?: Maybe<RestaurantWorkingDaySchedule_Inc_Input>,
  _set?: Maybe<RestaurantWorkingDaySchedule_Set_Input>,
  where: RestaurantWorkingDaySchedule_Bool_Exp
};


export type Mutation_RootUpdate_RestaurantWorkingScheduleArgs = {
  _inc?: Maybe<RestaurantWorkingSchedule_Inc_Input>,
  _set?: Maybe<RestaurantWorkingSchedule_Set_Input>,
  where: RestaurantWorkingSchedule_Bool_Exp
};


export type Mutation_RootUpdate_RoomArgs = {
  _inc?: Maybe<Room_Inc_Input>,
  _set?: Maybe<Room_Set_Input>,
  where: Room_Bool_Exp
};


export type Mutation_RootUpdate_RoomPictureArgs = {
  _inc?: Maybe<RoomPicture_Inc_Input>,
  _set?: Maybe<RoomPicture_Set_Input>,
  where: RoomPicture_Bool_Exp
};


export type Mutation_RootUpdate_RoomPriceArgs = {
  _inc?: Maybe<RoomPrice_Inc_Input>,
  _set?: Maybe<RoomPrice_Set_Input>,
  where: RoomPrice_Bool_Exp
};


export type Mutation_RootUpdate_RoomPropertyArgs = {
  _inc?: Maybe<RoomProperty_Inc_Input>,
  _set?: Maybe<RoomProperty_Set_Input>,
  where: RoomProperty_Bool_Exp
};


export type Mutation_RootUpdate_RoomPropertyRoomArgs = {
  _inc?: Maybe<RoomPropertyRoom_Inc_Input>,
  _set?: Maybe<RoomPropertyRoom_Set_Input>,
  where: RoomPropertyRoom_Bool_Exp
};


export type Mutation_RootUpdate_TagArgs = {
  _inc?: Maybe<Tag_Inc_Input>,
  _set?: Maybe<Tag_Set_Input>,
  where: Tag_Bool_Exp
};


export type Mutation_RootUpdate_TravelGuideArgs = {
  _inc?: Maybe<TravelGuide_Inc_Input>,
  _set?: Maybe<TravelGuide_Set_Input>,
  where: TravelGuide_Bool_Exp
};


export type Mutation_RootUpdate_TravelGuideArchSiteArgs = {
  _inc?: Maybe<TravelGuideArchSite_Inc_Input>,
  _set?: Maybe<TravelGuideArchSite_Set_Input>,
  where: TravelGuideArchSite_Bool_Exp
};


export type Mutation_RootUpdate_TravelGuideHotelArgs = {
  _inc?: Maybe<TravelGuideHotel_Inc_Input>,
  _set?: Maybe<TravelGuideHotel_Set_Input>,
  where: TravelGuideHotel_Bool_Exp
};


export type Mutation_RootUpdate_TravelGuideLocationArgs = {
  _inc?: Maybe<TravelGuideLocation_Inc_Input>,
  _set?: Maybe<TravelGuideLocation_Set_Input>,
  where: TravelGuideLocation_Bool_Exp
};


export type Mutation_RootUpdate_TravelGuideMuseumArgs = {
  _inc?: Maybe<TravelGuideMuseum_Inc_Input>,
  _set?: Maybe<TravelGuideMuseum_Set_Input>,
  where: TravelGuideMuseum_Bool_Exp
};


export type Mutation_RootUpdate_TravelGuideRestaurantArgs = {
  _inc?: Maybe<TravelGuideRestaurant_Inc_Input>,
  _set?: Maybe<TravelGuideRestaurant_Set_Input>,
  where: TravelGuideRestaurant_Bool_Exp
};


export type Mutation_RootUpdate_UserArgs = {
  _inc?: Maybe<User_Inc_Input>,
  _set?: Maybe<User_Set_Input>,
  where: User_Bool_Exp
};


export type Mutation_RootUpdate_UserTypeArgs = {
  _inc?: Maybe<UserType_Inc_Input>,
  _set?: Maybe<UserType_Set_Input>,
  where: UserType_Bool_Exp
};

export enum Order_By {
  Asc = 'asc',
  AscNullsFirst = 'asc_nulls_first',
  AscNullsLast = 'asc_nulls_last',
  Desc = 'desc',
  DescNullsFirst = 'desc_nulls_first',
  DescNullsLast = 'desc_nulls_last'
}

export type Phone = {
   __typename?: 'Phone',
  CompanyPhones: Array<CompanyPhone>,
  CompanyPhones_aggregate: CompanyPhone_Aggregate,
  Users: Array<User>,
  Users_aggregate: User_Aggregate,
  isDeleted: Scalars['Boolean'],
  phone: Scalars['String'],
  phoneID: Scalars['Int'],
};


export type PhoneCompanyPhonesArgs = {
  distinct_on?: Maybe<Array<CompanyPhone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyPhone_Order_By>>,
  where?: Maybe<CompanyPhone_Bool_Exp>
};


export type PhoneCompanyPhones_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyPhone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyPhone_Order_By>>,
  where?: Maybe<CompanyPhone_Bool_Exp>
};


export type PhoneUsersArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};


export type PhoneUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};

export type Phone_Aggregate = {
   __typename?: 'Phone_aggregate',
  aggregate?: Maybe<Phone_Aggregate_Fields>,
  nodes: Array<Phone>,
};

export type Phone_Aggregate_Fields = {
   __typename?: 'Phone_aggregate_fields',
  avg?: Maybe<Phone_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Phone_Max_Fields>,
  min?: Maybe<Phone_Min_Fields>,
  stddev?: Maybe<Phone_Stddev_Fields>,
  stddev_pop?: Maybe<Phone_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Phone_Stddev_Samp_Fields>,
  sum?: Maybe<Phone_Sum_Fields>,
  var_pop?: Maybe<Phone_Var_Pop_Fields>,
  var_samp?: Maybe<Phone_Var_Samp_Fields>,
  variance?: Maybe<Phone_Variance_Fields>,
};


export type Phone_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Phone_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Phone_Aggregate_Order_By = {
  avg?: Maybe<Phone_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Phone_Max_Order_By>,
  min?: Maybe<Phone_Min_Order_By>,
  stddev?: Maybe<Phone_Stddev_Order_By>,
  stddev_pop?: Maybe<Phone_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Phone_Stddev_Samp_Order_By>,
  sum?: Maybe<Phone_Sum_Order_By>,
  var_pop?: Maybe<Phone_Var_Pop_Order_By>,
  var_samp?: Maybe<Phone_Var_Samp_Order_By>,
  variance?: Maybe<Phone_Variance_Order_By>,
};

export type Phone_Arr_Rel_Insert_Input = {
  data: Array<Phone_Insert_Input>,
  on_conflict?: Maybe<Phone_On_Conflict>,
};

export type Phone_Avg_Fields = {
   __typename?: 'Phone_avg_fields',
  phoneID?: Maybe<Scalars['Float']>,
};

export type Phone_Avg_Order_By = {
  phoneID?: Maybe<Order_By>,
};

export type Phone_Bool_Exp = {
  CompanyPhones?: Maybe<CompanyPhone_Bool_Exp>,
  Users?: Maybe<User_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Phone_Bool_Exp>>>,
  _not?: Maybe<Phone_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Phone_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  phone?: Maybe<String_Comparison_Exp>,
  phoneID?: Maybe<Int_Comparison_Exp>,
};

export enum Phone_Constraint {
  PhonePkey = 'Phone_pkey'
}

export type Phone_Inc_Input = {
  phoneID?: Maybe<Scalars['Int']>,
};

export type Phone_Insert_Input = {
  CompanyPhones?: Maybe<CompanyPhone_Arr_Rel_Insert_Input>,
  Users?: Maybe<User_Arr_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  phone?: Maybe<Scalars['String']>,
  phoneID?: Maybe<Scalars['Int']>,
};

export type Phone_Max_Fields = {
   __typename?: 'Phone_max_fields',
  phone?: Maybe<Scalars['String']>,
  phoneID?: Maybe<Scalars['Int']>,
};

export type Phone_Max_Order_By = {
  phone?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type Phone_Min_Fields = {
   __typename?: 'Phone_min_fields',
  phone?: Maybe<Scalars['String']>,
  phoneID?: Maybe<Scalars['Int']>,
};

export type Phone_Min_Order_By = {
  phone?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export type Phone_Mutation_Response = {
   __typename?: 'Phone_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Phone>,
};

export type Phone_Obj_Rel_Insert_Input = {
  data: Phone_Insert_Input,
  on_conflict?: Maybe<Phone_On_Conflict>,
};

export type Phone_On_Conflict = {
  constraint: Phone_Constraint,
  update_columns: Array<Phone_Update_Column>,
  where?: Maybe<Phone_Bool_Exp>,
};

export type Phone_Order_By = {
  CompanyPhones_aggregate?: Maybe<CompanyPhone_Aggregate_Order_By>,
  Users_aggregate?: Maybe<User_Aggregate_Order_By>,
  isDeleted?: Maybe<Order_By>,
  phone?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
};

export enum Phone_Select_Column {
  IsDeleted = 'isDeleted',
  Phone = 'phone',
  PhoneId = 'phoneID'
}

export type Phone_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  phone?: Maybe<Scalars['String']>,
  phoneID?: Maybe<Scalars['Int']>,
};

export type Phone_Stddev_Fields = {
   __typename?: 'Phone_stddev_fields',
  phoneID?: Maybe<Scalars['Float']>,
};

export type Phone_Stddev_Order_By = {
  phoneID?: Maybe<Order_By>,
};

export type Phone_Stddev_Pop_Fields = {
   __typename?: 'Phone_stddev_pop_fields',
  phoneID?: Maybe<Scalars['Float']>,
};

export type Phone_Stddev_Pop_Order_By = {
  phoneID?: Maybe<Order_By>,
};

export type Phone_Stddev_Samp_Fields = {
   __typename?: 'Phone_stddev_samp_fields',
  phoneID?: Maybe<Scalars['Float']>,
};

export type Phone_Stddev_Samp_Order_By = {
  phoneID?: Maybe<Order_By>,
};

export type Phone_Sum_Fields = {
   __typename?: 'Phone_sum_fields',
  phoneID?: Maybe<Scalars['Int']>,
};

export type Phone_Sum_Order_By = {
  phoneID?: Maybe<Order_By>,
};

export enum Phone_Update_Column {
  IsDeleted = 'isDeleted',
  Phone = 'phone',
  PhoneId = 'phoneID'
}

export type Phone_Var_Pop_Fields = {
   __typename?: 'Phone_var_pop_fields',
  phoneID?: Maybe<Scalars['Float']>,
};

export type Phone_Var_Pop_Order_By = {
  phoneID?: Maybe<Order_By>,
};

export type Phone_Var_Samp_Fields = {
   __typename?: 'Phone_var_samp_fields',
  phoneID?: Maybe<Scalars['Float']>,
};

export type Phone_Var_Samp_Order_By = {
  phoneID?: Maybe<Order_By>,
};

export type Phone_Variance_Fields = {
   __typename?: 'Phone_variance_fields',
  phoneID?: Maybe<Scalars['Float']>,
};

export type Phone_Variance_Order_By = {
  phoneID?: Maybe<Order_By>,
};

export type Query_Root = {
   __typename?: 'query_root',
  Address: Array<Address>,
  Address_aggregate: Address_Aggregate,
  Address_by_pk?: Maybe<Address>,
  ArchSite: Array<ArchSite>,
  ArchSiteComment: Array<ArchSiteComment>,
  ArchSiteComment_aggregate: ArchSiteComment_Aggregate,
  ArchSiteComment_by_pk?: Maybe<ArchSiteComment>,
  ArchSiteEntranceType: Array<ArchSiteEntranceType>,
  ArchSiteEntranceType_aggregate: ArchSiteEntranceType_Aggregate,
  ArchSiteEntranceType_by_pk?: Maybe<ArchSiteEntranceType>,
  ArchSitePrice: Array<ArchSitePrice>,
  ArchSitePrice_aggregate: ArchSitePrice_Aggregate,
  ArchSitePrice_by_pk?: Maybe<ArchSitePrice>,
  ArchSiteType: Array<ArchSiteType>,
  ArchSiteTypeArchSite: Array<ArchSiteTypeArchSite>,
  ArchSiteTypeArchSite_aggregate: ArchSiteTypeArchSite_Aggregate,
  ArchSiteTypeArchSite_by_pk?: Maybe<ArchSiteTypeArchSite>,
  ArchSiteType_aggregate: ArchSiteType_Aggregate,
  ArchSiteType_by_pk?: Maybe<ArchSiteType>,
  ArchSiteWorkingDay: Array<ArchSiteWorkingDay>,
  ArchSiteWorkingDaySchedule: Array<ArchSiteWorkingDaySchedule>,
  ArchSiteWorkingDaySchedule_aggregate: ArchSiteWorkingDaySchedule_Aggregate,
  ArchSiteWorkingDaySchedule_by_pk?: Maybe<ArchSiteWorkingDaySchedule>,
  ArchSiteWorkingDay_aggregate: ArchSiteWorkingDay_Aggregate,
  ArchSiteWorkingDay_by_pk?: Maybe<ArchSiteWorkingDay>,
  ArchSiteWorkingSchedule: Array<ArchSiteWorkingSchedule>,
  ArchSiteWorkingSchedule_aggregate: ArchSiteWorkingSchedule_Aggregate,
  ArchSiteWorkingSchedule_by_pk?: Maybe<ArchSiteWorkingSchedule>,
  ArchSite_aggregate: ArchSite_Aggregate,
  ArchSite_by_pk?: Maybe<ArchSite>,
  Article: Array<Article>,
  ArticleTag: Array<ArticleTag>,
  ArticleTag_aggregate: ArticleTag_Aggregate,
  ArticleTag_by_pk?: Maybe<ArticleTag>,
  ArticleUser: Array<ArticleUser>,
  ArticleUser_aggregate: ArticleUser_Aggregate,
  ArticleUser_by_pk?: Maybe<ArticleUser>,
  Article_aggregate: Article_Aggregate,
  Article_by_pk?: Maybe<Article>,
  City: Array<City>,
  City_aggregate: City_Aggregate,
  City_by_pk?: Maybe<City>,
  Company: Array<Company>,
  CompanyContact: Array<CompanyContact>,
  CompanyContact_aggregate: CompanyContact_Aggregate,
  CompanyContact_by_pk?: Maybe<CompanyContact>,
  CompanyPhone: Array<CompanyPhone>,
  CompanyPhone_aggregate: CompanyPhone_Aggregate,
  CompanyPhone_by_pk?: Maybe<CompanyPhone>,
  CompanyUser: Array<CompanyUser>,
  CompanyUser_aggregate: CompanyUser_Aggregate,
  CompanyUser_by_pk?: Maybe<CompanyUser>,
  Company_aggregate: Company_Aggregate,
  Company_by_pk?: Maybe<Company>,
  Country: Array<Country>,
  Country_aggregate: Country_Aggregate,
  Country_by_pk?: Maybe<Country>,
  Day: Array<Day>,
  Day_aggregate: Day_Aggregate,
  Day_by_pk?: Maybe<Day>,
  District: Array<District>,
  District_aggregate: District_Aggregate,
  District_by_pk?: Maybe<District>,
  Hotel: Array<Hotel>,
  HotelComment: Array<HotelComment>,
  HotelComment_aggregate: HotelComment_Aggregate,
  HotelComment_by_pk?: Maybe<HotelComment>,
  HotelRoom: Array<HotelRoom>,
  HotelRoom_aggregate: HotelRoom_Aggregate,
  HotelRoom_by_pk?: Maybe<HotelRoom>,
  HotelService: Array<HotelService>,
  HotelServiceProperty: Array<HotelServiceProperty>,
  HotelServiceProperty_aggregate: HotelServiceProperty_Aggregate,
  HotelServiceProperty_by_pk?: Maybe<HotelServiceProperty>,
  HotelService_aggregate: HotelService_Aggregate,
  HotelService_by_pk?: Maybe<HotelService>,
  Hotel_aggregate: Hotel_Aggregate,
  Hotel_by_pk?: Maybe<Hotel>,
  Location: Array<Location>,
  Location_aggregate: Location_Aggregate,
  Location_by_pk?: Maybe<Location>,
  LoginType: Array<LoginType>,
  LoginType_aggregate: LoginType_Aggregate,
  LoginType_by_pk?: Maybe<LoginType>,
  Museum: Array<Museum>,
  MuseumComment: Array<MuseumComment>,
  MuseumComment_aggregate: MuseumComment_Aggregate,
  MuseumComment_by_pk?: Maybe<MuseumComment>,
  MuseumEntranceType: Array<MuseumEntranceType>,
  MuseumEntranceType_aggregate: MuseumEntranceType_Aggregate,
  MuseumEntranceType_by_pk?: Maybe<MuseumEntranceType>,
  MuseumPrice: Array<MuseumPrice>,
  MuseumPrice_aggregate: MuseumPrice_Aggregate,
  MuseumPrice_by_pk?: Maybe<MuseumPrice>,
  MuseumType: Array<MuseumType>,
  MuseumTypeMuseum: Array<MuseumTypeMuseum>,
  MuseumTypeMuseum_aggregate: MuseumTypeMuseum_Aggregate,
  MuseumTypeMuseum_by_pk?: Maybe<MuseumTypeMuseum>,
  MuseumType_aggregate: MuseumType_Aggregate,
  MuseumType_by_pk?: Maybe<MuseumType>,
  MuseumWorkingDay: Array<MuseumWorkingDay>,
  MuseumWorkingDaySchedule: Array<MuseumWorkingDaySchedule>,
  MuseumWorkingDaySchedule_aggregate: MuseumWorkingDaySchedule_Aggregate,
  MuseumWorkingDaySchedule_by_pk?: Maybe<MuseumWorkingDaySchedule>,
  MuseumWorkingDay_aggregate: MuseumWorkingDay_Aggregate,
  MuseumWorkingDay_by_pk?: Maybe<MuseumWorkingDay>,
  MuseumWorkingSchedule: Array<MuseumWorkingSchedule>,
  MuseumWorkingSchedule_aggregate: MuseumWorkingSchedule_Aggregate,
  MuseumWorkingSchedule_by_pk?: Maybe<MuseumWorkingSchedule>,
  Museum_aggregate: Museum_Aggregate,
  Museum_by_pk?: Maybe<Museum>,
  Phone: Array<Phone>,
  Phone_aggregate: Phone_Aggregate,
  Phone_by_pk?: Maybe<Phone>,
  Restaurant: Array<Restaurant>,
  RestaurantAndCuisineType: Array<RestaurantAndCuisineType>,
  RestaurantAndCuisineType_aggregate: RestaurantAndCuisineType_Aggregate,
  RestaurantAndCuisineType_by_pk?: Maybe<RestaurantAndCuisineType>,
  RestaurantComment: Array<RestaurantComment>,
  RestaurantComment_aggregate: RestaurantComment_Aggregate,
  RestaurantComment_by_pk?: Maybe<RestaurantComment>,
  RestaurantCuisineType: Array<RestaurantCuisineType>,
  RestaurantCuisineType_aggregate: RestaurantCuisineType_Aggregate,
  RestaurantCuisineType_by_pk?: Maybe<RestaurantCuisineType>,
  RestaurantFood: Array<RestaurantFood>,
  RestaurantFoodType: Array<RestaurantFoodType>,
  RestaurantFoodType_aggregate: RestaurantFoodType_Aggregate,
  RestaurantFoodType_by_pk?: Maybe<RestaurantFoodType>,
  RestaurantFood_aggregate: RestaurantFood_Aggregate,
  RestaurantFood_by_pk?: Maybe<RestaurantFood>,
  RestaurantMenu: Array<RestaurantMenu>,
  RestaurantMenuFood: Array<RestaurantMenuFood>,
  RestaurantMenuFood_aggregate: RestaurantMenuFood_Aggregate,
  RestaurantMenuFood_by_pk?: Maybe<RestaurantMenuFood>,
  RestaurantMenu_aggregate: RestaurantMenu_Aggregate,
  RestaurantMenu_by_pk?: Maybe<RestaurantMenu>,
  RestaurantType: Array<RestaurantType>,
  RestaurantType_aggregate: RestaurantType_Aggregate,
  RestaurantType_by_pk?: Maybe<RestaurantType>,
  RestaurantWorkingDay: Array<RestaurantWorkingDay>,
  RestaurantWorkingDaySchedule: Array<RestaurantWorkingDaySchedule>,
  RestaurantWorkingDaySchedule_aggregate: RestaurantWorkingDaySchedule_Aggregate,
  RestaurantWorkingDaySchedule_by_pk?: Maybe<RestaurantWorkingDaySchedule>,
  RestaurantWorkingDay_aggregate: RestaurantWorkingDay_Aggregate,
  RestaurantWorkingDay_by_pk?: Maybe<RestaurantWorkingDay>,
  RestaurantWorkingSchedule: Array<RestaurantWorkingSchedule>,
  RestaurantWorkingSchedule_aggregate: RestaurantWorkingSchedule_Aggregate,
  RestaurantWorkingSchedule_by_pk?: Maybe<RestaurantWorkingSchedule>,
  Restaurant_aggregate: Restaurant_Aggregate,
  Restaurant_by_pk?: Maybe<Restaurant>,
  Room: Array<Room>,
  RoomPicture: Array<RoomPicture>,
  RoomPicture_aggregate: RoomPicture_Aggregate,
  RoomPicture_by_pk?: Maybe<RoomPicture>,
  RoomPrice: Array<RoomPrice>,
  RoomPrice_aggregate: RoomPrice_Aggregate,
  RoomPrice_by_pk?: Maybe<RoomPrice>,
  RoomProperty: Array<RoomProperty>,
  RoomPropertyRoom: Array<RoomPropertyRoom>,
  RoomPropertyRoom_aggregate: RoomPropertyRoom_Aggregate,
  RoomPropertyRoom_by_pk?: Maybe<RoomPropertyRoom>,
  RoomProperty_aggregate: RoomProperty_Aggregate,
  RoomProperty_by_pk?: Maybe<RoomProperty>,
  Room_aggregate: Room_Aggregate,
  Room_by_pk?: Maybe<Room>,
  Tag: Array<Tag>,
  Tag_aggregate: Tag_Aggregate,
  Tag_by_pk?: Maybe<Tag>,
  TravelGuide: Array<TravelGuide>,
  TravelGuideArchSite: Array<TravelGuideArchSite>,
  TravelGuideArchSite_aggregate: TravelGuideArchSite_Aggregate,
  TravelGuideArchSite_by_pk?: Maybe<TravelGuideArchSite>,
  TravelGuideHotel: Array<TravelGuideHotel>,
  TravelGuideHotel_aggregate: TravelGuideHotel_Aggregate,
  TravelGuideHotel_by_pk?: Maybe<TravelGuideHotel>,
  TravelGuideLocation: Array<TravelGuideLocation>,
  TravelGuideLocation_aggregate: TravelGuideLocation_Aggregate,
  TravelGuideLocation_by_pk?: Maybe<TravelGuideLocation>,
  TravelGuideMuseum: Array<TravelGuideMuseum>,
  TravelGuideMuseum_aggregate: TravelGuideMuseum_Aggregate,
  TravelGuideMuseum_by_pk?: Maybe<TravelGuideMuseum>,
  TravelGuideRestaurant: Array<TravelGuideRestaurant>,
  TravelGuideRestaurant_aggregate: TravelGuideRestaurant_Aggregate,
  TravelGuideRestaurant_by_pk?: Maybe<TravelGuideRestaurant>,
  TravelGuide_aggregate: TravelGuide_Aggregate,
  TravelGuide_by_pk?: Maybe<TravelGuide>,
  User: Array<User>,
  UserType: Array<UserType>,
  UserType_aggregate: UserType_Aggregate,
  UserType_by_pk?: Maybe<UserType>,
  User_aggregate: User_Aggregate,
  User_by_pk?: Maybe<User>,
};


export type Query_RootAddressArgs = {
  distinct_on?: Maybe<Array<Address_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Address_Order_By>>,
  where?: Maybe<Address_Bool_Exp>
};


export type Query_RootAddress_AggregateArgs = {
  distinct_on?: Maybe<Array<Address_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Address_Order_By>>,
  where?: Maybe<Address_Bool_Exp>
};


export type Query_RootAddress_By_PkArgs = {
  addressID: Scalars['Int']
};


export type Query_RootArchSiteArgs = {
  distinct_on?: Maybe<Array<ArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSite_Order_By>>,
  where?: Maybe<ArchSite_Bool_Exp>
};


export type Query_RootArchSiteCommentArgs = {
  distinct_on?: Maybe<Array<ArchSiteComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteComment_Order_By>>,
  where?: Maybe<ArchSiteComment_Bool_Exp>
};


export type Query_RootArchSiteComment_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteComment_Order_By>>,
  where?: Maybe<ArchSiteComment_Bool_Exp>
};


export type Query_RootArchSiteComment_By_PkArgs = {
  archSiteCommentID: Scalars['Int']
};


export type Query_RootArchSiteEntranceTypeArgs = {
  distinct_on?: Maybe<Array<ArchSiteEntranceType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteEntranceType_Order_By>>,
  where?: Maybe<ArchSiteEntranceType_Bool_Exp>
};


export type Query_RootArchSiteEntranceType_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteEntranceType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteEntranceType_Order_By>>,
  where?: Maybe<ArchSiteEntranceType_Bool_Exp>
};


export type Query_RootArchSiteEntranceType_By_PkArgs = {
  archSiteEntranceTypeID: Scalars['Int']
};


export type Query_RootArchSitePriceArgs = {
  distinct_on?: Maybe<Array<ArchSitePrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSitePrice_Order_By>>,
  where?: Maybe<ArchSitePrice_Bool_Exp>
};


export type Query_RootArchSitePrice_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSitePrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSitePrice_Order_By>>,
  where?: Maybe<ArchSitePrice_Bool_Exp>
};


export type Query_RootArchSitePrice_By_PkArgs = {
  archSitePriceID: Scalars['Int']
};


export type Query_RootArchSiteTypeArgs = {
  distinct_on?: Maybe<Array<ArchSiteType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteType_Order_By>>,
  where?: Maybe<ArchSiteType_Bool_Exp>
};


export type Query_RootArchSiteTypeArchSiteArgs = {
  distinct_on?: Maybe<Array<ArchSiteTypeArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteTypeArchSite_Order_By>>,
  where?: Maybe<ArchSiteTypeArchSite_Bool_Exp>
};


export type Query_RootArchSiteTypeArchSite_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteTypeArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteTypeArchSite_Order_By>>,
  where?: Maybe<ArchSiteTypeArchSite_Bool_Exp>
};


export type Query_RootArchSiteTypeArchSite_By_PkArgs = {
  archSiteTypeArchSiteID: Scalars['Int']
};


export type Query_RootArchSiteType_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteType_Order_By>>,
  where?: Maybe<ArchSiteType_Bool_Exp>
};


export type Query_RootArchSiteType_By_PkArgs = {
  archSiteTypeID: Scalars['Int']
};


export type Query_RootArchSiteWorkingDayArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDay_Order_By>>,
  where?: Maybe<ArchSiteWorkingDay_Bool_Exp>
};


export type Query_RootArchSiteWorkingDayScheduleArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDaySchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>
};


export type Query_RootArchSiteWorkingDaySchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDaySchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>
};


export type Query_RootArchSiteWorkingDaySchedule_By_PkArgs = {
  archSiteWorkingDayScheduleID: Scalars['Int']
};


export type Query_RootArchSiteWorkingDay_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDay_Order_By>>,
  where?: Maybe<ArchSiteWorkingDay_Bool_Exp>
};


export type Query_RootArchSiteWorkingDay_By_PkArgs = {
  archSiteWorkingDayID: Scalars['Int']
};


export type Query_RootArchSiteWorkingScheduleArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingSchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingSchedule_Bool_Exp>
};


export type Query_RootArchSiteWorkingSchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingSchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingSchedule_Bool_Exp>
};


export type Query_RootArchSiteWorkingSchedule_By_PkArgs = {
  archSiteWorkingScheduleID: Scalars['Int']
};


export type Query_RootArchSite_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSite_Order_By>>,
  where?: Maybe<ArchSite_Bool_Exp>
};


export type Query_RootArchSite_By_PkArgs = {
  archSiteID: Scalars['Int']
};


export type Query_RootArticleArgs = {
  distinct_on?: Maybe<Array<Article_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Article_Order_By>>,
  where?: Maybe<Article_Bool_Exp>
};


export type Query_RootArticleTagArgs = {
  distinct_on?: Maybe<Array<ArticleTag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleTag_Order_By>>,
  where?: Maybe<ArticleTag_Bool_Exp>
};


export type Query_RootArticleTag_AggregateArgs = {
  distinct_on?: Maybe<Array<ArticleTag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleTag_Order_By>>,
  where?: Maybe<ArticleTag_Bool_Exp>
};


export type Query_RootArticleTag_By_PkArgs = {
  articleTagID: Scalars['Int']
};


export type Query_RootArticleUserArgs = {
  distinct_on?: Maybe<Array<ArticleUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleUser_Order_By>>,
  where?: Maybe<ArticleUser_Bool_Exp>
};


export type Query_RootArticleUser_AggregateArgs = {
  distinct_on?: Maybe<Array<ArticleUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleUser_Order_By>>,
  where?: Maybe<ArticleUser_Bool_Exp>
};


export type Query_RootArticleUser_By_PkArgs = {
  articleUserID: Scalars['Int']
};


export type Query_RootArticle_AggregateArgs = {
  distinct_on?: Maybe<Array<Article_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Article_Order_By>>,
  where?: Maybe<Article_Bool_Exp>
};


export type Query_RootArticle_By_PkArgs = {
  articleID: Scalars['Int']
};


export type Query_RootCityArgs = {
  distinct_on?: Maybe<Array<City_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<City_Order_By>>,
  where?: Maybe<City_Bool_Exp>
};


export type Query_RootCity_AggregateArgs = {
  distinct_on?: Maybe<Array<City_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<City_Order_By>>,
  where?: Maybe<City_Bool_Exp>
};


export type Query_RootCity_By_PkArgs = {
  cityID: Scalars['Int']
};


export type Query_RootCompanyArgs = {
  distinct_on?: Maybe<Array<Company_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Company_Order_By>>,
  where?: Maybe<Company_Bool_Exp>
};


export type Query_RootCompanyContactArgs = {
  distinct_on?: Maybe<Array<CompanyContact_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyContact_Order_By>>,
  where?: Maybe<CompanyContact_Bool_Exp>
};


export type Query_RootCompanyContact_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyContact_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyContact_Order_By>>,
  where?: Maybe<CompanyContact_Bool_Exp>
};


export type Query_RootCompanyContact_By_PkArgs = {
  companyContactID: Scalars['Int']
};


export type Query_RootCompanyPhoneArgs = {
  distinct_on?: Maybe<Array<CompanyPhone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyPhone_Order_By>>,
  where?: Maybe<CompanyPhone_Bool_Exp>
};


export type Query_RootCompanyPhone_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyPhone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyPhone_Order_By>>,
  where?: Maybe<CompanyPhone_Bool_Exp>
};


export type Query_RootCompanyPhone_By_PkArgs = {
  companyPhoneID: Scalars['Int']
};


export type Query_RootCompanyUserArgs = {
  distinct_on?: Maybe<Array<CompanyUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyUser_Order_By>>,
  where?: Maybe<CompanyUser_Bool_Exp>
};


export type Query_RootCompanyUser_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyUser_Order_By>>,
  where?: Maybe<CompanyUser_Bool_Exp>
};


export type Query_RootCompanyUser_By_PkArgs = {
  companyUserID: Scalars['Int']
};


export type Query_RootCompany_AggregateArgs = {
  distinct_on?: Maybe<Array<Company_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Company_Order_By>>,
  where?: Maybe<Company_Bool_Exp>
};


export type Query_RootCompany_By_PkArgs = {
  companyID: Scalars['Int']
};


export type Query_RootCountryArgs = {
  distinct_on?: Maybe<Array<Country_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Country_Order_By>>,
  where?: Maybe<Country_Bool_Exp>
};


export type Query_RootCountry_AggregateArgs = {
  distinct_on?: Maybe<Array<Country_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Country_Order_By>>,
  where?: Maybe<Country_Bool_Exp>
};


export type Query_RootCountry_By_PkArgs = {
  countryID: Scalars['Int']
};


export type Query_RootDayArgs = {
  distinct_on?: Maybe<Array<Day_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Day_Order_By>>,
  where?: Maybe<Day_Bool_Exp>
};


export type Query_RootDay_AggregateArgs = {
  distinct_on?: Maybe<Array<Day_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Day_Order_By>>,
  where?: Maybe<Day_Bool_Exp>
};


export type Query_RootDay_By_PkArgs = {
  dayID: Scalars['Int']
};


export type Query_RootDistrictArgs = {
  distinct_on?: Maybe<Array<District_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<District_Order_By>>,
  where?: Maybe<District_Bool_Exp>
};


export type Query_RootDistrict_AggregateArgs = {
  distinct_on?: Maybe<Array<District_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<District_Order_By>>,
  where?: Maybe<District_Bool_Exp>
};


export type Query_RootDistrict_By_PkArgs = {
  districtID: Scalars['Int']
};


export type Query_RootHotelArgs = {
  distinct_on?: Maybe<Array<Hotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Hotel_Order_By>>,
  where?: Maybe<Hotel_Bool_Exp>
};


export type Query_RootHotelCommentArgs = {
  distinct_on?: Maybe<Array<HotelComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelComment_Order_By>>,
  where?: Maybe<HotelComment_Bool_Exp>
};


export type Query_RootHotelComment_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelComment_Order_By>>,
  where?: Maybe<HotelComment_Bool_Exp>
};


export type Query_RootHotelComment_By_PkArgs = {
  hotelCommentID: Scalars['Int']
};


export type Query_RootHotelRoomArgs = {
  distinct_on?: Maybe<Array<HotelRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelRoom_Order_By>>,
  where?: Maybe<HotelRoom_Bool_Exp>
};


export type Query_RootHotelRoom_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelRoom_Order_By>>,
  where?: Maybe<HotelRoom_Bool_Exp>
};


export type Query_RootHotelRoom_By_PkArgs = {
  hotelRoomID: Scalars['Int']
};


export type Query_RootHotelServiceArgs = {
  distinct_on?: Maybe<Array<HotelService_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelService_Order_By>>,
  where?: Maybe<HotelService_Bool_Exp>
};


export type Query_RootHotelServicePropertyArgs = {
  distinct_on?: Maybe<Array<HotelServiceProperty_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelServiceProperty_Order_By>>,
  where?: Maybe<HotelServiceProperty_Bool_Exp>
};


export type Query_RootHotelServiceProperty_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelServiceProperty_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelServiceProperty_Order_By>>,
  where?: Maybe<HotelServiceProperty_Bool_Exp>
};


export type Query_RootHotelServiceProperty_By_PkArgs = {
  hotelServicePropertyID: Scalars['Int']
};


export type Query_RootHotelService_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelService_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelService_Order_By>>,
  where?: Maybe<HotelService_Bool_Exp>
};


export type Query_RootHotelService_By_PkArgs = {
  hotelServiceHotelID: Scalars['Int']
};


export type Query_RootHotel_AggregateArgs = {
  distinct_on?: Maybe<Array<Hotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Hotel_Order_By>>,
  where?: Maybe<Hotel_Bool_Exp>
};


export type Query_RootHotel_By_PkArgs = {
  hotelID: Scalars['Int']
};


export type Query_RootLocationArgs = {
  distinct_on?: Maybe<Array<Location_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Location_Order_By>>,
  where?: Maybe<Location_Bool_Exp>
};


export type Query_RootLocation_AggregateArgs = {
  distinct_on?: Maybe<Array<Location_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Location_Order_By>>,
  where?: Maybe<Location_Bool_Exp>
};


export type Query_RootLocation_By_PkArgs = {
  locationID: Scalars['Int']
};


export type Query_RootLoginTypeArgs = {
  distinct_on?: Maybe<Array<LoginType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<LoginType_Order_By>>,
  where?: Maybe<LoginType_Bool_Exp>
};


export type Query_RootLoginType_AggregateArgs = {
  distinct_on?: Maybe<Array<LoginType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<LoginType_Order_By>>,
  where?: Maybe<LoginType_Bool_Exp>
};


export type Query_RootLoginType_By_PkArgs = {
  loginTypeID: Scalars['Int']
};


export type Query_RootMuseumArgs = {
  distinct_on?: Maybe<Array<Museum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Museum_Order_By>>,
  where?: Maybe<Museum_Bool_Exp>
};


export type Query_RootMuseumCommentArgs = {
  distinct_on?: Maybe<Array<MuseumComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumComment_Order_By>>,
  where?: Maybe<MuseumComment_Bool_Exp>
};


export type Query_RootMuseumComment_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumComment_Order_By>>,
  where?: Maybe<MuseumComment_Bool_Exp>
};


export type Query_RootMuseumComment_By_PkArgs = {
  museumCommentID: Scalars['Int']
};


export type Query_RootMuseumEntranceTypeArgs = {
  distinct_on?: Maybe<Array<MuseumEntranceType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumEntranceType_Order_By>>,
  where?: Maybe<MuseumEntranceType_Bool_Exp>
};


export type Query_RootMuseumEntranceType_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumEntranceType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumEntranceType_Order_By>>,
  where?: Maybe<MuseumEntranceType_Bool_Exp>
};


export type Query_RootMuseumEntranceType_By_PkArgs = {
  museumEntranceTypeID: Scalars['Int']
};


export type Query_RootMuseumPriceArgs = {
  distinct_on?: Maybe<Array<MuseumPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumPrice_Order_By>>,
  where?: Maybe<MuseumPrice_Bool_Exp>
};


export type Query_RootMuseumPrice_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumPrice_Order_By>>,
  where?: Maybe<MuseumPrice_Bool_Exp>
};


export type Query_RootMuseumPrice_By_PkArgs = {
  museumPriceID: Scalars['Int']
};


export type Query_RootMuseumTypeArgs = {
  distinct_on?: Maybe<Array<MuseumType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumType_Order_By>>,
  where?: Maybe<MuseumType_Bool_Exp>
};


export type Query_RootMuseumTypeMuseumArgs = {
  distinct_on?: Maybe<Array<MuseumTypeMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumTypeMuseum_Order_By>>,
  where?: Maybe<MuseumTypeMuseum_Bool_Exp>
};


export type Query_RootMuseumTypeMuseum_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumTypeMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumTypeMuseum_Order_By>>,
  where?: Maybe<MuseumTypeMuseum_Bool_Exp>
};


export type Query_RootMuseumTypeMuseum_By_PkArgs = {
  museumTypeMuseumID: Scalars['Int']
};


export type Query_RootMuseumType_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumType_Order_By>>,
  where?: Maybe<MuseumType_Bool_Exp>
};


export type Query_RootMuseumType_By_PkArgs = {
  museumTypeID: Scalars['Int']
};


export type Query_RootMuseumWorkingDayArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDay_Order_By>>,
  where?: Maybe<MuseumWorkingDay_Bool_Exp>
};


export type Query_RootMuseumWorkingDayScheduleArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDaySchedule_Order_By>>,
  where?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>
};


export type Query_RootMuseumWorkingDaySchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDaySchedule_Order_By>>,
  where?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>
};


export type Query_RootMuseumWorkingDaySchedule_By_PkArgs = {
  museumWorkingDayScheduleID: Scalars['Int']
};


export type Query_RootMuseumWorkingDay_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDay_Order_By>>,
  where?: Maybe<MuseumWorkingDay_Bool_Exp>
};


export type Query_RootMuseumWorkingDay_By_PkArgs = {
  museumWorkingDayID: Scalars['Int']
};


export type Query_RootMuseumWorkingScheduleArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingSchedule_Order_By>>,
  where?: Maybe<MuseumWorkingSchedule_Bool_Exp>
};


export type Query_RootMuseumWorkingSchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingSchedule_Order_By>>,
  where?: Maybe<MuseumWorkingSchedule_Bool_Exp>
};


export type Query_RootMuseumWorkingSchedule_By_PkArgs = {
  museumWorkingScheduleID: Scalars['Int']
};


export type Query_RootMuseum_AggregateArgs = {
  distinct_on?: Maybe<Array<Museum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Museum_Order_By>>,
  where?: Maybe<Museum_Bool_Exp>
};


export type Query_RootMuseum_By_PkArgs = {
  museumID: Scalars['Int']
};


export type Query_RootPhoneArgs = {
  distinct_on?: Maybe<Array<Phone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Phone_Order_By>>,
  where?: Maybe<Phone_Bool_Exp>
};


export type Query_RootPhone_AggregateArgs = {
  distinct_on?: Maybe<Array<Phone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Phone_Order_By>>,
  where?: Maybe<Phone_Bool_Exp>
};


export type Query_RootPhone_By_PkArgs = {
  phoneID: Scalars['Int']
};


export type Query_RootRestaurantArgs = {
  distinct_on?: Maybe<Array<Restaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Restaurant_Order_By>>,
  where?: Maybe<Restaurant_Bool_Exp>
};


export type Query_RootRestaurantAndCuisineTypeArgs = {
  distinct_on?: Maybe<Array<RestaurantAndCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantAndCuisineType_Order_By>>,
  where?: Maybe<RestaurantAndCuisineType_Bool_Exp>
};


export type Query_RootRestaurantAndCuisineType_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantAndCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantAndCuisineType_Order_By>>,
  where?: Maybe<RestaurantAndCuisineType_Bool_Exp>
};


export type Query_RootRestaurantAndCuisineType_By_PkArgs = {
  restaurantAndCuisineTypeID: Scalars['Int']
};


export type Query_RootRestaurantCommentArgs = {
  distinct_on?: Maybe<Array<RestaurantComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantComment_Order_By>>,
  where?: Maybe<RestaurantComment_Bool_Exp>
};


export type Query_RootRestaurantComment_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantComment_Order_By>>,
  where?: Maybe<RestaurantComment_Bool_Exp>
};


export type Query_RootRestaurantComment_By_PkArgs = {
  restaurantCommentID: Scalars['Int']
};


export type Query_RootRestaurantCuisineTypeArgs = {
  distinct_on?: Maybe<Array<RestaurantCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantCuisineType_Order_By>>,
  where?: Maybe<RestaurantCuisineType_Bool_Exp>
};


export type Query_RootRestaurantCuisineType_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantCuisineType_Order_By>>,
  where?: Maybe<RestaurantCuisineType_Bool_Exp>
};


export type Query_RootRestaurantCuisineType_By_PkArgs = {
  restaurantCuisineTypeID: Scalars['Int']
};


export type Query_RootRestaurantFoodArgs = {
  distinct_on?: Maybe<Array<RestaurantFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantFood_Order_By>>,
  where?: Maybe<RestaurantFood_Bool_Exp>
};


export type Query_RootRestaurantFoodTypeArgs = {
  distinct_on?: Maybe<Array<RestaurantFoodType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantFoodType_Order_By>>,
  where?: Maybe<RestaurantFoodType_Bool_Exp>
};


export type Query_RootRestaurantFoodType_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantFoodType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantFoodType_Order_By>>,
  where?: Maybe<RestaurantFoodType_Bool_Exp>
};


export type Query_RootRestaurantFoodType_By_PkArgs = {
  restaurantFoodTypeID: Scalars['Int']
};


export type Query_RootRestaurantFood_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantFood_Order_By>>,
  where?: Maybe<RestaurantFood_Bool_Exp>
};


export type Query_RootRestaurantFood_By_PkArgs = {
  restaurantFoodID: Scalars['Int']
};


export type Query_RootRestaurantMenuArgs = {
  distinct_on?: Maybe<Array<RestaurantMenu_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenu_Order_By>>,
  where?: Maybe<RestaurantMenu_Bool_Exp>
};


export type Query_RootRestaurantMenuFoodArgs = {
  distinct_on?: Maybe<Array<RestaurantMenuFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenuFood_Order_By>>,
  where?: Maybe<RestaurantMenuFood_Bool_Exp>
};


export type Query_RootRestaurantMenuFood_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantMenuFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenuFood_Order_By>>,
  where?: Maybe<RestaurantMenuFood_Bool_Exp>
};


export type Query_RootRestaurantMenuFood_By_PkArgs = {
  restaurantMenuFoodID: Scalars['Int']
};


export type Query_RootRestaurantMenu_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantMenu_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenu_Order_By>>,
  where?: Maybe<RestaurantMenu_Bool_Exp>
};


export type Query_RootRestaurantMenu_By_PkArgs = {
  restaurantMenuID: Scalars['Int']
};


export type Query_RootRestaurantTypeArgs = {
  distinct_on?: Maybe<Array<RestaurantType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantType_Order_By>>,
  where?: Maybe<RestaurantType_Bool_Exp>
};


export type Query_RootRestaurantType_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantType_Order_By>>,
  where?: Maybe<RestaurantType_Bool_Exp>
};


export type Query_RootRestaurantType_By_PkArgs = {
  restaurantTypeID: Scalars['Int']
};


export type Query_RootRestaurantWorkingDayArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDay_Order_By>>,
  where?: Maybe<RestaurantWorkingDay_Bool_Exp>
};


export type Query_RootRestaurantWorkingDayScheduleArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDaySchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>
};


export type Query_RootRestaurantWorkingDaySchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDaySchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>
};


export type Query_RootRestaurantWorkingDaySchedule_By_PkArgs = {
  restaurantWorkingDaySchedule: Scalars['Int']
};


export type Query_RootRestaurantWorkingDay_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDay_Order_By>>,
  where?: Maybe<RestaurantWorkingDay_Bool_Exp>
};


export type Query_RootRestaurantWorkingDay_By_PkArgs = {
  restaurantWorkingDayID: Scalars['Int']
};


export type Query_RootRestaurantWorkingScheduleArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingSchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingSchedule_Bool_Exp>
};


export type Query_RootRestaurantWorkingSchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingSchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingSchedule_Bool_Exp>
};


export type Query_RootRestaurantWorkingSchedule_By_PkArgs = {
  restaurantWorkingScheduleID: Scalars['Int']
};


export type Query_RootRestaurant_AggregateArgs = {
  distinct_on?: Maybe<Array<Restaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Restaurant_Order_By>>,
  where?: Maybe<Restaurant_Bool_Exp>
};


export type Query_RootRestaurant_By_PkArgs = {
  restaurantID: Scalars['Int']
};


export type Query_RootRoomArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Room_Order_By>>,
  where?: Maybe<Room_Bool_Exp>
};


export type Query_RootRoomPictureArgs = {
  distinct_on?: Maybe<Array<RoomPicture_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPicture_Order_By>>,
  where?: Maybe<RoomPicture_Bool_Exp>
};


export type Query_RootRoomPicture_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomPicture_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPicture_Order_By>>,
  where?: Maybe<RoomPicture_Bool_Exp>
};


export type Query_RootRoomPicture_By_PkArgs = {
  roomPictureID: Scalars['Int']
};


export type Query_RootRoomPriceArgs = {
  distinct_on?: Maybe<Array<RoomPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPrice_Order_By>>,
  where?: Maybe<RoomPrice_Bool_Exp>
};


export type Query_RootRoomPrice_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPrice_Order_By>>,
  where?: Maybe<RoomPrice_Bool_Exp>
};


export type Query_RootRoomPrice_By_PkArgs = {
  roomPriceID: Scalars['Int']
};


export type Query_RootRoomPropertyArgs = {
  distinct_on?: Maybe<Array<RoomProperty_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomProperty_Order_By>>,
  where?: Maybe<RoomProperty_Bool_Exp>
};


export type Query_RootRoomPropertyRoomArgs = {
  distinct_on?: Maybe<Array<RoomPropertyRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPropertyRoom_Order_By>>,
  where?: Maybe<RoomPropertyRoom_Bool_Exp>
};


export type Query_RootRoomPropertyRoom_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomPropertyRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPropertyRoom_Order_By>>,
  where?: Maybe<RoomPropertyRoom_Bool_Exp>
};


export type Query_RootRoomPropertyRoom_By_PkArgs = {
  roomPropertyRoomID: Scalars['Int']
};


export type Query_RootRoomProperty_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomProperty_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomProperty_Order_By>>,
  where?: Maybe<RoomProperty_Bool_Exp>
};


export type Query_RootRoomProperty_By_PkArgs = {
  roomPropertyID: Scalars['Int']
};


export type Query_RootRoom_AggregateArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Room_Order_By>>,
  where?: Maybe<Room_Bool_Exp>
};


export type Query_RootRoom_By_PkArgs = {
  roomID: Scalars['Int']
};


export type Query_RootTagArgs = {
  distinct_on?: Maybe<Array<Tag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Tag_Order_By>>,
  where?: Maybe<Tag_Bool_Exp>
};


export type Query_RootTag_AggregateArgs = {
  distinct_on?: Maybe<Array<Tag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Tag_Order_By>>,
  where?: Maybe<Tag_Bool_Exp>
};


export type Query_RootTag_By_PkArgs = {
  tagID: Scalars['Int']
};


export type Query_RootTravelGuideArgs = {
  distinct_on?: Maybe<Array<TravelGuide_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuide_Order_By>>,
  where?: Maybe<TravelGuide_Bool_Exp>
};


export type Query_RootTravelGuideArchSiteArgs = {
  distinct_on?: Maybe<Array<TravelGuideArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideArchSite_Order_By>>,
  where?: Maybe<TravelGuideArchSite_Bool_Exp>
};


export type Query_RootTravelGuideArchSite_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideArchSite_Order_By>>,
  where?: Maybe<TravelGuideArchSite_Bool_Exp>
};


export type Query_RootTravelGuideArchSite_By_PkArgs = {
  travelGuideArchSiteID: Scalars['Int']
};


export type Query_RootTravelGuideHotelArgs = {
  distinct_on?: Maybe<Array<TravelGuideHotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideHotel_Order_By>>,
  where?: Maybe<TravelGuideHotel_Bool_Exp>
};


export type Query_RootTravelGuideHotel_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideHotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideHotel_Order_By>>,
  where?: Maybe<TravelGuideHotel_Bool_Exp>
};


export type Query_RootTravelGuideHotel_By_PkArgs = {
  travelGuideHotel: Scalars['Int']
};


export type Query_RootTravelGuideLocationArgs = {
  distinct_on?: Maybe<Array<TravelGuideLocation_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideLocation_Order_By>>,
  where?: Maybe<TravelGuideLocation_Bool_Exp>
};


export type Query_RootTravelGuideLocation_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideLocation_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideLocation_Order_By>>,
  where?: Maybe<TravelGuideLocation_Bool_Exp>
};


export type Query_RootTravelGuideLocation_By_PkArgs = {
  travelGuideLocationID: Scalars['Int']
};


export type Query_RootTravelGuideMuseumArgs = {
  distinct_on?: Maybe<Array<TravelGuideMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideMuseum_Order_By>>,
  where?: Maybe<TravelGuideMuseum_Bool_Exp>
};


export type Query_RootTravelGuideMuseum_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideMuseum_Order_By>>,
  where?: Maybe<TravelGuideMuseum_Bool_Exp>
};


export type Query_RootTravelGuideMuseum_By_PkArgs = {
  travelGuideMuseumID: Scalars['Int']
};


export type Query_RootTravelGuideRestaurantArgs = {
  distinct_on?: Maybe<Array<TravelGuideRestaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideRestaurant_Order_By>>,
  where?: Maybe<TravelGuideRestaurant_Bool_Exp>
};


export type Query_RootTravelGuideRestaurant_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideRestaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideRestaurant_Order_By>>,
  where?: Maybe<TravelGuideRestaurant_Bool_Exp>
};


export type Query_RootTravelGuideRestaurant_By_PkArgs = {
  travelGuideRestaurantID: Scalars['Int']
};


export type Query_RootTravelGuide_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuide_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuide_Order_By>>,
  where?: Maybe<TravelGuide_Bool_Exp>
};


export type Query_RootTravelGuide_By_PkArgs = {
  travelGuideID: Scalars['Int']
};


export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};


export type Query_RootUserTypeArgs = {
  distinct_on?: Maybe<Array<UserType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserType_Order_By>>,
  where?: Maybe<UserType_Bool_Exp>
};


export type Query_RootUserType_AggregateArgs = {
  distinct_on?: Maybe<Array<UserType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserType_Order_By>>,
  where?: Maybe<UserType_Bool_Exp>
};


export type Query_RootUserType_By_PkArgs = {
  userTypeID: Scalars['Int']
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};


export type Query_RootUser_By_PkArgs = {
  userID: Scalars['Int']
};

export type Restaurant = {
   __typename?: 'Restaurant',
  Company: Company,
  ISO?: Maybe<Scalars['String']>,
  Location: Location,
  RestaurantAndCuisineTypes: Array<RestaurantAndCuisineType>,
  RestaurantAndCuisineTypes_aggregate: RestaurantAndCuisineType_Aggregate,
  RestaurantComments: Array<RestaurantComment>,
  RestaurantComments_aggregate: RestaurantComment_Aggregate,
  RestaurantMenus: Array<RestaurantMenu>,
  RestaurantMenus_aggregate: RestaurantMenu_Aggregate,
  RestaurantType: RestaurantType,
  RestaurantWorkingSchedules: Array<RestaurantWorkingSchedule>,
  RestaurantWorkingSchedules_aggregate: RestaurantWorkingSchedule_Aggregate,
  TravelGuideRestaurants: Array<TravelGuideRestaurant>,
  TravelGuideRestaurants_aggregate: TravelGuideRestaurant_Aggregate,
  companyID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  locationID: Scalars['Int'],
  name: Scalars['String'],
  restaurantID: Scalars['Int'],
  restaurantTypeID: Scalars['Int'],
  since: Scalars['date'],
  star?: Maybe<Scalars['Float']>,
  taxNumber: Scalars['String'],
};


export type RestaurantRestaurantAndCuisineTypesArgs = {
  distinct_on?: Maybe<Array<RestaurantAndCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantAndCuisineType_Order_By>>,
  where?: Maybe<RestaurantAndCuisineType_Bool_Exp>
};


export type RestaurantRestaurantAndCuisineTypes_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantAndCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantAndCuisineType_Order_By>>,
  where?: Maybe<RestaurantAndCuisineType_Bool_Exp>
};


export type RestaurantRestaurantCommentsArgs = {
  distinct_on?: Maybe<Array<RestaurantComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantComment_Order_By>>,
  where?: Maybe<RestaurantComment_Bool_Exp>
};


export type RestaurantRestaurantComments_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantComment_Order_By>>,
  where?: Maybe<RestaurantComment_Bool_Exp>
};


export type RestaurantRestaurantMenusArgs = {
  distinct_on?: Maybe<Array<RestaurantMenu_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenu_Order_By>>,
  where?: Maybe<RestaurantMenu_Bool_Exp>
};


export type RestaurantRestaurantMenus_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantMenu_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenu_Order_By>>,
  where?: Maybe<RestaurantMenu_Bool_Exp>
};


export type RestaurantRestaurantWorkingSchedulesArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingSchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingSchedule_Bool_Exp>
};


export type RestaurantRestaurantWorkingSchedules_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingSchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingSchedule_Bool_Exp>
};


export type RestaurantTravelGuideRestaurantsArgs = {
  distinct_on?: Maybe<Array<TravelGuideRestaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideRestaurant_Order_By>>,
  where?: Maybe<TravelGuideRestaurant_Bool_Exp>
};


export type RestaurantTravelGuideRestaurants_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideRestaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideRestaurant_Order_By>>,
  where?: Maybe<TravelGuideRestaurant_Bool_Exp>
};

export type Restaurant_Aggregate = {
   __typename?: 'Restaurant_aggregate',
  aggregate?: Maybe<Restaurant_Aggregate_Fields>,
  nodes: Array<Restaurant>,
};

export type Restaurant_Aggregate_Fields = {
   __typename?: 'Restaurant_aggregate_fields',
  avg?: Maybe<Restaurant_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Restaurant_Max_Fields>,
  min?: Maybe<Restaurant_Min_Fields>,
  stddev?: Maybe<Restaurant_Stddev_Fields>,
  stddev_pop?: Maybe<Restaurant_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Restaurant_Stddev_Samp_Fields>,
  sum?: Maybe<Restaurant_Sum_Fields>,
  var_pop?: Maybe<Restaurant_Var_Pop_Fields>,
  var_samp?: Maybe<Restaurant_Var_Samp_Fields>,
  variance?: Maybe<Restaurant_Variance_Fields>,
};


export type Restaurant_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Restaurant_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Restaurant_Aggregate_Order_By = {
  avg?: Maybe<Restaurant_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Restaurant_Max_Order_By>,
  min?: Maybe<Restaurant_Min_Order_By>,
  stddev?: Maybe<Restaurant_Stddev_Order_By>,
  stddev_pop?: Maybe<Restaurant_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Restaurant_Stddev_Samp_Order_By>,
  sum?: Maybe<Restaurant_Sum_Order_By>,
  var_pop?: Maybe<Restaurant_Var_Pop_Order_By>,
  var_samp?: Maybe<Restaurant_Var_Samp_Order_By>,
  variance?: Maybe<Restaurant_Variance_Order_By>,
};

export type Restaurant_Arr_Rel_Insert_Input = {
  data: Array<Restaurant_Insert_Input>,
  on_conflict?: Maybe<Restaurant_On_Conflict>,
};

export type Restaurant_Avg_Fields = {
   __typename?: 'Restaurant_avg_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantTypeID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Restaurant_Avg_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Restaurant_Bool_Exp = {
  Company?: Maybe<Company_Bool_Exp>,
  ISO?: Maybe<String_Comparison_Exp>,
  Location?: Maybe<Location_Bool_Exp>,
  RestaurantAndCuisineTypes?: Maybe<RestaurantAndCuisineType_Bool_Exp>,
  RestaurantComments?: Maybe<RestaurantComment_Bool_Exp>,
  RestaurantMenus?: Maybe<RestaurantMenu_Bool_Exp>,
  RestaurantType?: Maybe<RestaurantType_Bool_Exp>,
  RestaurantWorkingSchedules?: Maybe<RestaurantWorkingSchedule_Bool_Exp>,
  TravelGuideRestaurants?: Maybe<TravelGuideRestaurant_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Restaurant_Bool_Exp>>>,
  _not?: Maybe<Restaurant_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Restaurant_Bool_Exp>>>,
  companyID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  locationID?: Maybe<Int_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
  restaurantID?: Maybe<Int_Comparison_Exp>,
  restaurantTypeID?: Maybe<Int_Comparison_Exp>,
  since?: Maybe<Date_Comparison_Exp>,
  star?: Maybe<Float_Comparison_Exp>,
  taxNumber?: Maybe<String_Comparison_Exp>,
};

export enum Restaurant_Constraint {
  RestaurantPkey = 'Restaurant_pkey'
}

export type Restaurant_Inc_Input = {
  companyID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantTypeID?: Maybe<Scalars['Int']>,
};

export type Restaurant_Insert_Input = {
  Company?: Maybe<Company_Obj_Rel_Insert_Input>,
  ISO?: Maybe<Scalars['String']>,
  Location?: Maybe<Location_Obj_Rel_Insert_Input>,
  RestaurantAndCuisineTypes?: Maybe<RestaurantAndCuisineType_Arr_Rel_Insert_Input>,
  RestaurantComments?: Maybe<RestaurantComment_Arr_Rel_Insert_Input>,
  RestaurantMenus?: Maybe<RestaurantMenu_Arr_Rel_Insert_Input>,
  RestaurantType?: Maybe<RestaurantType_Obj_Rel_Insert_Input>,
  RestaurantWorkingSchedules?: Maybe<RestaurantWorkingSchedule_Arr_Rel_Insert_Input>,
  TravelGuideRestaurants?: Maybe<TravelGuideRestaurant_Arr_Rel_Insert_Input>,
  companyID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantTypeID?: Maybe<Scalars['Int']>,
  since?: Maybe<Scalars['date']>,
  star?: Maybe<Scalars['Float']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Restaurant_Max_Fields = {
   __typename?: 'Restaurant_max_fields',
  ISO?: Maybe<Scalars['String']>,
  companyID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantTypeID?: Maybe<Scalars['Int']>,
  since?: Maybe<Scalars['date']>,
  star?: Maybe<Scalars['Float']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Restaurant_Max_Order_By = {
  ISO?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  since?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  taxNumber?: Maybe<Order_By>,
};

export type Restaurant_Min_Fields = {
   __typename?: 'Restaurant_min_fields',
  ISO?: Maybe<Scalars['String']>,
  companyID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantTypeID?: Maybe<Scalars['Int']>,
  since?: Maybe<Scalars['date']>,
  star?: Maybe<Scalars['Float']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Restaurant_Min_Order_By = {
  ISO?: Maybe<Order_By>,
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  since?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  taxNumber?: Maybe<Order_By>,
};

export type Restaurant_Mutation_Response = {
   __typename?: 'Restaurant_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Restaurant>,
};

export type Restaurant_Obj_Rel_Insert_Input = {
  data: Restaurant_Insert_Input,
  on_conflict?: Maybe<Restaurant_On_Conflict>,
};

export type Restaurant_On_Conflict = {
  constraint: Restaurant_Constraint,
  update_columns: Array<Restaurant_Update_Column>,
  where?: Maybe<Restaurant_Bool_Exp>,
};

export type Restaurant_Order_By = {
  Company?: Maybe<Company_Order_By>,
  ISO?: Maybe<Order_By>,
  Location?: Maybe<Location_Order_By>,
  RestaurantAndCuisineTypes_aggregate?: Maybe<RestaurantAndCuisineType_Aggregate_Order_By>,
  RestaurantComments_aggregate?: Maybe<RestaurantComment_Aggregate_Order_By>,
  RestaurantMenus_aggregate?: Maybe<RestaurantMenu_Aggregate_Order_By>,
  RestaurantType?: Maybe<RestaurantType_Order_By>,
  RestaurantWorkingSchedules_aggregate?: Maybe<RestaurantWorkingSchedule_Aggregate_Order_By>,
  TravelGuideRestaurants_aggregate?: Maybe<TravelGuideRestaurant_Aggregate_Order_By>,
  companyID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  since?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  taxNumber?: Maybe<Order_By>,
};

export enum Restaurant_Select_Column {
  Iso = 'ISO',
  CompanyId = 'companyID',
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  Name = 'name',
  RestaurantId = 'restaurantID',
  RestaurantTypeId = 'restaurantTypeID',
  Since = 'since',
  Star = 'star',
  TaxNumber = 'taxNumber'
}

export type Restaurant_Set_Input = {
  ISO?: Maybe<Scalars['String']>,
  companyID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantTypeID?: Maybe<Scalars['Int']>,
  since?: Maybe<Scalars['date']>,
  star?: Maybe<Scalars['Float']>,
  taxNumber?: Maybe<Scalars['String']>,
};

export type Restaurant_Stddev_Fields = {
   __typename?: 'Restaurant_stddev_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantTypeID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Restaurant_Stddev_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Restaurant_Stddev_Pop_Fields = {
   __typename?: 'Restaurant_stddev_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantTypeID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Restaurant_Stddev_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Restaurant_Stddev_Samp_Fields = {
   __typename?: 'Restaurant_stddev_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantTypeID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Restaurant_Stddev_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Restaurant_Sum_Fields = {
   __typename?: 'Restaurant_sum_fields',
  companyID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantTypeID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
};

export type Restaurant_Sum_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export enum Restaurant_Update_Column {
  Iso = 'ISO',
  CompanyId = 'companyID',
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  Name = 'name',
  RestaurantId = 'restaurantID',
  RestaurantTypeId = 'restaurantTypeID',
  Since = 'since',
  Star = 'star',
  TaxNumber = 'taxNumber'
}

export type Restaurant_Var_Pop_Fields = {
   __typename?: 'Restaurant_var_pop_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantTypeID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Restaurant_Var_Pop_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Restaurant_Var_Samp_Fields = {
   __typename?: 'Restaurant_var_samp_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantTypeID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Restaurant_Var_Samp_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type Restaurant_Variance_Fields = {
   __typename?: 'Restaurant_variance_fields',
  companyID?: Maybe<Scalars['Float']>,
  locationID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantTypeID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
};

export type Restaurant_Variance_Order_By = {
  companyID?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
};

export type RestaurantAndCuisineType = {
   __typename?: 'RestaurantAndCuisineType',
  Restaurant: Restaurant,
  RestaurantCuisineType: RestaurantCuisineType,
  isDeleted: Scalars['Boolean'],
  restaurantAndCuisineTypeID: Scalars['Int'],
  restaurantCuisineTypeID: Scalars['Int'],
  restaurantID: Scalars['Int'],
};

export type RestaurantAndCuisineType_Aggregate = {
   __typename?: 'RestaurantAndCuisineType_aggregate',
  aggregate?: Maybe<RestaurantAndCuisineType_Aggregate_Fields>,
  nodes: Array<RestaurantAndCuisineType>,
};

export type RestaurantAndCuisineType_Aggregate_Fields = {
   __typename?: 'RestaurantAndCuisineType_aggregate_fields',
  avg?: Maybe<RestaurantAndCuisineType_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantAndCuisineType_Max_Fields>,
  min?: Maybe<RestaurantAndCuisineType_Min_Fields>,
  stddev?: Maybe<RestaurantAndCuisineType_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantAndCuisineType_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantAndCuisineType_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantAndCuisineType_Sum_Fields>,
  var_pop?: Maybe<RestaurantAndCuisineType_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantAndCuisineType_Var_Samp_Fields>,
  variance?: Maybe<RestaurantAndCuisineType_Variance_Fields>,
};


export type RestaurantAndCuisineType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantAndCuisineType_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantAndCuisineType_Aggregate_Order_By = {
  avg?: Maybe<RestaurantAndCuisineType_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantAndCuisineType_Max_Order_By>,
  min?: Maybe<RestaurantAndCuisineType_Min_Order_By>,
  stddev?: Maybe<RestaurantAndCuisineType_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantAndCuisineType_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantAndCuisineType_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantAndCuisineType_Sum_Order_By>,
  var_pop?: Maybe<RestaurantAndCuisineType_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantAndCuisineType_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantAndCuisineType_Variance_Order_By>,
};

export type RestaurantAndCuisineType_Arr_Rel_Insert_Input = {
  data: Array<RestaurantAndCuisineType_Insert_Input>,
  on_conflict?: Maybe<RestaurantAndCuisineType_On_Conflict>,
};

export type RestaurantAndCuisineType_Avg_Fields = {
   __typename?: 'RestaurantAndCuisineType_avg_fields',
  restaurantAndCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
};

export type RestaurantAndCuisineType_Avg_Order_By = {
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export type RestaurantAndCuisineType_Bool_Exp = {
  Restaurant?: Maybe<Restaurant_Bool_Exp>,
  RestaurantCuisineType?: Maybe<RestaurantCuisineType_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantAndCuisineType_Bool_Exp>>>,
  _not?: Maybe<RestaurantAndCuisineType_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantAndCuisineType_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  restaurantAndCuisineTypeID?: Maybe<Int_Comparison_Exp>,
  restaurantCuisineTypeID?: Maybe<Int_Comparison_Exp>,
  restaurantID?: Maybe<Int_Comparison_Exp>,
};

export enum RestaurantAndCuisineType_Constraint {
  RestaurantAndCuisineTypePkey = 'RestaurantAndCuisineType_pkey'
}

export type RestaurantAndCuisineType_Inc_Input = {
  restaurantAndCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
};

export type RestaurantAndCuisineType_Insert_Input = {
  Restaurant?: Maybe<Restaurant_Obj_Rel_Insert_Input>,
  RestaurantCuisineType?: Maybe<RestaurantCuisineType_Obj_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantAndCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
};

export type RestaurantAndCuisineType_Max_Fields = {
   __typename?: 'RestaurantAndCuisineType_max_fields',
  restaurantAndCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
};

export type RestaurantAndCuisineType_Max_Order_By = {
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export type RestaurantAndCuisineType_Min_Fields = {
   __typename?: 'RestaurantAndCuisineType_min_fields',
  restaurantAndCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
};

export type RestaurantAndCuisineType_Min_Order_By = {
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export type RestaurantAndCuisineType_Mutation_Response = {
   __typename?: 'RestaurantAndCuisineType_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantAndCuisineType>,
};

export type RestaurantAndCuisineType_Obj_Rel_Insert_Input = {
  data: RestaurantAndCuisineType_Insert_Input,
  on_conflict?: Maybe<RestaurantAndCuisineType_On_Conflict>,
};

export type RestaurantAndCuisineType_On_Conflict = {
  constraint: RestaurantAndCuisineType_Constraint,
  update_columns: Array<RestaurantAndCuisineType_Update_Column>,
  where?: Maybe<RestaurantAndCuisineType_Bool_Exp>,
};

export type RestaurantAndCuisineType_Order_By = {
  Restaurant?: Maybe<Restaurant_Order_By>,
  RestaurantCuisineType?: Maybe<RestaurantCuisineType_Order_By>,
  isDeleted?: Maybe<Order_By>,
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export enum RestaurantAndCuisineType_Select_Column {
  IsDeleted = 'isDeleted',
  RestaurantAndCuisineTypeId = 'restaurantAndCuisineTypeID',
  RestaurantCuisineTypeId = 'restaurantCuisineTypeID',
  RestaurantId = 'restaurantID'
}

export type RestaurantAndCuisineType_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantAndCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
};

export type RestaurantAndCuisineType_Stddev_Fields = {
   __typename?: 'RestaurantAndCuisineType_stddev_fields',
  restaurantAndCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
};

export type RestaurantAndCuisineType_Stddev_Order_By = {
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export type RestaurantAndCuisineType_Stddev_Pop_Fields = {
   __typename?: 'RestaurantAndCuisineType_stddev_pop_fields',
  restaurantAndCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
};

export type RestaurantAndCuisineType_Stddev_Pop_Order_By = {
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export type RestaurantAndCuisineType_Stddev_Samp_Fields = {
   __typename?: 'RestaurantAndCuisineType_stddev_samp_fields',
  restaurantAndCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
};

export type RestaurantAndCuisineType_Stddev_Samp_Order_By = {
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export type RestaurantAndCuisineType_Sum_Fields = {
   __typename?: 'RestaurantAndCuisineType_sum_fields',
  restaurantAndCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
};

export type RestaurantAndCuisineType_Sum_Order_By = {
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export enum RestaurantAndCuisineType_Update_Column {
  IsDeleted = 'isDeleted',
  RestaurantAndCuisineTypeId = 'restaurantAndCuisineTypeID',
  RestaurantCuisineTypeId = 'restaurantCuisineTypeID',
  RestaurantId = 'restaurantID'
}

export type RestaurantAndCuisineType_Var_Pop_Fields = {
   __typename?: 'RestaurantAndCuisineType_var_pop_fields',
  restaurantAndCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
};

export type RestaurantAndCuisineType_Var_Pop_Order_By = {
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export type RestaurantAndCuisineType_Var_Samp_Fields = {
   __typename?: 'RestaurantAndCuisineType_var_samp_fields',
  restaurantAndCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
};

export type RestaurantAndCuisineType_Var_Samp_Order_By = {
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export type RestaurantAndCuisineType_Variance_Fields = {
   __typename?: 'RestaurantAndCuisineType_variance_fields',
  restaurantAndCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
};

export type RestaurantAndCuisineType_Variance_Order_By = {
  restaurantAndCuisineTypeID?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
};

export type RestaurantComment = {
   __typename?: 'RestaurantComment',
  Restaurant: Restaurant,
  User: User,
  content: Scalars['String'],
  date: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  restaurantCommentID: Scalars['Int'],
  restaurantID: Scalars['Int'],
  star: Scalars['Float'],
  userID: Scalars['Int'],
};

export type RestaurantComment_Aggregate = {
   __typename?: 'RestaurantComment_aggregate',
  aggregate?: Maybe<RestaurantComment_Aggregate_Fields>,
  nodes: Array<RestaurantComment>,
};

export type RestaurantComment_Aggregate_Fields = {
   __typename?: 'RestaurantComment_aggregate_fields',
  avg?: Maybe<RestaurantComment_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantComment_Max_Fields>,
  min?: Maybe<RestaurantComment_Min_Fields>,
  stddev?: Maybe<RestaurantComment_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantComment_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantComment_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantComment_Sum_Fields>,
  var_pop?: Maybe<RestaurantComment_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantComment_Var_Samp_Fields>,
  variance?: Maybe<RestaurantComment_Variance_Fields>,
};


export type RestaurantComment_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantComment_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantComment_Aggregate_Order_By = {
  avg?: Maybe<RestaurantComment_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantComment_Max_Order_By>,
  min?: Maybe<RestaurantComment_Min_Order_By>,
  stddev?: Maybe<RestaurantComment_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantComment_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantComment_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantComment_Sum_Order_By>,
  var_pop?: Maybe<RestaurantComment_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantComment_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantComment_Variance_Order_By>,
};

export type RestaurantComment_Arr_Rel_Insert_Input = {
  data: Array<RestaurantComment_Insert_Input>,
  on_conflict?: Maybe<RestaurantComment_On_Conflict>,
};

export type RestaurantComment_Avg_Fields = {
   __typename?: 'RestaurantComment_avg_fields',
  restaurantCommentID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type RestaurantComment_Avg_Order_By = {
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type RestaurantComment_Bool_Exp = {
  Restaurant?: Maybe<Restaurant_Bool_Exp>,
  User?: Maybe<User_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantComment_Bool_Exp>>>,
  _not?: Maybe<RestaurantComment_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantComment_Bool_Exp>>>,
  content?: Maybe<String_Comparison_Exp>,
  date?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  restaurantCommentID?: Maybe<Int_Comparison_Exp>,
  restaurantID?: Maybe<Int_Comparison_Exp>,
  star?: Maybe<Float_Comparison_Exp>,
  userID?: Maybe<Int_Comparison_Exp>,
};

export enum RestaurantComment_Constraint {
  RestaurantCommentPkey = 'RestaurantComment_pkey'
}

export type RestaurantComment_Inc_Input = {
  restaurantCommentID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type RestaurantComment_Insert_Input = {
  Restaurant?: Maybe<Restaurant_Obj_Rel_Insert_Input>,
  User?: Maybe<User_Obj_Rel_Insert_Input>,
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantCommentID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type RestaurantComment_Max_Fields = {
   __typename?: 'RestaurantComment_max_fields',
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  restaurantCommentID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type RestaurantComment_Max_Order_By = {
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type RestaurantComment_Min_Fields = {
   __typename?: 'RestaurantComment_min_fields',
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  restaurantCommentID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type RestaurantComment_Min_Order_By = {
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type RestaurantComment_Mutation_Response = {
   __typename?: 'RestaurantComment_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantComment>,
};

export type RestaurantComment_Obj_Rel_Insert_Input = {
  data: RestaurantComment_Insert_Input,
  on_conflict?: Maybe<RestaurantComment_On_Conflict>,
};

export type RestaurantComment_On_Conflict = {
  constraint: RestaurantComment_Constraint,
  update_columns: Array<RestaurantComment_Update_Column>,
  where?: Maybe<RestaurantComment_Bool_Exp>,
};

export type RestaurantComment_Order_By = {
  Restaurant?: Maybe<Restaurant_Order_By>,
  User?: Maybe<User_Order_By>,
  content?: Maybe<Order_By>,
  date?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum RestaurantComment_Select_Column {
  Content = 'content',
  Date = 'date',
  IsDeleted = 'isDeleted',
  RestaurantCommentId = 'restaurantCommentID',
  RestaurantId = 'restaurantID',
  Star = 'star',
  UserId = 'userID'
}

export type RestaurantComment_Set_Input = {
  content?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantCommentID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type RestaurantComment_Stddev_Fields = {
   __typename?: 'RestaurantComment_stddev_fields',
  restaurantCommentID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type RestaurantComment_Stddev_Order_By = {
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type RestaurantComment_Stddev_Pop_Fields = {
   __typename?: 'RestaurantComment_stddev_pop_fields',
  restaurantCommentID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type RestaurantComment_Stddev_Pop_Order_By = {
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type RestaurantComment_Stddev_Samp_Fields = {
   __typename?: 'RestaurantComment_stddev_samp_fields',
  restaurantCommentID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type RestaurantComment_Stddev_Samp_Order_By = {
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type RestaurantComment_Sum_Fields = {
   __typename?: 'RestaurantComment_sum_fields',
  restaurantCommentID?: Maybe<Scalars['Int']>,
  restaurantID?: Maybe<Scalars['Int']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Int']>,
};

export type RestaurantComment_Sum_Order_By = {
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum RestaurantComment_Update_Column {
  Content = 'content',
  Date = 'date',
  IsDeleted = 'isDeleted',
  RestaurantCommentId = 'restaurantCommentID',
  RestaurantId = 'restaurantID',
  Star = 'star',
  UserId = 'userID'
}

export type RestaurantComment_Var_Pop_Fields = {
   __typename?: 'RestaurantComment_var_pop_fields',
  restaurantCommentID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type RestaurantComment_Var_Pop_Order_By = {
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type RestaurantComment_Var_Samp_Fields = {
   __typename?: 'RestaurantComment_var_samp_fields',
  restaurantCommentID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type RestaurantComment_Var_Samp_Order_By = {
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type RestaurantComment_Variance_Fields = {
   __typename?: 'RestaurantComment_variance_fields',
  restaurantCommentID?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  star?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type RestaurantComment_Variance_Order_By = {
  restaurantCommentID?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  star?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type RestaurantCuisineType = {
   __typename?: 'RestaurantCuisineType',
  RestaurantAndCuisineTypes: Array<RestaurantAndCuisineType>,
  RestaurantAndCuisineTypes_aggregate: RestaurantAndCuisineType_Aggregate,
  isDeleted: Scalars['Boolean'],
  name: Scalars['String'],
  restaurantCuisineTypeID: Scalars['Int'],
};


export type RestaurantCuisineTypeRestaurantAndCuisineTypesArgs = {
  distinct_on?: Maybe<Array<RestaurantAndCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantAndCuisineType_Order_By>>,
  where?: Maybe<RestaurantAndCuisineType_Bool_Exp>
};


export type RestaurantCuisineTypeRestaurantAndCuisineTypes_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantAndCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantAndCuisineType_Order_By>>,
  where?: Maybe<RestaurantAndCuisineType_Bool_Exp>
};

export type RestaurantCuisineType_Aggregate = {
   __typename?: 'RestaurantCuisineType_aggregate',
  aggregate?: Maybe<RestaurantCuisineType_Aggregate_Fields>,
  nodes: Array<RestaurantCuisineType>,
};

export type RestaurantCuisineType_Aggregate_Fields = {
   __typename?: 'RestaurantCuisineType_aggregate_fields',
  avg?: Maybe<RestaurantCuisineType_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantCuisineType_Max_Fields>,
  min?: Maybe<RestaurantCuisineType_Min_Fields>,
  stddev?: Maybe<RestaurantCuisineType_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantCuisineType_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantCuisineType_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantCuisineType_Sum_Fields>,
  var_pop?: Maybe<RestaurantCuisineType_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantCuisineType_Var_Samp_Fields>,
  variance?: Maybe<RestaurantCuisineType_Variance_Fields>,
};


export type RestaurantCuisineType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantCuisineType_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantCuisineType_Aggregate_Order_By = {
  avg?: Maybe<RestaurantCuisineType_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantCuisineType_Max_Order_By>,
  min?: Maybe<RestaurantCuisineType_Min_Order_By>,
  stddev?: Maybe<RestaurantCuisineType_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantCuisineType_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantCuisineType_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantCuisineType_Sum_Order_By>,
  var_pop?: Maybe<RestaurantCuisineType_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantCuisineType_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantCuisineType_Variance_Order_By>,
};

export type RestaurantCuisineType_Arr_Rel_Insert_Input = {
  data: Array<RestaurantCuisineType_Insert_Input>,
  on_conflict?: Maybe<RestaurantCuisineType_On_Conflict>,
};

export type RestaurantCuisineType_Avg_Fields = {
   __typename?: 'RestaurantCuisineType_avg_fields',
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantCuisineType_Avg_Order_By = {
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export type RestaurantCuisineType_Bool_Exp = {
  RestaurantAndCuisineTypes?: Maybe<RestaurantAndCuisineType_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantCuisineType_Bool_Exp>>>,
  _not?: Maybe<RestaurantCuisineType_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantCuisineType_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
  restaurantCuisineTypeID?: Maybe<Int_Comparison_Exp>,
};

export enum RestaurantCuisineType_Constraint {
  RestaurantCuisineTypePkey = 'RestaurantCuisineType_pkey'
}

export type RestaurantCuisineType_Inc_Input = {
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantCuisineType_Insert_Input = {
  RestaurantAndCuisineTypes?: Maybe<RestaurantAndCuisineType_Arr_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantCuisineType_Max_Fields = {
   __typename?: 'RestaurantCuisineType_max_fields',
  name?: Maybe<Scalars['String']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantCuisineType_Max_Order_By = {
  name?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export type RestaurantCuisineType_Min_Fields = {
   __typename?: 'RestaurantCuisineType_min_fields',
  name?: Maybe<Scalars['String']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantCuisineType_Min_Order_By = {
  name?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export type RestaurantCuisineType_Mutation_Response = {
   __typename?: 'RestaurantCuisineType_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantCuisineType>,
};

export type RestaurantCuisineType_Obj_Rel_Insert_Input = {
  data: RestaurantCuisineType_Insert_Input,
  on_conflict?: Maybe<RestaurantCuisineType_On_Conflict>,
};

export type RestaurantCuisineType_On_Conflict = {
  constraint: RestaurantCuisineType_Constraint,
  update_columns: Array<RestaurantCuisineType_Update_Column>,
  where?: Maybe<RestaurantCuisineType_Bool_Exp>,
};

export type RestaurantCuisineType_Order_By = {
  RestaurantAndCuisineTypes_aggregate?: Maybe<RestaurantAndCuisineType_Aggregate_Order_By>,
  isDeleted?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export enum RestaurantCuisineType_Select_Column {
  IsDeleted = 'isDeleted',
  Name = 'name',
  RestaurantCuisineTypeId = 'restaurantCuisineTypeID'
}

export type RestaurantCuisineType_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantCuisineType_Stddev_Fields = {
   __typename?: 'RestaurantCuisineType_stddev_fields',
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantCuisineType_Stddev_Order_By = {
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export type RestaurantCuisineType_Stddev_Pop_Fields = {
   __typename?: 'RestaurantCuisineType_stddev_pop_fields',
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantCuisineType_Stddev_Pop_Order_By = {
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export type RestaurantCuisineType_Stddev_Samp_Fields = {
   __typename?: 'RestaurantCuisineType_stddev_samp_fields',
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantCuisineType_Stddev_Samp_Order_By = {
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export type RestaurantCuisineType_Sum_Fields = {
   __typename?: 'RestaurantCuisineType_sum_fields',
  restaurantCuisineTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantCuisineType_Sum_Order_By = {
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export enum RestaurantCuisineType_Update_Column {
  IsDeleted = 'isDeleted',
  Name = 'name',
  RestaurantCuisineTypeId = 'restaurantCuisineTypeID'
}

export type RestaurantCuisineType_Var_Pop_Fields = {
   __typename?: 'RestaurantCuisineType_var_pop_fields',
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantCuisineType_Var_Pop_Order_By = {
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export type RestaurantCuisineType_Var_Samp_Fields = {
   __typename?: 'RestaurantCuisineType_var_samp_fields',
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantCuisineType_Var_Samp_Order_By = {
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export type RestaurantCuisineType_Variance_Fields = {
   __typename?: 'RestaurantCuisineType_variance_fields',
  restaurantCuisineTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantCuisineType_Variance_Order_By = {
  restaurantCuisineTypeID?: Maybe<Order_By>,
};

export type RestaurantFood = {
   __typename?: 'RestaurantFood',
  RestaurantFoodType: RestaurantFoodType,
  RestaurantMenuFoods: Array<RestaurantMenuFood>,
  RestaurantMenuFoods_aggregate: RestaurantMenuFood_Aggregate,
  isDeleted: Scalars['Boolean'],
  name: Scalars['String'],
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID: Scalars['Int'],
  restaurantFoodTypeID: Scalars['Int'],
};


export type RestaurantFoodRestaurantMenuFoodsArgs = {
  distinct_on?: Maybe<Array<RestaurantMenuFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenuFood_Order_By>>,
  where?: Maybe<RestaurantMenuFood_Bool_Exp>
};


export type RestaurantFoodRestaurantMenuFoods_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantMenuFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenuFood_Order_By>>,
  where?: Maybe<RestaurantMenuFood_Bool_Exp>
};

export type RestaurantFood_Aggregate = {
   __typename?: 'RestaurantFood_aggregate',
  aggregate?: Maybe<RestaurantFood_Aggregate_Fields>,
  nodes: Array<RestaurantFood>,
};

export type RestaurantFood_Aggregate_Fields = {
   __typename?: 'RestaurantFood_aggregate_fields',
  avg?: Maybe<RestaurantFood_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantFood_Max_Fields>,
  min?: Maybe<RestaurantFood_Min_Fields>,
  stddev?: Maybe<RestaurantFood_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantFood_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantFood_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantFood_Sum_Fields>,
  var_pop?: Maybe<RestaurantFood_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantFood_Var_Samp_Fields>,
  variance?: Maybe<RestaurantFood_Variance_Fields>,
};


export type RestaurantFood_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantFood_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantFood_Aggregate_Order_By = {
  avg?: Maybe<RestaurantFood_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantFood_Max_Order_By>,
  min?: Maybe<RestaurantFood_Min_Order_By>,
  stddev?: Maybe<RestaurantFood_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantFood_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantFood_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantFood_Sum_Order_By>,
  var_pop?: Maybe<RestaurantFood_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantFood_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantFood_Variance_Order_By>,
};

export type RestaurantFood_Arr_Rel_Insert_Input = {
  data: Array<RestaurantFood_Insert_Input>,
  on_conflict?: Maybe<RestaurantFood_On_Conflict>,
};

export type RestaurantFood_Avg_Fields = {
   __typename?: 'RestaurantFood_avg_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFood_Avg_Order_By = {
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFood_Bool_Exp = {
  RestaurantFoodType?: Maybe<RestaurantFoodType_Bool_Exp>,
  RestaurantMenuFoods?: Maybe<RestaurantMenuFood_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantFood_Bool_Exp>>>,
  _not?: Maybe<RestaurantFood_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantFood_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
  price?: Maybe<Float_Comparison_Exp>,
  restaurantFoodID?: Maybe<Int_Comparison_Exp>,
  restaurantFoodTypeID?: Maybe<Int_Comparison_Exp>,
};

export enum RestaurantFood_Constraint {
  RestaurantFoodPkey = 'RestaurantFood_pkey'
}

export type RestaurantFood_Inc_Input = {
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantFood_Insert_Input = {
  RestaurantFoodType?: Maybe<RestaurantFoodType_Obj_Rel_Insert_Input>,
  RestaurantMenuFoods?: Maybe<RestaurantMenuFood_Arr_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantFood_Max_Fields = {
   __typename?: 'RestaurantFood_max_fields',
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantFood_Max_Order_By = {
  name?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFood_Min_Fields = {
   __typename?: 'RestaurantFood_min_fields',
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantFood_Min_Order_By = {
  name?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFood_Mutation_Response = {
   __typename?: 'RestaurantFood_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantFood>,
};

export type RestaurantFood_Obj_Rel_Insert_Input = {
  data: RestaurantFood_Insert_Input,
  on_conflict?: Maybe<RestaurantFood_On_Conflict>,
};

export type RestaurantFood_On_Conflict = {
  constraint: RestaurantFood_Constraint,
  update_columns: Array<RestaurantFood_Update_Column>,
  where?: Maybe<RestaurantFood_Bool_Exp>,
};

export type RestaurantFood_Order_By = {
  RestaurantFoodType?: Maybe<RestaurantFoodType_Order_By>,
  RestaurantMenuFoods_aggregate?: Maybe<RestaurantMenuFood_Aggregate_Order_By>,
  isDeleted?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export enum RestaurantFood_Select_Column {
  IsDeleted = 'isDeleted',
  Name = 'name',
  Price = 'price',
  RestaurantFoodId = 'restaurantFoodID',
  RestaurantFoodTypeId = 'restaurantFoodTypeID'
}

export type RestaurantFood_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantFood_Stddev_Fields = {
   __typename?: 'RestaurantFood_stddev_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFood_Stddev_Order_By = {
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFood_Stddev_Pop_Fields = {
   __typename?: 'RestaurantFood_stddev_pop_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFood_Stddev_Pop_Order_By = {
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFood_Stddev_Samp_Fields = {
   __typename?: 'RestaurantFood_stddev_samp_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFood_Stddev_Samp_Order_By = {
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFood_Sum_Fields = {
   __typename?: 'RestaurantFood_sum_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantFood_Sum_Order_By = {
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export enum RestaurantFood_Update_Column {
  IsDeleted = 'isDeleted',
  Name = 'name',
  Price = 'price',
  RestaurantFoodId = 'restaurantFoodID',
  RestaurantFoodTypeId = 'restaurantFoodTypeID'
}

export type RestaurantFood_Var_Pop_Fields = {
   __typename?: 'RestaurantFood_var_pop_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFood_Var_Pop_Order_By = {
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFood_Var_Samp_Fields = {
   __typename?: 'RestaurantFood_var_samp_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFood_Var_Samp_Order_By = {
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFood_Variance_Fields = {
   __typename?: 'RestaurantFood_variance_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFood_Variance_Order_By = {
  price?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFoodType = {
   __typename?: 'RestaurantFoodType',
  RestaurantFoods: Array<RestaurantFood>,
  RestaurantFoods_aggregate: RestaurantFood_Aggregate,
  isDeleted: Scalars['Boolean'],
  restaurantFoodTypeID: Scalars['Int'],
  type: Scalars['String'],
};


export type RestaurantFoodTypeRestaurantFoodsArgs = {
  distinct_on?: Maybe<Array<RestaurantFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantFood_Order_By>>,
  where?: Maybe<RestaurantFood_Bool_Exp>
};


export type RestaurantFoodTypeRestaurantFoods_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantFood_Order_By>>,
  where?: Maybe<RestaurantFood_Bool_Exp>
};

export type RestaurantFoodType_Aggregate = {
   __typename?: 'RestaurantFoodType_aggregate',
  aggregate?: Maybe<RestaurantFoodType_Aggregate_Fields>,
  nodes: Array<RestaurantFoodType>,
};

export type RestaurantFoodType_Aggregate_Fields = {
   __typename?: 'RestaurantFoodType_aggregate_fields',
  avg?: Maybe<RestaurantFoodType_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantFoodType_Max_Fields>,
  min?: Maybe<RestaurantFoodType_Min_Fields>,
  stddev?: Maybe<RestaurantFoodType_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantFoodType_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantFoodType_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantFoodType_Sum_Fields>,
  var_pop?: Maybe<RestaurantFoodType_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantFoodType_Var_Samp_Fields>,
  variance?: Maybe<RestaurantFoodType_Variance_Fields>,
};


export type RestaurantFoodType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantFoodType_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantFoodType_Aggregate_Order_By = {
  avg?: Maybe<RestaurantFoodType_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantFoodType_Max_Order_By>,
  min?: Maybe<RestaurantFoodType_Min_Order_By>,
  stddev?: Maybe<RestaurantFoodType_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantFoodType_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantFoodType_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantFoodType_Sum_Order_By>,
  var_pop?: Maybe<RestaurantFoodType_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantFoodType_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantFoodType_Variance_Order_By>,
};

export type RestaurantFoodType_Arr_Rel_Insert_Input = {
  data: Array<RestaurantFoodType_Insert_Input>,
  on_conflict?: Maybe<RestaurantFoodType_On_Conflict>,
};

export type RestaurantFoodType_Avg_Fields = {
   __typename?: 'RestaurantFoodType_avg_fields',
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFoodType_Avg_Order_By = {
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFoodType_Bool_Exp = {
  RestaurantFoods?: Maybe<RestaurantFood_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantFoodType_Bool_Exp>>>,
  _not?: Maybe<RestaurantFoodType_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantFoodType_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  restaurantFoodTypeID?: Maybe<Int_Comparison_Exp>,
  type?: Maybe<String_Comparison_Exp>,
};

export enum RestaurantFoodType_Constraint {
  RestaurantFoodTypePkey = 'RestaurantFoodType_pkey'
}

export type RestaurantFoodType_Inc_Input = {
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantFoodType_Insert_Input = {
  RestaurantFoods?: Maybe<RestaurantFood_Arr_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type RestaurantFoodType_Max_Fields = {
   __typename?: 'RestaurantFoodType_max_fields',
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type RestaurantFoodType_Max_Order_By = {
  restaurantFoodTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export type RestaurantFoodType_Min_Fields = {
   __typename?: 'RestaurantFoodType_min_fields',
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type RestaurantFoodType_Min_Order_By = {
  restaurantFoodTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export type RestaurantFoodType_Mutation_Response = {
   __typename?: 'RestaurantFoodType_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantFoodType>,
};

export type RestaurantFoodType_Obj_Rel_Insert_Input = {
  data: RestaurantFoodType_Insert_Input,
  on_conflict?: Maybe<RestaurantFoodType_On_Conflict>,
};

export type RestaurantFoodType_On_Conflict = {
  constraint: RestaurantFoodType_Constraint,
  update_columns: Array<RestaurantFoodType_Update_Column>,
  where?: Maybe<RestaurantFoodType_Bool_Exp>,
};

export type RestaurantFoodType_Order_By = {
  RestaurantFoods_aggregate?: Maybe<RestaurantFood_Aggregate_Order_By>,
  isDeleted?: Maybe<Order_By>,
  restaurantFoodTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export enum RestaurantFoodType_Select_Column {
  IsDeleted = 'isDeleted',
  RestaurantFoodTypeId = 'restaurantFoodTypeID',
  Type = 'type'
}

export type RestaurantFoodType_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type RestaurantFoodType_Stddev_Fields = {
   __typename?: 'RestaurantFoodType_stddev_fields',
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFoodType_Stddev_Order_By = {
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFoodType_Stddev_Pop_Fields = {
   __typename?: 'RestaurantFoodType_stddev_pop_fields',
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFoodType_Stddev_Pop_Order_By = {
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFoodType_Stddev_Samp_Fields = {
   __typename?: 'RestaurantFoodType_stddev_samp_fields',
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFoodType_Stddev_Samp_Order_By = {
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFoodType_Sum_Fields = {
   __typename?: 'RestaurantFoodType_sum_fields',
  restaurantFoodTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantFoodType_Sum_Order_By = {
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export enum RestaurantFoodType_Update_Column {
  IsDeleted = 'isDeleted',
  RestaurantFoodTypeId = 'restaurantFoodTypeID',
  Type = 'type'
}

export type RestaurantFoodType_Var_Pop_Fields = {
   __typename?: 'RestaurantFoodType_var_pop_fields',
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFoodType_Var_Pop_Order_By = {
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFoodType_Var_Samp_Fields = {
   __typename?: 'RestaurantFoodType_var_samp_fields',
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFoodType_Var_Samp_Order_By = {
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantFoodType_Variance_Fields = {
   __typename?: 'RestaurantFoodType_variance_fields',
  restaurantFoodTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantFoodType_Variance_Order_By = {
  restaurantFoodTypeID?: Maybe<Order_By>,
};

export type RestaurantMenu = {
   __typename?: 'RestaurantMenu',
  Restaurant: Restaurant,
  RestaurantMenuFoods: Array<RestaurantMenuFood>,
  RestaurantMenuFoods_aggregate: RestaurantMenuFood_Aggregate,
  isDeleted: Scalars['Boolean'],
  name: Scalars['String'],
  price: Scalars['Float'],
  restaurantID: Scalars['Int'],
  restaurantMenuID: Scalars['Int'],
};


export type RestaurantMenuRestaurantMenuFoodsArgs = {
  distinct_on?: Maybe<Array<RestaurantMenuFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenuFood_Order_By>>,
  where?: Maybe<RestaurantMenuFood_Bool_Exp>
};


export type RestaurantMenuRestaurantMenuFoods_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantMenuFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenuFood_Order_By>>,
  where?: Maybe<RestaurantMenuFood_Bool_Exp>
};

export type RestaurantMenu_Aggregate = {
   __typename?: 'RestaurantMenu_aggregate',
  aggregate?: Maybe<RestaurantMenu_Aggregate_Fields>,
  nodes: Array<RestaurantMenu>,
};

export type RestaurantMenu_Aggregate_Fields = {
   __typename?: 'RestaurantMenu_aggregate_fields',
  avg?: Maybe<RestaurantMenu_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantMenu_Max_Fields>,
  min?: Maybe<RestaurantMenu_Min_Fields>,
  stddev?: Maybe<RestaurantMenu_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantMenu_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantMenu_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantMenu_Sum_Fields>,
  var_pop?: Maybe<RestaurantMenu_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantMenu_Var_Samp_Fields>,
  variance?: Maybe<RestaurantMenu_Variance_Fields>,
};


export type RestaurantMenu_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantMenu_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantMenu_Aggregate_Order_By = {
  avg?: Maybe<RestaurantMenu_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantMenu_Max_Order_By>,
  min?: Maybe<RestaurantMenu_Min_Order_By>,
  stddev?: Maybe<RestaurantMenu_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantMenu_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantMenu_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantMenu_Sum_Order_By>,
  var_pop?: Maybe<RestaurantMenu_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantMenu_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantMenu_Variance_Order_By>,
};

export type RestaurantMenu_Arr_Rel_Insert_Input = {
  data: Array<RestaurantMenu_Insert_Input>,
  on_conflict?: Maybe<RestaurantMenu_On_Conflict>,
};

export type RestaurantMenu_Avg_Fields = {
   __typename?: 'RestaurantMenu_avg_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenu_Avg_Order_By = {
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenu_Bool_Exp = {
  Restaurant?: Maybe<Restaurant_Bool_Exp>,
  RestaurantMenuFoods?: Maybe<RestaurantMenuFood_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantMenu_Bool_Exp>>>,
  _not?: Maybe<RestaurantMenu_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantMenu_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
  price?: Maybe<Float_Comparison_Exp>,
  restaurantID?: Maybe<Int_Comparison_Exp>,
  restaurantMenuID?: Maybe<Int_Comparison_Exp>,
};

export enum RestaurantMenu_Constraint {
  RestaurantMenuPkey = 'RestaurantMenu_pkey'
}

export type RestaurantMenu_Inc_Input = {
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenu_Insert_Input = {
  Restaurant?: Maybe<Restaurant_Obj_Rel_Insert_Input>,
  RestaurantMenuFoods?: Maybe<RestaurantMenuFood_Arr_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenu_Max_Fields = {
   __typename?: 'RestaurantMenu_max_fields',
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenu_Max_Order_By = {
  name?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenu_Min_Fields = {
   __typename?: 'RestaurantMenu_min_fields',
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenu_Min_Order_By = {
  name?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenu_Mutation_Response = {
   __typename?: 'RestaurantMenu_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantMenu>,
};

export type RestaurantMenu_Obj_Rel_Insert_Input = {
  data: RestaurantMenu_Insert_Input,
  on_conflict?: Maybe<RestaurantMenu_On_Conflict>,
};

export type RestaurantMenu_On_Conflict = {
  constraint: RestaurantMenu_Constraint,
  update_columns: Array<RestaurantMenu_Update_Column>,
  where?: Maybe<RestaurantMenu_Bool_Exp>,
};

export type RestaurantMenu_Order_By = {
  Restaurant?: Maybe<Restaurant_Order_By>,
  RestaurantMenuFoods_aggregate?: Maybe<RestaurantMenuFood_Aggregate_Order_By>,
  isDeleted?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export enum RestaurantMenu_Select_Column {
  IsDeleted = 'isDeleted',
  Name = 'name',
  Price = 'price',
  RestaurantId = 'restaurantID',
  RestaurantMenuId = 'restaurantMenuID'
}

export type RestaurantMenu_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenu_Stddev_Fields = {
   __typename?: 'RestaurantMenu_stddev_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenu_Stddev_Order_By = {
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenu_Stddev_Pop_Fields = {
   __typename?: 'RestaurantMenu_stddev_pop_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenu_Stddev_Pop_Order_By = {
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenu_Stddev_Samp_Fields = {
   __typename?: 'RestaurantMenu_stddev_samp_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenu_Stddev_Samp_Order_By = {
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenu_Sum_Fields = {
   __typename?: 'RestaurantMenu_sum_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenu_Sum_Order_By = {
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export enum RestaurantMenu_Update_Column {
  IsDeleted = 'isDeleted',
  Name = 'name',
  Price = 'price',
  RestaurantId = 'restaurantID',
  RestaurantMenuId = 'restaurantMenuID'
}

export type RestaurantMenu_Var_Pop_Fields = {
   __typename?: 'RestaurantMenu_var_pop_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenu_Var_Pop_Order_By = {
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenu_Var_Samp_Fields = {
   __typename?: 'RestaurantMenu_var_samp_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenu_Var_Samp_Order_By = {
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenu_Variance_Fields = {
   __typename?: 'RestaurantMenu_variance_fields',
  price?: Maybe<Scalars['Float']>,
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenu_Variance_Order_By = {
  price?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenuFood = {
   __typename?: 'RestaurantMenuFood',
  RestaurantFood: RestaurantFood,
  RestaurantMenu: RestaurantMenu,
  isDeleted: Scalars['Boolean'],
  restaurantFoodID: Scalars['Int'],
  restaurantMenuFoodID: Scalars['Int'],
  restaurantMenuID: Scalars['Int'],
};

export type RestaurantMenuFood_Aggregate = {
   __typename?: 'RestaurantMenuFood_aggregate',
  aggregate?: Maybe<RestaurantMenuFood_Aggregate_Fields>,
  nodes: Array<RestaurantMenuFood>,
};

export type RestaurantMenuFood_Aggregate_Fields = {
   __typename?: 'RestaurantMenuFood_aggregate_fields',
  avg?: Maybe<RestaurantMenuFood_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantMenuFood_Max_Fields>,
  min?: Maybe<RestaurantMenuFood_Min_Fields>,
  stddev?: Maybe<RestaurantMenuFood_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantMenuFood_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantMenuFood_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantMenuFood_Sum_Fields>,
  var_pop?: Maybe<RestaurantMenuFood_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantMenuFood_Var_Samp_Fields>,
  variance?: Maybe<RestaurantMenuFood_Variance_Fields>,
};


export type RestaurantMenuFood_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantMenuFood_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantMenuFood_Aggregate_Order_By = {
  avg?: Maybe<RestaurantMenuFood_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantMenuFood_Max_Order_By>,
  min?: Maybe<RestaurantMenuFood_Min_Order_By>,
  stddev?: Maybe<RestaurantMenuFood_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantMenuFood_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantMenuFood_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantMenuFood_Sum_Order_By>,
  var_pop?: Maybe<RestaurantMenuFood_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantMenuFood_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantMenuFood_Variance_Order_By>,
};

export type RestaurantMenuFood_Arr_Rel_Insert_Input = {
  data: Array<RestaurantMenuFood_Insert_Input>,
  on_conflict?: Maybe<RestaurantMenuFood_On_Conflict>,
};

export type RestaurantMenuFood_Avg_Fields = {
   __typename?: 'RestaurantMenuFood_avg_fields',
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenuFood_Avg_Order_By = {
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenuFood_Bool_Exp = {
  RestaurantFood?: Maybe<RestaurantFood_Bool_Exp>,
  RestaurantMenu?: Maybe<RestaurantMenu_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantMenuFood_Bool_Exp>>>,
  _not?: Maybe<RestaurantMenuFood_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantMenuFood_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  restaurantFoodID?: Maybe<Int_Comparison_Exp>,
  restaurantMenuFoodID?: Maybe<Int_Comparison_Exp>,
  restaurantMenuID?: Maybe<Int_Comparison_Exp>,
};

export enum RestaurantMenuFood_Constraint {
  RestaurantMenuFoodPkey = 'RestaurantMenuFood_pkey'
}

export type RestaurantMenuFood_Inc_Input = {
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenuFood_Insert_Input = {
  RestaurantFood?: Maybe<RestaurantFood_Obj_Rel_Insert_Input>,
  RestaurantMenu?: Maybe<RestaurantMenu_Obj_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenuFood_Max_Fields = {
   __typename?: 'RestaurantMenuFood_max_fields',
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenuFood_Max_Order_By = {
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenuFood_Min_Fields = {
   __typename?: 'RestaurantMenuFood_min_fields',
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenuFood_Min_Order_By = {
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenuFood_Mutation_Response = {
   __typename?: 'RestaurantMenuFood_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantMenuFood>,
};

export type RestaurantMenuFood_Obj_Rel_Insert_Input = {
  data: RestaurantMenuFood_Insert_Input,
  on_conflict?: Maybe<RestaurantMenuFood_On_Conflict>,
};

export type RestaurantMenuFood_On_Conflict = {
  constraint: RestaurantMenuFood_Constraint,
  update_columns: Array<RestaurantMenuFood_Update_Column>,
  where?: Maybe<RestaurantMenuFood_Bool_Exp>,
};

export type RestaurantMenuFood_Order_By = {
  RestaurantFood?: Maybe<RestaurantFood_Order_By>,
  RestaurantMenu?: Maybe<RestaurantMenu_Order_By>,
  isDeleted?: Maybe<Order_By>,
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export enum RestaurantMenuFood_Select_Column {
  IsDeleted = 'isDeleted',
  RestaurantFoodId = 'restaurantFoodID',
  RestaurantMenuFoodId = 'restaurantMenuFoodID',
  RestaurantMenuId = 'restaurantMenuID'
}

export type RestaurantMenuFood_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenuFood_Stddev_Fields = {
   __typename?: 'RestaurantMenuFood_stddev_fields',
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenuFood_Stddev_Order_By = {
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenuFood_Stddev_Pop_Fields = {
   __typename?: 'RestaurantMenuFood_stddev_pop_fields',
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenuFood_Stddev_Pop_Order_By = {
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenuFood_Stddev_Samp_Fields = {
   __typename?: 'RestaurantMenuFood_stddev_samp_fields',
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenuFood_Stddev_Samp_Order_By = {
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenuFood_Sum_Fields = {
   __typename?: 'RestaurantMenuFood_sum_fields',
  restaurantFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuFoodID?: Maybe<Scalars['Int']>,
  restaurantMenuID?: Maybe<Scalars['Int']>,
};

export type RestaurantMenuFood_Sum_Order_By = {
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export enum RestaurantMenuFood_Update_Column {
  IsDeleted = 'isDeleted',
  RestaurantFoodId = 'restaurantFoodID',
  RestaurantMenuFoodId = 'restaurantMenuFoodID',
  RestaurantMenuId = 'restaurantMenuID'
}

export type RestaurantMenuFood_Var_Pop_Fields = {
   __typename?: 'RestaurantMenuFood_var_pop_fields',
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenuFood_Var_Pop_Order_By = {
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenuFood_Var_Samp_Fields = {
   __typename?: 'RestaurantMenuFood_var_samp_fields',
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenuFood_Var_Samp_Order_By = {
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantMenuFood_Variance_Fields = {
   __typename?: 'RestaurantMenuFood_variance_fields',
  restaurantFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuFoodID?: Maybe<Scalars['Float']>,
  restaurantMenuID?: Maybe<Scalars['Float']>,
};

export type RestaurantMenuFood_Variance_Order_By = {
  restaurantFoodID?: Maybe<Order_By>,
  restaurantMenuFoodID?: Maybe<Order_By>,
  restaurantMenuID?: Maybe<Order_By>,
};

export type RestaurantType = {
   __typename?: 'RestaurantType',
  Restaurants: Array<Restaurant>,
  Restaurants_aggregate: Restaurant_Aggregate,
  isDeleted: Scalars['Boolean'],
  restaurantTypeID: Scalars['Int'],
  type: Scalars['String'],
};


export type RestaurantTypeRestaurantsArgs = {
  distinct_on?: Maybe<Array<Restaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Restaurant_Order_By>>,
  where?: Maybe<Restaurant_Bool_Exp>
};


export type RestaurantTypeRestaurants_AggregateArgs = {
  distinct_on?: Maybe<Array<Restaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Restaurant_Order_By>>,
  where?: Maybe<Restaurant_Bool_Exp>
};

export type RestaurantType_Aggregate = {
   __typename?: 'RestaurantType_aggregate',
  aggregate?: Maybe<RestaurantType_Aggregate_Fields>,
  nodes: Array<RestaurantType>,
};

export type RestaurantType_Aggregate_Fields = {
   __typename?: 'RestaurantType_aggregate_fields',
  avg?: Maybe<RestaurantType_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantType_Max_Fields>,
  min?: Maybe<RestaurantType_Min_Fields>,
  stddev?: Maybe<RestaurantType_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantType_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantType_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantType_Sum_Fields>,
  var_pop?: Maybe<RestaurantType_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantType_Var_Samp_Fields>,
  variance?: Maybe<RestaurantType_Variance_Fields>,
};


export type RestaurantType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantType_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantType_Aggregate_Order_By = {
  avg?: Maybe<RestaurantType_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantType_Max_Order_By>,
  min?: Maybe<RestaurantType_Min_Order_By>,
  stddev?: Maybe<RestaurantType_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantType_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantType_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantType_Sum_Order_By>,
  var_pop?: Maybe<RestaurantType_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantType_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantType_Variance_Order_By>,
};

export type RestaurantType_Arr_Rel_Insert_Input = {
  data: Array<RestaurantType_Insert_Input>,
  on_conflict?: Maybe<RestaurantType_On_Conflict>,
};

export type RestaurantType_Avg_Fields = {
   __typename?: 'RestaurantType_avg_fields',
  restaurantTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantType_Avg_Order_By = {
  restaurantTypeID?: Maybe<Order_By>,
};

export type RestaurantType_Bool_Exp = {
  Restaurants?: Maybe<Restaurant_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantType_Bool_Exp>>>,
  _not?: Maybe<RestaurantType_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantType_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  restaurantTypeID?: Maybe<Int_Comparison_Exp>,
  type?: Maybe<String_Comparison_Exp>,
};

export enum RestaurantType_Constraint {
  RestaurantTypePkey = 'RestaurantType_pkey'
}

export type RestaurantType_Inc_Input = {
  restaurantTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantType_Insert_Input = {
  Restaurants?: Maybe<Restaurant_Arr_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type RestaurantType_Max_Fields = {
   __typename?: 'RestaurantType_max_fields',
  restaurantTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type RestaurantType_Max_Order_By = {
  restaurantTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export type RestaurantType_Min_Fields = {
   __typename?: 'RestaurantType_min_fields',
  restaurantTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type RestaurantType_Min_Order_By = {
  restaurantTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export type RestaurantType_Mutation_Response = {
   __typename?: 'RestaurantType_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantType>,
};

export type RestaurantType_Obj_Rel_Insert_Input = {
  data: RestaurantType_Insert_Input,
  on_conflict?: Maybe<RestaurantType_On_Conflict>,
};

export type RestaurantType_On_Conflict = {
  constraint: RestaurantType_Constraint,
  update_columns: Array<RestaurantType_Update_Column>,
  where?: Maybe<RestaurantType_Bool_Exp>,
};

export type RestaurantType_Order_By = {
  Restaurants_aggregate?: Maybe<Restaurant_Aggregate_Order_By>,
  isDeleted?: Maybe<Order_By>,
  restaurantTypeID?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
};

export enum RestaurantType_Select_Column {
  IsDeleted = 'isDeleted',
  RestaurantTypeId = 'restaurantTypeID',
  Type = 'type'
}

export type RestaurantType_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantTypeID?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
};

export type RestaurantType_Stddev_Fields = {
   __typename?: 'RestaurantType_stddev_fields',
  restaurantTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantType_Stddev_Order_By = {
  restaurantTypeID?: Maybe<Order_By>,
};

export type RestaurantType_Stddev_Pop_Fields = {
   __typename?: 'RestaurantType_stddev_pop_fields',
  restaurantTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantType_Stddev_Pop_Order_By = {
  restaurantTypeID?: Maybe<Order_By>,
};

export type RestaurantType_Stddev_Samp_Fields = {
   __typename?: 'RestaurantType_stddev_samp_fields',
  restaurantTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantType_Stddev_Samp_Order_By = {
  restaurantTypeID?: Maybe<Order_By>,
};

export type RestaurantType_Sum_Fields = {
   __typename?: 'RestaurantType_sum_fields',
  restaurantTypeID?: Maybe<Scalars['Int']>,
};

export type RestaurantType_Sum_Order_By = {
  restaurantTypeID?: Maybe<Order_By>,
};

export enum RestaurantType_Update_Column {
  IsDeleted = 'isDeleted',
  RestaurantTypeId = 'restaurantTypeID',
  Type = 'type'
}

export type RestaurantType_Var_Pop_Fields = {
   __typename?: 'RestaurantType_var_pop_fields',
  restaurantTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantType_Var_Pop_Order_By = {
  restaurantTypeID?: Maybe<Order_By>,
};

export type RestaurantType_Var_Samp_Fields = {
   __typename?: 'RestaurantType_var_samp_fields',
  restaurantTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantType_Var_Samp_Order_By = {
  restaurantTypeID?: Maybe<Order_By>,
};

export type RestaurantType_Variance_Fields = {
   __typename?: 'RestaurantType_variance_fields',
  restaurantTypeID?: Maybe<Scalars['Float']>,
};

export type RestaurantType_Variance_Order_By = {
  restaurantTypeID?: Maybe<Order_By>,
};

export type RestaurantWorkingDay = {
   __typename?: 'RestaurantWorkingDay',
  Day: Day,
  RestaurantWorkingDaySchedules: Array<RestaurantWorkingDaySchedule>,
  RestaurantWorkingDaySchedules_aggregate: RestaurantWorkingDaySchedule_Aggregate,
  closeHour: Scalars['timetz'],
  dayID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  openHour: Scalars['timetz'],
  restaurantWorkingDayID: Scalars['Int'],
};


export type RestaurantWorkingDayRestaurantWorkingDaySchedulesArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDaySchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>
};


export type RestaurantWorkingDayRestaurantWorkingDaySchedules_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDaySchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>
};

export type RestaurantWorkingDay_Aggregate = {
   __typename?: 'RestaurantWorkingDay_aggregate',
  aggregate?: Maybe<RestaurantWorkingDay_Aggregate_Fields>,
  nodes: Array<RestaurantWorkingDay>,
};

export type RestaurantWorkingDay_Aggregate_Fields = {
   __typename?: 'RestaurantWorkingDay_aggregate_fields',
  avg?: Maybe<RestaurantWorkingDay_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantWorkingDay_Max_Fields>,
  min?: Maybe<RestaurantWorkingDay_Min_Fields>,
  stddev?: Maybe<RestaurantWorkingDay_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantWorkingDay_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantWorkingDay_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantWorkingDay_Sum_Fields>,
  var_pop?: Maybe<RestaurantWorkingDay_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantWorkingDay_Var_Samp_Fields>,
  variance?: Maybe<RestaurantWorkingDay_Variance_Fields>,
};


export type RestaurantWorkingDay_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantWorkingDay_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantWorkingDay_Aggregate_Order_By = {
  avg?: Maybe<RestaurantWorkingDay_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantWorkingDay_Max_Order_By>,
  min?: Maybe<RestaurantWorkingDay_Min_Order_By>,
  stddev?: Maybe<RestaurantWorkingDay_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantWorkingDay_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantWorkingDay_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantWorkingDay_Sum_Order_By>,
  var_pop?: Maybe<RestaurantWorkingDay_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantWorkingDay_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantWorkingDay_Variance_Order_By>,
};

export type RestaurantWorkingDay_Arr_Rel_Insert_Input = {
  data: Array<RestaurantWorkingDay_Insert_Input>,
  on_conflict?: Maybe<RestaurantWorkingDay_On_Conflict>,
};

export type RestaurantWorkingDay_Avg_Fields = {
   __typename?: 'RestaurantWorkingDay_avg_fields',
  dayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDay_Avg_Order_By = {
  dayID?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export type RestaurantWorkingDay_Bool_Exp = {
  Day?: Maybe<Day_Bool_Exp>,
  RestaurantWorkingDaySchedules?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantWorkingDay_Bool_Exp>>>,
  _not?: Maybe<RestaurantWorkingDay_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantWorkingDay_Bool_Exp>>>,
  closeHour?: Maybe<Timetz_Comparison_Exp>,
  dayID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  openHour?: Maybe<Timetz_Comparison_Exp>,
  restaurantWorkingDayID?: Maybe<Int_Comparison_Exp>,
};

export enum RestaurantWorkingDay_Constraint {
  RestaurantWorkingDayPkey = 'RestaurantWorkingDay_pkey'
}

export type RestaurantWorkingDay_Inc_Input = {
  dayID?: Maybe<Scalars['Int']>,
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDay_Insert_Input = {
  Day?: Maybe<Day_Obj_Rel_Insert_Input>,
  RestaurantWorkingDaySchedules?: Maybe<RestaurantWorkingDaySchedule_Arr_Rel_Insert_Input>,
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  openHour?: Maybe<Scalars['timetz']>,
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDay_Max_Fields = {
   __typename?: 'RestaurantWorkingDay_max_fields',
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  openHour?: Maybe<Scalars['timetz']>,
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDay_Max_Order_By = {
  closeHour?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
  openHour?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export type RestaurantWorkingDay_Min_Fields = {
   __typename?: 'RestaurantWorkingDay_min_fields',
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  openHour?: Maybe<Scalars['timetz']>,
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDay_Min_Order_By = {
  closeHour?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
  openHour?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export type RestaurantWorkingDay_Mutation_Response = {
   __typename?: 'RestaurantWorkingDay_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantWorkingDay>,
};

export type RestaurantWorkingDay_Obj_Rel_Insert_Input = {
  data: RestaurantWorkingDay_Insert_Input,
  on_conflict?: Maybe<RestaurantWorkingDay_On_Conflict>,
};

export type RestaurantWorkingDay_On_Conflict = {
  constraint: RestaurantWorkingDay_Constraint,
  update_columns: Array<RestaurantWorkingDay_Update_Column>,
  where?: Maybe<RestaurantWorkingDay_Bool_Exp>,
};

export type RestaurantWorkingDay_Order_By = {
  Day?: Maybe<Day_Order_By>,
  RestaurantWorkingDaySchedules_aggregate?: Maybe<RestaurantWorkingDaySchedule_Aggregate_Order_By>,
  closeHour?: Maybe<Order_By>,
  dayID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  openHour?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export enum RestaurantWorkingDay_Select_Column {
  CloseHour = 'closeHour',
  DayId = 'dayID',
  IsDeleted = 'isDeleted',
  OpenHour = 'openHour',
  RestaurantWorkingDayId = 'restaurantWorkingDayID'
}

export type RestaurantWorkingDay_Set_Input = {
  closeHour?: Maybe<Scalars['timetz']>,
  dayID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  openHour?: Maybe<Scalars['timetz']>,
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDay_Stddev_Fields = {
   __typename?: 'RestaurantWorkingDay_stddev_fields',
  dayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDay_Stddev_Order_By = {
  dayID?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export type RestaurantWorkingDay_Stddev_Pop_Fields = {
   __typename?: 'RestaurantWorkingDay_stddev_pop_fields',
  dayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDay_Stddev_Pop_Order_By = {
  dayID?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export type RestaurantWorkingDay_Stddev_Samp_Fields = {
   __typename?: 'RestaurantWorkingDay_stddev_samp_fields',
  dayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDay_Stddev_Samp_Order_By = {
  dayID?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export type RestaurantWorkingDay_Sum_Fields = {
   __typename?: 'RestaurantWorkingDay_sum_fields',
  dayID?: Maybe<Scalars['Int']>,
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDay_Sum_Order_By = {
  dayID?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export enum RestaurantWorkingDay_Update_Column {
  CloseHour = 'closeHour',
  DayId = 'dayID',
  IsDeleted = 'isDeleted',
  OpenHour = 'openHour',
  RestaurantWorkingDayId = 'restaurantWorkingDayID'
}

export type RestaurantWorkingDay_Var_Pop_Fields = {
   __typename?: 'RestaurantWorkingDay_var_pop_fields',
  dayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDay_Var_Pop_Order_By = {
  dayID?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export type RestaurantWorkingDay_Var_Samp_Fields = {
   __typename?: 'RestaurantWorkingDay_var_samp_fields',
  dayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDay_Var_Samp_Order_By = {
  dayID?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export type RestaurantWorkingDay_Variance_Fields = {
   __typename?: 'RestaurantWorkingDay_variance_fields',
  dayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDay_Variance_Order_By = {
  dayID?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
};

export type RestaurantWorkingDaySchedule = {
   __typename?: 'RestaurantWorkingDaySchedule',
  RestaurantWorkingDay: RestaurantWorkingDay,
  RestaurantWorkingSchedule: RestaurantWorkingSchedule,
  isDeleted: Scalars['Boolean'],
  restaurantWorkingDayID: Scalars['Int'],
  restaurantWorkingDaySchedule: Scalars['Int'],
  restaurantWorkingScheduleID: Scalars['Int'],
};

export type RestaurantWorkingDaySchedule_Aggregate = {
   __typename?: 'RestaurantWorkingDaySchedule_aggregate',
  aggregate?: Maybe<RestaurantWorkingDaySchedule_Aggregate_Fields>,
  nodes: Array<RestaurantWorkingDaySchedule>,
};

export type RestaurantWorkingDaySchedule_Aggregate_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_aggregate_fields',
  avg?: Maybe<RestaurantWorkingDaySchedule_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantWorkingDaySchedule_Max_Fields>,
  min?: Maybe<RestaurantWorkingDaySchedule_Min_Fields>,
  stddev?: Maybe<RestaurantWorkingDaySchedule_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantWorkingDaySchedule_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantWorkingDaySchedule_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantWorkingDaySchedule_Sum_Fields>,
  var_pop?: Maybe<RestaurantWorkingDaySchedule_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantWorkingDaySchedule_Var_Samp_Fields>,
  variance?: Maybe<RestaurantWorkingDaySchedule_Variance_Fields>,
};


export type RestaurantWorkingDaySchedule_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantWorkingDaySchedule_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantWorkingDaySchedule_Aggregate_Order_By = {
  avg?: Maybe<RestaurantWorkingDaySchedule_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantWorkingDaySchedule_Max_Order_By>,
  min?: Maybe<RestaurantWorkingDaySchedule_Min_Order_By>,
  stddev?: Maybe<RestaurantWorkingDaySchedule_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantWorkingDaySchedule_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantWorkingDaySchedule_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantWorkingDaySchedule_Sum_Order_By>,
  var_pop?: Maybe<RestaurantWorkingDaySchedule_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantWorkingDaySchedule_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantWorkingDaySchedule_Variance_Order_By>,
};

export type RestaurantWorkingDaySchedule_Arr_Rel_Insert_Input = {
  data: Array<RestaurantWorkingDaySchedule_Insert_Input>,
  on_conflict?: Maybe<RestaurantWorkingDaySchedule_On_Conflict>,
};

export type RestaurantWorkingDaySchedule_Avg_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_avg_fields',
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDaySchedule_Avg_Order_By = {
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingDaySchedule_Bool_Exp = {
  RestaurantWorkingDay?: Maybe<RestaurantWorkingDay_Bool_Exp>,
  RestaurantWorkingSchedule?: Maybe<RestaurantWorkingSchedule_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantWorkingDaySchedule_Bool_Exp>>>,
  _not?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantWorkingDaySchedule_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  restaurantWorkingDayID?: Maybe<Int_Comparison_Exp>,
  restaurantWorkingDaySchedule?: Maybe<Int_Comparison_Exp>,
  restaurantWorkingScheduleID?: Maybe<Int_Comparison_Exp>,
};

export enum RestaurantWorkingDaySchedule_Constraint {
  RestaurantWorkingDaySchedulePkey = 'RestaurantWorkingDaySchedule_pkey'
}

export type RestaurantWorkingDaySchedule_Inc_Input = {
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDaySchedule_Insert_Input = {
  RestaurantWorkingDay?: Maybe<RestaurantWorkingDay_Obj_Rel_Insert_Input>,
  RestaurantWorkingSchedule?: Maybe<RestaurantWorkingSchedule_Obj_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDaySchedule_Max_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_max_fields',
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDaySchedule_Max_Order_By = {
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingDaySchedule_Min_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_min_fields',
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDaySchedule_Min_Order_By = {
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingDaySchedule_Mutation_Response = {
   __typename?: 'RestaurantWorkingDaySchedule_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantWorkingDaySchedule>,
};

export type RestaurantWorkingDaySchedule_Obj_Rel_Insert_Input = {
  data: RestaurantWorkingDaySchedule_Insert_Input,
  on_conflict?: Maybe<RestaurantWorkingDaySchedule_On_Conflict>,
};

export type RestaurantWorkingDaySchedule_On_Conflict = {
  constraint: RestaurantWorkingDaySchedule_Constraint,
  update_columns: Array<RestaurantWorkingDaySchedule_Update_Column>,
  where?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>,
};

export type RestaurantWorkingDaySchedule_Order_By = {
  RestaurantWorkingDay?: Maybe<RestaurantWorkingDay_Order_By>,
  RestaurantWorkingSchedule?: Maybe<RestaurantWorkingSchedule_Order_By>,
  isDeleted?: Maybe<Order_By>,
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export enum RestaurantWorkingDaySchedule_Select_Column {
  IsDeleted = 'isDeleted',
  RestaurantWorkingDayId = 'restaurantWorkingDayID',
  RestaurantWorkingDaySchedule = 'restaurantWorkingDaySchedule',
  RestaurantWorkingScheduleId = 'restaurantWorkingScheduleID'
}

export type RestaurantWorkingDaySchedule_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDaySchedule_Stddev_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_stddev_fields',
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDaySchedule_Stddev_Order_By = {
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingDaySchedule_Stddev_Pop_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_stddev_pop_fields',
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDaySchedule_Stddev_Pop_Order_By = {
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingDaySchedule_Stddev_Samp_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_stddev_samp_fields',
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDaySchedule_Stddev_Samp_Order_By = {
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingDaySchedule_Sum_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_sum_fields',
  restaurantWorkingDayID?: Maybe<Scalars['Int']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingDaySchedule_Sum_Order_By = {
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export enum RestaurantWorkingDaySchedule_Update_Column {
  IsDeleted = 'isDeleted',
  RestaurantWorkingDayId = 'restaurantWorkingDayID',
  RestaurantWorkingDaySchedule = 'restaurantWorkingDaySchedule',
  RestaurantWorkingScheduleId = 'restaurantWorkingScheduleID'
}

export type RestaurantWorkingDaySchedule_Var_Pop_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_var_pop_fields',
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDaySchedule_Var_Pop_Order_By = {
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingDaySchedule_Var_Samp_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_var_samp_fields',
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDaySchedule_Var_Samp_Order_By = {
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingDaySchedule_Variance_Fields = {
   __typename?: 'RestaurantWorkingDaySchedule_variance_fields',
  restaurantWorkingDayID?: Maybe<Scalars['Float']>,
  restaurantWorkingDaySchedule?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingDaySchedule_Variance_Order_By = {
  restaurantWorkingDayID?: Maybe<Order_By>,
  restaurantWorkingDaySchedule?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingSchedule = {
   __typename?: 'RestaurantWorkingSchedule',
  Restaurant: Restaurant,
  RestaurantWorkingDaySchedules: Array<RestaurantWorkingDaySchedule>,
  RestaurantWorkingDaySchedules_aggregate: RestaurantWorkingDaySchedule_Aggregate,
  finishDate: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  restaurantID: Scalars['Int'],
  restaurantWorkingScheduleID: Scalars['Int'],
  startDate: Scalars['timestamptz'],
};


export type RestaurantWorkingScheduleRestaurantWorkingDaySchedulesArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDaySchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>
};


export type RestaurantWorkingScheduleRestaurantWorkingDaySchedules_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDaySchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>
};

export type RestaurantWorkingSchedule_Aggregate = {
   __typename?: 'RestaurantWorkingSchedule_aggregate',
  aggregate?: Maybe<RestaurantWorkingSchedule_Aggregate_Fields>,
  nodes: Array<RestaurantWorkingSchedule>,
};

export type RestaurantWorkingSchedule_Aggregate_Fields = {
   __typename?: 'RestaurantWorkingSchedule_aggregate_fields',
  avg?: Maybe<RestaurantWorkingSchedule_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RestaurantWorkingSchedule_Max_Fields>,
  min?: Maybe<RestaurantWorkingSchedule_Min_Fields>,
  stddev?: Maybe<RestaurantWorkingSchedule_Stddev_Fields>,
  stddev_pop?: Maybe<RestaurantWorkingSchedule_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RestaurantWorkingSchedule_Stddev_Samp_Fields>,
  sum?: Maybe<RestaurantWorkingSchedule_Sum_Fields>,
  var_pop?: Maybe<RestaurantWorkingSchedule_Var_Pop_Fields>,
  var_samp?: Maybe<RestaurantWorkingSchedule_Var_Samp_Fields>,
  variance?: Maybe<RestaurantWorkingSchedule_Variance_Fields>,
};


export type RestaurantWorkingSchedule_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RestaurantWorkingSchedule_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RestaurantWorkingSchedule_Aggregate_Order_By = {
  avg?: Maybe<RestaurantWorkingSchedule_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RestaurantWorkingSchedule_Max_Order_By>,
  min?: Maybe<RestaurantWorkingSchedule_Min_Order_By>,
  stddev?: Maybe<RestaurantWorkingSchedule_Stddev_Order_By>,
  stddev_pop?: Maybe<RestaurantWorkingSchedule_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RestaurantWorkingSchedule_Stddev_Samp_Order_By>,
  sum?: Maybe<RestaurantWorkingSchedule_Sum_Order_By>,
  var_pop?: Maybe<RestaurantWorkingSchedule_Var_Pop_Order_By>,
  var_samp?: Maybe<RestaurantWorkingSchedule_Var_Samp_Order_By>,
  variance?: Maybe<RestaurantWorkingSchedule_Variance_Order_By>,
};

export type RestaurantWorkingSchedule_Arr_Rel_Insert_Input = {
  data: Array<RestaurantWorkingSchedule_Insert_Input>,
  on_conflict?: Maybe<RestaurantWorkingSchedule_On_Conflict>,
};

export type RestaurantWorkingSchedule_Avg_Fields = {
   __typename?: 'RestaurantWorkingSchedule_avg_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingSchedule_Avg_Order_By = {
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingSchedule_Bool_Exp = {
  Restaurant?: Maybe<Restaurant_Bool_Exp>,
  RestaurantWorkingDaySchedules?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RestaurantWorkingSchedule_Bool_Exp>>>,
  _not?: Maybe<RestaurantWorkingSchedule_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RestaurantWorkingSchedule_Bool_Exp>>>,
  finishDate?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  restaurantID?: Maybe<Int_Comparison_Exp>,
  restaurantWorkingScheduleID?: Maybe<Int_Comparison_Exp>,
  startDate?: Maybe<Timestamptz_Comparison_Exp>,
};

export enum RestaurantWorkingSchedule_Constraint {
  RestaurantWorkingSchedulePkey = 'RestaurantWorkingSchedule_pkey'
}

export type RestaurantWorkingSchedule_Inc_Input = {
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingSchedule_Insert_Input = {
  Restaurant?: Maybe<Restaurant_Obj_Rel_Insert_Input>,
  RestaurantWorkingDaySchedules?: Maybe<RestaurantWorkingDaySchedule_Arr_Rel_Insert_Input>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type RestaurantWorkingSchedule_Max_Fields = {
   __typename?: 'RestaurantWorkingSchedule_max_fields',
  finishDate?: Maybe<Scalars['timestamptz']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type RestaurantWorkingSchedule_Max_Order_By = {
  finishDate?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type RestaurantWorkingSchedule_Min_Fields = {
   __typename?: 'RestaurantWorkingSchedule_min_fields',
  finishDate?: Maybe<Scalars['timestamptz']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type RestaurantWorkingSchedule_Min_Order_By = {
  finishDate?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type RestaurantWorkingSchedule_Mutation_Response = {
   __typename?: 'RestaurantWorkingSchedule_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RestaurantWorkingSchedule>,
};

export type RestaurantWorkingSchedule_Obj_Rel_Insert_Input = {
  data: RestaurantWorkingSchedule_Insert_Input,
  on_conflict?: Maybe<RestaurantWorkingSchedule_On_Conflict>,
};

export type RestaurantWorkingSchedule_On_Conflict = {
  constraint: RestaurantWorkingSchedule_Constraint,
  update_columns: Array<RestaurantWorkingSchedule_Update_Column>,
  where?: Maybe<RestaurantWorkingSchedule_Bool_Exp>,
};

export type RestaurantWorkingSchedule_Order_By = {
  Restaurant?: Maybe<Restaurant_Order_By>,
  RestaurantWorkingDaySchedules_aggregate?: Maybe<RestaurantWorkingDaySchedule_Aggregate_Order_By>,
  finishDate?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export enum RestaurantWorkingSchedule_Select_Column {
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  RestaurantId = 'restaurantID',
  RestaurantWorkingScheduleId = 'restaurantWorkingScheduleID',
  StartDate = 'startDate'
}

export type RestaurantWorkingSchedule_Set_Input = {
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type RestaurantWorkingSchedule_Stddev_Fields = {
   __typename?: 'RestaurantWorkingSchedule_stddev_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingSchedule_Stddev_Order_By = {
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingSchedule_Stddev_Pop_Fields = {
   __typename?: 'RestaurantWorkingSchedule_stddev_pop_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingSchedule_Stddev_Pop_Order_By = {
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingSchedule_Stddev_Samp_Fields = {
   __typename?: 'RestaurantWorkingSchedule_stddev_samp_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingSchedule_Stddev_Samp_Order_By = {
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingSchedule_Sum_Fields = {
   __typename?: 'RestaurantWorkingSchedule_sum_fields',
  restaurantID?: Maybe<Scalars['Int']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Int']>,
};

export type RestaurantWorkingSchedule_Sum_Order_By = {
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export enum RestaurantWorkingSchedule_Update_Column {
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  RestaurantId = 'restaurantID',
  RestaurantWorkingScheduleId = 'restaurantWorkingScheduleID',
  StartDate = 'startDate'
}

export type RestaurantWorkingSchedule_Var_Pop_Fields = {
   __typename?: 'RestaurantWorkingSchedule_var_pop_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingSchedule_Var_Pop_Order_By = {
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingSchedule_Var_Samp_Fields = {
   __typename?: 'RestaurantWorkingSchedule_var_samp_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingSchedule_Var_Samp_Order_By = {
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type RestaurantWorkingSchedule_Variance_Fields = {
   __typename?: 'RestaurantWorkingSchedule_variance_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  restaurantWorkingScheduleID?: Maybe<Scalars['Float']>,
};

export type RestaurantWorkingSchedule_Variance_Order_By = {
  restaurantID?: Maybe<Order_By>,
  restaurantWorkingScheduleID?: Maybe<Order_By>,
};

export type Room = {
   __typename?: 'Room',
  HotelRooms: Array<HotelRoom>,
  HotelRooms_aggregate: HotelRoom_Aggregate,
  RoomPictures: Array<RoomPicture>,
  RoomPictures_aggregate: RoomPicture_Aggregate,
  RoomPrices: Array<RoomPrice>,
  RoomPrices_aggregate: RoomPrice_Aggregate,
  RoomPropertyRooms: Array<RoomPropertyRoom>,
  RoomPropertyRooms_aggregate: RoomPropertyRoom_Aggregate,
  isDeleted: Scalars['Boolean'],
  roomID: Scalars['Int'],
  roomNo: Scalars['String'],
};


export type RoomHotelRoomsArgs = {
  distinct_on?: Maybe<Array<HotelRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelRoom_Order_By>>,
  where?: Maybe<HotelRoom_Bool_Exp>
};


export type RoomHotelRooms_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelRoom_Order_By>>,
  where?: Maybe<HotelRoom_Bool_Exp>
};


export type RoomRoomPicturesArgs = {
  distinct_on?: Maybe<Array<RoomPicture_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPicture_Order_By>>,
  where?: Maybe<RoomPicture_Bool_Exp>
};


export type RoomRoomPictures_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomPicture_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPicture_Order_By>>,
  where?: Maybe<RoomPicture_Bool_Exp>
};


export type RoomRoomPricesArgs = {
  distinct_on?: Maybe<Array<RoomPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPrice_Order_By>>,
  where?: Maybe<RoomPrice_Bool_Exp>
};


export type RoomRoomPrices_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPrice_Order_By>>,
  where?: Maybe<RoomPrice_Bool_Exp>
};


export type RoomRoomPropertyRoomsArgs = {
  distinct_on?: Maybe<Array<RoomPropertyRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPropertyRoom_Order_By>>,
  where?: Maybe<RoomPropertyRoom_Bool_Exp>
};


export type RoomRoomPropertyRooms_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomPropertyRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPropertyRoom_Order_By>>,
  where?: Maybe<RoomPropertyRoom_Bool_Exp>
};

export type Room_Aggregate = {
   __typename?: 'Room_aggregate',
  aggregate?: Maybe<Room_Aggregate_Fields>,
  nodes: Array<Room>,
};

export type Room_Aggregate_Fields = {
   __typename?: 'Room_aggregate_fields',
  avg?: Maybe<Room_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Room_Max_Fields>,
  min?: Maybe<Room_Min_Fields>,
  stddev?: Maybe<Room_Stddev_Fields>,
  stddev_pop?: Maybe<Room_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Room_Stddev_Samp_Fields>,
  sum?: Maybe<Room_Sum_Fields>,
  var_pop?: Maybe<Room_Var_Pop_Fields>,
  var_samp?: Maybe<Room_Var_Samp_Fields>,
  variance?: Maybe<Room_Variance_Fields>,
};


export type Room_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Room_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Room_Aggregate_Order_By = {
  avg?: Maybe<Room_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Room_Max_Order_By>,
  min?: Maybe<Room_Min_Order_By>,
  stddev?: Maybe<Room_Stddev_Order_By>,
  stddev_pop?: Maybe<Room_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Room_Stddev_Samp_Order_By>,
  sum?: Maybe<Room_Sum_Order_By>,
  var_pop?: Maybe<Room_Var_Pop_Order_By>,
  var_samp?: Maybe<Room_Var_Samp_Order_By>,
  variance?: Maybe<Room_Variance_Order_By>,
};

export type Room_Arr_Rel_Insert_Input = {
  data: Array<Room_Insert_Input>,
  on_conflict?: Maybe<Room_On_Conflict>,
};

export type Room_Avg_Fields = {
   __typename?: 'Room_avg_fields',
  roomID?: Maybe<Scalars['Float']>,
};

export type Room_Avg_Order_By = {
  roomID?: Maybe<Order_By>,
};

export type Room_Bool_Exp = {
  HotelRooms?: Maybe<HotelRoom_Bool_Exp>,
  RoomPictures?: Maybe<RoomPicture_Bool_Exp>,
  RoomPrices?: Maybe<RoomPrice_Bool_Exp>,
  RoomPropertyRooms?: Maybe<RoomPropertyRoom_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Room_Bool_Exp>>>,
  _not?: Maybe<Room_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Room_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  roomID?: Maybe<Int_Comparison_Exp>,
  roomNo?: Maybe<String_Comparison_Exp>,
};

export enum Room_Constraint {
  RoomPkey = 'Room_pkey'
}

export type Room_Inc_Input = {
  roomID?: Maybe<Scalars['Int']>,
};

export type Room_Insert_Input = {
  HotelRooms?: Maybe<HotelRoom_Arr_Rel_Insert_Input>,
  RoomPictures?: Maybe<RoomPicture_Arr_Rel_Insert_Input>,
  RoomPrices?: Maybe<RoomPrice_Arr_Rel_Insert_Input>,
  RoomPropertyRooms?: Maybe<RoomPropertyRoom_Arr_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  roomID?: Maybe<Scalars['Int']>,
  roomNo?: Maybe<Scalars['String']>,
};

export type Room_Max_Fields = {
   __typename?: 'Room_max_fields',
  roomID?: Maybe<Scalars['Int']>,
  roomNo?: Maybe<Scalars['String']>,
};

export type Room_Max_Order_By = {
  roomID?: Maybe<Order_By>,
  roomNo?: Maybe<Order_By>,
};

export type Room_Min_Fields = {
   __typename?: 'Room_min_fields',
  roomID?: Maybe<Scalars['Int']>,
  roomNo?: Maybe<Scalars['String']>,
};

export type Room_Min_Order_By = {
  roomID?: Maybe<Order_By>,
  roomNo?: Maybe<Order_By>,
};

export type Room_Mutation_Response = {
   __typename?: 'Room_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Room>,
};

export type Room_Obj_Rel_Insert_Input = {
  data: Room_Insert_Input,
  on_conflict?: Maybe<Room_On_Conflict>,
};

export type Room_On_Conflict = {
  constraint: Room_Constraint,
  update_columns: Array<Room_Update_Column>,
  where?: Maybe<Room_Bool_Exp>,
};

export type Room_Order_By = {
  HotelRooms_aggregate?: Maybe<HotelRoom_Aggregate_Order_By>,
  RoomPictures_aggregate?: Maybe<RoomPicture_Aggregate_Order_By>,
  RoomPrices_aggregate?: Maybe<RoomPrice_Aggregate_Order_By>,
  RoomPropertyRooms_aggregate?: Maybe<RoomPropertyRoom_Aggregate_Order_By>,
  isDeleted?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomNo?: Maybe<Order_By>,
};

export enum Room_Select_Column {
  IsDeleted = 'isDeleted',
  RoomId = 'roomID',
  RoomNo = 'roomNo'
}

export type Room_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  roomID?: Maybe<Scalars['Int']>,
  roomNo?: Maybe<Scalars['String']>,
};

export type Room_Stddev_Fields = {
   __typename?: 'Room_stddev_fields',
  roomID?: Maybe<Scalars['Float']>,
};

export type Room_Stddev_Order_By = {
  roomID?: Maybe<Order_By>,
};

export type Room_Stddev_Pop_Fields = {
   __typename?: 'Room_stddev_pop_fields',
  roomID?: Maybe<Scalars['Float']>,
};

export type Room_Stddev_Pop_Order_By = {
  roomID?: Maybe<Order_By>,
};

export type Room_Stddev_Samp_Fields = {
   __typename?: 'Room_stddev_samp_fields',
  roomID?: Maybe<Scalars['Float']>,
};

export type Room_Stddev_Samp_Order_By = {
  roomID?: Maybe<Order_By>,
};

export type Room_Sum_Fields = {
   __typename?: 'Room_sum_fields',
  roomID?: Maybe<Scalars['Int']>,
};

export type Room_Sum_Order_By = {
  roomID?: Maybe<Order_By>,
};

export enum Room_Update_Column {
  IsDeleted = 'isDeleted',
  RoomId = 'roomID',
  RoomNo = 'roomNo'
}

export type Room_Var_Pop_Fields = {
   __typename?: 'Room_var_pop_fields',
  roomID?: Maybe<Scalars['Float']>,
};

export type Room_Var_Pop_Order_By = {
  roomID?: Maybe<Order_By>,
};

export type Room_Var_Samp_Fields = {
   __typename?: 'Room_var_samp_fields',
  roomID?: Maybe<Scalars['Float']>,
};

export type Room_Var_Samp_Order_By = {
  roomID?: Maybe<Order_By>,
};

export type Room_Variance_Fields = {
   __typename?: 'Room_variance_fields',
  roomID?: Maybe<Scalars['Float']>,
};

export type Room_Variance_Order_By = {
  roomID?: Maybe<Order_By>,
};

export type RoomPicture = {
   __typename?: 'RoomPicture',
  Room: Room,
  addDate: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  roomID: Scalars['Int'],
  roomPictureID: Scalars['Int'],
  url: Scalars['String'],
};

export type RoomPicture_Aggregate = {
   __typename?: 'RoomPicture_aggregate',
  aggregate?: Maybe<RoomPicture_Aggregate_Fields>,
  nodes: Array<RoomPicture>,
};

export type RoomPicture_Aggregate_Fields = {
   __typename?: 'RoomPicture_aggregate_fields',
  avg?: Maybe<RoomPicture_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RoomPicture_Max_Fields>,
  min?: Maybe<RoomPicture_Min_Fields>,
  stddev?: Maybe<RoomPicture_Stddev_Fields>,
  stddev_pop?: Maybe<RoomPicture_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RoomPicture_Stddev_Samp_Fields>,
  sum?: Maybe<RoomPicture_Sum_Fields>,
  var_pop?: Maybe<RoomPicture_Var_Pop_Fields>,
  var_samp?: Maybe<RoomPicture_Var_Samp_Fields>,
  variance?: Maybe<RoomPicture_Variance_Fields>,
};


export type RoomPicture_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RoomPicture_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RoomPicture_Aggregate_Order_By = {
  avg?: Maybe<RoomPicture_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RoomPicture_Max_Order_By>,
  min?: Maybe<RoomPicture_Min_Order_By>,
  stddev?: Maybe<RoomPicture_Stddev_Order_By>,
  stddev_pop?: Maybe<RoomPicture_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RoomPicture_Stddev_Samp_Order_By>,
  sum?: Maybe<RoomPicture_Sum_Order_By>,
  var_pop?: Maybe<RoomPicture_Var_Pop_Order_By>,
  var_samp?: Maybe<RoomPicture_Var_Samp_Order_By>,
  variance?: Maybe<RoomPicture_Variance_Order_By>,
};

export type RoomPicture_Arr_Rel_Insert_Input = {
  data: Array<RoomPicture_Insert_Input>,
  on_conflict?: Maybe<RoomPicture_On_Conflict>,
};

export type RoomPicture_Avg_Fields = {
   __typename?: 'RoomPicture_avg_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPictureID?: Maybe<Scalars['Float']>,
};

export type RoomPicture_Avg_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
};

export type RoomPicture_Bool_Exp = {
  Room?: Maybe<Room_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RoomPicture_Bool_Exp>>>,
  _not?: Maybe<RoomPicture_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RoomPicture_Bool_Exp>>>,
  addDate?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  roomID?: Maybe<Int_Comparison_Exp>,
  roomPictureID?: Maybe<Int_Comparison_Exp>,
  url?: Maybe<String_Comparison_Exp>,
};

export enum RoomPicture_Constraint {
  RoomPicturePkey = 'RoomPicture_pkey'
}

export type RoomPicture_Inc_Input = {
  roomID?: Maybe<Scalars['Int']>,
  roomPictureID?: Maybe<Scalars['Int']>,
};

export type RoomPicture_Insert_Input = {
  Room?: Maybe<Room_Obj_Rel_Insert_Input>,
  addDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPictureID?: Maybe<Scalars['Int']>,
  url?: Maybe<Scalars['String']>,
};

export type RoomPicture_Max_Fields = {
   __typename?: 'RoomPicture_max_fields',
  addDate?: Maybe<Scalars['timestamptz']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPictureID?: Maybe<Scalars['Int']>,
  url?: Maybe<Scalars['String']>,
};

export type RoomPicture_Max_Order_By = {
  addDate?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
  url?: Maybe<Order_By>,
};

export type RoomPicture_Min_Fields = {
   __typename?: 'RoomPicture_min_fields',
  addDate?: Maybe<Scalars['timestamptz']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPictureID?: Maybe<Scalars['Int']>,
  url?: Maybe<Scalars['String']>,
};

export type RoomPicture_Min_Order_By = {
  addDate?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
  url?: Maybe<Order_By>,
};

export type RoomPicture_Mutation_Response = {
   __typename?: 'RoomPicture_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RoomPicture>,
};

export type RoomPicture_Obj_Rel_Insert_Input = {
  data: RoomPicture_Insert_Input,
  on_conflict?: Maybe<RoomPicture_On_Conflict>,
};

export type RoomPicture_On_Conflict = {
  constraint: RoomPicture_Constraint,
  update_columns: Array<RoomPicture_Update_Column>,
  where?: Maybe<RoomPicture_Bool_Exp>,
};

export type RoomPicture_Order_By = {
  Room?: Maybe<Room_Order_By>,
  addDate?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
  url?: Maybe<Order_By>,
};

export enum RoomPicture_Select_Column {
  AddDate = 'addDate',
  IsDeleted = 'isDeleted',
  RoomId = 'roomID',
  RoomPictureId = 'roomPictureID',
  Url = 'url'
}

export type RoomPicture_Set_Input = {
  addDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPictureID?: Maybe<Scalars['Int']>,
  url?: Maybe<Scalars['String']>,
};

export type RoomPicture_Stddev_Fields = {
   __typename?: 'RoomPicture_stddev_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPictureID?: Maybe<Scalars['Float']>,
};

export type RoomPicture_Stddev_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
};

export type RoomPicture_Stddev_Pop_Fields = {
   __typename?: 'RoomPicture_stddev_pop_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPictureID?: Maybe<Scalars['Float']>,
};

export type RoomPicture_Stddev_Pop_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
};

export type RoomPicture_Stddev_Samp_Fields = {
   __typename?: 'RoomPicture_stddev_samp_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPictureID?: Maybe<Scalars['Float']>,
};

export type RoomPicture_Stddev_Samp_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
};

export type RoomPicture_Sum_Fields = {
   __typename?: 'RoomPicture_sum_fields',
  roomID?: Maybe<Scalars['Int']>,
  roomPictureID?: Maybe<Scalars['Int']>,
};

export type RoomPicture_Sum_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
};

export enum RoomPicture_Update_Column {
  AddDate = 'addDate',
  IsDeleted = 'isDeleted',
  RoomId = 'roomID',
  RoomPictureId = 'roomPictureID',
  Url = 'url'
}

export type RoomPicture_Var_Pop_Fields = {
   __typename?: 'RoomPicture_var_pop_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPictureID?: Maybe<Scalars['Float']>,
};

export type RoomPicture_Var_Pop_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
};

export type RoomPicture_Var_Samp_Fields = {
   __typename?: 'RoomPicture_var_samp_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPictureID?: Maybe<Scalars['Float']>,
};

export type RoomPicture_Var_Samp_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
};

export type RoomPicture_Variance_Fields = {
   __typename?: 'RoomPicture_variance_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPictureID?: Maybe<Scalars['Float']>,
};

export type RoomPicture_Variance_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPictureID?: Maybe<Order_By>,
};

export type RoomPrice = {
   __typename?: 'RoomPrice',
  Room: Room,
  finishDate: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  price: Scalars['Float'],
  roomID: Scalars['Int'],
  roomPriceID: Scalars['Int'],
  startDate: Scalars['timestamptz'],
};

export type RoomPrice_Aggregate = {
   __typename?: 'RoomPrice_aggregate',
  aggregate?: Maybe<RoomPrice_Aggregate_Fields>,
  nodes: Array<RoomPrice>,
};

export type RoomPrice_Aggregate_Fields = {
   __typename?: 'RoomPrice_aggregate_fields',
  avg?: Maybe<RoomPrice_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RoomPrice_Max_Fields>,
  min?: Maybe<RoomPrice_Min_Fields>,
  stddev?: Maybe<RoomPrice_Stddev_Fields>,
  stddev_pop?: Maybe<RoomPrice_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RoomPrice_Stddev_Samp_Fields>,
  sum?: Maybe<RoomPrice_Sum_Fields>,
  var_pop?: Maybe<RoomPrice_Var_Pop_Fields>,
  var_samp?: Maybe<RoomPrice_Var_Samp_Fields>,
  variance?: Maybe<RoomPrice_Variance_Fields>,
};


export type RoomPrice_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RoomPrice_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RoomPrice_Aggregate_Order_By = {
  avg?: Maybe<RoomPrice_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RoomPrice_Max_Order_By>,
  min?: Maybe<RoomPrice_Min_Order_By>,
  stddev?: Maybe<RoomPrice_Stddev_Order_By>,
  stddev_pop?: Maybe<RoomPrice_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RoomPrice_Stddev_Samp_Order_By>,
  sum?: Maybe<RoomPrice_Sum_Order_By>,
  var_pop?: Maybe<RoomPrice_Var_Pop_Order_By>,
  var_samp?: Maybe<RoomPrice_Var_Samp_Order_By>,
  variance?: Maybe<RoomPrice_Variance_Order_By>,
};

export type RoomPrice_Arr_Rel_Insert_Input = {
  data: Array<RoomPrice_Insert_Input>,
  on_conflict?: Maybe<RoomPrice_On_Conflict>,
};

export type RoomPrice_Avg_Fields = {
   __typename?: 'RoomPrice_avg_fields',
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
  roomPriceID?: Maybe<Scalars['Float']>,
};

export type RoomPrice_Avg_Order_By = {
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
};

export type RoomPrice_Bool_Exp = {
  Room?: Maybe<Room_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RoomPrice_Bool_Exp>>>,
  _not?: Maybe<RoomPrice_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RoomPrice_Bool_Exp>>>,
  finishDate?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  price?: Maybe<Float_Comparison_Exp>,
  roomID?: Maybe<Int_Comparison_Exp>,
  roomPriceID?: Maybe<Int_Comparison_Exp>,
  startDate?: Maybe<Timestamptz_Comparison_Exp>,
};

export enum RoomPrice_Constraint {
  RoomPricePkey = 'RoomPrice_pkey'
}

export type RoomPrice_Inc_Input = {
  roomID?: Maybe<Scalars['Int']>,
  roomPriceID?: Maybe<Scalars['Int']>,
};

export type RoomPrice_Insert_Input = {
  Room?: Maybe<Room_Obj_Rel_Insert_Input>,
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPriceID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type RoomPrice_Max_Fields = {
   __typename?: 'RoomPrice_max_fields',
  finishDate?: Maybe<Scalars['timestamptz']>,
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPriceID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type RoomPrice_Max_Order_By = {
  finishDate?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type RoomPrice_Min_Fields = {
   __typename?: 'RoomPrice_min_fields',
  finishDate?: Maybe<Scalars['timestamptz']>,
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPriceID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type RoomPrice_Min_Order_By = {
  finishDate?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export type RoomPrice_Mutation_Response = {
   __typename?: 'RoomPrice_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RoomPrice>,
};

export type RoomPrice_Obj_Rel_Insert_Input = {
  data: RoomPrice_Insert_Input,
  on_conflict?: Maybe<RoomPrice_On_Conflict>,
};

export type RoomPrice_On_Conflict = {
  constraint: RoomPrice_Constraint,
  update_columns: Array<RoomPrice_Update_Column>,
  where?: Maybe<RoomPrice_Bool_Exp>,
};

export type RoomPrice_Order_By = {
  Room?: Maybe<Room_Order_By>,
  finishDate?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
  startDate?: Maybe<Order_By>,
};

export enum RoomPrice_Select_Column {
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  Price = 'price',
  RoomId = 'roomID',
  RoomPriceId = 'roomPriceID',
  StartDate = 'startDate'
}

export type RoomPrice_Set_Input = {
  finishDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPriceID?: Maybe<Scalars['Int']>,
  startDate?: Maybe<Scalars['timestamptz']>,
};

export type RoomPrice_Stddev_Fields = {
   __typename?: 'RoomPrice_stddev_fields',
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
  roomPriceID?: Maybe<Scalars['Float']>,
};

export type RoomPrice_Stddev_Order_By = {
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
};

export type RoomPrice_Stddev_Pop_Fields = {
   __typename?: 'RoomPrice_stddev_pop_fields',
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
  roomPriceID?: Maybe<Scalars['Float']>,
};

export type RoomPrice_Stddev_Pop_Order_By = {
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
};

export type RoomPrice_Stddev_Samp_Fields = {
   __typename?: 'RoomPrice_stddev_samp_fields',
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
  roomPriceID?: Maybe<Scalars['Float']>,
};

export type RoomPrice_Stddev_Samp_Order_By = {
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
};

export type RoomPrice_Sum_Fields = {
   __typename?: 'RoomPrice_sum_fields',
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPriceID?: Maybe<Scalars['Int']>,
};

export type RoomPrice_Sum_Order_By = {
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
};

export enum RoomPrice_Update_Column {
  FinishDate = 'finishDate',
  IsDeleted = 'isDeleted',
  Price = 'price',
  RoomId = 'roomID',
  RoomPriceId = 'roomPriceID',
  StartDate = 'startDate'
}

export type RoomPrice_Var_Pop_Fields = {
   __typename?: 'RoomPrice_var_pop_fields',
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
  roomPriceID?: Maybe<Scalars['Float']>,
};

export type RoomPrice_Var_Pop_Order_By = {
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
};

export type RoomPrice_Var_Samp_Fields = {
   __typename?: 'RoomPrice_var_samp_fields',
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
  roomPriceID?: Maybe<Scalars['Float']>,
};

export type RoomPrice_Var_Samp_Order_By = {
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
};

export type RoomPrice_Variance_Fields = {
   __typename?: 'RoomPrice_variance_fields',
  price?: Maybe<Scalars['Float']>,
  roomID?: Maybe<Scalars['Float']>,
  roomPriceID?: Maybe<Scalars['Float']>,
};

export type RoomPrice_Variance_Order_By = {
  price?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPriceID?: Maybe<Order_By>,
};

export type RoomProperty = {
   __typename?: 'RoomProperty',
  RoomPropertyRooms: Array<RoomPropertyRoom>,
  RoomPropertyRooms_aggregate: RoomPropertyRoom_Aggregate,
  content: Scalars['String'],
  isDeleted: Scalars['Boolean'],
  roomPropertyID: Scalars['Int'],
};


export type RoomPropertyRoomPropertyRoomsArgs = {
  distinct_on?: Maybe<Array<RoomPropertyRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPropertyRoom_Order_By>>,
  where?: Maybe<RoomPropertyRoom_Bool_Exp>
};


export type RoomPropertyRoomPropertyRooms_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomPropertyRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPropertyRoom_Order_By>>,
  where?: Maybe<RoomPropertyRoom_Bool_Exp>
};

export type RoomProperty_Aggregate = {
   __typename?: 'RoomProperty_aggregate',
  aggregate?: Maybe<RoomProperty_Aggregate_Fields>,
  nodes: Array<RoomProperty>,
};

export type RoomProperty_Aggregate_Fields = {
   __typename?: 'RoomProperty_aggregate_fields',
  avg?: Maybe<RoomProperty_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RoomProperty_Max_Fields>,
  min?: Maybe<RoomProperty_Min_Fields>,
  stddev?: Maybe<RoomProperty_Stddev_Fields>,
  stddev_pop?: Maybe<RoomProperty_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RoomProperty_Stddev_Samp_Fields>,
  sum?: Maybe<RoomProperty_Sum_Fields>,
  var_pop?: Maybe<RoomProperty_Var_Pop_Fields>,
  var_samp?: Maybe<RoomProperty_Var_Samp_Fields>,
  variance?: Maybe<RoomProperty_Variance_Fields>,
};


export type RoomProperty_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RoomProperty_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RoomProperty_Aggregate_Order_By = {
  avg?: Maybe<RoomProperty_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RoomProperty_Max_Order_By>,
  min?: Maybe<RoomProperty_Min_Order_By>,
  stddev?: Maybe<RoomProperty_Stddev_Order_By>,
  stddev_pop?: Maybe<RoomProperty_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RoomProperty_Stddev_Samp_Order_By>,
  sum?: Maybe<RoomProperty_Sum_Order_By>,
  var_pop?: Maybe<RoomProperty_Var_Pop_Order_By>,
  var_samp?: Maybe<RoomProperty_Var_Samp_Order_By>,
  variance?: Maybe<RoomProperty_Variance_Order_By>,
};

export type RoomProperty_Arr_Rel_Insert_Input = {
  data: Array<RoomProperty_Insert_Input>,
  on_conflict?: Maybe<RoomProperty_On_Conflict>,
};

export type RoomProperty_Avg_Fields = {
   __typename?: 'RoomProperty_avg_fields',
  roomPropertyID?: Maybe<Scalars['Float']>,
};

export type RoomProperty_Avg_Order_By = {
  roomPropertyID?: Maybe<Order_By>,
};

export type RoomProperty_Bool_Exp = {
  RoomPropertyRooms?: Maybe<RoomPropertyRoom_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RoomProperty_Bool_Exp>>>,
  _not?: Maybe<RoomProperty_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RoomProperty_Bool_Exp>>>,
  content?: Maybe<String_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  roomPropertyID?: Maybe<Int_Comparison_Exp>,
};

export enum RoomProperty_Constraint {
  RoomPropertyPkey = 'RoomProperty_pkey'
}

export type RoomProperty_Inc_Input = {
  roomPropertyID?: Maybe<Scalars['Int']>,
};

export type RoomProperty_Insert_Input = {
  RoomPropertyRooms?: Maybe<RoomPropertyRoom_Arr_Rel_Insert_Input>,
  content?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  roomPropertyID?: Maybe<Scalars['Int']>,
};

export type RoomProperty_Max_Fields = {
   __typename?: 'RoomProperty_max_fields',
  content?: Maybe<Scalars['String']>,
  roomPropertyID?: Maybe<Scalars['Int']>,
};

export type RoomProperty_Max_Order_By = {
  content?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
};

export type RoomProperty_Min_Fields = {
   __typename?: 'RoomProperty_min_fields',
  content?: Maybe<Scalars['String']>,
  roomPropertyID?: Maybe<Scalars['Int']>,
};

export type RoomProperty_Min_Order_By = {
  content?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
};

export type RoomProperty_Mutation_Response = {
   __typename?: 'RoomProperty_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RoomProperty>,
};

export type RoomProperty_Obj_Rel_Insert_Input = {
  data: RoomProperty_Insert_Input,
  on_conflict?: Maybe<RoomProperty_On_Conflict>,
};

export type RoomProperty_On_Conflict = {
  constraint: RoomProperty_Constraint,
  update_columns: Array<RoomProperty_Update_Column>,
  where?: Maybe<RoomProperty_Bool_Exp>,
};

export type RoomProperty_Order_By = {
  RoomPropertyRooms_aggregate?: Maybe<RoomPropertyRoom_Aggregate_Order_By>,
  content?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
};

export enum RoomProperty_Select_Column {
  Content = 'content',
  IsDeleted = 'isDeleted',
  RoomPropertyId = 'roomPropertyID'
}

export type RoomProperty_Set_Input = {
  content?: Maybe<Scalars['String']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  roomPropertyID?: Maybe<Scalars['Int']>,
};

export type RoomProperty_Stddev_Fields = {
   __typename?: 'RoomProperty_stddev_fields',
  roomPropertyID?: Maybe<Scalars['Float']>,
};

export type RoomProperty_Stddev_Order_By = {
  roomPropertyID?: Maybe<Order_By>,
};

export type RoomProperty_Stddev_Pop_Fields = {
   __typename?: 'RoomProperty_stddev_pop_fields',
  roomPropertyID?: Maybe<Scalars['Float']>,
};

export type RoomProperty_Stddev_Pop_Order_By = {
  roomPropertyID?: Maybe<Order_By>,
};

export type RoomProperty_Stddev_Samp_Fields = {
   __typename?: 'RoomProperty_stddev_samp_fields',
  roomPropertyID?: Maybe<Scalars['Float']>,
};

export type RoomProperty_Stddev_Samp_Order_By = {
  roomPropertyID?: Maybe<Order_By>,
};

export type RoomProperty_Sum_Fields = {
   __typename?: 'RoomProperty_sum_fields',
  roomPropertyID?: Maybe<Scalars['Int']>,
};

export type RoomProperty_Sum_Order_By = {
  roomPropertyID?: Maybe<Order_By>,
};

export enum RoomProperty_Update_Column {
  Content = 'content',
  IsDeleted = 'isDeleted',
  RoomPropertyId = 'roomPropertyID'
}

export type RoomProperty_Var_Pop_Fields = {
   __typename?: 'RoomProperty_var_pop_fields',
  roomPropertyID?: Maybe<Scalars['Float']>,
};

export type RoomProperty_Var_Pop_Order_By = {
  roomPropertyID?: Maybe<Order_By>,
};

export type RoomProperty_Var_Samp_Fields = {
   __typename?: 'RoomProperty_var_samp_fields',
  roomPropertyID?: Maybe<Scalars['Float']>,
};

export type RoomProperty_Var_Samp_Order_By = {
  roomPropertyID?: Maybe<Order_By>,
};

export type RoomProperty_Variance_Fields = {
   __typename?: 'RoomProperty_variance_fields',
  roomPropertyID?: Maybe<Scalars['Float']>,
};

export type RoomProperty_Variance_Order_By = {
  roomPropertyID?: Maybe<Order_By>,
};

export type RoomPropertyRoom = {
   __typename?: 'RoomPropertyRoom',
  Room: Room,
  RoomProperty: RoomProperty,
  isDeleted: Scalars['Boolean'],
  roomID: Scalars['Int'],
  roomPropertyID: Scalars['Int'],
  roomPropertyRoomID: Scalars['Int'],
};

export type RoomPropertyRoom_Aggregate = {
   __typename?: 'RoomPropertyRoom_aggregate',
  aggregate?: Maybe<RoomPropertyRoom_Aggregate_Fields>,
  nodes: Array<RoomPropertyRoom>,
};

export type RoomPropertyRoom_Aggregate_Fields = {
   __typename?: 'RoomPropertyRoom_aggregate_fields',
  avg?: Maybe<RoomPropertyRoom_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<RoomPropertyRoom_Max_Fields>,
  min?: Maybe<RoomPropertyRoom_Min_Fields>,
  stddev?: Maybe<RoomPropertyRoom_Stddev_Fields>,
  stddev_pop?: Maybe<RoomPropertyRoom_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<RoomPropertyRoom_Stddev_Samp_Fields>,
  sum?: Maybe<RoomPropertyRoom_Sum_Fields>,
  var_pop?: Maybe<RoomPropertyRoom_Var_Pop_Fields>,
  var_samp?: Maybe<RoomPropertyRoom_Var_Samp_Fields>,
  variance?: Maybe<RoomPropertyRoom_Variance_Fields>,
};


export type RoomPropertyRoom_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RoomPropertyRoom_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type RoomPropertyRoom_Aggregate_Order_By = {
  avg?: Maybe<RoomPropertyRoom_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<RoomPropertyRoom_Max_Order_By>,
  min?: Maybe<RoomPropertyRoom_Min_Order_By>,
  stddev?: Maybe<RoomPropertyRoom_Stddev_Order_By>,
  stddev_pop?: Maybe<RoomPropertyRoom_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<RoomPropertyRoom_Stddev_Samp_Order_By>,
  sum?: Maybe<RoomPropertyRoom_Sum_Order_By>,
  var_pop?: Maybe<RoomPropertyRoom_Var_Pop_Order_By>,
  var_samp?: Maybe<RoomPropertyRoom_Var_Samp_Order_By>,
  variance?: Maybe<RoomPropertyRoom_Variance_Order_By>,
};

export type RoomPropertyRoom_Arr_Rel_Insert_Input = {
  data: Array<RoomPropertyRoom_Insert_Input>,
  on_conflict?: Maybe<RoomPropertyRoom_On_Conflict>,
};

export type RoomPropertyRoom_Avg_Fields = {
   __typename?: 'RoomPropertyRoom_avg_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPropertyID?: Maybe<Scalars['Float']>,
  roomPropertyRoomID?: Maybe<Scalars['Float']>,
};

export type RoomPropertyRoom_Avg_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export type RoomPropertyRoom_Bool_Exp = {
  Room?: Maybe<Room_Bool_Exp>,
  RoomProperty?: Maybe<RoomProperty_Bool_Exp>,
  _and?: Maybe<Array<Maybe<RoomPropertyRoom_Bool_Exp>>>,
  _not?: Maybe<RoomPropertyRoom_Bool_Exp>,
  _or?: Maybe<Array<Maybe<RoomPropertyRoom_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  roomID?: Maybe<Int_Comparison_Exp>,
  roomPropertyID?: Maybe<Int_Comparison_Exp>,
  roomPropertyRoomID?: Maybe<Int_Comparison_Exp>,
};

export enum RoomPropertyRoom_Constraint {
  RoomPropertyRoomPkey = 'RoomPropertyRoom_pkey'
}

export type RoomPropertyRoom_Inc_Input = {
  roomID?: Maybe<Scalars['Int']>,
  roomPropertyID?: Maybe<Scalars['Int']>,
  roomPropertyRoomID?: Maybe<Scalars['Int']>,
};

export type RoomPropertyRoom_Insert_Input = {
  Room?: Maybe<Room_Obj_Rel_Insert_Input>,
  RoomProperty?: Maybe<RoomProperty_Obj_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPropertyID?: Maybe<Scalars['Int']>,
  roomPropertyRoomID?: Maybe<Scalars['Int']>,
};

export type RoomPropertyRoom_Max_Fields = {
   __typename?: 'RoomPropertyRoom_max_fields',
  roomID?: Maybe<Scalars['Int']>,
  roomPropertyID?: Maybe<Scalars['Int']>,
  roomPropertyRoomID?: Maybe<Scalars['Int']>,
};

export type RoomPropertyRoom_Max_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export type RoomPropertyRoom_Min_Fields = {
   __typename?: 'RoomPropertyRoom_min_fields',
  roomID?: Maybe<Scalars['Int']>,
  roomPropertyID?: Maybe<Scalars['Int']>,
  roomPropertyRoomID?: Maybe<Scalars['Int']>,
};

export type RoomPropertyRoom_Min_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export type RoomPropertyRoom_Mutation_Response = {
   __typename?: 'RoomPropertyRoom_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<RoomPropertyRoom>,
};

export type RoomPropertyRoom_Obj_Rel_Insert_Input = {
  data: RoomPropertyRoom_Insert_Input,
  on_conflict?: Maybe<RoomPropertyRoom_On_Conflict>,
};

export type RoomPropertyRoom_On_Conflict = {
  constraint: RoomPropertyRoom_Constraint,
  update_columns: Array<RoomPropertyRoom_Update_Column>,
  where?: Maybe<RoomPropertyRoom_Bool_Exp>,
};

export type RoomPropertyRoom_Order_By = {
  Room?: Maybe<Room_Order_By>,
  RoomProperty?: Maybe<RoomProperty_Order_By>,
  isDeleted?: Maybe<Order_By>,
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export enum RoomPropertyRoom_Select_Column {
  IsDeleted = 'isDeleted',
  RoomId = 'roomID',
  RoomPropertyId = 'roomPropertyID',
  RoomPropertyRoomId = 'roomPropertyRoomID'
}

export type RoomPropertyRoom_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  roomID?: Maybe<Scalars['Int']>,
  roomPropertyID?: Maybe<Scalars['Int']>,
  roomPropertyRoomID?: Maybe<Scalars['Int']>,
};

export type RoomPropertyRoom_Stddev_Fields = {
   __typename?: 'RoomPropertyRoom_stddev_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPropertyID?: Maybe<Scalars['Float']>,
  roomPropertyRoomID?: Maybe<Scalars['Float']>,
};

export type RoomPropertyRoom_Stddev_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export type RoomPropertyRoom_Stddev_Pop_Fields = {
   __typename?: 'RoomPropertyRoom_stddev_pop_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPropertyID?: Maybe<Scalars['Float']>,
  roomPropertyRoomID?: Maybe<Scalars['Float']>,
};

export type RoomPropertyRoom_Stddev_Pop_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export type RoomPropertyRoom_Stddev_Samp_Fields = {
   __typename?: 'RoomPropertyRoom_stddev_samp_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPropertyID?: Maybe<Scalars['Float']>,
  roomPropertyRoomID?: Maybe<Scalars['Float']>,
};

export type RoomPropertyRoom_Stddev_Samp_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export type RoomPropertyRoom_Sum_Fields = {
   __typename?: 'RoomPropertyRoom_sum_fields',
  roomID?: Maybe<Scalars['Int']>,
  roomPropertyID?: Maybe<Scalars['Int']>,
  roomPropertyRoomID?: Maybe<Scalars['Int']>,
};

export type RoomPropertyRoom_Sum_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export enum RoomPropertyRoom_Update_Column {
  IsDeleted = 'isDeleted',
  RoomId = 'roomID',
  RoomPropertyId = 'roomPropertyID',
  RoomPropertyRoomId = 'roomPropertyRoomID'
}

export type RoomPropertyRoom_Var_Pop_Fields = {
   __typename?: 'RoomPropertyRoom_var_pop_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPropertyID?: Maybe<Scalars['Float']>,
  roomPropertyRoomID?: Maybe<Scalars['Float']>,
};

export type RoomPropertyRoom_Var_Pop_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export type RoomPropertyRoom_Var_Samp_Fields = {
   __typename?: 'RoomPropertyRoom_var_samp_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPropertyID?: Maybe<Scalars['Float']>,
  roomPropertyRoomID?: Maybe<Scalars['Float']>,
};

export type RoomPropertyRoom_Var_Samp_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export type RoomPropertyRoom_Variance_Fields = {
   __typename?: 'RoomPropertyRoom_variance_fields',
  roomID?: Maybe<Scalars['Float']>,
  roomPropertyID?: Maybe<Scalars['Float']>,
  roomPropertyRoomID?: Maybe<Scalars['Float']>,
};

export type RoomPropertyRoom_Variance_Order_By = {
  roomID?: Maybe<Order_By>,
  roomPropertyID?: Maybe<Order_By>,
  roomPropertyRoomID?: Maybe<Order_By>,
};

export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>,
  _gt?: Maybe<Scalars['String']>,
  _gte?: Maybe<Scalars['String']>,
  _ilike?: Maybe<Scalars['String']>,
  _in?: Maybe<Array<Scalars['String']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _like?: Maybe<Scalars['String']>,
  _lt?: Maybe<Scalars['String']>,
  _lte?: Maybe<Scalars['String']>,
  _neq?: Maybe<Scalars['String']>,
  _nilike?: Maybe<Scalars['String']>,
  _nin?: Maybe<Array<Scalars['String']>>,
  _nlike?: Maybe<Scalars['String']>,
  _nsimilar?: Maybe<Scalars['String']>,
  _similar?: Maybe<Scalars['String']>,
};

export type Subscription_Root = {
   __typename?: 'subscription_root',
  Address: Array<Address>,
  Address_aggregate: Address_Aggregate,
  Address_by_pk?: Maybe<Address>,
  ArchSite: Array<ArchSite>,
  ArchSiteComment: Array<ArchSiteComment>,
  ArchSiteComment_aggregate: ArchSiteComment_Aggregate,
  ArchSiteComment_by_pk?: Maybe<ArchSiteComment>,
  ArchSiteEntranceType: Array<ArchSiteEntranceType>,
  ArchSiteEntranceType_aggregate: ArchSiteEntranceType_Aggregate,
  ArchSiteEntranceType_by_pk?: Maybe<ArchSiteEntranceType>,
  ArchSitePrice: Array<ArchSitePrice>,
  ArchSitePrice_aggregate: ArchSitePrice_Aggregate,
  ArchSitePrice_by_pk?: Maybe<ArchSitePrice>,
  ArchSiteType: Array<ArchSiteType>,
  ArchSiteTypeArchSite: Array<ArchSiteTypeArchSite>,
  ArchSiteTypeArchSite_aggregate: ArchSiteTypeArchSite_Aggregate,
  ArchSiteTypeArchSite_by_pk?: Maybe<ArchSiteTypeArchSite>,
  ArchSiteType_aggregate: ArchSiteType_Aggregate,
  ArchSiteType_by_pk?: Maybe<ArchSiteType>,
  ArchSiteWorkingDay: Array<ArchSiteWorkingDay>,
  ArchSiteWorkingDaySchedule: Array<ArchSiteWorkingDaySchedule>,
  ArchSiteWorkingDaySchedule_aggregate: ArchSiteWorkingDaySchedule_Aggregate,
  ArchSiteWorkingDaySchedule_by_pk?: Maybe<ArchSiteWorkingDaySchedule>,
  ArchSiteWorkingDay_aggregate: ArchSiteWorkingDay_Aggregate,
  ArchSiteWorkingDay_by_pk?: Maybe<ArchSiteWorkingDay>,
  ArchSiteWorkingSchedule: Array<ArchSiteWorkingSchedule>,
  ArchSiteWorkingSchedule_aggregate: ArchSiteWorkingSchedule_Aggregate,
  ArchSiteWorkingSchedule_by_pk?: Maybe<ArchSiteWorkingSchedule>,
  ArchSite_aggregate: ArchSite_Aggregate,
  ArchSite_by_pk?: Maybe<ArchSite>,
  Article: Array<Article>,
  ArticleTag: Array<ArticleTag>,
  ArticleTag_aggregate: ArticleTag_Aggregate,
  ArticleTag_by_pk?: Maybe<ArticleTag>,
  ArticleUser: Array<ArticleUser>,
  ArticleUser_aggregate: ArticleUser_Aggregate,
  ArticleUser_by_pk?: Maybe<ArticleUser>,
  Article_aggregate: Article_Aggregate,
  Article_by_pk?: Maybe<Article>,
  City: Array<City>,
  City_aggregate: City_Aggregate,
  City_by_pk?: Maybe<City>,
  Company: Array<Company>,
  CompanyContact: Array<CompanyContact>,
  CompanyContact_aggregate: CompanyContact_Aggregate,
  CompanyContact_by_pk?: Maybe<CompanyContact>,
  CompanyPhone: Array<CompanyPhone>,
  CompanyPhone_aggregate: CompanyPhone_Aggregate,
  CompanyPhone_by_pk?: Maybe<CompanyPhone>,
  CompanyUser: Array<CompanyUser>,
  CompanyUser_aggregate: CompanyUser_Aggregate,
  CompanyUser_by_pk?: Maybe<CompanyUser>,
  Company_aggregate: Company_Aggregate,
  Company_by_pk?: Maybe<Company>,
  Country: Array<Country>,
  Country_aggregate: Country_Aggregate,
  Country_by_pk?: Maybe<Country>,
  Day: Array<Day>,
  Day_aggregate: Day_Aggregate,
  Day_by_pk?: Maybe<Day>,
  District: Array<District>,
  District_aggregate: District_Aggregate,
  District_by_pk?: Maybe<District>,
  Hotel: Array<Hotel>,
  HotelComment: Array<HotelComment>,
  HotelComment_aggregate: HotelComment_Aggregate,
  HotelComment_by_pk?: Maybe<HotelComment>,
  HotelRoom: Array<HotelRoom>,
  HotelRoom_aggregate: HotelRoom_Aggregate,
  HotelRoom_by_pk?: Maybe<HotelRoom>,
  HotelService: Array<HotelService>,
  HotelServiceProperty: Array<HotelServiceProperty>,
  HotelServiceProperty_aggregate: HotelServiceProperty_Aggregate,
  HotelServiceProperty_by_pk?: Maybe<HotelServiceProperty>,
  HotelService_aggregate: HotelService_Aggregate,
  HotelService_by_pk?: Maybe<HotelService>,
  Hotel_aggregate: Hotel_Aggregate,
  Hotel_by_pk?: Maybe<Hotel>,
  Location: Array<Location>,
  Location_aggregate: Location_Aggregate,
  Location_by_pk?: Maybe<Location>,
  LoginType: Array<LoginType>,
  LoginType_aggregate: LoginType_Aggregate,
  LoginType_by_pk?: Maybe<LoginType>,
  Museum: Array<Museum>,
  MuseumComment: Array<MuseumComment>,
  MuseumComment_aggregate: MuseumComment_Aggregate,
  MuseumComment_by_pk?: Maybe<MuseumComment>,
  MuseumEntranceType: Array<MuseumEntranceType>,
  MuseumEntranceType_aggregate: MuseumEntranceType_Aggregate,
  MuseumEntranceType_by_pk?: Maybe<MuseumEntranceType>,
  MuseumPrice: Array<MuseumPrice>,
  MuseumPrice_aggregate: MuseumPrice_Aggregate,
  MuseumPrice_by_pk?: Maybe<MuseumPrice>,
  MuseumType: Array<MuseumType>,
  MuseumTypeMuseum: Array<MuseumTypeMuseum>,
  MuseumTypeMuseum_aggregate: MuseumTypeMuseum_Aggregate,
  MuseumTypeMuseum_by_pk?: Maybe<MuseumTypeMuseum>,
  MuseumType_aggregate: MuseumType_Aggregate,
  MuseumType_by_pk?: Maybe<MuseumType>,
  MuseumWorkingDay: Array<MuseumWorkingDay>,
  MuseumWorkingDaySchedule: Array<MuseumWorkingDaySchedule>,
  MuseumWorkingDaySchedule_aggregate: MuseumWorkingDaySchedule_Aggregate,
  MuseumWorkingDaySchedule_by_pk?: Maybe<MuseumWorkingDaySchedule>,
  MuseumWorkingDay_aggregate: MuseumWorkingDay_Aggregate,
  MuseumWorkingDay_by_pk?: Maybe<MuseumWorkingDay>,
  MuseumWorkingSchedule: Array<MuseumWorkingSchedule>,
  MuseumWorkingSchedule_aggregate: MuseumWorkingSchedule_Aggregate,
  MuseumWorkingSchedule_by_pk?: Maybe<MuseumWorkingSchedule>,
  Museum_aggregate: Museum_Aggregate,
  Museum_by_pk?: Maybe<Museum>,
  Phone: Array<Phone>,
  Phone_aggregate: Phone_Aggregate,
  Phone_by_pk?: Maybe<Phone>,
  Restaurant: Array<Restaurant>,
  RestaurantAndCuisineType: Array<RestaurantAndCuisineType>,
  RestaurantAndCuisineType_aggregate: RestaurantAndCuisineType_Aggregate,
  RestaurantAndCuisineType_by_pk?: Maybe<RestaurantAndCuisineType>,
  RestaurantComment: Array<RestaurantComment>,
  RestaurantComment_aggregate: RestaurantComment_Aggregate,
  RestaurantComment_by_pk?: Maybe<RestaurantComment>,
  RestaurantCuisineType: Array<RestaurantCuisineType>,
  RestaurantCuisineType_aggregate: RestaurantCuisineType_Aggregate,
  RestaurantCuisineType_by_pk?: Maybe<RestaurantCuisineType>,
  RestaurantFood: Array<RestaurantFood>,
  RestaurantFoodType: Array<RestaurantFoodType>,
  RestaurantFoodType_aggregate: RestaurantFoodType_Aggregate,
  RestaurantFoodType_by_pk?: Maybe<RestaurantFoodType>,
  RestaurantFood_aggregate: RestaurantFood_Aggregate,
  RestaurantFood_by_pk?: Maybe<RestaurantFood>,
  RestaurantMenu: Array<RestaurantMenu>,
  RestaurantMenuFood: Array<RestaurantMenuFood>,
  RestaurantMenuFood_aggregate: RestaurantMenuFood_Aggregate,
  RestaurantMenuFood_by_pk?: Maybe<RestaurantMenuFood>,
  RestaurantMenu_aggregate: RestaurantMenu_Aggregate,
  RestaurantMenu_by_pk?: Maybe<RestaurantMenu>,
  RestaurantType: Array<RestaurantType>,
  RestaurantType_aggregate: RestaurantType_Aggregate,
  RestaurantType_by_pk?: Maybe<RestaurantType>,
  RestaurantWorkingDay: Array<RestaurantWorkingDay>,
  RestaurantWorkingDaySchedule: Array<RestaurantWorkingDaySchedule>,
  RestaurantWorkingDaySchedule_aggregate: RestaurantWorkingDaySchedule_Aggregate,
  RestaurantWorkingDaySchedule_by_pk?: Maybe<RestaurantWorkingDaySchedule>,
  RestaurantWorkingDay_aggregate: RestaurantWorkingDay_Aggregate,
  RestaurantWorkingDay_by_pk?: Maybe<RestaurantWorkingDay>,
  RestaurantWorkingSchedule: Array<RestaurantWorkingSchedule>,
  RestaurantWorkingSchedule_aggregate: RestaurantWorkingSchedule_Aggregate,
  RestaurantWorkingSchedule_by_pk?: Maybe<RestaurantWorkingSchedule>,
  Restaurant_aggregate: Restaurant_Aggregate,
  Restaurant_by_pk?: Maybe<Restaurant>,
  Room: Array<Room>,
  RoomPicture: Array<RoomPicture>,
  RoomPicture_aggregate: RoomPicture_Aggregate,
  RoomPicture_by_pk?: Maybe<RoomPicture>,
  RoomPrice: Array<RoomPrice>,
  RoomPrice_aggregate: RoomPrice_Aggregate,
  RoomPrice_by_pk?: Maybe<RoomPrice>,
  RoomProperty: Array<RoomProperty>,
  RoomPropertyRoom: Array<RoomPropertyRoom>,
  RoomPropertyRoom_aggregate: RoomPropertyRoom_Aggregate,
  RoomPropertyRoom_by_pk?: Maybe<RoomPropertyRoom>,
  RoomProperty_aggregate: RoomProperty_Aggregate,
  RoomProperty_by_pk?: Maybe<RoomProperty>,
  Room_aggregate: Room_Aggregate,
  Room_by_pk?: Maybe<Room>,
  Tag: Array<Tag>,
  Tag_aggregate: Tag_Aggregate,
  Tag_by_pk?: Maybe<Tag>,
  TravelGuide: Array<TravelGuide>,
  TravelGuideArchSite: Array<TravelGuideArchSite>,
  TravelGuideArchSite_aggregate: TravelGuideArchSite_Aggregate,
  TravelGuideArchSite_by_pk?: Maybe<TravelGuideArchSite>,
  TravelGuideHotel: Array<TravelGuideHotel>,
  TravelGuideHotel_aggregate: TravelGuideHotel_Aggregate,
  TravelGuideHotel_by_pk?: Maybe<TravelGuideHotel>,
  TravelGuideLocation: Array<TravelGuideLocation>,
  TravelGuideLocation_aggregate: TravelGuideLocation_Aggregate,
  TravelGuideLocation_by_pk?: Maybe<TravelGuideLocation>,
  TravelGuideMuseum: Array<TravelGuideMuseum>,
  TravelGuideMuseum_aggregate: TravelGuideMuseum_Aggregate,
  TravelGuideMuseum_by_pk?: Maybe<TravelGuideMuseum>,
  TravelGuideRestaurant: Array<TravelGuideRestaurant>,
  TravelGuideRestaurant_aggregate: TravelGuideRestaurant_Aggregate,
  TravelGuideRestaurant_by_pk?: Maybe<TravelGuideRestaurant>,
  TravelGuide_aggregate: TravelGuide_Aggregate,
  TravelGuide_by_pk?: Maybe<TravelGuide>,
  User: Array<User>,
  UserType: Array<UserType>,
  UserType_aggregate: UserType_Aggregate,
  UserType_by_pk?: Maybe<UserType>,
  User_aggregate: User_Aggregate,
  User_by_pk?: Maybe<User>,
};


export type Subscription_RootAddressArgs = {
  distinct_on?: Maybe<Array<Address_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Address_Order_By>>,
  where?: Maybe<Address_Bool_Exp>
};


export type Subscription_RootAddress_AggregateArgs = {
  distinct_on?: Maybe<Array<Address_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Address_Order_By>>,
  where?: Maybe<Address_Bool_Exp>
};


export type Subscription_RootAddress_By_PkArgs = {
  addressID: Scalars['Int']
};


export type Subscription_RootArchSiteArgs = {
  distinct_on?: Maybe<Array<ArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSite_Order_By>>,
  where?: Maybe<ArchSite_Bool_Exp>
};


export type Subscription_RootArchSiteCommentArgs = {
  distinct_on?: Maybe<Array<ArchSiteComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteComment_Order_By>>,
  where?: Maybe<ArchSiteComment_Bool_Exp>
};


export type Subscription_RootArchSiteComment_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteComment_Order_By>>,
  where?: Maybe<ArchSiteComment_Bool_Exp>
};


export type Subscription_RootArchSiteComment_By_PkArgs = {
  archSiteCommentID: Scalars['Int']
};


export type Subscription_RootArchSiteEntranceTypeArgs = {
  distinct_on?: Maybe<Array<ArchSiteEntranceType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteEntranceType_Order_By>>,
  where?: Maybe<ArchSiteEntranceType_Bool_Exp>
};


export type Subscription_RootArchSiteEntranceType_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteEntranceType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteEntranceType_Order_By>>,
  where?: Maybe<ArchSiteEntranceType_Bool_Exp>
};


export type Subscription_RootArchSiteEntranceType_By_PkArgs = {
  archSiteEntranceTypeID: Scalars['Int']
};


export type Subscription_RootArchSitePriceArgs = {
  distinct_on?: Maybe<Array<ArchSitePrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSitePrice_Order_By>>,
  where?: Maybe<ArchSitePrice_Bool_Exp>
};


export type Subscription_RootArchSitePrice_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSitePrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSitePrice_Order_By>>,
  where?: Maybe<ArchSitePrice_Bool_Exp>
};


export type Subscription_RootArchSitePrice_By_PkArgs = {
  archSitePriceID: Scalars['Int']
};


export type Subscription_RootArchSiteTypeArgs = {
  distinct_on?: Maybe<Array<ArchSiteType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteType_Order_By>>,
  where?: Maybe<ArchSiteType_Bool_Exp>
};


export type Subscription_RootArchSiteTypeArchSiteArgs = {
  distinct_on?: Maybe<Array<ArchSiteTypeArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteTypeArchSite_Order_By>>,
  where?: Maybe<ArchSiteTypeArchSite_Bool_Exp>
};


export type Subscription_RootArchSiteTypeArchSite_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteTypeArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteTypeArchSite_Order_By>>,
  where?: Maybe<ArchSiteTypeArchSite_Bool_Exp>
};


export type Subscription_RootArchSiteTypeArchSite_By_PkArgs = {
  archSiteTypeArchSiteID: Scalars['Int']
};


export type Subscription_RootArchSiteType_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteType_Order_By>>,
  where?: Maybe<ArchSiteType_Bool_Exp>
};


export type Subscription_RootArchSiteType_By_PkArgs = {
  archSiteTypeID: Scalars['Int']
};


export type Subscription_RootArchSiteWorkingDayArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDay_Order_By>>,
  where?: Maybe<ArchSiteWorkingDay_Bool_Exp>
};


export type Subscription_RootArchSiteWorkingDayScheduleArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDaySchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>
};


export type Subscription_RootArchSiteWorkingDaySchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDaySchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingDaySchedule_Bool_Exp>
};


export type Subscription_RootArchSiteWorkingDaySchedule_By_PkArgs = {
  archSiteWorkingDayScheduleID: Scalars['Int']
};


export type Subscription_RootArchSiteWorkingDay_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingDay_Order_By>>,
  where?: Maybe<ArchSiteWorkingDay_Bool_Exp>
};


export type Subscription_RootArchSiteWorkingDay_By_PkArgs = {
  archSiteWorkingDayID: Scalars['Int']
};


export type Subscription_RootArchSiteWorkingScheduleArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingSchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingSchedule_Bool_Exp>
};


export type Subscription_RootArchSiteWorkingSchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteWorkingSchedule_Order_By>>,
  where?: Maybe<ArchSiteWorkingSchedule_Bool_Exp>
};


export type Subscription_RootArchSiteWorkingSchedule_By_PkArgs = {
  archSiteWorkingScheduleID: Scalars['Int']
};


export type Subscription_RootArchSite_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSite_Order_By>>,
  where?: Maybe<ArchSite_Bool_Exp>
};


export type Subscription_RootArchSite_By_PkArgs = {
  archSiteID: Scalars['Int']
};


export type Subscription_RootArticleArgs = {
  distinct_on?: Maybe<Array<Article_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Article_Order_By>>,
  where?: Maybe<Article_Bool_Exp>
};


export type Subscription_RootArticleTagArgs = {
  distinct_on?: Maybe<Array<ArticleTag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleTag_Order_By>>,
  where?: Maybe<ArticleTag_Bool_Exp>
};


export type Subscription_RootArticleTag_AggregateArgs = {
  distinct_on?: Maybe<Array<ArticleTag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleTag_Order_By>>,
  where?: Maybe<ArticleTag_Bool_Exp>
};


export type Subscription_RootArticleTag_By_PkArgs = {
  articleTagID: Scalars['Int']
};


export type Subscription_RootArticleUserArgs = {
  distinct_on?: Maybe<Array<ArticleUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleUser_Order_By>>,
  where?: Maybe<ArticleUser_Bool_Exp>
};


export type Subscription_RootArticleUser_AggregateArgs = {
  distinct_on?: Maybe<Array<ArticleUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleUser_Order_By>>,
  where?: Maybe<ArticleUser_Bool_Exp>
};


export type Subscription_RootArticleUser_By_PkArgs = {
  articleUserID: Scalars['Int']
};


export type Subscription_RootArticle_AggregateArgs = {
  distinct_on?: Maybe<Array<Article_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Article_Order_By>>,
  where?: Maybe<Article_Bool_Exp>
};


export type Subscription_RootArticle_By_PkArgs = {
  articleID: Scalars['Int']
};


export type Subscription_RootCityArgs = {
  distinct_on?: Maybe<Array<City_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<City_Order_By>>,
  where?: Maybe<City_Bool_Exp>
};


export type Subscription_RootCity_AggregateArgs = {
  distinct_on?: Maybe<Array<City_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<City_Order_By>>,
  where?: Maybe<City_Bool_Exp>
};


export type Subscription_RootCity_By_PkArgs = {
  cityID: Scalars['Int']
};


export type Subscription_RootCompanyArgs = {
  distinct_on?: Maybe<Array<Company_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Company_Order_By>>,
  where?: Maybe<Company_Bool_Exp>
};


export type Subscription_RootCompanyContactArgs = {
  distinct_on?: Maybe<Array<CompanyContact_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyContact_Order_By>>,
  where?: Maybe<CompanyContact_Bool_Exp>
};


export type Subscription_RootCompanyContact_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyContact_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyContact_Order_By>>,
  where?: Maybe<CompanyContact_Bool_Exp>
};


export type Subscription_RootCompanyContact_By_PkArgs = {
  companyContactID: Scalars['Int']
};


export type Subscription_RootCompanyPhoneArgs = {
  distinct_on?: Maybe<Array<CompanyPhone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyPhone_Order_By>>,
  where?: Maybe<CompanyPhone_Bool_Exp>
};


export type Subscription_RootCompanyPhone_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyPhone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyPhone_Order_By>>,
  where?: Maybe<CompanyPhone_Bool_Exp>
};


export type Subscription_RootCompanyPhone_By_PkArgs = {
  companyPhoneID: Scalars['Int']
};


export type Subscription_RootCompanyUserArgs = {
  distinct_on?: Maybe<Array<CompanyUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyUser_Order_By>>,
  where?: Maybe<CompanyUser_Bool_Exp>
};


export type Subscription_RootCompanyUser_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyUser_Order_By>>,
  where?: Maybe<CompanyUser_Bool_Exp>
};


export type Subscription_RootCompanyUser_By_PkArgs = {
  companyUserID: Scalars['Int']
};


export type Subscription_RootCompany_AggregateArgs = {
  distinct_on?: Maybe<Array<Company_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Company_Order_By>>,
  where?: Maybe<Company_Bool_Exp>
};


export type Subscription_RootCompany_By_PkArgs = {
  companyID: Scalars['Int']
};


export type Subscription_RootCountryArgs = {
  distinct_on?: Maybe<Array<Country_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Country_Order_By>>,
  where?: Maybe<Country_Bool_Exp>
};


export type Subscription_RootCountry_AggregateArgs = {
  distinct_on?: Maybe<Array<Country_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Country_Order_By>>,
  where?: Maybe<Country_Bool_Exp>
};


export type Subscription_RootCountry_By_PkArgs = {
  countryID: Scalars['Int']
};


export type Subscription_RootDayArgs = {
  distinct_on?: Maybe<Array<Day_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Day_Order_By>>,
  where?: Maybe<Day_Bool_Exp>
};


export type Subscription_RootDay_AggregateArgs = {
  distinct_on?: Maybe<Array<Day_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Day_Order_By>>,
  where?: Maybe<Day_Bool_Exp>
};


export type Subscription_RootDay_By_PkArgs = {
  dayID: Scalars['Int']
};


export type Subscription_RootDistrictArgs = {
  distinct_on?: Maybe<Array<District_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<District_Order_By>>,
  where?: Maybe<District_Bool_Exp>
};


export type Subscription_RootDistrict_AggregateArgs = {
  distinct_on?: Maybe<Array<District_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<District_Order_By>>,
  where?: Maybe<District_Bool_Exp>
};


export type Subscription_RootDistrict_By_PkArgs = {
  districtID: Scalars['Int']
};


export type Subscription_RootHotelArgs = {
  distinct_on?: Maybe<Array<Hotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Hotel_Order_By>>,
  where?: Maybe<Hotel_Bool_Exp>
};


export type Subscription_RootHotelCommentArgs = {
  distinct_on?: Maybe<Array<HotelComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelComment_Order_By>>,
  where?: Maybe<HotelComment_Bool_Exp>
};


export type Subscription_RootHotelComment_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelComment_Order_By>>,
  where?: Maybe<HotelComment_Bool_Exp>
};


export type Subscription_RootHotelComment_By_PkArgs = {
  hotelCommentID: Scalars['Int']
};


export type Subscription_RootHotelRoomArgs = {
  distinct_on?: Maybe<Array<HotelRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelRoom_Order_By>>,
  where?: Maybe<HotelRoom_Bool_Exp>
};


export type Subscription_RootHotelRoom_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelRoom_Order_By>>,
  where?: Maybe<HotelRoom_Bool_Exp>
};


export type Subscription_RootHotelRoom_By_PkArgs = {
  hotelRoomID: Scalars['Int']
};


export type Subscription_RootHotelServiceArgs = {
  distinct_on?: Maybe<Array<HotelService_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelService_Order_By>>,
  where?: Maybe<HotelService_Bool_Exp>
};


export type Subscription_RootHotelServicePropertyArgs = {
  distinct_on?: Maybe<Array<HotelServiceProperty_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelServiceProperty_Order_By>>,
  where?: Maybe<HotelServiceProperty_Bool_Exp>
};


export type Subscription_RootHotelServiceProperty_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelServiceProperty_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelServiceProperty_Order_By>>,
  where?: Maybe<HotelServiceProperty_Bool_Exp>
};


export type Subscription_RootHotelServiceProperty_By_PkArgs = {
  hotelServicePropertyID: Scalars['Int']
};


export type Subscription_RootHotelService_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelService_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelService_Order_By>>,
  where?: Maybe<HotelService_Bool_Exp>
};


export type Subscription_RootHotelService_By_PkArgs = {
  hotelServiceHotelID: Scalars['Int']
};


export type Subscription_RootHotel_AggregateArgs = {
  distinct_on?: Maybe<Array<Hotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Hotel_Order_By>>,
  where?: Maybe<Hotel_Bool_Exp>
};


export type Subscription_RootHotel_By_PkArgs = {
  hotelID: Scalars['Int']
};


export type Subscription_RootLocationArgs = {
  distinct_on?: Maybe<Array<Location_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Location_Order_By>>,
  where?: Maybe<Location_Bool_Exp>
};


export type Subscription_RootLocation_AggregateArgs = {
  distinct_on?: Maybe<Array<Location_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Location_Order_By>>,
  where?: Maybe<Location_Bool_Exp>
};


export type Subscription_RootLocation_By_PkArgs = {
  locationID: Scalars['Int']
};


export type Subscription_RootLoginTypeArgs = {
  distinct_on?: Maybe<Array<LoginType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<LoginType_Order_By>>,
  where?: Maybe<LoginType_Bool_Exp>
};


export type Subscription_RootLoginType_AggregateArgs = {
  distinct_on?: Maybe<Array<LoginType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<LoginType_Order_By>>,
  where?: Maybe<LoginType_Bool_Exp>
};


export type Subscription_RootLoginType_By_PkArgs = {
  loginTypeID: Scalars['Int']
};


export type Subscription_RootMuseumArgs = {
  distinct_on?: Maybe<Array<Museum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Museum_Order_By>>,
  where?: Maybe<Museum_Bool_Exp>
};


export type Subscription_RootMuseumCommentArgs = {
  distinct_on?: Maybe<Array<MuseumComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumComment_Order_By>>,
  where?: Maybe<MuseumComment_Bool_Exp>
};


export type Subscription_RootMuseumComment_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumComment_Order_By>>,
  where?: Maybe<MuseumComment_Bool_Exp>
};


export type Subscription_RootMuseumComment_By_PkArgs = {
  museumCommentID: Scalars['Int']
};


export type Subscription_RootMuseumEntranceTypeArgs = {
  distinct_on?: Maybe<Array<MuseumEntranceType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumEntranceType_Order_By>>,
  where?: Maybe<MuseumEntranceType_Bool_Exp>
};


export type Subscription_RootMuseumEntranceType_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumEntranceType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumEntranceType_Order_By>>,
  where?: Maybe<MuseumEntranceType_Bool_Exp>
};


export type Subscription_RootMuseumEntranceType_By_PkArgs = {
  museumEntranceTypeID: Scalars['Int']
};


export type Subscription_RootMuseumPriceArgs = {
  distinct_on?: Maybe<Array<MuseumPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumPrice_Order_By>>,
  where?: Maybe<MuseumPrice_Bool_Exp>
};


export type Subscription_RootMuseumPrice_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumPrice_Order_By>>,
  where?: Maybe<MuseumPrice_Bool_Exp>
};


export type Subscription_RootMuseumPrice_By_PkArgs = {
  museumPriceID: Scalars['Int']
};


export type Subscription_RootMuseumTypeArgs = {
  distinct_on?: Maybe<Array<MuseumType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumType_Order_By>>,
  where?: Maybe<MuseumType_Bool_Exp>
};


export type Subscription_RootMuseumTypeMuseumArgs = {
  distinct_on?: Maybe<Array<MuseumTypeMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumTypeMuseum_Order_By>>,
  where?: Maybe<MuseumTypeMuseum_Bool_Exp>
};


export type Subscription_RootMuseumTypeMuseum_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumTypeMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumTypeMuseum_Order_By>>,
  where?: Maybe<MuseumTypeMuseum_Bool_Exp>
};


export type Subscription_RootMuseumTypeMuseum_By_PkArgs = {
  museumTypeMuseumID: Scalars['Int']
};


export type Subscription_RootMuseumType_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumType_Order_By>>,
  where?: Maybe<MuseumType_Bool_Exp>
};


export type Subscription_RootMuseumType_By_PkArgs = {
  museumTypeID: Scalars['Int']
};


export type Subscription_RootMuseumWorkingDayArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDay_Order_By>>,
  where?: Maybe<MuseumWorkingDay_Bool_Exp>
};


export type Subscription_RootMuseumWorkingDayScheduleArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDaySchedule_Order_By>>,
  where?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>
};


export type Subscription_RootMuseumWorkingDaySchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDaySchedule_Order_By>>,
  where?: Maybe<MuseumWorkingDaySchedule_Bool_Exp>
};


export type Subscription_RootMuseumWorkingDaySchedule_By_PkArgs = {
  museumWorkingDayScheduleID: Scalars['Int']
};


export type Subscription_RootMuseumWorkingDay_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingDay_Order_By>>,
  where?: Maybe<MuseumWorkingDay_Bool_Exp>
};


export type Subscription_RootMuseumWorkingDay_By_PkArgs = {
  museumWorkingDayID: Scalars['Int']
};


export type Subscription_RootMuseumWorkingScheduleArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingSchedule_Order_By>>,
  where?: Maybe<MuseumWorkingSchedule_Bool_Exp>
};


export type Subscription_RootMuseumWorkingSchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumWorkingSchedule_Order_By>>,
  where?: Maybe<MuseumWorkingSchedule_Bool_Exp>
};


export type Subscription_RootMuseumWorkingSchedule_By_PkArgs = {
  museumWorkingScheduleID: Scalars['Int']
};


export type Subscription_RootMuseum_AggregateArgs = {
  distinct_on?: Maybe<Array<Museum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Museum_Order_By>>,
  where?: Maybe<Museum_Bool_Exp>
};


export type Subscription_RootMuseum_By_PkArgs = {
  museumID: Scalars['Int']
};


export type Subscription_RootPhoneArgs = {
  distinct_on?: Maybe<Array<Phone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Phone_Order_By>>,
  where?: Maybe<Phone_Bool_Exp>
};


export type Subscription_RootPhone_AggregateArgs = {
  distinct_on?: Maybe<Array<Phone_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Phone_Order_By>>,
  where?: Maybe<Phone_Bool_Exp>
};


export type Subscription_RootPhone_By_PkArgs = {
  phoneID: Scalars['Int']
};


export type Subscription_RootRestaurantArgs = {
  distinct_on?: Maybe<Array<Restaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Restaurant_Order_By>>,
  where?: Maybe<Restaurant_Bool_Exp>
};


export type Subscription_RootRestaurantAndCuisineTypeArgs = {
  distinct_on?: Maybe<Array<RestaurantAndCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantAndCuisineType_Order_By>>,
  where?: Maybe<RestaurantAndCuisineType_Bool_Exp>
};


export type Subscription_RootRestaurantAndCuisineType_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantAndCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantAndCuisineType_Order_By>>,
  where?: Maybe<RestaurantAndCuisineType_Bool_Exp>
};


export type Subscription_RootRestaurantAndCuisineType_By_PkArgs = {
  restaurantAndCuisineTypeID: Scalars['Int']
};


export type Subscription_RootRestaurantCommentArgs = {
  distinct_on?: Maybe<Array<RestaurantComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantComment_Order_By>>,
  where?: Maybe<RestaurantComment_Bool_Exp>
};


export type Subscription_RootRestaurantComment_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantComment_Order_By>>,
  where?: Maybe<RestaurantComment_Bool_Exp>
};


export type Subscription_RootRestaurantComment_By_PkArgs = {
  restaurantCommentID: Scalars['Int']
};


export type Subscription_RootRestaurantCuisineTypeArgs = {
  distinct_on?: Maybe<Array<RestaurantCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantCuisineType_Order_By>>,
  where?: Maybe<RestaurantCuisineType_Bool_Exp>
};


export type Subscription_RootRestaurantCuisineType_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantCuisineType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantCuisineType_Order_By>>,
  where?: Maybe<RestaurantCuisineType_Bool_Exp>
};


export type Subscription_RootRestaurantCuisineType_By_PkArgs = {
  restaurantCuisineTypeID: Scalars['Int']
};


export type Subscription_RootRestaurantFoodArgs = {
  distinct_on?: Maybe<Array<RestaurantFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantFood_Order_By>>,
  where?: Maybe<RestaurantFood_Bool_Exp>
};


export type Subscription_RootRestaurantFoodTypeArgs = {
  distinct_on?: Maybe<Array<RestaurantFoodType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantFoodType_Order_By>>,
  where?: Maybe<RestaurantFoodType_Bool_Exp>
};


export type Subscription_RootRestaurantFoodType_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantFoodType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantFoodType_Order_By>>,
  where?: Maybe<RestaurantFoodType_Bool_Exp>
};


export type Subscription_RootRestaurantFoodType_By_PkArgs = {
  restaurantFoodTypeID: Scalars['Int']
};


export type Subscription_RootRestaurantFood_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantFood_Order_By>>,
  where?: Maybe<RestaurantFood_Bool_Exp>
};


export type Subscription_RootRestaurantFood_By_PkArgs = {
  restaurantFoodID: Scalars['Int']
};


export type Subscription_RootRestaurantMenuArgs = {
  distinct_on?: Maybe<Array<RestaurantMenu_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenu_Order_By>>,
  where?: Maybe<RestaurantMenu_Bool_Exp>
};


export type Subscription_RootRestaurantMenuFoodArgs = {
  distinct_on?: Maybe<Array<RestaurantMenuFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenuFood_Order_By>>,
  where?: Maybe<RestaurantMenuFood_Bool_Exp>
};


export type Subscription_RootRestaurantMenuFood_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantMenuFood_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenuFood_Order_By>>,
  where?: Maybe<RestaurantMenuFood_Bool_Exp>
};


export type Subscription_RootRestaurantMenuFood_By_PkArgs = {
  restaurantMenuFoodID: Scalars['Int']
};


export type Subscription_RootRestaurantMenu_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantMenu_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantMenu_Order_By>>,
  where?: Maybe<RestaurantMenu_Bool_Exp>
};


export type Subscription_RootRestaurantMenu_By_PkArgs = {
  restaurantMenuID: Scalars['Int']
};


export type Subscription_RootRestaurantTypeArgs = {
  distinct_on?: Maybe<Array<RestaurantType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantType_Order_By>>,
  where?: Maybe<RestaurantType_Bool_Exp>
};


export type Subscription_RootRestaurantType_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantType_Order_By>>,
  where?: Maybe<RestaurantType_Bool_Exp>
};


export type Subscription_RootRestaurantType_By_PkArgs = {
  restaurantTypeID: Scalars['Int']
};


export type Subscription_RootRestaurantWorkingDayArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDay_Order_By>>,
  where?: Maybe<RestaurantWorkingDay_Bool_Exp>
};


export type Subscription_RootRestaurantWorkingDayScheduleArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDaySchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>
};


export type Subscription_RootRestaurantWorkingDaySchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDaySchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDaySchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingDaySchedule_Bool_Exp>
};


export type Subscription_RootRestaurantWorkingDaySchedule_By_PkArgs = {
  restaurantWorkingDaySchedule: Scalars['Int']
};


export type Subscription_RootRestaurantWorkingDay_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingDay_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingDay_Order_By>>,
  where?: Maybe<RestaurantWorkingDay_Bool_Exp>
};


export type Subscription_RootRestaurantWorkingDay_By_PkArgs = {
  restaurantWorkingDayID: Scalars['Int']
};


export type Subscription_RootRestaurantWorkingScheduleArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingSchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingSchedule_Bool_Exp>
};


export type Subscription_RootRestaurantWorkingSchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantWorkingSchedule_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantWorkingSchedule_Order_By>>,
  where?: Maybe<RestaurantWorkingSchedule_Bool_Exp>
};


export type Subscription_RootRestaurantWorkingSchedule_By_PkArgs = {
  restaurantWorkingScheduleID: Scalars['Int']
};


export type Subscription_RootRestaurant_AggregateArgs = {
  distinct_on?: Maybe<Array<Restaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Restaurant_Order_By>>,
  where?: Maybe<Restaurant_Bool_Exp>
};


export type Subscription_RootRestaurant_By_PkArgs = {
  restaurantID: Scalars['Int']
};


export type Subscription_RootRoomArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Room_Order_By>>,
  where?: Maybe<Room_Bool_Exp>
};


export type Subscription_RootRoomPictureArgs = {
  distinct_on?: Maybe<Array<RoomPicture_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPicture_Order_By>>,
  where?: Maybe<RoomPicture_Bool_Exp>
};


export type Subscription_RootRoomPicture_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomPicture_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPicture_Order_By>>,
  where?: Maybe<RoomPicture_Bool_Exp>
};


export type Subscription_RootRoomPicture_By_PkArgs = {
  roomPictureID: Scalars['Int']
};


export type Subscription_RootRoomPriceArgs = {
  distinct_on?: Maybe<Array<RoomPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPrice_Order_By>>,
  where?: Maybe<RoomPrice_Bool_Exp>
};


export type Subscription_RootRoomPrice_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomPrice_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPrice_Order_By>>,
  where?: Maybe<RoomPrice_Bool_Exp>
};


export type Subscription_RootRoomPrice_By_PkArgs = {
  roomPriceID: Scalars['Int']
};


export type Subscription_RootRoomPropertyArgs = {
  distinct_on?: Maybe<Array<RoomProperty_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomProperty_Order_By>>,
  where?: Maybe<RoomProperty_Bool_Exp>
};


export type Subscription_RootRoomPropertyRoomArgs = {
  distinct_on?: Maybe<Array<RoomPropertyRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPropertyRoom_Order_By>>,
  where?: Maybe<RoomPropertyRoom_Bool_Exp>
};


export type Subscription_RootRoomPropertyRoom_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomPropertyRoom_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomPropertyRoom_Order_By>>,
  where?: Maybe<RoomPropertyRoom_Bool_Exp>
};


export type Subscription_RootRoomPropertyRoom_By_PkArgs = {
  roomPropertyRoomID: Scalars['Int']
};


export type Subscription_RootRoomProperty_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomProperty_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RoomProperty_Order_By>>,
  where?: Maybe<RoomProperty_Bool_Exp>
};


export type Subscription_RootRoomProperty_By_PkArgs = {
  roomPropertyID: Scalars['Int']
};


export type Subscription_RootRoom_AggregateArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Room_Order_By>>,
  where?: Maybe<Room_Bool_Exp>
};


export type Subscription_RootRoom_By_PkArgs = {
  roomID: Scalars['Int']
};


export type Subscription_RootTagArgs = {
  distinct_on?: Maybe<Array<Tag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Tag_Order_By>>,
  where?: Maybe<Tag_Bool_Exp>
};


export type Subscription_RootTag_AggregateArgs = {
  distinct_on?: Maybe<Array<Tag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Tag_Order_By>>,
  where?: Maybe<Tag_Bool_Exp>
};


export type Subscription_RootTag_By_PkArgs = {
  tagID: Scalars['Int']
};


export type Subscription_RootTravelGuideArgs = {
  distinct_on?: Maybe<Array<TravelGuide_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuide_Order_By>>,
  where?: Maybe<TravelGuide_Bool_Exp>
};


export type Subscription_RootTravelGuideArchSiteArgs = {
  distinct_on?: Maybe<Array<TravelGuideArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideArchSite_Order_By>>,
  where?: Maybe<TravelGuideArchSite_Bool_Exp>
};


export type Subscription_RootTravelGuideArchSite_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideArchSite_Order_By>>,
  where?: Maybe<TravelGuideArchSite_Bool_Exp>
};


export type Subscription_RootTravelGuideArchSite_By_PkArgs = {
  travelGuideArchSiteID: Scalars['Int']
};


export type Subscription_RootTravelGuideHotelArgs = {
  distinct_on?: Maybe<Array<TravelGuideHotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideHotel_Order_By>>,
  where?: Maybe<TravelGuideHotel_Bool_Exp>
};


export type Subscription_RootTravelGuideHotel_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideHotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideHotel_Order_By>>,
  where?: Maybe<TravelGuideHotel_Bool_Exp>
};


export type Subscription_RootTravelGuideHotel_By_PkArgs = {
  travelGuideHotel: Scalars['Int']
};


export type Subscription_RootTravelGuideLocationArgs = {
  distinct_on?: Maybe<Array<TravelGuideLocation_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideLocation_Order_By>>,
  where?: Maybe<TravelGuideLocation_Bool_Exp>
};


export type Subscription_RootTravelGuideLocation_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideLocation_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideLocation_Order_By>>,
  where?: Maybe<TravelGuideLocation_Bool_Exp>
};


export type Subscription_RootTravelGuideLocation_By_PkArgs = {
  travelGuideLocationID: Scalars['Int']
};


export type Subscription_RootTravelGuideMuseumArgs = {
  distinct_on?: Maybe<Array<TravelGuideMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideMuseum_Order_By>>,
  where?: Maybe<TravelGuideMuseum_Bool_Exp>
};


export type Subscription_RootTravelGuideMuseum_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideMuseum_Order_By>>,
  where?: Maybe<TravelGuideMuseum_Bool_Exp>
};


export type Subscription_RootTravelGuideMuseum_By_PkArgs = {
  travelGuideMuseumID: Scalars['Int']
};


export type Subscription_RootTravelGuideRestaurantArgs = {
  distinct_on?: Maybe<Array<TravelGuideRestaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideRestaurant_Order_By>>,
  where?: Maybe<TravelGuideRestaurant_Bool_Exp>
};


export type Subscription_RootTravelGuideRestaurant_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideRestaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideRestaurant_Order_By>>,
  where?: Maybe<TravelGuideRestaurant_Bool_Exp>
};


export type Subscription_RootTravelGuideRestaurant_By_PkArgs = {
  travelGuideRestaurantID: Scalars['Int']
};


export type Subscription_RootTravelGuide_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuide_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuide_Order_By>>,
  where?: Maybe<TravelGuide_Bool_Exp>
};


export type Subscription_RootTravelGuide_By_PkArgs = {
  travelGuideID: Scalars['Int']
};


export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};


export type Subscription_RootUserTypeArgs = {
  distinct_on?: Maybe<Array<UserType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserType_Order_By>>,
  where?: Maybe<UserType_Bool_Exp>
};


export type Subscription_RootUserType_AggregateArgs = {
  distinct_on?: Maybe<Array<UserType_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserType_Order_By>>,
  where?: Maybe<UserType_Bool_Exp>
};


export type Subscription_RootUserType_By_PkArgs = {
  userTypeID: Scalars['Int']
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};


export type Subscription_RootUser_By_PkArgs = {
  userID: Scalars['Int']
};

export type Tag = {
   __typename?: 'Tag',
  ArticleTags: Array<ArticleTag>,
  ArticleTags_aggregate: ArticleTag_Aggregate,
  isDeleted: Scalars['Boolean'],
  name: Scalars['String'],
  tagID: Scalars['Int'],
};


export type TagArticleTagsArgs = {
  distinct_on?: Maybe<Array<ArticleTag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleTag_Order_By>>,
  where?: Maybe<ArticleTag_Bool_Exp>
};


export type TagArticleTags_AggregateArgs = {
  distinct_on?: Maybe<Array<ArticleTag_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleTag_Order_By>>,
  where?: Maybe<ArticleTag_Bool_Exp>
};

export type Tag_Aggregate = {
   __typename?: 'Tag_aggregate',
  aggregate?: Maybe<Tag_Aggregate_Fields>,
  nodes: Array<Tag>,
};

export type Tag_Aggregate_Fields = {
   __typename?: 'Tag_aggregate_fields',
  avg?: Maybe<Tag_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Tag_Max_Fields>,
  min?: Maybe<Tag_Min_Fields>,
  stddev?: Maybe<Tag_Stddev_Fields>,
  stddev_pop?: Maybe<Tag_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Tag_Stddev_Samp_Fields>,
  sum?: Maybe<Tag_Sum_Fields>,
  var_pop?: Maybe<Tag_Var_Pop_Fields>,
  var_samp?: Maybe<Tag_Var_Samp_Fields>,
  variance?: Maybe<Tag_Variance_Fields>,
};


export type Tag_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tag_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Tag_Aggregate_Order_By = {
  avg?: Maybe<Tag_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Tag_Max_Order_By>,
  min?: Maybe<Tag_Min_Order_By>,
  stddev?: Maybe<Tag_Stddev_Order_By>,
  stddev_pop?: Maybe<Tag_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Tag_Stddev_Samp_Order_By>,
  sum?: Maybe<Tag_Sum_Order_By>,
  var_pop?: Maybe<Tag_Var_Pop_Order_By>,
  var_samp?: Maybe<Tag_Var_Samp_Order_By>,
  variance?: Maybe<Tag_Variance_Order_By>,
};

export type Tag_Arr_Rel_Insert_Input = {
  data: Array<Tag_Insert_Input>,
  on_conflict?: Maybe<Tag_On_Conflict>,
};

export type Tag_Avg_Fields = {
   __typename?: 'Tag_avg_fields',
  tagID?: Maybe<Scalars['Float']>,
};

export type Tag_Avg_Order_By = {
  tagID?: Maybe<Order_By>,
};

export type Tag_Bool_Exp = {
  ArticleTags?: Maybe<ArticleTag_Bool_Exp>,
  _and?: Maybe<Array<Maybe<Tag_Bool_Exp>>>,
  _not?: Maybe<Tag_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Tag_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
  tagID?: Maybe<Int_Comparison_Exp>,
};

export enum Tag_Constraint {
  TagPkey = 'Tag_pkey'
}

export type Tag_Inc_Input = {
  tagID?: Maybe<Scalars['Int']>,
};

export type Tag_Insert_Input = {
  ArticleTags?: Maybe<ArticleTag_Arr_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  tagID?: Maybe<Scalars['Int']>,
};

export type Tag_Max_Fields = {
   __typename?: 'Tag_max_fields',
  name?: Maybe<Scalars['String']>,
  tagID?: Maybe<Scalars['Int']>,
};

export type Tag_Max_Order_By = {
  name?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type Tag_Min_Fields = {
   __typename?: 'Tag_min_fields',
  name?: Maybe<Scalars['String']>,
  tagID?: Maybe<Scalars['Int']>,
};

export type Tag_Min_Order_By = {
  name?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export type Tag_Mutation_Response = {
   __typename?: 'Tag_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Tag>,
};

export type Tag_Obj_Rel_Insert_Input = {
  data: Tag_Insert_Input,
  on_conflict?: Maybe<Tag_On_Conflict>,
};

export type Tag_On_Conflict = {
  constraint: Tag_Constraint,
  update_columns: Array<Tag_Update_Column>,
  where?: Maybe<Tag_Bool_Exp>,
};

export type Tag_Order_By = {
  ArticleTags_aggregate?: Maybe<ArticleTag_Aggregate_Order_By>,
  isDeleted?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  tagID?: Maybe<Order_By>,
};

export enum Tag_Select_Column {
  IsDeleted = 'isDeleted',
  Name = 'name',
  TagId = 'tagID'
}

export type Tag_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  tagID?: Maybe<Scalars['Int']>,
};

export type Tag_Stddev_Fields = {
   __typename?: 'Tag_stddev_fields',
  tagID?: Maybe<Scalars['Float']>,
};

export type Tag_Stddev_Order_By = {
  tagID?: Maybe<Order_By>,
};

export type Tag_Stddev_Pop_Fields = {
   __typename?: 'Tag_stddev_pop_fields',
  tagID?: Maybe<Scalars['Float']>,
};

export type Tag_Stddev_Pop_Order_By = {
  tagID?: Maybe<Order_By>,
};

export type Tag_Stddev_Samp_Fields = {
   __typename?: 'Tag_stddev_samp_fields',
  tagID?: Maybe<Scalars['Float']>,
};

export type Tag_Stddev_Samp_Order_By = {
  tagID?: Maybe<Order_By>,
};

export type Tag_Sum_Fields = {
   __typename?: 'Tag_sum_fields',
  tagID?: Maybe<Scalars['Int']>,
};

export type Tag_Sum_Order_By = {
  tagID?: Maybe<Order_By>,
};

export enum Tag_Update_Column {
  IsDeleted = 'isDeleted',
  Name = 'name',
  TagId = 'tagID'
}

export type Tag_Var_Pop_Fields = {
   __typename?: 'Tag_var_pop_fields',
  tagID?: Maybe<Scalars['Float']>,
};

export type Tag_Var_Pop_Order_By = {
  tagID?: Maybe<Order_By>,
};

export type Tag_Var_Samp_Fields = {
   __typename?: 'Tag_var_samp_fields',
  tagID?: Maybe<Scalars['Float']>,
};

export type Tag_Var_Samp_Order_By = {
  tagID?: Maybe<Order_By>,
};

export type Tag_Variance_Fields = {
   __typename?: 'Tag_variance_fields',
  tagID?: Maybe<Scalars['Float']>,
};

export type Tag_Variance_Order_By = {
  tagID?: Maybe<Order_By>,
};


export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>,
  _gt?: Maybe<Scalars['timestamptz']>,
  _gte?: Maybe<Scalars['timestamptz']>,
  _in?: Maybe<Array<Scalars['timestamptz']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['timestamptz']>,
  _lte?: Maybe<Scalars['timestamptz']>,
  _neq?: Maybe<Scalars['timestamptz']>,
  _nin?: Maybe<Array<Scalars['timestamptz']>>,
};


export type Timetz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timetz']>,
  _gt?: Maybe<Scalars['timetz']>,
  _gte?: Maybe<Scalars['timetz']>,
  _in?: Maybe<Array<Scalars['timetz']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['timetz']>,
  _lte?: Maybe<Scalars['timetz']>,
  _neq?: Maybe<Scalars['timetz']>,
  _nin?: Maybe<Array<Scalars['timetz']>>,
};

export type TravelGuide = {
   __typename?: 'TravelGuide',
  TravelGuideArchSites: Array<TravelGuideArchSite>,
  TravelGuideArchSites_aggregate: TravelGuideArchSite_Aggregate,
  TravelGuideHotels: Array<TravelGuideHotel>,
  TravelGuideHotels_aggregate: TravelGuideHotel_Aggregate,
  TravelGuideLocations: Array<TravelGuideLocation>,
  TravelGuideLocations_aggregate: TravelGuideLocation_Aggregate,
  TravelGuideMuseums: Array<TravelGuideMuseum>,
  TravelGuideMuseums_aggregate: TravelGuideMuseum_Aggregate,
  TravelGuideRestaurants: Array<TravelGuideRestaurant>,
  TravelGuideRestaurants_aggregate: TravelGuideRestaurant_Aggregate,
  User: User,
  cost?: Maybe<Scalars['Float']>,
  creationDate: Scalars['timestamptz'],
  isDeleted: Scalars['Boolean'],
  title: Scalars['String'],
  travelGuideID: Scalars['Int'],
  userID: Scalars['Int'],
};


export type TravelGuideTravelGuideArchSitesArgs = {
  distinct_on?: Maybe<Array<TravelGuideArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideArchSite_Order_By>>,
  where?: Maybe<TravelGuideArchSite_Bool_Exp>
};


export type TravelGuideTravelGuideArchSites_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideArchSite_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideArchSite_Order_By>>,
  where?: Maybe<TravelGuideArchSite_Bool_Exp>
};


export type TravelGuideTravelGuideHotelsArgs = {
  distinct_on?: Maybe<Array<TravelGuideHotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideHotel_Order_By>>,
  where?: Maybe<TravelGuideHotel_Bool_Exp>
};


export type TravelGuideTravelGuideHotels_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideHotel_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideHotel_Order_By>>,
  where?: Maybe<TravelGuideHotel_Bool_Exp>
};


export type TravelGuideTravelGuideLocationsArgs = {
  distinct_on?: Maybe<Array<TravelGuideLocation_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideLocation_Order_By>>,
  where?: Maybe<TravelGuideLocation_Bool_Exp>
};


export type TravelGuideTravelGuideLocations_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideLocation_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideLocation_Order_By>>,
  where?: Maybe<TravelGuideLocation_Bool_Exp>
};


export type TravelGuideTravelGuideMuseumsArgs = {
  distinct_on?: Maybe<Array<TravelGuideMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideMuseum_Order_By>>,
  where?: Maybe<TravelGuideMuseum_Bool_Exp>
};


export type TravelGuideTravelGuideMuseums_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideMuseum_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideMuseum_Order_By>>,
  where?: Maybe<TravelGuideMuseum_Bool_Exp>
};


export type TravelGuideTravelGuideRestaurantsArgs = {
  distinct_on?: Maybe<Array<TravelGuideRestaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideRestaurant_Order_By>>,
  where?: Maybe<TravelGuideRestaurant_Bool_Exp>
};


export type TravelGuideTravelGuideRestaurants_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuideRestaurant_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuideRestaurant_Order_By>>,
  where?: Maybe<TravelGuideRestaurant_Bool_Exp>
};

export type TravelGuide_Aggregate = {
   __typename?: 'TravelGuide_aggregate',
  aggregate?: Maybe<TravelGuide_Aggregate_Fields>,
  nodes: Array<TravelGuide>,
};

export type TravelGuide_Aggregate_Fields = {
   __typename?: 'TravelGuide_aggregate_fields',
  avg?: Maybe<TravelGuide_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<TravelGuide_Max_Fields>,
  min?: Maybe<TravelGuide_Min_Fields>,
  stddev?: Maybe<TravelGuide_Stddev_Fields>,
  stddev_pop?: Maybe<TravelGuide_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<TravelGuide_Stddev_Samp_Fields>,
  sum?: Maybe<TravelGuide_Sum_Fields>,
  var_pop?: Maybe<TravelGuide_Var_Pop_Fields>,
  var_samp?: Maybe<TravelGuide_Var_Samp_Fields>,
  variance?: Maybe<TravelGuide_Variance_Fields>,
};


export type TravelGuide_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<TravelGuide_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type TravelGuide_Aggregate_Order_By = {
  avg?: Maybe<TravelGuide_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<TravelGuide_Max_Order_By>,
  min?: Maybe<TravelGuide_Min_Order_By>,
  stddev?: Maybe<TravelGuide_Stddev_Order_By>,
  stddev_pop?: Maybe<TravelGuide_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<TravelGuide_Stddev_Samp_Order_By>,
  sum?: Maybe<TravelGuide_Sum_Order_By>,
  var_pop?: Maybe<TravelGuide_Var_Pop_Order_By>,
  var_samp?: Maybe<TravelGuide_Var_Samp_Order_By>,
  variance?: Maybe<TravelGuide_Variance_Order_By>,
};

export type TravelGuide_Arr_Rel_Insert_Input = {
  data: Array<TravelGuide_Insert_Input>,
  on_conflict?: Maybe<TravelGuide_On_Conflict>,
};

export type TravelGuide_Avg_Fields = {
   __typename?: 'TravelGuide_avg_fields',
  cost?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type TravelGuide_Avg_Order_By = {
  cost?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type TravelGuide_Bool_Exp = {
  TravelGuideArchSites?: Maybe<TravelGuideArchSite_Bool_Exp>,
  TravelGuideHotels?: Maybe<TravelGuideHotel_Bool_Exp>,
  TravelGuideLocations?: Maybe<TravelGuideLocation_Bool_Exp>,
  TravelGuideMuseums?: Maybe<TravelGuideMuseum_Bool_Exp>,
  TravelGuideRestaurants?: Maybe<TravelGuideRestaurant_Bool_Exp>,
  User?: Maybe<User_Bool_Exp>,
  _and?: Maybe<Array<Maybe<TravelGuide_Bool_Exp>>>,
  _not?: Maybe<TravelGuide_Bool_Exp>,
  _or?: Maybe<Array<Maybe<TravelGuide_Bool_Exp>>>,
  cost?: Maybe<Float_Comparison_Exp>,
  creationDate?: Maybe<Timestamptz_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  title?: Maybe<String_Comparison_Exp>,
  travelGuideID?: Maybe<Int_Comparison_Exp>,
  userID?: Maybe<Int_Comparison_Exp>,
};

export enum TravelGuide_Constraint {
  TravelGuidePkey = 'TravelGuide_pkey',
  TravelGuideTravelGuideKey = 'TravelGuide_travelGuide_key'
}

export type TravelGuide_Inc_Input = {
  travelGuideID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type TravelGuide_Insert_Input = {
  TravelGuideArchSites?: Maybe<TravelGuideArchSite_Arr_Rel_Insert_Input>,
  TravelGuideHotels?: Maybe<TravelGuideHotel_Arr_Rel_Insert_Input>,
  TravelGuideLocations?: Maybe<TravelGuideLocation_Arr_Rel_Insert_Input>,
  TravelGuideMuseums?: Maybe<TravelGuideMuseum_Arr_Rel_Insert_Input>,
  TravelGuideRestaurants?: Maybe<TravelGuideRestaurant_Arr_Rel_Insert_Input>,
  User?: Maybe<User_Obj_Rel_Insert_Input>,
  cost?: Maybe<Scalars['Float']>,
  creationDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type TravelGuide_Max_Fields = {
   __typename?: 'TravelGuide_max_fields',
  cost?: Maybe<Scalars['Float']>,
  creationDate?: Maybe<Scalars['timestamptz']>,
  title?: Maybe<Scalars['String']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type TravelGuide_Max_Order_By = {
  cost?: Maybe<Order_By>,
  creationDate?: Maybe<Order_By>,
  title?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type TravelGuide_Min_Fields = {
   __typename?: 'TravelGuide_min_fields',
  cost?: Maybe<Scalars['Float']>,
  creationDate?: Maybe<Scalars['timestamptz']>,
  title?: Maybe<Scalars['String']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type TravelGuide_Min_Order_By = {
  cost?: Maybe<Order_By>,
  creationDate?: Maybe<Order_By>,
  title?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type TravelGuide_Mutation_Response = {
   __typename?: 'TravelGuide_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<TravelGuide>,
};

export type TravelGuide_Obj_Rel_Insert_Input = {
  data: TravelGuide_Insert_Input,
  on_conflict?: Maybe<TravelGuide_On_Conflict>,
};

export type TravelGuide_On_Conflict = {
  constraint: TravelGuide_Constraint,
  update_columns: Array<TravelGuide_Update_Column>,
  where?: Maybe<TravelGuide_Bool_Exp>,
};

export type TravelGuide_Order_By = {
  TravelGuideArchSites_aggregate?: Maybe<TravelGuideArchSite_Aggregate_Order_By>,
  TravelGuideHotels_aggregate?: Maybe<TravelGuideHotel_Aggregate_Order_By>,
  TravelGuideLocations_aggregate?: Maybe<TravelGuideLocation_Aggregate_Order_By>,
  TravelGuideMuseums_aggregate?: Maybe<TravelGuideMuseum_Aggregate_Order_By>,
  TravelGuideRestaurants_aggregate?: Maybe<TravelGuideRestaurant_Aggregate_Order_By>,
  User?: Maybe<User_Order_By>,
  cost?: Maybe<Order_By>,
  creationDate?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  title?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum TravelGuide_Select_Column {
  Cost = 'cost',
  CreationDate = 'creationDate',
  IsDeleted = 'isDeleted',
  Title = 'title',
  TravelGuideId = 'travelGuideID',
  UserId = 'userID'
}

export type TravelGuide_Set_Input = {
  cost?: Maybe<Scalars['Float']>,
  creationDate?: Maybe<Scalars['timestamptz']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type TravelGuide_Stddev_Fields = {
   __typename?: 'TravelGuide_stddev_fields',
  cost?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type TravelGuide_Stddev_Order_By = {
  cost?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type TravelGuide_Stddev_Pop_Fields = {
   __typename?: 'TravelGuide_stddev_pop_fields',
  cost?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type TravelGuide_Stddev_Pop_Order_By = {
  cost?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type TravelGuide_Stddev_Samp_Fields = {
   __typename?: 'TravelGuide_stddev_samp_fields',
  cost?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type TravelGuide_Stddev_Samp_Order_By = {
  cost?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type TravelGuide_Sum_Fields = {
   __typename?: 'TravelGuide_sum_fields',
  cost?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
};

export type TravelGuide_Sum_Order_By = {
  cost?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export enum TravelGuide_Update_Column {
  Cost = 'cost',
  CreationDate = 'creationDate',
  IsDeleted = 'isDeleted',
  Title = 'title',
  TravelGuideId = 'travelGuideID',
  UserId = 'userID'
}

export type TravelGuide_Var_Pop_Fields = {
   __typename?: 'TravelGuide_var_pop_fields',
  cost?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type TravelGuide_Var_Pop_Order_By = {
  cost?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type TravelGuide_Var_Samp_Fields = {
   __typename?: 'TravelGuide_var_samp_fields',
  cost?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type TravelGuide_Var_Samp_Order_By = {
  cost?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type TravelGuide_Variance_Fields = {
   __typename?: 'TravelGuide_variance_fields',
  cost?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
};

export type TravelGuide_Variance_Order_By = {
  cost?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
};

export type TravelGuideArchSite = {
   __typename?: 'TravelGuideArchSite',
  ArchSite: ArchSite,
  TravelGuide: TravelGuide,
  archSiteID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  note?: Maybe<Scalars['String']>,
  travelGuideArchSiteID: Scalars['Int'],
  travelGuideID: Scalars['Int'],
};

export type TravelGuideArchSite_Aggregate = {
   __typename?: 'TravelGuideArchSite_aggregate',
  aggregate?: Maybe<TravelGuideArchSite_Aggregate_Fields>,
  nodes: Array<TravelGuideArchSite>,
};

export type TravelGuideArchSite_Aggregate_Fields = {
   __typename?: 'TravelGuideArchSite_aggregate_fields',
  avg?: Maybe<TravelGuideArchSite_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<TravelGuideArchSite_Max_Fields>,
  min?: Maybe<TravelGuideArchSite_Min_Fields>,
  stddev?: Maybe<TravelGuideArchSite_Stddev_Fields>,
  stddev_pop?: Maybe<TravelGuideArchSite_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<TravelGuideArchSite_Stddev_Samp_Fields>,
  sum?: Maybe<TravelGuideArchSite_Sum_Fields>,
  var_pop?: Maybe<TravelGuideArchSite_Var_Pop_Fields>,
  var_samp?: Maybe<TravelGuideArchSite_Var_Samp_Fields>,
  variance?: Maybe<TravelGuideArchSite_Variance_Fields>,
};


export type TravelGuideArchSite_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<TravelGuideArchSite_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type TravelGuideArchSite_Aggregate_Order_By = {
  avg?: Maybe<TravelGuideArchSite_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<TravelGuideArchSite_Max_Order_By>,
  min?: Maybe<TravelGuideArchSite_Min_Order_By>,
  stddev?: Maybe<TravelGuideArchSite_Stddev_Order_By>,
  stddev_pop?: Maybe<TravelGuideArchSite_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<TravelGuideArchSite_Stddev_Samp_Order_By>,
  sum?: Maybe<TravelGuideArchSite_Sum_Order_By>,
  var_pop?: Maybe<TravelGuideArchSite_Var_Pop_Order_By>,
  var_samp?: Maybe<TravelGuideArchSite_Var_Samp_Order_By>,
  variance?: Maybe<TravelGuideArchSite_Variance_Order_By>,
};

export type TravelGuideArchSite_Arr_Rel_Insert_Input = {
  data: Array<TravelGuideArchSite_Insert_Input>,
  on_conflict?: Maybe<TravelGuideArchSite_On_Conflict>,
};

export type TravelGuideArchSite_Avg_Fields = {
   __typename?: 'TravelGuideArchSite_avg_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  travelGuideArchSiteID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideArchSite_Avg_Order_By = {
  archSiteID?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideArchSite_Bool_Exp = {
  ArchSite?: Maybe<ArchSite_Bool_Exp>,
  TravelGuide?: Maybe<TravelGuide_Bool_Exp>,
  _and?: Maybe<Array<Maybe<TravelGuideArchSite_Bool_Exp>>>,
  _not?: Maybe<TravelGuideArchSite_Bool_Exp>,
  _or?: Maybe<Array<Maybe<TravelGuideArchSite_Bool_Exp>>>,
  archSiteID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  note?: Maybe<String_Comparison_Exp>,
  travelGuideArchSiteID?: Maybe<Int_Comparison_Exp>,
  travelGuideID?: Maybe<Int_Comparison_Exp>,
};

export enum TravelGuideArchSite_Constraint {
  TravelGuideArchSitePkey = 'TravelGuideArchSite_pkey'
}

export type TravelGuideArchSite_Inc_Input = {
  archSiteID?: Maybe<Scalars['Int']>,
  travelGuideArchSiteID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideArchSite_Insert_Input = {
  ArchSite?: Maybe<ArchSite_Obj_Rel_Insert_Input>,
  TravelGuide?: Maybe<TravelGuide_Obj_Rel_Insert_Input>,
  archSiteID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  note?: Maybe<Scalars['String']>,
  travelGuideArchSiteID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideArchSite_Max_Fields = {
   __typename?: 'TravelGuideArchSite_max_fields',
  archSiteID?: Maybe<Scalars['Int']>,
  note?: Maybe<Scalars['String']>,
  travelGuideArchSiteID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideArchSite_Max_Order_By = {
  archSiteID?: Maybe<Order_By>,
  note?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideArchSite_Min_Fields = {
   __typename?: 'TravelGuideArchSite_min_fields',
  archSiteID?: Maybe<Scalars['Int']>,
  note?: Maybe<Scalars['String']>,
  travelGuideArchSiteID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideArchSite_Min_Order_By = {
  archSiteID?: Maybe<Order_By>,
  note?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideArchSite_Mutation_Response = {
   __typename?: 'TravelGuideArchSite_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<TravelGuideArchSite>,
};

export type TravelGuideArchSite_Obj_Rel_Insert_Input = {
  data: TravelGuideArchSite_Insert_Input,
  on_conflict?: Maybe<TravelGuideArchSite_On_Conflict>,
};

export type TravelGuideArchSite_On_Conflict = {
  constraint: TravelGuideArchSite_Constraint,
  update_columns: Array<TravelGuideArchSite_Update_Column>,
  where?: Maybe<TravelGuideArchSite_Bool_Exp>,
};

export type TravelGuideArchSite_Order_By = {
  ArchSite?: Maybe<ArchSite_Order_By>,
  TravelGuide?: Maybe<TravelGuide_Order_By>,
  archSiteID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  note?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export enum TravelGuideArchSite_Select_Column {
  ArchSiteId = 'archSiteID',
  IsDeleted = 'isDeleted',
  Note = 'note',
  TravelGuideArchSiteId = 'travelGuideArchSiteID',
  TravelGuideId = 'travelGuideID'
}

export type TravelGuideArchSite_Set_Input = {
  archSiteID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  note?: Maybe<Scalars['String']>,
  travelGuideArchSiteID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideArchSite_Stddev_Fields = {
   __typename?: 'TravelGuideArchSite_stddev_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  travelGuideArchSiteID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideArchSite_Stddev_Order_By = {
  archSiteID?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideArchSite_Stddev_Pop_Fields = {
   __typename?: 'TravelGuideArchSite_stddev_pop_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  travelGuideArchSiteID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideArchSite_Stddev_Pop_Order_By = {
  archSiteID?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideArchSite_Stddev_Samp_Fields = {
   __typename?: 'TravelGuideArchSite_stddev_samp_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  travelGuideArchSiteID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideArchSite_Stddev_Samp_Order_By = {
  archSiteID?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideArchSite_Sum_Fields = {
   __typename?: 'TravelGuideArchSite_sum_fields',
  archSiteID?: Maybe<Scalars['Int']>,
  travelGuideArchSiteID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideArchSite_Sum_Order_By = {
  archSiteID?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export enum TravelGuideArchSite_Update_Column {
  ArchSiteId = 'archSiteID',
  IsDeleted = 'isDeleted',
  Note = 'note',
  TravelGuideArchSiteId = 'travelGuideArchSiteID',
  TravelGuideId = 'travelGuideID'
}

export type TravelGuideArchSite_Var_Pop_Fields = {
   __typename?: 'TravelGuideArchSite_var_pop_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  travelGuideArchSiteID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideArchSite_Var_Pop_Order_By = {
  archSiteID?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideArchSite_Var_Samp_Fields = {
   __typename?: 'TravelGuideArchSite_var_samp_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  travelGuideArchSiteID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideArchSite_Var_Samp_Order_By = {
  archSiteID?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideArchSite_Variance_Fields = {
   __typename?: 'TravelGuideArchSite_variance_fields',
  archSiteID?: Maybe<Scalars['Float']>,
  travelGuideArchSiteID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideArchSite_Variance_Order_By = {
  archSiteID?: Maybe<Order_By>,
  travelGuideArchSiteID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideHotel = {
   __typename?: 'TravelGuideHotel',
  Hotel: Hotel,
  TravelGuide: TravelGuide,
  hotelID: Scalars['Int'],
  isDeleted: Scalars['Boolean'],
  note?: Maybe<Scalars['String']>,
  travelGuideHotel: Scalars['Int'],
  travelGuideID: Scalars['Int'],
};

export type TravelGuideHotel_Aggregate = {
   __typename?: 'TravelGuideHotel_aggregate',
  aggregate?: Maybe<TravelGuideHotel_Aggregate_Fields>,
  nodes: Array<TravelGuideHotel>,
};

export type TravelGuideHotel_Aggregate_Fields = {
   __typename?: 'TravelGuideHotel_aggregate_fields',
  avg?: Maybe<TravelGuideHotel_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<TravelGuideHotel_Max_Fields>,
  min?: Maybe<TravelGuideHotel_Min_Fields>,
  stddev?: Maybe<TravelGuideHotel_Stddev_Fields>,
  stddev_pop?: Maybe<TravelGuideHotel_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<TravelGuideHotel_Stddev_Samp_Fields>,
  sum?: Maybe<TravelGuideHotel_Sum_Fields>,
  var_pop?: Maybe<TravelGuideHotel_Var_Pop_Fields>,
  var_samp?: Maybe<TravelGuideHotel_Var_Samp_Fields>,
  variance?: Maybe<TravelGuideHotel_Variance_Fields>,
};


export type TravelGuideHotel_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<TravelGuideHotel_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type TravelGuideHotel_Aggregate_Order_By = {
  avg?: Maybe<TravelGuideHotel_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<TravelGuideHotel_Max_Order_By>,
  min?: Maybe<TravelGuideHotel_Min_Order_By>,
  stddev?: Maybe<TravelGuideHotel_Stddev_Order_By>,
  stddev_pop?: Maybe<TravelGuideHotel_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<TravelGuideHotel_Stddev_Samp_Order_By>,
  sum?: Maybe<TravelGuideHotel_Sum_Order_By>,
  var_pop?: Maybe<TravelGuideHotel_Var_Pop_Order_By>,
  var_samp?: Maybe<TravelGuideHotel_Var_Samp_Order_By>,
  variance?: Maybe<TravelGuideHotel_Variance_Order_By>,
};

export type TravelGuideHotel_Arr_Rel_Insert_Input = {
  data: Array<TravelGuideHotel_Insert_Input>,
  on_conflict?: Maybe<TravelGuideHotel_On_Conflict>,
};

export type TravelGuideHotel_Avg_Fields = {
   __typename?: 'TravelGuideHotel_avg_fields',
  hotelID?: Maybe<Scalars['Float']>,
  travelGuideHotel?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideHotel_Avg_Order_By = {
  hotelID?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideHotel_Bool_Exp = {
  Hotel?: Maybe<Hotel_Bool_Exp>,
  TravelGuide?: Maybe<TravelGuide_Bool_Exp>,
  _and?: Maybe<Array<Maybe<TravelGuideHotel_Bool_Exp>>>,
  _not?: Maybe<TravelGuideHotel_Bool_Exp>,
  _or?: Maybe<Array<Maybe<TravelGuideHotel_Bool_Exp>>>,
  hotelID?: Maybe<Int_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  note?: Maybe<String_Comparison_Exp>,
  travelGuideHotel?: Maybe<Int_Comparison_Exp>,
  travelGuideID?: Maybe<Int_Comparison_Exp>,
};

export enum TravelGuideHotel_Constraint {
  TravelGuideHotelPkey = 'TravelGuideHotel_pkey'
}

export type TravelGuideHotel_Inc_Input = {
  hotelID?: Maybe<Scalars['Int']>,
  travelGuideHotel?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideHotel_Insert_Input = {
  Hotel?: Maybe<Hotel_Obj_Rel_Insert_Input>,
  TravelGuide?: Maybe<TravelGuide_Obj_Rel_Insert_Input>,
  hotelID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  note?: Maybe<Scalars['String']>,
  travelGuideHotel?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideHotel_Max_Fields = {
   __typename?: 'TravelGuideHotel_max_fields',
  hotelID?: Maybe<Scalars['Int']>,
  note?: Maybe<Scalars['String']>,
  travelGuideHotel?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideHotel_Max_Order_By = {
  hotelID?: Maybe<Order_By>,
  note?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideHotel_Min_Fields = {
   __typename?: 'TravelGuideHotel_min_fields',
  hotelID?: Maybe<Scalars['Int']>,
  note?: Maybe<Scalars['String']>,
  travelGuideHotel?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideHotel_Min_Order_By = {
  hotelID?: Maybe<Order_By>,
  note?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideHotel_Mutation_Response = {
   __typename?: 'TravelGuideHotel_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<TravelGuideHotel>,
};

export type TravelGuideHotel_Obj_Rel_Insert_Input = {
  data: TravelGuideHotel_Insert_Input,
  on_conflict?: Maybe<TravelGuideHotel_On_Conflict>,
};

export type TravelGuideHotel_On_Conflict = {
  constraint: TravelGuideHotel_Constraint,
  update_columns: Array<TravelGuideHotel_Update_Column>,
  where?: Maybe<TravelGuideHotel_Bool_Exp>,
};

export type TravelGuideHotel_Order_By = {
  Hotel?: Maybe<Hotel_Order_By>,
  TravelGuide?: Maybe<TravelGuide_Order_By>,
  hotelID?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  note?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export enum TravelGuideHotel_Select_Column {
  HotelId = 'hotelID',
  IsDeleted = 'isDeleted',
  Note = 'note',
  TravelGuideHotel = 'travelGuideHotel',
  TravelGuideId = 'travelGuideID'
}

export type TravelGuideHotel_Set_Input = {
  hotelID?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  note?: Maybe<Scalars['String']>,
  travelGuideHotel?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideHotel_Stddev_Fields = {
   __typename?: 'TravelGuideHotel_stddev_fields',
  hotelID?: Maybe<Scalars['Float']>,
  travelGuideHotel?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideHotel_Stddev_Order_By = {
  hotelID?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideHotel_Stddev_Pop_Fields = {
   __typename?: 'TravelGuideHotel_stddev_pop_fields',
  hotelID?: Maybe<Scalars['Float']>,
  travelGuideHotel?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideHotel_Stddev_Pop_Order_By = {
  hotelID?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideHotel_Stddev_Samp_Fields = {
   __typename?: 'TravelGuideHotel_stddev_samp_fields',
  hotelID?: Maybe<Scalars['Float']>,
  travelGuideHotel?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideHotel_Stddev_Samp_Order_By = {
  hotelID?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideHotel_Sum_Fields = {
   __typename?: 'TravelGuideHotel_sum_fields',
  hotelID?: Maybe<Scalars['Int']>,
  travelGuideHotel?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
};

export type TravelGuideHotel_Sum_Order_By = {
  hotelID?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export enum TravelGuideHotel_Update_Column {
  HotelId = 'hotelID',
  IsDeleted = 'isDeleted',
  Note = 'note',
  TravelGuideHotel = 'travelGuideHotel',
  TravelGuideId = 'travelGuideID'
}

export type TravelGuideHotel_Var_Pop_Fields = {
   __typename?: 'TravelGuideHotel_var_pop_fields',
  hotelID?: Maybe<Scalars['Float']>,
  travelGuideHotel?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideHotel_Var_Pop_Order_By = {
  hotelID?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideHotel_Var_Samp_Fields = {
   __typename?: 'TravelGuideHotel_var_samp_fields',
  hotelID?: Maybe<Scalars['Float']>,
  travelGuideHotel?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideHotel_Var_Samp_Order_By = {
  hotelID?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideHotel_Variance_Fields = {
   __typename?: 'TravelGuideHotel_variance_fields',
  hotelID?: Maybe<Scalars['Float']>,
  travelGuideHotel?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
};

export type TravelGuideHotel_Variance_Order_By = {
  hotelID?: Maybe<Order_By>,
  travelGuideHotel?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
};

export type TravelGuideLocation = {
   __typename?: 'TravelGuideLocation',
  Location: Location,
  TravelGuide: TravelGuide,
  isDeleted: Scalars['Boolean'],
  locationID: Scalars['Int'],
  travelGuideID: Scalars['Int'],
  travelGuideLocationID: Scalars['Int'],
};

export type TravelGuideLocation_Aggregate = {
   __typename?: 'TravelGuideLocation_aggregate',
  aggregate?: Maybe<TravelGuideLocation_Aggregate_Fields>,
  nodes: Array<TravelGuideLocation>,
};

export type TravelGuideLocation_Aggregate_Fields = {
   __typename?: 'TravelGuideLocation_aggregate_fields',
  avg?: Maybe<TravelGuideLocation_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<TravelGuideLocation_Max_Fields>,
  min?: Maybe<TravelGuideLocation_Min_Fields>,
  stddev?: Maybe<TravelGuideLocation_Stddev_Fields>,
  stddev_pop?: Maybe<TravelGuideLocation_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<TravelGuideLocation_Stddev_Samp_Fields>,
  sum?: Maybe<TravelGuideLocation_Sum_Fields>,
  var_pop?: Maybe<TravelGuideLocation_Var_Pop_Fields>,
  var_samp?: Maybe<TravelGuideLocation_Var_Samp_Fields>,
  variance?: Maybe<TravelGuideLocation_Variance_Fields>,
};


export type TravelGuideLocation_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<TravelGuideLocation_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type TravelGuideLocation_Aggregate_Order_By = {
  avg?: Maybe<TravelGuideLocation_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<TravelGuideLocation_Max_Order_By>,
  min?: Maybe<TravelGuideLocation_Min_Order_By>,
  stddev?: Maybe<TravelGuideLocation_Stddev_Order_By>,
  stddev_pop?: Maybe<TravelGuideLocation_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<TravelGuideLocation_Stddev_Samp_Order_By>,
  sum?: Maybe<TravelGuideLocation_Sum_Order_By>,
  var_pop?: Maybe<TravelGuideLocation_Var_Pop_Order_By>,
  var_samp?: Maybe<TravelGuideLocation_Var_Samp_Order_By>,
  variance?: Maybe<TravelGuideLocation_Variance_Order_By>,
};

export type TravelGuideLocation_Arr_Rel_Insert_Input = {
  data: Array<TravelGuideLocation_Insert_Input>,
  on_conflict?: Maybe<TravelGuideLocation_On_Conflict>,
};

export type TravelGuideLocation_Avg_Fields = {
   __typename?: 'TravelGuideLocation_avg_fields',
  locationID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideLocationID?: Maybe<Scalars['Float']>,
};

export type TravelGuideLocation_Avg_Order_By = {
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export type TravelGuideLocation_Bool_Exp = {
  Location?: Maybe<Location_Bool_Exp>,
  TravelGuide?: Maybe<TravelGuide_Bool_Exp>,
  _and?: Maybe<Array<Maybe<TravelGuideLocation_Bool_Exp>>>,
  _not?: Maybe<TravelGuideLocation_Bool_Exp>,
  _or?: Maybe<Array<Maybe<TravelGuideLocation_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  locationID?: Maybe<Int_Comparison_Exp>,
  travelGuideID?: Maybe<Int_Comparison_Exp>,
  travelGuideLocationID?: Maybe<Int_Comparison_Exp>,
};

export enum TravelGuideLocation_Constraint {
  TravelGuideLocationPkey = 'TravelGuideLocation_pkey'
}

export type TravelGuideLocation_Inc_Input = {
  locationID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideLocationID?: Maybe<Scalars['Int']>,
};

export type TravelGuideLocation_Insert_Input = {
  Location?: Maybe<Location_Obj_Rel_Insert_Input>,
  TravelGuide?: Maybe<TravelGuide_Obj_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideLocationID?: Maybe<Scalars['Int']>,
};

export type TravelGuideLocation_Max_Fields = {
   __typename?: 'TravelGuideLocation_max_fields',
  locationID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideLocationID?: Maybe<Scalars['Int']>,
};

export type TravelGuideLocation_Max_Order_By = {
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export type TravelGuideLocation_Min_Fields = {
   __typename?: 'TravelGuideLocation_min_fields',
  locationID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideLocationID?: Maybe<Scalars['Int']>,
};

export type TravelGuideLocation_Min_Order_By = {
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export type TravelGuideLocation_Mutation_Response = {
   __typename?: 'TravelGuideLocation_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<TravelGuideLocation>,
};

export type TravelGuideLocation_Obj_Rel_Insert_Input = {
  data: TravelGuideLocation_Insert_Input,
  on_conflict?: Maybe<TravelGuideLocation_On_Conflict>,
};

export type TravelGuideLocation_On_Conflict = {
  constraint: TravelGuideLocation_Constraint,
  update_columns: Array<TravelGuideLocation_Update_Column>,
  where?: Maybe<TravelGuideLocation_Bool_Exp>,
};

export type TravelGuideLocation_Order_By = {
  Location?: Maybe<Location_Order_By>,
  TravelGuide?: Maybe<TravelGuide_Order_By>,
  isDeleted?: Maybe<Order_By>,
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export enum TravelGuideLocation_Select_Column {
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  TravelGuideId = 'travelGuideID',
  TravelGuideLocationId = 'travelGuideLocationID'
}

export type TravelGuideLocation_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  locationID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideLocationID?: Maybe<Scalars['Int']>,
};

export type TravelGuideLocation_Stddev_Fields = {
   __typename?: 'TravelGuideLocation_stddev_fields',
  locationID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideLocationID?: Maybe<Scalars['Float']>,
};

export type TravelGuideLocation_Stddev_Order_By = {
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export type TravelGuideLocation_Stddev_Pop_Fields = {
   __typename?: 'TravelGuideLocation_stddev_pop_fields',
  locationID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideLocationID?: Maybe<Scalars['Float']>,
};

export type TravelGuideLocation_Stddev_Pop_Order_By = {
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export type TravelGuideLocation_Stddev_Samp_Fields = {
   __typename?: 'TravelGuideLocation_stddev_samp_fields',
  locationID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideLocationID?: Maybe<Scalars['Float']>,
};

export type TravelGuideLocation_Stddev_Samp_Order_By = {
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export type TravelGuideLocation_Sum_Fields = {
   __typename?: 'TravelGuideLocation_sum_fields',
  locationID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideLocationID?: Maybe<Scalars['Int']>,
};

export type TravelGuideLocation_Sum_Order_By = {
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export enum TravelGuideLocation_Update_Column {
  IsDeleted = 'isDeleted',
  LocationId = 'locationID',
  TravelGuideId = 'travelGuideID',
  TravelGuideLocationId = 'travelGuideLocationID'
}

export type TravelGuideLocation_Var_Pop_Fields = {
   __typename?: 'TravelGuideLocation_var_pop_fields',
  locationID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideLocationID?: Maybe<Scalars['Float']>,
};

export type TravelGuideLocation_Var_Pop_Order_By = {
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export type TravelGuideLocation_Var_Samp_Fields = {
   __typename?: 'TravelGuideLocation_var_samp_fields',
  locationID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideLocationID?: Maybe<Scalars['Float']>,
};

export type TravelGuideLocation_Var_Samp_Order_By = {
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export type TravelGuideLocation_Variance_Fields = {
   __typename?: 'TravelGuideLocation_variance_fields',
  locationID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideLocationID?: Maybe<Scalars['Float']>,
};

export type TravelGuideLocation_Variance_Order_By = {
  locationID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideLocationID?: Maybe<Order_By>,
};

export type TravelGuideMuseum = {
   __typename?: 'TravelGuideMuseum',
  Museum: Museum,
  TravelGuide: TravelGuide,
  isDeleted: Scalars['Boolean'],
  museumID: Scalars['Int'],
  note?: Maybe<Scalars['String']>,
  travelGuideID: Scalars['Int'],
  travelGuideMuseumID: Scalars['Int'],
};

export type TravelGuideMuseum_Aggregate = {
   __typename?: 'TravelGuideMuseum_aggregate',
  aggregate?: Maybe<TravelGuideMuseum_Aggregate_Fields>,
  nodes: Array<TravelGuideMuseum>,
};

export type TravelGuideMuseum_Aggregate_Fields = {
   __typename?: 'TravelGuideMuseum_aggregate_fields',
  avg?: Maybe<TravelGuideMuseum_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<TravelGuideMuseum_Max_Fields>,
  min?: Maybe<TravelGuideMuseum_Min_Fields>,
  stddev?: Maybe<TravelGuideMuseum_Stddev_Fields>,
  stddev_pop?: Maybe<TravelGuideMuseum_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<TravelGuideMuseum_Stddev_Samp_Fields>,
  sum?: Maybe<TravelGuideMuseum_Sum_Fields>,
  var_pop?: Maybe<TravelGuideMuseum_Var_Pop_Fields>,
  var_samp?: Maybe<TravelGuideMuseum_Var_Samp_Fields>,
  variance?: Maybe<TravelGuideMuseum_Variance_Fields>,
};


export type TravelGuideMuseum_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<TravelGuideMuseum_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type TravelGuideMuseum_Aggregate_Order_By = {
  avg?: Maybe<TravelGuideMuseum_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<TravelGuideMuseum_Max_Order_By>,
  min?: Maybe<TravelGuideMuseum_Min_Order_By>,
  stddev?: Maybe<TravelGuideMuseum_Stddev_Order_By>,
  stddev_pop?: Maybe<TravelGuideMuseum_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<TravelGuideMuseum_Stddev_Samp_Order_By>,
  sum?: Maybe<TravelGuideMuseum_Sum_Order_By>,
  var_pop?: Maybe<TravelGuideMuseum_Var_Pop_Order_By>,
  var_samp?: Maybe<TravelGuideMuseum_Var_Samp_Order_By>,
  variance?: Maybe<TravelGuideMuseum_Variance_Order_By>,
};

export type TravelGuideMuseum_Arr_Rel_Insert_Input = {
  data: Array<TravelGuideMuseum_Insert_Input>,
  on_conflict?: Maybe<TravelGuideMuseum_On_Conflict>,
};

export type TravelGuideMuseum_Avg_Fields = {
   __typename?: 'TravelGuideMuseum_avg_fields',
  museumID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideMuseumID?: Maybe<Scalars['Float']>,
};

export type TravelGuideMuseum_Avg_Order_By = {
  museumID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export type TravelGuideMuseum_Bool_Exp = {
  Museum?: Maybe<Museum_Bool_Exp>,
  TravelGuide?: Maybe<TravelGuide_Bool_Exp>,
  _and?: Maybe<Array<Maybe<TravelGuideMuseum_Bool_Exp>>>,
  _not?: Maybe<TravelGuideMuseum_Bool_Exp>,
  _or?: Maybe<Array<Maybe<TravelGuideMuseum_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  museumID?: Maybe<Int_Comparison_Exp>,
  note?: Maybe<String_Comparison_Exp>,
  travelGuideID?: Maybe<Int_Comparison_Exp>,
  travelGuideMuseumID?: Maybe<Int_Comparison_Exp>,
};

export enum TravelGuideMuseum_Constraint {
  TravelGuideMuseumPkey = 'TravelGuideMuseum_pkey'
}

export type TravelGuideMuseum_Inc_Input = {
  museumID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideMuseumID?: Maybe<Scalars['Int']>,
};

export type TravelGuideMuseum_Insert_Input = {
  Museum?: Maybe<Museum_Obj_Rel_Insert_Input>,
  TravelGuide?: Maybe<TravelGuide_Obj_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumID?: Maybe<Scalars['Int']>,
  note?: Maybe<Scalars['String']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideMuseumID?: Maybe<Scalars['Int']>,
};

export type TravelGuideMuseum_Max_Fields = {
   __typename?: 'TravelGuideMuseum_max_fields',
  museumID?: Maybe<Scalars['Int']>,
  note?: Maybe<Scalars['String']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideMuseumID?: Maybe<Scalars['Int']>,
};

export type TravelGuideMuseum_Max_Order_By = {
  museumID?: Maybe<Order_By>,
  note?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export type TravelGuideMuseum_Min_Fields = {
   __typename?: 'TravelGuideMuseum_min_fields',
  museumID?: Maybe<Scalars['Int']>,
  note?: Maybe<Scalars['String']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideMuseumID?: Maybe<Scalars['Int']>,
};

export type TravelGuideMuseum_Min_Order_By = {
  museumID?: Maybe<Order_By>,
  note?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export type TravelGuideMuseum_Mutation_Response = {
   __typename?: 'TravelGuideMuseum_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<TravelGuideMuseum>,
};

export type TravelGuideMuseum_Obj_Rel_Insert_Input = {
  data: TravelGuideMuseum_Insert_Input,
  on_conflict?: Maybe<TravelGuideMuseum_On_Conflict>,
};

export type TravelGuideMuseum_On_Conflict = {
  constraint: TravelGuideMuseum_Constraint,
  update_columns: Array<TravelGuideMuseum_Update_Column>,
  where?: Maybe<TravelGuideMuseum_Bool_Exp>,
};

export type TravelGuideMuseum_Order_By = {
  Museum?: Maybe<Museum_Order_By>,
  TravelGuide?: Maybe<TravelGuide_Order_By>,
  isDeleted?: Maybe<Order_By>,
  museumID?: Maybe<Order_By>,
  note?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export enum TravelGuideMuseum_Select_Column {
  IsDeleted = 'isDeleted',
  MuseumId = 'museumID',
  Note = 'note',
  TravelGuideId = 'travelGuideID',
  TravelGuideMuseumId = 'travelGuideMuseumID'
}

export type TravelGuideMuseum_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  museumID?: Maybe<Scalars['Int']>,
  note?: Maybe<Scalars['String']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideMuseumID?: Maybe<Scalars['Int']>,
};

export type TravelGuideMuseum_Stddev_Fields = {
   __typename?: 'TravelGuideMuseum_stddev_fields',
  museumID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideMuseumID?: Maybe<Scalars['Float']>,
};

export type TravelGuideMuseum_Stddev_Order_By = {
  museumID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export type TravelGuideMuseum_Stddev_Pop_Fields = {
   __typename?: 'TravelGuideMuseum_stddev_pop_fields',
  museumID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideMuseumID?: Maybe<Scalars['Float']>,
};

export type TravelGuideMuseum_Stddev_Pop_Order_By = {
  museumID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export type TravelGuideMuseum_Stddev_Samp_Fields = {
   __typename?: 'TravelGuideMuseum_stddev_samp_fields',
  museumID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideMuseumID?: Maybe<Scalars['Float']>,
};

export type TravelGuideMuseum_Stddev_Samp_Order_By = {
  museumID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export type TravelGuideMuseum_Sum_Fields = {
   __typename?: 'TravelGuideMuseum_sum_fields',
  museumID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideMuseumID?: Maybe<Scalars['Int']>,
};

export type TravelGuideMuseum_Sum_Order_By = {
  museumID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export enum TravelGuideMuseum_Update_Column {
  IsDeleted = 'isDeleted',
  MuseumId = 'museumID',
  Note = 'note',
  TravelGuideId = 'travelGuideID',
  TravelGuideMuseumId = 'travelGuideMuseumID'
}

export type TravelGuideMuseum_Var_Pop_Fields = {
   __typename?: 'TravelGuideMuseum_var_pop_fields',
  museumID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideMuseumID?: Maybe<Scalars['Float']>,
};

export type TravelGuideMuseum_Var_Pop_Order_By = {
  museumID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export type TravelGuideMuseum_Var_Samp_Fields = {
   __typename?: 'TravelGuideMuseum_var_samp_fields',
  museumID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideMuseumID?: Maybe<Scalars['Float']>,
};

export type TravelGuideMuseum_Var_Samp_Order_By = {
  museumID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export type TravelGuideMuseum_Variance_Fields = {
   __typename?: 'TravelGuideMuseum_variance_fields',
  museumID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideMuseumID?: Maybe<Scalars['Float']>,
};

export type TravelGuideMuseum_Variance_Order_By = {
  museumID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideMuseumID?: Maybe<Order_By>,
};

export type TravelGuideRestaurant = {
   __typename?: 'TravelGuideRestaurant',
  Restaurant: Restaurant,
  TravelGuide: TravelGuide,
  isDeleted: Scalars['Boolean'],
  note?: Maybe<Scalars['String']>,
  restaurantID: Scalars['Int'],
  travelGuideID: Scalars['Int'],
  travelGuideRestaurantID: Scalars['Int'],
};

export type TravelGuideRestaurant_Aggregate = {
   __typename?: 'TravelGuideRestaurant_aggregate',
  aggregate?: Maybe<TravelGuideRestaurant_Aggregate_Fields>,
  nodes: Array<TravelGuideRestaurant>,
};

export type TravelGuideRestaurant_Aggregate_Fields = {
   __typename?: 'TravelGuideRestaurant_aggregate_fields',
  avg?: Maybe<TravelGuideRestaurant_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<TravelGuideRestaurant_Max_Fields>,
  min?: Maybe<TravelGuideRestaurant_Min_Fields>,
  stddev?: Maybe<TravelGuideRestaurant_Stddev_Fields>,
  stddev_pop?: Maybe<TravelGuideRestaurant_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<TravelGuideRestaurant_Stddev_Samp_Fields>,
  sum?: Maybe<TravelGuideRestaurant_Sum_Fields>,
  var_pop?: Maybe<TravelGuideRestaurant_Var_Pop_Fields>,
  var_samp?: Maybe<TravelGuideRestaurant_Var_Samp_Fields>,
  variance?: Maybe<TravelGuideRestaurant_Variance_Fields>,
};


export type TravelGuideRestaurant_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<TravelGuideRestaurant_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type TravelGuideRestaurant_Aggregate_Order_By = {
  avg?: Maybe<TravelGuideRestaurant_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<TravelGuideRestaurant_Max_Order_By>,
  min?: Maybe<TravelGuideRestaurant_Min_Order_By>,
  stddev?: Maybe<TravelGuideRestaurant_Stddev_Order_By>,
  stddev_pop?: Maybe<TravelGuideRestaurant_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<TravelGuideRestaurant_Stddev_Samp_Order_By>,
  sum?: Maybe<TravelGuideRestaurant_Sum_Order_By>,
  var_pop?: Maybe<TravelGuideRestaurant_Var_Pop_Order_By>,
  var_samp?: Maybe<TravelGuideRestaurant_Var_Samp_Order_By>,
  variance?: Maybe<TravelGuideRestaurant_Variance_Order_By>,
};

export type TravelGuideRestaurant_Arr_Rel_Insert_Input = {
  data: Array<TravelGuideRestaurant_Insert_Input>,
  on_conflict?: Maybe<TravelGuideRestaurant_On_Conflict>,
};

export type TravelGuideRestaurant_Avg_Fields = {
   __typename?: 'TravelGuideRestaurant_avg_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideRestaurantID?: Maybe<Scalars['Float']>,
};

export type TravelGuideRestaurant_Avg_Order_By = {
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export type TravelGuideRestaurant_Bool_Exp = {
  Restaurant?: Maybe<Restaurant_Bool_Exp>,
  TravelGuide?: Maybe<TravelGuide_Bool_Exp>,
  _and?: Maybe<Array<Maybe<TravelGuideRestaurant_Bool_Exp>>>,
  _not?: Maybe<TravelGuideRestaurant_Bool_Exp>,
  _or?: Maybe<Array<Maybe<TravelGuideRestaurant_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  note?: Maybe<String_Comparison_Exp>,
  restaurantID?: Maybe<Int_Comparison_Exp>,
  travelGuideID?: Maybe<Int_Comparison_Exp>,
  travelGuideRestaurantID?: Maybe<Int_Comparison_Exp>,
};

export enum TravelGuideRestaurant_Constraint {
  TravelGuideRestaurantPkey = 'TravelGuideRestaurant_pkey'
}

export type TravelGuideRestaurant_Inc_Input = {
  restaurantID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideRestaurantID?: Maybe<Scalars['Int']>,
};

export type TravelGuideRestaurant_Insert_Input = {
  Restaurant?: Maybe<Restaurant_Obj_Rel_Insert_Input>,
  TravelGuide?: Maybe<TravelGuide_Obj_Rel_Insert_Input>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  note?: Maybe<Scalars['String']>,
  restaurantID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideRestaurantID?: Maybe<Scalars['Int']>,
};

export type TravelGuideRestaurant_Max_Fields = {
   __typename?: 'TravelGuideRestaurant_max_fields',
  note?: Maybe<Scalars['String']>,
  restaurantID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideRestaurantID?: Maybe<Scalars['Int']>,
};

export type TravelGuideRestaurant_Max_Order_By = {
  note?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export type TravelGuideRestaurant_Min_Fields = {
   __typename?: 'TravelGuideRestaurant_min_fields',
  note?: Maybe<Scalars['String']>,
  restaurantID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideRestaurantID?: Maybe<Scalars['Int']>,
};

export type TravelGuideRestaurant_Min_Order_By = {
  note?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export type TravelGuideRestaurant_Mutation_Response = {
   __typename?: 'TravelGuideRestaurant_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<TravelGuideRestaurant>,
};

export type TravelGuideRestaurant_Obj_Rel_Insert_Input = {
  data: TravelGuideRestaurant_Insert_Input,
  on_conflict?: Maybe<TravelGuideRestaurant_On_Conflict>,
};

export type TravelGuideRestaurant_On_Conflict = {
  constraint: TravelGuideRestaurant_Constraint,
  update_columns: Array<TravelGuideRestaurant_Update_Column>,
  where?: Maybe<TravelGuideRestaurant_Bool_Exp>,
};

export type TravelGuideRestaurant_Order_By = {
  Restaurant?: Maybe<Restaurant_Order_By>,
  TravelGuide?: Maybe<TravelGuide_Order_By>,
  isDeleted?: Maybe<Order_By>,
  note?: Maybe<Order_By>,
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export enum TravelGuideRestaurant_Select_Column {
  IsDeleted = 'isDeleted',
  Note = 'note',
  RestaurantId = 'restaurantID',
  TravelGuideId = 'travelGuideID',
  TravelGuideRestaurantId = 'travelGuideRestaurantID'
}

export type TravelGuideRestaurant_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  note?: Maybe<Scalars['String']>,
  restaurantID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideRestaurantID?: Maybe<Scalars['Int']>,
};

export type TravelGuideRestaurant_Stddev_Fields = {
   __typename?: 'TravelGuideRestaurant_stddev_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideRestaurantID?: Maybe<Scalars['Float']>,
};

export type TravelGuideRestaurant_Stddev_Order_By = {
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export type TravelGuideRestaurant_Stddev_Pop_Fields = {
   __typename?: 'TravelGuideRestaurant_stddev_pop_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideRestaurantID?: Maybe<Scalars['Float']>,
};

export type TravelGuideRestaurant_Stddev_Pop_Order_By = {
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export type TravelGuideRestaurant_Stddev_Samp_Fields = {
   __typename?: 'TravelGuideRestaurant_stddev_samp_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideRestaurantID?: Maybe<Scalars['Float']>,
};

export type TravelGuideRestaurant_Stddev_Samp_Order_By = {
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export type TravelGuideRestaurant_Sum_Fields = {
   __typename?: 'TravelGuideRestaurant_sum_fields',
  restaurantID?: Maybe<Scalars['Int']>,
  travelGuideID?: Maybe<Scalars['Int']>,
  travelGuideRestaurantID?: Maybe<Scalars['Int']>,
};

export type TravelGuideRestaurant_Sum_Order_By = {
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export enum TravelGuideRestaurant_Update_Column {
  IsDeleted = 'isDeleted',
  Note = 'note',
  RestaurantId = 'restaurantID',
  TravelGuideId = 'travelGuideID',
  TravelGuideRestaurantId = 'travelGuideRestaurantID'
}

export type TravelGuideRestaurant_Var_Pop_Fields = {
   __typename?: 'TravelGuideRestaurant_var_pop_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideRestaurantID?: Maybe<Scalars['Float']>,
};

export type TravelGuideRestaurant_Var_Pop_Order_By = {
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export type TravelGuideRestaurant_Var_Samp_Fields = {
   __typename?: 'TravelGuideRestaurant_var_samp_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideRestaurantID?: Maybe<Scalars['Float']>,
};

export type TravelGuideRestaurant_Var_Samp_Order_By = {
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export type TravelGuideRestaurant_Variance_Fields = {
   __typename?: 'TravelGuideRestaurant_variance_fields',
  restaurantID?: Maybe<Scalars['Float']>,
  travelGuideID?: Maybe<Scalars['Float']>,
  travelGuideRestaurantID?: Maybe<Scalars['Float']>,
};

export type TravelGuideRestaurant_Variance_Order_By = {
  restaurantID?: Maybe<Order_By>,
  travelGuideID?: Maybe<Order_By>,
  travelGuideRestaurantID?: Maybe<Order_By>,
};

export type User = {
   __typename?: 'User',
  ArchSiteComments: Array<ArchSiteComment>,
  ArchSiteComments_aggregate: ArchSiteComment_Aggregate,
  ArticleUsers: Array<ArticleUser>,
  ArticleUsers_aggregate: ArticleUser_Aggregate,
  CompanyUsers: Array<CompanyUser>,
  CompanyUsers_aggregate: CompanyUser_Aggregate,
  HotelComments: Array<HotelComment>,
  HotelComments_aggregate: HotelComment_Aggregate,
  LoginType: LoginType,
  MuseumComments: Array<MuseumComment>,
  MuseumComments_aggregate: MuseumComment_Aggregate,
  Phone?: Maybe<Phone>,
  RestaurantComments: Array<RestaurantComment>,
  RestaurantComments_aggregate: RestaurantComment_Aggregate,
  TravelGuides: Array<TravelGuide>,
  TravelGuides_aggregate: TravelGuide_Aggregate,
  accessToken?: Maybe<Scalars['String']>,
  birthDate?: Maybe<Scalars['date']>,
  isBlocked: Scalars['Boolean'],
  isDeleted: Scalars['Boolean'],
  loginDate: Scalars['timestamptz'],
  loginIP: Scalars['inet'],
  loginTypeID: Scalars['Int'],
  mail: Scalars['String'],
  name: Scalars['String'],
  password: Scalars['String'],
  phoneID?: Maybe<Scalars['Int']>,
  profileImageUrl?: Maybe<Scalars['String']>,
  registerDate: Scalars['timestamptz'],
  surname?: Maybe<Scalars['String']>,
  userID: Scalars['Int'],
  userTypeID: Scalars['Int'],
};


export type UserArchSiteCommentsArgs = {
  distinct_on?: Maybe<Array<ArchSiteComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteComment_Order_By>>,
  where?: Maybe<ArchSiteComment_Bool_Exp>
};


export type UserArchSiteComments_AggregateArgs = {
  distinct_on?: Maybe<Array<ArchSiteComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArchSiteComment_Order_By>>,
  where?: Maybe<ArchSiteComment_Bool_Exp>
};


export type UserArticleUsersArgs = {
  distinct_on?: Maybe<Array<ArticleUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleUser_Order_By>>,
  where?: Maybe<ArticleUser_Bool_Exp>
};


export type UserArticleUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<ArticleUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<ArticleUser_Order_By>>,
  where?: Maybe<ArticleUser_Bool_Exp>
};


export type UserCompanyUsersArgs = {
  distinct_on?: Maybe<Array<CompanyUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyUser_Order_By>>,
  where?: Maybe<CompanyUser_Bool_Exp>
};


export type UserCompanyUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<CompanyUser_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompanyUser_Order_By>>,
  where?: Maybe<CompanyUser_Bool_Exp>
};


export type UserHotelCommentsArgs = {
  distinct_on?: Maybe<Array<HotelComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelComment_Order_By>>,
  where?: Maybe<HotelComment_Bool_Exp>
};


export type UserHotelComments_AggregateArgs = {
  distinct_on?: Maybe<Array<HotelComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<HotelComment_Order_By>>,
  where?: Maybe<HotelComment_Bool_Exp>
};


export type UserMuseumCommentsArgs = {
  distinct_on?: Maybe<Array<MuseumComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumComment_Order_By>>,
  where?: Maybe<MuseumComment_Bool_Exp>
};


export type UserMuseumComments_AggregateArgs = {
  distinct_on?: Maybe<Array<MuseumComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<MuseumComment_Order_By>>,
  where?: Maybe<MuseumComment_Bool_Exp>
};


export type UserRestaurantCommentsArgs = {
  distinct_on?: Maybe<Array<RestaurantComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantComment_Order_By>>,
  where?: Maybe<RestaurantComment_Bool_Exp>
};


export type UserRestaurantComments_AggregateArgs = {
  distinct_on?: Maybe<Array<RestaurantComment_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<RestaurantComment_Order_By>>,
  where?: Maybe<RestaurantComment_Bool_Exp>
};


export type UserTravelGuidesArgs = {
  distinct_on?: Maybe<Array<TravelGuide_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuide_Order_By>>,
  where?: Maybe<TravelGuide_Bool_Exp>
};


export type UserTravelGuides_AggregateArgs = {
  distinct_on?: Maybe<Array<TravelGuide_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<TravelGuide_Order_By>>,
  where?: Maybe<TravelGuide_Bool_Exp>
};

export type User_Aggregate = {
   __typename?: 'User_aggregate',
  aggregate?: Maybe<User_Aggregate_Fields>,
  nodes: Array<User>,
};

export type User_Aggregate_Fields = {
   __typename?: 'User_aggregate_fields',
  avg?: Maybe<User_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<User_Max_Fields>,
  min?: Maybe<User_Min_Fields>,
  stddev?: Maybe<User_Stddev_Fields>,
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>,
  sum?: Maybe<User_Sum_Fields>,
  var_pop?: Maybe<User_Var_Pop_Fields>,
  var_samp?: Maybe<User_Var_Samp_Fields>,
  variance?: Maybe<User_Variance_Fields>,
};


export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type User_Aggregate_Order_By = {
  avg?: Maybe<User_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<User_Max_Order_By>,
  min?: Maybe<User_Min_Order_By>,
  stddev?: Maybe<User_Stddev_Order_By>,
  stddev_pop?: Maybe<User_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<User_Stddev_Samp_Order_By>,
  sum?: Maybe<User_Sum_Order_By>,
  var_pop?: Maybe<User_Var_Pop_Order_By>,
  var_samp?: Maybe<User_Var_Samp_Order_By>,
  variance?: Maybe<User_Variance_Order_By>,
};

export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>,
  on_conflict?: Maybe<User_On_Conflict>,
};

export type User_Avg_Fields = {
   __typename?: 'User_avg_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
  userTypeID?: Maybe<Scalars['Float']>,
};

export type User_Avg_Order_By = {
  loginTypeID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type User_Bool_Exp = {
  ArchSiteComments?: Maybe<ArchSiteComment_Bool_Exp>,
  ArticleUsers?: Maybe<ArticleUser_Bool_Exp>,
  CompanyUsers?: Maybe<CompanyUser_Bool_Exp>,
  HotelComments?: Maybe<HotelComment_Bool_Exp>,
  LoginType?: Maybe<LoginType_Bool_Exp>,
  MuseumComments?: Maybe<MuseumComment_Bool_Exp>,
  Phone?: Maybe<Phone_Bool_Exp>,
  RestaurantComments?: Maybe<RestaurantComment_Bool_Exp>,
  TravelGuides?: Maybe<TravelGuide_Bool_Exp>,
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>,
  _not?: Maybe<User_Bool_Exp>,
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>,
  accessToken?: Maybe<String_Comparison_Exp>,
  birthDate?: Maybe<Date_Comparison_Exp>,
  isBlocked?: Maybe<Boolean_Comparison_Exp>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  loginDate?: Maybe<Timestamptz_Comparison_Exp>,
  loginIP?: Maybe<Inet_Comparison_Exp>,
  loginTypeID?: Maybe<Int_Comparison_Exp>,
  mail?: Maybe<String_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
  password?: Maybe<String_Comparison_Exp>,
  phoneID?: Maybe<Int_Comparison_Exp>,
  profileImageUrl?: Maybe<String_Comparison_Exp>,
  registerDate?: Maybe<Timestamptz_Comparison_Exp>,
  surname?: Maybe<String_Comparison_Exp>,
  userID?: Maybe<Int_Comparison_Exp>,
  userTypeID?: Maybe<Int_Comparison_Exp>,
};

export enum User_Constraint {
  UserMailKey = 'User_mail_key',
  UserPkey = 'User_pkey'
}

export type User_Inc_Input = {
  loginTypeID?: Maybe<Scalars['Int']>,
  phoneID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
  userTypeID?: Maybe<Scalars['Int']>,
};

export type User_Insert_Input = {
  ArchSiteComments?: Maybe<ArchSiteComment_Arr_Rel_Insert_Input>,
  ArticleUsers?: Maybe<ArticleUser_Arr_Rel_Insert_Input>,
  CompanyUsers?: Maybe<CompanyUser_Arr_Rel_Insert_Input>,
  HotelComments?: Maybe<HotelComment_Arr_Rel_Insert_Input>,
  LoginType?: Maybe<LoginType_Obj_Rel_Insert_Input>,
  MuseumComments?: Maybe<MuseumComment_Arr_Rel_Insert_Input>,
  Phone?: Maybe<Phone_Obj_Rel_Insert_Input>,
  RestaurantComments?: Maybe<RestaurantComment_Arr_Rel_Insert_Input>,
  TravelGuides?: Maybe<TravelGuide_Arr_Rel_Insert_Input>,
  accessToken?: Maybe<Scalars['String']>,
  birthDate?: Maybe<Scalars['date']>,
  isBlocked?: Maybe<Scalars['Boolean']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  loginDate?: Maybe<Scalars['timestamptz']>,
  loginIP?: Maybe<Scalars['inet']>,
  loginTypeID?: Maybe<Scalars['Int']>,
  mail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  phoneID?: Maybe<Scalars['Int']>,
  profileImageUrl?: Maybe<Scalars['String']>,
  registerDate?: Maybe<Scalars['timestamptz']>,
  surname?: Maybe<Scalars['String']>,
  userID?: Maybe<Scalars['Int']>,
  userTypeID?: Maybe<Scalars['Int']>,
};

export type User_Max_Fields = {
   __typename?: 'User_max_fields',
  accessToken?: Maybe<Scalars['String']>,
  birthDate?: Maybe<Scalars['date']>,
  loginDate?: Maybe<Scalars['timestamptz']>,
  loginTypeID?: Maybe<Scalars['Int']>,
  mail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  phoneID?: Maybe<Scalars['Int']>,
  profileImageUrl?: Maybe<Scalars['String']>,
  registerDate?: Maybe<Scalars['timestamptz']>,
  surname?: Maybe<Scalars['String']>,
  userID?: Maybe<Scalars['Int']>,
  userTypeID?: Maybe<Scalars['Int']>,
};

export type User_Max_Order_By = {
  accessToken?: Maybe<Order_By>,
  birthDate?: Maybe<Order_By>,
  loginDate?: Maybe<Order_By>,
  loginTypeID?: Maybe<Order_By>,
  mail?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  password?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  profileImageUrl?: Maybe<Order_By>,
  registerDate?: Maybe<Order_By>,
  surname?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type User_Min_Fields = {
   __typename?: 'User_min_fields',
  accessToken?: Maybe<Scalars['String']>,
  birthDate?: Maybe<Scalars['date']>,
  loginDate?: Maybe<Scalars['timestamptz']>,
  loginTypeID?: Maybe<Scalars['Int']>,
  mail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  phoneID?: Maybe<Scalars['Int']>,
  profileImageUrl?: Maybe<Scalars['String']>,
  registerDate?: Maybe<Scalars['timestamptz']>,
  surname?: Maybe<Scalars['String']>,
  userID?: Maybe<Scalars['Int']>,
  userTypeID?: Maybe<Scalars['Int']>,
};

export type User_Min_Order_By = {
  accessToken?: Maybe<Order_By>,
  birthDate?: Maybe<Order_By>,
  loginDate?: Maybe<Order_By>,
  loginTypeID?: Maybe<Order_By>,
  mail?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  password?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  profileImageUrl?: Maybe<Order_By>,
  registerDate?: Maybe<Order_By>,
  surname?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type User_Mutation_Response = {
   __typename?: 'User_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<User>,
};

export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input,
  on_conflict?: Maybe<User_On_Conflict>,
};

export type User_On_Conflict = {
  constraint: User_Constraint,
  update_columns: Array<User_Update_Column>,
  where?: Maybe<User_Bool_Exp>,
};

export type User_Order_By = {
  ArchSiteComments_aggregate?: Maybe<ArchSiteComment_Aggregate_Order_By>,
  ArticleUsers_aggregate?: Maybe<ArticleUser_Aggregate_Order_By>,
  CompanyUsers_aggregate?: Maybe<CompanyUser_Aggregate_Order_By>,
  HotelComments_aggregate?: Maybe<HotelComment_Aggregate_Order_By>,
  LoginType?: Maybe<LoginType_Order_By>,
  MuseumComments_aggregate?: Maybe<MuseumComment_Aggregate_Order_By>,
  Phone?: Maybe<Phone_Order_By>,
  RestaurantComments_aggregate?: Maybe<RestaurantComment_Aggregate_Order_By>,
  TravelGuides_aggregate?: Maybe<TravelGuide_Aggregate_Order_By>,
  accessToken?: Maybe<Order_By>,
  birthDate?: Maybe<Order_By>,
  isBlocked?: Maybe<Order_By>,
  isDeleted?: Maybe<Order_By>,
  loginDate?: Maybe<Order_By>,
  loginIP?: Maybe<Order_By>,
  loginTypeID?: Maybe<Order_By>,
  mail?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  password?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  profileImageUrl?: Maybe<Order_By>,
  registerDate?: Maybe<Order_By>,
  surname?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export enum User_Select_Column {
  AccessToken = 'accessToken',
  BirthDate = 'birthDate',
  IsBlocked = 'isBlocked',
  IsDeleted = 'isDeleted',
  LoginDate = 'loginDate',
  LoginIp = 'loginIP',
  LoginTypeId = 'loginTypeID',
  Mail = 'mail',
  Name = 'name',
  Password = 'password',
  PhoneId = 'phoneID',
  ProfileImageUrl = 'profileImageUrl',
  RegisterDate = 'registerDate',
  Surname = 'surname',
  UserId = 'userID',
  UserTypeId = 'userTypeID'
}

export type User_Set_Input = {
  accessToken?: Maybe<Scalars['String']>,
  birthDate?: Maybe<Scalars['date']>,
  isBlocked?: Maybe<Scalars['Boolean']>,
  isDeleted?: Maybe<Scalars['Boolean']>,
  loginDate?: Maybe<Scalars['timestamptz']>,
  loginIP?: Maybe<Scalars['inet']>,
  loginTypeID?: Maybe<Scalars['Int']>,
  mail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  phoneID?: Maybe<Scalars['Int']>,
  profileImageUrl?: Maybe<Scalars['String']>,
  registerDate?: Maybe<Scalars['timestamptz']>,
  surname?: Maybe<Scalars['String']>,
  userID?: Maybe<Scalars['Int']>,
  userTypeID?: Maybe<Scalars['Int']>,
};

export type User_Stddev_Fields = {
   __typename?: 'User_stddev_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
  userTypeID?: Maybe<Scalars['Float']>,
};

export type User_Stddev_Order_By = {
  loginTypeID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type User_Stddev_Pop_Fields = {
   __typename?: 'User_stddev_pop_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
  userTypeID?: Maybe<Scalars['Float']>,
};

export type User_Stddev_Pop_Order_By = {
  loginTypeID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type User_Stddev_Samp_Fields = {
   __typename?: 'User_stddev_samp_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
  userTypeID?: Maybe<Scalars['Float']>,
};

export type User_Stddev_Samp_Order_By = {
  loginTypeID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type User_Sum_Fields = {
   __typename?: 'User_sum_fields',
  loginTypeID?: Maybe<Scalars['Int']>,
  phoneID?: Maybe<Scalars['Int']>,
  userID?: Maybe<Scalars['Int']>,
  userTypeID?: Maybe<Scalars['Int']>,
};

export type User_Sum_Order_By = {
  loginTypeID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export enum User_Update_Column {
  AccessToken = 'accessToken',
  BirthDate = 'birthDate',
  IsBlocked = 'isBlocked',
  IsDeleted = 'isDeleted',
  LoginDate = 'loginDate',
  LoginIp = 'loginIP',
  LoginTypeId = 'loginTypeID',
  Mail = 'mail',
  Name = 'name',
  Password = 'password',
  PhoneId = 'phoneID',
  ProfileImageUrl = 'profileImageUrl',
  RegisterDate = 'registerDate',
  Surname = 'surname',
  UserId = 'userID',
  UserTypeId = 'userTypeID'
}

export type User_Var_Pop_Fields = {
   __typename?: 'User_var_pop_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
  userTypeID?: Maybe<Scalars['Float']>,
};

export type User_Var_Pop_Order_By = {
  loginTypeID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type User_Var_Samp_Fields = {
   __typename?: 'User_var_samp_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
  userTypeID?: Maybe<Scalars['Float']>,
};

export type User_Var_Samp_Order_By = {
  loginTypeID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type User_Variance_Fields = {
   __typename?: 'User_variance_fields',
  loginTypeID?: Maybe<Scalars['Float']>,
  phoneID?: Maybe<Scalars['Float']>,
  userID?: Maybe<Scalars['Float']>,
  userTypeID?: Maybe<Scalars['Float']>,
};

export type User_Variance_Order_By = {
  loginTypeID?: Maybe<Order_By>,
  phoneID?: Maybe<Order_By>,
  userID?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type UserType = {
   __typename?: 'UserType',
  isDeleted: Scalars['Boolean'],
  type: Scalars['String'],
  userTypeID: Scalars['Int'],
};

export type UserType_Aggregate = {
   __typename?: 'UserType_aggregate',
  aggregate?: Maybe<UserType_Aggregate_Fields>,
  nodes: Array<UserType>,
};

export type UserType_Aggregate_Fields = {
   __typename?: 'UserType_aggregate_fields',
  avg?: Maybe<UserType_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<UserType_Max_Fields>,
  min?: Maybe<UserType_Min_Fields>,
  stddev?: Maybe<UserType_Stddev_Fields>,
  stddev_pop?: Maybe<UserType_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<UserType_Stddev_Samp_Fields>,
  sum?: Maybe<UserType_Sum_Fields>,
  var_pop?: Maybe<UserType_Var_Pop_Fields>,
  var_samp?: Maybe<UserType_Var_Samp_Fields>,
  variance?: Maybe<UserType_Variance_Fields>,
};


export type UserType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<UserType_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type UserType_Aggregate_Order_By = {
  avg?: Maybe<UserType_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<UserType_Max_Order_By>,
  min?: Maybe<UserType_Min_Order_By>,
  stddev?: Maybe<UserType_Stddev_Order_By>,
  stddev_pop?: Maybe<UserType_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<UserType_Stddev_Samp_Order_By>,
  sum?: Maybe<UserType_Sum_Order_By>,
  var_pop?: Maybe<UserType_Var_Pop_Order_By>,
  var_samp?: Maybe<UserType_Var_Samp_Order_By>,
  variance?: Maybe<UserType_Variance_Order_By>,
};

export type UserType_Arr_Rel_Insert_Input = {
  data: Array<UserType_Insert_Input>,
  on_conflict?: Maybe<UserType_On_Conflict>,
};

export type UserType_Avg_Fields = {
   __typename?: 'UserType_avg_fields',
  userTypeID?: Maybe<Scalars['Float']>,
};

export type UserType_Avg_Order_By = {
  userTypeID?: Maybe<Order_By>,
};

export type UserType_Bool_Exp = {
  _and?: Maybe<Array<Maybe<UserType_Bool_Exp>>>,
  _not?: Maybe<UserType_Bool_Exp>,
  _or?: Maybe<Array<Maybe<UserType_Bool_Exp>>>,
  isDeleted?: Maybe<Boolean_Comparison_Exp>,
  type?: Maybe<String_Comparison_Exp>,
  userTypeID?: Maybe<Int_Comparison_Exp>,
};

export enum UserType_Constraint {
  UserTypePkey = 'UserType_pkey'
}

export type UserType_Inc_Input = {
  userTypeID?: Maybe<Scalars['Int']>,
};

export type UserType_Insert_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  type?: Maybe<Scalars['String']>,
  userTypeID?: Maybe<Scalars['Int']>,
};

export type UserType_Max_Fields = {
   __typename?: 'UserType_max_fields',
  type?: Maybe<Scalars['String']>,
  userTypeID?: Maybe<Scalars['Int']>,
};

export type UserType_Max_Order_By = {
  type?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type UserType_Min_Fields = {
   __typename?: 'UserType_min_fields',
  type?: Maybe<Scalars['String']>,
  userTypeID?: Maybe<Scalars['Int']>,
};

export type UserType_Min_Order_By = {
  type?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export type UserType_Mutation_Response = {
   __typename?: 'UserType_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<UserType>,
};

export type UserType_Obj_Rel_Insert_Input = {
  data: UserType_Insert_Input,
  on_conflict?: Maybe<UserType_On_Conflict>,
};

export type UserType_On_Conflict = {
  constraint: UserType_Constraint,
  update_columns: Array<UserType_Update_Column>,
  where?: Maybe<UserType_Bool_Exp>,
};

export type UserType_Order_By = {
  isDeleted?: Maybe<Order_By>,
  type?: Maybe<Order_By>,
  userTypeID?: Maybe<Order_By>,
};

export enum UserType_Select_Column {
  IsDeleted = 'isDeleted',
  Type = 'type',
  UserTypeId = 'userTypeID'
}

export type UserType_Set_Input = {
  isDeleted?: Maybe<Scalars['Boolean']>,
  type?: Maybe<Scalars['String']>,
  userTypeID?: Maybe<Scalars['Int']>,
};

export type UserType_Stddev_Fields = {
   __typename?: 'UserType_stddev_fields',
  userTypeID?: Maybe<Scalars['Float']>,
};

export type UserType_Stddev_Order_By = {
  userTypeID?: Maybe<Order_By>,
};

export type UserType_Stddev_Pop_Fields = {
   __typename?: 'UserType_stddev_pop_fields',
  userTypeID?: Maybe<Scalars['Float']>,
};

export type UserType_Stddev_Pop_Order_By = {
  userTypeID?: Maybe<Order_By>,
};

export type UserType_Stddev_Samp_Fields = {
   __typename?: 'UserType_stddev_samp_fields',
  userTypeID?: Maybe<Scalars['Float']>,
};

export type UserType_Stddev_Samp_Order_By = {
  userTypeID?: Maybe<Order_By>,
};

export type UserType_Sum_Fields = {
   __typename?: 'UserType_sum_fields',
  userTypeID?: Maybe<Scalars['Int']>,
};

export type UserType_Sum_Order_By = {
  userTypeID?: Maybe<Order_By>,
};

export enum UserType_Update_Column {
  IsDeleted = 'isDeleted',
  Type = 'type',
  UserTypeId = 'userTypeID'
}

export type UserType_Var_Pop_Fields = {
   __typename?: 'UserType_var_pop_fields',
  userTypeID?: Maybe<Scalars['Float']>,
};

export type UserType_Var_Pop_Order_By = {
  userTypeID?: Maybe<Order_By>,
};

export type UserType_Var_Samp_Fields = {
   __typename?: 'UserType_var_samp_fields',
  userTypeID?: Maybe<Scalars['Float']>,
};

export type UserType_Var_Samp_Order_By = {
  userTypeID?: Maybe<Order_By>,
};

export type UserType_Variance_Fields = {
   __typename?: 'UserType_variance_fields',
  userTypeID?: Maybe<Scalars['Float']>,
};

export type UserType_Variance_Order_By = {
  userTypeID?: Maybe<Order_By>,
};

export type ControlUserMutationVariables = {
  controlUser: Array<User_Insert_Input>
};


export type ControlUserMutation = (
  { __typename: 'mutation_root' }
  & { insert_User: Maybe<(
    { __typename?: 'User_mutation_response' }
    & { returning: Array<(
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'userTypeID'>
    )> }
  )> }
);

export type AddCompanyMutationVariables = {
  company: Array<Company_Insert_Input>
};


export type AddCompanyMutation = (
  { __typename: 'mutation_root' }
  & { insert_Company: Maybe<(
    { __typename?: 'Company_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Company' }
      & Pick<Company, 'companyID' | 'locationID'>
    )> }
  )> }
);

export type AddRestaurantMutationVariables = {
  resta: Array<Restaurant_Insert_Input>
};


export type AddRestaurantMutation = (
  { __typename: 'mutation_root' }
  & { insert_Restaurant: Maybe<(
    { __typename?: 'Restaurant_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Restaurant' }
      & Pick<Restaurant, 'restaurantID'>
    )> }
  )> }
);

export type AddFoodTypeMutationVariables = {
  foodType: Array<RestaurantFoodType_Insert_Input>
};


export type AddFoodTypeMutation = (
  { __typename: 'mutation_root' }
  & { insert_RestaurantFoodType: Maybe<(
    { __typename?: 'RestaurantFoodType_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RestaurantFoodType' }
      & Pick<RestaurantFoodType, 'restaurantFoodTypeID'>
    )> }
  )> }
);

export type AddFoodMutationVariables = {
  food: Array<RestaurantFood_Insert_Input>
};


export type AddFoodMutation = (
  { __typename: 'mutation_root' }
  & { insert_RestaurantFood: Maybe<(
    { __typename?: 'RestaurantFood_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RestaurantFood' }
      & Pick<RestaurantFood, 'restaurantFoodID'>
    )> }
  )> }
);

export type AddHotelMutationVariables = {
  hotel: Array<Hotel_Insert_Input>
};


export type AddHotelMutation = (
  { __typename: 'mutation_root' }
  & { insert_Hotel: Maybe<(
    { __typename?: 'Hotel_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Hotel' }
      & Pick<Hotel, 'hotelID'>
    )> }
  )> }
);

export type AddArchSiteTypeMutationVariables = {
  archSiteType: Array<ArchSiteType_Insert_Input>
};


export type AddArchSiteTypeMutation = (
  { __typename: 'mutation_root' }
  & { insert_ArchSiteType: Maybe<(
    { __typename?: 'ArchSiteType_mutation_response' }
    & { returning: Array<(
      { __typename?: 'ArchSiteType' }
      & Pick<ArchSiteType, 'archSiteTypeID'>
    )> }
  )> }
);

export type AddRoomPropertyMutationVariables = {
  RoomProperty: Array<RoomProperty_Insert_Input>
};


export type AddRoomPropertyMutation = (
  { __typename: 'mutation_root' }
  & { insert_RoomProperty: Maybe<(
    { __typename?: 'RoomProperty_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RoomProperty' }
      & Pick<RoomProperty, 'roomPropertyID'>
    )> }
  )> }
);

export type AddRoomMutationVariables = {
  roomNo: Scalars['String'],
  roomPropRoom: Array<RoomPropertyRoom_Insert_Input>,
  hotelID: Scalars['Int']
};


export type AddRoomMutation = (
  { __typename: 'mutation_root' }
  & { insert_Room: Maybe<(
    { __typename?: 'Room_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Room' }
      & Pick<Room, 'roomID'>
    )> }
  )> }
);

export type AddHotelServicePropertyMutationVariables = {
  HotelServiceProperty: Array<HotelServiceProperty_Insert_Input>
};


export type AddHotelServicePropertyMutation = (
  { __typename: 'mutation_root' }
  & { insert_HotelServiceProperty: Maybe<(
    { __typename?: 'HotelServiceProperty_mutation_response' }
    & { returning: Array<(
      { __typename?: 'HotelServiceProperty' }
      & Pick<HotelServiceProperty, 'hotelServicePropertyID'>
    )> }
  )> }
);

export type AddHotelCommentMutationVariables = {
  HotelComment: Array<HotelComment_Insert_Input>
};


export type AddHotelCommentMutation = (
  { __typename: 'mutation_root' }
  & { insert_HotelComment: Maybe<(
    { __typename?: 'HotelComment_mutation_response' }
    & { returning: Array<(
      { __typename?: 'HotelComment' }
      & Pick<HotelComment, 'hotelCommentID'>
    )> }
  )> }
);

export type AddHotelRoomPriceMutationVariables = {
  RoomPrice: Array<RoomPrice_Insert_Input>
};


export type AddHotelRoomPriceMutation = (
  { __typename: 'mutation_root' }
  & { insert_RoomPrice: Maybe<(
    { __typename?: 'RoomPrice_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RoomPrice' }
      & Pick<RoomPrice, 'roomPriceID'>
    )> }
  )> }
);

export type AddArchSiteWorkingScheduleMutationVariables = {
  ArchSiteWorkingSchedule: Array<ArchSiteWorkingSchedule_Insert_Input>
};


export type AddArchSiteWorkingScheduleMutation = (
  { __typename: 'mutation_root' }
  & { insert_ArchSiteWorkingSchedule: Maybe<(
    { __typename?: 'ArchSiteWorkingSchedule_mutation_response' }
    & { returning: Array<(
      { __typename?: 'ArchSiteWorkingSchedule' }
      & Pick<ArchSiteWorkingSchedule, 'archSiteWorkingScheduleID'>
    )> }
  )> }
);

export type AddArchSiteMutationVariables = {
  arch: Array<ArchSite_Insert_Input>
};


export type AddArchSiteMutation = (
  { __typename: 'mutation_root' }
  & { insert_ArchSite: Maybe<(
    { __typename?: 'ArchSite_mutation_response' }
    & { returning: Array<(
      { __typename?: 'ArchSite' }
      & Pick<ArchSite, 'archSiteID'>
    )> }
  )> }
);

export type AddArchSiteCommentMutationVariables = {
  ArchSiteComment: Array<ArchSiteComment_Insert_Input>
};


export type AddArchSiteCommentMutation = (
  { __typename: 'mutation_root' }
  & { insert_ArchSiteComment: Maybe<(
    { __typename?: 'ArchSiteComment_mutation_response' }
    & { returning: Array<(
      { __typename?: 'ArchSiteComment' }
      & Pick<ArchSiteComment, 'archSiteCommentID'>
    )> }
  )> }
);

export type AddArchSiteEntranceTypeMutationVariables = {
  ArchSiteEntranceType: Array<ArchSiteEntranceType_Insert_Input>
};


export type AddArchSiteEntranceTypeMutation = (
  { __typename: 'mutation_root' }
  & { insert_ArchSiteEntranceType: Maybe<(
    { __typename?: 'ArchSiteEntranceType_mutation_response' }
    & { returning: Array<(
      { __typename?: 'ArchSiteEntranceType' }
      & Pick<ArchSiteEntranceType, 'archSiteEntranceTypeID'>
    )> }
  )> }
);

export type AddRestaurantCuisineTypeMutationVariables = {
  RestaurantCuisineType: Array<RestaurantCuisineType_Insert_Input>
};


export type AddRestaurantCuisineTypeMutation = (
  { __typename: 'mutation_root' }
  & { insert_RestaurantCuisineType: Maybe<(
    { __typename?: 'RestaurantCuisineType_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RestaurantCuisineType' }
      & Pick<RestaurantCuisineType, 'restaurantCuisineTypeID'>
    )> }
  )> }
);

export type AddTagMutationVariables = {
  Tag: Array<Tag_Insert_Input>
};


export type AddTagMutation = (
  { __typename: 'mutation_root' }
  & { insert_Tag: Maybe<(
    { __typename?: 'Tag_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'tagID'>
    )> }
  )> }
);

export type AddRestaurantTypeMutationVariables = {
  RestaurantType: Array<RestaurantType_Insert_Input>
};


export type AddRestaurantTypeMutation = (
  { __typename: 'mutation_root' }
  & { insert_RestaurantType: Maybe<(
    { __typename?: 'RestaurantType_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RestaurantType' }
      & Pick<RestaurantType, 'restaurantTypeID'>
    )> }
  )> }
);

export type AddRestaurantCommentMutationVariables = {
  RestaurantComment: Array<RestaurantComment_Insert_Input>
};


export type AddRestaurantCommentMutation = (
  { __typename: 'mutation_root' }
  & { insert_RestaurantComment: Maybe<(
    { __typename?: 'RestaurantComment_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RestaurantComment' }
      & Pick<RestaurantComment, 'restaurantCommentID'>
    )> }
  )> }
);

export type AddMuseumTypeMutationVariables = {
  MuseumType: Array<MuseumType_Insert_Input>
};


export type AddMuseumTypeMutation = (
  { __typename: 'mutation_root' }
  & { insert_MuseumType: Maybe<(
    { __typename?: 'MuseumType_mutation_response' }
    & { returning: Array<(
      { __typename?: 'MuseumType' }
      & Pick<MuseumType, 'museumTypeID'>
    )> }
  )> }
);

export type AddMuseumMutationVariables = {
  museum: Array<Museum_Insert_Input>
};


export type AddMuseumMutation = (
  { __typename: 'mutation_root' }
  & { insert_Museum: Maybe<(
    { __typename?: 'Museum_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Museum' }
      & Pick<Museum, 'museumID'>
    )> }
  )> }
);

export type AddMuseumCommentMutationVariables = {
  MuseumComment: Array<MuseumComment_Insert_Input>
};


export type AddMuseumCommentMutation = (
  { __typename: 'mutation_root' }
  & { insert_MuseumComment: Maybe<(
    { __typename?: 'MuseumComment_mutation_response' }
    & { returning: Array<(
      { __typename?: 'MuseumComment' }
      & Pick<MuseumComment, 'museumCommentID'>
    )> }
  )> }
);

export type AddMuseumEntranceTypeMutationVariables = {
  MuseumEntranceType: Array<MuseumEntranceType_Insert_Input>
};


export type AddMuseumEntranceTypeMutation = (
  { __typename: 'mutation_root' }
  & { insert_MuseumEntranceType: Maybe<(
    { __typename?: 'MuseumEntranceType_mutation_response' }
    & { returning: Array<(
      { __typename?: 'MuseumEntranceType' }
      & Pick<MuseumEntranceType, 'museumEntranceTypeID'>
    )> }
  )> }
);

export type AddMuseumWorkingScheduleMutationVariables = {
  MuseumWorkingSchedule: Array<MuseumWorkingSchedule_Insert_Input>
};


export type AddMuseumWorkingScheduleMutation = (
  { __typename: 'mutation_root' }
  & { insert_MuseumWorkingSchedule: Maybe<(
    { __typename?: 'MuseumWorkingSchedule_mutation_response' }
    & { returning: Array<(
      { __typename?: 'MuseumWorkingSchedule' }
      & Pick<MuseumWorkingSchedule, 'museumWorkingScheduleID'>
    )> }
  )> }
);

export type AddRestaurantWorkingScheduleMutationVariables = {
  RestaurantWorkingSchedule: Array<RestaurantWorkingSchedule_Insert_Input>
};


export type AddRestaurantWorkingScheduleMutation = (
  { __typename: 'mutation_root' }
  & { insert_RestaurantWorkingSchedule: Maybe<(
    { __typename?: 'RestaurantWorkingSchedule_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RestaurantWorkingSchedule' }
      & Pick<RestaurantWorkingSchedule, 'restaurantWorkingScheduleID'>
    )> }
  )> }
);

export type AddArchSitePriceMutationVariables = {
  ArchSitePrice: Array<ArchSitePrice_Insert_Input>
};


export type AddArchSitePriceMutation = (
  { __typename: 'mutation_root' }
  & { insert_ArchSitePrice: Maybe<(
    { __typename?: 'ArchSitePrice_mutation_response' }
    & { returning: Array<(
      { __typename?: 'ArchSitePrice' }
      & Pick<ArchSitePrice, 'archSitePriceID'>
    )> }
  )> }
);

export type AddMuseumPriceMutationVariables = {
  MuseumPrice: Array<MuseumPrice_Insert_Input>
};


export type AddMuseumPriceMutation = (
  { __typename: 'mutation_root' }
  & { insert_MuseumPrice: Maybe<(
    { __typename?: 'MuseumPrice_mutation_response' }
    & { returning: Array<(
      { __typename?: 'MuseumPrice' }
      & Pick<MuseumPrice, 'museumPriceID'>
    )> }
  )> }
);

export type AddTravelGuideMutationVariables = {
  travelGuide: Array<TravelGuide_Insert_Input>
};


export type AddTravelGuideMutation = (
  { __typename: 'mutation_root' }
  & { insert_TravelGuide: Maybe<(
    { __typename?: 'TravelGuide_mutation_response' }
    & { returning: Array<(
      { __typename?: 'TravelGuide' }
      & Pick<TravelGuide, 'travelGuideID'>
    )> }
  )> }
);

export type AddRestaurantMenuMutationVariables = {
  restaurantMenu: Array<RestaurantMenu_Insert_Input>
};


export type AddRestaurantMenuMutation = (
  { __typename: 'mutation_root' }
  & { insert_RestaurantMenu: Maybe<(
    { __typename?: 'RestaurantMenu_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RestaurantMenu' }
      & Pick<RestaurantMenu, 'restaurantMenuID'>
    )> }
  )> }
);

export type AddArticleMutationVariables = {
  addArticle: Array<Article_Insert_Input>
};


export type AddArticleMutation = (
  { __typename: 'mutation_root' }
  & { insert_Article: Maybe<(
    { __typename?: 'Article_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Article' }
      & Pick<Article, 'articleID'>
    )> }
  )> }
);

export type ControlLoginMailUserMutationVariables = {
  loginDate?: Maybe<Scalars['timestamptz']>,
  loginTypeID?: Maybe<Scalars['Int']>,
  loginIP?: Maybe<Scalars['inet']>,
  mail: Scalars['String'],
  password: Scalars['String']
};


export type ControlLoginMailUserMutation = (
  { __typename: 'mutation_root' }
  & { update_User: Maybe<(
    { __typename?: 'User_mutation_response' }
    & { returning: Array<(
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'userTypeID'>
    )> }
  )> }
);

export type UpdateHotelMutationVariables = {
  hotelID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  addressID?: Maybe<Scalars['Int']>,
  hotel: Hotel_Set_Input,
  hotelLocation: Location_Set_Input,
  hotelAddress: Address_Set_Input
};


export type UpdateHotelMutation = (
  { __typename: 'mutation_root' }
  & { update_Hotel: Maybe<(
    { __typename?: 'Hotel_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Hotel' }
      & Pick<Hotel, 'hotelID'>
    )> }
  )>, update_Location: Maybe<(
    { __typename?: 'Location_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Location' }
      & Pick<Location, 'locationID'>
    )> }
  )>, update_Address: Maybe<(
    { __typename?: 'Address_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'addressID'>
    )> }
  )> }
);

export type UpdateArticleMutationVariables = {
  articleID?: Maybe<Scalars['Int']>,
  article: Article_Set_Input
};


export type UpdateArticleMutation = (
  { __typename: 'mutation_root' }
  & { update_Article: Maybe<(
    { __typename?: 'Article_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Article' }
      & Pick<Article, 'articleID'>
    )> }
  )> }
);

export type UpdateMuseumMutationVariables = {
  museumID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  addressID?: Maybe<Scalars['Int']>,
  museum: Museum_Set_Input,
  museumLocation: Location_Set_Input,
  museumAddress: Address_Set_Input
};


export type UpdateMuseumMutation = (
  { __typename: 'mutation_root' }
  & { update_Museum: Maybe<(
    { __typename?: 'Museum_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Museum' }
      & Pick<Museum, 'museumID'>
    )> }
  )>, update_Location: Maybe<(
    { __typename?: 'Location_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Location' }
      & Pick<Location, 'locationID'>
    )> }
  )>, update_Address: Maybe<(
    { __typename?: 'Address_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'addressID'>
    )> }
  )> }
);

export type UpdateArchSiteMutationVariables = {
  archSiteID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  addressID?: Maybe<Scalars['Int']>,
  archSite: ArchSite_Set_Input,
  archSiteLocation: Location_Set_Input,
  archSiteAddress: Address_Set_Input
};


export type UpdateArchSiteMutation = (
  { __typename: 'mutation_root' }
  & { update_ArchSite: Maybe<(
    { __typename?: 'ArchSite_mutation_response' }
    & { returning: Array<(
      { __typename?: 'ArchSite' }
      & Pick<ArchSite, 'archSiteID'>
    )> }
  )>, update_Location: Maybe<(
    { __typename?: 'Location_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Location' }
      & Pick<Location, 'locationID'>
    )> }
  )>, update_Address: Maybe<(
    { __typename?: 'Address_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'addressID'>
    )> }
  )> }
);

export type UpdateRestaurantMutationVariables = {
  restaurantID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  addressID?: Maybe<Scalars['Int']>,
  restaurant: Restaurant_Set_Input,
  restaurantLocation: Location_Set_Input,
  restaurantAddress: Address_Set_Input
};


export type UpdateRestaurantMutation = (
  { __typename: 'mutation_root' }
  & { update_Restaurant: Maybe<(
    { __typename?: 'Restaurant_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Restaurant' }
      & Pick<Restaurant, 'restaurantID'>
    )> }
  )>, update_Location: Maybe<(
    { __typename?: 'Location_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Location' }
      & Pick<Location, 'locationID'>
    )> }
  )>, update_Address: Maybe<(
    { __typename?: 'Address_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'addressID'>
    )> }
  )> }
);

export type DeleteHotelMutationVariables = {
  hotelID?: Maybe<Scalars['Int']>
};


export type DeleteHotelMutation = (
  { __typename: 'mutation_root' }
  & { update_Hotel: Maybe<(
    { __typename?: 'Hotel_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Hotel' }
      & Pick<Hotel, 'hotelID'>
    )> }
  )> }
);

export type DeleteArticleMutationVariables = {
  articleID?: Maybe<Scalars['Int']>
};


export type DeleteArticleMutation = (
  { __typename: 'mutation_root' }
  & { update_Article: Maybe<(
    { __typename?: 'Article_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Article' }
      & Pick<Article, 'articleID'>
    )> }
  )> }
);

export type DeleteMuseumMutationVariables = {
  museumID?: Maybe<Scalars['Int']>
};


export type DeleteMuseumMutation = (
  { __typename: 'mutation_root' }
  & { update_Museum: Maybe<(
    { __typename?: 'Museum_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Museum' }
      & Pick<Museum, 'museumID'>
    )> }
  )> }
);

export type DeleteArchSiteMutationVariables = {
  archSiteID?: Maybe<Scalars['Int']>
};


export type DeleteArchSiteMutation = (
  { __typename: 'mutation_root' }
  & { update_ArchSite: Maybe<(
    { __typename?: 'ArchSite_mutation_response' }
    & { returning: Array<(
      { __typename?: 'ArchSite' }
      & Pick<ArchSite, 'archSiteID'>
    )> }
  )> }
);

export type DeleteRestaurantMutationVariables = {
  restaurantID?: Maybe<Scalars['Int']>
};


export type DeleteRestaurantMutation = (
  { __typename: 'mutation_root' }
  & { update_Restaurant: Maybe<(
    { __typename?: 'Restaurant_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Restaurant' }
      & Pick<Restaurant, 'restaurantID'>
    )> }
  )> }
);

export type DeleteCompanyMutationVariables = {
  companyID?: Maybe<Scalars['Int']>
};


export type DeleteCompanyMutation = (
  { __typename: 'mutation_root' }
  & { update_Company: Maybe<(
    { __typename?: 'Company_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Company' }
      & Pick<Company, 'companyID'>
    )> }
  )> }
);

export type UpdateCompanyMutationVariables = {
  companyID?: Maybe<Scalars['Int']>,
  locationID?: Maybe<Scalars['Int']>,
  addressID?: Maybe<Scalars['Int']>,
  company: Company_Set_Input,
  companyLocation: Location_Set_Input,
  companyAddress: Address_Set_Input
};


export type UpdateCompanyMutation = (
  { __typename: 'mutation_root' }
  & { update_Company: Maybe<(
    { __typename?: 'Company_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Company' }
      & Pick<Company, 'companyID'>
    )> }
  )>, update_Location: Maybe<(
    { __typename?: 'Location_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Location' }
      & Pick<Location, 'locationID'>
    )> }
  )>, update_Address: Maybe<(
    { __typename?: 'Address_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'addressID'>
    )> }
  )> }
);

export type DeleteTravelGuideMutationVariables = {
  travelGuideID?: Maybe<Scalars['Int']>
};


export type DeleteTravelGuideMutation = (
  { __typename: 'mutation_root' }
  & { update_TravelGuide: Maybe<(
    { __typename?: 'TravelGuide_mutation_response' }
    & { returning: Array<(
      { __typename?: 'TravelGuide' }
      & Pick<TravelGuide, 'travelGuideID'>
    )> }
  )> }
);

export type GetTravelGuideByIdQueryVariables = {
  travelGuideID?: Maybe<Scalars['Int']>
};


export type GetTravelGuideByIdQuery = (
  { __typename: 'query_root' }
  & { TravelGuide: Array<(
    { __typename?: 'TravelGuide' }
    & Pick<TravelGuide, 'title' | 'cost'>
    & { TravelGuideArchSites: Array<(
      { __typename?: 'TravelGuideArchSite' }
      & { ArchSite: (
        { __typename?: 'ArchSite' }
        & Pick<ArchSite, 'name'>
      ) }
    )>, TravelGuideHotels: Array<(
      { __typename?: 'TravelGuideHotel' }
      & { Hotel: (
        { __typename?: 'Hotel' }
        & Pick<Hotel, 'name'>
      ) }
    )>, TravelGuideLocations: Array<(
      { __typename?: 'TravelGuideLocation' }
      & { Location: (
        { __typename?: 'Location' }
        & Pick<Location, 'latitude' | 'longtitude'>
      ) }
    )>, TravelGuideMuseums: Array<(
      { __typename?: 'TravelGuideMuseum' }
      & { Museum: (
        { __typename?: 'Museum' }
        & Pick<Museum, 'name'>
      ) }
    )>, TravelGuideRestaurants: Array<(
      { __typename?: 'TravelGuideRestaurant' }
      & { Restaurant: (
        { __typename?: 'Restaurant' }
        & Pick<Restaurant, 'name'>
      ) }
    )> }
  )> }
);

export type GetFoodTypesQueryVariables = {};


export type GetFoodTypesQuery = (
  { __typename: 'query_root' }
  & { RestaurantFoodType: Array<(
    { __typename?: 'RestaurantFoodType' }
    & Pick<RestaurantFoodType, 'type' | 'restaurantFoodTypeID'>
  )> }
);

export type GetRestaurantTypesQueryVariables = {};


export type GetRestaurantTypesQuery = (
  { __typename: 'query_root' }
  & { RestaurantType: Array<(
    { __typename?: 'RestaurantType' }
    & Pick<RestaurantType, 'type' | 'restaurantTypeID'>
  )> }
);

export type GetUserCompanyQueryVariables = {
  userID?: Maybe<Scalars['Int']>
};


export type GetUserCompanyQuery = (
  { __typename: 'query_root' }
  & { Company: Array<(
    { __typename?: 'Company' }
    & Pick<Company, 'companyID' | 'name' | 'description' | 'faxNumber' | 'taxNumber' | 'mail' | 'registerDate'>
  )> }
);

export type GetRoomPropertyQueryVariables = {};


export type GetRoomPropertyQuery = (
  { __typename?: 'query_root' }
  & { RoomProperty: Array<(
    { __typename?: 'RoomProperty' }
    & Pick<RoomProperty, 'content' | 'roomPropertyID'>
  )> }
);

export type GetUserHotelQueryVariables = {
  userID: Scalars['Int']
};


export type GetUserHotelQuery = (
  { __typename?: 'query_root' }
  & { Hotel: Array<(
    { __typename?: 'Hotel' }
    & Pick<Hotel, 'hotelID' | 'name' | 'description' | 'star'>
    & { Company: (
      { __typename?: 'Company' }
      & Pick<Company, 'name'>
    ) }
  )> }
);

export type GetUserArticleQueryVariables = {
  userID?: Maybe<Scalars['Int']>
};


export type GetUserArticleQuery = (
  { __typename: 'query_root' }
  & { Article: Array<(
    { __typename?: 'Article' }
    & Pick<Article, 'articleID' | 'content' | 'title'>
  )> }
);

export type GetHotelServicePropertyQueryVariables = {};


export type GetHotelServicePropertyQuery = (
  { __typename: 'query_root' }
  & { HotelServiceProperty: Array<(
    { __typename?: 'HotelServiceProperty' }
    & Pick<HotelServiceProperty, 'content' | 'hotelServicePropertyID'>
  )> }
);

export type GetHotelRoomQueryVariables = {
  hotelID: Scalars['Int']
};


export type GetHotelRoomQuery = (
  { __typename: 'query_root' }
  & { HotelRoom: Array<(
    { __typename?: 'HotelRoom' }
    & Pick<HotelRoom, 'roomID'>
    & { Room: (
      { __typename?: 'Room' }
      & Pick<Room, 'roomNo'>
    ) }
  )> }
);

export type GetArchSiteTypesQueryVariables = {};


export type GetArchSiteTypesQuery = (
  { __typename: 'query_root' }
  & { ArchSiteType: Array<(
    { __typename?: 'ArchSiteType' }
    & Pick<ArchSiteType, 'name' | 'archSiteTypeID'>
  )> }
);

export type GetCuisineTypesQueryVariables = {};


export type GetCuisineTypesQuery = (
  { __typename: 'query_root' }
  & { RestaurantCuisineType: Array<(
    { __typename?: 'RestaurantCuisineType' }
    & Pick<RestaurantCuisineType, 'name' | 'restaurantCuisineTypeID'>
  )> }
);

export type GetMuseumTypesQueryVariables = {};


export type GetMuseumTypesQuery = (
  { __typename: 'query_root' }
  & { MuseumType: Array<(
    { __typename?: 'MuseumType' }
    & Pick<MuseumType, 'museumTypeID' | 'type'>
  )> }
);

export type GetHotelLocationQueryVariables = {};


export type GetHotelLocationQuery = (
  { __typename?: 'query_root' }
  & { Hotel: Array<(
    { __typename?: 'Hotel' }
    & Pick<Hotel, 'name' | 'locationID' | 'hotelID'>
    & { Location: (
      { __typename?: 'Location' }
      & Pick<Location, 'latitude' | 'longtitude'>
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'address'>
      )> }
    ) }
  )> }
);

export type GetArchSiteLocationQueryVariables = {
  cityID: Scalars['Int'],
  archSiteEntranceTypeID?: Maybe<Scalars['Int']>,
  priceDate?: Maybe<Scalars['timestamptz']>,
  archSiteTypeIDs?: Maybe<Array<Scalars['Int']>>
};


export type GetArchSiteLocationQuery = (
  { __typename?: 'query_root' }
  & { ArchSite: Array<(
    { __typename?: 'ArchSite' }
    & Pick<ArchSite, 'name' | 'locationID' | 'archSiteID' | 'age' | 'diameter'>
    & { Location: (
      { __typename?: 'Location' }
      & Pick<Location, 'latitude' | 'longtitude'>
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'address'>
      )> }
    ), ArchSitePrices: Array<(
      { __typename?: 'ArchSitePrice' }
      & Pick<ArchSitePrice, 'price' | 'finishDate' | 'archSiteEntranceTypeID'>
    )>, ArchSiteTypeArchSites: Array<(
      { __typename?: 'ArchSiteTypeArchSite' }
      & Pick<ArchSiteTypeArchSite, 'archSiteTypeID'>
    )> }
  )> }
);

export type GetMuseumLocationQueryVariables = {
  cityID: Scalars['Int'],
  museumEntranceTypeID?: Maybe<Scalars['Int']>,
  priceDate?: Maybe<Scalars['timestamptz']>,
  museumTypeIDs?: Maybe<Array<Scalars['Int']>>
};


export type GetMuseumLocationQuery = (
  { __typename?: 'query_root' }
  & { Museum: Array<(
    { __typename?: 'Museum' }
    & Pick<Museum, 'name' | 'locationID' | 'museumID'>
    & { Location: (
      { __typename?: 'Location' }
      & Pick<Location, 'latitude' | 'longtitude'>
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'address'>
      )> }
    ), MuseumPrices: Array<(
      { __typename?: 'MuseumPrice' }
      & Pick<MuseumPrice, 'price' | 'finishDate' | 'entranceTypeID'>
    )> }
  )> }
);

export type GetRestaurantLocationQueryVariables = {};


export type GetRestaurantLocationQuery = (
  { __typename?: 'query_root' }
  & { Restaurant: Array<(
    { __typename?: 'Restaurant' }
    & Pick<Restaurant, 'name' | 'locationID' | 'restaurantID'>
    & { Location: (
      { __typename?: 'Location' }
      & Pick<Location, 'latitude' | 'longtitude'>
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'address'>
      )> }
    ) }
  )> }
);

export type GetDayQueryVariables = {};


export type GetDayQuery = (
  { __typename: 'query_root' }
  & { Day: Array<(
    { __typename?: 'Day' }
    & Pick<Day, 'dayID' | 'name'>
  )> }
);

export type GetUserArchSiteQueryVariables = {
  userID?: Maybe<Scalars['Int']>
};


export type GetUserArchSiteQuery = (
  { __typename: 'query_root' }
  & { ArchSite: Array<(
    { __typename?: 'ArchSite' }
    & Pick<ArchSite, 'description' | 'name' | 'archSiteID'>
    & { Company: (
      { __typename?: 'Company' }
      & Pick<Company, 'name'>
    ) }
  )> }
);

export type GetUserMuseumQueryVariables = {
  userID?: Maybe<Scalars['Int']>
};


export type GetUserMuseumQuery = (
  { __typename: 'query_root' }
  & { Museum: Array<(
    { __typename?: 'Museum' }
    & Pick<Museum, 'description' | 'name' | 'museumID'>
    & { Company: (
      { __typename?: 'Company' }
      & Pick<Company, 'name'>
    ) }
  )> }
);

export type GetUserRestaurantQueryVariables = {
  userID?: Maybe<Scalars['Int']>
};


export type GetUserRestaurantQuery = (
  { __typename: 'query_root' }
  & { Restaurant: Array<(
    { __typename?: 'Restaurant' }
    & Pick<Restaurant, 'restaurantID' | 'name' | 'star'>
    & { Company: (
      { __typename?: 'Company' }
      & Pick<Company, 'name'>
    ) }
  )> }
);

export type GetArchSiteEntranceTypesQueryVariables = {};


export type GetArchSiteEntranceTypesQuery = (
  { __typename: 'query_root' }
  & { ArchSiteEntranceType: Array<(
    { __typename?: 'ArchSiteEntranceType' }
    & Pick<ArchSiteEntranceType, 'archSiteEntranceTypeID' | 'content'>
  )> }
);

export type GetMuseumEntranceTypesQueryVariables = {};


export type GetMuseumEntranceTypesQuery = (
  { __typename: 'query_root' }
  & { MuseumEntranceType: Array<(
    { __typename?: 'MuseumEntranceType' }
    & Pick<MuseumEntranceType, 'content' | 'museumEntranceTypeID'>
  )> }
);

export type GetFoodQueryVariables = {};


export type GetFoodQuery = (
  { __typename: 'query_root' }
  & { RestaurantFood: Array<(
    { __typename?: 'RestaurantFood' }
    & Pick<RestaurantFood, 'name' | 'restaurantFoodID'>
  )> }
);

export type GetTagsQueryVariables = {};


export type GetTagsQuery = (
  { __typename: 'query_root' }
  & { Tag: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'name' | 'tagID'>
  )> }
);

export type GetCitiesQueryVariables = {};


export type GetCitiesQuery = (
  { __typename: 'query_root' }
  & { City: Array<(
    { __typename?: 'City' }
    & Pick<City, 'cityID' | 'city'>
  )> }
);

export type GetCityDistrictsQueryVariables = {
  cityID: Scalars['Int']
};


export type GetCityDistrictsQuery = (
  { __typename: 'query_root' }
  & { District: Array<(
    { __typename?: 'District' }
    & Pick<District, 'district' | 'districtID'>
  )> }
);

export type GetHotelListInfoQueryVariables = {};


export type GetHotelListInfoQuery = (
  { __typename: 'query_root' }
  & { Hotel: Array<(
    { __typename?: 'Hotel' }
    & Pick<Hotel, 'description' | 'name' | 'star'>
    & { Company: (
      { __typename?: 'Company' }
      & Pick<Company, 'name'>
    ) }
  )> }
);

export type GetHotelByIdQueryVariables = {
  hotelID?: Maybe<Scalars['Int']>
};


export type GetHotelByIdQuery = (
  { __typename: 'query_root' }
  & { Hotel: Array<(
    { __typename?: 'Hotel' }
    & Pick<Hotel, 'description' | 'name' | 'star' | 'taxNumber' | 'locationID' | 'companyID'>
    & { Location: (
      { __typename?: 'Location' }
      & Pick<Location, 'addressID' | 'latitude' | 'longtitude'>
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'address' | 'cityID' | 'districtID'>
        & { City: (
          { __typename?: 'City' }
          & Pick<City, 'city'>
        ), District: (
          { __typename?: 'District' }
          & Pick<District, 'district'>
        ) }
      )> }
    ), Company: (
      { __typename?: 'Company' }
      & { CompanyPhones: Array<(
        { __typename?: 'CompanyPhone' }
        & { Phone: (
          { __typename?: 'Phone' }
          & Pick<Phone, 'phone'>
        ) }
      )> }
    ) }
  )> }
);

export type GetArticleByIdQueryVariables = {
  articleID?: Maybe<Scalars['Int']>
};


export type GetArticleByIdQuery = (
  { __typename: 'query_root' }
  & { Article: Array<(
    { __typename?: 'Article' }
    & Pick<Article, 'articleID' | 'content' | 'title'>
  )> }
);

export type GetMuseumByIdQueryVariables = {
  museumID?: Maybe<Scalars['Int']>
};


export type GetMuseumByIdQuery = (
  { __typename: 'query_root' }
  & { Museum: Array<(
    { __typename?: 'Museum' }
    & Pick<Museum, 'description' | 'name' | 'locationID' | 'companyID'>
    & { Location: (
      { __typename?: 'Location' }
      & Pick<Location, 'addressID' | 'latitude' | 'longtitude'>
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'address' | 'cityID' | 'districtID'>
      )> }
    ) }
  )> }
);

export type GetArchSiteByIdQueryVariables = {
  archSiteID?: Maybe<Scalars['Int']>
};


export type GetArchSiteByIdQuery = (
  { __typename: 'query_root' }
  & { ArchSite: Array<(
    { __typename?: 'ArchSite' }
    & Pick<ArchSite, 'description' | 'name' | 'locationID' | 'companyID' | 'age' | 'altitude' | 'destruction' | 'diameter' | 'period'>
    & { Location: (
      { __typename?: 'Location' }
      & Pick<Location, 'addressID' | 'latitude' | 'longtitude'>
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'address' | 'cityID' | 'districtID'>
      )> }
    ) }
  )> }
);

export type GetCompanyByIdQueryVariables = {
  companyID?: Maybe<Scalars['Int']>
};


export type GetCompanyByIdQuery = (
  { __typename: 'query_root' }
  & { Company: Array<(
    { __typename?: 'Company' }
    & Pick<Company, 'name' | 'taxNumber' | 'mail' | 'registerDate' | 'logoUrl' | 'description' | 'locationID' | 'companyID'>
    & { Location: (
      { __typename?: 'Location' }
      & Pick<Location, 'addressID' | 'latitude' | 'longtitude'>
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'address' | 'cityID' | 'districtID'>
      )> }
    ) }
  )> }
);

export type GetArticleListQueryVariables = {};


export type GetArticleListQuery = (
  { __typename: 'query_root' }
  & { Article: Array<(
    { __typename?: 'Article' }
    & Pick<Article, 'articleID' | 'content' | 'publishDate' | 'title' | 'imageUrl'>
  )> }
);

export type GetHotelByCityQueryVariables = {
  cityID?: Maybe<Scalars['Int']>
};


export type GetHotelByCityQuery = (
  { __typename: 'query_root' }
  & { Hotel: Array<(
    { __typename?: 'Hotel' }
    & Pick<Hotel, 'description' | 'name' | 'star' | 'companyID' | 'hotelID'>
    & { Location: (
      { __typename?: 'Location' }
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & { City: (
          { __typename?: 'City' }
          & Pick<City, 'city'>
        ), District: (
          { __typename?: 'District' }
          & Pick<District, 'district'>
        ) }
      )> }
    ) }
  )> }
);

export type GetHotelServicesQueryVariables = {
  hotelID?: Maybe<Scalars['Int']>
};


export type GetHotelServicesQuery = (
  { __typename: 'query_root' }
  & { HotelService: Array<(
    { __typename?: 'HotelService' }
    & { HotelServiceProperty: (
      { __typename?: 'HotelServiceProperty' }
      & Pick<HotelServiceProperty, 'content'>
    ) }
  )> }
);

export type GetHotelRoomsQueryVariables = {
  hotelID?: Maybe<Scalars['Int']>
};


export type GetHotelRoomsQuery = (
  { __typename: 'query_root' }
  & { HotelRoom: Array<(
    { __typename?: 'HotelRoom' }
    & { Room: (
      { __typename?: 'Room' }
      & Pick<Room, 'roomNo' | 'roomID'>
      & { RoomPrices: Array<(
        { __typename?: 'RoomPrice' }
        & Pick<RoomPrice, 'price'>
      )>, RoomPropertyRooms: Array<(
        { __typename?: 'RoomPropertyRoom' }
        & { RoomProperty: (
          { __typename?: 'RoomProperty' }
          & Pick<RoomProperty, 'content'>
        ) }
      )> }
    ) }
  )> }
);

export type GetRestaurantByCityQueryVariables = {
  cityID?: Maybe<Scalars['Int']>
};


export type GetRestaurantByCityQuery = (
  { __typename: 'query_root' }
  & { Restaurant: Array<(
    { __typename?: 'Restaurant' }
    & Pick<Restaurant, 'name' | 'star' | 'companyID' | 'restaurantID'>
    & { Location: (
      { __typename?: 'Location' }
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & { City: (
          { __typename?: 'City' }
          & Pick<City, 'city'>
        ), District: (
          { __typename?: 'District' }
          & Pick<District, 'district'>
        ) }
      )> }
    ), RestaurantType: (
      { __typename?: 'RestaurantType' }
      & Pick<RestaurantType, 'type'>
    ) }
  )> }
);

export type GetRestaurantByIdQueryVariables = {
  restaurantID?: Maybe<Scalars['Int']>
};


export type GetRestaurantByIdQuery = (
  { __typename: 'query_root' }
  & { Restaurant: Array<(
    { __typename?: 'Restaurant' }
    & Pick<Restaurant, 'name' | 'star' | 'taxNumber' | 'locationID' | 'companyID'>
    & { Location: (
      { __typename?: 'Location' }
      & Pick<Location, 'addressID' | 'latitude' | 'longtitude'>
      & { Address: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'address' | 'cityID' | 'districtID'>
        & { City: (
          { __typename?: 'City' }
          & Pick<City, 'city'>
        ), District: (
          { __typename?: 'District' }
          & Pick<District, 'district'>
        ) }
      )> }
    ), Company: (
      { __typename?: 'Company' }
      & { CompanyPhones: Array<(
        { __typename?: 'CompanyPhone' }
        & { Phone: (
          { __typename?: 'Phone' }
          & Pick<Phone, 'phone'>
        ) }
      )> }
    ) }
  )> }
);

export type GetRestaurantMenuByResIdQueryVariables = {
  restaurantID?: Maybe<Scalars['Int']>
};


export type GetRestaurantMenuByResIdQuery = (
  { __typename: 'query_root' }
  & { RestaurantMenu: Array<(
    { __typename?: 'RestaurantMenu' }
    & Pick<RestaurantMenu, 'name' | 'price' | 'restaurantMenuID'>
    & { RestaurantMenuFoods: Array<(
      { __typename?: 'RestaurantMenuFood' }
      & { RestaurantFood: (
        { __typename?: 'RestaurantFood' }
        & Pick<RestaurantFood, 'name'>
      ) }
    )> }
  )> }
);

export type GetUserTravelGuideQueryVariables = {
  userID: Scalars['Int']
};


export type GetUserTravelGuideQuery = (
  { __typename?: 'query_root' }
  & { TravelGuide: Array<(
    { __typename?: 'TravelGuide' }
    & Pick<TravelGuide, 'title' | 'travelGuideID' | 'cost' | 'creationDate'>
  )> }
);


export const ControlUserDocument = gql`
    mutation controlUser($controlUser: [User_insert_input!]!) {
  __typename
  insert_User(objects: $controlUser, on_conflict: {constraint: User_mail_key, update_columns: loginDate, where: {}}) {
    returning {
      userID
      userTypeID
    }
  }
}
    `;
export type ControlUserMutationFn = ApolloReactCommon.MutationFunction<ControlUserMutation, ControlUserMutationVariables>;
export type ControlUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ControlUserMutation, ControlUserMutationVariables>, 'mutation'>;

    export const ControlUserComponent = (props: ControlUserComponentProps) => (
      <ApolloReactComponents.Mutation<ControlUserMutation, ControlUserMutationVariables> mutation={ControlUserDocument} {...props} />
    );
    
export type ControlUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ControlUserMutation, ControlUserMutationVariables> & TChildProps;
export function withControlUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ControlUserMutation,
  ControlUserMutationVariables,
  ControlUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ControlUserMutation, ControlUserMutationVariables, ControlUserProps<TChildProps>>(ControlUserDocument, {
      alias: 'controlUser',
      ...operationOptions
    });
};
export type ControlUserMutationResult = ApolloReactCommon.MutationResult<ControlUserMutation>;
export type ControlUserMutationOptions = ApolloReactCommon.BaseMutationOptions<ControlUserMutation, ControlUserMutationVariables>;
export const AddCompanyDocument = gql`
    mutation addCompany($company: [Company_insert_input!]!) {
  __typename
  insert_Company(objects: $company) {
    returning {
      companyID
      locationID
    }
  }
}
    `;
export type AddCompanyMutationFn = ApolloReactCommon.MutationFunction<AddCompanyMutation, AddCompanyMutationVariables>;
export type AddCompanyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddCompanyMutation, AddCompanyMutationVariables>, 'mutation'>;

    export const AddCompanyComponent = (props: AddCompanyComponentProps) => (
      <ApolloReactComponents.Mutation<AddCompanyMutation, AddCompanyMutationVariables> mutation={AddCompanyDocument} {...props} />
    );
    
export type AddCompanyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddCompanyMutation, AddCompanyMutationVariables> & TChildProps;
export function withAddCompany<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddCompanyMutation,
  AddCompanyMutationVariables,
  AddCompanyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddCompanyMutation, AddCompanyMutationVariables, AddCompanyProps<TChildProps>>(AddCompanyDocument, {
      alias: 'addCompany',
      ...operationOptions
    });
};
export type AddCompanyMutationResult = ApolloReactCommon.MutationResult<AddCompanyMutation>;
export type AddCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCompanyMutation, AddCompanyMutationVariables>;
export const AddRestaurantDocument = gql`
    mutation addRestaurant($resta: [Restaurant_insert_input!]!) {
  __typename
  insert_Restaurant(objects: $resta) {
    returning {
      restaurantID
    }
  }
}
    `;
export type AddRestaurantMutationFn = ApolloReactCommon.MutationFunction<AddRestaurantMutation, AddRestaurantMutationVariables>;
export type AddRestaurantComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddRestaurantMutation, AddRestaurantMutationVariables>, 'mutation'>;

    export const AddRestaurantComponent = (props: AddRestaurantComponentProps) => (
      <ApolloReactComponents.Mutation<AddRestaurantMutation, AddRestaurantMutationVariables> mutation={AddRestaurantDocument} {...props} />
    );
    
export type AddRestaurantProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddRestaurantMutation, AddRestaurantMutationVariables> & TChildProps;
export function withAddRestaurant<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddRestaurantMutation,
  AddRestaurantMutationVariables,
  AddRestaurantProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddRestaurantMutation, AddRestaurantMutationVariables, AddRestaurantProps<TChildProps>>(AddRestaurantDocument, {
      alias: 'addRestaurant',
      ...operationOptions
    });
};
export type AddRestaurantMutationResult = ApolloReactCommon.MutationResult<AddRestaurantMutation>;
export type AddRestaurantMutationOptions = ApolloReactCommon.BaseMutationOptions<AddRestaurantMutation, AddRestaurantMutationVariables>;
export const AddFoodTypeDocument = gql`
    mutation addFoodType($foodType: [RestaurantFoodType_insert_input!]!) {
  __typename
  insert_RestaurantFoodType(objects: $foodType) {
    returning {
      restaurantFoodTypeID
    }
  }
}
    `;
export type AddFoodTypeMutationFn = ApolloReactCommon.MutationFunction<AddFoodTypeMutation, AddFoodTypeMutationVariables>;
export type AddFoodTypeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddFoodTypeMutation, AddFoodTypeMutationVariables>, 'mutation'>;

    export const AddFoodTypeComponent = (props: AddFoodTypeComponentProps) => (
      <ApolloReactComponents.Mutation<AddFoodTypeMutation, AddFoodTypeMutationVariables> mutation={AddFoodTypeDocument} {...props} />
    );
    
export type AddFoodTypeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddFoodTypeMutation, AddFoodTypeMutationVariables> & TChildProps;
export function withAddFoodType<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddFoodTypeMutation,
  AddFoodTypeMutationVariables,
  AddFoodTypeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddFoodTypeMutation, AddFoodTypeMutationVariables, AddFoodTypeProps<TChildProps>>(AddFoodTypeDocument, {
      alias: 'addFoodType',
      ...operationOptions
    });
};
export type AddFoodTypeMutationResult = ApolloReactCommon.MutationResult<AddFoodTypeMutation>;
export type AddFoodTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<AddFoodTypeMutation, AddFoodTypeMutationVariables>;
export const AddFoodDocument = gql`
    mutation addFood($food: [RestaurantFood_insert_input!]!) {
  __typename
  insert_RestaurantFood(objects: $food) {
    returning {
      restaurantFoodID
    }
  }
}
    `;
export type AddFoodMutationFn = ApolloReactCommon.MutationFunction<AddFoodMutation, AddFoodMutationVariables>;
export type AddFoodComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddFoodMutation, AddFoodMutationVariables>, 'mutation'>;

    export const AddFoodComponent = (props: AddFoodComponentProps) => (
      <ApolloReactComponents.Mutation<AddFoodMutation, AddFoodMutationVariables> mutation={AddFoodDocument} {...props} />
    );
    
export type AddFoodProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddFoodMutation, AddFoodMutationVariables> & TChildProps;
export function withAddFood<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddFoodMutation,
  AddFoodMutationVariables,
  AddFoodProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddFoodMutation, AddFoodMutationVariables, AddFoodProps<TChildProps>>(AddFoodDocument, {
      alias: 'addFood',
      ...operationOptions
    });
};
export type AddFoodMutationResult = ApolloReactCommon.MutationResult<AddFoodMutation>;
export type AddFoodMutationOptions = ApolloReactCommon.BaseMutationOptions<AddFoodMutation, AddFoodMutationVariables>;
export const AddHotelDocument = gql`
    mutation addHotel($hotel: [Hotel_insert_input!]!) {
  __typename
  insert_Hotel(objects: $hotel) {
    returning {
      hotelID
    }
  }
}
    `;
export type AddHotelMutationFn = ApolloReactCommon.MutationFunction<AddHotelMutation, AddHotelMutationVariables>;
export type AddHotelComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddHotelMutation, AddHotelMutationVariables>, 'mutation'>;

    export const AddHotelComponent = (props: AddHotelComponentProps) => (
      <ApolloReactComponents.Mutation<AddHotelMutation, AddHotelMutationVariables> mutation={AddHotelDocument} {...props} />
    );
    
export type AddHotelProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddHotelMutation, AddHotelMutationVariables> & TChildProps;
export function withAddHotel<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddHotelMutation,
  AddHotelMutationVariables,
  AddHotelProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddHotelMutation, AddHotelMutationVariables, AddHotelProps<TChildProps>>(AddHotelDocument, {
      alias: 'addHotel',
      ...operationOptions
    });
};
export type AddHotelMutationResult = ApolloReactCommon.MutationResult<AddHotelMutation>;
export type AddHotelMutationOptions = ApolloReactCommon.BaseMutationOptions<AddHotelMutation, AddHotelMutationVariables>;
export const AddArchSiteTypeDocument = gql`
    mutation addArchSiteType($archSiteType: [ArchSiteType_insert_input!]!) {
  __typename
  insert_ArchSiteType(objects: $archSiteType) {
    returning {
      archSiteTypeID
    }
  }
}
    `;
export type AddArchSiteTypeMutationFn = ApolloReactCommon.MutationFunction<AddArchSiteTypeMutation, AddArchSiteTypeMutationVariables>;
export type AddArchSiteTypeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddArchSiteTypeMutation, AddArchSiteTypeMutationVariables>, 'mutation'>;

    export const AddArchSiteTypeComponent = (props: AddArchSiteTypeComponentProps) => (
      <ApolloReactComponents.Mutation<AddArchSiteTypeMutation, AddArchSiteTypeMutationVariables> mutation={AddArchSiteTypeDocument} {...props} />
    );
    
export type AddArchSiteTypeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddArchSiteTypeMutation, AddArchSiteTypeMutationVariables> & TChildProps;
export function withAddArchSiteType<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddArchSiteTypeMutation,
  AddArchSiteTypeMutationVariables,
  AddArchSiteTypeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddArchSiteTypeMutation, AddArchSiteTypeMutationVariables, AddArchSiteTypeProps<TChildProps>>(AddArchSiteTypeDocument, {
      alias: 'addArchSiteType',
      ...operationOptions
    });
};
export type AddArchSiteTypeMutationResult = ApolloReactCommon.MutationResult<AddArchSiteTypeMutation>;
export type AddArchSiteTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<AddArchSiteTypeMutation, AddArchSiteTypeMutationVariables>;
export const AddRoomPropertyDocument = gql`
    mutation addRoomProperty($RoomProperty: [RoomProperty_insert_input!]!) {
  __typename
  insert_RoomProperty(objects: $RoomProperty) {
    returning {
      roomPropertyID
    }
  }
}
    `;
export type AddRoomPropertyMutationFn = ApolloReactCommon.MutationFunction<AddRoomPropertyMutation, AddRoomPropertyMutationVariables>;
export type AddRoomPropertyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddRoomPropertyMutation, AddRoomPropertyMutationVariables>, 'mutation'>;

    export const AddRoomPropertyComponent = (props: AddRoomPropertyComponentProps) => (
      <ApolloReactComponents.Mutation<AddRoomPropertyMutation, AddRoomPropertyMutationVariables> mutation={AddRoomPropertyDocument} {...props} />
    );
    
export type AddRoomPropertyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddRoomPropertyMutation, AddRoomPropertyMutationVariables> & TChildProps;
export function withAddRoomProperty<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddRoomPropertyMutation,
  AddRoomPropertyMutationVariables,
  AddRoomPropertyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddRoomPropertyMutation, AddRoomPropertyMutationVariables, AddRoomPropertyProps<TChildProps>>(AddRoomPropertyDocument, {
      alias: 'addRoomProperty',
      ...operationOptions
    });
};
export type AddRoomPropertyMutationResult = ApolloReactCommon.MutationResult<AddRoomPropertyMutation>;
export type AddRoomPropertyMutationOptions = ApolloReactCommon.BaseMutationOptions<AddRoomPropertyMutation, AddRoomPropertyMutationVariables>;
export const AddRoomDocument = gql`
    mutation addRoom($roomNo: String!, $roomPropRoom: [RoomPropertyRoom_insert_input!]!, $hotelID: Int!) {
  __typename
  insert_Room(objects: {roomNo: $roomNo, RoomPropertyRooms: {data: $roomPropRoom}, HotelRooms: {data: {hotelID: $hotelID}}}) {
    returning {
      roomID
    }
  }
}
    `;
export type AddRoomMutationFn = ApolloReactCommon.MutationFunction<AddRoomMutation, AddRoomMutationVariables>;
export type AddRoomComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddRoomMutation, AddRoomMutationVariables>, 'mutation'>;

    export const AddRoomComponent = (props: AddRoomComponentProps) => (
      <ApolloReactComponents.Mutation<AddRoomMutation, AddRoomMutationVariables> mutation={AddRoomDocument} {...props} />
    );
    
export type AddRoomProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddRoomMutation, AddRoomMutationVariables> & TChildProps;
export function withAddRoom<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddRoomMutation,
  AddRoomMutationVariables,
  AddRoomProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddRoomMutation, AddRoomMutationVariables, AddRoomProps<TChildProps>>(AddRoomDocument, {
      alias: 'addRoom',
      ...operationOptions
    });
};
export type AddRoomMutationResult = ApolloReactCommon.MutationResult<AddRoomMutation>;
export type AddRoomMutationOptions = ApolloReactCommon.BaseMutationOptions<AddRoomMutation, AddRoomMutationVariables>;
export const AddHotelServicePropertyDocument = gql`
    mutation addHotelServiceProperty($HotelServiceProperty: [HotelServiceProperty_insert_input!]!) {
  __typename
  insert_HotelServiceProperty(objects: $HotelServiceProperty) {
    returning {
      hotelServicePropertyID
    }
  }
}
    `;
export type AddHotelServicePropertyMutationFn = ApolloReactCommon.MutationFunction<AddHotelServicePropertyMutation, AddHotelServicePropertyMutationVariables>;
export type AddHotelServicePropertyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddHotelServicePropertyMutation, AddHotelServicePropertyMutationVariables>, 'mutation'>;

    export const AddHotelServicePropertyComponent = (props: AddHotelServicePropertyComponentProps) => (
      <ApolloReactComponents.Mutation<AddHotelServicePropertyMutation, AddHotelServicePropertyMutationVariables> mutation={AddHotelServicePropertyDocument} {...props} />
    );
    
export type AddHotelServicePropertyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddHotelServicePropertyMutation, AddHotelServicePropertyMutationVariables> & TChildProps;
export function withAddHotelServiceProperty<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddHotelServicePropertyMutation,
  AddHotelServicePropertyMutationVariables,
  AddHotelServicePropertyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddHotelServicePropertyMutation, AddHotelServicePropertyMutationVariables, AddHotelServicePropertyProps<TChildProps>>(AddHotelServicePropertyDocument, {
      alias: 'addHotelServiceProperty',
      ...operationOptions
    });
};
export type AddHotelServicePropertyMutationResult = ApolloReactCommon.MutationResult<AddHotelServicePropertyMutation>;
export type AddHotelServicePropertyMutationOptions = ApolloReactCommon.BaseMutationOptions<AddHotelServicePropertyMutation, AddHotelServicePropertyMutationVariables>;
export const AddHotelCommentDocument = gql`
    mutation addHotelComment($HotelComment: [HotelComment_insert_input!]!) {
  __typename
  insert_HotelComment(objects: $HotelComment) {
    returning {
      hotelCommentID
    }
  }
}
    `;
export type AddHotelCommentMutationFn = ApolloReactCommon.MutationFunction<AddHotelCommentMutation, AddHotelCommentMutationVariables>;
export type AddHotelCommentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddHotelCommentMutation, AddHotelCommentMutationVariables>, 'mutation'>;

    export const AddHotelCommentComponent = (props: AddHotelCommentComponentProps) => (
      <ApolloReactComponents.Mutation<AddHotelCommentMutation, AddHotelCommentMutationVariables> mutation={AddHotelCommentDocument} {...props} />
    );
    
export type AddHotelCommentProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddHotelCommentMutation, AddHotelCommentMutationVariables> & TChildProps;
export function withAddHotelComment<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddHotelCommentMutation,
  AddHotelCommentMutationVariables,
  AddHotelCommentProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddHotelCommentMutation, AddHotelCommentMutationVariables, AddHotelCommentProps<TChildProps>>(AddHotelCommentDocument, {
      alias: 'addHotelComment',
      ...operationOptions
    });
};
export type AddHotelCommentMutationResult = ApolloReactCommon.MutationResult<AddHotelCommentMutation>;
export type AddHotelCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddHotelCommentMutation, AddHotelCommentMutationVariables>;
export const AddHotelRoomPriceDocument = gql`
    mutation addHotelRoomPrice($RoomPrice: [RoomPrice_insert_input!]!) {
  __typename
  insert_RoomPrice(objects: $RoomPrice) {
    returning {
      roomPriceID
    }
  }
}
    `;
export type AddHotelRoomPriceMutationFn = ApolloReactCommon.MutationFunction<AddHotelRoomPriceMutation, AddHotelRoomPriceMutationVariables>;
export type AddHotelRoomPriceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddHotelRoomPriceMutation, AddHotelRoomPriceMutationVariables>, 'mutation'>;

    export const AddHotelRoomPriceComponent = (props: AddHotelRoomPriceComponentProps) => (
      <ApolloReactComponents.Mutation<AddHotelRoomPriceMutation, AddHotelRoomPriceMutationVariables> mutation={AddHotelRoomPriceDocument} {...props} />
    );
    
export type AddHotelRoomPriceProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddHotelRoomPriceMutation, AddHotelRoomPriceMutationVariables> & TChildProps;
export function withAddHotelRoomPrice<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddHotelRoomPriceMutation,
  AddHotelRoomPriceMutationVariables,
  AddHotelRoomPriceProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddHotelRoomPriceMutation, AddHotelRoomPriceMutationVariables, AddHotelRoomPriceProps<TChildProps>>(AddHotelRoomPriceDocument, {
      alias: 'addHotelRoomPrice',
      ...operationOptions
    });
};
export type AddHotelRoomPriceMutationResult = ApolloReactCommon.MutationResult<AddHotelRoomPriceMutation>;
export type AddHotelRoomPriceMutationOptions = ApolloReactCommon.BaseMutationOptions<AddHotelRoomPriceMutation, AddHotelRoomPriceMutationVariables>;
export const AddArchSiteWorkingScheduleDocument = gql`
    mutation addArchSiteWorkingSchedule($ArchSiteWorkingSchedule: [ArchSiteWorkingSchedule_insert_input!]!) {
  __typename
  insert_ArchSiteWorkingSchedule(objects: $ArchSiteWorkingSchedule) {
    returning {
      archSiteWorkingScheduleID
    }
  }
}
    `;
export type AddArchSiteWorkingScheduleMutationFn = ApolloReactCommon.MutationFunction<AddArchSiteWorkingScheduleMutation, AddArchSiteWorkingScheduleMutationVariables>;
export type AddArchSiteWorkingScheduleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddArchSiteWorkingScheduleMutation, AddArchSiteWorkingScheduleMutationVariables>, 'mutation'>;

    export const AddArchSiteWorkingScheduleComponent = (props: AddArchSiteWorkingScheduleComponentProps) => (
      <ApolloReactComponents.Mutation<AddArchSiteWorkingScheduleMutation, AddArchSiteWorkingScheduleMutationVariables> mutation={AddArchSiteWorkingScheduleDocument} {...props} />
    );
    
export type AddArchSiteWorkingScheduleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddArchSiteWorkingScheduleMutation, AddArchSiteWorkingScheduleMutationVariables> & TChildProps;
export function withAddArchSiteWorkingSchedule<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddArchSiteWorkingScheduleMutation,
  AddArchSiteWorkingScheduleMutationVariables,
  AddArchSiteWorkingScheduleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddArchSiteWorkingScheduleMutation, AddArchSiteWorkingScheduleMutationVariables, AddArchSiteWorkingScheduleProps<TChildProps>>(AddArchSiteWorkingScheduleDocument, {
      alias: 'addArchSiteWorkingSchedule',
      ...operationOptions
    });
};
export type AddArchSiteWorkingScheduleMutationResult = ApolloReactCommon.MutationResult<AddArchSiteWorkingScheduleMutation>;
export type AddArchSiteWorkingScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<AddArchSiteWorkingScheduleMutation, AddArchSiteWorkingScheduleMutationVariables>;
export const AddArchSiteDocument = gql`
    mutation addArchSite($arch: [ArchSite_insert_input!]!) {
  __typename
  insert_ArchSite(objects: $arch) {
    returning {
      archSiteID
    }
  }
}
    `;
export type AddArchSiteMutationFn = ApolloReactCommon.MutationFunction<AddArchSiteMutation, AddArchSiteMutationVariables>;
export type AddArchSiteComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddArchSiteMutation, AddArchSiteMutationVariables>, 'mutation'>;

    export const AddArchSiteComponent = (props: AddArchSiteComponentProps) => (
      <ApolloReactComponents.Mutation<AddArchSiteMutation, AddArchSiteMutationVariables> mutation={AddArchSiteDocument} {...props} />
    );
    
export type AddArchSiteProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddArchSiteMutation, AddArchSiteMutationVariables> & TChildProps;
export function withAddArchSite<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddArchSiteMutation,
  AddArchSiteMutationVariables,
  AddArchSiteProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddArchSiteMutation, AddArchSiteMutationVariables, AddArchSiteProps<TChildProps>>(AddArchSiteDocument, {
      alias: 'addArchSite',
      ...operationOptions
    });
};
export type AddArchSiteMutationResult = ApolloReactCommon.MutationResult<AddArchSiteMutation>;
export type AddArchSiteMutationOptions = ApolloReactCommon.BaseMutationOptions<AddArchSiteMutation, AddArchSiteMutationVariables>;
export const AddArchSiteCommentDocument = gql`
    mutation addArchSiteComment($ArchSiteComment: [ArchSiteComment_insert_input!]!) {
  __typename
  insert_ArchSiteComment(objects: $ArchSiteComment) {
    returning {
      archSiteCommentID
    }
  }
}
    `;
export type AddArchSiteCommentMutationFn = ApolloReactCommon.MutationFunction<AddArchSiteCommentMutation, AddArchSiteCommentMutationVariables>;
export type AddArchSiteCommentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddArchSiteCommentMutation, AddArchSiteCommentMutationVariables>, 'mutation'>;

    export const AddArchSiteCommentComponent = (props: AddArchSiteCommentComponentProps) => (
      <ApolloReactComponents.Mutation<AddArchSiteCommentMutation, AddArchSiteCommentMutationVariables> mutation={AddArchSiteCommentDocument} {...props} />
    );
    
export type AddArchSiteCommentProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddArchSiteCommentMutation, AddArchSiteCommentMutationVariables> & TChildProps;
export function withAddArchSiteComment<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddArchSiteCommentMutation,
  AddArchSiteCommentMutationVariables,
  AddArchSiteCommentProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddArchSiteCommentMutation, AddArchSiteCommentMutationVariables, AddArchSiteCommentProps<TChildProps>>(AddArchSiteCommentDocument, {
      alias: 'addArchSiteComment',
      ...operationOptions
    });
};
export type AddArchSiteCommentMutationResult = ApolloReactCommon.MutationResult<AddArchSiteCommentMutation>;
export type AddArchSiteCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddArchSiteCommentMutation, AddArchSiteCommentMutationVariables>;
export const AddArchSiteEntranceTypeDocument = gql`
    mutation addArchSiteEntranceType($ArchSiteEntranceType: [ArchSiteEntranceType_insert_input!]!) {
  __typename
  insert_ArchSiteEntranceType(objects: $ArchSiteEntranceType) {
    returning {
      archSiteEntranceTypeID
    }
  }
}
    `;
export type AddArchSiteEntranceTypeMutationFn = ApolloReactCommon.MutationFunction<AddArchSiteEntranceTypeMutation, AddArchSiteEntranceTypeMutationVariables>;
export type AddArchSiteEntranceTypeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddArchSiteEntranceTypeMutation, AddArchSiteEntranceTypeMutationVariables>, 'mutation'>;

    export const AddArchSiteEntranceTypeComponent = (props: AddArchSiteEntranceTypeComponentProps) => (
      <ApolloReactComponents.Mutation<AddArchSiteEntranceTypeMutation, AddArchSiteEntranceTypeMutationVariables> mutation={AddArchSiteEntranceTypeDocument} {...props} />
    );
    
export type AddArchSiteEntranceTypeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddArchSiteEntranceTypeMutation, AddArchSiteEntranceTypeMutationVariables> & TChildProps;
export function withAddArchSiteEntranceType<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddArchSiteEntranceTypeMutation,
  AddArchSiteEntranceTypeMutationVariables,
  AddArchSiteEntranceTypeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddArchSiteEntranceTypeMutation, AddArchSiteEntranceTypeMutationVariables, AddArchSiteEntranceTypeProps<TChildProps>>(AddArchSiteEntranceTypeDocument, {
      alias: 'addArchSiteEntranceType',
      ...operationOptions
    });
};
export type AddArchSiteEntranceTypeMutationResult = ApolloReactCommon.MutationResult<AddArchSiteEntranceTypeMutation>;
export type AddArchSiteEntranceTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<AddArchSiteEntranceTypeMutation, AddArchSiteEntranceTypeMutationVariables>;
export const AddRestaurantCuisineTypeDocument = gql`
    mutation addRestaurantCuisineType($RestaurantCuisineType: [RestaurantCuisineType_insert_input!]!) {
  __typename
  insert_RestaurantCuisineType(objects: $RestaurantCuisineType) {
    returning {
      restaurantCuisineTypeID
    }
  }
}
    `;
export type AddRestaurantCuisineTypeMutationFn = ApolloReactCommon.MutationFunction<AddRestaurantCuisineTypeMutation, AddRestaurantCuisineTypeMutationVariables>;
export type AddRestaurantCuisineTypeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddRestaurantCuisineTypeMutation, AddRestaurantCuisineTypeMutationVariables>, 'mutation'>;

    export const AddRestaurantCuisineTypeComponent = (props: AddRestaurantCuisineTypeComponentProps) => (
      <ApolloReactComponents.Mutation<AddRestaurantCuisineTypeMutation, AddRestaurantCuisineTypeMutationVariables> mutation={AddRestaurantCuisineTypeDocument} {...props} />
    );
    
export type AddRestaurantCuisineTypeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddRestaurantCuisineTypeMutation, AddRestaurantCuisineTypeMutationVariables> & TChildProps;
export function withAddRestaurantCuisineType<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddRestaurantCuisineTypeMutation,
  AddRestaurantCuisineTypeMutationVariables,
  AddRestaurantCuisineTypeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddRestaurantCuisineTypeMutation, AddRestaurantCuisineTypeMutationVariables, AddRestaurantCuisineTypeProps<TChildProps>>(AddRestaurantCuisineTypeDocument, {
      alias: 'addRestaurantCuisineType',
      ...operationOptions
    });
};
export type AddRestaurantCuisineTypeMutationResult = ApolloReactCommon.MutationResult<AddRestaurantCuisineTypeMutation>;
export type AddRestaurantCuisineTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<AddRestaurantCuisineTypeMutation, AddRestaurantCuisineTypeMutationVariables>;
export const AddTagDocument = gql`
    mutation addTag($Tag: [Tag_insert_input!]!) {
  __typename
  insert_Tag(objects: $Tag) {
    returning {
      tagID
    }
  }
}
    `;
export type AddTagMutationFn = ApolloReactCommon.MutationFunction<AddTagMutation, AddTagMutationVariables>;
export type AddTagComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddTagMutation, AddTagMutationVariables>, 'mutation'>;

    export const AddTagComponent = (props: AddTagComponentProps) => (
      <ApolloReactComponents.Mutation<AddTagMutation, AddTagMutationVariables> mutation={AddTagDocument} {...props} />
    );
    
export type AddTagProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddTagMutation, AddTagMutationVariables> & TChildProps;
export function withAddTag<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddTagMutation,
  AddTagMutationVariables,
  AddTagProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddTagMutation, AddTagMutationVariables, AddTagProps<TChildProps>>(AddTagDocument, {
      alias: 'addTag',
      ...operationOptions
    });
};
export type AddTagMutationResult = ApolloReactCommon.MutationResult<AddTagMutation>;
export type AddTagMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTagMutation, AddTagMutationVariables>;
export const AddRestaurantTypeDocument = gql`
    mutation addRestaurantType($RestaurantType: [RestaurantType_insert_input!]!) {
  __typename
  insert_RestaurantType(objects: $RestaurantType) {
    returning {
      restaurantTypeID
    }
  }
}
    `;
export type AddRestaurantTypeMutationFn = ApolloReactCommon.MutationFunction<AddRestaurantTypeMutation, AddRestaurantTypeMutationVariables>;
export type AddRestaurantTypeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddRestaurantTypeMutation, AddRestaurantTypeMutationVariables>, 'mutation'>;

    export const AddRestaurantTypeComponent = (props: AddRestaurantTypeComponentProps) => (
      <ApolloReactComponents.Mutation<AddRestaurantTypeMutation, AddRestaurantTypeMutationVariables> mutation={AddRestaurantTypeDocument} {...props} />
    );
    
export type AddRestaurantTypeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddRestaurantTypeMutation, AddRestaurantTypeMutationVariables> & TChildProps;
export function withAddRestaurantType<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddRestaurantTypeMutation,
  AddRestaurantTypeMutationVariables,
  AddRestaurantTypeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddRestaurantTypeMutation, AddRestaurantTypeMutationVariables, AddRestaurantTypeProps<TChildProps>>(AddRestaurantTypeDocument, {
      alias: 'addRestaurantType',
      ...operationOptions
    });
};
export type AddRestaurantTypeMutationResult = ApolloReactCommon.MutationResult<AddRestaurantTypeMutation>;
export type AddRestaurantTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<AddRestaurantTypeMutation, AddRestaurantTypeMutationVariables>;
export const AddRestaurantCommentDocument = gql`
    mutation addRestaurantComment($RestaurantComment: [RestaurantComment_insert_input!]!) {
  __typename
  insert_RestaurantComment(objects: $RestaurantComment) {
    returning {
      restaurantCommentID
    }
  }
}
    `;
export type AddRestaurantCommentMutationFn = ApolloReactCommon.MutationFunction<AddRestaurantCommentMutation, AddRestaurantCommentMutationVariables>;
export type AddRestaurantCommentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddRestaurantCommentMutation, AddRestaurantCommentMutationVariables>, 'mutation'>;

    export const AddRestaurantCommentComponent = (props: AddRestaurantCommentComponentProps) => (
      <ApolloReactComponents.Mutation<AddRestaurantCommentMutation, AddRestaurantCommentMutationVariables> mutation={AddRestaurantCommentDocument} {...props} />
    );
    
export type AddRestaurantCommentProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddRestaurantCommentMutation, AddRestaurantCommentMutationVariables> & TChildProps;
export function withAddRestaurantComment<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddRestaurantCommentMutation,
  AddRestaurantCommentMutationVariables,
  AddRestaurantCommentProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddRestaurantCommentMutation, AddRestaurantCommentMutationVariables, AddRestaurantCommentProps<TChildProps>>(AddRestaurantCommentDocument, {
      alias: 'addRestaurantComment',
      ...operationOptions
    });
};
export type AddRestaurantCommentMutationResult = ApolloReactCommon.MutationResult<AddRestaurantCommentMutation>;
export type AddRestaurantCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddRestaurantCommentMutation, AddRestaurantCommentMutationVariables>;
export const AddMuseumTypeDocument = gql`
    mutation addMuseumType($MuseumType: [MuseumType_insert_input!]!) {
  __typename
  insert_MuseumType(objects: $MuseumType) {
    returning {
      museumTypeID
    }
  }
}
    `;
export type AddMuseumTypeMutationFn = ApolloReactCommon.MutationFunction<AddMuseumTypeMutation, AddMuseumTypeMutationVariables>;
export type AddMuseumTypeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddMuseumTypeMutation, AddMuseumTypeMutationVariables>, 'mutation'>;

    export const AddMuseumTypeComponent = (props: AddMuseumTypeComponentProps) => (
      <ApolloReactComponents.Mutation<AddMuseumTypeMutation, AddMuseumTypeMutationVariables> mutation={AddMuseumTypeDocument} {...props} />
    );
    
export type AddMuseumTypeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddMuseumTypeMutation, AddMuseumTypeMutationVariables> & TChildProps;
export function withAddMuseumType<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddMuseumTypeMutation,
  AddMuseumTypeMutationVariables,
  AddMuseumTypeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddMuseumTypeMutation, AddMuseumTypeMutationVariables, AddMuseumTypeProps<TChildProps>>(AddMuseumTypeDocument, {
      alias: 'addMuseumType',
      ...operationOptions
    });
};
export type AddMuseumTypeMutationResult = ApolloReactCommon.MutationResult<AddMuseumTypeMutation>;
export type AddMuseumTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMuseumTypeMutation, AddMuseumTypeMutationVariables>;
export const AddMuseumDocument = gql`
    mutation addMuseum($museum: [Museum_insert_input!]!) {
  __typename
  insert_Museum(objects: $museum) {
    returning {
      museumID
    }
  }
}
    `;
export type AddMuseumMutationFn = ApolloReactCommon.MutationFunction<AddMuseumMutation, AddMuseumMutationVariables>;
export type AddMuseumComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddMuseumMutation, AddMuseumMutationVariables>, 'mutation'>;

    export const AddMuseumComponent = (props: AddMuseumComponentProps) => (
      <ApolloReactComponents.Mutation<AddMuseumMutation, AddMuseumMutationVariables> mutation={AddMuseumDocument} {...props} />
    );
    
export type AddMuseumProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddMuseumMutation, AddMuseumMutationVariables> & TChildProps;
export function withAddMuseum<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddMuseumMutation,
  AddMuseumMutationVariables,
  AddMuseumProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddMuseumMutation, AddMuseumMutationVariables, AddMuseumProps<TChildProps>>(AddMuseumDocument, {
      alias: 'addMuseum',
      ...operationOptions
    });
};
export type AddMuseumMutationResult = ApolloReactCommon.MutationResult<AddMuseumMutation>;
export type AddMuseumMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMuseumMutation, AddMuseumMutationVariables>;
export const AddMuseumCommentDocument = gql`
    mutation addMuseumComment($MuseumComment: [MuseumComment_insert_input!]!) {
  __typename
  insert_MuseumComment(objects: $MuseumComment) {
    returning {
      museumCommentID
    }
  }
}
    `;
export type AddMuseumCommentMutationFn = ApolloReactCommon.MutationFunction<AddMuseumCommentMutation, AddMuseumCommentMutationVariables>;
export type AddMuseumCommentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddMuseumCommentMutation, AddMuseumCommentMutationVariables>, 'mutation'>;

    export const AddMuseumCommentComponent = (props: AddMuseumCommentComponentProps) => (
      <ApolloReactComponents.Mutation<AddMuseumCommentMutation, AddMuseumCommentMutationVariables> mutation={AddMuseumCommentDocument} {...props} />
    );
    
export type AddMuseumCommentProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddMuseumCommentMutation, AddMuseumCommentMutationVariables> & TChildProps;
export function withAddMuseumComment<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddMuseumCommentMutation,
  AddMuseumCommentMutationVariables,
  AddMuseumCommentProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddMuseumCommentMutation, AddMuseumCommentMutationVariables, AddMuseumCommentProps<TChildProps>>(AddMuseumCommentDocument, {
      alias: 'addMuseumComment',
      ...operationOptions
    });
};
export type AddMuseumCommentMutationResult = ApolloReactCommon.MutationResult<AddMuseumCommentMutation>;
export type AddMuseumCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMuseumCommentMutation, AddMuseumCommentMutationVariables>;
export const AddMuseumEntranceTypeDocument = gql`
    mutation addMuseumEntranceType($MuseumEntranceType: [MuseumEntranceType_insert_input!]!) {
  __typename
  insert_MuseumEntranceType(objects: $MuseumEntranceType) {
    returning {
      museumEntranceTypeID
    }
  }
}
    `;
export type AddMuseumEntranceTypeMutationFn = ApolloReactCommon.MutationFunction<AddMuseumEntranceTypeMutation, AddMuseumEntranceTypeMutationVariables>;
export type AddMuseumEntranceTypeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddMuseumEntranceTypeMutation, AddMuseumEntranceTypeMutationVariables>, 'mutation'>;

    export const AddMuseumEntranceTypeComponent = (props: AddMuseumEntranceTypeComponentProps) => (
      <ApolloReactComponents.Mutation<AddMuseumEntranceTypeMutation, AddMuseumEntranceTypeMutationVariables> mutation={AddMuseumEntranceTypeDocument} {...props} />
    );
    
export type AddMuseumEntranceTypeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddMuseumEntranceTypeMutation, AddMuseumEntranceTypeMutationVariables> & TChildProps;
export function withAddMuseumEntranceType<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddMuseumEntranceTypeMutation,
  AddMuseumEntranceTypeMutationVariables,
  AddMuseumEntranceTypeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddMuseumEntranceTypeMutation, AddMuseumEntranceTypeMutationVariables, AddMuseumEntranceTypeProps<TChildProps>>(AddMuseumEntranceTypeDocument, {
      alias: 'addMuseumEntranceType',
      ...operationOptions
    });
};
export type AddMuseumEntranceTypeMutationResult = ApolloReactCommon.MutationResult<AddMuseumEntranceTypeMutation>;
export type AddMuseumEntranceTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMuseumEntranceTypeMutation, AddMuseumEntranceTypeMutationVariables>;
export const AddMuseumWorkingScheduleDocument = gql`
    mutation addMuseumWorkingSchedule($MuseumWorkingSchedule: [MuseumWorkingSchedule_insert_input!]!) {
  __typename
  insert_MuseumWorkingSchedule(objects: $MuseumWorkingSchedule) {
    returning {
      museumWorkingScheduleID
    }
  }
}
    `;
export type AddMuseumWorkingScheduleMutationFn = ApolloReactCommon.MutationFunction<AddMuseumWorkingScheduleMutation, AddMuseumWorkingScheduleMutationVariables>;
export type AddMuseumWorkingScheduleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddMuseumWorkingScheduleMutation, AddMuseumWorkingScheduleMutationVariables>, 'mutation'>;

    export const AddMuseumWorkingScheduleComponent = (props: AddMuseumWorkingScheduleComponentProps) => (
      <ApolloReactComponents.Mutation<AddMuseumWorkingScheduleMutation, AddMuseumWorkingScheduleMutationVariables> mutation={AddMuseumWorkingScheduleDocument} {...props} />
    );
    
export type AddMuseumWorkingScheduleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddMuseumWorkingScheduleMutation, AddMuseumWorkingScheduleMutationVariables> & TChildProps;
export function withAddMuseumWorkingSchedule<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddMuseumWorkingScheduleMutation,
  AddMuseumWorkingScheduleMutationVariables,
  AddMuseumWorkingScheduleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddMuseumWorkingScheduleMutation, AddMuseumWorkingScheduleMutationVariables, AddMuseumWorkingScheduleProps<TChildProps>>(AddMuseumWorkingScheduleDocument, {
      alias: 'addMuseumWorkingSchedule',
      ...operationOptions
    });
};
export type AddMuseumWorkingScheduleMutationResult = ApolloReactCommon.MutationResult<AddMuseumWorkingScheduleMutation>;
export type AddMuseumWorkingScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMuseumWorkingScheduleMutation, AddMuseumWorkingScheduleMutationVariables>;
export const AddRestaurantWorkingScheduleDocument = gql`
    mutation addRestaurantWorkingSchedule($RestaurantWorkingSchedule: [RestaurantWorkingSchedule_insert_input!]!) {
  __typename
  insert_RestaurantWorkingSchedule(objects: $RestaurantWorkingSchedule) {
    returning {
      restaurantWorkingScheduleID
    }
  }
}
    `;
export type AddRestaurantWorkingScheduleMutationFn = ApolloReactCommon.MutationFunction<AddRestaurantWorkingScheduleMutation, AddRestaurantWorkingScheduleMutationVariables>;
export type AddRestaurantWorkingScheduleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddRestaurantWorkingScheduleMutation, AddRestaurantWorkingScheduleMutationVariables>, 'mutation'>;

    export const AddRestaurantWorkingScheduleComponent = (props: AddRestaurantWorkingScheduleComponentProps) => (
      <ApolloReactComponents.Mutation<AddRestaurantWorkingScheduleMutation, AddRestaurantWorkingScheduleMutationVariables> mutation={AddRestaurantWorkingScheduleDocument} {...props} />
    );
    
export type AddRestaurantWorkingScheduleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddRestaurantWorkingScheduleMutation, AddRestaurantWorkingScheduleMutationVariables> & TChildProps;
export function withAddRestaurantWorkingSchedule<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddRestaurantWorkingScheduleMutation,
  AddRestaurantWorkingScheduleMutationVariables,
  AddRestaurantWorkingScheduleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddRestaurantWorkingScheduleMutation, AddRestaurantWorkingScheduleMutationVariables, AddRestaurantWorkingScheduleProps<TChildProps>>(AddRestaurantWorkingScheduleDocument, {
      alias: 'addRestaurantWorkingSchedule',
      ...operationOptions
    });
};
export type AddRestaurantWorkingScheduleMutationResult = ApolloReactCommon.MutationResult<AddRestaurantWorkingScheduleMutation>;
export type AddRestaurantWorkingScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<AddRestaurantWorkingScheduleMutation, AddRestaurantWorkingScheduleMutationVariables>;
export const AddArchSitePriceDocument = gql`
    mutation addArchSitePrice($ArchSitePrice: [ArchSitePrice_insert_input!]!) {
  __typename
  insert_ArchSitePrice(objects: $ArchSitePrice) {
    returning {
      archSitePriceID
    }
  }
}
    `;
export type AddArchSitePriceMutationFn = ApolloReactCommon.MutationFunction<AddArchSitePriceMutation, AddArchSitePriceMutationVariables>;
export type AddArchSitePriceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddArchSitePriceMutation, AddArchSitePriceMutationVariables>, 'mutation'>;

    export const AddArchSitePriceComponent = (props: AddArchSitePriceComponentProps) => (
      <ApolloReactComponents.Mutation<AddArchSitePriceMutation, AddArchSitePriceMutationVariables> mutation={AddArchSitePriceDocument} {...props} />
    );
    
export type AddArchSitePriceProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddArchSitePriceMutation, AddArchSitePriceMutationVariables> & TChildProps;
export function withAddArchSitePrice<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddArchSitePriceMutation,
  AddArchSitePriceMutationVariables,
  AddArchSitePriceProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddArchSitePriceMutation, AddArchSitePriceMutationVariables, AddArchSitePriceProps<TChildProps>>(AddArchSitePriceDocument, {
      alias: 'addArchSitePrice',
      ...operationOptions
    });
};
export type AddArchSitePriceMutationResult = ApolloReactCommon.MutationResult<AddArchSitePriceMutation>;
export type AddArchSitePriceMutationOptions = ApolloReactCommon.BaseMutationOptions<AddArchSitePriceMutation, AddArchSitePriceMutationVariables>;
export const AddMuseumPriceDocument = gql`
    mutation addMuseumPrice($MuseumPrice: [MuseumPrice_insert_input!]!) {
  __typename
  insert_MuseumPrice(objects: $MuseumPrice) {
    returning {
      museumPriceID
    }
  }
}
    `;
export type AddMuseumPriceMutationFn = ApolloReactCommon.MutationFunction<AddMuseumPriceMutation, AddMuseumPriceMutationVariables>;
export type AddMuseumPriceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddMuseumPriceMutation, AddMuseumPriceMutationVariables>, 'mutation'>;

    export const AddMuseumPriceComponent = (props: AddMuseumPriceComponentProps) => (
      <ApolloReactComponents.Mutation<AddMuseumPriceMutation, AddMuseumPriceMutationVariables> mutation={AddMuseumPriceDocument} {...props} />
    );
    
export type AddMuseumPriceProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddMuseumPriceMutation, AddMuseumPriceMutationVariables> & TChildProps;
export function withAddMuseumPrice<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddMuseumPriceMutation,
  AddMuseumPriceMutationVariables,
  AddMuseumPriceProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddMuseumPriceMutation, AddMuseumPriceMutationVariables, AddMuseumPriceProps<TChildProps>>(AddMuseumPriceDocument, {
      alias: 'addMuseumPrice',
      ...operationOptions
    });
};
export type AddMuseumPriceMutationResult = ApolloReactCommon.MutationResult<AddMuseumPriceMutation>;
export type AddMuseumPriceMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMuseumPriceMutation, AddMuseumPriceMutationVariables>;
export const AddTravelGuideDocument = gql`
    mutation addTravelGuide($travelGuide: [TravelGuide_insert_input!]!) {
  __typename
  insert_TravelGuide(objects: $travelGuide) {
    returning {
      travelGuideID
    }
  }
}
    `;
export type AddTravelGuideMutationFn = ApolloReactCommon.MutationFunction<AddTravelGuideMutation, AddTravelGuideMutationVariables>;
export type AddTravelGuideComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddTravelGuideMutation, AddTravelGuideMutationVariables>, 'mutation'>;

    export const AddTravelGuideComponent = (props: AddTravelGuideComponentProps) => (
      <ApolloReactComponents.Mutation<AddTravelGuideMutation, AddTravelGuideMutationVariables> mutation={AddTravelGuideDocument} {...props} />
    );
    
export type AddTravelGuideProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddTravelGuideMutation, AddTravelGuideMutationVariables> & TChildProps;
export function withAddTravelGuide<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddTravelGuideMutation,
  AddTravelGuideMutationVariables,
  AddTravelGuideProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddTravelGuideMutation, AddTravelGuideMutationVariables, AddTravelGuideProps<TChildProps>>(AddTravelGuideDocument, {
      alias: 'addTravelGuide',
      ...operationOptions
    });
};
export type AddTravelGuideMutationResult = ApolloReactCommon.MutationResult<AddTravelGuideMutation>;
export type AddTravelGuideMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTravelGuideMutation, AddTravelGuideMutationVariables>;
export const AddRestaurantMenuDocument = gql`
    mutation addRestaurantMenu($restaurantMenu: [RestaurantMenu_insert_input!]!) {
  __typename
  insert_RestaurantMenu(objects: $restaurantMenu) {
    returning {
      restaurantMenuID
    }
  }
}
    `;
export type AddRestaurantMenuMutationFn = ApolloReactCommon.MutationFunction<AddRestaurantMenuMutation, AddRestaurantMenuMutationVariables>;
export type AddRestaurantMenuComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddRestaurantMenuMutation, AddRestaurantMenuMutationVariables>, 'mutation'>;

    export const AddRestaurantMenuComponent = (props: AddRestaurantMenuComponentProps) => (
      <ApolloReactComponents.Mutation<AddRestaurantMenuMutation, AddRestaurantMenuMutationVariables> mutation={AddRestaurantMenuDocument} {...props} />
    );
    
export type AddRestaurantMenuProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddRestaurantMenuMutation, AddRestaurantMenuMutationVariables> & TChildProps;
export function withAddRestaurantMenu<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddRestaurantMenuMutation,
  AddRestaurantMenuMutationVariables,
  AddRestaurantMenuProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddRestaurantMenuMutation, AddRestaurantMenuMutationVariables, AddRestaurantMenuProps<TChildProps>>(AddRestaurantMenuDocument, {
      alias: 'addRestaurantMenu',
      ...operationOptions
    });
};
export type AddRestaurantMenuMutationResult = ApolloReactCommon.MutationResult<AddRestaurantMenuMutation>;
export type AddRestaurantMenuMutationOptions = ApolloReactCommon.BaseMutationOptions<AddRestaurantMenuMutation, AddRestaurantMenuMutationVariables>;
export const AddArticleDocument = gql`
    mutation addArticle($addArticle: [Article_insert_input!]!) {
  __typename
  insert_Article(objects: $addArticle) {
    returning {
      articleID
    }
  }
}
    `;
export type AddArticleMutationFn = ApolloReactCommon.MutationFunction<AddArticleMutation, AddArticleMutationVariables>;
export type AddArticleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddArticleMutation, AddArticleMutationVariables>, 'mutation'>;

    export const AddArticleComponent = (props: AddArticleComponentProps) => (
      <ApolloReactComponents.Mutation<AddArticleMutation, AddArticleMutationVariables> mutation={AddArticleDocument} {...props} />
    );
    
export type AddArticleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddArticleMutation, AddArticleMutationVariables> & TChildProps;
export function withAddArticle<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddArticleMutation,
  AddArticleMutationVariables,
  AddArticleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddArticleMutation, AddArticleMutationVariables, AddArticleProps<TChildProps>>(AddArticleDocument, {
      alias: 'addArticle',
      ...operationOptions
    });
};
export type AddArticleMutationResult = ApolloReactCommon.MutationResult<AddArticleMutation>;
export type AddArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<AddArticleMutation, AddArticleMutationVariables>;
export const ControlLoginMailUserDocument = gql`
    mutation controlLoginMailUser($loginDate: timestamptz, $loginTypeID: Int, $loginIP: inet, $mail: String!, $password: String!) {
  __typename
  update_User(where: {mail: {_eq: $mail}, password: {_eq: $password}}, _set: {loginDate: $loginDate, loginIP: $loginIP, loginTypeID: $loginTypeID}) {
    returning {
      userID
      userTypeID
    }
  }
}
    `;
export type ControlLoginMailUserMutationFn = ApolloReactCommon.MutationFunction<ControlLoginMailUserMutation, ControlLoginMailUserMutationVariables>;
export type ControlLoginMailUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ControlLoginMailUserMutation, ControlLoginMailUserMutationVariables>, 'mutation'>;

    export const ControlLoginMailUserComponent = (props: ControlLoginMailUserComponentProps) => (
      <ApolloReactComponents.Mutation<ControlLoginMailUserMutation, ControlLoginMailUserMutationVariables> mutation={ControlLoginMailUserDocument} {...props} />
    );
    
export type ControlLoginMailUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ControlLoginMailUserMutation, ControlLoginMailUserMutationVariables> & TChildProps;
export function withControlLoginMailUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ControlLoginMailUserMutation,
  ControlLoginMailUserMutationVariables,
  ControlLoginMailUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ControlLoginMailUserMutation, ControlLoginMailUserMutationVariables, ControlLoginMailUserProps<TChildProps>>(ControlLoginMailUserDocument, {
      alias: 'controlLoginMailUser',
      ...operationOptions
    });
};
export type ControlLoginMailUserMutationResult = ApolloReactCommon.MutationResult<ControlLoginMailUserMutation>;
export type ControlLoginMailUserMutationOptions = ApolloReactCommon.BaseMutationOptions<ControlLoginMailUserMutation, ControlLoginMailUserMutationVariables>;
export const UpdateHotelDocument = gql`
    mutation updateHotel($hotelID: Int, $locationID: Int, $addressID: Int, $hotel: Hotel_set_input!, $hotelLocation: Location_set_input!, $hotelAddress: Address_set_input!) {
  __typename
  update_Hotel(where: {hotelID: {_eq: $hotelID}}, _set: $hotel) {
    returning {
      hotelID
    }
  }
  update_Location(where: {locationID: {_eq: $locationID}}, _set: $hotelLocation) {
    returning {
      locationID
    }
  }
  update_Address(where: {addressID: {_eq: $addressID}}, _set: $hotelAddress) {
    returning {
      addressID
    }
  }
}
    `;
export type UpdateHotelMutationFn = ApolloReactCommon.MutationFunction<UpdateHotelMutation, UpdateHotelMutationVariables>;
export type UpdateHotelComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateHotelMutation, UpdateHotelMutationVariables>, 'mutation'>;

    export const UpdateHotelComponent = (props: UpdateHotelComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateHotelMutation, UpdateHotelMutationVariables> mutation={UpdateHotelDocument} {...props} />
    );
    
export type UpdateHotelProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateHotelMutation, UpdateHotelMutationVariables> & TChildProps;
export function withUpdateHotel<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateHotelMutation,
  UpdateHotelMutationVariables,
  UpdateHotelProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateHotelMutation, UpdateHotelMutationVariables, UpdateHotelProps<TChildProps>>(UpdateHotelDocument, {
      alias: 'updateHotel',
      ...operationOptions
    });
};
export type UpdateHotelMutationResult = ApolloReactCommon.MutationResult<UpdateHotelMutation>;
export type UpdateHotelMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateHotelMutation, UpdateHotelMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation updateArticle($articleID: Int, $article: Article_set_input!) {
  __typename
  update_Article(where: {articleID: {_eq: $articleID}}, _set: $article) {
    returning {
      articleID
    }
  }
}
    `;
export type UpdateArticleMutationFn = ApolloReactCommon.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;
export type UpdateArticleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateArticleMutation, UpdateArticleMutationVariables>, 'mutation'>;

    export const UpdateArticleComponent = (props: UpdateArticleComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateArticleMutation, UpdateArticleMutationVariables> mutation={UpdateArticleDocument} {...props} />
    );
    
export type UpdateArticleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateArticleMutation, UpdateArticleMutationVariables> & TChildProps;
export function withUpdateArticle<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateArticleMutation,
  UpdateArticleMutationVariables,
  UpdateArticleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateArticleMutation, UpdateArticleMutationVariables, UpdateArticleProps<TChildProps>>(UpdateArticleDocument, {
      alias: 'updateArticle',
      ...operationOptions
    });
};
export type UpdateArticleMutationResult = ApolloReactCommon.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const UpdateMuseumDocument = gql`
    mutation updateMuseum($museumID: Int, $locationID: Int, $addressID: Int, $museum: Museum_set_input!, $museumLocation: Location_set_input!, $museumAddress: Address_set_input!) {
  __typename
  update_Museum(where: {museumID: {_eq: $museumID}}, _set: $museum) {
    returning {
      museumID
    }
  }
  update_Location(where: {locationID: {_eq: $locationID}}, _set: $museumLocation) {
    returning {
      locationID
    }
  }
  update_Address(where: {addressID: {_eq: $addressID}}, _set: $museumAddress) {
    returning {
      addressID
    }
  }
}
    `;
export type UpdateMuseumMutationFn = ApolloReactCommon.MutationFunction<UpdateMuseumMutation, UpdateMuseumMutationVariables>;
export type UpdateMuseumComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateMuseumMutation, UpdateMuseumMutationVariables>, 'mutation'>;

    export const UpdateMuseumComponent = (props: UpdateMuseumComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateMuseumMutation, UpdateMuseumMutationVariables> mutation={UpdateMuseumDocument} {...props} />
    );
    
export type UpdateMuseumProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateMuseumMutation, UpdateMuseumMutationVariables> & TChildProps;
export function withUpdateMuseum<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateMuseumMutation,
  UpdateMuseumMutationVariables,
  UpdateMuseumProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateMuseumMutation, UpdateMuseumMutationVariables, UpdateMuseumProps<TChildProps>>(UpdateMuseumDocument, {
      alias: 'updateMuseum',
      ...operationOptions
    });
};
export type UpdateMuseumMutationResult = ApolloReactCommon.MutationResult<UpdateMuseumMutation>;
export type UpdateMuseumMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMuseumMutation, UpdateMuseumMutationVariables>;
export const UpdateArchSiteDocument = gql`
    mutation updateArchSite($archSiteID: Int, $locationID: Int, $addressID: Int, $archSite: ArchSite_set_input!, $archSiteLocation: Location_set_input!, $archSiteAddress: Address_set_input!) {
  __typename
  update_ArchSite(where: {archSiteID: {_eq: $archSiteID}}, _set: $archSite) {
    returning {
      archSiteID
    }
  }
  update_Location(where: {locationID: {_eq: $locationID}}, _set: $archSiteLocation) {
    returning {
      locationID
    }
  }
  update_Address(where: {addressID: {_eq: $addressID}}, _set: $archSiteAddress) {
    returning {
      addressID
    }
  }
}
    `;
export type UpdateArchSiteMutationFn = ApolloReactCommon.MutationFunction<UpdateArchSiteMutation, UpdateArchSiteMutationVariables>;
export type UpdateArchSiteComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateArchSiteMutation, UpdateArchSiteMutationVariables>, 'mutation'>;

    export const UpdateArchSiteComponent = (props: UpdateArchSiteComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateArchSiteMutation, UpdateArchSiteMutationVariables> mutation={UpdateArchSiteDocument} {...props} />
    );
    
export type UpdateArchSiteProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateArchSiteMutation, UpdateArchSiteMutationVariables> & TChildProps;
export function withUpdateArchSite<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateArchSiteMutation,
  UpdateArchSiteMutationVariables,
  UpdateArchSiteProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateArchSiteMutation, UpdateArchSiteMutationVariables, UpdateArchSiteProps<TChildProps>>(UpdateArchSiteDocument, {
      alias: 'updateArchSite',
      ...operationOptions
    });
};
export type UpdateArchSiteMutationResult = ApolloReactCommon.MutationResult<UpdateArchSiteMutation>;
export type UpdateArchSiteMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateArchSiteMutation, UpdateArchSiteMutationVariables>;
export const UpdateRestaurantDocument = gql`
    mutation updateRestaurant($restaurantID: Int, $locationID: Int, $addressID: Int, $restaurant: Restaurant_set_input!, $restaurantLocation: Location_set_input!, $restaurantAddress: Address_set_input!) {
  __typename
  update_Restaurant(where: {restaurantID: {_eq: $restaurantID}}, _set: $restaurant) {
    returning {
      restaurantID
    }
  }
  update_Location(where: {locationID: {_eq: $locationID}}, _set: $restaurantLocation) {
    returning {
      locationID
    }
  }
  update_Address(where: {addressID: {_eq: $addressID}}, _set: $restaurantAddress) {
    returning {
      addressID
    }
  }
}
    `;
export type UpdateRestaurantMutationFn = ApolloReactCommon.MutationFunction<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>;
export type UpdateRestaurantComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>, 'mutation'>;

    export const UpdateRestaurantComponent = (props: UpdateRestaurantComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateRestaurantMutation, UpdateRestaurantMutationVariables> mutation={UpdateRestaurantDocument} {...props} />
    );
    
export type UpdateRestaurantProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateRestaurantMutation, UpdateRestaurantMutationVariables> & TChildProps;
export function withUpdateRestaurant<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateRestaurantMutation,
  UpdateRestaurantMutationVariables,
  UpdateRestaurantProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateRestaurantMutation, UpdateRestaurantMutationVariables, UpdateRestaurantProps<TChildProps>>(UpdateRestaurantDocument, {
      alias: 'updateRestaurant',
      ...operationOptions
    });
};
export type UpdateRestaurantMutationResult = ApolloReactCommon.MutationResult<UpdateRestaurantMutation>;
export type UpdateRestaurantMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>;
export const DeleteHotelDocument = gql`
    mutation deleteHotel($hotelID: Int) {
  __typename
  update_Hotel(where: {hotelID: {_eq: $hotelID}}, _set: {isDeleted: true}) {
    returning {
      hotelID
    }
  }
}
    `;
export type DeleteHotelMutationFn = ApolloReactCommon.MutationFunction<DeleteHotelMutation, DeleteHotelMutationVariables>;
export type DeleteHotelComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteHotelMutation, DeleteHotelMutationVariables>, 'mutation'>;

    export const DeleteHotelComponent = (props: DeleteHotelComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteHotelMutation, DeleteHotelMutationVariables> mutation={DeleteHotelDocument} {...props} />
    );
    
export type DeleteHotelProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteHotelMutation, DeleteHotelMutationVariables> & TChildProps;
export function withDeleteHotel<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteHotelMutation,
  DeleteHotelMutationVariables,
  DeleteHotelProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteHotelMutation, DeleteHotelMutationVariables, DeleteHotelProps<TChildProps>>(DeleteHotelDocument, {
      alias: 'deleteHotel',
      ...operationOptions
    });
};
export type DeleteHotelMutationResult = ApolloReactCommon.MutationResult<DeleteHotelMutation>;
export type DeleteHotelMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteHotelMutation, DeleteHotelMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation deleteArticle($articleID: Int) {
  __typename
  update_Article(where: {articleID: {_eq: $articleID}}, _set: {isDeleted: true}) {
    returning {
      articleID
    }
  }
}
    `;
export type DeleteArticleMutationFn = ApolloReactCommon.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;
export type DeleteArticleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteArticleMutation, DeleteArticleMutationVariables>, 'mutation'>;

    export const DeleteArticleComponent = (props: DeleteArticleComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteArticleMutation, DeleteArticleMutationVariables> mutation={DeleteArticleDocument} {...props} />
    );
    
export type DeleteArticleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteArticleMutation, DeleteArticleMutationVariables> & TChildProps;
export function withDeleteArticle<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteArticleMutation,
  DeleteArticleMutationVariables,
  DeleteArticleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteArticleMutation, DeleteArticleMutationVariables, DeleteArticleProps<TChildProps>>(DeleteArticleDocument, {
      alias: 'deleteArticle',
      ...operationOptions
    });
};
export type DeleteArticleMutationResult = ApolloReactCommon.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const DeleteMuseumDocument = gql`
    mutation deleteMuseum($museumID: Int) {
  __typename
  update_Museum(where: {museumID: {_eq: $museumID}}, _set: {isDeleted: true}) {
    returning {
      museumID
    }
  }
}
    `;
export type DeleteMuseumMutationFn = ApolloReactCommon.MutationFunction<DeleteMuseumMutation, DeleteMuseumMutationVariables>;
export type DeleteMuseumComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteMuseumMutation, DeleteMuseumMutationVariables>, 'mutation'>;

    export const DeleteMuseumComponent = (props: DeleteMuseumComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteMuseumMutation, DeleteMuseumMutationVariables> mutation={DeleteMuseumDocument} {...props} />
    );
    
export type DeleteMuseumProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteMuseumMutation, DeleteMuseumMutationVariables> & TChildProps;
export function withDeleteMuseum<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteMuseumMutation,
  DeleteMuseumMutationVariables,
  DeleteMuseumProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteMuseumMutation, DeleteMuseumMutationVariables, DeleteMuseumProps<TChildProps>>(DeleteMuseumDocument, {
      alias: 'deleteMuseum',
      ...operationOptions
    });
};
export type DeleteMuseumMutationResult = ApolloReactCommon.MutationResult<DeleteMuseumMutation>;
export type DeleteMuseumMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMuseumMutation, DeleteMuseumMutationVariables>;
export const DeleteArchSiteDocument = gql`
    mutation deleteArchSite($archSiteID: Int) {
  __typename
  update_ArchSite(where: {archSiteID: {_eq: $archSiteID}}, _set: {isDeleted: true}) {
    returning {
      archSiteID
    }
  }
}
    `;
export type DeleteArchSiteMutationFn = ApolloReactCommon.MutationFunction<DeleteArchSiteMutation, DeleteArchSiteMutationVariables>;
export type DeleteArchSiteComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteArchSiteMutation, DeleteArchSiteMutationVariables>, 'mutation'>;

    export const DeleteArchSiteComponent = (props: DeleteArchSiteComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteArchSiteMutation, DeleteArchSiteMutationVariables> mutation={DeleteArchSiteDocument} {...props} />
    );
    
export type DeleteArchSiteProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteArchSiteMutation, DeleteArchSiteMutationVariables> & TChildProps;
export function withDeleteArchSite<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteArchSiteMutation,
  DeleteArchSiteMutationVariables,
  DeleteArchSiteProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteArchSiteMutation, DeleteArchSiteMutationVariables, DeleteArchSiteProps<TChildProps>>(DeleteArchSiteDocument, {
      alias: 'deleteArchSite',
      ...operationOptions
    });
};
export type DeleteArchSiteMutationResult = ApolloReactCommon.MutationResult<DeleteArchSiteMutation>;
export type DeleteArchSiteMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteArchSiteMutation, DeleteArchSiteMutationVariables>;
export const DeleteRestaurantDocument = gql`
    mutation deleteRestaurant($restaurantID: Int) {
  __typename
  update_Restaurant(where: {restaurantID: {_eq: $restaurantID}}, _set: {isDeleted: true}) {
    returning {
      restaurantID
    }
  }
}
    `;
export type DeleteRestaurantMutationFn = ApolloReactCommon.MutationFunction<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;
export type DeleteRestaurantComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>, 'mutation'>;

    export const DeleteRestaurantComponent = (props: DeleteRestaurantComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteRestaurantMutation, DeleteRestaurantMutationVariables> mutation={DeleteRestaurantDocument} {...props} />
    );
    
export type DeleteRestaurantProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteRestaurantMutation, DeleteRestaurantMutationVariables> & TChildProps;
export function withDeleteRestaurant<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteRestaurantMutation,
  DeleteRestaurantMutationVariables,
  DeleteRestaurantProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteRestaurantMutation, DeleteRestaurantMutationVariables, DeleteRestaurantProps<TChildProps>>(DeleteRestaurantDocument, {
      alias: 'deleteRestaurant',
      ...operationOptions
    });
};
export type DeleteRestaurantMutationResult = ApolloReactCommon.MutationResult<DeleteRestaurantMutation>;
export type DeleteRestaurantMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;
export const DeleteCompanyDocument = gql`
    mutation deleteCompany($companyID: Int) {
  __typename
  update_Company(where: {companyID: {_eq: $companyID}}, _set: {isDeleted: true}) {
    returning {
      companyID
    }
  }
}
    `;
export type DeleteCompanyMutationFn = ApolloReactCommon.MutationFunction<DeleteCompanyMutation, DeleteCompanyMutationVariables>;
export type DeleteCompanyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>, 'mutation'>;

    export const DeleteCompanyComponent = (props: DeleteCompanyComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteCompanyMutation, DeleteCompanyMutationVariables> mutation={DeleteCompanyDocument} {...props} />
    );
    
export type DeleteCompanyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteCompanyMutation, DeleteCompanyMutationVariables> & TChildProps;
export function withDeleteCompany<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteCompanyMutation,
  DeleteCompanyMutationVariables,
  DeleteCompanyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteCompanyMutation, DeleteCompanyMutationVariables, DeleteCompanyProps<TChildProps>>(DeleteCompanyDocument, {
      alias: 'deleteCompany',
      ...operationOptions
    });
};
export type DeleteCompanyMutationResult = ApolloReactCommon.MutationResult<DeleteCompanyMutation>;
export type DeleteCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>;
export const UpdateCompanyDocument = gql`
    mutation updateCompany($companyID: Int, $locationID: Int, $addressID: Int, $company: Company_set_input!, $companyLocation: Location_set_input!, $companyAddress: Address_set_input!) {
  __typename
  update_Company(where: {companyID: {_eq: $companyID}}, _set: $company) {
    returning {
      companyID
    }
  }
  update_Location(where: {locationID: {_eq: $locationID}}, _set: $companyLocation) {
    returning {
      locationID
    }
  }
  update_Address(where: {addressID: {_eq: $addressID}}, _set: $companyAddress) {
    returning {
      addressID
    }
  }
}
    `;
export type UpdateCompanyMutationFn = ApolloReactCommon.MutationFunction<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export type UpdateCompanyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>, 'mutation'>;

    export const UpdateCompanyComponent = (props: UpdateCompanyComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateCompanyMutation, UpdateCompanyMutationVariables> mutation={UpdateCompanyDocument} {...props} />
    );
    
export type UpdateCompanyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateCompanyMutation, UpdateCompanyMutationVariables> & TChildProps;
export function withUpdateCompany<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables,
  UpdateCompanyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateCompanyMutation, UpdateCompanyMutationVariables, UpdateCompanyProps<TChildProps>>(UpdateCompanyDocument, {
      alias: 'updateCompany',
      ...operationOptions
    });
};
export type UpdateCompanyMutationResult = ApolloReactCommon.MutationResult<UpdateCompanyMutation>;
export type UpdateCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const DeleteTravelGuideDocument = gql`
    mutation deleteTravelGuide($travelGuideID: Int) {
  __typename
  update_TravelGuide(where: {travelGuideID: {_eq: $travelGuideID}}, _set: {isDeleted: true}) {
    returning {
      travelGuideID
    }
  }
}
    `;
export type DeleteTravelGuideMutationFn = ApolloReactCommon.MutationFunction<DeleteTravelGuideMutation, DeleteTravelGuideMutationVariables>;
export type DeleteTravelGuideComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteTravelGuideMutation, DeleteTravelGuideMutationVariables>, 'mutation'>;

    export const DeleteTravelGuideComponent = (props: DeleteTravelGuideComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteTravelGuideMutation, DeleteTravelGuideMutationVariables> mutation={DeleteTravelGuideDocument} {...props} />
    );
    
export type DeleteTravelGuideProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteTravelGuideMutation, DeleteTravelGuideMutationVariables> & TChildProps;
export function withDeleteTravelGuide<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteTravelGuideMutation,
  DeleteTravelGuideMutationVariables,
  DeleteTravelGuideProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteTravelGuideMutation, DeleteTravelGuideMutationVariables, DeleteTravelGuideProps<TChildProps>>(DeleteTravelGuideDocument, {
      alias: 'deleteTravelGuide',
      ...operationOptions
    });
};
export type DeleteTravelGuideMutationResult = ApolloReactCommon.MutationResult<DeleteTravelGuideMutation>;
export type DeleteTravelGuideMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTravelGuideMutation, DeleteTravelGuideMutationVariables>;
export const GetTravelGuideByIdDocument = gql`
    query getTravelGuideById($travelGuideID: Int) {
  __typename
  TravelGuide(where: {isDeleted: {_eq: false}, travelGuideID: {_eq: $travelGuideID}}) {
    title
    cost
    TravelGuideArchSites {
      ArchSite {
        name
      }
    }
    TravelGuideHotels {
      Hotel {
        name
      }
    }
    TravelGuideLocations {
      Location {
        latitude
        longtitude
      }
    }
    TravelGuideMuseums {
      Museum {
        name
      }
    }
    TravelGuideRestaurants {
      Restaurant {
        name
      }
    }
  }
}
    `;
export type GetTravelGuideByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetTravelGuideByIdQuery, GetTravelGuideByIdQueryVariables>, 'query'>;

    export const GetTravelGuideByIdComponent = (props: GetTravelGuideByIdComponentProps) => (
      <ApolloReactComponents.Query<GetTravelGuideByIdQuery, GetTravelGuideByIdQueryVariables> query={GetTravelGuideByIdDocument} {...props} />
    );
    
export type GetTravelGuideByIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetTravelGuideByIdQuery, GetTravelGuideByIdQueryVariables> & TChildProps;
export function withGetTravelGuideById<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetTravelGuideByIdQuery,
  GetTravelGuideByIdQueryVariables,
  GetTravelGuideByIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetTravelGuideByIdQuery, GetTravelGuideByIdQueryVariables, GetTravelGuideByIdProps<TChildProps>>(GetTravelGuideByIdDocument, {
      alias: 'getTravelGuideById',
      ...operationOptions
    });
};
export type GetTravelGuideByIdQueryResult = ApolloReactCommon.QueryResult<GetTravelGuideByIdQuery, GetTravelGuideByIdQueryVariables>;
export const GetFoodTypesDocument = gql`
    query getFoodTypes {
  __typename
  RestaurantFoodType {
    type
    restaurantFoodTypeID
  }
}
    `;
export type GetFoodTypesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetFoodTypesQuery, GetFoodTypesQueryVariables>, 'query'>;

    export const GetFoodTypesComponent = (props: GetFoodTypesComponentProps) => (
      <ApolloReactComponents.Query<GetFoodTypesQuery, GetFoodTypesQueryVariables> query={GetFoodTypesDocument} {...props} />
    );
    
export type GetFoodTypesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetFoodTypesQuery, GetFoodTypesQueryVariables> & TChildProps;
export function withGetFoodTypes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetFoodTypesQuery,
  GetFoodTypesQueryVariables,
  GetFoodTypesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetFoodTypesQuery, GetFoodTypesQueryVariables, GetFoodTypesProps<TChildProps>>(GetFoodTypesDocument, {
      alias: 'getFoodTypes',
      ...operationOptions
    });
};
export type GetFoodTypesQueryResult = ApolloReactCommon.QueryResult<GetFoodTypesQuery, GetFoodTypesQueryVariables>;
export const GetRestaurantTypesDocument = gql`
    query getRestaurantTypes {
  __typename
  RestaurantType {
    type
    restaurantTypeID
  }
}
    `;
export type GetRestaurantTypesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetRestaurantTypesQuery, GetRestaurantTypesQueryVariables>, 'query'>;

    export const GetRestaurantTypesComponent = (props: GetRestaurantTypesComponentProps) => (
      <ApolloReactComponents.Query<GetRestaurantTypesQuery, GetRestaurantTypesQueryVariables> query={GetRestaurantTypesDocument} {...props} />
    );
    
export type GetRestaurantTypesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetRestaurantTypesQuery, GetRestaurantTypesQueryVariables> & TChildProps;
export function withGetRestaurantTypes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetRestaurantTypesQuery,
  GetRestaurantTypesQueryVariables,
  GetRestaurantTypesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetRestaurantTypesQuery, GetRestaurantTypesQueryVariables, GetRestaurantTypesProps<TChildProps>>(GetRestaurantTypesDocument, {
      alias: 'getRestaurantTypes',
      ...operationOptions
    });
};
export type GetRestaurantTypesQueryResult = ApolloReactCommon.QueryResult<GetRestaurantTypesQuery, GetRestaurantTypesQueryVariables>;
export const GetUserCompanyDocument = gql`
    query getUserCompany($userID: Int) {
  __typename
  Company(where: {isDeleted: {_eq: false}, CompanyUsers: {userID: {_eq: $userID}}}) {
    companyID
    name
    description
    faxNumber
    taxNumber
    mail
    registerDate
  }
}
    `;
export type GetUserCompanyComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserCompanyQuery, GetUserCompanyQueryVariables>, 'query'>;

    export const GetUserCompanyComponent = (props: GetUserCompanyComponentProps) => (
      <ApolloReactComponents.Query<GetUserCompanyQuery, GetUserCompanyQueryVariables> query={GetUserCompanyDocument} {...props} />
    );
    
export type GetUserCompanyProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserCompanyQuery, GetUserCompanyQueryVariables> & TChildProps;
export function withGetUserCompany<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserCompanyQuery,
  GetUserCompanyQueryVariables,
  GetUserCompanyProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserCompanyQuery, GetUserCompanyQueryVariables, GetUserCompanyProps<TChildProps>>(GetUserCompanyDocument, {
      alias: 'getUserCompany',
      ...operationOptions
    });
};
export type GetUserCompanyQueryResult = ApolloReactCommon.QueryResult<GetUserCompanyQuery, GetUserCompanyQueryVariables>;
export const GetRoomPropertyDocument = gql`
    query getRoomProperty {
  RoomProperty {
    content
    roomPropertyID
  }
}
    `;
export type GetRoomPropertyComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetRoomPropertyQuery, GetRoomPropertyQueryVariables>, 'query'>;

    export const GetRoomPropertyComponent = (props: GetRoomPropertyComponentProps) => (
      <ApolloReactComponents.Query<GetRoomPropertyQuery, GetRoomPropertyQueryVariables> query={GetRoomPropertyDocument} {...props} />
    );
    
export type GetRoomPropertyProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetRoomPropertyQuery, GetRoomPropertyQueryVariables> & TChildProps;
export function withGetRoomProperty<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetRoomPropertyQuery,
  GetRoomPropertyQueryVariables,
  GetRoomPropertyProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetRoomPropertyQuery, GetRoomPropertyQueryVariables, GetRoomPropertyProps<TChildProps>>(GetRoomPropertyDocument, {
      alias: 'getRoomProperty',
      ...operationOptions
    });
};
export type GetRoomPropertyQueryResult = ApolloReactCommon.QueryResult<GetRoomPropertyQuery, GetRoomPropertyQueryVariables>;
export const GetUserHotelDocument = gql`
    query getUserHotel($userID: Int!) {
  Hotel(where: {isDeleted: {_eq: false}, Company: {CompanyUsers: {userID: {_eq: $userID}}}}) {
    hotelID
    name
    description
    star
    Company {
      name
    }
  }
}
    `;
export type GetUserHotelComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserHotelQuery, GetUserHotelQueryVariables>, 'query'> & ({ variables: GetUserHotelQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetUserHotelComponent = (props: GetUserHotelComponentProps) => (
      <ApolloReactComponents.Query<GetUserHotelQuery, GetUserHotelQueryVariables> query={GetUserHotelDocument} {...props} />
    );
    
export type GetUserHotelProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserHotelQuery, GetUserHotelQueryVariables> & TChildProps;
export function withGetUserHotel<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserHotelQuery,
  GetUserHotelQueryVariables,
  GetUserHotelProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserHotelQuery, GetUserHotelQueryVariables, GetUserHotelProps<TChildProps>>(GetUserHotelDocument, {
      alias: 'getUserHotel',
      ...operationOptions
    });
};
export type GetUserHotelQueryResult = ApolloReactCommon.QueryResult<GetUserHotelQuery, GetUserHotelQueryVariables>;
export const GetUserArticleDocument = gql`
    query getUserArticle($userID: Int) {
  __typename
  Article(where: {isDeleted: {_eq: false}, ArticleUsers: {userID: {_eq: $userID}}}) {
    articleID
    content
    title
  }
}
    `;
export type GetUserArticleComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserArticleQuery, GetUserArticleQueryVariables>, 'query'>;

    export const GetUserArticleComponent = (props: GetUserArticleComponentProps) => (
      <ApolloReactComponents.Query<GetUserArticleQuery, GetUserArticleQueryVariables> query={GetUserArticleDocument} {...props} />
    );
    
export type GetUserArticleProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserArticleQuery, GetUserArticleQueryVariables> & TChildProps;
export function withGetUserArticle<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserArticleQuery,
  GetUserArticleQueryVariables,
  GetUserArticleProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserArticleQuery, GetUserArticleQueryVariables, GetUserArticleProps<TChildProps>>(GetUserArticleDocument, {
      alias: 'getUserArticle',
      ...operationOptions
    });
};
export type GetUserArticleQueryResult = ApolloReactCommon.QueryResult<GetUserArticleQuery, GetUserArticleQueryVariables>;
export const GetHotelServicePropertyDocument = gql`
    query getHotelServiceProperty {
  __typename
  HotelServiceProperty {
    content
    hotelServicePropertyID
  }
}
    `;
export type GetHotelServicePropertyComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHotelServicePropertyQuery, GetHotelServicePropertyQueryVariables>, 'query'>;

    export const GetHotelServicePropertyComponent = (props: GetHotelServicePropertyComponentProps) => (
      <ApolloReactComponents.Query<GetHotelServicePropertyQuery, GetHotelServicePropertyQueryVariables> query={GetHotelServicePropertyDocument} {...props} />
    );
    
export type GetHotelServicePropertyProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetHotelServicePropertyQuery, GetHotelServicePropertyQueryVariables> & TChildProps;
export function withGetHotelServiceProperty<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHotelServicePropertyQuery,
  GetHotelServicePropertyQueryVariables,
  GetHotelServicePropertyProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetHotelServicePropertyQuery, GetHotelServicePropertyQueryVariables, GetHotelServicePropertyProps<TChildProps>>(GetHotelServicePropertyDocument, {
      alias: 'getHotelServiceProperty',
      ...operationOptions
    });
};
export type GetHotelServicePropertyQueryResult = ApolloReactCommon.QueryResult<GetHotelServicePropertyQuery, GetHotelServicePropertyQueryVariables>;
export const GetHotelRoomDocument = gql`
    query getHotelRoom($hotelID: Int!) {
  __typename
  HotelRoom(where: {hotelID: {_eq: $hotelID}}) {
    roomID
    Room {
      roomNo
    }
  }
}
    `;
export type GetHotelRoomComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHotelRoomQuery, GetHotelRoomQueryVariables>, 'query'> & ({ variables: GetHotelRoomQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetHotelRoomComponent = (props: GetHotelRoomComponentProps) => (
      <ApolloReactComponents.Query<GetHotelRoomQuery, GetHotelRoomQueryVariables> query={GetHotelRoomDocument} {...props} />
    );
    
export type GetHotelRoomProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetHotelRoomQuery, GetHotelRoomQueryVariables> & TChildProps;
export function withGetHotelRoom<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHotelRoomQuery,
  GetHotelRoomQueryVariables,
  GetHotelRoomProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetHotelRoomQuery, GetHotelRoomQueryVariables, GetHotelRoomProps<TChildProps>>(GetHotelRoomDocument, {
      alias: 'getHotelRoom',
      ...operationOptions
    });
};
export type GetHotelRoomQueryResult = ApolloReactCommon.QueryResult<GetHotelRoomQuery, GetHotelRoomQueryVariables>;
export const GetArchSiteTypesDocument = gql`
    query GetArchSiteTypes {
  __typename
  ArchSiteType {
    name
    archSiteTypeID
  }
}
    `;
export type GetArchSiteTypesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetArchSiteTypesQuery, GetArchSiteTypesQueryVariables>, 'query'>;

    export const GetArchSiteTypesComponent = (props: GetArchSiteTypesComponentProps) => (
      <ApolloReactComponents.Query<GetArchSiteTypesQuery, GetArchSiteTypesQueryVariables> query={GetArchSiteTypesDocument} {...props} />
    );
    
export type GetArchSiteTypesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetArchSiteTypesQuery, GetArchSiteTypesQueryVariables> & TChildProps;
export function withGetArchSiteTypes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetArchSiteTypesQuery,
  GetArchSiteTypesQueryVariables,
  GetArchSiteTypesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetArchSiteTypesQuery, GetArchSiteTypesQueryVariables, GetArchSiteTypesProps<TChildProps>>(GetArchSiteTypesDocument, {
      alias: 'getArchSiteTypes',
      ...operationOptions
    });
};
export type GetArchSiteTypesQueryResult = ApolloReactCommon.QueryResult<GetArchSiteTypesQuery, GetArchSiteTypesQueryVariables>;
export const GetCuisineTypesDocument = gql`
    query getCuisineTypes {
  __typename
  RestaurantCuisineType {
    name
    restaurantCuisineTypeID
  }
}
    `;
export type GetCuisineTypesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCuisineTypesQuery, GetCuisineTypesQueryVariables>, 'query'>;

    export const GetCuisineTypesComponent = (props: GetCuisineTypesComponentProps) => (
      <ApolloReactComponents.Query<GetCuisineTypesQuery, GetCuisineTypesQueryVariables> query={GetCuisineTypesDocument} {...props} />
    );
    
export type GetCuisineTypesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetCuisineTypesQuery, GetCuisineTypesQueryVariables> & TChildProps;
export function withGetCuisineTypes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCuisineTypesQuery,
  GetCuisineTypesQueryVariables,
  GetCuisineTypesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetCuisineTypesQuery, GetCuisineTypesQueryVariables, GetCuisineTypesProps<TChildProps>>(GetCuisineTypesDocument, {
      alias: 'getCuisineTypes',
      ...operationOptions
    });
};
export type GetCuisineTypesQueryResult = ApolloReactCommon.QueryResult<GetCuisineTypesQuery, GetCuisineTypesQueryVariables>;
export const GetMuseumTypesDocument = gql`
    query getMuseumTypes {
  __typename
  MuseumType {
    museumTypeID
    type
  }
}
    `;
export type GetMuseumTypesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMuseumTypesQuery, GetMuseumTypesQueryVariables>, 'query'>;

    export const GetMuseumTypesComponent = (props: GetMuseumTypesComponentProps) => (
      <ApolloReactComponents.Query<GetMuseumTypesQuery, GetMuseumTypesQueryVariables> query={GetMuseumTypesDocument} {...props} />
    );
    
export type GetMuseumTypesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMuseumTypesQuery, GetMuseumTypesQueryVariables> & TChildProps;
export function withGetMuseumTypes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMuseumTypesQuery,
  GetMuseumTypesQueryVariables,
  GetMuseumTypesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMuseumTypesQuery, GetMuseumTypesQueryVariables, GetMuseumTypesProps<TChildProps>>(GetMuseumTypesDocument, {
      alias: 'getMuseumTypes',
      ...operationOptions
    });
};
export type GetMuseumTypesQueryResult = ApolloReactCommon.QueryResult<GetMuseumTypesQuery, GetMuseumTypesQueryVariables>;
export const GetHotelLocationDocument = gql`
    query getHotelLocation {
  Hotel {
    Location {
      latitude
      longtitude
      Address {
        address
      }
    }
    name
    locationID
    hotelID
  }
}
    `;
export type GetHotelLocationComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHotelLocationQuery, GetHotelLocationQueryVariables>, 'query'>;

    export const GetHotelLocationComponent = (props: GetHotelLocationComponentProps) => (
      <ApolloReactComponents.Query<GetHotelLocationQuery, GetHotelLocationQueryVariables> query={GetHotelLocationDocument} {...props} />
    );
    
export type GetHotelLocationProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetHotelLocationQuery, GetHotelLocationQueryVariables> & TChildProps;
export function withGetHotelLocation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHotelLocationQuery,
  GetHotelLocationQueryVariables,
  GetHotelLocationProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetHotelLocationQuery, GetHotelLocationQueryVariables, GetHotelLocationProps<TChildProps>>(GetHotelLocationDocument, {
      alias: 'getHotelLocation',
      ...operationOptions
    });
};
export type GetHotelLocationQueryResult = ApolloReactCommon.QueryResult<GetHotelLocationQuery, GetHotelLocationQueryVariables>;
export const GetArchSiteLocationDocument = gql`
    query getArchSiteLocation($cityID: Int!, $archSiteEntranceTypeID: Int, $priceDate: timestamptz, $archSiteTypeIDs: [Int!]) {
  ArchSite(where: {Location: {Address: {City: {cityID: {_eq: $cityID}}}}, ArchSitePrices: {archSiteEntranceTypeID: {_eq: $archSiteEntranceTypeID}, finishDate: {_gte: $priceDate}}, ArchSiteTypeArchSites: {archSiteTypeID: {_in: $archSiteTypeIDs}}}) {
    Location {
      latitude
      longtitude
      Address {
        address
      }
    }
    name
    locationID
    archSiteID
    age
    ArchSitePrices {
      price
      finishDate
      archSiteEntranceTypeID
    }
    ArchSiteTypeArchSites {
      archSiteTypeID
    }
    diameter
  }
}
    `;
export type GetArchSiteLocationComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetArchSiteLocationQuery, GetArchSiteLocationQueryVariables>, 'query'> & ({ variables: GetArchSiteLocationQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetArchSiteLocationComponent = (props: GetArchSiteLocationComponentProps) => (
      <ApolloReactComponents.Query<GetArchSiteLocationQuery, GetArchSiteLocationQueryVariables> query={GetArchSiteLocationDocument} {...props} />
    );
    
export type GetArchSiteLocationProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetArchSiteLocationQuery, GetArchSiteLocationQueryVariables> & TChildProps;
export function withGetArchSiteLocation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetArchSiteLocationQuery,
  GetArchSiteLocationQueryVariables,
  GetArchSiteLocationProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetArchSiteLocationQuery, GetArchSiteLocationQueryVariables, GetArchSiteLocationProps<TChildProps>>(GetArchSiteLocationDocument, {
      alias: 'getArchSiteLocation',
      ...operationOptions
    });
};
export type GetArchSiteLocationQueryResult = ApolloReactCommon.QueryResult<GetArchSiteLocationQuery, GetArchSiteLocationQueryVariables>;
export const GetMuseumLocationDocument = gql`
    query getMuseumLocation($cityID: Int!, $museumEntranceTypeID: Int, $priceDate: timestamptz, $museumTypeIDs: [Int!]) {
  Museum(where: {Location: {Address: {City: {cityID: {_eq: $cityID}}}}, MuseumPrices: {entranceTypeID: {_eq: $museumEntranceTypeID}, finishDate: {_gte: $priceDate}}, MuseumTypeMuseums: {museumTypeID: {_in: $museumTypeIDs}}}) {
    Location {
      latitude
      longtitude
      Address {
        address
      }
    }
    MuseumPrices {
      price
      finishDate
      entranceTypeID
    }
    name
    locationID
    museumID
  }
}
    `;
export type GetMuseumLocationComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMuseumLocationQuery, GetMuseumLocationQueryVariables>, 'query'> & ({ variables: GetMuseumLocationQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetMuseumLocationComponent = (props: GetMuseumLocationComponentProps) => (
      <ApolloReactComponents.Query<GetMuseumLocationQuery, GetMuseumLocationQueryVariables> query={GetMuseumLocationDocument} {...props} />
    );
    
export type GetMuseumLocationProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMuseumLocationQuery, GetMuseumLocationQueryVariables> & TChildProps;
export function withGetMuseumLocation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMuseumLocationQuery,
  GetMuseumLocationQueryVariables,
  GetMuseumLocationProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMuseumLocationQuery, GetMuseumLocationQueryVariables, GetMuseumLocationProps<TChildProps>>(GetMuseumLocationDocument, {
      alias: 'getMuseumLocation',
      ...operationOptions
    });
};
export type GetMuseumLocationQueryResult = ApolloReactCommon.QueryResult<GetMuseumLocationQuery, GetMuseumLocationQueryVariables>;
export const GetRestaurantLocationDocument = gql`
    query getRestaurantLocation {
  Restaurant {
    Location {
      latitude
      longtitude
      Address {
        address
      }
    }
    name
    locationID
    restaurantID
  }
}
    `;
export type GetRestaurantLocationComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetRestaurantLocationQuery, GetRestaurantLocationQueryVariables>, 'query'>;

    export const GetRestaurantLocationComponent = (props: GetRestaurantLocationComponentProps) => (
      <ApolloReactComponents.Query<GetRestaurantLocationQuery, GetRestaurantLocationQueryVariables> query={GetRestaurantLocationDocument} {...props} />
    );
    
export type GetRestaurantLocationProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetRestaurantLocationQuery, GetRestaurantLocationQueryVariables> & TChildProps;
export function withGetRestaurantLocation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetRestaurantLocationQuery,
  GetRestaurantLocationQueryVariables,
  GetRestaurantLocationProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetRestaurantLocationQuery, GetRestaurantLocationQueryVariables, GetRestaurantLocationProps<TChildProps>>(GetRestaurantLocationDocument, {
      alias: 'getRestaurantLocation',
      ...operationOptions
    });
};
export type GetRestaurantLocationQueryResult = ApolloReactCommon.QueryResult<GetRestaurantLocationQuery, GetRestaurantLocationQueryVariables>;
export const GetDayDocument = gql`
    query getDay {
  __typename
  Day {
    dayID
    name
  }
}
    `;
export type GetDayComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetDayQuery, GetDayQueryVariables>, 'query'>;

    export const GetDayComponent = (props: GetDayComponentProps) => (
      <ApolloReactComponents.Query<GetDayQuery, GetDayQueryVariables> query={GetDayDocument} {...props} />
    );
    
export type GetDayProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetDayQuery, GetDayQueryVariables> & TChildProps;
export function withGetDay<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetDayQuery,
  GetDayQueryVariables,
  GetDayProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetDayQuery, GetDayQueryVariables, GetDayProps<TChildProps>>(GetDayDocument, {
      alias: 'getDay',
      ...operationOptions
    });
};
export type GetDayQueryResult = ApolloReactCommon.QueryResult<GetDayQuery, GetDayQueryVariables>;
export const GetUserArchSiteDocument = gql`
    query getUserArchSite($userID: Int) {
  __typename
  ArchSite(where: {isDeleted: {_eq: false}, Company: {CompanyUsers: {userID: {_eq: $userID}}}}) {
    Company {
      name
    }
    description
    name
    archSiteID
  }
}
    `;
export type GetUserArchSiteComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserArchSiteQuery, GetUserArchSiteQueryVariables>, 'query'>;

    export const GetUserArchSiteComponent = (props: GetUserArchSiteComponentProps) => (
      <ApolloReactComponents.Query<GetUserArchSiteQuery, GetUserArchSiteQueryVariables> query={GetUserArchSiteDocument} {...props} />
    );
    
export type GetUserArchSiteProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserArchSiteQuery, GetUserArchSiteQueryVariables> & TChildProps;
export function withGetUserArchSite<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserArchSiteQuery,
  GetUserArchSiteQueryVariables,
  GetUserArchSiteProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserArchSiteQuery, GetUserArchSiteQueryVariables, GetUserArchSiteProps<TChildProps>>(GetUserArchSiteDocument, {
      alias: 'getUserArchSite',
      ...operationOptions
    });
};
export type GetUserArchSiteQueryResult = ApolloReactCommon.QueryResult<GetUserArchSiteQuery, GetUserArchSiteQueryVariables>;
export const GetUserMuseumDocument = gql`
    query getUserMuseum($userID: Int) {
  __typename
  Museum(where: {isDeleted: {_eq: false}, Company: {CompanyUsers: {userID: {_eq: $userID}}}}) {
    Company {
      name
    }
    description
    name
    museumID
  }
}
    `;
export type GetUserMuseumComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserMuseumQuery, GetUserMuseumQueryVariables>, 'query'>;

    export const GetUserMuseumComponent = (props: GetUserMuseumComponentProps) => (
      <ApolloReactComponents.Query<GetUserMuseumQuery, GetUserMuseumQueryVariables> query={GetUserMuseumDocument} {...props} />
    );
    
export type GetUserMuseumProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserMuseumQuery, GetUserMuseumQueryVariables> & TChildProps;
export function withGetUserMuseum<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserMuseumQuery,
  GetUserMuseumQueryVariables,
  GetUserMuseumProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserMuseumQuery, GetUserMuseumQueryVariables, GetUserMuseumProps<TChildProps>>(GetUserMuseumDocument, {
      alias: 'getUserMuseum',
      ...operationOptions
    });
};
export type GetUserMuseumQueryResult = ApolloReactCommon.QueryResult<GetUserMuseumQuery, GetUserMuseumQueryVariables>;
export const GetUserRestaurantDocument = gql`
    query getUserRestaurant($userID: Int) {
  __typename
  Restaurant(where: {isDeleted: {_eq: false}, Company: {CompanyUsers: {userID: {_eq: $userID}}}}) {
    restaurantID
    name
    star
    Company {
      name
    }
  }
}
    `;
export type GetUserRestaurantComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserRestaurantQuery, GetUserRestaurantQueryVariables>, 'query'>;

    export const GetUserRestaurantComponent = (props: GetUserRestaurantComponentProps) => (
      <ApolloReactComponents.Query<GetUserRestaurantQuery, GetUserRestaurantQueryVariables> query={GetUserRestaurantDocument} {...props} />
    );
    
export type GetUserRestaurantProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserRestaurantQuery, GetUserRestaurantQueryVariables> & TChildProps;
export function withGetUserRestaurant<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserRestaurantQuery,
  GetUserRestaurantQueryVariables,
  GetUserRestaurantProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserRestaurantQuery, GetUserRestaurantQueryVariables, GetUserRestaurantProps<TChildProps>>(GetUserRestaurantDocument, {
      alias: 'getUserRestaurant',
      ...operationOptions
    });
};
export type GetUserRestaurantQueryResult = ApolloReactCommon.QueryResult<GetUserRestaurantQuery, GetUserRestaurantQueryVariables>;
export const GetArchSiteEntranceTypesDocument = gql`
    query getArchSiteEntranceTypes {
  __typename
  ArchSiteEntranceType {
    archSiteEntranceTypeID
    content
  }
}
    `;
export type GetArchSiteEntranceTypesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetArchSiteEntranceTypesQuery, GetArchSiteEntranceTypesQueryVariables>, 'query'>;

    export const GetArchSiteEntranceTypesComponent = (props: GetArchSiteEntranceTypesComponentProps) => (
      <ApolloReactComponents.Query<GetArchSiteEntranceTypesQuery, GetArchSiteEntranceTypesQueryVariables> query={GetArchSiteEntranceTypesDocument} {...props} />
    );
    
export type GetArchSiteEntranceTypesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetArchSiteEntranceTypesQuery, GetArchSiteEntranceTypesQueryVariables> & TChildProps;
export function withGetArchSiteEntranceTypes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetArchSiteEntranceTypesQuery,
  GetArchSiteEntranceTypesQueryVariables,
  GetArchSiteEntranceTypesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetArchSiteEntranceTypesQuery, GetArchSiteEntranceTypesQueryVariables, GetArchSiteEntranceTypesProps<TChildProps>>(GetArchSiteEntranceTypesDocument, {
      alias: 'getArchSiteEntranceTypes',
      ...operationOptions
    });
};
export type GetArchSiteEntranceTypesQueryResult = ApolloReactCommon.QueryResult<GetArchSiteEntranceTypesQuery, GetArchSiteEntranceTypesQueryVariables>;
export const GetMuseumEntranceTypesDocument = gql`
    query getMuseumEntranceTypes {
  __typename
  MuseumEntranceType {
    content
    museumEntranceTypeID
  }
}
    `;
export type GetMuseumEntranceTypesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMuseumEntranceTypesQuery, GetMuseumEntranceTypesQueryVariables>, 'query'>;

    export const GetMuseumEntranceTypesComponent = (props: GetMuseumEntranceTypesComponentProps) => (
      <ApolloReactComponents.Query<GetMuseumEntranceTypesQuery, GetMuseumEntranceTypesQueryVariables> query={GetMuseumEntranceTypesDocument} {...props} />
    );
    
export type GetMuseumEntranceTypesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMuseumEntranceTypesQuery, GetMuseumEntranceTypesQueryVariables> & TChildProps;
export function withGetMuseumEntranceTypes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMuseumEntranceTypesQuery,
  GetMuseumEntranceTypesQueryVariables,
  GetMuseumEntranceTypesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMuseumEntranceTypesQuery, GetMuseumEntranceTypesQueryVariables, GetMuseumEntranceTypesProps<TChildProps>>(GetMuseumEntranceTypesDocument, {
      alias: 'getMuseumEntranceTypes',
      ...operationOptions
    });
};
export type GetMuseumEntranceTypesQueryResult = ApolloReactCommon.QueryResult<GetMuseumEntranceTypesQuery, GetMuseumEntranceTypesQueryVariables>;
export const GetFoodDocument = gql`
    query getFood {
  __typename
  RestaurantFood {
    name
    restaurantFoodID
  }
}
    `;
export type GetFoodComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetFoodQuery, GetFoodQueryVariables>, 'query'>;

    export const GetFoodComponent = (props: GetFoodComponentProps) => (
      <ApolloReactComponents.Query<GetFoodQuery, GetFoodQueryVariables> query={GetFoodDocument} {...props} />
    );
    
export type GetFoodProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetFoodQuery, GetFoodQueryVariables> & TChildProps;
export function withGetFood<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetFoodQuery,
  GetFoodQueryVariables,
  GetFoodProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetFoodQuery, GetFoodQueryVariables, GetFoodProps<TChildProps>>(GetFoodDocument, {
      alias: 'getFood',
      ...operationOptions
    });
};
export type GetFoodQueryResult = ApolloReactCommon.QueryResult<GetFoodQuery, GetFoodQueryVariables>;
export const GetTagsDocument = gql`
    query getTags {
  __typename
  Tag {
    name
    tagID
  }
}
    `;
export type GetTagsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetTagsQuery, GetTagsQueryVariables>, 'query'>;

    export const GetTagsComponent = (props: GetTagsComponentProps) => (
      <ApolloReactComponents.Query<GetTagsQuery, GetTagsQueryVariables> query={GetTagsDocument} {...props} />
    );
    
export type GetTagsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetTagsQuery, GetTagsQueryVariables> & TChildProps;
export function withGetTags<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetTagsQuery,
  GetTagsQueryVariables,
  GetTagsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetTagsQuery, GetTagsQueryVariables, GetTagsProps<TChildProps>>(GetTagsDocument, {
      alias: 'getTags',
      ...operationOptions
    });
};
export type GetTagsQueryResult = ApolloReactCommon.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const GetCitiesDocument = gql`
    query getCities {
  __typename
  City(where: {Country: {countryID: {_eq: 1}}}) {
    cityID
    city
  }
}
    `;
export type GetCitiesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCitiesQuery, GetCitiesQueryVariables>, 'query'>;

    export const GetCitiesComponent = (props: GetCitiesComponentProps) => (
      <ApolloReactComponents.Query<GetCitiesQuery, GetCitiesQueryVariables> query={GetCitiesDocument} {...props} />
    );
    
export type GetCitiesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetCitiesQuery, GetCitiesQueryVariables> & TChildProps;
export function withGetCities<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCitiesQuery,
  GetCitiesQueryVariables,
  GetCitiesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetCitiesQuery, GetCitiesQueryVariables, GetCitiesProps<TChildProps>>(GetCitiesDocument, {
      alias: 'getCities',
      ...operationOptions
    });
};
export type GetCitiesQueryResult = ApolloReactCommon.QueryResult<GetCitiesQuery, GetCitiesQueryVariables>;
export const GetCityDistrictsDocument = gql`
    query getCityDistricts($cityID: Int!) {
  __typename
  District(where: {cityID: {_eq: $cityID}}) {
    district
    districtID
  }
}
    `;
export type GetCityDistrictsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCityDistrictsQuery, GetCityDistrictsQueryVariables>, 'query'> & ({ variables: GetCityDistrictsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetCityDistrictsComponent = (props: GetCityDistrictsComponentProps) => (
      <ApolloReactComponents.Query<GetCityDistrictsQuery, GetCityDistrictsQueryVariables> query={GetCityDistrictsDocument} {...props} />
    );
    
export type GetCityDistrictsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetCityDistrictsQuery, GetCityDistrictsQueryVariables> & TChildProps;
export function withGetCityDistricts<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCityDistrictsQuery,
  GetCityDistrictsQueryVariables,
  GetCityDistrictsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetCityDistrictsQuery, GetCityDistrictsQueryVariables, GetCityDistrictsProps<TChildProps>>(GetCityDistrictsDocument, {
      alias: 'getCityDistricts',
      ...operationOptions
    });
};
export type GetCityDistrictsQueryResult = ApolloReactCommon.QueryResult<GetCityDistrictsQuery, GetCityDistrictsQueryVariables>;
export const GetHotelListInfoDocument = gql`
    query getHotelListInfo {
  __typename
  Hotel(where: {isDeleted: {_eq: false}}) {
    description
    name
    star
    Company {
      name
    }
  }
}
    `;
export type GetHotelListInfoComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHotelListInfoQuery, GetHotelListInfoQueryVariables>, 'query'>;

    export const GetHotelListInfoComponent = (props: GetHotelListInfoComponentProps) => (
      <ApolloReactComponents.Query<GetHotelListInfoQuery, GetHotelListInfoQueryVariables> query={GetHotelListInfoDocument} {...props} />
    );
    
export type GetHotelListInfoProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetHotelListInfoQuery, GetHotelListInfoQueryVariables> & TChildProps;
export function withGetHotelListInfo<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHotelListInfoQuery,
  GetHotelListInfoQueryVariables,
  GetHotelListInfoProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetHotelListInfoQuery, GetHotelListInfoQueryVariables, GetHotelListInfoProps<TChildProps>>(GetHotelListInfoDocument, {
      alias: 'getHotelListInfo',
      ...operationOptions
    });
};
export type GetHotelListInfoQueryResult = ApolloReactCommon.QueryResult<GetHotelListInfoQuery, GetHotelListInfoQueryVariables>;
export const GetHotelByIdDocument = gql`
    query getHotelByID($hotelID: Int) {
  __typename
  Hotel(where: {hotelID: {_eq: $hotelID}}) {
    description
    name
    star
    taxNumber
    locationID
    Location {
      addressID
      Address {
        City {
          city
        }
        District {
          district
        }
        address
        cityID
        districtID
      }
      latitude
      longtitude
    }
    companyID
    Company {
      CompanyPhones {
        Phone {
          phone
        }
      }
    }
  }
}
    `;
export type GetHotelByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHotelByIdQuery, GetHotelByIdQueryVariables>, 'query'>;

    export const GetHotelByIdComponent = (props: GetHotelByIdComponentProps) => (
      <ApolloReactComponents.Query<GetHotelByIdQuery, GetHotelByIdQueryVariables> query={GetHotelByIdDocument} {...props} />
    );
    
export type GetHotelByIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetHotelByIdQuery, GetHotelByIdQueryVariables> & TChildProps;
export function withGetHotelById<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHotelByIdQuery,
  GetHotelByIdQueryVariables,
  GetHotelByIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetHotelByIdQuery, GetHotelByIdQueryVariables, GetHotelByIdProps<TChildProps>>(GetHotelByIdDocument, {
      alias: 'getHotelById',
      ...operationOptions
    });
};
export type GetHotelByIdQueryResult = ApolloReactCommon.QueryResult<GetHotelByIdQuery, GetHotelByIdQueryVariables>;
export const GetArticleByIdDocument = gql`
    query getArticleByID($articleID: Int) {
  __typename
  Article(where: {articleID: {_eq: $articleID}}) {
    articleID
    content
    title
  }
}
    `;
export type GetArticleByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetArticleByIdQuery, GetArticleByIdQueryVariables>, 'query'>;

    export const GetArticleByIdComponent = (props: GetArticleByIdComponentProps) => (
      <ApolloReactComponents.Query<GetArticleByIdQuery, GetArticleByIdQueryVariables> query={GetArticleByIdDocument} {...props} />
    );
    
export type GetArticleByIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetArticleByIdQuery, GetArticleByIdQueryVariables> & TChildProps;
export function withGetArticleById<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetArticleByIdQuery,
  GetArticleByIdQueryVariables,
  GetArticleByIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetArticleByIdQuery, GetArticleByIdQueryVariables, GetArticleByIdProps<TChildProps>>(GetArticleByIdDocument, {
      alias: 'getArticleById',
      ...operationOptions
    });
};
export type GetArticleByIdQueryResult = ApolloReactCommon.QueryResult<GetArticleByIdQuery, GetArticleByIdQueryVariables>;
export const GetMuseumByIdDocument = gql`
    query getMuseumByID($museumID: Int) {
  __typename
  Museum(where: {museumID: {_eq: $museumID}}) {
    description
    name
    locationID
    Location {
      addressID
      Address {
        address
        cityID
        districtID
      }
      latitude
      longtitude
    }
    companyID
  }
}
    `;
export type GetMuseumByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMuseumByIdQuery, GetMuseumByIdQueryVariables>, 'query'>;

    export const GetMuseumByIdComponent = (props: GetMuseumByIdComponentProps) => (
      <ApolloReactComponents.Query<GetMuseumByIdQuery, GetMuseumByIdQueryVariables> query={GetMuseumByIdDocument} {...props} />
    );
    
export type GetMuseumByIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMuseumByIdQuery, GetMuseumByIdQueryVariables> & TChildProps;
export function withGetMuseumById<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMuseumByIdQuery,
  GetMuseumByIdQueryVariables,
  GetMuseumByIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMuseumByIdQuery, GetMuseumByIdQueryVariables, GetMuseumByIdProps<TChildProps>>(GetMuseumByIdDocument, {
      alias: 'getMuseumById',
      ...operationOptions
    });
};
export type GetMuseumByIdQueryResult = ApolloReactCommon.QueryResult<GetMuseumByIdQuery, GetMuseumByIdQueryVariables>;
export const GetArchSiteByIdDocument = gql`
    query getArchSiteByID($archSiteID: Int) {
  __typename
  ArchSite(where: {archSiteID: {_eq: $archSiteID}}) {
    description
    name
    locationID
    Location {
      addressID
      Address {
        address
        cityID
        districtID
      }
      latitude
      longtitude
    }
    companyID
    age
    altitude
    destruction
    diameter
    period
  }
}
    `;
export type GetArchSiteByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetArchSiteByIdQuery, GetArchSiteByIdQueryVariables>, 'query'>;

    export const GetArchSiteByIdComponent = (props: GetArchSiteByIdComponentProps) => (
      <ApolloReactComponents.Query<GetArchSiteByIdQuery, GetArchSiteByIdQueryVariables> query={GetArchSiteByIdDocument} {...props} />
    );
    
export type GetArchSiteByIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetArchSiteByIdQuery, GetArchSiteByIdQueryVariables> & TChildProps;
export function withGetArchSiteById<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetArchSiteByIdQuery,
  GetArchSiteByIdQueryVariables,
  GetArchSiteByIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetArchSiteByIdQuery, GetArchSiteByIdQueryVariables, GetArchSiteByIdProps<TChildProps>>(GetArchSiteByIdDocument, {
      alias: 'getArchSiteById',
      ...operationOptions
    });
};
export type GetArchSiteByIdQueryResult = ApolloReactCommon.QueryResult<GetArchSiteByIdQuery, GetArchSiteByIdQueryVariables>;
export const GetCompanyByIdDocument = gql`
    query getCompanyByID($companyID: Int) {
  __typename
  Company(where: {companyID: {_eq: $companyID}}) {
    name
    taxNumber
    mail
    registerDate
    logoUrl
    description
    locationID
    Location {
      addressID
      Address {
        address
        cityID
        districtID
      }
      latitude
      longtitude
    }
    companyID
  }
}
    `;
export type GetCompanyByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>, 'query'>;

    export const GetCompanyByIdComponent = (props: GetCompanyByIdComponentProps) => (
      <ApolloReactComponents.Query<GetCompanyByIdQuery, GetCompanyByIdQueryVariables> query={GetCompanyByIdDocument} {...props} />
    );
    
export type GetCompanyByIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetCompanyByIdQuery, GetCompanyByIdQueryVariables> & TChildProps;
export function withGetCompanyById<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCompanyByIdQuery,
  GetCompanyByIdQueryVariables,
  GetCompanyByIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetCompanyByIdQuery, GetCompanyByIdQueryVariables, GetCompanyByIdProps<TChildProps>>(GetCompanyByIdDocument, {
      alias: 'getCompanyById',
      ...operationOptions
    });
};
export type GetCompanyByIdQueryResult = ApolloReactCommon.QueryResult<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>;
export const GetArticleListDocument = gql`
    query getArticleList {
  __typename
  Article {
    articleID
    content
    publishDate
    title
    imageUrl
  }
}
    `;
export type GetArticleListComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetArticleListQuery, GetArticleListQueryVariables>, 'query'>;

    export const GetArticleListComponent = (props: GetArticleListComponentProps) => (
      <ApolloReactComponents.Query<GetArticleListQuery, GetArticleListQueryVariables> query={GetArticleListDocument} {...props} />
    );
    
export type GetArticleListProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetArticleListQuery, GetArticleListQueryVariables> & TChildProps;
export function withGetArticleList<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetArticleListQuery,
  GetArticleListQueryVariables,
  GetArticleListProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetArticleListQuery, GetArticleListQueryVariables, GetArticleListProps<TChildProps>>(GetArticleListDocument, {
      alias: 'getArticleList',
      ...operationOptions
    });
};
export type GetArticleListQueryResult = ApolloReactCommon.QueryResult<GetArticleListQuery, GetArticleListQueryVariables>;
export const GetHotelByCityDocument = gql`
    query getHotelByCity($cityID: Int) {
  __typename
  Hotel(where: {Location: {Address: {City: {cityID: {_eq: $cityID}}}}, isDeleted: {_eq: false}}) {
    description
    name
    star
    Location {
      Address {
        City {
          city
        }
        District {
          district
        }
      }
    }
    companyID
    hotelID
  }
}
    `;
export type GetHotelByCityComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHotelByCityQuery, GetHotelByCityQueryVariables>, 'query'>;

    export const GetHotelByCityComponent = (props: GetHotelByCityComponentProps) => (
      <ApolloReactComponents.Query<GetHotelByCityQuery, GetHotelByCityQueryVariables> query={GetHotelByCityDocument} {...props} />
    );
    
export type GetHotelByCityProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetHotelByCityQuery, GetHotelByCityQueryVariables> & TChildProps;
export function withGetHotelByCity<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHotelByCityQuery,
  GetHotelByCityQueryVariables,
  GetHotelByCityProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetHotelByCityQuery, GetHotelByCityQueryVariables, GetHotelByCityProps<TChildProps>>(GetHotelByCityDocument, {
      alias: 'getHotelByCity',
      ...operationOptions
    });
};
export type GetHotelByCityQueryResult = ApolloReactCommon.QueryResult<GetHotelByCityQuery, GetHotelByCityQueryVariables>;
export const GetHotelServicesDocument = gql`
    query getHotelServices($hotelID: Int) {
  __typename
  HotelService(where: {hotelID: {_eq: $hotelID}}) {
    HotelServiceProperty {
      content
    }
  }
}
    `;
export type GetHotelServicesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHotelServicesQuery, GetHotelServicesQueryVariables>, 'query'>;

    export const GetHotelServicesComponent = (props: GetHotelServicesComponentProps) => (
      <ApolloReactComponents.Query<GetHotelServicesQuery, GetHotelServicesQueryVariables> query={GetHotelServicesDocument} {...props} />
    );
    
export type GetHotelServicesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetHotelServicesQuery, GetHotelServicesQueryVariables> & TChildProps;
export function withGetHotelServices<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHotelServicesQuery,
  GetHotelServicesQueryVariables,
  GetHotelServicesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetHotelServicesQuery, GetHotelServicesQueryVariables, GetHotelServicesProps<TChildProps>>(GetHotelServicesDocument, {
      alias: 'getHotelServices',
      ...operationOptions
    });
};
export type GetHotelServicesQueryResult = ApolloReactCommon.QueryResult<GetHotelServicesQuery, GetHotelServicesQueryVariables>;
export const GetHotelRoomsDocument = gql`
    query getHotelRooms($hotelID: Int) {
  __typename
  HotelRoom(where: {hotelID: {_eq: $hotelID}}) {
    Room {
      roomNo
      RoomPrices {
        price
      }
      RoomPropertyRooms {
        RoomProperty {
          content
        }
      }
      roomID
    }
  }
}
    `;
export type GetHotelRoomsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHotelRoomsQuery, GetHotelRoomsQueryVariables>, 'query'>;

    export const GetHotelRoomsComponent = (props: GetHotelRoomsComponentProps) => (
      <ApolloReactComponents.Query<GetHotelRoomsQuery, GetHotelRoomsQueryVariables> query={GetHotelRoomsDocument} {...props} />
    );
    
export type GetHotelRoomsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetHotelRoomsQuery, GetHotelRoomsQueryVariables> & TChildProps;
export function withGetHotelRooms<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHotelRoomsQuery,
  GetHotelRoomsQueryVariables,
  GetHotelRoomsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetHotelRoomsQuery, GetHotelRoomsQueryVariables, GetHotelRoomsProps<TChildProps>>(GetHotelRoomsDocument, {
      alias: 'getHotelRooms',
      ...operationOptions
    });
};
export type GetHotelRoomsQueryResult = ApolloReactCommon.QueryResult<GetHotelRoomsQuery, GetHotelRoomsQueryVariables>;
export const GetRestaurantByCityDocument = gql`
    query getRestaurantByCity($cityID: Int) {
  __typename
  Restaurant(where: {Location: {Address: {City: {cityID: {_eq: $cityID}}}}, isDeleted: {_eq: false}}) {
    name
    star
    Location {
      Address {
        City {
          city
        }
        District {
          district
        }
      }
    }
    companyID
    RestaurantType {
      type
    }
    restaurantID
  }
}
    `;
export type GetRestaurantByCityComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetRestaurantByCityQuery, GetRestaurantByCityQueryVariables>, 'query'>;

    export const GetRestaurantByCityComponent = (props: GetRestaurantByCityComponentProps) => (
      <ApolloReactComponents.Query<GetRestaurantByCityQuery, GetRestaurantByCityQueryVariables> query={GetRestaurantByCityDocument} {...props} />
    );
    
export type GetRestaurantByCityProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetRestaurantByCityQuery, GetRestaurantByCityQueryVariables> & TChildProps;
export function withGetRestaurantByCity<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetRestaurantByCityQuery,
  GetRestaurantByCityQueryVariables,
  GetRestaurantByCityProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetRestaurantByCityQuery, GetRestaurantByCityQueryVariables, GetRestaurantByCityProps<TChildProps>>(GetRestaurantByCityDocument, {
      alias: 'getRestaurantByCity',
      ...operationOptions
    });
};
export type GetRestaurantByCityQueryResult = ApolloReactCommon.QueryResult<GetRestaurantByCityQuery, GetRestaurantByCityQueryVariables>;
export const GetRestaurantByIdDocument = gql`
    query getRestaurantByID($restaurantID: Int) {
  __typename
  Restaurant(where: {restaurantID: {_eq: $restaurantID}}) {
    name
    star
    taxNumber
    locationID
    Location {
      addressID
      Address {
        City {
          city
        }
        District {
          district
        }
        address
        cityID
        districtID
      }
      latitude
      longtitude
    }
    companyID
    Company {
      CompanyPhones {
        Phone {
          phone
        }
      }
    }
  }
}
    `;
export type GetRestaurantByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetRestaurantByIdQuery, GetRestaurantByIdQueryVariables>, 'query'>;

    export const GetRestaurantByIdComponent = (props: GetRestaurantByIdComponentProps) => (
      <ApolloReactComponents.Query<GetRestaurantByIdQuery, GetRestaurantByIdQueryVariables> query={GetRestaurantByIdDocument} {...props} />
    );
    
export type GetRestaurantByIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetRestaurantByIdQuery, GetRestaurantByIdQueryVariables> & TChildProps;
export function withGetRestaurantById<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetRestaurantByIdQuery,
  GetRestaurantByIdQueryVariables,
  GetRestaurantByIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetRestaurantByIdQuery, GetRestaurantByIdQueryVariables, GetRestaurantByIdProps<TChildProps>>(GetRestaurantByIdDocument, {
      alias: 'getRestaurantById',
      ...operationOptions
    });
};
export type GetRestaurantByIdQueryResult = ApolloReactCommon.QueryResult<GetRestaurantByIdQuery, GetRestaurantByIdQueryVariables>;
export const GetRestaurantMenuByResIdDocument = gql`
    query getRestaurantMenuByResId($restaurantID: Int) {
  __typename
  RestaurantMenu(where: {restaurantID: {_eq: $restaurantID}}) {
    name
    price
    RestaurantMenuFoods {
      RestaurantFood {
        name
      }
    }
    restaurantMenuID
  }
}
    `;
export type GetRestaurantMenuByResIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetRestaurantMenuByResIdQuery, GetRestaurantMenuByResIdQueryVariables>, 'query'>;

    export const GetRestaurantMenuByResIdComponent = (props: GetRestaurantMenuByResIdComponentProps) => (
      <ApolloReactComponents.Query<GetRestaurantMenuByResIdQuery, GetRestaurantMenuByResIdQueryVariables> query={GetRestaurantMenuByResIdDocument} {...props} />
    );
    
export type GetRestaurantMenuByResIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetRestaurantMenuByResIdQuery, GetRestaurantMenuByResIdQueryVariables> & TChildProps;
export function withGetRestaurantMenuByResId<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetRestaurantMenuByResIdQuery,
  GetRestaurantMenuByResIdQueryVariables,
  GetRestaurantMenuByResIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetRestaurantMenuByResIdQuery, GetRestaurantMenuByResIdQueryVariables, GetRestaurantMenuByResIdProps<TChildProps>>(GetRestaurantMenuByResIdDocument, {
      alias: 'getRestaurantMenuByResId',
      ...operationOptions
    });
};
export type GetRestaurantMenuByResIdQueryResult = ApolloReactCommon.QueryResult<GetRestaurantMenuByResIdQuery, GetRestaurantMenuByResIdQueryVariables>;
export const GetUserTravelGuideDocument = gql`
    query getUserTravelGuide($userID: Int!) {
  TravelGuide(where: {userID: {_eq: $userID}, isDeleted: {_eq: false}}) {
    title
    travelGuideID
    cost
    creationDate
  }
}
    `;
export type GetUserTravelGuideComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserTravelGuideQuery, GetUserTravelGuideQueryVariables>, 'query'> & ({ variables: GetUserTravelGuideQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetUserTravelGuideComponent = (props: GetUserTravelGuideComponentProps) => (
      <ApolloReactComponents.Query<GetUserTravelGuideQuery, GetUserTravelGuideQueryVariables> query={GetUserTravelGuideDocument} {...props} />
    );
    
export type GetUserTravelGuideProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserTravelGuideQuery, GetUserTravelGuideQueryVariables> & TChildProps;
export function withGetUserTravelGuide<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserTravelGuideQuery,
  GetUserTravelGuideQueryVariables,
  GetUserTravelGuideProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserTravelGuideQuery, GetUserTravelGuideQueryVariables, GetUserTravelGuideProps<TChildProps>>(GetUserTravelGuideDocument, {
      alias: 'getUserTravelGuide',
      ...operationOptions
    });
};
export type GetUserTravelGuideQueryResult = ApolloReactCommon.QueryResult<GetUserTravelGuideQuery, GetUserTravelGuideQueryVariables>;