import * as React from "react";

interface IPeople {
    name: string;
    url: string;
    height: string;
}
interface PPeople {
    name: string;
    attrs: any;
}

const style: React.CSSProperties = {
    cursor: "pointer",
};

/**
 * React.PureComponent
 */
class PureItem extends React.PureComponent<PPeople, {}> {
    private attrsRef = React.createRef<HTMLBaseElement>();

    public render() {
        const { name, attrs: { height } } = this.props;
        return (
            <>
                <span onClick={this.clickHandler} style={style}>
                    {name}
                </span>
                <span hidden ref={this.attrsRef}> --- height: {height}</span>
            </>
        );
    }

    private clickHandler = () => {
        const target = this.attrsRef.current as HTMLBaseElement;
        target.hidden = !target.hidden;
    }
}

/**
 * React.SFC
 */
const FunctionalItem: React.SFC<PPeople> = props => {
    const ref = React.createRef<HTMLBaseElement>();
    const { name, attrs: { height } } = props;
    return (
        <>
            <span style={style} onClick={() => {
                const target = ref.current as HTMLBaseElement;
                target.hidden = !target.hidden;
            }}>
                {name}
            </span>
            <span hidden ref={ref}> --- height: {height}</span>
        </>
    );
};

/**
 * React.memo, and compare function
 */
const compare = (pProps, nProps) => pProps.name === nProps.name;
const MemoizedItem = React.memo(FunctionalItem, compare);

export {
    PureItem,
    FunctionalItem,
    MemoizedItem,
    IPeople,
};
