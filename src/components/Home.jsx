import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRecipe, fetchRecipes, setSelectedRecipe } from '../RecipeReducer';
import { useDispatch } from "react-redux";

function Home() {
    const recipes = useSelector((state) => state.recipes.list) || [];
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteRecipe(id)).then(() => {
          dispatch(fetchRecipes());
        });
    }      

    const handleEdit = (recipe) => {
        dispatch(setSelectedRecipe(recipe));
    }

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    return (
        <div className='container'>
            <Link to="/create" className='btn btn-primary my-3'>Create</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ingredients</th>
                        <th>Directions</th>
                        <th>Last modified</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe, index) => (
                        <tr key={index}>
                            <td>{recipe.name}</td>
                            <td>{recipe.ingredients}</td>
                            <td>{recipe.directions}</td>
                            <td>{recipe.dateModified}</td>
                            <td>
                                <Link to={`/edit/${recipe._id}`} onClick={() => handleEdit(recipe)} className='btn btn-primary'>Edit</Link>
                                <button className='btn btn-danger' onClick={() => {handleDelete(recipe._id)}} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home
