import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO, ImagemProdutoDTO } from './CriaProduto.dto';

export class AtualizaProdutoDTO {
  @IsUUID(undefined, { message: 'ID do produto inválido' })
  id: string;

  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  @IsOptional() // Permite que o campo seja opcional na atualização
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional() // Permite que o campo seja opcional na atualização
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  @IsOptional() // Permite que o campo seja opcional na atualização
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  @IsOptional() // Permite que o campo seja opcional na atualização
  quantidadeDisponivel: number;

  @IsString()
  @IsOptional() // Permite que o campo seja opcional na atualização
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdutoDTO)
  @IsOptional() // Permite que o campo seja opcional na atualização
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  @IsOptional() // Permite que o campo seja opcional na atualização
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  @IsOptional() // Permite que o campo seja opcional na atualização
  categoria: string;
}
