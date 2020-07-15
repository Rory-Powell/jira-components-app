import React from 'react';

class Tile extends React.Component {

    render() {
        console.log(this.props);

        const blockedIssue = this.props.issue.components.filter(component => this.props.blockedComponents.includes(component.name)).length > 0 && this.props.rowTitle === 'Ready';
        const tileClass = blockedIssue ? 'tile blockedTile' : 'tile';

        return (
            <div className={tileClass}>
                <div className="tileHeader">
                    <p>{this.props.issue.key}</p>
                </div>
                <div className="tileTitle">
                    <p>{this.props.issue.summary}</p>
                </div>
                <div className="tileBody">
                    {
                        this.props.issue.components.map(component => {
                            return this.props.blockedComponents.includes(component.name) ?
                                <div className="component inProgressComponent" key={component.name}>{component.name}</div> :
                                <div className="component freeComponent" key={component.name}>{component.name}</div>;
                        })
                    }
                </div>
            </div>
        );
    }

}

export default Tile;
