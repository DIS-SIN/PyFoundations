import DOLPageModifyExperience from "../views/DOLPageModifyExperience";
import DOLPageModifyEpisode from "../views/DOLPageModifyEpisode";

const routes = [
    { path: '/:lang/modify/experience', name: 'Modify Experience', Component: DOLPageModifyExperience },
    { path: '/:lang/modify/episode', name: 'Modify Episode', Component: DOLPageModifyEpisode },
]

export default routes;
