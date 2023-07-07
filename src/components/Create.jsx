import { useEffect, useState } from "react";
import { addRecipe } from "../RecipeReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');
    const [dateModified, setDateModified] = useState(new Date().toLocaleString());

    const recipes = useSelector((state) => state.recipes);
    const dispatch = useDispatch();

    const navigate = useNavigate();        


    const handleSubmit = (e) => {
        e.preventDefault();
        setDateModified(new Date().toLocaleString());
      
        dispatch(
          addRecipe({
            name,
            ingredients,
            directions,
            dateModified,
          })
        );
        navigate('/');
      };
      
        
  return (
    <div className = 'd-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className = 'w-50'>
            <h3>Add</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' 
                    onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients</label>
                    <input type="text" className='form-control'
                    onChange={e => setIngredients(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="ingredients">Directions</label>
                    <input type="text" className='form-control'
                    onChange={e => setDirections(e.target.value)} />
                </div>
                <br/>
                <div>
                  <button className='btn btn-primary'>Add</button>
                </div>
                <div className='mt-3'>
                  <button className='btn btn-outline-dark' onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Create