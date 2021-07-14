export interface PotentialTenant {
    name: string,
    picture: string,
    match: number,
    profileLink: string,
}

export default {
    state: () => ({
        email: "",

        property: {
            title: "",
            city: "",
            street: "",
            houseNumber: "",
            pricePerMonth: "",
            moveInDate: "",
            images: [],
            size: "",
            extraCosts: "",
            deposit: "",
            description: "",

            idealTenant: {
                options: ['yes', 'no', 'doesntmatter'],
                questions: [
                    {
                        message: "Smoking?",
                        value: ""
                    },
                    {
                        message: "Pets?",
                        value: ""
                    },
                    {
                        message: "Can he be loud in the evenings?",
                        value: ""
                    },
                ]
            },

            viewingInvitation: {
                message: "",
                date: "",
                timeFrame: "",
            },

            potentialTenants: [
                {
                    name: 'Jos de Jong',
                    picture: 'https://unsplash.com/photos/K84vnnzxmTQ/download?force=true',
                    match: 92,
                    profileLink: 'https://www.google.com',
                    sendInvitation: false
                },
                {
                    name: 'Jos de Jong',
                    picture: 'https://unsplash.com/photos/K84vnnzxmTQ/download?force=true',
                    match: 92,
                    profileLink: 'https://www.google.com',
                    sendInvitation: false
                },
                {
                    name: 'Jos de Jong',
                    picture: 'https://unsplash.com/photos/K84vnnzxmTQ/download?force=true',
                    match: 92,
                    profileLink: 'https://www.google.com',
                    sendInvitation: false
                },
                {
                    name: 'Jos de Jong',
                    picture: 'https://unsplash.com/photos/K84vnnzxmTQ/download?force=true',
                    match: 92,
                    profileLink: 'https://www.google.com',
                    sendInvitation: false
                }
            ]
        }
    }),

    mutations: {
        alterUser(state: any, payload: Object): void {
            Object.entries(payload).forEach(([key, value]) => state[key] = value)
        },

        alterProperty(state: any, payload: Object): void {
            Object.entries(payload)
                .forEach(([key, value]) => state.property[key] = value)
        },

        alterIdealTenant(state: any, payload: Object): void {
            Object.entries(payload)
                .forEach(([key, value]) => state.property.idealTenant.questions[key].value = value)
        },

        alterViewingInvitation(state: any, payload: Object): void {
            Object.entries(payload)
                .forEach(([key, value]) => state.property.viewingInvitation[key] = value)
        },

        replacePotentialTenants(state: any, payload: Object): void {
            state.property.potentialTenants = payload
        }
    },

    getters: {

    }
}