<template>
<vs-navbar class="nabarx">
    <div slot="title">
    <vs-navbar-title>
        {{ title }}
    </vs-navbar-title>
    </div>
    <vs-input v-model="search"/>
</vs-navbar>
</template>

<script>

export default {
    props: ['title'],
    data: function () {
        return {
            search: ''
        }
    }
}
</script>

<style scoped>
</style>
