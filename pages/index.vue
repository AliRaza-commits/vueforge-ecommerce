<script setup>
const productStore = useProductStore();
useAsyncData("products", async () => productStore.fetchProducts());
</script>
<template>
  <div>
    <HomeHero />

    <div class="flex justify-end mt-10 px-10">
      <ProductFilters />
    </div>

    <div
      v-if="productStore.products"
      class="gap-7 p-10 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-wrap justify-items-stretch items-stretch"
    >
    <transition-group name="product">
      <ProductCard
        v-for="product in productStore.products"
        :product="product"
        :key="product.sys.id"
        class="mb-5"
      />
    </transition-group>
    </div>
  </div>
</template>


<style>
.product-card {
  transition: all .35s ease-in-out
}
.product-enter-from {
	transform: scale(0.5) translatey(-80px);
	opacity:0;
}

.product-leave-to{
	transform: translatey(30px);
	opacity:0;
}

.product-leave-active {
	position: absolute;
	z-index:-1;
}
</style>