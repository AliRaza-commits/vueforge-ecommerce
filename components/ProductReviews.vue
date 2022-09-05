<script setup>

const deskree = useDeskree();
const props = defineProps({
  productId: {
    type:String,
    required: true
  }
});

const reviews = ref([]);
const showWrite = ref(false);
const showReview = ref(false);
const isLoggedIn = computed(() => !!deskree.loggedInUser.value);

function showWriteReview() {
   showReview.value = false;
   showWrite.value = !showWrite.value;
 }

 async function showAllReviews() {
   showWrite.value = false;
   showReview.value = !showAllReviews.value;
   
   const res = await deskree.reviews.get(props.productId);
   reviews.value = res.data.map((review) => review.attributes);
 }

  async function handleReviewSubmit(form) {
   if (!isLoggedIn) return;
   
   try {
     const res = await deskree.reviews.submit({
     ...form,
     product_id:props.productId
   });
    this.showAllReviews();
   } catch(err) {
     console.log(err);
   }
   
 }

</script>
<template>
  <div>
    <div>
      <hr class="my-10" />
      <p class="text-3xl">Customer Review and Ratings</p>
    </div>
    <div class="border-2 card my-10 p-2 w-2/5">
      <div class="card-content card-content font-bold text-2xl text-center">
        3.5 out of 5
      </div>
      <div class="text-center text-xs">(9 reviews)</div>
    </div>
    <div class="my-10">
      <button @click="showWriteReview" class="btn mr-10">Wtite A review</button>
      <button @click="showAllReviews" class="btn">Show Reviews</button>
    </div>
    <div>
    </div>

    <div v-if="showWrite">
      <ProductReviewsCardForm @reviewSubmited="handleReviewSubmit" />
    </div>

    <div v-if="showReview">
      <ProductReviewsCard v-for="review in reviews" :review="review" />
    </div>
    

  </div>
</template>
