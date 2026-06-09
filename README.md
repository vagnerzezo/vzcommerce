# vzcommerce

Loja virtual de produtos eletrônicos construída com **Next.js 16** e **React 19**. O projeto consome a API pública [DummyJSON](https://dummyjson.com) para listar produtos, categorias e busca, e oferece carrinho de compras, checkout e interface responsiva.

## Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| Framework / UI | Next.js 16 (App Router), React 19 |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS 4 |
| Componentes | shadcn/ui (estilo base-nova) |
| Ícones | Lucide React, Heroicons |
| UI headless | Headless UI, Base UI |
| Drawer | Vaul |
| Carrossel | Swiper |
| Zoom de imagem | react-medium-image-zoom |
| Cartão de crédito (checkout) | react-credit-cards-2 |
| Compilador React | React Compiler (`babel-plugin-react-compiler`) |

## Pré-requisitos

- **Node.js** 18.18 ou superior (recomendado: 20+)
- **npm**, **yarn**, **pnpm** ou **bun**

## Como clonar

```bash
git clone <url-do-repositorio>
cd vzcommerce
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com a URL base da API:

```env
NEXT_PUBLIC_BASE_URL=https://dummyjson.com
```

> A variável `NEXT_PUBLIC_BASE_URL` é usada pelos serviços de produtos e carrinho para buscar dados da API DummyJSON.

## Como rodar

Instale as dependências:

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Build de produção

```bash
npm run build
npm run start
```

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor em modo produção (após o build) |

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial (banner, vitrines, grid de banners, newsletter) |
| `/products/[id]` | Detalhe do produto com zoom de imagem |
| `/category/[slug]` | Listagem de produtos por categoria |
| `/cart` | Página do carrinho |
| `/checkout` | Fluxo de checkout (endereço, entrega, pagamento) |

## Funcionalidades

- **Home** — carrossel de banners, vitrine de produtos, grid promocional e newsletter
- **Catálogo** — produtos e categorias via API DummyJSON
- **Busca** — drawer lateral com pesquisa de produtos
- **Detalhe do produto** — galeria com zoom, avaliações, informações de envio e garantia
- **Carrinho** — adicionar, remover e alterar quantidade; persistência em `localStorage`
- **Checkout** — formulário de entrega, métodos de envio, cartão de crédito visual e confirmação de pedido
- **Login** — drawer de autenticação (UI; sem backend de auth integrado)
- **Layout responsivo** — menu mobile, header com categorias dinâmicas e footer

## Estrutura do projeto

```
vzcommerce/
├── public/                    # Assets estáticos (logos, banners, grid)
├── src/
│   ├── app/                   # Rotas e páginas (App Router)
│   │   ├── cart/
│   │   ├── category/[slug]/
│   │   ├── checkout/
│   │   ├── products/[id]/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── ui/                # Componentes shadcn (Button, Drawer)
│   │   └── kibo-ui/           # Image Zoom
│   ├── features/
│   │   ├── auth/              # Login drawer
│   │   ├── cart/              # Contexto, drawer, serviços e tipos
│   │   ├── category/          # Página de categoria
│   │   ├── home/              # Componentes da home
│   │   ├── products/          # Detalhe, zoom, serviços e tipos
│   │   └── search/            # Busca de produtos
│   ├── lib/
│   │   └── utils.ts           # Utilitários (cn, etc.)
│   └── styles/
│       └── main.css
├── components.json            # Configuração shadcn/ui
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Componentes principais

### Layout

| Componente | Caminho | Descrição |
|------------|---------|-----------|
| `Header` | `src/components/layout/header.tsx` | Header server-side; busca categorias da API |
| `HeaderClient` | `src/components/layout/header-client.tsx` | Navegação, menu mobile, ícones de busca/login/carrinho |
| `Footer` | `src/components/layout/footer.tsx` | Rodapé da loja |

### Home

| Componente | Caminho | Descrição |
|------------|---------|-----------|
| `FullBanner` | `src/features/home/components/fullbanner.tsx` | Carrossel principal (Swiper) |
| `Showcase` | `src/features/home/components/showcase.tsx` | Vitrine de produtos em destaque |
| `ShowcaseSlider` | `src/features/home/components/showcase-slider.tsx` | Slider de produtos |
| `Showcases` | `src/features/home/components/showcases.tsx` | Múltiplas vitrines |
| `BannerGrid` | `src/features/home/components/banner-grid.tsx` | Grid de banners promocionais |
| `Newsletter` | `src/features/home/components/newsletter.tsx` | Formulário de newsletter |

### Produtos

| Componente | Caminho | Descrição |
|------------|---------|-----------|
| `ProductDetail` | `src/features/products/components/detail.tsx` | Página de detalhe do produto |
| `Zoom` | `src/features/products/components/zoom.tsx` | Zoom nas imagens do produto |
| `AddToCartButton` | `src/features/cart/components/add-to-cart-button.tsx` | Botão de adicionar ao carrinho |

### Carrinho e checkout

| Componente | Caminho | Descrição |
|------------|---------|-----------|
| `CartProvider` | `src/features/cart/cart-context.tsx` | Contexto global do carrinho (React Context + reducer) |
| `CartDrawer` | `src/features/cart/cart-drawer.tsx` | Drawer lateral do carrinho |
| `OrderConfirmModal` | `src/app/checkout/confirmed.tsx` | Modal de confirmação do pedido |

### Outros

| Componente | Caminho | Descrição |
|------------|---------|-----------|
| `LoginDrawer` | `src/features/auth/login-drawer.tsx` | Drawer de login |
| `SearchDrawer` | `src/features/search/search-drawer.tsx` | Drawer de busca |
| `CategoryPageClient` | `src/features/category/components/category-page-client.tsx` | Listagem por categoria |
| `Button` | `src/components/ui/button.tsx` | Botão (shadcn/ui) |
| `Drawer` | `src/components/ui/drawer.tsx` | Drawer (shadcn/ui + Vaul) |

## Serviços e API

Os dados são consumidos da **DummyJSON** através dos serviços:

- `src/features/products/services/product-service.ts` — produtos, busca, categorias e vitrines
- `src/features/cart/services/cart-service.ts` — adicionar e atualizar carrinho na API

Endpoints utilizados:

- `GET /products` — listar produtos
- `GET /products/:id` — produto por ID
- `GET /products/search?q=` — busca
- `GET /products/category/:slug` — produtos por categoria
- `GET /products/categories` — listar categorias
- `POST /carts/add` — adicionar ao carrinho
- `PUT /carts/:id` — atualizar carrinho

O carrinho no cliente é gerenciado localmente via `CartProvider` e salvo em `localStorage` (chave `cart`).

## Adicionar componentes shadcn/ui

O projeto já está configurado com shadcn/ui. Para adicionar novos componentes:

```bash
npx shadcn@latest add <componente>
```

A configuração está em `components.json` (aliases `@/components`, `@/lib/utils`, etc.).

## Documentação adicional

- `docs/carrinho.md` — documentação do carrinho
- `docs/pagina-produto.md` — documentação da página de produto

## Licença

Projeto privado (`"private": true` no `package.json`).
