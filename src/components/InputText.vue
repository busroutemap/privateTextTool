<template>
    <div>
        <h2
        v-text="test.value"
        />
        <p>{{ messageTwo }}</p>
        <div>
            <form>
                <textarea
                v-model="input.text"
                :cols="setting.tacols"
                :rows="setting.tarows"
                />
            </form>
            <form>
                <textarea
                v-model="output.text"
                :cols="setting.tacols"
                :rows="setting.tarows"
                readonly
                />
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent, reactive, ref, computed } from "@vue/composition-api";
import { convert } from './convert'

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
        const input = reactive({
            text:"",
        });
        const output = reactive({
            text:"",
        });
        const setting = ref({
            tarows:20,
            tacols:100
        });
        const messageTwo = ref<string>(props.t1);
        return {
            test,
            input,
            output,
            setting,
            messageTwo
        }
    }
})
</script>

<style>

</style>