export default {
    state: () => ({
        errorMessage: "",
        showPasswordField: false
    }),

    mutations: {
        changeErrorMessage(state: any, message: string): void {
            if(message === 'userAlreadyExists') {
                state.showPasswordField = true
            }

            state.errorMessage = message
        },

        togglePasswordField(state: any, show: boolean): void {
            state.showPasswordField = show
        }
    },
}