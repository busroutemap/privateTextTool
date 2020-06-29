<template>
    <div
    class="it"
    >
        <h2
        v-text="test.value"
        />
        <p
        v-text="messageTwo"
        />
        <div
        class="grid"
        >
            <form
            class="f"
            >
                <label
                v-text="test.before"
                />
                <textarea
                v-model="input.text"
                placeholder="テキストを入力してください"
                :cols="setting.tacols"
                :rows="setting.tarows"
                />
            </form>
            <p
            class="arrow"
            >👉<br>置換</p>
            <form
            class="f"
            >
                <label
                v-text="test.after"
                />
                <textarea
                v-model="output.text"
                :cols="setting.tacols"
                :rows="setting.tarows"
                placeholder="置換後のテキストが表示されます"
                class="gray"
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
            value:"compositionAPIのテスト",
            before:"置換前",
            after:"置換後(読み取り専用)"
        });
        const input = reactive({
            text:"",
        });
        const output = reactive({
            text:computed(()=>{
                return convert(input.text)
            })
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
.it{
    border:4px dotted black;
}
.grid{
    display: grid;
    grid-template-columns: 8fr 1fr 8fr;
}
.f{
    display: grid;
    grid-template-rows:1fr 9fr;
    padding:0% 5% 5%;
}
.arrow{
    padding:50% 0% 50% 0%;
    font-weight: bold;
    font-size: 2rem;
}
.gray{
    background-color: rgba(128, 128, 128, 0.25);
    font-weight: bold;
}
</style>