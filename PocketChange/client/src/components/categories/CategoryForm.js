import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import {
    addCategory,
    updateCategory,
    getCategoryById,
} from "../../modules/categoryManager"

const CategoryForm = () => {
    const [category, setCategory] = useState({})
    const params = useParams()
    const categoryId = params.id
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        if (categoryId) {
            getCategoryById(categoryId).then((event) => {
                setCategory(event)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    const handleInputChange = (evt) => {
        const value = evt.target.value
        const key = evt.target.id

        const categoryCopy = { ...category }

        categoryCopy[key] = value
        setCategory(categoryCopy)
    }

    const handleSave = (evt) => {
        evt.preventDefault()
        if (categoryId) {
            setIsLoading(true)
            updateCategory({
                id: parseInt(categoryId),
                name: category.name,
                userId: category.userId,
            }).then(() => history.push("/category"))
        } else {
            addCategory(category).then(() => history.push("/category"))
        }
    }

    return (
        <Form>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="category name"
                    value={category.name}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <Button
                className="btn btn-primary"
                disabled={isLoading}
                onClick={handleSave}
            >
                {categoryId ? "Save Category" : "Add Category"}
            </Button>
        </Form>
    )
}

export default CategoryForm
