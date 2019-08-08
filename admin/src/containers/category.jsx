import React from "react";
import gql from "graphql-tag";

import client from "../config/apollo";

import { CategoryForm, Category } from "../components/category";
import { Success, Error } from "../components/messages";

export class CreateCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: {} };
    }
    handleNameChange = (name) => {
        if(name.length > 3) this.setState({ name, errors: { ...this.state.errors, name: null } })
        else this.setState({ errors: { ...this.state.errors, name: "Le nom de la catégorie doit contenir au moins 3 caractères" } })
    }
    handleDescriptionChange = (description) => {
        if(description.length > 10) this.setState({ description, errors: { ...this.state.errors, description: null } })
        else this.setState({ errors: { ...this.state.errors, description: "La description de la catégorie doit contenir au moins 10 caractères" } })
    }
    handleFormSubmit = () => {
        client.mutate({ mutation: CREATE_CATEGORY, variables: {
            name: this.state.name,
            description: this.state.description
        } }).then(({ data: { createCategory }}) => {
            this.setState({ success: createCategory.name, errors: {} })
        }).catch((error) => {
            this.setState({ errors: { ...this.state.errors, message: error.message }});
        })
    }

    render() {
        return (
            <div>
                { this.state.success && <Success message={`La catégorie ${this.state.success} a été ajoutée avec succès`} /> }
                { this.state.errors.message && <Error message={this.state.errors.message} /> }
                <h3>Ajout d'une nouvelle catégorie</h3>
                <div>
                    <CategoryForm
                        onNameChange={this.handleNameChange}
                        onDescriptionChange={this.handleDescriptionChange}
                        onSubmit={this.handleFormSubmit}
                        errors={this.state.errors}
                        values={null}
                        hasChanged={null}
                    />
                </div>
            </div>
        )
    }
}

export class CategoryList extends React.Component {
    constructor(props){
        super(props);
        this.state = { categories: [], showUpdate: false, update: {} };
    }
    componentDidMount = async () => {
        try {
            const { data: { categories } } = await client.query({ query: CATEGORIES_QUERY });
            this.setState({ categories });
        } catch(ex) {
            this.setState({ error:  ex.message });
        }
    }

    handleOnChoose = (d) => {
        let { showUpdate, update } = this.state;

        if(update._id !== d._id) this.setState({ update: d })
        else this.setState({ showUpdate: !showUpdate })
    } 

    renderCategories = () => {
        let { categories } = this.state;
        categories = categories.filter(c => c.name.toLowerCase().includes(this.props.search));
        categories = categories.map((d, k) => (
            <div key={k}>
                <Category data={d} onChoose={this.handleOnChoose} />
            </div>
        ));
        return categories;
    }

    render() {
        return (
            <div className="uk-grid-small uk-child-width-1-2@m" uk-grid="true">
                <div>
                    { this.renderCategories() }
                </div>
                { this.state.showUpdate && (
                    <div>
                        <UpdateCategory data={this.state.update} />
                    </div>
                ) }
            </div>
        )
    }
}

class UpdateCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props.data, errors: {}, hasChanged: false };
    }
    handleNameChange = (name) => {
        if(name.length > 3) this.setState({ name, errors: { ...this.state.errors, name: null }, hasChanged: true })
        else this.setState({ errors: { ...this.state.errors, name: "Le nom de la catégorie doit contenir au moins 3 caractères" } })
    }
    handleDescriptionChange = (description) => {
        if(description.length > 10) this.setState({ description, hasChanged: true, errors: { ...this.state.errors, description: null } })
        else this.setState({ errors: { ...this.state.errors, description: "La description de la catégorie doit contenir au moins 10 caractères" } })
    }
    handleFormSubmit = () => {
        client.mutate({ mutation: UPDATE_CATEGORY, variables: {
            _id: this.state._id,
            name: this.state.name,
            description: this.state.description
        } }).then(({ data: { updateCategory }}) => {
            this.setState({ success: updateCategory.name, errors: {} })
        }).catch((error) => {
            this.setState({ errors: { ...this.state.errors, message: error.message }});
        })
    }
    render() {
        return <CategoryForm
                    onNameChange={this.handleNameChange}
                    onDescriptionChange={this.handleDescriptionChange}
                    values={this.props.data}
                    errors={this.state.errors}
                    onSubmit={this.handleFormSubmit}
                    hasChanged={this.state.hasChanged}
                />
    }
}

const CATEGORIES_QUERY = gql`
    query {
        categories {
            _id
            name
            description
        }
    }
`;

const CREATE_CATEGORY = gql`
    mutation CreateCategory($name: String!, $description: String!) {
        createCategory(name: $name, description: $description) {
            name
        }
    }
`;

const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($_id: ID!, $name: String!, $description: String!) {
        updateCategory(_id: $_id, name: $name, description: $description) {
            name
        }
    }
`;