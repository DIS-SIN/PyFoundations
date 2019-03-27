import DOLPageViewExperience from "../views/DOLPageViewExperience";
import DOLPageViewEpisode from "../views/DOLPageViewEpisode";
import DOLPageViewStream from "../views/DOLPageViewStream";
import DOLPageViewPractice from "../views/DOLPageViewPractice";
import DOLPageViewLearningResource from "../views/DOLPageViewLearningResource";

const routes = [
    { path: '/:lang/view/experience/:id', mod: "experiences", name: 'View Experience', Component: DOLPageViewExperience },
    { path: '/:lang/view/episode/:id', mod: "episodes", name: 'View Episode', Component: DOLPageViewEpisode },
    { path: '/:lang/view/stream/:id', mod: "streams", name: 'View Stream', Component: DOLPageViewStream },
    { path: '/:lang/view/practice/:id', mod: "practices", name: 'View Practice', Component: DOLPageViewPractice },
    { path: '/:lang/view/learning_resource/:id', mod: "learning_resources", name: 'View Learning Resource', Component: DOLPageViewLearningResource },
]

export default routes;
