import {useStore} from "vuex";
import {computed} from "vue";

export default function(context: any) {
    const store = useStore()

    const idealTenant: any = computed<any>(() => store.state.user.property.idealTenant)

    function getAnswer(key: number): object {
        return store.state.user.property.idealTenant[key].answers;
    }

    function setAnswer(key: number, answer: string|Array<string>): void {
        store.commit('alterIdealTenantAnswers', { key, answer })
        context.emit('validate', idealTenant.value.answers)
        context.emit('input')
    }

    return { idealTenant, getAnswer, setAnswer }
}