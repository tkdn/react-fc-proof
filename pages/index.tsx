import * as React from "react";
import Link from "next/link";
import pkg from "../package.json";

const deps = pkg.dependencies;

const AppIndex: React.SFC<{}> = () => {
    return (
        <>
            <h1>proof</h1>
            <ul>
                <li>Next.js {deps.next}</li>
                <li>React {deps.react}, ReactDOM {deps["react-dom"]}</li>
            </ul>
            <hr/>
            <nav>
                <ul>
                    <li><Link href="starwars"><a>starwars</a></Link></li>
                </ul>
            </nav>
        </>
    );
};

export default AppIndex;
