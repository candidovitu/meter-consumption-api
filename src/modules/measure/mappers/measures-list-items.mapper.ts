import { Measure } from '../entities/measure.entity';
import { MeasuresListItem } from '../entities/measures-list-response.entity';

export const measuresListItemsMapper = (
  measures: Measure[],
): MeasuresListItem[] => {
  const { PUBLIC_DOWNLOAD_ENDPOINT } = process.env;
  return measures.map((measure) => ({
    measure_uuid: measure.id,
    measure_datetime: measure.date,
    measure_type: measure.type,
    has_confirmed: measure.confirmed,
    image_url: `${PUBLIC_DOWNLOAD_ENDPOINT}/${measure.id}`,
  }));
};
