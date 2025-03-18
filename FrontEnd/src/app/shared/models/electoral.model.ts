export interface Elector {
  id: string;
  cinNumber: string;
  electorNumber: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  birthPlace: string;
  gender: string;
  pollingStation: string;
}

export interface ElectorError {
  uploadId: number;
  cinNumber: string;
  electorNumber: string;
  errorMessage: string;
}

export interface UploadAttempt {
  id: number;
  userId: string;
  timestamp: Date;
  ipAddress: string;
  checksum: string;
  success: boolean;
  errorMessage?: string;
}