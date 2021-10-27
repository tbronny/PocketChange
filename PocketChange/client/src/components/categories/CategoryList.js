import React, { useEffect, useState } from "react"
import Category from "./Category"
import { getAllCategories } from "../../modules/categoryManager"
import { Link } from "react-router-dom"

export const CategoryList = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

    return (
        <section>
            <div>
                <Link to="/category/add">New Category</Link>
            </div>
            {categories.map((c) => (
                <Category key={c.id} category={c} />
            ))}
        </section>
    )
}
