import React from 'react';
import './App.css';
import Tile from './Tile';

// const productionStatuses = ['Production'];
const stagingStatuses = ['Staged for Test'];
const readyStatuses = ['Ready for QE', 'Approved for Staging'];

const defaultJql = "project = IAS and status in ('Ready for qe', 'approved for staging', 'staged for test', Verified) and type in (story, 'Technical Task')";

class App extends React.Component {

    state = {
        stagingIssues: [],
        readyIssues: [],
        blockedComponents: [],
        subtasks: []
    };

    componentDidMount() {
        fetch(`http://localhost:8080/proxy?jql=${defaultJql}`)
            .then(response => response.json())
            .then(json => this.parseResponseBody(json));
    }

    parseResponseBody = body => {
        console.log(body);
        this.parseIssues(body.issues);
    };

    async parseIssues(issues) {
        const subtasks = new Map((await this.parseSubtasks(issues)).map(i => [i.key, i]));

        const stagingIssues = this.filterIssues(issues, stagingStatuses, subtasks);
        const readyIssues = this.filterIssues(issues, readyStatuses, subtasks);

        const blockedComponents = [...this.flatMapComponents(stagingIssues)];

        this.setState({
            stagingIssues,
            readyIssues,
            blockedComponents
        });
    }

    async parseSubtasks(issues) {
        const keys = issues.flatMap(issue => issue.fields.subtasks.map(subtask => subtask.key));

        return fetch(`http://localhost:8080/proxy?jql=project = IAS and issue in (${keys.join(',')})`)
            .then(response => response.json())
            .then(body => body.issues.map(issue => this.mapIssue(issue)));
    }

    flatMapComponents = issues => {
        return new Set(issues.flatMap(issue => issue.components.flatMap(component => component.name)));
    };

    filterIssues = (issues, statuses, subtasks) => {
        return issues.filter(issue => statuses.includes(issue.fields.status.name))
            .map(issue => {
                return this.mapIssue(issue, subtasks);
            });
    };

    mapIssue = (issue, subtasks) => {
        // top level components
        const storyComponents = this.parseIssueComponents(issue.fields.components);

        let taskComponents = [];

        // subtask level components
        if (subtasks) {
            taskComponents = issue.fields.subtasks.flatMap(task =>
                subtasks.has(task.key) ? this.parseIssueComponents(subtasks.get(task.key).components) : []
            );
        }


        let components = new Set([...storyComponents, ...taskComponents]);
        components = [...components]; // remove duplicates

        return ({
                key: issue.key,
                summary: issue.fields.summary,
                components
            }
        );
    };

    parseIssueComponents = components => {
        if (components) {
            return components.map(component => {
                return { name: component.name };
            });
        }

        return [];
    };

    render() {
        return (
            <div className="appContainer">
                {this.renderTileRow('Staging', this.state.stagingIssues)}
                {this.renderTileRow('Ready', this.state.readyIssues)}
            </div>

        );
    }

    renderTileRow = (title, issues) => {
        if (issues.length > 0) {
            return (<div className="tileContainer">

                <h1>{title}</h1>
                <div className="tileRow">
                    {
                        issues.map(issue => {
                            return (
                                <Tile
                                    rowTitle={title}
                                    issue={issue}
                                    blockedComponents={this.state.blockedComponents}
                                    key={issue.key}
                                />
                            );
                        })
                    }
                </div>
            </div>);
        }
    }
}

export default App;
