import axios, {AxiosResponse} from "axios";

export interface PotentialTenant {
    name: string,
    picture: string,
    match: number,
    profileLink: string,
}

export default {
    state: () => ({
        email: "",
        password: "",

        property: {
            createListing: true,
            id: undefined,
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
            status: "draft",

            idealTenant: [
                {
                    text: 'tickDescribesNeighbourhoodBest',
                    options: [
                        'studentNeighbourhood',
                        'youngFamilies',
                        'fullTimeWorkers',
                        'pensioners'
                    ],
                    answers: []
                },
                {
                    text: 'isTenantAllowedCraftWork',
                    options: [
                        'preInstalledFurnitureAllowed',
                        'wallsAllowedPainted',
                        'tenantEncouragedFixThemselves',
                        'majorChangesAllowed'
                    ],
                    answers: []
                },
                {
                    text: 'whoIsAllowedLive',
                    options: [
                        'everyone',
                        'onlyGirls',
                        'onlyBoys',
                        'internationals',
                        'dutchPeople',
                        'students',
                        'postStudying',
                        'couples',
                        'preferWithJob'
                    ],
                    answers: [],
                    removeWhenChecked: {
                        'everyone': 'all',
                        'onlyGirls': ['onlyBoys', 'everyone'],
                        'onlyBoys': ['onlyGirls', 'everyone'],
                        'internationals': ['dutchPeople', 'everyone'],
                        'dutchPeople': ['internationals', 'everyone'],
                        'students': ['everyone', 'postStudying'],
                        'postStudying': ['everyone', 'students'],
                        'couples': ['everyone'],
                        'preferWithJob': ['everyone']
                    }
                },
                {
                    text: 'canHavePet',
                    options: [
                        'yes',
                        'no',
                        'doesntmatter'
                    ],
                    answers: []
                },
                {
                    text: 'preferNonSmoker',
                    options: [
                        'yes',
                        'doesntmatter'
                    ],
                    answers: []
                },
                {
                    text: 'turnBlindEyeWhenUnreliable',
                    options: [
                        'completelyAgree',
                        'agree',
                        'ratherAgree',
                        'ratherDisagree',
                        'disagree',
                        'completelyDisagree'
                    ],
                    answers: []
                },
                {
                    text: 'valueCommunication',
                    options: [
                        'completelyAgree',
                        'agree',
                        'ratherAgree',
                        'ratherDisagree',
                        'disagree',
                        'completelyDisagree'
                    ],
                    answers: []
                }
            ],

            viewingInvitation: {
                message: "",
                date: "",
                time: "",
            },

            potentialTenants: [
                {
                    name: 'Jos de Jong',
                    picture: 'https://unsplash.com/photos/K84vnnzxmTQ/download?force=true',
                    match: 92,
                    profileLink: 'https://www.google.com',
                    email: 'f.laitenberger@gmail.com',
                    sendInvitation: false
                },
                {
                    name: 'Jos de Jong',
                    picture: 'https://unsplash.com/photos/K84vnnzxmTQ/download?force=true',
                    match: 92,
                    profileLink: 'https://www.google.com',
                    email: 'f.laitenberger@gmail.com',
                    sendInvitation: false
                },
                {
                    name: 'Jos de Jong',
                    picture: 'https://unsplash.com/photos/K84vnnzxmTQ/download?force=true',
                    match: 92,
                    profileLink: 'https://www.google.com',
                    email: 'f.laitenberger@gmail.com',
                    sendInvitation: false
                },
                {
                    name: 'Jos de Jong',
                    picture: 'https://unsplash.com/photos/K84vnnzxmTQ/download?force=true',
                    match: 92,
                    profileLink: 'https://www.google.com',
                    email: 'f.laitenberger@gmail.com',
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

        alterIdealTenantAnswers(state: any, payload: any): void {
            if(state.property.idealTenant[payload.key]?.removeWhenChecked && payload.answer.length) {
                if(!Array.isArray(payload.answer))
                    return

                const lastElement = payload.answer[payload.answer.length - 1]
                const remove = state.property.idealTenant[payload.key]?.removeWhenChecked[lastElement]

                if(remove === 'all') {
                    payload.answer = [ lastElement ]
                } else {
                    remove.forEach((el: string): void => {
                        const index = state.property.idealTenant[payload.key].answers.indexOf(el)

                        if(index >= 0) {
                            payload.answer.splice(index, 1)
                        }
                    })
                }
            }

            state.property.idealTenant[payload.key].answers = payload.answer
        },

        alterViewingInvitation(state: any, payload: Object): void {
            Object.entries(payload)
                .forEach(([key, value]) => state.property.viewingInvitation[key] = value)
        },

        replacePotentialTenants(state: any, payload: Object): void {
            state.property.potentialTenants = payload
        }
    },

    actions: {
        async createUser(context: any): Promise<AxiosResponse<any>|void> {
            return axios.put(process.env.VUE_APP_API_BASE_URL + '/wp-json/roomwise/v1/user', {
                email: context.state.email
            }).then((response: any) => {
                if(!response.data.success) {
                    context.commit('changeErrorMessage', response.data.intlMessageKey)
                }
            })
        },

        async loginUser(context: any): Promise<AxiosResponse<any>|void> {
            return axios.post(process.env.VUE_APP_API_BASE_URL + '/wp-json/roomwise/v1/user/login', {
                email: context.state.email,
                password: context.state.password
            }).then((response: any) => {
                if(!response.data.success) {
                    context.commit('changeErrorMessage', response.data.intlMessageKey)
                }
            })
        },

        async upsertRoom(context: any): Promise<AxiosResponse<any>|void> {
            return axios.post(process.env.VUE_APP_API_BASE_URL + '/wp-json/roomwise/v1/room', context.state)
                .then((response: any) => {
                    if(response.data.success && response.data.postId) {
                        context.state.property.id = response.data.postId
                    } else {
                        context.commit('changeErrorMessage', response.data.intlMessageKey)
                    }
                })
        },

        async sendInvitations(context: any): Promise<AxiosResponse<any>|void> {
            const userIds = context.state.property.potentialTenants.map((tenant: any) => {
                if(tenant.sendInvitation) {
                    return tenant.id;
                }
            })

            return axios.post(process.env.VUE_APP_API_BASE_URL + '/wp-json/roomwise/v1/sendInvitation', {
                users: userIds,
                name: context.state.property.title,
                date: context.state.property.viewingInvitation.date,
                time: context.state.property.viewingInvitation.time,
                message: context.state.property.viewingInvitation.message,
                address: context.state.property.street + " " + context.state.property.houseNumber,
                agencyEmail: context.state.email
            })
            .then((response: any) => {
                if(response.data.success && response.data.postId) {
                    context.state.property.id = response.data.postId
                } else {
                    context.commit('changeErrorMessage', 'successSendEmail')
                }
            })
        }
    }
}