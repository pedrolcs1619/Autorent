# 🚀 API Django REST Framework - Projeto Base

Bem-vindo ao projeto base para construção de APIs com Django REST Framework!  
Este repositório contém uma estrutura inicial para uma API RESTful, que você deve expandir conforme a atividade proposta.

---

## 📌 Sobre o Projeto

Esta API foi construída usando **Django REST Framework (DRF)** e segue uma estrutura modular com versionamento (`api/v1`).  
Ela permite gerenciar **clientes** e está preparada para receber melhorias, como **novos modelos**, **autenticação JWT**, **paginação** e **documentação automática**.

---

## ✅ Tecnologias Utilizadas

- **Django 5.x**
- **Django REST Framework**
- **PostgreSQL (ou SQLite para testes)**
- **JWT para autenticação**
- **Swagger para documentação**

---

## 📌 Instalação e Configuração

### **1️⃣ Clone o repositório**

```sh
git clone https://github.com/matheuslima25/django-api-rest.git
cd django-api-rest
```

### **2️⃣ Crie e ative um ambiente virtual**

```sh
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows
```

### **3️⃣ Instale as dependências**

```sh
pip install -r requirements.txt
```

### **4️⃣ Configure o banco de dados**

Se estiver usando **PostgreSQL**, configure `DATABASES` no `settings.py`.  
Caso prefira **SQLite**, a configuração padrão já está pronta.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'nome_do_banco',
        'USER': 'usuario',
        'PASSWORD': 'senha',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### **5️⃣ Execute as migrações**

```sh
python manage.py migrate
```

### **6️⃣ Crie um superusuário (para acessar o Django Admin)**

```sh
python manage.py createsuperuser
```

### **7️⃣ Inicie o servidor**

```sh
python manage.py runserver
```

Acesse a API via navegador em: [http://127.0.0.1:8000/api/v1/clientes/](http://127.0.0.1:8000/api/v1/clientes/) 🚀

---

## 📌 Estrutura do Projeto

```
/myproject
│── /autorent
│   │── /api
│   │   │── /v1
│   │   │   │── __init__.py
│   │   │   │── viewsets.py
│   │   │   │── router.py
│   │   │   │── serializers.py
│   │── __init__.py
│   │── models.py
│   │── views.py
│   │── urls.py
│   │── admin.py
│── /myproject
│   │── __init__.py
│   │── settings.py
│   │── urls.py
│   │── wsgi.py
│── manage.py
```

---

## 🚀 **Atividade Proposta**

Agora é sua vez! Sua tarefa é **expandir essa API** com os seguintes desafios:

### **1️⃣ Criar novos modelos no banco de dados**

- Adicione os modelos `Product` e `Order` ao `models.py`.
- Relacione `Order` com `Client` e `Product` (Many-to-Many).

📌 **Exemplo de modelo de Product:**

```python
class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
```

📌 **Exemplo de modelo de Order:**

```python
class Order(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    products = models.ManyToManyField(Produto)
    date_order = models.DateTimeField(auto_now_add=True)
```

---

### **2️⃣ Adicionar Autenticação JWT**

- Configure a **autenticação JWT** no `settings.py`.
- Adicione os endpoints de login e refresh de token no `urls.py`.
- Proteja os endpoints para exigir autenticação.

📌 **Testando autenticação JWT:**  
1️⃣ Obtenha um token:

```http
POST /api/token/
{
    "username": "admin",
    "password": "admin"
}
```

2️⃣ Use o token nas requisições:

```http
GET /api/v1/clientes/
Headers:
  Authorization: Bearer SEU_TOKEN_JWT
```

---

### **3️⃣ Implementar Paginação**

- Configure a **paginação** no `settings.py` para **retornar 10 itens por página**.

📌 **Exemplo de resposta paginada:**

```json
{
  "count": 50,
  "next": "/api/v1/clients/?page=2",
  "previous": null,
  "results": [
    { "id": 1, "nome": "Ana Souza" },
    { "id": 2, "nome": "Carlos Mendes" }
  ]
}
```

---

### **4️⃣ Criar Documentação Automática**

- Instale o **drf-spectacular** para gerar a documentação Swagger.
- Adicione as rotas para visualizar a documentação.

📌 **Acesse a documentação interativa em:**

```
http://127.0.0.1:8000/api/docs/
```

---

## 📚 **Materiais de Apoio**

- 📌 [Documentação Oficial do Django REST Framework](https://www.django-rest-framework.org/)
- 📌 [Como Funciona JWT Authentication](https://jwt.io/introduction/)
- 📌 [Postman - Testando APIs](https://learning.postman.com/docs/getting-started/introduction/)
- 📌 [Django ORM Queries Avançadas](https://docs.djangoproject.com/en/4.0/topics/db/queries/)

💡 **Dúvidas? Use a documentação e explore os links acima!** 🚀

---

## 🚀 **Conclusão**

Agora é com você! 🔥  
✔️ **Implemente os novos modelos**  
✔️ **Configure a autenticação JWT**  
✔️ **Adicione paginação**  
✔️ **Gere a documentação automática**

💡 Quando finalizar, teste suas requisições no **Postman** e confira os dados no **Django Admin**!

---

## 🤝 **Dúvidas?**

Caso tenha dúvidas, entre em contato pelo **Discord** ou pelo e-mail do professor. Boa prática e divirta-se! 🚀
