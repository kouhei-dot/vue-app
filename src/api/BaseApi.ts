export interface BaseGetRes<T> {
  Count: number;
  Items: T[];
  ScannedCount: number;
}

export interface CommonProps {
  createDate: string;
  updateDate: string;
}
