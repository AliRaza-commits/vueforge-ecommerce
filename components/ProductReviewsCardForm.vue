<script setup>
const props = defineProps({

});

const form = reactive({
  title:"",
  text:"",
  rating:5,
})
</script>
<template>
  
  <div class="my-10 p-5">
  
    <FormKit
    type="form"
    :actions="false"
    @submit="$emit('reviewSubmited',form)"
    v-model="form"
    >
  
    <FormKit
      type="text"
      name="title"
      label="Title"
      placeholder="Title"
      help="Review title"
      validation="required"
    />

     <FormKit
      type="text"
      name="text"
      label="Text"
      placeholder="Text"
      help="Review text"
      validation="required"
    />

    <FormKit
    type="number"
    name="rating"
    label="Select Raring Out of 5"
    min="0"
    max="5"
    help="Select your rating level."
    />
    
    <FormKit
      type="submit"
      label="Submit Review"
    />
    
    </FormKit>
  </div>  
  
</template>