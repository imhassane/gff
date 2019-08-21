import React from "react";
import gql from "graphql-tag";

import client from "../config/apollo";
import Loader from "../components/loader";

import { CategoryForm, Category, DeleteCategoryForm, CategoryChooserElement } from "../components/category";
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
                        values={{}}
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
        this.state = { showUpdate: false, update: {} };
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
        if(!this.state.categories) return <Loader />
        return (
            <div>
                <h1>Liste des catégories</h1>
                <div className="uk-grid-small uk-child-width-1-2@m" uk-grid="true">
                    <div>
                        <p className="uk-text-meta">{ this.state.categories.length } au total</p>
                        <div className="uk-grid-small uk-flex-left" uk-grid="true">
                            { this.renderCategories() }
                        </div>
                    </div>
                    { this.state.showUpdate && (
                        <div>
                            <UpdateCategory data={this.state.update} />
                        </div>
                    ) }
                </div>
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
        if(name.length < 3) this.setState({ name, errors: { ...this.state.errors, name: "Le nom de la catégorie doit contenir au moins 3 caractères" } })
        else this.setState({ name, errors: { ...this.state.errors, name: null }, hasChanged: true }) 
    }
    handleDescriptionChange = (description) => {
        if(description.length > 10) this.setState({ description, hasChanged: true, errors: { ...this.state.errors, description: null } })
        else this.setState({ description, errors: { ...this.state.errors, description: "La description de la catégorie doit contenir au moins 10 caractères" } })
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
        return (
            <div>
                <div>
                    <DeleteCategory _id={this.state._id} />
                </div>
                <div>
                    <h3>Modifier la catégorie</h3>
                    { this.state.success && <Success message={`La catégorie ${this.state.success} a bien été mise à jour`} /> }
                    { this.state.errors.message && <Error message={this.state.errors.message} /> }
                    <CategoryForm
                        onNameChange={this.handleNameChange}
                        onDescriptionChange={this.handleDescriptionChange}
                        values={{
                            _id: this.state._id,
                            name: this.state.name,
                            description: this.state.description
                        }}
                        errors={this.state.errors}
                        onSubmit={this.handleFormSubmit}
                        hasChanged={this.state.hasChanged}
                    />
                </div>
            </div>
        )
    }
}

class DeleteCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: {} };
    }
    handleFormSubmit = () => {
        client.mutate({ mutation: DELETE_CATEGORY, variables: { _id: this.props._id }})
        .then(({ data: { deleteCategory }}) => {
            this.setState({ success: deleteCategory.name });
        })
        .catch((error) => {
            this.setState({ errors: { message: error.message }})
        })
    }
    render() {
        return (
            <div>
                { this.state.success && <Success message={`La catégorie ${this.state.success} a été supprimée avec succès`} /> }
                { this.state.errors.message && <Error message={this.state.errors.message} /> }
                <DeleteCategoryForm onDelete={this.handleFormSubmit} />
            </div>
        )
    }
}

export class ChooseCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {errors: {}, selectedCategories: {} };
    }
    componentDidMount = async () => {
        try {
            let { data: { categories } } = await client.query({ query: CATEGORIES_QUERY });
            this.setState({ categories });
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }})
        }
    }
    handleCategoryChoose = (data) => {
        let { selectedCategories } = this.state;
        if(Object.keys(selectedCategories).includes(data._id) === true) delete selectedCategories[data._id];
        else selectedCategories[data._id] = data;
        this.setState({ selectedCategories });
        selectedCategories = Object.keys(selectedCategories);
        this.props.onCategorySelect(selectedCategories);
    }
    renderCategories = () => {
        let { categories } = this.state;
        categories = categories.map((d, k) => <CategoryChooserElement onCategorySelected={this.handleCategoryChoose} data={d} key={k} />)
        return <> { categories } </>
    }
    render() {
        if(!this.state.categories) return <Loader />
        return (
            <div>
                { this.renderCategories() }
            </div>
        )
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

const DELETE_CATEGORY = gql`
    mutation DeleteCategory($_id: ID!) {
        deleteCategory(_id: $_id) {
            name
        }
    }
`;