import {defineAsyncComponent, ref, shallowRef} from "vue";

const Register = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/Register.vue")
    // loadingComponent: undefined
})

const RoomDetails = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/RoomDetails.vue")
})

const AdditionalRoomDetails = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/AdditionalRoomDetails.vue")
})

const OptionalRoomDetails = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/OptionalRoomDetails.vue")
})

const Neighbourhood = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/Neighbourhood.vue")
})

const TenantPermissions = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/TenantPermissions.vue")
})

const AboutIdealTenant = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/AboutIdealTenant.vue")
})

const AboutIdealTenantTwo = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/AboutIdealTenantTwo.vue")
})

const IndicateAgreement = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/IndicateAgreement.vue")
})

const IndicateAgreementTwo = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/IndicateAgreementTwo.vue")
})

const YourIdealTenant = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/YourIdealTenant.vue")
})

export default function() {
    const steps = shallowRef<Array<Object>>([
        {
            key: 0,
            intlName: 'register',
            component: Register
        },
        {
            key: 1,
            intlName: 'roomDetails',
            component: RoomDetails
        },
        {
            key: 2,
            hideInMenu: true,
            component: AdditionalRoomDetails
        },
        {
            key: 3,
            hideInMenu: true,
            isOptional: true,
            component: OptionalRoomDetails
        },
        {
            key: 4,
            intlName: 'tenantQuestions',
            component: Neighbourhood
        },
        {
            key: 5,
            hideInMenu: true,
            component: TenantPermissions
        },
        {
            key: 6,
            hideInMenu: true,
            component: AboutIdealTenant
        },
        {
            key: 7,
            hideInMenu: true,
            component: AboutIdealTenantTwo
        },
        {
            key: 8,
            hideInMenu: true,
            component: IndicateAgreement
        },
        {
            key: 9,
            hideInMenu: true,
            component: IndicateAgreementTwo
        },
        {
            key: 10,
            intlName: 'yourIdealTenant',
            component: YourIdealTenant,
            hideMenu: true
        }
    ])

    const currentStep = ref<number>(2)

    return { steps, currentStep }
}