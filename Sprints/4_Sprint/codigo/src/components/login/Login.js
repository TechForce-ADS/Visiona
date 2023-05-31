import './Login.css'
import logo from '../../imagens/logoB.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faLinkedin, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../../index.tsx';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
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
  password: Yup.string().required('Senha é obrigatória'),
  cpf: Yup.string().required('CPF é obrigatório').min(11, 'CPF deve ter pelo menos 11 caracteres'),
});

function saveLoginData(email, senha) {
  localStorage.setItem('email', email);
  localStorage.setItem('senha', senha);
}

function handleClickRegister(values) {
  axios.post('http://localhost:3333/users/register', {
    nome: values.nome,
    email: values.email,
    senha: values.password,
    cpf: values.cpf,
  })
    .then((response) => {
      console.log(response);
      if (response.user === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Usuário registrado com sucesso',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Usuário registrado com sucesso',
          showConfirmButton: false,
          timer: 1500
        });
        entraJS();
        document.getElementById('nome').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('cpf').value = "";

      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        iconColor: '#fc5d00',
        text: 'Esse usuário já existe',
        confirmButtonColor: '#fc5d00'
      });
    });
}


const validationLogin = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});


function handleClickLogin(values) {
  axios.post('http://localhost:3333/users/email', {
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
        saveLoginData(values.email, values.password); // Salvar os dados de login no localStorage
        window.location.href = 'http://localhost:3000/Listagem';
      } else if (user && user.status !== false && user.adm === false) {
        Swal.fire({
          icon: 'success',
          title: 'Login efetuado com sucesso',
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem('isLoggedIn', true);
        saveLoginData(values.email, values.password); // Salvar os dados de login no localStorage
        window.location.href = 'http://localhost:3000/HomeC';
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          iconColor: '#fc5d00',
          text: 'Senha incorreta',
          confirmButtonColor: '#fc5d00'
        });
      } else {
        console.log(error);
        Swal.fire({
          icon: 'error',
          iconColor: '#fc5d00',
          text: 'Usuário não cadastrado',
          confirmButtonColor: '#fc5d00'
        });
      }
    });
}

function Login() {

  return (
    <div className="containerLogin">
      <div className="content first-content">
        <div className="first-column">
          <h2 className="title title-primary">Bem-vindo!</h2>
          <p className="descricao description-primary">Colaborador</p>
          <p className="descricao description-primary">Caso ja tenha conta, clique aqui!</p>
          <button className="btn btn-primary" onClick={entraJS}>Acesse a sua conta</button>
        </div>
        <div className="second-column">
          <h2 className="title title-second">Cadastro</h2>
          <div className="midia-social">
            <ul className="list-social-midia">
              <a className='link-social-midia' href="#">
                <li className='item-social-midia'><FontAwesomeIcon icon={faFacebookSquare} /></li>
              </a>
              <a className='link-social-midia' href="#">
                <li className='item-social-midia'>< FontAwesomeIcon icon={faSquareGooglePlus} /></li>
              </a>
              <a className='link-social-midia' href="#">
                <li className='item-social-midia'>< FontAwesomeIcon icon={faLinkedin} /></li>
              </a>
            </ul>
          </div>
          <p className="descricao description-second">Ou utilize o seu email para criar a conta</p>
          <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
            <Form className="form" id="login">
              <label className='Label-input'>
                <FontAwesomeIcon className="icon-modify" icon={faUser} />
                <Field name="nome" placeholder="Nome" id="nome" />
              </label>
              <label className='Label-input'>
                <FontAwesomeIcon className="icon-modify" icon={faEnvelope} />
                <Field name="email" placeholder="Email" id="email" />
              </label>
              <label className='Label-input'>
                <FontAwesomeIcon className="icon-modify" icon={faEnvelope} />
                <Field mask="000.000.000-00" name="cpf" placeholder="Digite o seu CPF" id="cpf" as={IMaskInput} imask="000.000.000-00"/>
              </label>
              <label className='Label-input'>
                <FontAwesomeIcon className="icon-modify" icon={faLock} />
                <Field name="password" placeholder="Senha" type="password" id="password" />
              </label>
              
              <button className="btn btn-second" type="submit">Criar Conta</button>
            </Form>
          </Formik>
        </div>
      </div>

      <div className="content second-content">

        <div className="first-column">
          <h2 className='title title-primary'>Bem Vindo!</h2>
          <p className="descricao description-primary">Colaborador</p>
          <p className="descricao description-primary">Caso não tenha cadastro!</p>
          <button className="btn btn-primary" onClick={criarJS}>Crie sua conta</button>
          <img src={logo} alt="logo" className='logo-img' onClick={criarJS}></img>


        </div>

        <div className="second-column">
          <h2 className="title title-second">Login </h2>
          <div className="midia-social">
            <ul className="list-social-midia">
              <a className='link-social-midia' href="#">
                <li className='item-social-midia'><FontAwesomeIcon icon={faFacebookSquare} /></li>
              </a>
              <a className='link-social-midia' href="#">
                <li className='item-social-midia'>< FontAwesomeIcon icon={faSquareGooglePlus} /></li>
              </a>
              <a className='link-social-midia' href="#">
                <li className='item-social-midia'>< FontAwesomeIcon icon={faLinkedin} /></li>
              </a>
            </ul>
          </div>
          <p className="descricao description-second">Ou utilize o seu email para entrar na sua conta</p>
          <div className='cuboLogin'>
            <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
              <Form className="form">
                <label className='Label-input'>
                  <FontAwesomeIcon className="icon-modify" icon={faEnvelope} />
                  <Field name="email" placeholder="Email"></Field>
                </label>
                <label className='Label-input'>
                  <FontAwesomeIcon className="icon-modify" icon={faLock} />
                  <Field type="password" name="password" placeholder="Senha"></Field>
                </label>
                <a className='password' href='#'>esqueceu sua senha?</a>
                <button className="btn btn-second" type="submit">Entrar</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

