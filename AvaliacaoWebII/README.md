# 🚀 AutoRent - Sistema de Locação de Veículos

Bem-vindo ao AutoRent, um sistema de gerenciamento de locadora de veículos construído com **Django REST Framework** (DRF).  
Este projeto oferece uma API RESTful completa, com autenticação JWT, gerenciamento de categorias, veículos, reservas e preços dinâmicos.

---

## 📌 Tecnologias Utilizadas

- Django 5.x
- Django REST Framework
- PostgreSQL (ou SQLite para testes)
- JWT para autenticação
- Swagger / Redoc para documentação automática

---

## 🏗 Estrutura do Projeto

/myproject
│── /autorent
│ │── /api
│ │ │── /v1
│ │ │ │── init.py
│ │ │ │── viewsets.py
│ │ │ │── router.py
│ │ │ │── serializers.py
│ │── init.py
│ │── models.py
│ │── views.py
│ │── urls.py
│ │── admin.py
│── /myproject
│ │── init.py
│ │── settings.py
│ │── urls.py
│ │── wsgi.py
│── manage.py

yaml
Copiar código

---

## ⚙️ Instalação e Configuração

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/matheuslima25/django-api-rest.git
cd django-api-rest
2️⃣ Crie e ative um ambiente virtual
bash
Copiar código
python -m venv venv
# Linux / macOS
source venv/bin/activate
# Windows
venv\Scripts\activate
3️⃣ Instale dependências
bash
Copiar código
pip install -r requirements.txt
4️⃣ Configure o banco de dados
No settings.py configure DATABASES. Exemplo PostgreSQL:

python
Copiar código
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
SQLite já vem configurado por padrão.

5️⃣ Rode migrações
bash
Copiar código
python manage.py migrate
6️⃣ Crie superuser (admin)
bash
Copiar código
python manage.py createsuperuser
7️⃣ Rode o servidor
bash
Copiar código
python manage.py runserver
🔑 Autenticação
JWT (JSON Web Token) usado para autenticação.

Endpoints:

Método	Endpoint	Descrição
POST	/api/token/	Login (recebe username e password, retorna access e refresh token)
POST	/api/token/refresh/	Atualiza access token usando refresh token

Exemplo de header nas requisições autenticadas:

makefile
Copiar código
Authorization: Bearer <ACCESS_TOKEN>
🚦 Endpoints da API
1️⃣ Categoria de Veículos
Método	Endpoint	Descrição
GET	/api/v1/categorias/	Lista todas categorias
POST	/api/v1/categorias/	Cria nova categoria
GET	/api/v1/categorias/{id}/	Detalhes da categoria
PUT	/api/v1/categorias/{id}/	Atualiza categoria
DELETE	/api/v1/categorias/{id}/	Deleta categoria

Exemplo JSON (POST/PUT):

json
Copiar código
{
  "nome": "SUV",
  "descricao": "Veículo grande",
  "diaria_base": "250.00"
}
2️⃣ Veículos
Método	Endpoint	Descrição
GET	/api/v1/veiculos/	Lista todos veículos
POST	/api/v1/veiculos/	Cria novo veículo
GET	/api/v1/veiculos/{id}/	Detalhes veículo
PUT	/api/v1/veiculos/{id}/	Atualiza veículo
DELETE	/api/v1/veiculos/{id}/	Deleta veículo

Exemplo JSON (POST/PUT):

json
Copiar código
{
  "categoria": 1,
  "marca": "Toyota",
  "modelo": "Corolla",
  "placa": "ABC1234",
  "ano": 2020,
  "status": "disponivel"
}
3️⃣ Reservas
Método	Endpoint	Descrição
GET	/api/v1/reservas/	Lista todas reservas
POST	/api/v1/reservas/	Cria reserva
GET	/api/v1/reservas/{id}/	Detalhes reserva
PUT	/api/v1/reservas/{id}/	Atualiza reserva
DELETE	/api/v1/reservas/{id}/	Deleta reserva

Exemplo JSON (POST/PUT):

json
Copiar código
{
  "usuario": 1,
  "veiculo": 2,
  "data_inicio": "2025-09-16",
  "data_fim": "2025-09-20",
  "status": "pendente"
}
4️⃣ Preço Dinâmico
Método	Endpoint	Descrição
GET	/api/v1/precos/	Lista todos preços
POST	/api/v1/precos/	Cria preço dinâmico
GET	/api/v1/precos/{id}/	Detalhes preço
PUT	/api/v1/precos/{id}/	Atualiza preço
DELETE	/api/v1/precos/{id}/	Deleta preço

Exemplo JSON (POST/PUT):

json
Copiar código
{
  "veiculo": 2,
  "data": "2025-09-17",
  "preco": "300.00"
}
📄 Documentação da API
Swagger UI: /api/docs/

Redoc: /api/redoc/

Esquema OpenAPI: /api/schema/

🛠 Teste da API
Use Insomnia, Postman ou Swagger UI para testar os endpoints com tokens JWT.

makefile
Copiar código
Authorization: Bearer <ACCESS_TOKEN>
```
