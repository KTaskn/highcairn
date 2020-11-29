<template>
    <vs-row vs-justify="center">
        <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
            <vs-card>
            <div slot="header">
                <h3>{{ title }}</h3>
            </div>
            <div>
                <span>{{ content }}</span>
            </div>
            </vs-card>
        </vs-col>
    </vs-row>
</template>

<script>
export default {
    props: ['title', 'content']
}
</script>

<style scoped>

</style>