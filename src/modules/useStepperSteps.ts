import {defineAsyncComponent, ref, shallowRef} from "vue";
import aLoadingSpinner from "@/components/atoms/aLoadingSpinner.vue";

const Register = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/Register.vue"),
    loadingComponent: aLoadingSpinner
})

const RoomDetails = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/RoomDetails.vue"),
    loadingComponent: aLoadingSpinner
})

const AdditionalRoomDetails = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/AdditionalRoomDetails.vue"),
    loadingComponent: aLoadingSpinner
})

const OptionalRoomDetails = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/OptionalRoomDetails.vue"),
    loadingComponent: aLoadingSpinner
})

const Neighbourhood = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/Neighbourhood.vue"),
    loadingComponent: aLoadingSpinner
})

const TenantPermissions = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/TenantPermissions.vue"),
    loadingComponent: aLoadingSpinner
})

const AboutIdealTenant = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/AboutIdealTenant.vue"),
    loadingComponent: aLoadingSpinner
})

const AboutIdealTenantTwo = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/AboutIdealTenantTwo.vue"),
    loadingComponent: aLoadingSpinner
})

const IndicateAgreement = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/IndicateAgreement.vue"),
    loadingComponent: aLoadingSpinner
})

const IndicateAgreementTwo = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions/IndicateAgreementTwo.vue"),
    loadingComponent: aLoadingSpinner
})

const YourIdealTenant = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/YourIdealTenant.vue"),
    loadingComponent: aLoadingSpinner
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

    const currentStep = ref<number>(0)

    return { steps, currentStep }
}