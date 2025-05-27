import PropTypes from 'prop-types';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

function Sorteaza({options}) {
const[searchParams, setSearchParams] = useSearchParams();
const sortBy = searchParams.get("sortBy") || "";


function handleChange(e){
searchParams.set("sortBy", e.target.value);
setSearchParams(searchParams);
}

    return (
        <Select options={options} type="white" value={sortBy} onChange={handleChange}/>
    )
} 

Sorteaza.propTypes = {
    options: PropTypes.array.isRequired,
}

export default Sorteaza
