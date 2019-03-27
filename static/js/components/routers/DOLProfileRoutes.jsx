import DOLPageUserProfile from "../views/DOLPageUserProfile";
import DOLPageUserProfileUpdate from "../views/DOLPageUserProfileUpdate";
import DOLPageUserProfileEdit from "../views/DOLPageUserProfileEdit";

const routes = [
    { path: '/:lang/profile', name: 'Profile', Component: DOLPageUserProfile },
    { path: '/:lang/profile/update', name: 'Update Profile', Component: DOLPageUserProfileUpdate },
    { path: '/:lang/profile/edit', name: 'Edit Profile', Component: DOLPageUserProfileEdit },
    { path: '/:lang/profile/add/stream', name: 'Add Stream to Profile', Component: DOLPageUserProfileEdit },
]

export default routes;
