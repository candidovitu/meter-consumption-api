import { MeasureType } from './measure.entity';

export class MeasuresListItem {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: MeasureType;
  has_confirmed: boolean;
  image_url: string;
}

export class MeasuresListResponse {
  customer_code: string;
  measures: MeasuresListItem[];
}
