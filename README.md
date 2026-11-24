# AV2 Banco de Dados

**Aluno ou dupla:** __________________________________

## Cenário escolhido

Escolhi o **Cenário C: E-Commerce de Tecnologia e Hardware**.

## Arquivos da entrega

- `ProjetoAV2_ECommerce.mongodb.js`: script completo da atividade.

## Como executar

1. Abra o arquivo no **VS Code Playground (.mongodb.js)** ou no MongoDB Shell/Compass.
2. Execute todo o conteúdo do início ao fim.
3. O script usa `use("ProjetoAV2_TecnologiaDB")`, reinicia o banco e cria as coleções
   `Produtos` e `Pedidos`.

## Por que utilizar MongoDB?

O MongoDB combina bem com esse e-commerce porque cada tipo de produto tem
características diferentes. Um notebook pode ter processador e placa de vídeo,
enquanto um mouse pode ter conexão e DPI. No MongoDB, essas informações podem
ficar em objetos separados dentro de cada documento, sem criar uma quantidade
grande de colunas vazias.

Os dados do cliente e os itens comprados ficam incorporados em cada pedido.
As tags, cores disponíveis e itens do pedido são armazenados em arrays.
Esse formato acompanha melhor as diferentes informações usadas pela loja.

O MongoDB também permite crescer horizontalmente e modificar os documentos sem
fazer migrações complexas do esquema. Isso é útil em um catálogo que pode ganhar
novos tipos de produtos no futuro.