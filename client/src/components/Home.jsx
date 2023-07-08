import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteRecipe, fetchRecipes, setSelectedRecipe } from "../RecipeReducer";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from 'date-fns';
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

function Home() {
  const recipes = useSelector((state) => state.recipes.list) || [];
  const dispatch = useDispatch();
  const [expandedRows, setExpandedRows] = useState(new Set());

  const handleDelete = (id) => {
    dispatch(deleteRecipe(id)).then(() => {
      dispatch(fetchRecipes());
    });
  };

  const handleEdit = (recipe) => {
    dispatch(setSelectedRecipe(recipe));
  };

  const handleRowClick = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  // Sort recipes by dateModified in descending order
  const sortedRecipes = [...recipes].sort((a, b) => {
    const dateA = new Date(a.dateModified);
    const dateB = new Date(b.dateModified);
    return dateB - dateA;
  });

  return (
    <div className="container">
      <Link to="/create" className="btn btn-outline-dark my-3">
        <FaPlus /> Create
      </Link>
      {sortedRecipes.length === 0 ? (
        <p>No recipes to show, <Link to="/create">create your first one</Link></p>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Last modified</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRecipes.map((recipe, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => handleRowClick(recipe._id)}>
                  <td className="text-left">{recipe.name}</td>
                  <td className="text-left">{formatDistanceToNow(new Date(recipe.dateModified), { addSuffix: true })}</td>
                  <td className="text-center">
                    <Link
                      to={`/edit/${recipe._id}`}
                      onClick={(e) => { e.stopPropagation(); handleEdit(recipe); }}
                      className="btn btn-outline-dark m-1"
                      title="Edit Recipe"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="btn btn-outline-dark m-1"
                      onClick={(e) => { e.stopPropagation(); handleDelete(recipe._id); }}
                      title="Delete Recipe"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
                {expandedRows.has(recipe._id) && (
                  <tr>
                    <td colSpan="3">
                      <p><strong>Ingredients:</strong>
                        <div>
                          <textarea
                            style={{ backgroundColor: '#f8f9fa', border: 'none' }}
                            className="form-control"
                            value={recipe.ingredients}
                            rows={recipe.ingredients.split('\n').length}
                            readOnly
                          ></textarea>
                        </div>
                      </p>
                      <p>
                        <strong>Directions:</strong>
                        <textarea
                          style={{ backgroundColor: '#f8f9fa', border: 'none' }}
                          className="form-control"
                          value={recipe.directions}
                          rows={recipe.directions.split('\n').length}
                          readOnly
                        ></textarea>
                      </p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
