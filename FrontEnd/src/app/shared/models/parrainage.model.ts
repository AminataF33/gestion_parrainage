export interface ParrainagePeriod {
  startDate: Date;
  endDate: Date;
}

export interface Parrainage {
  id: number;
  electorId: string;
  candidatId: number;
  date: Date;
  region: string;
  departement: string;
  verificationCode: string;
}

export interface ParrainageStatistics {
  totalParrainages: number;
  newParrainages: number;
  regions: RegionCount[];
}

export interface RegionCount {
  name: string;
  count: number;
}