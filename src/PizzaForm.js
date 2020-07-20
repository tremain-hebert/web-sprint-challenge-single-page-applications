import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PizzaForm() {
    //react state
    
    const defaultState = {
        name:'',
        size:'',
        toppings:'',
        instructions:'',
    };
    const [orders, setOrders] = useState([]);
    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState})

    //formState Schema
    let formSchema = yup.object().shape({
        name: yup
            .string()
            .min(2, "Name must be at least 2 characters long.")
            .required("Please provide name."),
        size: yup
            .string()
            .required("Please Select A Size"),
        toppings: yup
            .string()
            .required("Please pick a topping"),
        instructions: yup
            .string()
    });

    //submit
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("http://reques.in/api/users", formState)
            .then(() => console.log("form submit success"))
            .catch(err => console.log(err));
        setOrders([...orders, JSON.stringify({formState})]);
        console.log(JSON.stringify(orders));
        setFormState({...defaultState});
    };

    //validation
    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate()
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    //input hanlder

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name] : e.target.value
        }
        validateChange(e)
        setFormState(newFormData);
    };

    return(
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input
                    type="text"
                    name='name'
                    value={formState.name}
                    onChange={inputChange}
                    errors={errors}
                />
            </label>
            <label htmlFor="size"><br/>
                Size
                <select name="size" onChange={inputChange}>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select><br/>
            </label>
            <label htmlFor="toppings">
                Toppings<br/>
                <input type="checkbox" name="toppings" value="pepperoni"
                    onChange={inputChange}/>
                <label htmlFor="pepperoni">Pepperoni</label><br/>
                <input type="checkbox" name="toppings" value="sausage"
                    onChange={inputChange}/>
                <label htmlFor="sausage">Sausage</label><br/>
                <input type="checkbox" name="toppings" value="pineapple"
                    onChange={inputChange}/>
                <label htmlFor="pineapple">Pineapple</label><br/>
                <input type="checkbox" name="toppings" value="spinach"
                    onChange={inputChange}/>
                <label htmlFor="spinach">Spinach</label><br/>
            </label>
            <input
                type='text'
                name='instructions'
                onChange={inputChange}
                value={formState.instructions}
            />
            <button id="submit">Submit</button>
            <div>{orders}</div>
        </form>
    )

}