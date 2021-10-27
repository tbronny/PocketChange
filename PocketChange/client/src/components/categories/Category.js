import React from "react"
import { Card, CardBody, CardFooter } from "reactstrap"
import { deleteCategory, getAllCategories } from "../../modules/categoryManager"
import { useHistory } from "react-router"

const Category = ({ category }) => {
    const history = useHistory()

    const handleDelete = (evt) => {
        evt.preventDefault()
        if (
            window.confirm(
                `Are you sure you want to delete "${category.name}"? Press OK to confirm.`
            )
        ) {
            deleteCategory(category.id).then(window.location.reload())
        } else {
            history.push("/category")
        }
    }

    return (
        <Card className="m-4">
            <CardBody>
                {category.name}
                <button
                    className="btn btn-danger float-right"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button
                    className="btn btn-dark float-right"
                    onClick={() => {
                        history.push(`/category/edit/${category.id}`)
                    }}
                >
                    Edit
                </button>
            </CardBody>
        </Card>
    )
}

export default Category
