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
        toppings2:'',
        toppings3:'',
        toppings4:'',
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
            .string(),
        toppings2: yup
            .string(),
        toppings3: yup
            .string(),
        toppings4: yup
            .string(),    
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
            [e.target.name] :e.target.value
        };
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
            <label>
                Toppings<br/>
                <label htmlFor="toppings">
                    <input type="checkbox" name="toppings" value="pepperoni"
                    onChange={inputChange}/>
                Pepperoni</label><br/>
                <label htmlFor="toppings2">
                    <input type="checkbox" name="toppings2" value="sausage"
                    onChange={inputChange}/>
                Sausage</label><br/>
                <label htmlFor="toppings3">
                    <input type="checkbox" name="toppings3" value="pineapple"
                    onChange={inputChange}/>
                Pineapple</label><br/>
                <label htmlFor="toppings4">
                    <input type="checkbox" name="toppings4" value="spinach"
                    onChange={inputChange}/>
                Spinach</label><br/>
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