# KeroCarros - Frontend

Frontend do sistema de gerenciamento de locação de veículos, construído com **React**, **TypeScript** e **Vite**.

## Funcionalidades Principais

- Autenticação JWT com persistência de sessão.
- Gestão de categorias de veículos.
- Gestão de veículos, clientes e reservas.
- Componentes reutilizáveis e estilizados com CSS-in-JS.
- Rotas protegidas e layout responsivo.

---

## Estrutura do Projeto


📦src
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📜BulkDeleteButton.tsx
 ┃ ┣ 📜BulkEditButton.tsx
 ┃ ┣ 📜CategoriaForms.tsx
 ┃ ┣ 📜CategoriaList.tsx
 ┃ ┣ 📜FiltroComponent.tsx
 ┃ ┣ 📜InputField.tsx
 ┃ ┣ 📜ProtectedLayout.tsx
 ┃ ┣ 📜Sidebar.tsx
 ┃ ┣ 📜VeiculoForms.tsx
 ┃ ┗ 📜VeiculoList.tsx
 ┣ 📂context
 ┃ ┣ 📜AuthContext.tsx
 ┃ ┗ 📜AuthProvider.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useAuth.tsx
 ┣ 📂pages
 ┃ ┣ 📜CategoriaPage.tsx
 ┃ ┣ 📜ClientsPage.tsx
 ┃ ┣ 📜DashboardPage.tsx
 ┃ ┣ 📜LoginPage.tsx
 ┃ ┣ 📜ReservationsPage.tsx
 ┃ ┗ 📜VeiculoPages.tsx
 ┣ 📂routes
 ┃ ┣ 📜ProtectedLayout.tsx
 ┃ ┗ 📜ProtectedRoute.tsx
 ┣ 📂services
 ┃ ┣ 📜authServices.ts
 ┃ ┣ 📜CategoriaService.ts
 ┃ ┗ 📜VeiculoService.ts
 ┣ 📂styles
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜BulkDeleteButtonStyles.ts
 ┃ ┃ ┣ 📜BulkEditButtonStyles.ts
 ┃ ┃ ┣ 📜CategoriaFormStyles.ts
 ┃ ┃ ┣ 📜CategoriaListStyles.ts
 ┃ ┃ ┣ 📜FiltroGenericoStyles.ts
 ┃ ┃ ┣ 📜InputFieldStyles.ts
 ┃ ┃ ┣ 📜ProtectedLayoutStyles.ts
 ┃ ┃ ┣ 📜SidebarStyles.ts
 ┃ ┃ ┣ 📜VeiculoFormStyles.ts
 ┃ ┃ ┗ 📜VeiculoListStyles.ts
 ┃ ┗ 📂pages
 ┃ ┃ ┣ 📜CategoriaPageStyles.ts
 ┃ ┃ ┗ 📜VeiculoPageStyles.ts
 ┣ 📂types
 ┃ ┣ 📜categoria.ts
 ┃ ┗ 📜veiculo.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┗ 📜main.tsx



---

## Configuração

1. **Instalação das dependências**
```bash
npm install
# ou
yarn



npm run dev
# ou
yarn dev


## Tecnologias Utilizadas

React + TypeScript

Vite

Axios

React Router v6

Lucide Icons

CSS-in-JS (estilos separados por arquivo)

Observações

Todas as páginas usam layout protegido (ProtectedLayout) com verificação de autenticação.

Componentes possuem estilos separados em src/styles/components e src/styles/pages.

Rotas protegidas e navegação estão em src/routes.

Serviços de API estão em src/services para facilitar manutenção e reutilização.
