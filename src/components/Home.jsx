import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRecipe } from '../RecipeReducer';
import { useDispatch } from "react-redux";
import { fetchRecipes } from '../RecipeReducer';

function Home() {
    const recipes = useSelector((state) => state.recipes);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteRecipe({id}));
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
                    <th>ID</th>
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
                        <td>{recipe._id}</td>
                        <td>{recipe.name}</td>
                        <td>{recipe.ingredients}</td>
                        <td>{recipe.directions}</td>
                        <td>{recipe.dateModified}</td>
                        <td>
                            <Link to={`/edit/${recipe.id}`} className='btn btn-primary'>Edit</Link>
                            <button className='btn btn-danger' onClick={() => {handleDelete(recipe.id)}} >Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

      
    </div>
  )
}

export default Home
