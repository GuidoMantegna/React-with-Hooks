import { Fragment, useState, useEffect } from 'react';
import './styles/Contact.css';

function Contact ({ history }) {
    const [values, setValues] = useState({ name: "", last: "", mail: "" });
    const inputs = Array.from(document.querySelectorAll('.form-input'));
    let formComplete = false;
    
    const handleSubmit = e => {

        e.preventDefault();

        inputs.forEach(input => {
            if(input.value === "") {
                input.style.background = 'rgba(255, 99, 71, .25)';
                input.style.fontWeight = 'bold'
            }  
        });

        if(formComplete) {
            history.push('/home');
        };
    };

    const handleChange = e => {
            e.target.style.background = 'rgba(150, 150, 150, .1)';
            e.target.style.fontWeight = '100';

            setValues({
                ...values,
                [e.target.name]: e.target.value
            });               
    };

    useEffect(()=>{
        const btn = document.querySelector('.contact-btn');

        if(values.name !== "" && values.last !== "" && values.mail !== "") {
            btn.classList.remove('btn-danger');
            btn.classList.add('btn-success');
            formComplete = true;
        } else {
            btn.classList.add('btn-danger');
            btn.classList.remove('btn-success');
        }
    })

    return (
        <Fragment>
            <div className="page-title-container">
                <h2 className="page-title"><i className="bi bi-envelope ico-link"></i>- Contact</h2>
            </div>

            <div className="contact-header-container">
                <div className="small-title-container">
                    <h2 className="page-title"><i className="bi bi-envelope ico-link"></i>- Contact</h2>
                </div>
            </div>
            <form action="/user-page.html" onSubmit={handleSubmit}>
                <fieldset>
                    <div className="first-name form-item">
                        <label className="lead" htmlFor="firstName">FIRST NAME</label>
                        <input className="form-input" onChange={handleChange} type="text" placeholder="enter your first name" name="name" value={values.name}/>
                    </div>
                    <div className="last-name form-item">
                        <label className="lead" htmlFor="lastName">LAST NAME</label>
                        <input className="form-input" onChange={handleChange} type="text" placeholder="enter your last name" name="last" value={values.last}/>
                    </div>
                    <div className="e-mail form-item">
                        <label className="lead" htmlFor="email">e-Mail</label>
                        <input className="form-input" onChange={handleChange} type="email" placeholder="example@example.com" name="mail" value={values.mail}/>
                    </div>
                    <div className="offers form-item">
                        <label className="lead" htmlFor="offers">Which offers do you prefer?</label>
                        <select className="form-input" name="offers" id="offers" defaultValue="all">
                            <option value="vegetables">Vegetables</option>
                            <option value="meats">Meats</option>
                            <option value="drinks">Drinks</option>
                            <option value="fish">Fish</option>
                            <option value="all">All</option>
                        </select>
                    </div>
                    <button className="btn btn-danger contact-btn" type="submit">Join</button>
                </fieldset>
            </form>
        </Fragment>
        
    )
};

export default Contact;