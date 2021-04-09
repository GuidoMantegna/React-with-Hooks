import { Fragment, useState } from 'react';
import './styles/Contact.css';

function Contact ({ history }) {
    
    const [userName, setUserName] = useState('');
    
    const handleSubmit = e => {

        e.preventDefault();
        const inputs = Array.from(document.querySelectorAll('.form-input'));

        inputs.forEach(input => {
            if(input.value === "") {
                input.style.background = 'rgba(255, 99, 71, .25)';
                input.style.fontWeight = 'bold'
            }  
        })

        const formComplete = inputs.every(input => input.value !== "");
        const navTitle = document.querySelector('.nav-title-container');

        if(formComplete) {
            const name = inputs[0].value;
            const last = inputs[1].value;

            setUserName(name+last)
            sessionStorage.setItem('name', name+last);

            history.push('/home');

            
        }

    }

    const handleChange = e => {
            const inputs = Array.from(document.querySelectorAll('.form-input'));
            const btn = document.querySelector('button')
            e.target.style.background = 'rgba(150, 150, 150, .1)';
            e.target.style.fontWeight = '100'

            const formComplete = inputs.every(input => input.value !== "");

            if(formComplete) {
                btn.classList.remove('btn-danger');
                btn.classList.add('btn-success');
            } else {
                btn.classList.add('btn-danger');
                btn.classList.remove('btn-success');
            }
    }



    return (
        <Fragment>
            {/* <div className="page-header">
                
            </div> */}
            {/* <div className="page-content"> */}
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
                            <label className="lead" for="firstName">FIRST NAME</label>
                            <input className="form-input" onChange={handleChange} type="text" id="firstName" placeholder="enter your first name"/>
                        </div>
                        <div className="last-name form-item">
                            <label className="lead" for="lastName">LAST NAME</label>
                            <input className="form-input" onChange={handleChange} type="text" id="lastName" placeholder="enter your last name"/>
                        </div>
                        <div className="e-mail form-item">
                            <label className="lead" for="email">e-Mail</label>
                            <input className="form-input" onChange={handleChange} type="email" id="email" placeholder="example@example.com"/>
                        </div>
                        <div className="offers form-item">
                            <label className="lead" for="offers">Which offers do you prefer?</label>
                            <select className="form-input" name="offers" id="offers" defaultValue="all">
                                <option value="vegetables">Vegetables</option>
                                <option value="meats">Meats</option>
                                <option value="drinks">Drinks</option>
                                <option value="fish">Fish</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                        {/* <div className="user-info form-item">
                            <label className="lead" for="userInfo">Tell us about you</label>
                            <textarea className="form-input" onChange={handleChange} name="userInfo" id="userInfo" cols="30" rows="5" placeholder="write a brief description of you"/>
                        </div>                   
                         */}
                        <button className="btn btn-danger" type="submit">Join</button>
                    </fieldset>
                </form>
            {/* </div> */}
        </Fragment>
        
    )
};

export default Contact;