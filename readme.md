# Como rodar o projeto?
> A tecnologia necessária para rodar o projeto é o Banco de dados Postgres, disponível em:
> https://www.postgresql.org/download/

Passo a passo:
- Clone o projeto em ```<> CLONE```, na parte superior direita do github, em cor verde
- Clicar em ````Windows```` + ````R````, e digite ```CMD```, o prompt de comando do computador.
- Depois digitar ``` git clone ``` no cmd e colar o código que clonou ```https://github.com/TechForce-ADS/Visiona.git```
- Acesse TechForce-ADS/Visiona/tree/main/Sprints/4_Sprint/codigo e na pasta código:
- Digitar em sequência
-  ```npm install``` (baixa os módulos)
-  ```npx sequelize db:create``` (cria o banco de dados)
-  ```npx sequelize db:migrate```(migra as tabelas para o banco de dados)
-  ```npm run dev``` (roda o servidor node, para o back-end funcionar)
-  Após o banco de dados criado, abrir um novo terminal ```cmd``` e digitar:
-  ```npm start``` (inicia o programa)







