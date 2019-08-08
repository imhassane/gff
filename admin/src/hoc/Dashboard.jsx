import React from "react";
import DashboardNavigation from "../components/DashboardNavigation";

const WithDashboardNavigation = (Children) => {
    class HOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = { search: '' };
        }
        handleSearchChange = (search) => this.setState({ search })

        render() {
            return (
                <div className="uk-grid-small" uk-grid="true">
                    <div className="uk-width-1-5@m">
                        <DashboardNavigation />
                    </div>
                    <div className="uk-width-4-5@m uk-container">
                        <div>
                            <input type="search" placeholder="Entrez votre recherche" onChange={ ({ target: { value }}) => this.handleSearchChange(value) } className="uk-input uk-form-blank" />
                        </div>
                        <div className="uk-padding">
                            <Children {...this.props} search={this.state.search} />
                        </div>
                    </div>
                </div>
            );
        }
    }

    return HOC;
};

export default WithDashboardNavigation;
