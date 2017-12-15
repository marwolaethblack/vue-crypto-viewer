<template>
  <div>
    <article class="message is-warning">
      <div class="message-header">
        <p>Oops we encountered an error</p>
      </div>
      <div class="message-body">
        {{ Message }}
      </div>
    </article>
  </div>
</template>

<script>
  export default {
   props: ['Message']
  }
</script>
