import * as React from "react";

interface IPeople {
    name: string;
    url: string;
    height: string;
}

const style = {
    cursor: "pointer",
};

class PureItem extends React.PureComponent<IPeople, {}> {
    public render() {
        const { name, height } = this.props;
        return (
            <>
                <span onClick={this.clickHandler(height)} style={style}>
                    {name}
                </span>
            </>
        );
    }
    private clickHandler = (height: string) => (e: React.SyntheticEvent<HTMLSpanElement>) => {
        const target = e.target as Element;
        if (target.innerHTML.includes("height")) {
            return;
        }
        target.innerHTML += ` --- height: ${height}`;
    }
}

const FunctionalItem: React.SFC<IPeople> = props => {
    const { name, height } = props;
    return (
        <>
            <span onClick={(e) => {
                const target = e.target as Element;
                if (target.innerHTML.includes("height")) {
                    return;
                }
                target.innerHTML += ` --- height: ${height}`;
            }} style={{
                cursor: "pointer",
            }}>
                {name}
            </span>
        </>
    );
};

const MemoizedItem = React.memo(FunctionalItem);

export {
    PureItem,
    FunctionalItem,
    MemoizedItem,
    IPeople,
};
