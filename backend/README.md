<h1 align="center">Instruções de uso para o backend</h1>

<p>Crie um arquivo .env no projeto, ou apenas renomeie o .env.example -> .env e coloque sua url de conexão com o mongoDB atlas na variavel MONGO_URL>
 
<p>Feito isso você irá precisar instalar as dependencias do projeto</p>
<p>Abra a pasta do projeto DevRadar, abra a pasta backend no terminal</p>

<p>Faça a instalação das dependencias do projeto. Com yarn ou npm. Eu utilizei e recomendo o Yarn</p>

  # yarn -> yarn install 
  
    ou 
    
  # npm -> npm install
  
  <p>Após completar toda a instalação, execute o comando: </p>
   <p>  
     yarn dev -> para rodar o script de desenvolvimento.
     
     ** se ocorrer algum erro do nodemon não estar instalado, faça a instalação com yarn add nodemon -D
   </p>
   
   <p>Para fazer o teste da api, utilize o insomnia que exportei um arquivo das rotas, está na raiz da pasta backend</p>
    
   <p>Abra o insomnia, application -> Preferences -> Data -> Import Data -> Import from file -> selecione o arquivo e clique em import, pronto, irá importar as rotas prontas para usar no insomnia, só necessário colocar os dados de acordo com a ação que queira executar</p>
