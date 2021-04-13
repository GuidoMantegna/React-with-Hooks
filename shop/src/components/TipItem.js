import { Fragment } from 'react';

function TipItem ( {product, id, info, onClick} ) {
    return (
        <Fragment>
                <li
                    className="tips-item lead" 
                    href="#"
                    data-action="print-info" 
                    data-id={id} 
                    data-info={info} 
                    onClick={onClick}>
                    <i className="bi bi-cup-straw"></i>
                        {product}
                </li>
        </Fragment>
        
    )
};

export default TipItem;