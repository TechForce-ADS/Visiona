import './Login.css'
import logo from '../../imagens/logoB.png'
import logoBST from '../../imagens/logoBST.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../../index.tsx';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { IMaskInput } from "react-imask";


function criarJS() {
  var body = document.querySelector("body");
  body.className = "criar-js";
}
function entraJS() {
  var body = document.querySelector("body");
  body.className = "entrar-js";
} 

const validationRegister = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório').min(11, 'CPF deve ter pelo menos 11 caracteres'),
  password: Yup.string().required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('Confirme sua senha'),
});

function saveLoginData(email, senha) {
  localStorage.setItem('email', email);
  localStorage.setItem('senha', senha);
}

function Login() {
  function handleClickRegister(values) {
    axios
      .post('http://localhost:3333/users/register', {
        nome: values.nome,
        email: values.email,
        senha: values.password,
        confirmarSenha: values.confirmPassword,
        cpf: values.cpf,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Usuário registrado com sucesso',
            showConfirmButton: false,
            timer: 1500,
          });
        } 
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          iconColor: '#fc5d00',
          text: 'Esse usuário já existe',
          confirmButtonColor: '#fc5d00',

        });
      });


    }

    const validationLogin = Yup.object().shape({
      email: Yup.string().email('Email inválido').required('Email é obrigatório'),
      password: Yup.string().required('Senha é obrigatória'),
    });

  function handleClickLogin(values) {
    axios
      .post('http://localhost:3333/users/email', {
        email: values.email,
        senha: values.password,
        status: values.status,
        adm: values.adm,
      })
      .then((response) => {
        const user = response.data.user;

        if (!user) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuário não encontrado',
          });
        } else if (user.status === false) {
          Swal.fire({
            icon: 'success',
            title: 'Conta desativada!',
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (user && user.status !== false && user.adm !== false) {
          Swal.fire({
            icon: 'success',
            title: 'Login Administrador efetuado!',
            showConfirmButton: false,
            timer: 1500,
          });

          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('adm', true);
          saveLoginData(values.email, values.password);
         
          window.location.href = 'http://localhost:3000/Listagem';

        } else if (user && user.status !== false && user.adm === false) {

          Swal.fire({
            icon: 'success',
            title: 'Login efetuado com sucesso',
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('adm', false);
          saveLoginData(values.email, values.password);
          window.location.href = 'http://localhost:3000/HomeC';
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            iconColor: '#fc5d00',
            text: 'Senha incorreta',
            confirmButtonColor: '#fc5d00',
          });
        } else {
          console.log(error);
          Swal.fire({
            icon: 'error',
            iconColor: '#fc5d00',
            text: 'Usuário não cadastrado',
            confirmButtonColor: '#fc5d00',
          });
        }
      });
  }

  function handleKeyDown(event, nextInputRef) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (nextInputRef) {
        nextInputRef.focus();
      }
    }
  }

  function handleForgotPassword(email) {
    axios
      .post('http://localhost:3333/users/recover', {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Email de recuperação de senha enviado com sucesso',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        let errorMessage = 'Ocorreu um erro ao enviar o email de recuperação de senha';
  
        if (error.response && error.response.status === 400) {
          const { message } = error.response.data;
          errorMessage = message;
        }
        Swal.fire({
          iconColor: '#fc5d00',
          icon: 'error',
          confirmButtonColor: '#fc5d00',
          text: errorMessage,
        });
      });
  }
  
  

  return (
    <div className="containerLogin">
      <div className="content first-content">
        <div className="first-column">
          <h2 className="title title-primary">Bem-vindo!</h2>
          <p className="descricao description-primary">Colaborador</p>
          <p className="descricao description-primary">Caso já tenha conta, clique aqui!</p>
          <button className="btn btn-primary" onClick={entraJS}>
            Acesse a sua conta
          </button>
          <img src={logoBST} alt="logoBST" className='logo-img-mobile'></img>
          <img src={logo} alt="logo" className='logo-img' onClick={criarJS}></img>
        </div>
        <div className="second-column">
          <h2 className="title title-second">Cadastro</h2>

          <Formik
            initialValues={{}}
            onSubmit={handleClickRegister}
            validationSchema={validationRegister}
          >
            <Form className="form" id="cadastro">
              <label className="Label-input">
                <FontAwesomeIcon className="icon-modify" icon={faUser} />
                <Field
                  name="nome"
                  placeholder="Nome"
                  id="nome"
                  onKeyDown={(event) => handleKeyDown(event, document.getElementById('emailC'))}
                />
              </label>
              <label className="Label-input">
                <FontAwesomeIcon className="icon-modify" icon={faEnvelope} />
                <Field
                  name="email"
                  placeholder="Email"
                  id="emailC"
                  onKeyDown={(event) => handleKeyDown(event, document.getElementById('cpf'))}
                />
              </label>
              <label className="Label-input">
                <FontAwesomeIcon className="icon-modify" icon={faEnvelope} />
                <Field
                  mask="000.000.000-00"
                  name="cpf"
                  placeholder="Digite o seu CPF"
                  id="cpf"
                  as={IMaskInput}
                  onKeyDown={(event) => handleKeyDown(event, document.getElementById('passwordC'))}
                  
                />
              </label>
              <label className="Label-input">
                <FontAwesomeIcon className="icon-modify" icon={faLock} />
                <Field
                  name="password"
                  placeholder="Senha"
                  type="password"
                  id="passwordC"
                />
              </label>
              <label className="Label-input">
                <FontAwesomeIcon className="icon-modify" icon={faLock} />
                <Field name="confirmPassword" placeholder="Confirmar Senha" type="password" id="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </label>

              <button id="btnCadastro" className="btn btn-second" type="submit">
                Criar Conta
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      <div className="content second-content">
        <div id="TextCadastro" className="first-column">
          <h2 className="title title-primary">Bem-vindo!</h2>
          <p className="descricao description-primary">Colaborador</p>
          <p className="descricao description-primary">Caso não tenha cadastro!</p>
          <button className="btn btn-primary" onClick={criarJS}>
            Crie uma conta
          </button>
          <img src={logoBST} alt="logoBST" className='logo-img-mobile2'></img>
          <img src={logo} alt="logo" className='logo-img' onClick={criarJS}></img>
        </div>
        <div className="second-column">
          <h2 className="title title-second">Login</h2>
         <Formik
                initialValues={{}}
                onSubmit={handleClickLogin}
                validationSchema={validationLogin}
              >
                {formikProps => (
                  <Form id="login" className="form">
                    <label className="Label-input">
                      <FontAwesomeIcon className="icon-modify" icon={faEnvelope} />
                      <Field name="email" placeholder="Email" />
                      <ErrorMessage name="email" component="div" className="error-message" />
                    </label>
                    <label className="Label-input">
                      <FontAwesomeIcon className="icon-modify" icon={faLock} />
                      <Field type="password" name="password" placeholder="Senha" />
                      <ErrorMessage name="password" component="div" className="error-message" />
                    </label>
                    <a className="password" href="javascript:void(0)" onClick={() => handleForgotPassword(formikProps.values.email)}>
                      Esqueceu sua senha?
                    </a>
                    <button className="btn btn-second" type="submit">
                      Entrar
                    </button>
                  </Form>
                )}
              </Formik>
        </div>
      </div>

     
    </div>
  );
}

export default Login;