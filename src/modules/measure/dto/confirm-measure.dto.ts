import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmMeasureDto {
  @ApiProperty()
  @IsString({ message: 'o campo "measure_uuid" precisa ser uma string' })
  @IsNotEmpty({ message: 'o campo "measure_uuid" não pode estar vazio' })
  measure_uuid: string;

  @ApiProperty()
  @IsNumber({}, { message: 'o campo "confirmed_value" precisa ser um número' })
  confirmed_value: number;
}
