## Arquitetura do Projeto

=> routes: responsável por mapear a URL que leva a uma ação.

=> controllers: responsável apenas por pegar os dados da requisição e passar para outra função do projeto que realmente sabe o que fazer com eles, que seria então os services.

=> services: contém a regra de negócio. Ele recebe os dados (mas não diretamente o request e response — aliás, ele nem sabe o que é isso), processa e devolve um resultado. </br>
Exemplo de regra de negócio: encriptar a senha, verificar se o e-mail já existe.
Observação: Não pode acessar o banco de dados.

=> middlewares: responsáveis pela autenticação e verificação dos dados. Utilizar o Zod para manter os dados sempre limpos. Também é responsável por validar o token JWT do usuário antes de, por exemplo, realizar um POST.

=> repositories: responsável pela conexão com o banco de dados, sendo quem busca os dados e os leva ao service, fornecendo o que é necessário para montar a response. </br>
Observação: Ele tem que ser ligado ao banco de dados. Se houver qualquer método do Prisma fora dele, está errado.

===========================================================================

## Próximas etapas:

=> JWT token
