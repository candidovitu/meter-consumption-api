import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsIn,
  IsDateString,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class UploadMeasureImageDto {
  @ApiProperty()
  @IsString({ message: 'o campo "image" precisa ser uma string' })
  @IsNotEmpty({ message: 'o campo "image" não pode estar vazio' })
  @Matches(new RegExp(/^data:image\/([A-Za-z]+);base64,(.+)$/), {
    message: 'o campo "image" precisa ser o base64 de uma imagem',
  })
  image: string;

  @ApiProperty()
  @IsString({ message: 'o campo "customer_code" precisa ser uma string' })
  @IsNotEmpty({ message: 'o campo "customer_code" não pode estar vazio' })
  customer_code: string;

  @ApiProperty()
  @IsDateString(
    {},
    {
      message:
        'o campo "measure_datetime" precisa ser uma data no formato ISO8601',
    },
  )
  measure_datetime: string;

  @ApiProperty()
  @IsString({ message: 'o campo "measure_type" precisa ser uma string' })
  @IsIn(['WATER', 'GAS'], {
    message: 'o campo "measure_type" possui um valor inesperado',
  })
  measure_type: string;
}
