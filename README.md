# Vue.js Forge Training E-commerce Site

![Vue.js Forge](https://vuejsforge.com/images/logo-vuejs-forge.svg)

## Services

During the event we'll use several 3rd party SaaS platforms to provide app funcationality like data storage, payment processing, etc. Those services include:

- Deskree
- Contentful CMS
- Stripe

Please be sure to fill out the .env file with the proper data to connect to these services.

## Step In Contentful 
-  Create a new content type in Contentful called “Product”
![](/contentful_img1)
-  Give the product the following fields:
    - Name: Short Text
    - Summary: Long Text
    - Price: Decimal Number (Help text: price in cents - this is necessary for Stripe)
    - Description: Long Text
    - Image: Media, many files
    - heatLevel: Short Text

![](/contentful_img2)

![](/contentful_img3)

![](/contentful_img4)

![](/contentful_img5)

![](/contentful_img6)

![](/contentful_img7)

![](/contentful_img8)


- Setup a webhook so that every time a product is created in Contentful it will also be created in Stripe with the same id

```
{
  "id": "{ /payload/sys/id }",
  "name": "{ /payload/fields/name/en-US }",
  "description": "{ /payload/fields/description/en-US }",
  "default_price_data": {
    "currency": "USD",
    "unit_amount_decimal": "{ /payload/fields/price/en-US }"
  }
}
```

- Create some of your own products to sell 😃

## Step In Deskree
- Create a New Project

- This will launch a wizard to start the new project. Fill the first step as you see fit. Take the project id you added here and use it in the project .env like so:
```
NUXT_DESKREE_BASE_URL="https://[project-id-here].api.deskree.com/api/v1"
```

- Next, you can choose the tier of your choice. The Free starter tier will be plenty for the event

1. Next, you should setup the database tables we’ll need for the project. 
    1. Table 1: `carts`
        - all the default columns plus:
        - `products` (string) (required)
    2. Table 2: `reviews`
        - all the default columns plus:
        - `product_id` (string) (required)
        - `rating` (integer) (required)
        - `text` (string) (required)
        - `title` (string) (required)
    3. A users table comes with every new project but you should add a `cartId` column to it like this:
        - `cartId` (One-to-One Reference) (carts) (NOT required)

![](/deskree_img1)

- Next, select email/password for the login type. You can add other login types later if you’d like but we’ll just use email/password during the event. 

- After this the project setup is complete, you can continue to the project dasboard (it will take 10 minutes)

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
