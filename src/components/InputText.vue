<template>
    <div>
        <h2>{{ test.value }}</h2>
        <p>{{ messageTwo }}</p>
        <form>
            <textarea
            v-model="text.input"
            cols="100"
            rows="20"
            />
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent, reactive, ref, computed } from "@vue/composition-api";

type Props = {
    t1: string;
};

export default defineComponent({
    props:{
        t1:{
            type:String,
            default:"テストメッセージ"
        }
    },
    setup(props:Props) {
        // ここにリアクティブなデータ、関数を定義
        const test = ref({
            value:"お試しサンプル"
        });
        const text = reactive({
            input:"",
            output:computed(()=>{
                // あとから色々追加する
                // モジュール分割とか？
                return ""
            })
        })
        const messageTwo = ref<string>(props.t1);
        return{
            test,
            text,
            messageTwo
        }
    }
})
</script>

<style>

</style>