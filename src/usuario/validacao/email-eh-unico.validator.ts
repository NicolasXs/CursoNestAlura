import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsuarioRepository } from '../usuario.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    // Verifica se existe um usuário com o email informado
    const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(
      value,
    );
    // Retorna true se o email for único e false se já existir um usuário com esse email
    return !usuarioComEmailExiste;
  }
}

// Cria um decorator personalizado para validar se um email é único
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    // Registra o decorator com a biblioteca class-validator
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};
