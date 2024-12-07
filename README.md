### **README.md**

**SecurityForm.js**
===================

Uma biblioteca simples e eficiente para criar formulários seguros utilizando iframes, protegendo os dados digitados contra scripts de terceiros.

* * *

**Descrição**
-------------

A `SecurityForm.js` permite a criação de campos de formulário dentro de um iframe isolado, garantindo que os dados inseridos pelos usuários estejam protegidos contra tentativas de captura por scripts maliciosos. O envio dos dados é intermediado por requisições AJAX, e a biblioteca utiliza eventos personalizados para comunicar o sucesso ou a falha do envio de dados.

* * *

**Instalação**
--------------

1.  Clone o repositório ou instale a biblioteca usando NPM:
    
    bash
    
    `npm install security-form` 
    
2.  Importe a biblioteca em seu projeto:
    
    javascript
    
    `import SecurityForm from './SecurityForm';` 
    

* * *

**Uso**
-------

### **1\. Configuração básica**

Adicione o formulário seguro na sua aplicação, configurando-o com a URL de destino, método HTTP e cabeçalhos personalizados.

javascript

```

`import SecurityForm from "./SecurityForm";

// Inicializa o formulário seguro
const formS = new SecurityForm("app", "container");

// Configura o formulário
var uid = formS.config('/teste', 'POST', {
    "X-key": 'teste' // Cabeçalhos personalizados
}).build();

// Escuta o evento personalizado retornado pelo iframe
window.addEventListener(uid, (event) => {
    console.log(event.detail); // Resultado do envio (sucesso ou falha)
}, false);` 
```
* * *

### **2\. Como funciona**

* **`new SecurityForm(appId, containerId)`**:  
    Inicializa um novo formulário seguro.
    
    * `appId`: ID do elemento raiz da aplicação onde o iframe será anexado.
    * `containerId`: ID do container dentro do qual o iframe será criado.
* **`.config(url, method, headers)`**:  
    Configura a URL de envio, método HTTP e cabeçalhos personalizados para a requisição.
    
    * `url`: URL de destino para o envio dos dados.
    * `method`: Método HTTP a ser utilizado (ex.: `POST`, `GET`, etc.).
    * `headers`: Objeto contendo cabeçalhos personalizados para a requisição.
* **`.build()`**:  
    Constrói o iframe, injeta o formulário e retorna um `uid` único para rastrear o evento personalizado.
    

* * *

### **3\. Evento personalizado**

Após a submissão do formulário, a biblioteca utiliza o `postMessage` para enviar o status da requisição para a janela principal. O `uid` retornado pelo método `build()` deve ser usado para escutar este evento.

#### **Exemplo de resposta do evento:**

javascript

Copy code

`window.addEventListener(uid, (event) => {
    if (event.detail.status === 'success') {
        console.log('Dados enviados com sucesso:', event.detail.data);
    } else if (event.detail.status === 'fail') {
        console.error('Erro no envio:', event.detail.message);
    }
}, false);` 

* * *

**Exemplo completo**
--------------------


```
`import SecurityForm from "./SecurityForm";

// Inicializa o SecurityForm
const formS = new SecurityForm("app", "secure-container");

// Configura e constrói o formulário seguro
const uid = formS.config('/api/protected', 'POST', {
    "Authorization": "Bearer abc123",
    "Content-Type": "application/json"
}).build();

// Escuta o evento retornado após o envio
window.addEventListener(uid, (event) => {
    if (event.detail.status === 'success') {
        console.log('Envio com sucesso:', event.detail.data);
    } else {
        console.error('Falha no envio:', event.detail.message);
    }
}, false);`

```

* * *

**Benefícios**
--------------

1.  **Proteção de dados**: O uso de iframes isola o formulário, protegendo os dados contra scripts maliciosos.
2.  **Flexibilidade**: Suporte a diferentes métodos HTTP e cabeçalhos personalizados.
3.  **Fácil integração**: Simples de implementar em qualquer projeto.

* * *

**Requisitos**
--------------

* Navegadores modernos com suporte a `iframe` e `postMessage`.
* Suporte a JavaScript ES6+.

* * *

**Contribuição**
----------------

Sinta-se à vontade para enviar issues ou pull requests no repositório oficial.

**Contato:** boteistem@gmail.com

* * *

**Licença**
-----------

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.