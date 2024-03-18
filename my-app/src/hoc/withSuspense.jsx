// import React, { Suspense } from 'react';
//
// export function withSuspense<WCP>(
//     Component: React.ComponentType<WCP>
// ) {
//     return (props: WCP) => (
//         <Suspense fallback={<div>Loading...</div>}>
//             <Component {...props} />
//         </Suspense>
//     );
// }
//


import React, {Suspense} from 'react';
import Preloader from "../components/Common/Preloader/Preloader";

export const withSuspense = (Component) => {
    return (props) => (
        <Suspense fallback={<Preloader/>}>
            <Component {...props} />
        </Suspense>
    )
}