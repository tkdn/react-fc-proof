import * as React from "react";
import { PureItem, FunctionalItem, MemoizedItem, IPeople } from "./FunctionalItem";

interface PeopleListState {
    list: any[];
    error: boolean;
    limit: boolean;
    loading: boolean;
    endpoint: string;
}

export default class StarWarsPeopleList extends React.PureComponent<{}, PeopleListState> {
    public state = {
        list: [],
        error: false,
        limit: false,
        loading: false,
        endpoint: "https://swapi.co/api/people/",
    };

    private abortController = new AbortController();

    public componentDidMount() {
        this.loadMore();
    }

    public componentWillUnmount() {
        this.abortController.abort();
    }

    public render() {
        if (this.state.error) {
            return <div>Error</div>;
        }
        if (this.state.list.length === 0) {
            return <div>ready...</div>;
        }
        const { list, limit, loading } = this.state;
        return (
            <>
                <ul>
                    {list.map((people: IPeople) => {
                        return (
                            <li key={people.url}>
                                <FunctionalItem name={people.name} attrs={{ height: people.height}} />
                            </li>
                        );
                    })}
                </ul>
                <div>
                    {limit ? null : <button disabled={loading ? true : false} onClick={this.loadMore}>more</button>}
                </div>
            </>
        );
    }

    private loadMore = () => {
        this.setState({loading: true});
        fetch(this.state.endpoint, {signal: this.abortController.signal})
            .then(r => r.json())
            .then(json => {
                if (json.next === null) {
                    this.setState({limit: true});
                }
                this.setState({
                    list: this.state.list.concat(json.results),
                    endpoint: json.next,
                    loading: false,
                });
            })
            .catch(e => {
                if (e.name === "AbortError") {
                    return;
                }
                this.setState({
                    error: true,
                    loading: false,
                });
                console.warn(e);
            });
    }
}
