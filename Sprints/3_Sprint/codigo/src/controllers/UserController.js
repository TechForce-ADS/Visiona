const { error } = require('console');
const { User} = require('../models');
const bcrypt = require('bcryptjs');

function errorHandler(err, req, res, next) {
  console.error(err); // imprime o erro no console
  return res.status(500).json({ message: "Ocorreu um erro no servidor" });
}

class UserController {
    async authenticate(req, res) {
        try {
          const { email, senha } = req.body;
      
          // Buscar usuário com o email fornecido no banco de dados
          const user = await User.findOne({ where: { email } });
      
          // Se não encontrar o usuário, retornar erro
          if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
          }
      
          // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
          const match = await bcrypt.compare(senha, user.senha);
          if (!match) {
            return res.status(401).json({ message: 'Senha incorreta' });
          }

          return res.status(200).json({user});
      
        } catch (error) {
          return res.status(400).json({ message: 'Falha ao autenticar usuário' });
        }
      }
      
    

      async store(req, res) {
        try {
          const { nome, email, senha } = req.body;
      
          const userAlreadyExists = await User.findOne ({ where: {email} });
      
          if(userAlreadyExists) {
            return res.status(400).json({message: "Esse usuário já existe"})
          }
      
          if(!nome || !email || !senha){
            return res.status(400).json({message: "Preencha todos os campos"})
          }
      
          const salt = await bcrypt.genSalt(10); // Gerar um salt aleatório com 10 rounds
          const hashedSenha = await bcrypt.hash(senha, salt); // Hash da senha usando o salt gerado
      
          const createdUser = await User.create({ nome, email, senha: hashedSenha }); // Criação do usuário com a senha já criptografada
      
          return res.status(200).json({message: "Usuário registrado com sucesso"});
      
        } catch (error) {
          return res.status(400).json({message: "Falha ao cadastrar usuário"})
        }
      }
      

    async index(req, res) {
        try{
            const users = await User.findAll({
              order: [['id', 'ASC']]
            });

            return res.status(200).json(users);
        }   catch (error) {
            return res.status(400).json({message: "Falha ao listar usuário"})
        }
    }
    async show(req, res){
        try{
            const {id} = req.params;

            const user = await User.findByPk(id);

            if (!user){
                return res.status(404).json({message: "Usuário não encontrado" });
            }
            return res.status(200).json(user);
    
        }   catch  (error) {
            return res.status(400).json({message: "Falha ao detalhar usuário"})
        }
    }
    
    

    async update(req, res){
        try{
            const {id} = req.params;

            const {nome, email, senha, status} = req.body;

            await User.update(
                {nome, email, senha, status},
                {
                    where: {
                        id: id,
                    },
                }
            );
            
            return res.status(200).json({message: "Usuário autualizado" });
        }   catch (erro) {
            return res.status(400).json({message: "Falha ao autualizar o usuário"})  
        }
    }

    async destroy(req, res){
      console.log('Método destroy chamado');
      try{
          const {id} = req.params;
          console.log('Id do usuário a ser excluído:', id);
    
          await User.destroy({
                  where: {
                      id: id,
                  },
              }
          );
          return res.status(200).json({message: "Usuário excluído com sucesso" });
      }   catch (erro) {
          console.log('Erro ao excluir usuário:', erro);
          return res.status(400).json({message: "Falha ao excluir o usuário"});
      }
    }

}



module.exports = new UserController();