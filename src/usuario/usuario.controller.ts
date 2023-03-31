import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  // Cria um novo usuário
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    // Cria uma nova instância de UsuarioEntity e preenche seus campos com os dados do usuário recebidos na requisição
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid(); // Atribui um ID gerado pela biblioteca uuid

    // Salva o novo usuário no repositório
    await this.usuarioRepository.salvar(usuarioEntity);

    // Retorna uma resposta com o usuário criado e uma mensagem de sucesso
    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'usuário criado com sucesso',
    };
  }

  // Lista todos os usuários
  @Get()
  async listUsuarios() {
    // Obtém todos os usuários salvos no repositório
    const usuariosSalvos = await this.usuarioRepository.listar();
    // Transforma cada usuário em uma instância de ListaUsuarioDTO, contendo apenas seu ID e nome
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    // Retorna a lista de usuários
    return usuariosLista;
  }

  // Atualiza os dados de um usuário existente
  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    // Chama o método atualiza do repositório para atualizar os dados do usuário com o ID recebido na requisição
    const usuarioAtualizado = await this.usuarioRepository.atualiza(
      id,
      novosDados,
    );

    // Retorna uma resposta com o usuário atualizado e uma mensagem de sucesso
    return {
      usuario: usuarioAtualizado,
      mensagem: 'usuário atualizado com sucesso',
    };
  }

  // Remove um usuário existente
  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    // Chama o método remove do repositório para remover o usuário com o ID recebido na requisição
    const usuarioRemovido = await this.usuarioRepository.remove(id);

    // Retorna uma resposta com o usuário removido e uma mensagem de sucesso
    return {
      usuario: usuarioRemovido,
      mensagem: 'usuário removido com sucesso.',
    };
  }
}
