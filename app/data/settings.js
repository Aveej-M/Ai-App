import { title } from "process"

export const organizationData = [
    { title: 'Home', icon:'fa-regular fa-circle', path:"/settings/Home" },
    { title: 'Company Profile', icon:'fa-regular fa-building', path:"/settings/Company-profile" },
    { title: 'Business Hours', icon:'fa-regular fa-calendar-days', path:"/settings/Business-hours" },
]

export const teamData = [
    { title: 'Users', icon:'fa-regular fa-user', path: "/settings/Team/Users" },
    { title: 'Roles', icon:'fa-solid fa-user-gear', path: "" },
    { title: 'Agent Status', icon:'fa-solid fa-list-ul', path: "" },
]

export const generalData = [
    { title: 'Company Profile', icon: 'fa-regular fa-building', link:"/settings/Company-profile", info: "Update and maintain yourss organisation's profile information" },
    { title: 'Business Hours', icon: 'fa-regular fa-calendar-days', link:"/settings/Business-hours", info: "Set up working hours for different teams across time zones" },
    { title: 'Users', icon: 'fa-regular fa-user', link:"/settings/Team/Users", info: "Manage user accounts, permissions, and account status" },
]

// export default organizationData