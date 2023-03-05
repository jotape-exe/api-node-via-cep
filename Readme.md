# 🔹 Sobre a API

- Esta API armazena os dados no MongoDB Atlas, então você deve configura-lo devidamente para usar as corretamente

- Você também deve possuir ferramentas para testar as requisições http, como Postman ou Insomnia

- Você deve se atendar ao consumo dados da API ViaCep, pois os dados são coletados e salvos dentro de um objeto `JSON`

- Exemplo de requisição do tipo post:
```
{
"name": "Usuario",
"address": {
    "cep": "01001000"
}
}
```
- Em relação a conexão com o banco de dados no arquivo `index.js` é recomendado que você crie um arquivo `.env` para armazenar dados sensíveis, ( Como seu login e senha do banco de dados )

- Dependências utilizadas:
```
      "dependencies": {
        "axios": "^1.3.4",
        "cors": "^2.8.5",
        "dotenv": "^16.0.3",
        "ejs": "^3.1.8",
        "express": "^4.18.2",
        "nodemon": "^6.9.2",
        "nodemon": "^2.0.20"
      }
```
_use `npm install nodemon express dotenv axios` para instalar as dependenciar necessárias_

- Em seguida configure o seu arquivo principal, host e porta da aplicação no arquivo *package.json*
`
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon ./index.js localhost 3000"
  },
`
- Por fim use `npm start` para rodar sua API na porta 3000
