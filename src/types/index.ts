export type SunExposure = 'none' | 'morning' | 'afternoon' | 'allday';

export interface FormData {
  width: string | number;
  length: string | number;
  height: string | number;
  peopleCount: string | number;
  sunExposure: SunExposure;
  customerName: string;
}