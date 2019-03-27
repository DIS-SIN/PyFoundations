import DOLPageExplore from "../views/DOLPageExplore";
import DOLPageExploreStreams from "../views/DOLPageExploreStreams";
import DOLPageExplorePractices from "../views/DOLPageExplorePractices";
import DOLPageExploreEpisodes from "../views/DOLPageExploreEpisodes";
import DOLPageExploreExperiences from "../views/DOLPageExploreExperiences";
import DOLPageExploreLearningResources from "../views/DOLPageExploreLearningResources";

export const ExploreRoutes = [
    { path: '/:lang/explore', name: 'Explore', Component: DOLPageExplore },
    { path: '/:lang/explore/streams', name: 'Streams', Component: DOLPageExploreStreams },
    { path: '/:lang/explore/practices', name: 'Practices', Component: DOLPageExplorePractices },
    { path: '/:lang/explore/experiences', name: 'Experiences', Component: DOLPageExploreExperiences },
    { path: '/:lang/explore/episodes', name: 'Episodes', Component: DOLPageExploreEpisodes },
    { path: '/:lang/explore/learning_resources', name: 'Episodes', Component: DOLPageExploreLearningResources },
]

