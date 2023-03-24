# Projeto API - Visiona
Projeto de API - 3° Semestre de 2022 da Fatec São José dos Campos - VISIONA


<br>
<table>
  <tr>
    <td>Cliente</td>
    <td>Periodo/Curso</td>
    <td>Professor M2</td>
    <td>Professor P2</td>
    <td> Contato Cliente </td>
  </tr>
  <tr>
    <td> Luiz Claudio </td>
    <td> 3º ADS (Análise e Desenvolvimento de Sistemas) </td>
    <td> Cláudio Etelvino de Lima</td>
    <td> Fernando Masanori  </td>
    <td> luiz.holanda@visionaespacial.com.br </td>
  </tr>
</table>
</br>

# Artigos

- <a href ="#conhecimento-exigido"> Conhecimento Exigido </a>
- <a href ="#equipes"> Equipes </a>
- <a href ="#projeto"> Projeto </a>
- <a href ="#objetivo"> Objetivo </a>
- <a href ="#requisito-da-aplicação"> Requisitos da Aplicação </a>
- <a href ="#metodologia"> Metodologia </a>
- <a href ="#cronograma-e-sprint"> Cronograma e Sprints </a>
- <a href ="#tecnologia-utilizadas"> Tecnologias Utilizadas </a>
- <a href ="#sprint"> Sprints </a>
- <a href ="#burndown-do-projeto"> Burndown do Projeto </a>

# Conhecimento exigido 

> 
- Dashboard Web de alta complexidade
- Levantar e registrar Requisitos usando Métodos Ágeis e Tradicionais 
- Documentação DoR e Dod
- Modelar Processos de Negocios usando VPC e BPMN
- Projetar arquitetura lógica de software
- Implementar aplicação usando ORM
- Utilizar IDE's na implementação de Aplicação em TypeScript

# Equipes
<table>
  <tr>
    <td>Integrantes</td>
    <td>Funções</td>
    <td>Linkedin</td>
    <td>Github</td>
    <td>Teste DISC </td>
  </tr>
  <tr>
    <td>Debora Taira</td>
    <td>PO</td>
    <td><a href=""><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="30px"></a></td>
    <td><a href="https://github.com/deborataira"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px"></a></td>
    <td>Dominante</td>
  </tr>
  
  <tr>
    <td>João Pedro Lopes</td>
    <td>SM</td>
    <td><a href="https://br.linkedin.com/in/marinaangela"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="30px"></td>
    <td><a href=""><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px"></a></td>
    <td>Estável</td>
  </tr>
  
  <tr>
    <td>Ali Mohamed</td>
    <td>ST</td>
    <td><a href="https://www.linkedin.com/in/alimohamedkhodr"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="30px"></a></td>
    <td><a href="https://github.com/alimoahmed"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px"></a></td>
    <td>Estável</td>
  </tr>
  
  <tr>
    <td> Ítalo Bonilha</td>
    <td>ST</td>
    <td><a href=""><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="30px"></a></td>
    <td><a href="https://github.com/italobonilha"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px"></a></td>
    <td>Influente </td>
  </tr>
  
  <tr>
    <td>Marina Angela</td>
    <td>ST</td>
    <td><a href="https://www.linkedin.com/in/marinaangela/"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="30px"></a></td>
    <td><a href="https://github.com/MarinaAraujoMaciel"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px"></a></td>
    <td>Dominante</td>
  </tr>
  
  
  <tr>
    <td>Pedro Seraggi</td>
    <td>ST</td>
     <td><a href=""><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="30px"></a></td>
    <td><a href="https://github.com/PedroSeraggi"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px"></a></td>
    <td>Estável</td>
  </tr>
  
   <tr>
    <td>Brener Freire</td>
    <td>ST</td>
    <td><a href=""><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="30px"></a></td>
    <td><a href="https://github.com/Brener#5291"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px"></a></td>
    <td>Estável</td>
  </tr>
  
 
  
</table>

```
PO - Product Owner
SM - Scrum Master
ST - Scrum Team
```

# Projeto
Um sistema de gerenciamente de usuários de autenticação e autorização para acesso de serviços oferecidos pela empresa. A dashboard deve ser implementada utilizando GCP (Google Cloud Platform), containers devem ser utilizados e implementado em esteira CI/CD. O sistema deve seguir boas práticas de desenvolvimento orientado a objetos, testes unitários e de integração para garantir uma entrega de qualidade, onde 80% do código deve estar validado por uma ferramenta de análise. 
Deve possuir uma interface para gerenciar os usuários, permitindo que sejma criados, editados, excluidos e visualizados, havendo necessidade de atribuir permissões para cada usuário. 

 


 
# Objetivo

Apresentar todos os requisitos estabelecidos pelo cliente, atingindo um nível satisfatório do produto para empresa e cliente.
 


# Requisito da Aplicação

> Requisitos Funcionais:
- Login e senha
- Listagem de usuários
- Cadastro de novos Usuários
- Editar usuários cadastrados
- Visualizar usuários cadastrados em forma de lista (nome, perfil, status, ativo/inativo)
- Desativar usuário (exclusão)
- Funcionalidade 'Esqueci minha senha'


> Requisitos não Funcionais:
- Documentação do Sistema (modelagem de daods e código de fonte)
- Manual do usuário
- Utilização do GCP
- Utilização de ferramentas para CI/CD (Git, GihubAction, Jenkins, Sonar)
- Criação de componentes para reaproveitamento de código.



# Metodologia

- SCRUM 

# Cronograma e Sprint

<img src = "https://github.com/TechForce-ADS/imagens/blob/main/BACKLOG%20DO%20PRODUTO%20(2).png" />

> Sprint:

 <img src = "https://github.com/TechForce-ADS/imagens/blob/main/cronograma_sprints.png" alt="sprint" >
 
 ### Sprint 1</a> - 13/03 - 02/04</p>
 > <p>:heavy_check_mark: Design e identidade visual </p>
 > <p>:heavy_check_mark:Criação do protótipo </p>
 > <p>:x: Criar tela de Login</p>
 > <p>:x: Sistema de autenticação</p>
 > <p>:x: Criação de banco de dados/p>
 > <p>:x: Aviso de erro na tela de login</p>
 > <p>:x: Listagem Básica dos usuários</p>
 
 
 ### Sprint 2</a> - 03/04 - 23/04</p>
 > <p>:x: Tela de cadastro</p>
 > <p>:x: Sistema de edição</p>
 > <p>:x: Tela de Visualizar</p>
 
 

 ### Sprint 3</a> - 24/04 - 14/05</p>
 > <p>:x: Dashboard</p>
 > <p>:x:Listagem completa dos usuários </p>
 > <p>:x:Sistema de exclusão lógicar</p>
 > <p>:x:Filtro de ordenaçãor</p>
 

  ### Sprint 4</a> - 15/05 - 04/06</p>
 > <p>:x: Manual do usuário completo</p>
 > <p>:x: Adicionar a funcionalidade "esqueci minha senha"</p>
 > <p>:x: Finalizar documentação </p>

 
 
 
# Tecnologia Utilizadas


<img src ="https://github.com/TechForce-ADS/imagens/blob/main/tecnologias-visiona.jpg"/>
 

## 


> - NodeJS (Back-end)
> - React (Front-end)
> - Postgres (Banco de Dados)
> - Canva (Protótipo)
> - Pacote Office (Documentação)
> - GCP (Google Cloud Platform)
> - Docker
> - GitHub (Repositório)
> - Slack (Comunicação do Po com a empresa)


# Backlog do Produto 
<img src = "https://github.com/TechForce-ADS/imagens/blob/main/cronograma-s-visiona.jpg" />



# Sprint

- >  <a href="https://github.com/TechForce-ADS/Projeto_API_Visiona/blob/main/Prototipo.md"> Protótipo


- >  <a href="https://github.com/TechForce-ADS/Projeto_API_Visiona/blob/main/Sprint ">1º Sprint
- > <a href="https://github.com/TechForce-ADS/Projeto_API_Visiona/blob/main/Sprint "> 2º Sprint
- >  <a href="https://github.com/TechForce-ADS/Projeto_API_Visiona/blob/main/Sprint ">3º Sprint
- > <a href="https://github.com/TechForce-ADS/Projeto_API_Visiona/blob/main/Sprint "> 4º Sprint
  
# Burndown do Projeto


 

