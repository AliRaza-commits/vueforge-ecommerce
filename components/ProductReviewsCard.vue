<script setup>
import { useDateFormat } from "@vueuse/core";
const props = defineProps({
review:{
    type:Object,
    required:true
}
})

const date = useDateFormat(new Date(props.review.createdAt),"MM-YYYY");
</script>
<template>
<div class="border-2 card mb-5">
    <div class="card-body">
        <div>
            {{ "⭐️".repeat(review.rating) }} 
            <span> (Date : {{ date }})</span>
        </div>
        <h2 class="card-title text-2xl">{{ review.title }}</h2>
        <p> {{ review.text }} </p>
    </div>
</div>
</template>