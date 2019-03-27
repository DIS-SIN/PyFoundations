import AppReactShowcase from '../../samples/AppReactShowcase';
import DashboardExample from '../../samples/DashboardExample';
import AlbumExample from '../../samples/AlbumExample';
import SignupExample from '../../samples/SignupExample';
import PricingExample from '../../samples/PricingExample';

const routes = [
    {path: "/:sampledir/dashboard", name: "Dashboard", Component: DashboardExample},
    {path: "/:sampledir/showcase", name: "showcase", Component: AppReactShowcase},
    {path: "/:sampledir/album", name: "album", Component: AlbumExample},
    {path: "/:sampledir/signin", name: "signin", Component: SignupExample},
    {path: "/:sampledir/pricing", name: "pricing", Component: PricingExample},

]

export default routes;


