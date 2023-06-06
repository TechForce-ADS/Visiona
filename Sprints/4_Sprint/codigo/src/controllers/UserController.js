const { User } = require('../models');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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

      return res.status(200).json({ user });

    } catch (error) {
      return res.status(400).json({ message: 'Falha ao autenticar usuário' });
    }
  }

  async store(req, res) {
    try {
      const { nome, email, cpf, senha, confirmarSenha } = req.body;
  
      if (!nome || !email || !cpf || !senha || !confirmarSenha) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }
  
      const userByEmail = await User.findOne({ where: { email } });
  
      if (userByEmail) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }
  
      const userByCpf = await User.findOne({ where: { cpf } });
  
      if (userByCpf) {
        return res.status(400).json({ message: "CPF já cadastrado" });
      }
  
      if (senha !== confirmarSenha) {
        return res.status(400).json({ message: "As senhas não coincidem" });
      }
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'brenertestando@gmail.com',
          pass: 'brfmfbdzeiktjdhh',
        },
      });
  
      const confirmUrl = 'http://localhost:3000/confirmar';
  
      const token = jwt.sign(
        { email },
        'd#7Hj&f$23sPc89!TqA',
        { expiresIn: '1h' }
      );
  
      const mailOptions = {
        from: 'brenertestando@gmail.com',
        to: email,
        subject: 'Confirmação de e-mail',
        html: `Para confirmar seu e-mail, acesse o seguinte link: <a href="${confirmUrl}?token=${token}">${confirmUrl}?token=${token}</a>`,
      };
  
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error('Erro ao enviar o e-mail:', error);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
  
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedSenha = await bcrypt.hash(senha, salt);
  
          const createdUser = await User.create({ nome, email, cpf, senha: hashedSenha, token, emailConfirmed: false });
  
          console.log('E-mail enviado com sucesso:', info.response);
          return res.json({ message: 'Token enviado para o e-mail' });
        } catch (error) {
          console.log(error);
          return res.status(400).json({ message: "Falha ao cadastrar usuário" });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Falha ao cadastrar usuário" });
    }
  }
  
  

  async index(req, res) {
    try {
      const users = await User.findAll({
        order: [['id', 'ASC']]
      });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao listar usuário" })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json(user);

    } catch (error) {
      return res.status(400).json({ message: "Falha ao detalhar usuário" })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const { nome, email, senha, status } = req.body;

      await User.update(
        { nome, email, senha, status },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({ message: "Usuário atualizado" });
    } catch (erro) {
      return res.status(400).json({ message: "Falha ao atualizar o usuário" })
    }
  }

  async destroy(req, res) {
    console.log('Método destroy chamado');
    try {
      const { id } = req.params;
      console.log('Id do usuário a ser excluído:', id);

      await User.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (erro) {
      console.log('Erro ao excluir usuário:', erro);
      return res.status(400).json({ message: "Falha ao excluir o usuário" });
    }
  }

  async recover(req, res) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'brenertestando@gmail.com',
        pass: 'brfmfbdzeiktjdhh',
      },
    });

    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const resetUrl = 'http://localhost:3000/recuperar';

      const token = jwt.sign(
        { userId: user.id },
        'd#7Hj&f$23sPc89!TqA',
        { expiresIn: '1h' }
      );

      await user.update({ token });

      const mailOptions = {
        from: 'brenertestando@gmail.com',
        to: user.email,
        subject: 'Recuperação de senha',
        text: `Para redefinir sua senha, acesse o seguinte link: ${resetUrl}?token=${token}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Erro ao enviar o e-mail:', error);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        console.log('E-mail enviado com sucesso:', info.response);
        return res.json({ message: 'Token enviado para o e-mail' });
      });
    } catch (error) {
      console.error('Erro ao recuperar usuário', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  
  async confirmToken(req, res) {
    try {
      const { token } = req.params;
  
      // Verificar o token e atualizar a coluna emailConfirmed para true
      const user = await User.findOne({ where: { token } });
  
      if (!user) {
        return res.status(404).json({ message: 'Token inválido' });
      }
  
      await user.update({ emailConfirmed: true, token: null });
  
      return res.status(200).json({ message: 'Email confirmado com sucesso' });
    } catch (error) {
      console.error('Erro ao confirmar o email', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }


  
  async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
      const decodedToken = jwt.verify(token, 'd#7Hj&f$23sPc89!TqA');

      const user = await User.findOne({ where: { id: decodedToken.userId } });

      if (!user || user.token !== token) {
        return res.status(400).json({ error: 'Token inválido' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.senha = hashedPassword;
      user.token = null;
      await user.save();

      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      console.error('Erro ao redefinir senha', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async showByEmail(req, res) {
    try {
      const { email } = req.params;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      return res.status(200).json(user);  
    } catch (error) {
      return res.status(400).json({ message: 'Falha ao detalhar usuário' });
    }
  }



}

module.exports = new UserController();
