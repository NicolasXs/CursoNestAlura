import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

// Define a classe DTO para as características do produto
export class CaracteristicaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome da característica não pode estar vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição da característica não pode estar vazia' })
  descricao: string;
}

// Define a classe DTO para as imagens do produto
export class ImagemProdutoDTO {
  @IsUrl(undefined, { message: 'A URL da imagem é inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição da imagem não pode estar vazia' })
  descricao: string;
}

// Define a classe DTO para criar um produto
export class CriaProdutoDTO {
  @IsUUID(undefined, { message: 'O ID do usuário é inválido' })
  usuarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do produto não pode estar vazio' })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'A quantidade mínima é inválida' })
  quantidade: number;

  @IsString()
  @IsNotEmpty({ message: 'A descrição do produto não pode estar vazia' })
  @MaxLength(1000, {
    message: 'A descrição não pode ter mais que 1000 caracteres',
  })
  descricao: string;

  // Define a validação para as características do produto
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  // Define a validação para as imagens do produto
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsNotEmpty({ message: 'A categoria do produto não pode estar vazia' })
  categoria: string;
}
