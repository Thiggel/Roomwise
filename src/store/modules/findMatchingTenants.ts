export default {
    state: () => ({
        errorMessage: "",
        infoMessage: "",
        showPasswordField: false
    }),

    mutations: {
        changeErrorMessage(state: any, message: string): void {
            if(message === 'userAlreadyExists') {
                state.showPasswordField = true
            }

            state.errorMessage = message
        },

        changeInfoMessage(state: any, message: string): void {
            state.infoMessage = message
        },

        togglePasswordField(state: any, show: boolean): void {
            state.showPasswordField = show
        }
    },
}