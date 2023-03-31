import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  // Método para salvar um usuário no repositório
  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  // Método para listar todos os usuários do repositório
  async listar() {
    return this.usuarios;
  }

  // Método para verificar se já existe um usuário com determinado email no repositório
  async existeComEmail(email: string) {
    return this.usuarios.some(usuario => usuario.email === email);
  }

  // Método privado que busca um usuário pelo seu id e retorna um erro caso não encontre
  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );

    if (!possivelUsuario) {
      throw new Error('Usuário não existe');
    }

    return possivelUsuario;
  }

  // Método para atualizar um usuário pelo seu id e dados de atualização
  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    // Percorre as entradas do objeto de atualização e atualiza apenas as propriedades permitidas
    for (const [chave, valor] of Object.entries(dadosDeAtualizacao)) {
      if (chave !== 'id' && chave in usuario) {
        usuario[chave] = valor;
      }
    }

    return usuario;
  }

  // Método para remover um usuário pelo seu id
  async remove(id: string) {
    const usuario = this.buscaPorId(id);

    // Filtra o array de usuários removendo o usuário com o id passado como parâmetro
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id,
    );

    return usuario;
  }
}
