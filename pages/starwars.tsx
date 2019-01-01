import * as React from "react";
import StarwarsPeopleList from "../src/starwars/StarwarsPeopleList";

interface SStarwars {
    mount: boolean;
}

class Starwars extends React.PureComponent<any, SStarwars> {
    public state = {
        mount: false,
    };

    public componentDidMount() {
        this.setState({mount: true});
    }

    public componentWillUnmount() {
        this.setState({mount: false});
    }

    public render() {
        if (!this.state.mount) {
            return null;
        }
        return (
            <>
                <h1>Star Wars People list</h1>
                <hr/>
                <StarwarsPeopleList />
            </>
        );
    }
}

export default Starwars;
