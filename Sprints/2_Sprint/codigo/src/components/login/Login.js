import '../../App.css'
import logo from '../../imagens/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookSquare, faLinkedin, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../../index.tsx';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';



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
});

function handleClickRegister(values) {
  axios.post('http://localhost:3333/users/register', {
    nome: values.nome,
    email: values.email,
    senha: values.password,
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
      document.getElementById('register').reset();
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Usuário registrado com sucesso',
        showConfirmButton: false,
        timer: 1500
      });
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
  })
    .then((response) => {
      const user = response.data.user;
      if (!user) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuário não encontrado',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Login efetuado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
        // Fazer alguma ação após o login, como redirecionar para outra página
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
              <a className='link-social-midia' href ="#">
                <li className='item-social-midia'><FontAwesomeIcon icon={faFacebookSquare} /></li>
              </a>
              <a className='link-social-midia' href ="#">
                <li className='item-social-midia'>< FontAwesomeIcon icon={faSquareGooglePlus} /></li>
              </a>
              <a className='link-social-midia' href ="#">
                <li className='item-social-midia'>< FontAwesomeIcon icon={faLinkedin} /></li>
              </a>
            </ul>
          </div>
            <p className="descricao description-second">Ou utilize o seu email para criar a conta</p>
            <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
              <Form className="form" id="login">
                <label className='Label-input'>
                  <FontAwesomeIcon className="icon-modify" icon={faUser} />
                  <Field name="nome" placeholder="Nome" />
                </label>
                <label className='Label-input'>
                  <FontAwesomeIcon className="icon-modify" icon={faEnvelope} />
                  <Field name="email" placeholder="Email" />
                </label>
                <label className='Label-input'>                    <FontAwesomeIcon className="icon-modify" icon={faLock} />
                   <Field name="password" placeholder="Senha" type="password" />
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
              <a className='link-social-midia' href ="#">
                <li className='item-social-midia'><FontAwesomeIcon icon={faFacebookSquare} /></li>
              </a>
              <a className='link-social-midia' href ="#">
                <li className='item-social-midia'>< FontAwesomeIcon icon={faSquareGooglePlus} /></li>
              </a>
              <a className='link-social-midia' href ="#">
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
                  <Field name="email" placeholder= "Email"></Field>
                </label>
                <label className='Label-input'>
                  <FontAwesomeIcon className="icon-modify" icon={faLock} />
                  <Field type="password" name="password" placeholder= "Senha"></Field>
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

