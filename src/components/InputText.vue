<template>
    <div>
        <h2>{{ text.value }}</h2>
        <p>{{ messageTwo }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent, reactive, ref } from "@vue/composition-api";
export default defineComponent({
    setup() {
        // ここにリアクティブなデータ、関数を定義
        const text = ref({
            value:"お試しサンプル"
        });
        const messageTwo = ref<string>("CompositionAPI分からん……");
        return{
            text,
            messageTwo
        }
    }
})
</script>

<style>

</style>