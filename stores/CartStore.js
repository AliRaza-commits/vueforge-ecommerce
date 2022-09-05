import { defineStore, acceptHMRUpdate } from "pinia";
import { watchDebounced } from "@vueuse/core";

export const useCartStore = defineStore("CartStore", () => {
   const deskree = useDeskree();

   //state
    const products = ref([]);
    const taxRate = 0.1;
    const isFirstLoad = ref(false);
    const loading = ref(false);
   
   //gettter
   const count = computed(() => products.value.length);
   const subtotal = computed((state) => {
    return products.value.reduce((p, product) => {
      return product?.fields?.price
        ? product.fields.price * product.count + p
        : p;
    }, 0);
  });
   const isEmpty = computed(()  => products.value.length === 0);
   const taxTotal = computed(() => subtotal*taxRate);
   const total = computed(() => (taxTotal.value?taxTotal.value:0)+subtotal.value);

   //action
   function addProduct(product, count) {
       const productExist = products.value.find( (p)=> p.sys.id === product.sys.id);
       if (productExist) {
        productExist.count += count;
       } else {
        products.value.push({...product, count});
       }
       return count;
       console.log(products.value);
   }

    // init data
  deskree.auth.onAuthStateChange(async (user) => {
    isFirstLoad.value = true;
    loading.value = true;
    const res = await deskree.user.getCart();
    res.products.forEach((product) => addProduct(product, product.count));
    loading.value = false;
    setTimeout(() => (isFirstLoad.value = false), 1000);
  });

  // update data whenever products change
  watchDebounced(
    products,
    async () => {
      if (isFirstLoad.value) return;
      if (!deskree.user.get()) return;
      await deskree.user.updateCart(products.value);
    },
    {
      debounce: 500,
      deep: true,
    }
  );
   
  function removeProducts(productIds) {
    productIds = Array.isArray(productIds) ? productIds : [productIds];
    products.value = products.value.filter(
      (p) => !productIds.includes(p.sys.id)
    );
  }

    return {
        products,
        taxRate,
        count,
        isEmpty,
        subtotal,
        taxTotal,
        total,
        removeProducts,
        addProduct,
      };
})


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
  }